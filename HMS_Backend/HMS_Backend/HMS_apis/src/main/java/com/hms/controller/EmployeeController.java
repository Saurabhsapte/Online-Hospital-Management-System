package com.hms.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.config.AppConstants;
import com.hms.payloads.ApiResponse;
import com.hms.payloads.EmployeeDto;
import com.hms.payloads.EmployeeResponse;
import com.hms.services.EmployeeService;

@RestController
@RequestMapping("/api")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;

	// create admin
	@PostMapping("/employee/admin")
	public ResponseEntity<EmployeeDto> createAdmin(@Valid @RequestBody EmployeeDto employeeDto) {
		EmployeeDto createEmployee = this.employeeService.createAdmin(employeeDto);
		return new ResponseEntity<EmployeeDto>(createEmployee, HttpStatus.CREATED);
	}

	// -------------------------------------------------------------------------------------------------------------------------

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/employee/create/{Id}")
	public ResponseEntity<EmployeeDto> createEmployee(@Valid @RequestBody EmployeeDto employeeDto, @PathVariable Integer Id) {
		EmployeeDto createEmployee = this.employeeService.createEmployee(employeeDto,Id);
		return new ResponseEntity<EmployeeDto>(createEmployee, HttpStatus.CREATED);
	}

	// -------------------------------------------------------------------------------------------------------------------------

	// get all - pagination
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/employee")
	public ResponseEntity<EmployeeResponse> getAllEmployees(
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir) {

		EmployeeResponse employeeResponse = this.employeeService.getAllEmployees(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<EmployeeResponse>(employeeResponse, HttpStatus.OK);
	}

	// -------------------------------------------------------------------------------------------------------------------------

	// get
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/employee/{Id}")
	public ResponseEntity<EmployeeDto> getEmpoyee(@PathVariable Integer Id) {
		EmployeeDto employeeDto = this.employeeService.getEmployee(Id);
		return new ResponseEntity<EmployeeDto>(employeeDto, HttpStatus.OK);
	}

	// -------------------------------------------------------------------------------------------------------------------------

	// delete
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/employee/{Id}")
	public ResponseEntity<ApiResponse> deleteEmployee(@PathVariable Integer Id) {
		this.employeeService.deleteEmployee(Id);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Employee is deleted successfully !!", true),
				HttpStatus.OK);
	}

	// -------------------------------------------------------------------------------------------------------------------------
}