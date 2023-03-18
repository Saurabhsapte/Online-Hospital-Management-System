package com.hms.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.payloads.DoctorDto;
import com.hms.payloads.EmployeeDto;
import com.hms.services.DoctorService;

@RestController
@RequestMapping("/api")
public class DoctorController {

	@Autowired
	private DoctorService doctorService;

	// create doctor
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/doctor")
	public ResponseEntity<DoctorDto> createDoctorN(@Valid @RequestBody EmployeeDto empDto) {
		DoctorDto createDoctor = this.doctorService.createDoctorN(empDto);
		return new ResponseEntity<DoctorDto>(createDoctor, HttpStatus.CREATED);
	}

	// ------------------------------------------------------------------------------------------

	// get all
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@GetMapping("/doctors")
	public ResponseEntity<List<DoctorDto>> getDoctor() {
		List<DoctorDto> doctor = this.doctorService.getDoctor();
		return ResponseEntity.ok(doctor);
	}

	// ----------------------------------------------------------------------------------------------

	@PreAuthorize("hasRole('DOCTOR')")
	@PutMapping("/doctor/{docId}/schedule/{days}")
	public ResponseEntity<DoctorDto> selectSchedule(@Valid @RequestBody DoctorDto doctorDto,
			@PathVariable Integer docId, @PathVariable String days) {

		DoctorDto updatedDoctor = this.doctorService.selectSchedule(doctorDto, docId, days);
		return new ResponseEntity<DoctorDto>(updatedDoctor, HttpStatus.OK);
	}

	// ----------------------------------------------------------------------------------------------
}