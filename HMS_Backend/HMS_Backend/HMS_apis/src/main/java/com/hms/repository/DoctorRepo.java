package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entities.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor, Integer> {

}
