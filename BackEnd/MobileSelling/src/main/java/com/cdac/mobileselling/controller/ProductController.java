package com.cdac.mobileselling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.mobileselling.dto.ProductDto;
import com.cdac.mobileselling.service.ProductService;

import javax.management.InstanceNotFoundException;

import static org.springframework.http.ResponseEntity.status;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts(){
        return status(200).body(productService.getAll());
    }

    @GetMapping("/by-id/{:productId}")
    public ResponseEntity<?> getById(@PathVariable Long productId){
        return status(200).body(productService.findById(productId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@ModelAttribute ProductDto productDto){
        return status(201).body(productService.addProduct(productDto));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<?> update(@ModelAttribute ProductDto productDto, @PathVariable Long productId) throws InstanceNotFoundException {
        return status(201).body(productService.updateProduct(productDto, productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> delete(@PathVariable Long productId){
        productService.deleteProduct(productId);
        return status(200).body("Deleted successfully.");
    }
}
