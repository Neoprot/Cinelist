import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingModal from './LoadingModal';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {user, signup } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('Loading...');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            setSuccess(false);
            setIsLoading(false);
            return;
        }
        if (!termsAccepted) {
            setMessage('You must accept the terms of service.');
            setSuccess(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setMessage('Loading...');
        setSuccess(false);
        try {
            const response: any = await signup(username,email, password);
            console.log(response);
            if (response.status !== 201) {
                setMessage('Email already registered. Please try again.');
                setSuccess(false);
                setError(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setError(false);
                }, 2000);
                return;
            }
            setMessage('User registered successfully!');
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            alert('Error registering. Please try again.');
            setSuccess(false);
            setTimeout(() => setIsLoading(false), 2000);
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
                <h2 className="text-4xl font-bold text-center mb-6 font-serif">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-1/2 right-4 flex items-center justify-center text-gray-600"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute top-1/2 right-4 flex items-center justify-center text-gray-600"
                        >
                            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mr-2"
                            required
                        />
                        <label className="text-sm">I accept the terms of service</label>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
            <LoadingModal isLoading={isLoading} message={message} success={success} error={error} />
        </div>
    );
};

export default SignUp;
