package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entities.Ward;

public interface WardRepo extends JpaRepository<Ward, Integer> {

}
