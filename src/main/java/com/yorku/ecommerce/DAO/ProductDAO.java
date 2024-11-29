package com.yorku.ecommerce.DAO;

import java.util.List;

import com.yorku.ecommerce.model.Product;

public interface ProductDAO {

    void save(Product product); 
    Product findById(Long id);  
    List<Product> findAll();
    void deleteById(Long id);

    List<Product> findByCategoryId(int categoryId);
    List<Product> searchByName_Desc(String keyword);
}
