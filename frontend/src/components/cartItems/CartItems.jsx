import React, { useContext } from 'react';
import "./CartItems.css"
import { ShopContext } from '../../context/ShopContext';
import { useEffect, useState } from "react";


function CartItems () {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCartItems() {
            const customerId = 1; // Replace with the logged-in customer's ID
            try {
                const response = await fetch(`http://localhost:8080/api/cart/${customerId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch cart items");
                }
                const data = await response.json();
                setCartItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCartItems();
    }, []);

    if (loading) {
        return <p>Loading cart...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (cartItems.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div className="shoppingCart">
            <h1>Your Shopping Cart</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id} className="cartItem">
                        <img src={item.productImageUrl} alt={item.productName} />
                        <div>
                            <h2>{item.productName}</h2>
                            <p>Price: ${item.productPrice.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ${(item.productPrice * item.quantity).toFixed(2)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CartItems