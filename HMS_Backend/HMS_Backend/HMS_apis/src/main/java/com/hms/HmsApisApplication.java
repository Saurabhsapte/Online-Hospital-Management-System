package com.hms;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.hms.config.AppConstants;
import com.hms.entities.Role;
import com.hms.repository.RoleRepo;

@SpringBootApplication
@EnableEurekaClient
public class HmsApisApplication implements CommandLineRunner {

	@Autowired
	private RoleRepo roleRepo;

	public static void main(String[] args) {
		SpringApplication.run(HmsApisApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}
	
	@Override
	public void run(String... args) throws Exception {

		try {
			Role role = new Role();
			role.setId(AppConstants.ROLE_PATIENT);
			role.setName("ROLE_PATIENT");

			Role role1 = new Role();
			role1.setId(AppConstants.ROLE_DOCTOR);
			role1.setName("ROLE_DOCTOR");

			Role role2 = new Role();
			role2.setId(AppConstants.ROLE_ACCOUNTANT);
			role2.setName("ROLE_ACCOUNTANT");

			Role role3 = new Role();
			role3.setId(AppConstants.ROLE_RECEPTIONIST);
			role3.setName("ROLE_RECEPTIONIST");

			Role role4 = new Role();
			role4.setId(AppConstants.ROLE_ADMIN);
			role4.setName("ROLE_ADMIN");

			List<Role> roles = List.of(role, role1, role2, role3, role4);

			List<Role> result = this.roleRepo.saveAll(roles);

			result.forEach((r) -> {
				System.out.println(r.getName());
			});
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}