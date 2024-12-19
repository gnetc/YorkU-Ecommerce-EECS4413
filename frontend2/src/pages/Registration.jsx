import React from "react";
import "./CSS/Registration.css"
import { useNavigate } from "react-router-dom";

/**
 * Registration page
 * @returns Input field for registration
 */
function Registration () { 
    const navigate = useNavigate();
    return (
        <div className="registration">
            <div className="container">
                <h1>Sign Up</h1>
                <div className="registrationFields">
                    <input type="text" placeholder="First Name"></input>
                    <input type="text" placeholder="Last Name"></input>
                    <input type="email" placeholder="Email Address"></input>
                    <input type="password" placeholder="Password"></input>
                </div>
                <button>Continue</button>
                <p className="Login">Already have an account? 
                    <span onClick={() => navigate("/Login")}>&nbsp;Login here</span> {/*To Login page*/}
                </p>
            </div>
        </div>
    )
}

export default Registration