package com.hms.services;

import java.util.List;

import com.hms.payloads.WardDto;



public interface WardService {
		// create
		WardDto createWard(WardDto wardDto);

		// get All
		List<WardDto> getward();
}
