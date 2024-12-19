import React, { useState } from 'react'
import './CustomerInfo.css'

/**
 * Customer information page
 * @returns customer information
 */
const CustomerInfo = () => {
    const [activeTab, setActiveTab] = useState("Profile"); 
    return (
        <div className='mainpage'> 
            {/* Determine active tab */}
            <div className={`profile ${activeTab === "Profile" ? "active" : ""}`} 
                onClick={() => setActiveTab("Profile")}>Profile</div>
            <div className={`purchaseHistory ${activeTab === "purchaseHistory" ? "active" : ""}`}
                onClick={() => setActiveTab("purchaseHistory")}>Purchase History</div>
            <div className='square'>
                {activeTab === "Profile" ? (
                        <div className="profileContent">
                            {/* Example profile */}
                            <p>Name: <b>Your name</b> <button>Edit</button></p> 
                            <p>Email: <b>testemail@gmail.com</b> <button>Edit</button></p>
                            <p>Credit Card: <b>**** **** **** 1234</b> <button>Edit</button></p>
                            <p>Shipping Address: <b>123 Main St</b> <button>Edit</button></p>
                        </div>
                    ) : (
                        <div className="purchaseHistoryContent">
                            <div className='columnHead'>
                                <p>Title</p>
                                <p>Date</p>
                                <p>Price</p>
                                <p>Quantity</p>
                            </div>
                            <hr/>
                            {/* Example purchase history */}
                            <div className='itemList'>
                                <p>Item 1</p>
                                <p>November 20, 2024</p>
                                <p>$10</p>
                                <p>5</p>
                            </div>
                            <div className='itemList'>
                                <p>Item 2</p>
                                <p>November 21, 2024</p>
                                <p>$1000</p>
                                <p>1</p>
                            </div>
                            <div className='itemList'>
                                <p>Item 3</p>
                                <p>November 28, 2024</p>
                                <p>$100</p>
                                <p>7</p>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default CustomerInfo