package com.hms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hms.entities.Resources;

public interface ResourceRepo extends MongoRepository<Resources, Integer> {

}
