package com.yorku.ecommerce.DAO;

import java.util.List;

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
    public Boolean addCustomer(Customer customer){
        System.out.println(customer.getFirstName());
        entityManager.persist(customer);  //stores the customer to wait to be sent to database
        entityManager.flush();      //sends to database
        return entityManager.contains(customer); 
  
    }

    @Transactional
    @Override
    public Customer findByEmail(String email){
        String query = "SELECT c FROM Customer c WHERE c.email = :email";
        List<Customer> customer = entityManager.createQuery(query, Customer.class).setParameter("email", email).getResultList();
        if(customer.isEmpty()){
            return null;
        }
        return customer.get(0);
    }

    @Transactional
    @Override
    public Customer findByID(int id){
        String query = "SELECT c FROM Customer c WHERE c.id = :id";
        List<Customer> customer =  entityManager.createQuery(query, Customer.class).setParameter("id", id).getResultList();
        if(customer.isEmpty()){
            return null;
        }
        System.out.println(customer.get(0).getFirstName());
        return customer.get(0);
    }

    @Transactional
    @Override
    public Boolean updateCustomer(Customer newCustomerInfo){ 

        int id = newCustomerInfo.getId();
        String query = "SELECT c FROM Customer c WHERE c.id = :id"; 
        Customer existingCustomer = entityManager.createQuery(query, Customer.class).setParameter("id", id).getSingleResult(); //return the existing customer with the id 
    
        existingCustomer.setFirstName(newCustomerInfo.getFirstName());
        existingCustomer.setLastName(newCustomerInfo.getLastName());
        existingCustomer.setEmail(newCustomerInfo.getEmail());
        existingCustomer.setPasswordHash(newCustomerInfo.getPasswordHash());
        existingCustomer.setRole(newCustomerInfo.getRole());

        if(entityManager.merge(existingCustomer) != null){ // 
            return true;
        }
        return false;
        
    }

    @Transactional
    @Override
    public Boolean deleteCustomer(int id){
        String query = "SELECT c FROM Customer c WHERE c.id = :id"; 
        Customer customer = entityManager.createQuery(query, Customer.class).setParameter("id", id).getSingleResult();
        entityManager.remove(customer);
        if(!entityManager.contains(customer)){
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public Boolean checkRole(int id){
        String query = "SELECT c FROM Customer c WHERE c.id = :id";
        Customer customer = entityManager.createQuery(query, Customer.class).setParameter("id", id).getSingleResult();
        return(customer.getRole().equals("Admin"));
    }
}