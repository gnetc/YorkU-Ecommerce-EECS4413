package com.yorku.ecommerce.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yorku.ecommerce.model.Product;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@Repository
@Transactional
public class ProductDAOImpl implements ProductDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(Product product) {
        if (product.getId() == null) {
            entityManager.persist(product);
        } else {
            entityManager.merge(product);
        }
    }

    @Override
    public Product findById(Long id) {
        return entityManager.find(Product.class, id);
    }

    @Override
    public List<Product> findAll() {
        return entityManager
        .createQuery("SELECT p FROM Products p", Product.class).getResultList();
    }

    @Override
    public void deleteById(Long id) {
        Product product = findById(id);
        if (product != null) {
            entityManager.remove(product);
        }
    }

        @Override
    public List<Product> findByCategoryId(int categoryId) {
        return entityManager.createQuery("SELECT p FROM Products p WHERE p.category.id = :categoryId", Product.class)
                            .setParameter("categoryId", categoryId)
                            .getResultList();
    }


    @Override
    public List<Product> searchByName_Desc(String keyword) {
        return entityManager.createQuery("SELECT p FROM Products p WHERE p.name LIKE :keyword OR p.description LIKE :keyword", Product.class)
                            .setParameter("keyword", "%" + keyword + "%")
                            .getResultList();
    }

    



}