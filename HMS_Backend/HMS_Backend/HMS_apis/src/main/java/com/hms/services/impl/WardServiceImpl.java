package com.hms.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entities.Ward;
import com.hms.payloads.WardDto;
import com.hms.repository.WardRepo;
import com.hms.services.WardService;

@Service
public class WardServiceImpl implements WardService {

	@Autowired
	private WardRepo wardRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public WardDto createWard(WardDto wardDto) {
		Ward ward = this.modelMapper.map(wardDto, Ward.class);
		Ward addedWard = this.wardRepo.save(ward);
		return this.modelMapper.map(addedWard, WardDto.class);
	}

	// ------------------------------------------------------------------------------------------------------------

	// get all wards used to allocate ward to patient
	@Override
	public List<WardDto> getward() {
		List<Ward> wards = this.wardRepo.findAll();
		List<WardDto> wardDtos = wards.stream().map((ward) -> this.modelMapper.map(ward, WardDto.class))
				.collect(Collectors.toList());

		return wardDtos;
	}

	// ------------------------------------------------------------------------------------------------------------
}