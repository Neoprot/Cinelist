import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
    movie: any;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const { user } = useAuth();
    const navigate = useNavigate();

    const isFavorite = favorites.some((fav) => fav.movie_id === movie.id || fav.id === movie.id);
    const handleClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        console.log(movie);
        if (isFavorite) {
            removeFavorite(movie.movie_id||movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <button 
            onClick={handleClick} 
            className={`p-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
};

export default FavoriteButton;
