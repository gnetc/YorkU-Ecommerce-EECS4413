import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginState';
import './CustomerInfo.css'

/**
 * Customer information page
 * @returns 
 * @returns customer information
 */
const CustomerInfo = () => {
    const [activeTab, setActiveTab] = useState("Profile"); 
    const navigate = useNavigate();
    const { setLoggedInState } = useContext(LoginContext);

    const toAdmin = () => {
        navigate("/Administrator");
    };

    const signout = () => {
        setLoggedInState(false);
        navigate('/');
    };
    
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
                            <p>Name: <input type="text" value="Your name"/> <button>Edit</button></p> 
                            <p>Email: <input type="text" value="testemail@gmail.com"/> <button>Edit</button></p>
                            <p>Credit Card: <input type="text" value="**** **** **** 123"/> <button>Edit</button></p>
                            <p>Shipping Address: <input type="text" value="123 Main St"/> <button>Edit</button></p>
                            <button className='toAdmin' onClick={toAdmin}>Admin Page</button>
                            <button className='signout' onClick={signout}>Sign Out</button>
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
