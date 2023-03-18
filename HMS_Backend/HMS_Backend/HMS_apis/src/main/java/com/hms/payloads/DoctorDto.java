package com.hms.payloads;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class DoctorDto {
	private int id;

	private double doctorFee;

	private LocalTime startTime;

	private LocalTime endTime;
	
	private String days;

	@JsonIgnoreProperties(value = "doctor")
	private EmployeeDto employee;
	
	@JsonIgnoreProperties(value = "doctor")
	private List<PatientDto> patients= new ArrayList<>();
}