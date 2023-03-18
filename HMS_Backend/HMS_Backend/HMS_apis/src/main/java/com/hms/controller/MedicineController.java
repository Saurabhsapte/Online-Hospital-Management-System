package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.payloads.MedicineDto;
import com.hms.services.MedicineService;

@RestController
@RequestMapping("/api")
public class MedicineController {

	@Autowired
	private MedicineService medicineService;

	// create
	@PostMapping("/healthhistory/{healthId}/medicine")
	public ResponseEntity<MedicineDto> createMedicine(@RequestBody MedicineDto medicineDto,
			@PathVariable Integer healthId) {
		MedicineDto createMedicine = this.medicineService.createMedicine(medicineDto, healthId);
		return new ResponseEntity<MedicineDto>(createMedicine, HttpStatus.CREATED);
	}

	//------------------------------------------------------------------------------------------------------------------
	
	// get medicine by health history
	@GetMapping("/healthhistory/{healthId}/medicine")
	public ResponseEntity<List<MedicineDto>> getMedicineByHealthHistory(@PathVariable Integer healthId) {
		List<MedicineDto> medicine = this.medicineService.getMedicineByHealthHistory(healthId);
		return new ResponseEntity<List<MedicineDto>>(medicine, HttpStatus.OK);
	}
	
	//------------------------------------------------------------------------------------------------------------------
}
