package com.yorku.ecommerce.DAO;

import com.yorku.ecommerce.model.Order;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class OrderDAOImpl implements OrderDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Order save(Order order) {
        if (order.getId() == 0) {
            entityManager.persist(order); // Insert new order
        } else {
            entityManager.merge(order); // Update existing order
        }
        return order;
    }

    @Override
    public Order findById(int id) {
        return entityManager.find(Order.class, id); // Fetch by ID
    }

    @Override
    public List<Order> findAll() {
        return entityManager.createQuery("SELECT o FROM Order o", Order.class).getResultList(); // Fetch all orders
    }
}
