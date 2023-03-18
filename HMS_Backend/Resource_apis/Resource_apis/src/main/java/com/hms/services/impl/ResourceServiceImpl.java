package com.hms.services.impl;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.hms.entities.DbSequence;
import com.hms.entities.Resources;
import com.hms.exceptions.ResourceNotFoundException;
import com.hms.payloads.ResourceDto;
import com.hms.payloads.ResourceResponse;
import com.hms.repository.ResourceRepo;
import com.hms.services.ResourceService;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;


@Service
public class ResourceServiceImpl implements ResourceService {

	@Autowired
	private ResourceRepo resourceRepo;
	
    @Autowired
    private MongoOperations mongoOperations;
	
	//jugad
	//static int autoId=1;

	@Autowired
	private ModelMapper modelMapper;
	
	public int getSequenceNumber(String sequenceName) {
        //get sequence no
        Query query = new Query(Criteria.where("id").is(sequenceName));
        //update the sequence no
        Update update = new Update().inc("seq", 1);
        //modify in document
        DbSequence counter = mongoOperations
                .findAndModify(query,
                        update, options().returnNew(true).upsert(true),
                        DbSequence.class);

        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }

	@Override
	public ResourceDto createResource(ResourceDto resourceDto) {
		Resources resource = this.modelMapper.map(resourceDto, Resources.class);
		//resource.setId(autoId++);
		resource.setId(getSequenceNumber("resource_sequence"));
		Resources addedResource = this.resourceRepo.save(resource);
		return this.modelMapper.map(addedResource, ResourceDto.class);
	}

	@Override
	public ResourceDto updateResource(ResourceDto resourceDto, Integer Id) {
		Resources resource = this.resourceRepo.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Resource ", "Resource id", Id));

		resource.setResource_name(resourceDto.getResource_name());
		resource.setOccupy_quantity(resourceDto.getOccupy_quantity());
		resource.setRemaining_quantity(resourceDto.getRemaining_quantity());
		resource.setTotal_quantity(resourceDto.getTotal_quantity());

		Resources updatedResource = this.resourceRepo.save(resource);
		return this.modelMapper.map(updatedResource, ResourceDto.class);
	}

	@Override
	public void deleteResource(Integer Id) {
		Resources resource = this.resourceRepo.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Resource ", "Resource id", Id));
		this.resourceRepo.delete(resource);
	}

	@Override
	public ResourceDto getResource(Integer Id) {
		Resources resource = this.resourceRepo.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Resource ", "Resource id", Id));
		return this.modelMapper.map(resource, ResourceDto.class);
	}

	@Override
	public ResourceResponse getAllResources(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Resources> pageResource = this.resourceRepo.findAll(p);

		List<Resources> allResources = pageResource.getContent();

		List<ResourceDto> resourceDtos = allResources.stream()
				.map((patient) -> this.modelMapper.map(patient, ResourceDto.class)).collect(Collectors.toList());

		ResourceResponse resourceResponse = new ResourceResponse();

		resourceResponse.setContent(resourceDtos);
		resourceResponse.setPageNumber(pageResource.getNumber());
		resourceResponse.setPageSize(pageResource.getSize());
		resourceResponse.setTotalElements(pageResource.getTotalElements());

		resourceResponse.setTotalPages(pageResource.getTotalPages());
		resourceResponse.setLastPage(pageResource.isLast());

		return resourceResponse;
	}

}
