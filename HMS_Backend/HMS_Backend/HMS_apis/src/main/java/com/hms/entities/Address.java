package com.hms.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "address")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "user")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "address_Id")
	private int id;

	@Column(name = "plot_no", length = 45)
	private String plotNo;

	@Column(name = "building_name", length = 45)
	private String buildingName;

	@Column(name = "area_name", length = 45)
	private String areaName;

	@Column(length = 45)
	private String city;

	@Column(length = 45)
	private String state;

	@Column(length = 45)
	private String country;

	@Column(length = 20)
	private int pincode;

	@OneToOne()
	@JoinColumn(name = "user_Id")
	private User user;
}