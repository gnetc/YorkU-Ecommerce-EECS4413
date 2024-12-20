import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginState';
import './CustomerInfo.css';

/**
 * Customer information page
 * @returns customer information
 */
const CustomerInfo = () => {
    const [activeTab, setActiveTab] = useState("Profile");
    const navigate = useNavigate();
    const { isLoggedIn, userdata, LogoutUser } = useContext(LoginContext);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const toAdmin = () => {
        navigate("/Administrator");
    };

    const signout = () => {
        LogoutUser(); // Use the LogoutUser from context
        navigate('/'); // Redirect to home after logout
    };

    return (
        <div className='mainpage'>
            {/* Tabs */}
            <div 
                className={`profile ${activeTab === "Profile" ? "active" : ""}`} 
                onClick={() => setActiveTab("Profile")}
            >
                Profile
            </div>
            <div 
                className={`purchaseHistory ${activeTab === "purchaseHistory" ? "active" : ""}`} 
                onClick={() => setActiveTab("purchaseHistory")}
            >
                Purchase History
            </div>

            <div className='square'>
                {activeTab === "Profile" ? (
                    <div className="profileContent">
                        {/* Example profile */}
                        <p>Name: <b>{userdata ? `${userdata.firstName} ${userdata.lastName}` : "N/A"}</b> <button>Edit</button></p>
                        <p>Email: <b>{userdata ? userdata.email : "N/A"}</b> <button>Edit</button></p>
                        <p>Credit Card: <b>{userdata ? userdata.creditCard : "**** **** **** 1234"}</b> <button>Edit</button></p>
                        <p>Shipping Address: <b>{userdata ? userdata.shippingAddress : "N/A"}</b> <button>Edit</button></p>
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
                        <hr />
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
    );
};

export default CustomerInfo;
