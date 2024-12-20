package com.yorku.ecommerce.DAO;
import com.yorku.ecommerce.model.Order;

import java.util.List;

public interface OrderDAO {
    Order save(Order order); // Save a new order
    Order findById(int id);  // Find an order by ID
    List<Order> findAll();   // Find all orders
}
