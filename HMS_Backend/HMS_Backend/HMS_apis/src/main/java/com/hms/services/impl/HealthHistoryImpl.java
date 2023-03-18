package com.hms.services.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entities.Health_History;
import com.hms.entities.Medicine;
import com.hms.entities.Patient;
import com.hms.entities.Ward;
import com.hms.exceptions.ResourceNotFoundException;
import com.hms.payloads.HealthHistoryDto;
import com.hms.repository.HealthHistoryRepo;
import com.hms.repository.PatientRepo;
import com.hms.repository.WardRepo;
import com.hms.services.HealthHistoryService;

@Service
public class HealthHistoryImpl implements HealthHistoryService {

	@Autowired
	private HealthHistoryRepo healthRepo;

	@Autowired
	private PatientRepo patientRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private WardRepo wardRepo;

	// add patient appointment (create health history )
	@Override
	public HealthHistoryDto addAppointment(HealthHistoryDto healthDto, Integer patientId) {
		Patient patient = this.patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient ", "Patient id", patientId));

		Health_History healths = this.modelMapper.map(healthDto, Health_History.class);

		patient.setCurrentStatus(true);
		Patient updatedPatient = this.patientRepo.save(patient);
		healths.setPatient(updatedPatient);
		healths.setPaymentStatus(true);
		healths.setMedicines(new ArrayList<Medicine>());
		Health_History newHealths = this.healthRepo.save(healths);

		return this.modelMapper.map(newHealths, HealthHistoryDto.class);
	}

	// ---------------------------------------------------------------------------------------------------------

	@SuppressWarnings("null")
	@Override
	public List<HealthHistoryDto> getAppointmentHistoryBypatient(Integer patientId) {
		Patient patient = this.patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient", "patient id", patientId));

		List<Health_History> healths = this.healthRepo.findByPatient(patient);

		List<Health_History> temp = new ArrayList<Health_History>();

		for (Health_History h : healths) {
			if (patient.getAdmitStatus().equals(false) && patient.getCurrentStatus().equals(true)
					&& h.getPaymentStatus().equals(true)) {
				temp.add(h);
			}
		}

		List<HealthHistoryDto> healthDtos = temp.stream()
				.map((health) -> this.modelMapper.map(health, HealthHistoryDto.class)).collect(Collectors.toList());

		return healthDtos;
	}

	// -------------------------------------------------------------------------------------------------------------

	// get health history by patient
	@SuppressWarnings("null")
	@Override
	public List<HealthHistoryDto> getHealthHistoryBypatient(Integer patientId) {
		Patient patient = this.patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient", "patient id", patientId));
		List<Health_History> healths = this.healthRepo.findByPatient(patient);

		List<Health_History> temp = new ArrayList<Health_History>();

		for (Health_History h : healths) {
			if (h.getPaymentStatus().equals(false)) {
				temp.add(h);
			}
		}

		List<HealthHistoryDto> healthDtos = temp.stream()
				.map((health) -> this.modelMapper.map(health, HealthHistoryDto.class)).collect(Collectors.toList());

		return healthDtos;
	}

	// ---------------------------------------------------------------------------------------------------------------

	@Override
	public void deleteHealthHistory(Integer healthId) {
		Health_History health = this.healthRepo.findById(healthId)
				.orElseThrow(() -> new ResourceNotFoundException("Health_History ", "health id", healthId));

		this.healthRepo.delete(health);
	}

	// ---------------------------------------------------------------------------------------------------------------------

	@Override
	public HealthHistoryDto getHealthHistoryById(Integer healthId) {
		Health_History healths = this.healthRepo.findById(healthId)
				.orElseThrow(() -> new ResourceNotFoundException("Health_History", "health id", healthId));
		return this.modelMapper.map(healths, HealthHistoryDto.class);
	}

	// ----------------------------------------------------------------------------------------------------------------------

	@Override
	public HealthHistoryDto updatePatientWard(HealthHistoryDto healthDto, Integer wardId) {
		Health_History hh = this.modelMapper.map(healthDto, Health_History.class);

		Health_History healths = this.healthRepo.findById(hh.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Health_History", "health id", hh.getId()));

		Patient patient = healths.getPatient();

		Ward ward = this.wardRepo.findById(wardId)
				.orElseThrow(() -> new ResourceNotFoundException("Ward", "ward id ", wardId));

		patient.setWard(ward);
		healths.setAllocatedBed(healthDto.getAllocatedBed());

		@SuppressWarnings("unused")
		Patient updatedPatient = this.patientRepo.save(patient);

		healths.setAdmitDate(LocalDate.now());

		Health_History updatedHealth = this.healthRepo.save(healths);
		return this.modelMapper.map(updatedHealth, HealthHistoryDto.class);
	}

	// --------------------------------------------------------------------------------------------------------------------

	@Override
	public HealthHistoryDto dischargePatient(Integer healthId) {
		Health_History healths = this.healthRepo.findById(healthId)
				.orElseThrow(() -> new ResourceNotFoundException("HealthHistory ", "health id", healthId));

		Patient patient = healths.getPatient();

		patient.setAdmitStatus(false);
		patient.setCurrentStatus(false);
		patient.setWard(null);
		patient.setDoctor(null);

		@SuppressWarnings("unused")
		Patient updatedPatient = this.patientRepo.save(patient);

		healths.setPaymentStatus(false);
		healths.setDischargeDate(LocalDate.now());

		Health_History updatedHealth = this.healthRepo.save(healths);
		return this.modelMapper.map(updatedHealth, HealthHistoryDto.class);
	}

	// --------------------------------------------------------------------------------------------------------------------

	@Override
	public HealthHistoryDto updateHealthHistoryPayment(Integer Id, Double amt) {
		Health_History healths = this.healthRepo.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("HealthHistory ", "health id", Id));
		double a = healths.getPaidAmount() + amt;
		healths.setPaidAmount(a);
		healths.setPaymentDate(LocalDate.now());

		Health_History updatedHealth = this.healthRepo.save(healths);
		return this.modelMapper.map(updatedHealth, HealthHistoryDto.class);
	}

	// --------------------------------------------------------------------------------------------------------------------

	// update HH (Doctor)
	@Override
	public HealthHistoryDto updateHealthHistory(HealthHistoryDto healthDto, Boolean admitStatus) {

		Health_History hh = this.modelMapper.map(healthDto, Health_History.class);

		Health_History healths = this.healthRepo.findById(hh.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Health_History", "health id", hh.getId()));

		Patient pat = healths.getPatient();
		pat.setAdmitStatus(admitStatus);

		@SuppressWarnings("unused")
		Patient updatedPatient = this.patientRepo.save(pat);

		healths.setDiseases(healthDto.getDiseases());
		healths.setPrescriptionInstruction(healthDto.getPrescriptionInstruction());
		healths.setMedicines(new ArrayList<Medicine>());

		Health_History updatedHealth = this.healthRepo.save(healths);
		return this.modelMapper.map(updatedHealth, HealthHistoryDto.class);
	}

	// --------------------------------------------------------------------------------------------------------------------

	@Override
	public HealthHistoryDto getHealthHistoryByPaymentStatus(Integer patientId) {
		Patient patient = this.patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient", "patient id", patientId));
		List<Health_History> healths = this.healthRepo.findByPatient(patient);
		List<HealthHistoryDto> healthDtos = healths.stream()
				.map((health) -> this.modelMapper.map(health, HealthHistoryDto.class)).collect(Collectors.toList());
		HealthHistoryDto h = null;
		for (HealthHistoryDto hdo : healthDtos) {
			if (hdo.getPaymentStatus().equals(true)) {
				h = hdo;
			}
		}
		return h;
	}

	// --------------------------------------------------------------------------------------------------------------------
}