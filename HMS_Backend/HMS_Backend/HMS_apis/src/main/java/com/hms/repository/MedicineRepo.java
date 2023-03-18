package com.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entities.Health_History;
import com.hms.entities.Medicine;

public interface MedicineRepo extends JpaRepository<Medicine, Integer>{
	
	List<Medicine> findByHealthHistory(Health_History health);
}