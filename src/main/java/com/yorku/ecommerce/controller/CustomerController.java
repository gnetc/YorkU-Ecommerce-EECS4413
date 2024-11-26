package com.yorku.ecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yorku.ecommerce.DAO.CustomerDAO;
import com.yorku.ecommerce.model.Customer;

@RestController
public class CustomerController {
    
    private final CustomerDAO customerDAO;

    public CustomerController(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> addCustomer(@RequestBody Customer customer){
        try{
            if(customerDAO.findByEmail(customer.getEmail())){
                boolean success = customerDAO.addCustomer(customer);
                if (success) {
                    return ResponseEntity.status(HttpStatus.CREATED).body("Customer added successfully");
                }
                else{
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer was not added");
                }
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer already exists");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

}