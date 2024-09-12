import React from 'react';

interface LoadingModalProps {
    isLoading: boolean;
    message: string;
    error: boolean;
    success: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isLoading, message, success, error }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-md shadow-md">
                {success && !error ? (
                    <div className="text-green-500 text-3xl mb-4">✔️</div>
                ) : error && !success ? (
                    <div className="text-red-500 text-3xl mb-4">❌</div>
                ) : (
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                )}
                <p className="text-gray-700 text-center">{message}</p>
            </div>
        </div>
    );
};

export default LoadingModal;