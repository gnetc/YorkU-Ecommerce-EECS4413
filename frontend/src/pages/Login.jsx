import React, { useState, useContext } from "react";
import "./CSS/Login.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginState"; 

/**
 * Login page
 * @returns Input fields for login
 */
function Login() {

    const {LoginUser, errorMessage} = useContext(LoginContext);
    const navigate = useNavigate();

    async function HandleSubmit(e) {
      e.preventDefault()
      await LoginUser(e.target.email.value,e.target.passwordHash.value)
      navigate("/");
    }
    
  return (
    <div className="login">
      <div className="container">
        <h1>Log In</h1>


        <form onSubmit = {HandleSubmit}>
        <div className="logInFields">
          <input
            type="email"
            placeholder="Email Address"
            name = "email"
          />

          <input
            type="password"
            placeholder="Password"
            name = "passwordHash"
         
          />
        </div>
        <button type = 'submit'>Log In</button>
        </form>

        {errorMessage && <p>{errorMessage}</p>}
   

      </div>
    </div>
  );
}

export default Login;
