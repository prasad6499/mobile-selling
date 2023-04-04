package com.cdac.mobileselling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.mobileselling.model.OrderItem;


public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
