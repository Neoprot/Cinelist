import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingModal from './LoadingModal';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);                        

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('Loading...');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            setMessage('You are already logged in. Redirecting to home page.');
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
                setIsLoading(false);
            }, 2000);
        }
    }, [user, navigate]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccess(false);
        setMessage('Loading...');
        try {
            const response: any = await login(email, password);
            console.log(response);
            if (response.status !== 200) {
                setMessage('User not found. Please try again.');
                setSuccess(false);
                setError(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setError(false);
                }, 2000);
                return;
            }
            setMessage('Logged in successfully!');
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
                setIsLoading(false);
            }, 2000);
        } catch (error) {
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
                <h2 className="text-4xl font-bold text-center mb-6 font-serif">Login</h2>
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
                            className="absolute top-9 right-3 flex items-center justify-center text-gray-600"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
                        Login
                    </button>
                </form>
                <p className="text-center mt-8">
                    Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
                </p>
            </div>
            <LoadingModal isLoading={isLoading} message={message} success={success} error={error}/>
        </div>
    );
};

export default Login;
