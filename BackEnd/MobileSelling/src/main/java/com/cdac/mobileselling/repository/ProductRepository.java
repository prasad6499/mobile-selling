package com.cdac.mobileselling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.mobileselling.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
