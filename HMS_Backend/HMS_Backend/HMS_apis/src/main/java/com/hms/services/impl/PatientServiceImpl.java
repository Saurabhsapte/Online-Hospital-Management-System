package com.hms.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.config.AppConstants;
import com.hms.entities.Address;
import com.hms.entities.Doctor;
import com.hms.entities.Patient;
import com.hms.entities.Role;
import com.hms.entities.User;
import com.hms.exceptions.ResourceNotFoundException;
import com.hms.payloads.AddressDto;
import com.hms.payloads.PatientDto;
import com.hms.payloads.PatientResponse;
import com.hms.payloads.UserDto;
import com.hms.repository.AddressRepo;
import com.hms.repository.DoctorRepo;
import com.hms.repository.PatientRepo;
import com.hms.repository.RoleRepo;
import com.hms.repository.UserRepo;
import com.hms.services.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private AddressRepo addressRepo;

	@Autowired
	private PatientRepo patientRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private DoctorRepo doctorRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepo roleRepo;

//Create patient (Sign Up)
	@Override
	public PatientDto createPatient(PatientDto patientDto) {

		Patient patient = this.modelMapper.map(patientDto, Patient.class);

		UserDto userDto = patientDto.getUser();

		AddressDto addressDto = userDto.getAddress();
		Address address = this.modelMapper.map(addressDto, Address.class);

		User user = this.modelMapper.map(userDto, User.class);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		Role role = this.roleRepo.findById(AppConstants.ROLE_PATIENT)
				.orElseThrow((() -> new ResourceNotFoundException("Role", "Role id", 0)));

		user.addRole(role);

		user.setAddress(null);
		User addedUser = this.userRepo.save(user);

		address.setUser(addedUser);
		Address addedAddress = this.addressRepo.save(address);

		User userAddedAddress = addedAddress.getUser();

		patient.setUser(userAddedAddress);
		Patient newPatient = this.patientRepo.save(patient);
		return this.modelMapper.map(newPatient, PatientDto.class);
	}

//---------------------------------------------------------------------------------------------------

	@Override
	public PatientResponse getAllPatientForReceptionist(Integer pageNumber, Integer pageSize, String sortBy,
			String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Patient> pagePatient = this.patientRepo.findAll(p);

		List<Patient> allPatients = pagePatient.getContent();
		List<Patient> temp = new ArrayList<Patient>();
		List<PatientDto> patientDtos = null;

		for (Patient pat : allPatients) {
			if (pat.getCurrentStatus().equals(true) && Objects.isNull(pat.getDoctor())) {
				temp.add(pat);
			}
		}
		patientDtos = temp.stream().map((patient) -> this.modelMapper.map(patient, PatientDto.class))
				.collect(Collectors.toList());

		PatientResponse patientResponse = new PatientResponse();

		patientResponse.setContent(patientDtos);
		patientResponse.setPageNumber(pagePatient.getNumber());
		patientResponse.setPageSize(pagePatient.getSize());
		patientResponse.setTotalElements(pagePatient.getTotalElements());

		patientResponse.setTotalPages(pagePatient.getTotalPages());
		patientResponse.setLastPage(pagePatient.isLast());

		return patientResponse;
	}

	// -----------------------------------------------------------------------------------------------------------

	@Override
	public PatientResponse getAllPatientForAdmitStatus(Integer pageNumber, Integer pageSize, String sortBy,
			String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Patient> pagePatient = this.patientRepo.findAll(p);

		List<Patient> allPatients = pagePatient.getContent();
		List<Patient> temp = new ArrayList<Patient>();
		List<PatientDto> patientDtos = null;

		for (Patient pat : allPatients) {
			if (pat.getCurrentStatus().equals(true) && pat.getAdmitStatus().equals(true)
					&& Objects.isNull(pat.getWard())) {
				temp.add(pat);
			}
		}

		patientDtos = temp.stream().map((patient) -> this.modelMapper.map(patient, PatientDto.class))
				.collect(Collectors.toList());

		PatientResponse patientResponse = new PatientResponse();

		patientResponse.setContent(patientDtos);
		patientResponse.setPageNumber(pagePatient.getNumber());
		patientResponse.setPageSize(pagePatient.getSize());
		patientResponse.setTotalElements(pagePatient.getTotalElements());

		patientResponse.setTotalPages(pagePatient.getTotalPages());
		patientResponse.setLastPage(pagePatient.isLast());

		return patientResponse;
	}

	// -----------------------------------------------------------------------------------------------------------

	@Override
	public PatientResponse getAllPatientForDischarge(Integer pageNumber, Integer pageSize, String sortBy,
			String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Patient> pagePatient = this.patientRepo.findAll(p);

		List<Patient> allPatients = pagePatient.getContent();
		List<Patient> temp = new ArrayList<Patient>();
		List<PatientDto> patientDtos = null;

		for (Patient pat : allPatients) {
			if (pat.getCurrentStatus().equals(true) && pat.getAdmitStatus().equals(true)) {
				temp.add(pat);
			}
		}

		patientDtos = temp.stream().map((patient) -> this.modelMapper.map(patient, PatientDto.class))
				.collect(Collectors.toList());

		PatientResponse patientResponse = new PatientResponse();

		patientResponse.setContent(patientDtos);
		patientResponse.setPageNumber(pagePatient.getNumber());
		patientResponse.setPageSize(pagePatient.getSize());
		patientResponse.setTotalElements(pagePatient.getTotalElements());

		patientResponse.setTotalPages(pagePatient.getTotalPages());
		patientResponse.setLastPage(pagePatient.isLast());

		return patientResponse;
	}

	// -----------------------------------------------------------------------------------------------------------

	// appoint doctor to patient
	@Override
	public PatientDto updatePatientDoctor(Integer patientId, Integer doctorId) {
		Patient patient = this.patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient ", "Patient id", patientId));

		Doctor doctor = this.doctorRepo.findById(doctorId)
				.orElseThrow(() -> new ResourceNotFoundException("Doctor ", "Doctor id", doctorId));

		patient.setDoctor(doctor);

		Patient updatedPatient = this.patientRepo.save(patient);
		return this.modelMapper.map(updatedPatient, PatientDto.class);
	}

	// ------------------------------------------------------------------------------------------------------------

	@Override
	public PatientResponse getAllPatientAfterAppointment(Integer pageNumber, Integer pageSize, String sortBy,
			String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Patient> pagePatient = this.patientRepo.findAll(p);

		List<Patient> allPatients = pagePatient.getContent();
		List<Patient> temp = new ArrayList<Patient>();
		List<PatientDto> patientDtos = null;
		for (Patient pat : allPatients) {
			if (pat.getCurrentStatus().equals(true)) {
				temp.add(pat);
			}
		}
		patientDtos = temp.stream().map((patient) -> this.modelMapper.map(patient, PatientDto.class))
				.collect(Collectors.toList());

		PatientResponse patientResponse = new PatientResponse();

		patientResponse.setContent(patientDtos);
		patientResponse.setPageNumber(pagePatient.getNumber());
		patientResponse.setPageSize(pagePatient.getSize());
		patientResponse.setTotalElements(pagePatient.getTotalElements());

		patientResponse.setTotalPages(pagePatient.getTotalPages());
		patientResponse.setLastPage(pagePatient.isLast());

		return patientResponse;
	}

	// ------------------------------------------------------------------------------------------------------------

	@Override
	public PatientDto getPatientById(Integer patientId) {
		Patient patient = this.patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient", "patient id", patientId));
		
		return this.modelMapper.map(patient, PatientDto.class);
	}

	// ------------------------------------------------------------------------------------------------------------

	// get all patients
	@Override
	public PatientResponse getAllPatient(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {

		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Patient> pagePatient = this.patientRepo.findAll(p);

		List<Patient> allPatients = pagePatient.getContent();

		List<PatientDto> patientDtos = allPatients.stream()
				.map((patient) -> this.modelMapper.map(patient, PatientDto.class)).collect(Collectors.toList());

		PatientResponse patientResponse = new PatientResponse();

		patientResponse.setContent(patientDtos);
		patientResponse.setPageNumber(pagePatient.getNumber());
		patientResponse.setPageSize(pagePatient.getSize());
		patientResponse.setTotalElements(pagePatient.getTotalElements());

		patientResponse.setTotalPages(pagePatient.getTotalPages());
		patientResponse.setLastPage(pagePatient.isLast());

		return patientResponse;
	}

	// ------------------------------------------------------------------------------------------------------------

	@Override
	public List<PatientDto> getPatientsByDoctor(Integer doctorId) {
		Doctor doc = this.doctorRepo.findById(doctorId)
				.orElseThrow(() -> new ResourceNotFoundException("Doctor ", "Doctor Id", doctorId));
		
		List<Patient> patients= doc.getPatients();
		
		List<Patient> temp=new ArrayList<Patient>();
		
		for (Patient p : patients) {
			if(p.getCurrentStatus().equals(true) && p.getAdmitStatus().equals(false)) {
				temp.add(p);
			}
		}
		
		List<PatientDto> patientDtos = temp.stream()
				.map((patient) -> this.modelMapper.map(patient, PatientDto.class)).collect(Collectors.toList());
		
		return patientDtos;
	}

	// ------------------------------------------------------------------------------------------------------------
}