package com.yorku.ecommerce.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.yorku.ecommerce.model.CartItem;
import com.yorku.ecommerce.model.Product;
import com.yorku.ecommerce.service.CartService;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{customerId}")
    public ResponseEntity<List<Map<String, Object>>> getCartItems(@PathVariable int customerId) {
    List<CartItem> cartItems = cartService.getCartItems(customerId);

    List<Map<String, Object>> cartItemsResponse = cartItems.stream().map(cartItem -> {
        Map<String, Object> item = new HashMap<>();
        item.put("productId", cartItem.getProduct().getId());
        item.put("productName", cartItem.getProduct().getName());
        item.put("price", cartItem.getProduct().getPrice());
        item.put("quantity", cartItem.getQuantity());
        return item;
    }).toList();

    return ResponseEntity.ok(cartItemsResponse);
    }
    @PostMapping("/{customerId}")    
    public ResponseEntity<String> addToCart(@PathVariable int customerId, @RequestBody CartItem cartItem) {
        cartService.addToCart(customerId, cartItem);
        return ResponseEntity.ok("Item added to cart successfully");
    }

    @PutMapping("/{productId}")
    public String updateCartItemQuantity(@PathVariable int productId, @RequestParam int quantity) {
        cartService.updateQuantity(productId, quantity);
        return "Cart quantity updated";
    }

    @DeleteMapping("/{productId}")
    public String removeFromCart(@PathVariable int productId) {
        cartService.removeFromCart(productId);
        return "Product removed from cart";
    }

    @DeleteMapping("/clear")
    public String clearCart() {
        cartService.clearCart();
        return "Cart cleared";
    }
}
