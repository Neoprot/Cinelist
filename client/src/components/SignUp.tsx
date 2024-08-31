import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (!termsAccepted) {
            alert("You must accept the terms of service.");
            return;
        }

        try {
            await signup(email, password);
            navigate('/login');
        } catch (error) {
            console.error("Error when registering:", error);
            alert("Error when registering. Please try again.");
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
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
    );
};

export default SignUp;
