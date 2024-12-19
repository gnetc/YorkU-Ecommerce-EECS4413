package com.yorku.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yorku.ecommerce.DAO.ProductDAO;
import com.yorku.ecommerce.model.Product;

@Service
public class ProductService {

    @Autowired
    private ProductDAO productDAO;

    public List<Product> getAllProducts(Integer categoryId, Integer brandId, String search, String sort) {
        return productDAO.findAll(categoryId, brandId, search, sort);
    }

    public Product save(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return productDAO.save(product);
    }
}