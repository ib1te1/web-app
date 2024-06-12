import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        sessionStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};