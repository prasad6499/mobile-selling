package com.cdac.mobileselling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.cdac.mobileselling.model.Role;
import com.cdac.mobileselling.model.Roles;
import com.cdac.mobileselling.repository.RolesRepository;

@SpringBootApplication
public class MobileSellingApplication {

	public static void main(String[] args) {
		SpringApplication.run(MobileSellingApplication.class, args);
	}

	private final RolesRepository rolesRepository;

	public MobileSellingApplication(RolesRepository rolesRepository) {
		this.rolesRepository = rolesRepository;
	}


	@EventListener(ApplicationReadyEvent.class)
	public void initializeRoles() {
		if(rolesRepository.findByRoleName(Role.USER)==null)
			rolesRepository.save(new Roles(Role.USER));
		if(rolesRepository.findByRoleName(Role.OWNER)==null)
			rolesRepository.save(new Roles(Role.OWNER));

	}

}
