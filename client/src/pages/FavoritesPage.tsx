import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteList from '../components/FavoriteList';
import { useAuth } from '../context/AuthContext';
import { postSharedFavorites, hasSharedFavorites, deleteSharedFavorites } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import LoadingModal from '../components/modals/LoadingModal';
import ShareModal from '../components/modals/ShareModal'; 

const FavoritesPage: React.FC = () => {
    const { favorites } = useFavorites();
    const { user, logout } = useAuth();
    const [id, setId] = useState('');
    const [hasSharedFavoritesState, sethasSharedFavoritesState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareableLink, setShareableLink] = useState('');

    useEffect(() => {
        async function fetchData() {
            if (!user) return;
            const res = await hasSharedFavorites(user.id);
            setId(res.id);
            if (res.id) {
                sethasSharedFavoritesState(true);
            }
        }
        fetchData();
    }, [user]);

    const handleShareFavorites = async () => {
        setIsLoading(true);
        setSuccess(false);
        setMessage('Sharing favorites...');

        try {
            const moviesId = favorites.map((movie) => movie.movie_id || movie.id);
            const res = await postSharedFavorites(user.id, user.username, user.email, moviesId);
            const link = `${window.location.origin}/shared-favorites/${res.id}`;
            setId(res.id);
            setShareableLink(link);
            setSuccess(true);
            setMessage('Shareable link created!');

            sethasSharedFavoritesState(true);
            setIsShareModalOpen(true); 
        } catch (error) {
            setSuccess(false);
            setMessage('Error sharing favorites. Please try again.');
            console.error('Error sharing favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnshareFavorites = async () => {
        try {
            setIsLoading(true);
            setSuccess(false);
            setMessage('Deleting shareable link...');
            await deleteSharedFavorites(user.id);
            setSuccess(true);
            setMessage('Sharable link Deleted.');
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            sethasSharedFavoritesState(false);
        } catch (error) {
            console.error('Error unsharing favorites:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <header className="px-20 py-6 bg-blue-500 text-white flex justify-between items-center">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="h-16" />
                </Link>
                <div className="flex items-center space-x-6">
                    {user && (
                        <>
                            <span className="ml-8">{user.email}</span>
                            <button onClick={logout} className="text-white hover:underline">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </header>
            <main className="flex-grow px-20 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold font-serif">Your Favorite Movies</h1>
                    {!hasSharedFavoritesState ? (
                        <button
                            onClick={handleShareFavorites}
                            className="bg-blue-800 text-white px-4 py-2 rounded"
                        >
                            Share your favorites Movies
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => window.location.href = `/shared-favorites/${id}`}
                                className="bg-blue-800 text-white px-4 py-2 rounded"
                            >
                                Go to your shareable link
                            </button>
                            <button
                                onClick={handleUnshareFavorites}
                                className="bg-blue-800 text-white px-4 py-2 rounded"
                            >
                                Unshare your favorites Movies
                            </button>
                        </>
                    )}
                </div>
                <div className="mx-12">
                    <FavoriteList />
                </div>
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                <p>© 2024 Cinelist. All rights reserved.</p>
            </footer>

            <LoadingModal isLoading={isLoading} message={message} success={success} error={false} />
            <ShareModal isOpen={isShareModalOpen} shareableLink={shareableLink} onClose={() => setIsShareModalOpen(false)} />
        </div>
    );
};

export default FavoritesPage;