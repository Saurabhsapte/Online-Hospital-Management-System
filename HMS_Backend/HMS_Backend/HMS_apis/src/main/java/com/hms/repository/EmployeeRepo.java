package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entities.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

}
