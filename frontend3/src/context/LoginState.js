import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedInState] = useState(false); // Login state

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedInState }}>
      {children}
    </LoginContext.Provider>
  );
};
