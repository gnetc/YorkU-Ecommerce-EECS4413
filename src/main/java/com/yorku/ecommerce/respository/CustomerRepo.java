package com.yorku.ecommerce.respository;
import com.yorku.ecommerce.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
    // Additional query methods can be added here if needed
}