package com.hms.payloads;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
//@JsonInclude(value = Include.NON_NULL)
public class HealthHistoryDto {

	private int id;

	private String diseases;

	private LocalDate appointmentDate;

	private LocalTime appointmentTime;

	private Boolean paymentStatus;

	private String allocatedBed;

	private double paidAmount;

	@NotEmpty
	@Size(min = 5, message = "firstname must be min of 5 characters")
	private String symptoms;

	private LocalDate admitDate;

	@NotBlank
	@Size(min = 50, message = "min size of Health_History  desc is 50")
	private String prescriptionInstruction;

	private LocalDate dischargeDate;

	private LocalDate paymentDate;

	@JsonIgnoreProperties(value = "health_history")
	private PatientDto patient;

	@JsonIgnoreProperties(value = "healthHistory")
	private List<MedicineDto> medicines = new ArrayList<>();
}