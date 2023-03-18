package com.hms.entities;

import org.springframework.data.annotation.Transient;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("resources")
public class Resources {

    @Transient
    public static final String SEQUENCE_NAME = "resource_sequence";
    
	@Id
	private int id;

	private String resource_name;

	private int total_quantity;

	private int occupy_quantity;

	private int remaining_quantity;
}