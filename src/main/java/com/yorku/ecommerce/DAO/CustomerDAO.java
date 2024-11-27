package com.yorku.ecommerce.DAO;

import com.yorku.ecommerce.model.Customer;

public interface CustomerDAO{

    public void addCustomer(Customer customer);

    public Boolean findByEmail(String email);

    

}