import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { navigate, useNavigate } from "react-router-dom";
import "./CSS/Checkout.css"

/**
 * Checkout page
 * @returns check out information
 */
function Checkout () {
    const {getTotal, productData, cartItems, removeAll } = useContext(ShopContext); // Retrieve necessary functions and info from shopcontext page
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState(""); // get card number
    const [error, setError] = useState("");

    const validCardNumber = "1234 5678 9012 3456"; // Example valid card

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cardNumber.trim() === validCardNumber) {
            console.log("Payment Success");
            removeAll(); // Clear cart
            navigate("/OrderSummary");
        } else {
            setError("Credit Card Authorization Failed.");
        }
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
                <input 
                type="text" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Credit Card Number" 
                required />
                <input type="text" placeholder="Expiration Date (MM/YY)" required />
                <input type="password" placeholder="CVV" required />
                <p className="error">{error}</p> {/* Display error */}
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
            <button type="submit" className='submission' onClick={handleSubmit}>Place Order</button>
        </div>
    )
}

export default Checkout