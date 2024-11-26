package com.yorku.ecommerce.DAO;

import org.springframework.beans.factory.annotation.Autowired;

import com.yorku.ecommerce.model.Customer;

public class CustomerDAOImpl{

    
    private CustomerDAO customerDAO;

    @Autowired
    public void addCustomer(Customer customer){

        customerDAO.save(customer);
    }

  

}