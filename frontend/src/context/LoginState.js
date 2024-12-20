import React, { createContext, useState, useEffect } from "react";

/**
 * This page is for keeping track of the login state
 */

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {


  const [isLoggedIn, setLoggedInState] = useState(false); // Login state
  const [errorMessage, setErrorState] = useState(null)
  const [userdata, setUserData] = useState(null)

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setLoggedInState(true)
      const storedUserData = JSON.parse(localStorage.getItem("user"));
      if (storedUserData) {
        setUserData(storedUserData); // Populate userdata if the user is logged in
      }
    }
  }, []);

  async function LoginUser(email,passwordHash){   
    const response = await fetch("http://localhost:8080/login", { //api call when login button is called 
        
      method:"POST", 
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          email,
          passwordHash
      })
    })

    if(!response.ok){  //handle errors
      const result = await response.json()
      setErrorState(result.message)
      return
    }
    
    const result = await response.json()    //makes a lcoal storage user object with the signjed in user 
    localStorage.setItem("user", JSON.stringify({
    email: result.email,
    firstName: result.firstName,
    lastName: result.lastName,
    id: result.id,
    role: result.role
    

    

    }));
    setLoggedInState(true)  //set the logged in to true 
    localStorage.setItem("loginStatus", "true") 
  }

  function LogoutUser() {
    setLoggedInState(false);
    localStorage.setItem("isLoggedIn", "false"); // Clear login status
    localStorage.removeItem("user"); // Optional: Clear user data
  }

  return (
    <LoginContext.Provider value={{LoginUser, isLoggedIn, errorMessage}}>
      {children}
    </LoginContext.Provider>
  );
};
