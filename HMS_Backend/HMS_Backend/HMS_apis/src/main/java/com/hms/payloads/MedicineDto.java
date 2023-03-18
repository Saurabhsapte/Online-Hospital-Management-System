package com.hms.payloads;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class MedicineDto {
	private int id;

	private String medicineName;

	private String duration;

	private Integer quantity;

	private Double medicineCharges;

	@JsonIgnoreProperties(value = "medicines")
	private HealthHistoryDto healthHistory;
}