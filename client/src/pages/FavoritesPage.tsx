import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteList from '../components/FavoriteList';
import { useAuth } from '../context/AuthContext';
import { postSharedFavorites } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import LoadingModal from '../components/LoadingModal';  // Importa o componente do modal

const FavoritesPage: React.FC = () => {
    const { favorites } = useFavorites();
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleShareFavorites = async () => {
        setIsLoading(true);
        setSuccess(false);
        setMessage('Sharing favorites...');

        try {
            const moviesId = favorites.map((movie) => movie.movie_id || movie.id);
            const res = await postSharedFavorites(user.id, user.email, moviesId);
            setSuccess(true);
            setMessage(`Shareable link: ${window.location.origin}/shared-favorites/${res.id}. 
                In 5 seconds this window will be automatic closed.`);

            const redirect = window.confirm('Do you want to be redirected to the new page?');
            if (redirect) {
                window.location.href = `/shared-favorites/${res.id}`;
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        } catch (error) {
            setSuccess(false);
            setMessage('Error sharing favorites. Please try again.');
            console.error('Error sharing favorites:', error);
        }
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
                        <></>
                    )}
                </div>
            </header>
            <main className="flex-grow px-20 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold font-serif">Your Favorite Movies</h1>
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
                <p>© 2024 Cinelist. All rights reserved.</p>
            </footer>

            <LoadingModal isLoading={isLoading} message={message} success={success} />
        </div>
    );
};

export default FavoritesPage;
