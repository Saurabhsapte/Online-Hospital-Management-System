package com.hms.payloads;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class EmployeeDto {
	
	private Integer id;
	
//	@NotEmpty
	private String qualificaton;

	private double salary;
	
	private LocalDate Hiredate;

	private boolean status;
	
	@JsonIgnoreProperties(value = "employee")
	private UserDto user;

	@JsonIgnoreProperties(value = "employee")
	private DoctorDto doctor;
	
	public boolean getStatus() {
		return status;
	}
}
