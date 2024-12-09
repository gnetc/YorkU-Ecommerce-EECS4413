package com.yorku.ecommerce.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.yorku.ecommerce.DAO.ProductDAO;
import com.yorku.ecommerce.model.Product;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductDAO productDAO;

    @GetMapping
    public List<Product> getAllProducts(
    @RequestParam(required = false) Integer categoryId,
    @RequestParam(required = false) Integer brandId,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) String sort) {
   
        return productDAO.findAll(categoryId, brandId, search, sort);
    }

    @PostMapping
    public void createProduct(@RequestBody Product product) {
        productDAO.save(product);
    }

    @GetMapping("/products")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    
   
    @GetMapping("/{id}")
   public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
    Product product = productDAO.findById(id);

    if (product != null) {
        return ResponseEntity.ok(product);
    } else {
        return ResponseEntity.notFound().build();
    }

   }

    
 }
