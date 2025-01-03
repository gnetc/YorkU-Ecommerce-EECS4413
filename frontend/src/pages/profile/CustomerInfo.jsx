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

    // State for editable fields
    const [firstName, setFirstName] = useState(userdata?.firstName || "");
    const [lastName, setLastName] = useState(userdata?.lastName || "");
    const [email, setEmail] = useState(userdata?.email || "");
    const [creditCard, setCreditCard] = useState(userdata?.cardNum || "");
    const [shippingAddress, setShippingAddress] = useState(userdata?.address || "");
    const [id] = useState(userdata?.id || "");
    const [role] = useState(userdata?.role || "");
    const [passwordHash] = useState(userdata?.passwordHash || "");

    // State for edit mode
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/'); // Redirect to home if not logged in
        }
    }, [isLoggedIn, navigate]);

    const toAdmin = () => {
        navigate("/Administrator"); // Redirect to the admin page
    };

    const signout = () => {
        LogoutUser(); // Logout the user using context
        navigate('/'); // Redirect to home after logout
    };

    const handleUpdate = () => {
        const updatedCustomer = {
            firstName,
            lastName,
            email,
            creditCard,
            shippingAddress,
            id,
            role,
            passwordHash
        };

        fetch('http://localhost:8080/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        })
            .then(response => response.json())
            .then(data => {
                // Optionally handle successful update 
                console.log(data);
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    const toggleEdit = () => {
        if (isEditing) {
            handleUpdate(); // Save changes if editing
        }
        setIsEditing(!isEditing); // Toggle edit mode
    };

    return (
        <div className='mainpage'>
            <div
                className={`profile ${activeTab === "Profile" ? "active" : ""}`}
                onClick={() => setActiveTab("Profile")}
            >
                Profile
            </div>
            <div className='square'>
                {activeTab === "Profile" ? (
                    <div className="profileContent">
                        {/* Profile fields */}
                        <p>Name: <b>{userdata ? `${userdata.firstName} ${userdata.lastName}` : "N/A"}</b></p>
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            disabled={!isEditing}
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            disabled={!isEditing}
                        />

                        <p>Email: <b>{userdata ? userdata.email : "N/A"}</b></p>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />

                        <p>Credit Card: <b>{userdata ? userdata.cardNum : "**** **** **** 1234"}</b></p>
                        <input
                            type="text"
                            value={creditCard}
                            onChange={e => setCreditCard(e.target.value)}
                            disabled={!isEditing}
                        />

                        <p>Shipping Address: <b>{userdata ? userdata.address : "N/A"}</b></p>
                        <input
                            type="text"
                            value={shippingAddress}
                            onChange={e => setShippingAddress(e.target.value)}
                            disabled={!isEditing}
                        />

                        {userdata && userdata.role === "ADMIN" && (
                            <button className='toAdmin' onClick={toAdmin}>Admin Page</button>
                        )}

                        <button className='signout' onClick={signout}>Sign Out</button>

                        <button className="editButton" onClick={toggleEdit}>
                            {isEditing ? "Save" : "Edit"}
                        </button>
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
