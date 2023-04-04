package com.cdac.mobileselling.service;

import org.hibernate.InstantiationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cdac.mobileselling.dto.ProductDto;
import com.cdac.mobileselling.model.Product;
import com.cdac.mobileselling.repository.ProductRepository;

import javax.management.InstanceNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class ProductService {

    private final String BASE_URL = "http://localhost:8000";

    private final Path fileStoragePath = Paths.get("src\\main\\resources\\static\\images").toAbsolutePath().normalize();;

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAll(){
        return productRepository.findAll();
    }

    public Optional<Product> findById(Long id){
        return productRepository.findById(id);
    }

    public Product addProduct(ProductDto productDto){

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(productDto.getImage().getOriginalFilename()));
        fileName = fileName.replace(" ", "");
        Path filePath = Paths.get(fileStoragePath + "\\" + fileName);

        try {

            Files.copy(productDto.getImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {

            e.printStackTrace();
        }
        Product product = new Product();
        product.setCategory(productDto.getCategory());
        product.setImagePath(BASE_URL + "/images/" + fileName);
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());


        return productRepository.save(product);
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

    public Product updateProduct(ProductDto productDto, Long id) throws InstanceNotFoundException {
        Optional<Product> product = productRepository.findById(id);


        Product product1 = product.get();
        product1.setCategory(productDto.getCategory());

        product1.setName(productDto.getName());
        product1.setPrice(productDto.getPrice());

        if(productDto.getImage()!=null && !productDto.getImage().isEmpty()){
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(productDto.getImage().getOriginalFilename()));
            fileName = fileName.replace(" ", "");
            Path filePath = Paths.get(fileStoragePath + "\\" + fileName);

            try {

                Files.copy(productDto.getImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {

                e.printStackTrace();
            }

            product1.setImagePath(BASE_URL + "/images/" + fileName);
        }

        return productRepository.save(product1);
    }
}
