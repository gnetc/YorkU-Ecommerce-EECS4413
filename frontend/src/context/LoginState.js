import React, { createContext, useState } from "react";

/**
 * This page is for keeping track of the login state
 */

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedInState] = useState(false); // Login state

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedInState }}>
      {children}
    </LoginContext.Provider>
  );
};
