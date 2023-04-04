package com.cdac.mobileselling.dto;

import org.springframework.web.multipart.MultipartFile;

public class ProductDto {
    private String name;
    private Double price;
    private String category;
    private MultipartFile image;

    public ProductDto(String name, Double price, String category, MultipartFile image) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
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

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "ProductDto{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", category='" + category + '\'' +
                ", image=" + image +
                '}';
    }
}
