package com.hms.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Role {

	@Id
	private int id;

	private String name;

	public Role() {
	}

	public Role(int rolePatient, String name) {
		this.id = rolePatient;
		this.name = name;
	}
}