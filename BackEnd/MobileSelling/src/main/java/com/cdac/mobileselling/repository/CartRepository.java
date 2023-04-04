package com.cdac.mobileselling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.mobileselling.model.Cart;
import com.cdac.mobileselling.model.User;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByUser(User user);
}
