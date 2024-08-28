import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

interface AuthContextProps {
    user: any;
    signup: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email: string, password: string) => {
        console.log(email,password);
    };

    const signup = async (email: string, password: string) => {
        console.log("register",email,password);
        api.post('/auth/register', {email,password}).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }
    const logout = () => {
        // Lógica para deslogar o usuário
    };

    return (
        <AuthContext.Provider value={{ user, signup,login, logout }}>
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

export {};