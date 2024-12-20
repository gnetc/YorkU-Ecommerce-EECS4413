package com.yorku.ecommerce.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yorku.ecommerce.DAO.ProductDAO;
import com.yorku.ecommerce.model.CartItem;
import com.yorku.ecommerce.model.Product;

import java.util.*;

@Service
public class CartService {
    private Map<Integer, List<CartItem>> cartStorage = new HashMap<>();

    @Autowired
    private ProductDAO productDAO;
    
    public List<CartItem> getCartItems(int customerId) {
        return cartStorage.getOrDefault(customerId, new ArrayList<>());
    }

    public void addToCart(int customerId, CartItem cartItem) {
        if (cartItem.getProduct() == null || cartItem.getProduct().getId() == null) {
            throw new IllegalArgumentException("Product ID is missing in the cart item.");
        }

        Product product = productDAO.findById(cartItem.getProduct().getId());
        if (product == null) {
            throw new IllegalArgumentException("Product not found for id: " + cartItem.getProduct().getId());
        }

        cartItem.setProduct(product);

        System.out.println("Added product: " + product.getName() + " to cart for customer: " + customerId);
    }

    public void updateQuantity(int productId, int quantity) {
        for (List<CartItem> cartItems : cartStorage.values()) {
            for (CartItem item : cartItems) {
                if (item.getProduct().getId() == productId) {
                    item.setQuantity(quantity);
                    return;
                }
            }
        }
    }

    public void removeFromCart(int productId) {
        for (List<CartItem> cartItems : cartStorage.values()) {
            cartItems.removeIf(item -> item.getProduct().getId() == productId);
        }
    }

    public void clearCart() {
        cartStorage.clear();
    }
}
