package com.yorku.ecommerce.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yorku.ecommerce.model.Order;
import com.yorku.ecommerce.service.OrderRequestDTO;
import com.yorku.ecommerce.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequestDTO orderReq) {
        System.out.println("Creating order for customer ID: " + orderReq.getCustomerId());
        Order order = orderService.createOrder(
                orderReq.getCustomerId(),
                orderReq.getTotalAmount(),
                orderReq.getTotalPrice(),
                "PLACED"
        );
        System.out.println("Created Order ID: " + order.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable int orderId) {
        System.out.println("Fetching order with ID: " + orderId); // Debug log
        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            System.out.println("Order not found for ID: " + orderId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
}
