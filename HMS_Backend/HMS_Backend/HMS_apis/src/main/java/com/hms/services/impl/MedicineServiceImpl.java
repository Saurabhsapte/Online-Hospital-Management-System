package com.hms.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entities.Health_History;
import com.hms.entities.Medicine;
import com.hms.exceptions.ResourceNotFoundException;
import com.hms.payloads.MedicineDto;
import com.hms.repository.HealthHistoryRepo;
import com.hms.repository.MedicineRepo;
import com.hms.services.MedicineService;

@Service
public class MedicineServiceImpl implements MedicineService {

	@Autowired
	private MedicineRepo medicineRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private HealthHistoryRepo healthRepo;

	//add medicine and other details manually by doctor to add to patients health history 
	@Override
	public MedicineDto createMedicine(MedicineDto medicineDto, Integer healthId) {
		Health_History health = this.healthRepo.findById(healthId)
				.orElseThrow(() -> new ResourceNotFoundException("HealthHistory ", "Health id", healthId));

		Medicine medicine = this.modelMapper.map(medicineDto, Medicine.class);

		medicine.setHealthHistory(health);

		Medicine newMedicine = this.medicineRepo.save(medicine);

		return this.modelMapper.map(newMedicine, MedicineDto.class);
	}	
	
	//------------------------------------------------------------------------------------------------------------------
	
	@Override
	public List<MedicineDto> getMedicineByHealthHistory(Integer healthId) {
		Health_History healthi = this.healthRepo.findById(healthId)
				.orElseThrow(() -> new ResourceNotFoundException("HealthHistory", "health id", healthId));
		List<Medicine> medicines = this.medicineRepo.findByHealthHistory(healthi);

		List<MedicineDto> medicineDtos = medicines.stream()
				.map((medicine) -> this.modelMapper.map(medicine, MedicineDto.class)).collect(Collectors.toList());

		return medicineDtos;
	}
	
	//------------------------------------------------------------------------------------------------------------------
	
}
