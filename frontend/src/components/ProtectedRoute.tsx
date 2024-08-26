import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isLoggedIn } = useFavorites();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
