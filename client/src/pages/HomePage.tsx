import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieSearch from '../components/MovieSearch';
import TrendingMovies from '../components/TrendingMovies';

const HomePage: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex bg-gray-900 flex-col">
            <header className="px-20 py-6 bg-blue-500 text-white flex justify-between items-center">
                <img src="/logo.png" alt="Logo" className="h-16" />
                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link to="/favorites" className="text-white hover:underline">
                                My Favorites
                            </Link>
                            <span className="ml-8">{user.email}</span>
                            <button onClick={logout} className="text-white hover:underline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:underline">
                                Login
                            </Link>
                            <span>|</span>
                            <Link to="/signup" className="text-white hover:underline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </header>
            <main className="flex-grow px-4 mx-8">
                <MovieSearch />
                <TrendingMovies/>
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                <p>© 2024 Cinelist. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
