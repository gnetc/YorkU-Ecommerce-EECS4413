package com.yorku.ecommerce;

import com.yorku.ecommerce.model.Customer;
import com.yorku.ecommerce.respository.CustomerRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.yorku.ecommerce.DAO.CustomerDAO;

@Configuration
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(CustomerRepo customerRepo) {
        return args -> {
            // Create a test user
            Customer testCust = new Customer(
                "John",
                "Doe",
                "john.doe@example.com",
                "hashed_password", // Replace with a real hashed password
                "USER" // Default role
            );

            // Save the user to the database
            customerRepo.save(testCust);

            System.out.println("Test user saved: " + testCust);
        };
    }
}
