package com.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entities.Health_History;
import com.hms.entities.Patient;

public interface HealthHistoryRepo extends JpaRepository<Health_History, Integer>{
	List<Health_History> findByPatient(Patient patient);
}
