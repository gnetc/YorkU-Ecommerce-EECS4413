package com.yorku.ecommerce.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yorku.ecommerce.DAO.CustomerDAO;
import com.yorku.ecommerce.DAO.OrderDAO;
import com.yorku.ecommerce.model.Customer;
import com.yorku.ecommerce.model.Order;
import com.yorku.ecommerce.service.OrderRequestDTO;
import com.yorku.ecommerce.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CustomerDAO customerDAO;

    @Autowired
    private OrderDAO orderDAO;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Map<String, Object> orderData) {
        int customerId = (int) orderData.get("customerId");
        double totalAmount = Double.parseDouble(orderData.get("totalAmount").toString());
        double totalPrice = Double.parseDouble(orderData.get("totalPrice").toString());
        List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");

        ObjectMapper mapper = new ObjectMapper();
        String productDataJson;
        try {
            productDataJson = mapper.writeValueAsString(items);
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize product data", e);
        }

        Customer customer = customerDAO.findByID(customerId);
        if (customer == null) {
            throw new IllegalArgumentException("Invalid customer ID: " + customerId);
        }

        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalAmount(totalAmount);
        order.setTotalPrice(totalPrice);
        order.setStatus("PLACED");
        order.setProductData(productDataJson);

        Order savedOrder = orderDAO.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
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
