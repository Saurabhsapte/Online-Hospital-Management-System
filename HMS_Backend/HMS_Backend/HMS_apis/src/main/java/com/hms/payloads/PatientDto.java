package com.hms.payloads;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
//@JsonInclude(value = Include.NON_NULL)
public class PatientDto {

	private Integer id;

	private Boolean admitStatus;

	private Boolean currentStatus;

	@JsonIgnoreProperties(value = "patient")
	private UserDto user;

	@JsonIgnoreProperties(value = "patients")
	private DoctorDto doctor;

	@JsonIgnoreProperties(value = "patients")
	private WardDto ward;

	@JsonIgnoreProperties(value = "patient")
	private List<HealthHistoryDto> health_history = new ArrayList<>();
}
