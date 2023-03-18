package com.hms.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.payloads.WardDto;
import com.hms.services.WardService;

@RestController
@RequestMapping("/api/wards")
public class WardController {

	@Autowired
	private WardService wardService;

	// create
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/")
	public ResponseEntity<WardDto> createWard(@Valid @RequestBody WardDto wardDto) {
		WardDto createWard = this.wardService.createWard(wardDto);
		return new ResponseEntity<WardDto>(createWard, HttpStatus.CREATED);
	}

	// ----------------------------------------------------------------------------------------------------------

	// get all
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@GetMapping("/")
	public ResponseEntity<List<WardDto>> getWard() {
		List<WardDto> wards = this.wardService.getward();
		return ResponseEntity.ok(wards);
	}
	
	//--------------------------------------------------------------------------------------------------------------
}