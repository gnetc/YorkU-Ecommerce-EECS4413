import React, { useState, useContext } from "react";
import "./CSS/Login.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginState"; 

/**
 * Login page
 * @returns Input fields for login
 */
function Login() {
    const {setLoggedInState} = useContext(LoginContext);
    
    const navigate = useNavigate();
    const [errorMessage, setErrorState] = useState(null)

    async function SignIn(e) {
        e.preventDefault()
        const response = await fetch("http://localhost:8080/login", {
        
            method:"POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: e.target.email.value,
                passwordHash: e.target.passwordHash.value,
            })
        })
        if(!response.ok){  //handle errors
            const result = await response.json()
            setErrorState(result.message)
            return
        }
        const result = await response.json()
        console.log(result);

        localStorage.setItem("user", JSON.stringify({
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          id: result.id,
          role: result.role
          

        }));
        setLoggedInState(true)
        navigate("/")
    
    }

  return (
    <div className="login">
      <div className="container">
        <h1>Log In</h1>


        <form onSubmit = {SignIn}>
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
