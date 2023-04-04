package com.cdac.mobileselling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.mobileselling.model.Role;
import com.cdac.mobileselling.model.Roles;

public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles findByRoleName(Role role);
}
