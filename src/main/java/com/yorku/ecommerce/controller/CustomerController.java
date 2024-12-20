package com.yorku.ecommerce.controller;

import java.util.HashMap;
import java.util.List;
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
    public ResponseEntity<Map<String, Object>> checkLogin(@RequestBody Map<String, String> LoginData){
        try{
            Customer c = customerDAO.findByEmail(LoginData.get("email"));
            if(c != null && c.getPasswordHash().equals(LoginData.get("passwordHash"))){
                Map<String, Object> response = new HashMap<>();
                response.put("email", c.getEmail());
                response.put("firstName", c.getFirstName());
                response.put("lastName", c.getLastName());
                response.put("id", c.getId());
                response.put("role", c.getRole());
                response.put("address", c.getAddress());
                response.put("cardNum", c.getCardNum());
                response.put("passwordHash", c.getPasswordHash());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Customer Does Not Exist");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
        catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error Occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
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
    public ResponseEntity<Object> updateCustomer(@RequestBody Customer customer) {
        try {
            // Check if the new email already exists in the database
            Customer existingCustomer = customerDAO.findByEmail(customer.getEmail());
            
            if (existingCustomer == null) { // No conflict with the email
                boolean updateSuccess = customerDAO.updateCustomer(customer);
                
                if (updateSuccess) {
                    return ResponseEntity.ok(customer); // Return updated customer object
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update the customer.");
                }
            } else {
                // Email conflict
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer Email Already Exists");
            }
        } catch (Exception e) {
            // Log the error for debugging purposes
            e.printStackTrace();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the customer.");
        }
    }
        @DeleteMapping("/delete")
        public ResponseEntity<String> removeCustomer(@RequestBody Map<String, Integer> requestBody){
        try {
            Integer customerId = requestBody.get("id");
            Customer c = customerDAO.findByID(customerId);
            if(c != null){
                if(customerDAO.deleteCustomer(customerId)){
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

    @GetMapping("/customers")
    public ResponseEntity<Object> getAllCustomers() {
    try {
        List<Customer> customers = customerDAO.findAll(); 
        return ResponseEntity.ok(customers);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching customers");
    }
}
}