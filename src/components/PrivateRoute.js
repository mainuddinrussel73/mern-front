import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext

const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext); // Get current user from context

    return currentUser ? children : <Navigate to="/login" />; // Navigate to login if not authenticated
};

export default PrivateRoute;
