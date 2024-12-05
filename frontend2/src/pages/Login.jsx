import React, { useState, useContext } from "react";
import "./CSS/Login.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginState"; 

function Login() {
  const navigate = useNavigate();
  const { setLoggedInState } = useContext(LoginContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const sampleLoginInfo = { // Sample user
    email: "testemail@gmail.com",
    password: "password",
  };

  const admindLoginInfo = { // Sample admin
    email: "adminemail@gmail.com",
    password: "adminpassword",
  };

  const handleLogin = () => {
    if (email === sampleLoginInfo.email && password === sampleLoginInfo.password) {
      setError("");
      setLoggedInState(true);
      navigate("/CustomerInfo");
    } else if (email === admindLoginInfo.email && password === admindLoginInfo.password) {
        setError("");
        setLoggedInState(true);
        navigate("/CustomerInfo");
    } else if (email === "" || password === "") {
      setError("Both fields are required.");
      return;
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1>Log In</h1>
        <div className="logInFields">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="error">{error}</p>
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}

export default Login;
