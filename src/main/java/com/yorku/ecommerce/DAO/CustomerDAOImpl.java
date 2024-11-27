package com.yorku.ecommerce.DAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yorku.ecommerce.model.Customer;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
public class CustomerDAOImpl implements CustomerDAO{

    @Autowired
    private EntityManager entityManager;  //the entity Manager is already apart of the Spring Framework used to send querys to the Database

    @Transactional
    @Override
    public void addCustomer(Customer customer){

        entityManager.persist(customer);  //stores the customer to wait to be sent to database
        entityManager.flush();      //sends to database

    }

    @Override
    public Boolean findByEmail(String email){
        return null;
    }
  

}