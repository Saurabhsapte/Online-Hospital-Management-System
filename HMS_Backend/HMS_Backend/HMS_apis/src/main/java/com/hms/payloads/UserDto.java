package com.hms.payloads;

import java.time.LocalDate;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.hms.entities.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class UserDto {
	private int id;

	@NotEmpty
	@Size(min = 2, message = "firstname must be min of 2 characters")
	private String firstName;

	@NotEmpty
	@Size(min = 2, message = "lastname must be min of 2 characters")
	private String lastName;

	@Email(message = "Email address is not valid")
	private String email;

	@NotEmpty
	@JsonProperty(access = Access.WRITE_ONLY)
	@Pattern(regexp = "^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{4,15})$", message = "Password must be min of 4 characters and max of 15 characters and password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 digit ")
	private String password;

	@NotEmpty
	private String gender;

	@JsonInclude(value = Include.NON_NULL)
	private Set<Role> roles;

	@NotEmpty
	private String securityQue;

	@NotEmpty
	private String securityAns;

	@NotBlank
	@Size(min = 8, max = 15, message = "Mobile No must be min of 8 characters and max of 15 characters")
	private String mobileNo;

	private String bloodGroup;

	private LocalDate dob;

	private AddressDto address;

	@JsonIgnoreProperties(value = "user")
	private PatientDto patient;

	@JsonIgnoreProperties(value = "user")
	private EmployeeDto employee;
}
