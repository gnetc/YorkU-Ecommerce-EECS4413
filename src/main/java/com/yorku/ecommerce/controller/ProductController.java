package com.yorku.ecommerce.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yorku.ecommerce.DAO.ProductDAO;
import com.yorku.ecommerce.model.Product;
import com.yorku.ecommerce.service.ProductService;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductDAO productDAO;

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
    @RequestParam(required = false) Integer categoryId,
    @RequestParam(required = false) Integer brandId,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) String sort) {
   
        List<Product> products = productService.getAllProducts(categoryId, brandId, search, sort);
        return ResponseEntity.ok(products);    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.save(product);
        return ResponseEntity.ok(savedProduct);
        }    

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProductStock(@PathVariable Integer id, @RequestBody Product product) {
        Product existingProduct = productDAO.findById(id);
        if (existingProduct != null) {
            existingProduct.setStock(product.getStock());
            productService.save(existingProduct);  // Save the updated product
            return ResponseEntity.ok(existingProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
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
