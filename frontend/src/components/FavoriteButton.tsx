import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

interface FavoriteButtonProps {
    movie: any;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    const handleClick = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
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
