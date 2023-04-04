package com.cdac.mobileselling.service;


import com.cdac.mobileselling.model.*;
import com.cdac.mobileselling.repository.CartRepository;
import com.cdac.mobileselling.repository.ItemRepository;
import com.cdac.mobileselling.repository.OrderItemRepository;
import com.cdac.mobileselling.repository.OrderRepository;
import com.cdac.mobileselling.util.MailSenderService;
import com.cdac.mobileselling.util.QRCodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    private static final String QR_CODE_IMAGE_PATH = "./src/main/resources/static/images/QRCode/";

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private AuthService authService;

    @Autowired
    private MailSenderService mailSenderService;

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Order getMyOrder(){
        return orderRepository.findByUser(authService.getLoggedInUser());
    }

    public Order placeOrder() throws IOException, WriterException, MessagingException {

        String qrCodeName = UUID.randomUUID().toString();

        User user = authService.getLoggedInUser();
        Cart cart = cartRepository.findByUser(user);

        Order order = orderRepository.findByUser(user);

        if(order==null){
            order = new Order();
            order.setOrderStatus("PLACED");
            order.setUser(user);
            order.setPaymentStatus("PAID");
            orderRepository.save(order);
        }


        for(Item item: cart.getCartItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setOrder(order);
            orderItemRepository.save(orderItem);

            item.setCart(null);
            item.setProduct(null);
            itemRepository.save(item);
            itemRepository.deleteById(item.getItemId());
        }

        order.setTotalPrice(cart.getTotalPrice());

        order = orderRepository.save(order);

        String qrCodeText = "Order Id: " + order.getOrderId()+"\n"+
                "Payment Status: " + order.getPaymentStatus()+"\n"+
                "Total Amount: "+ order.getTotalPrice()+"\n"+
                "User: " + order.getUser().getUserName();

       QRCodeGenerator.generateQRCodeImage(qrCodeText,100, 100, QR_CODE_IMAGE_PATH+qrCodeName+".png");

       mailSenderService.send(order.getUser(), QR_CODE_IMAGE_PATH+qrCodeName+".png");

        return order;
    }

    public String cancelOrder(){
        Order order = orderRepository.findByUser(authService.getLoggedInUser());

        for(OrderItem orderItem: order.getOrderItems()){
            orderItem.setOrder(null);
            orderItem.setProduct(null);
            orderItemRepository.save(orderItem);
            orderItemRepository.deleteById(orderItem.getOrderItemId());
        }
        // order.setOrderItems(null);
        // orderRepository.save(order);
        return "Order cancelled";
    }

    public Order changeStatus(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        Order order1 = null;
        if(order.isPresent()){
            order1 = order.get();
            order1.setOrderStatus("DELIVERED");

        }
        assert order1 != null;
        return orderRepository.save(order1);
    }
}
