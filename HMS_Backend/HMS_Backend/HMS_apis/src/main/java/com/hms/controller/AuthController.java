package com.hms.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.entities.User;
import com.hms.exceptions.ApiException;
import com.hms.payloads.JwtAuthRequest;
import com.hms.payloads.JwtAuthResponse;
import com.hms.payloads.PatientDto;
import com.hms.payloads.UserDto;
import com.hms.security.JwtTokenHelper;
import com.hms.services.PatientService;
import com.hms.services.UserService;

@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private PatientService patientService;
	
	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {

		this.authenticate(request.getUsername(), request.getPassword());

		UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());

		String token = this.jwtTokenHelper.generateToken(userDetails);

		JwtAuthResponse response = new JwtAuthResponse();

		response.setToken(token);
		response.setUser(this.modelMapper.map((User) userDetails, UserDto.class));

		return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
	}

	private void authenticate(String username, String password) throws Exception {

		System.out.println("*****************" + username + "***" + password);

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);

		System.out.println(
				"*****************" + authenticationToken.getName() + "***" + authenticationToken.getCredentials());

		try {
			this.authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			System.out.println("invalid Details!..");
			throw new ApiException("Invalid username or password !..");
		}
	}

	// --------------------------------------------------------------------------------------------------------------------

	// register patient
	@PostMapping("/register")
	public ResponseEntity<PatientDto> registerPatient(@RequestBody PatientDto patientDto) {
		PatientDto createPatient = this.patientService.createPatient(patientDto);
		return new ResponseEntity<PatientDto>(createPatient, HttpStatus.CREATED);
	}
	
	// --------------------------------------------------------------------------------------------------------------------
	
	// Forgot Password
	@PutMapping("/email/{email}/forgot/{password}")
	public ResponseEntity<UserDto> forgotPass(@PathVariable String email,@PathVariable String password) {
 
		UserDto updatedUser = this.userService.forgotPass(email, password);
		return new ResponseEntity<UserDto>(updatedUser, HttpStatus.OK);
	}
}
