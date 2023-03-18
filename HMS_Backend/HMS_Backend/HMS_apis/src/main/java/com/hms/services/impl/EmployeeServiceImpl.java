package com.hms.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.config.AppConstants;
import com.hms.entities.Address;
import com.hms.entities.Employee;
import com.hms.entities.Role;
import com.hms.entities.User;
import com.hms.exceptions.ResourceNotFoundException;
import com.hms.payloads.AddressDto;
import com.hms.payloads.EmployeeDto;
import com.hms.payloads.EmployeeResponse;
import com.hms.payloads.UserDto;
import com.hms.repository.AddressRepo;
import com.hms.repository.EmployeeRepo;
import com.hms.repository.RoleRepo;
import com.hms.repository.UserRepo;
import com.hms.services.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepo employeeRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private RoleRepo roleRepo;

	@Autowired
	private AddressRepo addressRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public EmployeeDto createAdmin(EmployeeDto employeeDto) {
		Employee emp = this.modelMapper.map(employeeDto, Employee.class);

		UserDto userDto = employeeDto.getUser();
		User user = this.modelMapper.map(userDto, User.class);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		user.setAddress(null);
		Role role = this.roleRepo.findById(AppConstants.ROLE_ADMIN)
				.orElseThrow((() -> new ResourceNotFoundException("Role", "Role id", 0)));

		user.addRole(role);
		User addedUser = this.userRepo.save(user);

		AddressDto addressDto = userDto.getAddress();
		Address address = this.modelMapper.map(addressDto, Address.class);

		address.setUser(addedUser);
		Address addedAddress = this.addressRepo.save(address);

		User userAddedAddress = addedAddress.getUser();

		emp.setUser(userAddedAddress);
		Employee addedEmp = this.employeeRepo.save(emp);
		return this.modelMapper.map(addedEmp, EmployeeDto.class);
	}

	// --------------------------------------------------------------------------------------------------------------

	// create employee
	@SuppressWarnings("unused")
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto, Integer Id) {
Employee emp = this.modelMapper.map(employeeDto, Employee.class);
		
		UserDto userDto = employeeDto.getUser();
		User user = this.modelMapper.map(userDto, User.class);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		user.setAddress(null);
		Role role = this.roleRepo.findById(Id)
				.orElseThrow((() -> new ResourceNotFoundException("Role", "Role id", 0)));
		
		user.addRole(role);
		User addedUser = this.userRepo.save(user);

		AddressDto addressDto = userDto.getAddress();
		Address address = this.modelMapper.map(addressDto, Address.class);
		
		
		address.setUser(addedUser);
		@SuppressWarnings("unused")
		Address addedAddress = this.addressRepo.save(address);
		
		emp.setUser(addedUser);
		Employee addedEmp = this.employeeRepo.save(emp);
		return this.modelMapper.map(addedEmp, EmployeeDto.class);
	}

	// --------------------------------------------------------------------------------------------------------------

	@Override
	public EmployeeDto getEmployee(Integer Id) {
		Employee emp = this.employeeRepo.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee", "employee id", Id));
		return this.modelMapper.map(emp, EmployeeDto.class);
	}

	// --------------------------------------------------------------------------------------------------------------

	@Override
	public EmployeeResponse getAllEmployees(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Employee> pageEmp = this.employeeRepo.findAll(p);

		List<Employee> allEmps = pageEmp.getContent();

		List<EmployeeDto> EmployeeDtos = allEmps.stream().map((emp) -> this.modelMapper.map(emp, EmployeeDto.class))
				.collect(Collectors.toList());

		EmployeeResponse employeeResponse = new EmployeeResponse();

		employeeResponse.setContent(EmployeeDtos);
		employeeResponse.setPageNumber(pageEmp.getNumber());
		employeeResponse.setPageSize(pageEmp.getSize());
		employeeResponse.setTotalElements(pageEmp.getTotalElements());

		employeeResponse.setTotalPages(pageEmp.getTotalPages());
		employeeResponse.setLastPage(pageEmp.isLast());

		return employeeResponse;
	}

	// --------------------------------------------------------------------------------------------------------------

	@Override
	public void deleteEmployee(Integer Id) {
		Employee emp = this.employeeRepo.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee", "employee id", Id));

		User user = emp.getUser();
		user.getRoles().clear();
		this.userRepo.delete(user);
	}

	// --------------------------------------------------------------------------------------------------------------
}