package com.yorku.ecommerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yorku.ecommerce.DAO.CustomerDAO;
import com.yorku.ecommerce.model.Customer;

@RestController
public class CustomerController {
    
    @Autowired
    private CustomerDAO customerDAO;


    @PostMapping("/signup")
    public ResponseEntity<String> addCustomer(@RequestBody Customer customer){
        
        try{
            Customer c = customerDAO.findByEmail(customer.getEmail());
            if(c == null){  
                if (customerDAO.addCustomer(customer)) {
                    return ResponseEntity.status(HttpStatus.CREATED).body("Customer Added Successfully");
                }
                else{
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer Was Not Added");
                }
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer Already Exists");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> checkLogin(@RequestBody Map<String, String> LoginData){
        try{
            Customer c = customerDAO.findByEmail(LoginData.get("email"));
            if(c != null && c.getPasswordHash().equals(LoginData.get("passwordHash"))){
                return ResponseEntity.status(HttpStatus.CREATED).body("Login Success");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer Does Not Exist");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Occurred");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<String> getCustomer(@RequestBody Customer customer){
        try{
            Customer c = customerDAO.findByID(customer.getId());
            if(c != null){
                return ResponseEntity.ok("Customer Found");
            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer Not Found");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Occurred");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCustomer(@RequestBody Customer customer){
        try{
            Customer newCustomerEmail = customerDAO.findByEmail(customer.getEmail());
            if(newCustomerEmail == null){ // if the new input email doesnt exist in the database
                if(customerDAO.updateCustomer(customer)){
                    return ResponseEntity.ok("Customer updated successfully.");
                }
                else{
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update the customer.");
                }
            }
            else{
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Customer Email Already Exist");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

        @DeleteMapping("/delete")
        public ResponseEntity<String> removeCustomer(@RequestBody Customer customer){
        try {
            Customer c = customerDAO.findByID(customer.getId());
            if(c != null){
                if(customerDAO.deleteCustomer(customer.getId())){
                    return ResponseEntity.ok("Customer Deleted Successfully.");
                }
                else{
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Customer Was Not Deleted");
                }
            }
            else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Customer Does Not Exist");
            }
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
}