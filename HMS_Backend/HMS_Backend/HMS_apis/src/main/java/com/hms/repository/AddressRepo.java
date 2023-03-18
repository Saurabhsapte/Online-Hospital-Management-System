package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entities.Address;

public interface AddressRepo extends JpaRepository<Address, Integer> {

}
