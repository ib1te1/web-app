import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        const role = sessionStorage.getItem('userRole');
        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
    }, []);

    const login = (token, role) => {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const logout = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};