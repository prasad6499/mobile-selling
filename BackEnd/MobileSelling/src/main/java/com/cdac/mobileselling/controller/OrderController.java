package com.cdac.mobileselling.controller;

import com.cdac.mobileselling.service.OrderService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;

import static org.springframework.http.ResponseEntity.status;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(){
        return status(200).body(orderService.getAllOrders());
    }

    @GetMapping("/my-order")
    public ResponseEntity<?> getMyOrder(){
        return status(200).body(orderService.getMyOrder());
    }

    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder() throws IOException, WriterException, MessagingException {
        return status(201).body(orderService.placeOrder());
    }

    @DeleteMapping("/cancel-order")
    public ResponseEntity<?> cancelOrder(){
        return status(201).body(orderService.cancelOrder());
    }

    @PutMapping("/change-status/{orderId}")
    public ResponseEntity<?> changeStatus(@PathVariable Long orderId){
        return status(201).body(orderService.changeStatus(orderId));
    }
}
