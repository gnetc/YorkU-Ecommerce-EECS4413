package com.yorku.ecommerce.DAO;

import java.util.List;

import com.yorku.ecommerce.model.Product;

public interface ProductDAO {   
    void save(Product product); 
    Product findById(Integer id);  
    List<Product> findAll(Integer categoryId, Integer brandId, String search, String sort);
    void deleteById(Integer id);

    List<Product> findByCategoryId(int categoryId);
    List<Product> searchByName_Desc(String keyword);
}
