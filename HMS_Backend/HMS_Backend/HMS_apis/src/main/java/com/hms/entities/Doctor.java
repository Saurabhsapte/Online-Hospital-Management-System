package com.hms.entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "doctor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "doctor_Id")
	private int id;

	@Column(name = "doctor_fee", nullable = false, length = 100)
	private double doctorFee;

	@Column(name = "scheduled_start_time")
	@JsonFormat(pattern = "HH:mm:ss")
	private LocalTime startTime;

	@Column(name = "scheduled_end_time")
	@JsonFormat(pattern = "HH:mm:ss")
	private LocalTime endTime;

	private String days;

	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Patient> patients = new ArrayList<>();

	@OneToOne()
	@JoinColumn(name = "employee_id", nullable = false)
	private Employee employee;
}