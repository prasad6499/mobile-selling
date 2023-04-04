package com.cdac.mobileselling.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


@Entity
@JsonIgnoreProperties("cart")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private Integer quantity;
    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id" , unique = true)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    public Item() {
    }

    public Item(Long cartItemId, Integer quantity, Product product) {
        this.itemId = cartItemId;
        this.quantity = quantity;
        this.product = product;
    }

    public Item(Integer quantity, Product product) {
        this.quantity = quantity;
        this.product = product;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "orderItemId='" + itemId + '\'' +
                ", quantity=" + quantity +
                ", product=" + product +
                '}';
    }
}
