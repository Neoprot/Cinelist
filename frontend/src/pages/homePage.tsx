import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieSearch from '../components/MovieSearch';

const HomePage: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="px-12 py-6 bg-blue-500 text-white flex justify-between items-center">
                <img src="/logo.png" alt="Logo" className="h-14" />
                <div className="flex items-center space-x-4">
                    <Link to="/favorites" className="text-white hover:underline">
                        Favoritos
                    </Link>
                    {user ? (
                        <>
                            <button onClick={logout} className="text-white hover:underline">
                                Logout
                            </button>
                            <span className="ml-8">{user.email}</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:underline">
                                Login
                            </Link>
                            <span>|</span>
                            <Link to="/signup" className="text-white hover:underline">
                                Registro
                            </Link>
                        </>
                    )}
                </div>
            </header>
            <main className="flex-grow p-4">
                <MovieSearch />
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                <p>© 2024 Movie App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
