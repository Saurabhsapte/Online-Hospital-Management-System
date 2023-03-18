package com.hms.services;

import com.hms.payloads.ResourceDto;
import com.hms.payloads.ResourceResponse;

public interface ResourceService {
	// create
	ResourceDto createResource(ResourceDto resourceDto);

	// update
	ResourceDto updateResource(ResourceDto resourceDto, Integer Id);

	// delete
	void deleteResource(Integer Id);

	// get
	ResourceDto getResource(Integer Id);

	// get All
	ResourceResponse getAllResources(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
}