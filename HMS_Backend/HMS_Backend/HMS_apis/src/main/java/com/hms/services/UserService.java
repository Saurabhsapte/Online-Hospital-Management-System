package com.hms.services;

import com.hms.payloads.UserDto;

public interface UserService {
			// get
			UserDto getUser(Integer Id);
			
			UserDto getUserByEmail(String email);
			
			UserDto forgotPass(String email, String password);
}