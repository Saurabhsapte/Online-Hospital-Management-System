package com.hms.services;

import com.hms.payloads.EmployeeDto;
import com.hms.payloads.EmployeeResponse;

public interface EmployeeService {
	// create
	EmployeeDto createEmployee(EmployeeDto employeeDto, Integer Id);
	
	EmployeeDto createAdmin(EmployeeDto employeeDto);

	// get
	EmployeeDto getEmployee(Integer Id);
	
	// get all Employees
	EmployeeResponse getAllEmployees(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

	// delete
	void deleteEmployee(Integer Id);
}