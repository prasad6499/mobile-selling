package com.cdac.mobileselling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.mobileselling.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
