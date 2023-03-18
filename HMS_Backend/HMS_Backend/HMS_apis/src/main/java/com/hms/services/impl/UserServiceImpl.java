package com.hms.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.entities.User;
import com.hms.exceptions.ResourceNotFoundException;
import com.hms.payloads.UserDto;
import com.hms.repository.UserRepo;
import com.hms.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDto getUser(Integer Id) {
		User user = this.userRepo.findById(Id).orElseThrow(() -> new ResourceNotFoundException("User", "User id", Id));
		return this.modelMapper.map(user, UserDto.class);
	}

	@Override
	public UserDto getUserByEmail(String email) {
		User user = this.userRepo.findByEmail(email).orElseThrow();
		return this.modelMapper.map(user, UserDto.class);
	}

	@Override
	public UserDto forgotPass(String email, String password) {
		
		User user = this.userRepo.findByEmail(email).orElseThrow();
		user.setPassword(this.passwordEncoder.encode(password));
		
		User updateduser= this.userRepo.save(user);
		return this.modelMapper.map(updateduser, UserDto.class);
	}
}
