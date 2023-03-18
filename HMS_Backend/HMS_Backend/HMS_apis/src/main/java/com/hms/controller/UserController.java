package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.payloads.UserDto;
import com.hms.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
		// get
		@GetMapping("/{Id}")
		public ResponseEntity<UserDto> getUser(@PathVariable Integer Id) {
			UserDto userDto = this.userService.getUser(Id);
			return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
		}
		
		//--------------------------------------------------------------------------------
		
		//forgot Pass
		@GetMapping("/email/{email}")
		public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
			UserDto userDto = this.userService.getUserByEmail(email);
			return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
		}
		
		//--------------------------------------------------------------------------------
		
}
