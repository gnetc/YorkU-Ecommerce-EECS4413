import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import "./CSS/Checkout.css"

function Checkout () {
    const location = useLocation();
    const {getTotal, productData, cartItems, removeFromCart} = useContext(ShopContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };
    return (
        <div className="checkoutPage">
            <form className="checkoutForm" onSubmit={handleSubmit}>
                <h2>Shipping Information</h2>
                <input type="text" placeholder="Full Name" required />
                <input type="text" placeholder="Address" required />
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="State" required />
                <input type="text" placeholder="Postal Code" required />
                <hr /><br/>
                <h2>Payment Information</h2>
                <input type="text" placeholder="Credit Card Number" required />
                <input type="text" placeholder="Expiration Date (MM/YY)" required />
                <input type="password" placeholder="CVV" required />
            </form>
            {productData.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div className='checkoutItem'>
                        <img src={e.image} alt="" className='productIcon'></img>
                        <p className='item'>{e.name}</p>
                        <p className='item'>Price: ${e.price}</p>
                        <p className='item'>Quantity: {cartItems[e.id]}</p>
                    </div>
                    
                }
                return null;
            })}
            <p className='submission'>Shipping fee: $100</p>
            <p className='submission'>Total: ${getTotal() * 100}</p>
            <button type="submit" className='submission'>Place Order</button>
        </div>
    )
}

export default Checkout