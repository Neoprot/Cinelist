import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AuthContextProps {
    user: any;
    signup: (username: string,email: string, password: string) => Promise<unknown>;
    login: (email: string, password: string) => Promise<unknown>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/auth/validate-token', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data.user);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            })
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            });
        }
    }, []);

    const signup = async (username:string, email: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { username,email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            return response;
        } catch (error) {
            return (error as any);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            return response;
        } catch (error) {
            alert("Erro ao fazer login: " + (error as any).response.data.message);
            return (error as any);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
        window.location.reload();
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