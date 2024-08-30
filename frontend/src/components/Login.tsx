import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex justify-center mb-2">
                    <img 
                        src="/logo.png"
                        alt="Logo" 
                        className="h-24 w-24 object-contain"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 w-full rounded mb-4"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-9 right-2 flex items-center justify-center text-gray-600"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
                        Login
                    </button>
                </form>
                <p className="text-center mt-8">
                    Não tem uma conta? <a href="/signup" className="text-blue-500">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
