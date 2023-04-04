package com.cdac.mobileselling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.mobileselling.model.Item;
import com.cdac.mobileselling.model.Product;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByProduct(Product product);
}
