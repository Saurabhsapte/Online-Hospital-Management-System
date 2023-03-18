package com.hms.payloads;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class ResourceDto {
	private int id;
	
	private String resource_name;

	private int occupy_quantity;

	private int remaining_quantity;

	private int total_quantity;
}