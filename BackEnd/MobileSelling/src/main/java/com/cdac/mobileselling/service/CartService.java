package com.cdac.mobileselling.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.mobileselling.dto.ItemDto;
import com.cdac.mobileselling.model.Cart;
import com.cdac.mobileselling.model.Item;
import com.cdac.mobileselling.model.Product;
import com.cdac.mobileselling.model.User;
import com.cdac.mobileselling.repository.CartRepository;
import com.cdac.mobileselling.repository.ItemRepository;
import com.cdac.mobileselling.repository.ProductRepository;

import javax.management.InstanceNotFoundException;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AuthService authService;

    public Cart getCart(){
        Cart cart = cartRepository.findByUser(authService.getLoggedInUser());
        double totalPrice = 0;
        for(Item item: cart.getCartItems()){
            totalPrice = totalPrice + item.getQuantity()*item.getProduct().getPrice();
        }

        cart.setTotalPrice(totalPrice);

        return cartRepository.save(cart);
    }

    public Cart addToCart(ItemDto itemDto) throws InstanceNotFoundException {
        User user = authService.getLoggedInUser();


        Cart cart = cartRepository.findByUser(user);



        if(cart==null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setTotalPrice(0d);
            cart = cartRepository.save(cart);
        }

        Optional<Product> product = productRepository.findById(itemDto.getProductId());
        if(product.isEmpty()) throw new InstanceNotFoundException("Product not found");
        Item item = itemRepository.findByProduct(product.get());
        if(item== null) {
            item = new Item();
            item.setProduct(product.get());
            item.setQuantity(itemDto.getQuantity());
            item.setCart(cart);
        }else {
            item.setQuantity(item.getQuantity() + itemDto.getQuantity());
        }

        itemRepository.save(item);

        cart.setTotalPrice(cart.getTotalPrice()+item.getQuantity()*item.getProduct().getPrice());


        return cartRepository.save(cart);
    }

    public Cart removeFromCart(Long itemId){
        // Cart cart = cartRepository.findByUser(authService.getLoggedInUser());
        Optional<Item> item = itemRepository.findById(itemId);
        if(item.isPresent()){
            Item item1 = item.get();
            item1.setProduct(null);
            item1.setCart(null);
            itemRepository.save(item1);

            itemRepository.deleteById(item1.getItemId());

        }

        return cartRepository.findByUser(authService.getLoggedInUser());
    }

}
