import React, { useState, useEffect } from 'react';
import "./administrator/Administrator.css";

/**
 * Administrator profile page
 * @returns administrator page
 */
function Administrator () {
    const [activeTab, setActiveTab] = useState("salesHistory");
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]); // New state to store orders

    // Fetch the list of customers when the customerAccount tab is active
    useEffect(() => {
        if (activeTab === "customerAccount") {
            fetch("http://localhost:8080/customers") // Replace with actual API endpoint
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCustomers(data);
                    } else {
                        console.error("Unexpected response structure:", data);
                    }
                })
                .catch(error => console.error("Error fetching customers:", error));
        }

        // Fetch all orders when the salesHistory tab is active
        if (activeTab === "salesHistory") {
            fetch("http://localhost:8080/api/orders") // Replace with the actual API endpoint for orders
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data); // Set orders data if it's an array
                    } else {
                        console.error("Unexpected response structure:", data);
                    }
                })
                .catch(error => console.error("Error fetching orders:", error));
        }
    }, [activeTab]);

    // Handle deleting a customer
    const handleDeleteCustomer = (customerId) => {
        fetch("http://localhost:8080/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: customerId }), // Send the customer ID in the request body
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted customer from the list in state
                setCustomers(customers.filter(customer => customer.id !== customerId));
            } else {
                console.error("Failed to delete customer");
            }
        })
        .catch(error => console.error("Error deleting customer:", error));
    };

    return (
        <div className='mainpage'>
            {/* Determine active tab */}
            <div className={`salesHistory ${activeTab === "salesHistory" ? "active" : ""}`}
                onClick={() => setActiveTab("salesHistory")}>Sales History</div>
            <div className={`customerAccount ${activeTab === "customerAccount" ? "active" : ""}`}
                onClick={() => setActiveTab("customerAccount")}>Customer Account</div>
            <div className={`inventory ${activeTab === "inventory" ? "active" : ""}`}
                onClick={() => setActiveTab("inventory")}>Inventory</div>
            <div className='square'>
                {activeTab === "salesHistory" && (
                    <div className="salesHistoryContent">
                        <h2>Sales History</h2>
                        <ul>
                            {orders.map(order => (
                                <li key={order.id}>
                                    <span>Order ID: {order.id}</span> - 
                                    <span>Customer ID: {order.customer.id}</span> - 
                                    <span>Total Amount: ${order.totalAmount}</span> - 
                                    <span>Status: {order.status}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === "customerAccount" && (
                    <div className="customerAccountContent">
                        <h2>Customer Accounts</h2>
                        <ul>
                            {Array.isArray(customers) && customers.map(customer => (
                                <li key={customer.id}>
                                    <span>{customer.firstName} {customer.lastName}</span>
                                    <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === "inventory" && (
                    <div className="inventoryContent">
                        <p>Inventory content</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Administrator;
