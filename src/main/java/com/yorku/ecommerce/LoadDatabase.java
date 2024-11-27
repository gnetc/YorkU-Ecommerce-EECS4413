package com.yorku.ecommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.yorku.ecommerce.DAO.CustomerDAO;
import com.yorku.ecommerce.model.Customer;

@Configuration
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(CustomerDAO customerDAO) {
        return args -> {
            // Create a test user
            Customer testCust = new Customer(
                "Alex",
                "Cultraro",
                "john.doe1@example.com",
                "hashed_password", // Replace with a real hashed password
                "USER" // Default role
            );

            // Save the user to the database
            customerDAO.addCustomer(testCust);

            System.out.println("Test user saved: " + testCust);
        };
    }
}
