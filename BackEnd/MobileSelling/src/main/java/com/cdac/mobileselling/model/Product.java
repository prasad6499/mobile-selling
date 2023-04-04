package com.cdac.mobileselling.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String name;
    private Double price;
    private String category;
    private String imagePath;

    public Product() {
    }

    public Product(String name, Double price, String category, String imagePath) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.imagePath = imagePath;
    }

    public Product(Long productId, String name, Double price, String category, String imagePath) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.category = category;
        this.imagePath = imagePath;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", category='" + category + '\'' +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }
}
