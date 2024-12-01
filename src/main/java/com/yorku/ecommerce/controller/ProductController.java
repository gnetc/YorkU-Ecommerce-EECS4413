package com.yorku.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.yorku.ecommerce.DAO.ProductDAO;
import com.yorku.ecommerce.model.Product;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ProductController {

    @Autowired
    private ProductDAO productDAO;

    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Integer brandId,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort) {
        return productDAO.getAllProducts(categoryId, brandId, search, sort);
    }

    @PostMapping
    public void createProduct(@RequestBody Product product) {
        productDAO.save(product);
    }

    @GetMapping("/products")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @GetMapping("")
    
   

    
}
