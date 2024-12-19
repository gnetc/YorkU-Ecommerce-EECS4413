import React, { useState } from 'react';
import "./Administrator.css"

/**
 * Administrator profile page
 * @returns administrator page
 */
function Administrator () {
    const [activeTab, setActiveTab] = useState("salesHistory");
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
                        <p>Sales History content</p>
                    </div>
                )}
                {activeTab === "customerAccount" && (
                    <div className="customerAccountContent">
                        <p>Customer Account content</p>
                    </div>
                )}
                {activeTab === "inventory" && (
                    <div className="inventoryContent">
                        <p>Inventory content</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Administrator