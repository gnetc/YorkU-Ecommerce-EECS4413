import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setLoggedInState] = useState(false);
    const [userdata, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUserData(storedUser);
            setLoggedInState(true);
        }
    }, []);

    const LoginUser = (userData) => {
        setUserData(userData);
        setLoggedInState(true);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const LogoutUser = () => {
        setUserData(null);
        setLoggedInState(false);
        localStorage.removeItem("user");
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, userdata, LoginUser, LogoutUser }}>
            {children}
        </LoginContext.Provider>
    );
    const result = await response.json(); // makes a local storage user object with the signed-in user 
    localStorage.setItem("user", JSON.stringify({
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      id: result.id,
      role: result.role,
      address: result.address,
      cardNum: result.cardNum,
      passwordHash: result.passwordHash
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

  const customerId = userdata ? userdata.id : null;


  return (
    <LoginContext.Provider value={{ LoginUser, LogoutUser, userdata, isLoggedIn, errorMessage }}>
      {children}
    </LoginContext.Provider>
  );
};
