package com.hms.entities;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "patient_Id")
	private Integer id;

	@Column(name = "admit_status", columnDefinition = "boolean default false")
	private Boolean admitStatus;

	@Column(name = "current_status", columnDefinition = "boolean default false")
	private Boolean currentStatus;

	@OneToOne()
	@JoinColumn(name = "user_Id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "doctor_Id")
	private Doctor doctor;

	@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Health_History> health_history = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "ward_Id")
	private Ward ward;
}