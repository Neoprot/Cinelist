import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();
    
    if (!localStorage.getItem('token')) {
        alert('You need to be logged in to access this page.');
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
