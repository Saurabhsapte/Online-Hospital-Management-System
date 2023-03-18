package com.hms.payloads;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class WardDto {

	private Integer id;

	private String wardType;

	private Double wardCharges;

	@JsonIgnoreProperties(value = "ward")
	private Set<PatientDto> patients = new HashSet<>();
}