package com.hms.services.impl;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.config.AppConstants;
import com.hms.entities.Address;
import com.hms.entities.Doctor;
import com.hms.entities.Employee;
import com.hms.entities.Role;
import com.hms.entities.User;
import com.hms.exceptions.ResourceNotFoundException;
import com.hms.payloads.AddressDto;
import com.hms.payloads.DoctorDto;
import com.hms.payloads.EmployeeDto;
import com.hms.payloads.UserDto;
import com.hms.repository.AddressRepo;
import com.hms.repository.DoctorRepo;
import com.hms.repository.EmployeeRepo;
import com.hms.repository.RoleRepo;
import com.hms.repository.UserRepo;
import com.hms.services.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private DoctorRepo doctorRepo;

	@Autowired
	private EmployeeRepo employeeRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private AddressRepo addressRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private RoleRepo roleRepo;

	@Override
	public DoctorDto createDoctorN(EmployeeDto employeeDto) {

		Employee emp = this.modelMapper.map(employeeDto, Employee.class);

		UserDto userDto = employeeDto.getUser();
		User user = this.modelMapper.map(userDto, User.class);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		user.setAddress(null);
		Role role = this.roleRepo.findById(AppConstants.ROLE_DOCTOR)
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

		Doctor doc = new Doctor();
		doc.setEmployee(addedEmp);
		doc.setPatients(null);
		doc.setDoctorFee(100.00);
		doc.setStartTime(LocalTime.NOON);
		doc.setEndTime(LocalTime.NOON);
		doc.setDays(
				"{\"sunday\":false,\"monday\":false,\"tuesday\":false,\"wednesday\":false,\"thursday\":false,\"friday\":false,\"saturday\":false}");
		Doctor addedDoc = this.doctorRepo.save(doc);
		return this.modelMapper.map(addedDoc, DoctorDto.class);
	}

	// ------------------------------------------------------------------------------------------------

	@Override
	public DoctorDto selectSchedule(DoctorDto doctorDto, Integer doctorId, String days) {
		Doctor doc = this.doctorRepo.findById(doctorId)
				.orElseThrow(() -> new ResourceNotFoundException("Doctor ", "Doctor Id", doctorId));

		doc.setStartTime(doctorDto.getStartTime());
		doc.setEndTime(doctorDto.getEndTime());
		doc.setDays(days);
		Doctor updateddoc = this.doctorRepo.save(doc);
		return this.modelMapper.map(updateddoc, DoctorDto.class);
	}

	// ---------------------------------------------------------------------------------------------------

	@Override
	public List<DoctorDto> getDoctor() {
		List<Doctor> doctors = this.doctorRepo.findAll();
		List<DoctorDto> docDtos = doctors.stream().map((doc) -> this.modelMapper.map(doc, DoctorDto.class))
				.collect(Collectors.toList());
		return docDtos;
	}

	// -------------------------------------------------------------------------------------------------------
}