package com.yorku.ecommerce.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yorku.ecommerce.model.Product;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;


@Repository
@Transactional
public class ProductDAOImpl implements ProductDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public void save(Product product) {
        if (product.getId() == null) {
            entityManager.persist(product);
        } else {
            entityManager.flush();
        }
    }

    @Override
    public Product findById(Integer id) {
        return entityManager.find(Product.class, id);
    }

   
    @Override
    public void deleteById(Integer id) {
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

    @Override
    public List<Product> findAll(Integer categoryId, Integer brandId, String search, String sort) {
        StringBuilder queryBuilder = new StringBuilder("SELECT p FROM Product p WHERE 1=1");

        // Add filters dynamically
        if (categoryId != null) {
            queryBuilder.append(" AND p.category.id = :categoryId");
        }
        if (brandId != null) {
            queryBuilder.append(" AND p.brand.id = :brandId");
        }
        if (search != null && !search.isEmpty()) {
            queryBuilder.append(" AND (p.name LIKE :search OR p.description LIKE :search)");
        }

        // Add sorting dynamically
        if ("priceAsc".equalsIgnoreCase(sort)) {
            queryBuilder.append(" ORDER BY p.price ASC");
        } else if ("priceDesc".equalsIgnoreCase(sort)) {
            queryBuilder.append(" ORDER BY p.price DESC");
        } else if ("nameAsc".equalsIgnoreCase(sort)) {
            queryBuilder.append(" ORDER BY p.name ASC");
        } else if ("nameDesc".equalsIgnoreCase(sort)) {
            queryBuilder.append(" ORDER BY p.name DESC");
        }

        // Create query
        TypedQuery<Product> query = entityManager.createQuery(queryBuilder.toString(), Product.class);

        // Set parameters dynamically
        if (categoryId != null) {
            query.setParameter("categoryId", categoryId);
        }
        if (brandId != null) {
            query.setParameter("brandId", brandId);
        }
        if (search != null && !search.isEmpty()) {
            query.setParameter("search", "%" + search + "%");
        }

        return query.getResultList();
    }

    



}