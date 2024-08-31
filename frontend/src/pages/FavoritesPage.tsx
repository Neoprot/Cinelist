import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteList from '../components/FavoriteList';
import { useAuth } from '../context/AuthContext';

const FavoritesPage: React.FC = () => {
    const { user, logout } = useAuth();
    const handleShareFavorites = () => {
        alert('Not implemented yet');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <header className="px-20 py-6 bg-blue-500 text-white flex justify-between items-center">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="h-20" />
                </Link>
                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <span className="ml-8">{user.email}</span>
                            <button onClick={logout} className="text-white hover:underline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </header>
            <main className="flex-grow px-20 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Your Favorite Movies</h1>
                    <button 
                        onClick={handleShareFavorites} 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Share your favorites Movies
                    </button>
                </div>
                <div className='mx-12'>
                    <FavoriteList />
                </div>
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                <p>© 2024 Movie App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FavoritesPage;