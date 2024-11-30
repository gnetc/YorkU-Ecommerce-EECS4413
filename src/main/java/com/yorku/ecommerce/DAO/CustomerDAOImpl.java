package com.yorku.ecommerce.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yorku.ecommerce.model.Customer;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

@Repository
public class CustomerDAOImpl implements CustomerDAO{

    @Autowired
    private EntityManager entityManager;  //the entity Manager is already apart of the Spring Framework used to send querys to the Database


    @Transactional
    @Override
    public Boolean addCustomer(Customer customer){

        entityManager.persist(customer);  //stores the customer to wait to be sent to database
        entityManager.flush();      //sends to database
        return entityManager.contains(customer); 
    }

    @Transactional
    @Override
    public Boolean findByEmail(String email){
        Query query = entityManager.createQuery("SELECT * FROM customer WHERE \" " + email + " \" = email;", Customer.class);
        List<Customer> c = query.getResultList();
        return !c.isEmpty();
        
        
    }
  

}