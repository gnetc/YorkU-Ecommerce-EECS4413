package com.yorku.ecommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.yorku.ecommerce.DAO.CustomerDAO;

@Configuration
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(CustomerDAO customerDAO) {
        return args -> {

        };
    }
}
