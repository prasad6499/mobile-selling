package com.cdac.mobileselling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.mobileselling.model.Order;
import com.cdac.mobileselling.model.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUser(User user);
}
