import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

interface AuthContextProps {
    user: any;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);

    const signup = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { email, password });
            console.log(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Erro ao registrar: " + (error as any).response.data.error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            setUser(response.data.session.user);
            console.log(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Erro ao fazer login: " + (error as any).response.data.error);
        }
    };

    const logout = () => {
        // Lógica para deslogar o usuário
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
