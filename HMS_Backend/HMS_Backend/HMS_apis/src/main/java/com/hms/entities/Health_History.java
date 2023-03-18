package com.hms.entities;

import java.time.LocalDate;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "health_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Health_History {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "health_history_Id")
	private Integer id;

	@Column(length = 300)
	private String diseases;

	@Column(name = "appointment_date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate appointmentDate;

	@Column(name = "symptoms", length = 100)
	private String symptoms;

	@Column(name = "paid_amount")
	private double paidAmount;

	@Column(name = "appointment_time")
	@JsonFormat(pattern = "HH:mm:ss")
	private LocalTime appointmentTime;

	@Column(name = "admit_date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate admitDate;

	@Column(name = "payment_status", columnDefinition = "boolean default false")
	private Boolean paymentStatus;

	@Column(name = "allocated_bed", length = 45)
	private String allocatedBed;

	@Column(name = "prescription_instruction", length = 1000)
	private String prescriptionInstruction;

	@Column(name = "discharge_date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dischargeDate;

	@CreationTimestamp
	@Column(name = "payment_date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate paymentDate;

	@ManyToOne
	@JoinColumn(name = "patient_Id", nullable = false)
	private Patient patient;

	@OneToMany(mappedBy = "healthHistory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Medicine> medicines = new ArrayList<>();
}