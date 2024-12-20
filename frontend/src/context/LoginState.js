import React, { createContext, useState, useEffect } from "react";

/**
 * This page is for keeping track of the login state
 */

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedInState] = useState(false); // Login state
  const [errorMessage, setErrorState] = useState(null);
  const [userdata, setUserData] = useState(null);

  useEffect(() => { 
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setLoggedInState(true);
      const storedUserData = JSON.parse(localStorage.getItem("user"));
      if (storedUserData) {
        setUserData(storedUserData); // Populate userdata if the user is logged in
      }
    }
  }, []);

  async function LoginUser(email, passwordHash) {
    const response = await fetch("http://localhost:8080/login", { //api call when login button is called
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        passwordHash,
      }),
    });

    if (!response.ok) {  // handle errors
      const result = await response.json();
      setErrorState(result.message);
      return;
    }

    const result = await response.json(); // makes a local storage user object with the signed-in user 
    localStorage.setItem("user", JSON.stringify({
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      id: result.id,
      role: result.role,
    }));
    localStorage.setItem("isLoggedIn", "true"); // Update login status in localStorage
    setLoggedInState(true); // set the logged in to true 
    setUserData(result);
  }

  function LogoutUser() {
    setLoggedInState(false);
    localStorage.setItem("isLoggedIn", "false"); // Clear login status in localStorage
    localStorage.removeItem("user"); // Remove user data from localStorage
    localStorage.removeItem("loginStatus"); // Ensure loginStatus is removed as well
    setUserData(null); // Clear user data state
  }

  return (
    <LoginContext.Provider value={{ LoginUser, LogoutUser, userdata, isLoggedIn, errorMessage }}>
      {children}
    </LoginContext.Provider>
  );
};
