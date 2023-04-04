package com.cdac.mobileselling.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;


@Entity
@JsonIgnoreProperties("user")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;


    @OneToMany(mappedBy = "cart", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Item> cartItems;

    private Double totalPrice;

    @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    public Cart() {
    }

    public Cart(Long cartId, List<Item> cartItems, Double totalPrice, User user) {
        this.cartId = cartId;
        this.cartItems = cartItems;
        this.totalPrice = totalPrice;
        this.user = user;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public List<Item> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<Item> cartItems) {
        this.cartItems = cartItems;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartId=" + cartId +
                ", cartItems=" + cartItems +
                ", totalPrice=" + totalPrice +
                ", user=" + user +
                '}';
    }
}
