import React, {createContext, useState} from "react";
import productData from "../components/assets/data"

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < productData.length; i++) {
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId] + 1}));
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId] - 1}));
    }

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

    const getTotalItems = () => {
        let totalItems = 0; 
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue =  {getTotalItems, getTotal, productData, cartItems, addToCart, removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider