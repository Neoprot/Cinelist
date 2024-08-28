import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2 w-full"
            required 
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border p-2 w-full"
            required 
            />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Login
        </button>
        </form>
    );
};

export default Login;
