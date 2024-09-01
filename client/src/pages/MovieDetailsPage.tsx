import React from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails'; // Ajuste a importação conforme necessário
import { useAuth } from '../context/AuthContext';

const MovieDetailsPage: React.FC = () => {
    const { user, logout } = useAuth();
    const { id } = useParams<{ id: string }>();
    const movieId = id ? parseInt(id, 10) : 0;

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <header className="px-20 py-6 bg-blue-500 text-white flex justify-between items-center">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="h-20" />
                </Link>
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
            <main className="flex-grow px-4 mx-20 mt-4">
                <MovieDetails movieId={movieId} />
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                <p>© 2024 Cinelist. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default MovieDetailsPage;
