package com.hms.services;

import java.util.List;

import com.hms.payloads.MedicineDto;



public interface MedicineService {

		//create 
		MedicineDto createMedicine(MedicineDto medicineDto,Integer healthId);
		
		//get all medicine ofhealth history
		List<MedicineDto> getMedicineByHealthHistory(Integer healthId);
}