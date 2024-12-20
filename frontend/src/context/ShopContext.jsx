import React, {createContext, useEffect, useState} from "react";
import productData from "../components/assets/data"

/**
 * This page has functions for cart management
 */

export const ShopContext = createContext(null);

/**x
 * Function for 
 * @param {*} props 
 * @returns 
 */
const ShopContextProvider = (props) => {

    /**
     * Function for retrieving default cart = empty
     * @returns default cart
     */
    const getDefaultCart = () => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            return JSON.parse(savedCart); // Load cart from localStorage
        } else {
            let cart = {};
            productData.forEach((product) => {
                cart[product.id] = 0; // Initialize empty cart
            });
            return cart;
        }
    };
    
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);
    

    /**
     * This function is to add item to the cart
     * @param {*} itemId 
     */
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId] + 1}));
        console.log(cartItems);
    }

     /**
     * This function is to delete item from a cart
     * @param {*} itemId 
     */
     const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId] - 1}));
    }

    /**
     * This item calculates the total price of items in the cart
     * @returns total price
     */
    const getTotal = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = productData.find((product) => product.id === Number(item));
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    }

    /**
     * This function counts the number of total items in the cart
     * @returns item count
     */
    const getTotalItems = () => {
        let totalItems = 0; 
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    /**
     * This function remove all items from the cart.
     */
    const removeAll = () => {
        setCartItems(getDefaultCart()); // Reset cart items to default empty state
    }

    const contextValue =  {getTotalItems, getTotal, productData, cartItems, addToCart, removeFromCart, removeAll};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider