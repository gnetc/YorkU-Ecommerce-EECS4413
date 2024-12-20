import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginState"; // Adjust path if needed
import "./CSS/OrderSummary.css";

/**
 * Order Summary Page
 * Fetches and displays the order details after checkout.
 */
const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userdata } = useContext(LoginContext); // Access user data

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = location.state?.orderId; // Get orderId from navigation state
        if (!orderId) {
          throw new Error("Order ID is missing");
        }

        // Use backticks for template literals
        const response = await fetch(`http://localhost:8080/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json(); // Parse response JSON
        setOrderDetails(data);
      } catch (err) {
        console.error("Error fetching order summary:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
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

      {/* Display user info */}
      <h2>Customer Details</h2>
      <p>
        <strong>Name:</strong> {userdata?.firstName} {userdata?.lastName}
      </p>
      <p>
        <strong>Email:</strong> {userdata?.email}
      </p>
      <p>
        <strong>Shipping Address:</strong> {userdata?.address}
      </p>

      {/* Display order info */}
      <p>
        <strong>Order ID:</strong> {location.state?.orderId}
      </p>
      
      <h2>Products Ordered:</h2>
      {orderDetails?.items?.length > 0 ? (
        orderDetails.items.map((item, index) => (
          <div key={index} className="orderItem">
            <img src={item.image_url} alt={item.name} className="orderItemImage" />
            <div>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Price:</strong> ${item.price.toFixed(2)}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
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
