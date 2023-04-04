package com.cdac.mobileselling.dto;

public class ItemDto {
    private Long productId;
    private Integer quantity;

    public ItemDto() {
    }

    public ItemDto(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "ItemDto{" +
                "productId=" + productId +
                ", quantity=" + quantity +
                '}';
    }
}
