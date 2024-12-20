import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginState";
import "./CSS/OrderSummary.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userdata } = useContext(LoginContext);

  const [orderDetails, setOrderDetails] = useState(null);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = location.state?.orderId;
        if (!orderId) throw new Error("Order ID is missing");

        const response = await fetch(`http://localhost:8080/api/orders/${orderId}`);
        if (!response.ok) throw new Error("Failed to fetch order details");

        const data = await response.json();
        setOrderDetails(data);
        console.log("Order details from backend:", data);


        // Now we expect data.items to be something like [{ productId: 1, quantity: 2 }, ...]
        if (!data.items || data.items.length === 0) {
          // No items in the order
          return;
        }

        // Fetch product details for each item, similar to Checkout.jsx
        const productDetails = await Promise.all(
          data.items.map(async (item) => {
            console.log("Fetching product with ID:", item.productId);
            const productRes = await fetch(`http://localhost:8080/api/products/${item.productId}`);
            console.log(`Fetch status for product ${item.productId}:`, productRes.status);
            
            if (!productRes.ok) {
              console.error(`Failed to fetch product with ID ${item.productId}`);
              return null;
            }
        
            const product = await productRes.json();
            console.log("Fetched product data:", product);
            return { ...product, quantity: item.quantity };
          })
        );

        const validProducts = productDetails.filter(p => p !== null);
        setOrderedProducts(validProducts);
      } catch (err) {
        console.error("Error fetching order summary:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [location.state]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => navigate("/")}>Go Back to Home</button>
      </div>
    );
  }

  return (
    <div className="orderSummaryPage">
      <h1>Order Summary</h1>

      <h2>Customer Details</h2>
      <p><strong>Name:</strong> {userdata?.firstName} {userdata?.lastName}</p>
      <p><strong>Email:</strong> {userdata?.email}</p>
      <p><strong>Shipping Address:</strong> {userdata?.address}</p>

      <p><strong>Order ID:</strong> {location.state?.orderId}</p>

      <h2>Products Ordered:</h2>
      {orderedProducts.length > 0 ? (
        orderedProducts.map((item, index) => (
          <div key={index} className="orderItem">
            <img
              src={item.image_url || "/images/fallback-image.png"}
              alt={item.name}
              className="orderItemImage"
            />
            <div>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No items found in this order.</p>
      )}

      <h2>Total Price: ${orderDetails?.totalPrice?.toFixed(2)}</h2>
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default OrderSummary;
