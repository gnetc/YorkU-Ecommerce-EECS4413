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
};
