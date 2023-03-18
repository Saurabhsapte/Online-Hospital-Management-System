package com.hms.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.config.AppConstants;
import com.hms.payloads.ApiResponse;
import com.hms.payloads.ResourceDto;
import com.hms.payloads.ResourceResponse;
import com.hms.services.ResourceService;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin
public class ResourceController {

	@Autowired
	private ResourceService resourceService;

	// create
	@PostMapping("/add")
	public ResponseEntity<ResourceDto> createResource(@Valid @RequestBody ResourceDto resourceDto) {
		ResourceDto createResource = this.resourceService.createResource(resourceDto);
		return new ResponseEntity<ResourceDto>(createResource, HttpStatus.CREATED);
	}

	// update
	@PutMapping("/{Id}")
	public ResponseEntity<ResourceDto> updateResource(@Valid @RequestBody ResourceDto resourceDto, @PathVariable Integer Id) {
		ResourceDto updatedResource = this.resourceService.updateResource(resourceDto, Id);
		return new ResponseEntity<ResourceDto>(updatedResource, HttpStatus.OK);
	}

	// delete
	@DeleteMapping("/{Id}")
	public ResponseEntity<ApiResponse> deleteResource(@PathVariable Integer Id) {
		this.resourceService.deleteResource(Id);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Resource is deleted successfully !!", true), HttpStatus.OK);
	}

	// get
	@GetMapping("/{Id}")
	public ResponseEntity<ResourceDto> getResource(@PathVariable Integer Id) {
		ResourceDto resourceDto = this.resourceService.getResource(Id);
		return new ResponseEntity<ResourceDto>(resourceDto, HttpStatus.OK);
	}

	// get all
	@GetMapping
	public ResponseEntity<ResourceResponse> getAllResources(
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir) {

		ResourceResponse resourceResponse = this.resourceService.getAllResources(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<ResourceResponse>(resourceResponse, HttpStatus.OK);
	}
}
