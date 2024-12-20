import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LoginContext } from '../context/LoginState'; // Ensure correct path
import { useNavigate } from "react-router-dom";
import "./CSS/Checkout.css"

/**
 * Checkout page
 * @returns check out information
 */
function Checkout() {
    const { getTotal, cartItems, removeAll } = useContext(ShopContext); 
    const { userdata } = useContext(LoginContext); // Get user info, ensure userdata contains an id (customerId)
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState(""); 
    const [error, setError] = useState("");
    const [checkoutProducts, setCheckoutProducts] = useState([]);

    const validCardNumber = "1234 5678 9012 3456"; // Example valid card

    // Fetch product details for items in cart
    useEffect(() => {
        async function fetchCheckoutProducts() {
            const productDetails = await Promise.all(
                Object.keys(cartItems)
                    .filter((itemId) => cartItems[itemId] > 0)
                    .map(async (itemId) => {
                        const response = await fetch(`http://localhost:8080/api/products/${itemId}`);
                        if (!response.ok) {
                            console.error(`Failed to fetch product with ID ${itemId}`);
                            return null;
                        }
                        const product = await response.json();
                        return { ...product, quantity: cartItems[itemId] };
                    })
            );
            const validProducts = productDetails.filter((product) => product !== null);
            setCheckoutProducts(validProducts);
        }
        
        fetchCheckoutProducts();
    }, [cartItems]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cardNumber.trim() === validCardNumber) {
            console.log("Payment Success");

            // Calculate total amount and total price (including shipping)
            const shippingFee = 100;
            const totalPrice = getTotal() + shippingFee;
            let totalAmount = 0; 
            checkoutProducts.forEach(item => { totalAmount += item.quantity; });

            // Create order on backend
            const orderRequest = {
                customerId: userdata.id,
                totalAmount: totalAmount,
                totalPrice: totalPrice
            };

            try {
                const response = await fetch("http://localhost:8080/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderRequest)
                });

                if (!response.ok) {
                    throw new Error("Failed to create order");
                }

                const order = await response.json();

                // Clear cart
                removeAll();

                // Navigate to Order Summary with orderId
                navigate("/OrderSummary", { state: { orderId: order.id } });
            } catch (err) {
                console.error("Error creating order:", err);
                setError("Error creating order. Please try again later.");
            }
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
                    required 
                />
                <input type="text" placeholder="Expiration Date (MM/YY)" required />
                <input type="password" placeholder="CVV" required />
                <p className="error">{error}</p> {/* Display error */}
            </form>

            {checkoutProducts.map((product) => (
                <div key={product.id} className="checkoutItem">
                    <img
                        src={product.image_url || "/images/fallback-image.png"}
                        alt={product.name || "Product Image"}
                        className="productIcon"
                    />
                    <p className="item">Name: {product.name}</p>
                    <p className="item">Price: ${product.price.toFixed(2)}</p>
                    <p className="item">Quantity: {product.quantity}</p>
                </div>
            ))}
            <p className='submission'>Shipping fee: $100</p>
            <p className='submission'>Total: ${getTotal() + 100}</p>
            <button type="submit" className='submission' onClick={handleSubmit}>Place Order</button>
        </div>
    );
}

export default Checkout;
