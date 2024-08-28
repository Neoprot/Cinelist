import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Se o usuário não estiver autenticado, redirecione para a página de login
        return <Navigate to="/login" />;
    }

    // Se estiver autenticado, renderize o componente filho
    return children;
};

export default ProtectedRoute;
