import React, { useState, useEffect } from 'react';
import "./administrator/Administrator.css";

/**
 * Administrator profile page
 * @returns administrator page
 */
function Administrator() {
    const [activeTab, setActiveTab] = useState("salesHistory");
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [newStockValues, setNewStockValues] = useState({}); // Manage new stock values per product

    useEffect(() => {
        if (activeTab === "customerAccount") {
            fetch("http://localhost:8080/customers")
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

        if (activeTab === "salesHistory") {
            fetch("http://localhost:8080/api/orders")
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data);
                    } else {
                        console.error("Unexpected response structure:", data);
                    }
                })
                .catch(error => console.error("Error fetching orders:", error));
        }

        if (activeTab === "inventory") {
            fetch("http://localhost:8080/api/products")
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setProducts(data);
                    } else {
                        console.error("Unexpected response structure:", data);
                    }
                })
                .catch(error => console.error("Error fetching products:", error));
        }
    }, [activeTab]);

    const handleDeleteCustomer = (customerId) => {
        fetch("http://localhost:8080/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: customerId }),
        })
        .then(response => {
            if (response.ok) {
                setCustomers(customers.filter(customer => customer.id !== customerId));
            } else {
                console.error("Failed to delete customer");
            }
        })
        .catch(error => console.error("Error deleting customer:", error));
    };
    const handleStockChange = (productId, value) => {
        setNewStockValues({
            ...newStockValues,
            [productId]: value,
        });
    };
    const handleUpdateStock = (productId) => {
        const newStock = newStockValues[productId];

        if (!newStock || isNaN(newStock)) {
            alert("Please enter a valid stock value.");
            return;
        }

        fetch(`http://localhost:8080/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stock: newStock }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Stock updated successfully:", data);

                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === productId
                            ? { ...product, stock: newStock }
                            : product
                    )
                );

                setNewStockValues((prev) => ({
                    ...prev,
                    [productId]: "",
                }));
            })
            .catch((error) => {
                console.error("Error updating stock:", error);
                alert("Failed to update stock.");
            });
    };

    return (
        <div className="mainpage">
            <div className={`salesHistory ${activeTab === "salesHistory" ? "active" : ""}`}
                onClick={() => setActiveTab("salesHistory")}>Sales History</div>
            <div className={`customerAccount ${activeTab === "customerAccount" ? "active" : ""}`}
                onClick={() => setActiveTab("customerAccount")}>Customer Account</div>
            <div className={`inventory ${activeTab === "inventory" ? "active" : ""}`}
                onClick={() => setActiveTab("inventory")}>Inventory</div>

            <div className="square">
                {activeTab === "salesHistory" && (
                    <div className="salesHistoryContent">
                        <h2>Sales History</h2>
                        <ul>
                            {orders.map((order) => (
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
                            {customers.map((customer) => (
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
                        <h2>Inventory</h2>
                        <ul>
                            {products.map((product) => (
                                <li key={product.id}>
                                    <span>{product.name} - ${product.price} - Current Stock: {product.stock}</span>
                                    <input
                                        type="number"
                                        value={newStockValues[product.id] || ""}
                                        placeholder="New stock"
                                        onChange={(e) =>
                                            handleStockChange(product.id, e.target.value)
                                        }
                                    />
                                    <button onClick={() => handleUpdateStock(product.id)}>
                                        Update Stock
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Administrator;
