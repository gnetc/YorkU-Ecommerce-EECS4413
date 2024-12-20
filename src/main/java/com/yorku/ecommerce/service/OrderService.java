package com.yorku.ecommerce.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yorku.ecommerce.DAO.CustomerDAO;
import com.yorku.ecommerce.DAO.OrderDAO;
import com.yorku.ecommerce.model.Customer;
import com.yorku.ecommerce.model.Order;



@Service
public class OrderService {

    @Autowired
    private OrderDAO orderDAO;

    @Autowired
    private CustomerDAO customerDAO;

    public Order createOrder(int customerId, double totalAmount, double totalPrice, String status) {
        Customer customer = customerDAO.findByID(customerId);
        if (customer == null) {
            throw new IllegalArgumentException("Customer not found for ID: " + customerId);
        }
    
        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalAmount(totalAmount);
        order.setTotalPrice(totalPrice);
        order.setStatus(status);
    
        return orderDAO.save(order); // Save and let the database generate the ID
    }
    

    public Order getOrderById(int orderId) {
        return orderDAO.findById(orderId);
    }
    public List<Order> getAllOrders() {
        return orderDAO.findAll(); // Get all orders from the DAO
    }
    
}

