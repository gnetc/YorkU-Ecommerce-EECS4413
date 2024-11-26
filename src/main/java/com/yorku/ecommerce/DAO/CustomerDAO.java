package com.yorku.ecommerce.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yorku.ecommerce.model.Customer;

@Repository
public interface CustomerDAO extends JpaRepository<Customer, Integer>{

    public Boolean addCustomer(Customer customer);

    public Boolean findByEmail(String email);

    

}