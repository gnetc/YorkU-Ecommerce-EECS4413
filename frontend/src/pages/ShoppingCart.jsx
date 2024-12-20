import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { LoginContext } from "../context/LoginState";
import { useNavigate } from "react-router-dom";
import "../components/cartItems/CartItems.css"; // Import the CSS file

function ShoppingCart() {
    const { cartItems, getTotal, removeFromCart, addToCart } = useContext(ShopContext);
    const [cartProducts, setCartProducts] = useState([]);
    const { customerId } = useContext(LoginContext); // Access customer_id from LoginContext
    const [totalPrice, setTotalPrice] = useState(0); 
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCartProducts() {
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
            setCartProducts(validProducts);

            // Calculate the total price
            const total = validProducts.reduce(
                (sum, product) => sum + product.price * product.quantity,
                0
            );
            setTotalPrice(total);
        }

        fetchCartProducts();
    }, [cartItems]);

    if (cartProducts.length === 0) {
        return <p className="cartItems">Your cart is empty</p>;
    }

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div className="cartItems">
            <h1>Shopping Cart</h1>
            <hr />
            <div className="cartFormat">
                <p className="itemFormat">Product</p>
                <p className="itemFormat">Name</p>
                <p className="itemFormat">Price</p>
                <p className="itemFormat">Quantity</p>
                <p className="itemFormat">Remove</p>
            </div>
            <hr />
            {cartProducts.map((product) => (
                <div className="itemGrid" key={product.id}>
                    <img src={product.image_url} alt={product.name} className="productIcon" />
                    <p>{product.name}</p>
                    <p>${product.price.toFixed(2)}</p> 
                    <div className="cartQuantity">
                        <button onClick={() => removeFromCart(product.id)}>-</button>
                        <span>{product.quantity}</span>
                        <button onClick={() => addToCart(product.id)}>+</button>
                    </div>
                    <p className="removeItem" onClick={() => removeFromCart(product.id)}>
                        Remove
                    </p>
                </div>
            ))}
            <div className="cartBottom">
                <div className="cartTotal">
                    <div className="totalItem">
                        <p>Total Items:</p>
                        <p>{Object.values(cartItems).reduce((a, b) => a + b, 0)}</p>
                    </div>
                    <div className="totalItem">
                        <p>Total Price:</p>
                        <p>${totalPrice.toFixed(2)}</p> {/* Display total price */}
                    </div>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
