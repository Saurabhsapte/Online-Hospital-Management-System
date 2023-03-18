package com.hms.services;

import java.util.List;

import com.hms.payloads.DoctorDto;
import com.hms.payloads.EmployeeDto;



public interface DoctorService {
		//create doctor
		DoctorDto createDoctorN(EmployeeDto empDto);

		// get All
		List<DoctorDto> getDoctor();
		
		DoctorDto selectSchedule(DoctorDto doctorDto, Integer doctorId,String days);
		
}