package com.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entities.Doctor;
import com.hms.entities.Patient;

public interface PatientRepo extends JpaRepository<Patient, Integer> {
	List<Patient> findByDoctor(Doctor doctor);
}
