package com.yorku.ecommerce.DAO;

import java.util.List;

import com.yorku.ecommerce.model.Customer;

public interface CustomerDAO{

    public Boolean addCustomer(Customer customer);

    public Customer findByEmail(String email);
    public Customer findByPassword(String passwordHash);

    public Customer findByID(int id);

    public Boolean updateCustomer(Customer newCustomerInfo);
    
    public Boolean deleteCustomer(int id);

    public Boolean checkRole(int id);

    public List<Customer> findAll();

}