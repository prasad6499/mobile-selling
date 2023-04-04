package com.cdac.mobileselling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.mobileselling.dto.ItemDto;
import com.cdac.mobileselling.service.CartService;

import javax.management.InstanceNotFoundException;

import static org.springframework.http.ResponseEntity.status;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/cart")
public class CartController {


    @Autowired
    private CartService cartService;

    @GetMapping("/")
    public ResponseEntity<?> getCart(){
        return status(200).body(cartService.getCart());
    }

    @PostMapping("/add-item")
    public ResponseEntity<?> addToCart(@RequestBody ItemDto itemDto) throws InstanceNotFoundException {
        return status(200).body(cartService.addToCart(itemDto));
    }

    @DeleteMapping("/remove-item/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long itemId) throws InstanceNotFoundException {
        return status(200).body(cartService.removeFromCart(itemId));
    }


}
