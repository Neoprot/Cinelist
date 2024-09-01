import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoMdHeartDislike , IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

interface FavoriteButtonProps {
    movie: any;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const isFavorite = favorites.some((fav) => fav.movie_id === movie.id || fav.id === movie.id);
    const handleClick = () => {
        if (!user) {
            alert('You need to be logged in to add favorites.');
            navigate('/login');
            return;
        }

        if (isFavorite) {
            removeFavorite(movie.movie_id || movie.id);
        } else {
            addFavorite(movie);
        }
    };

    const tooltipText = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

    return (
        <div className="relative group">
            <button
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative p-3 rounded-full bg-blue-800 w-12 h-12 flex items-center justify-center"
            >
                <IoIosHeartEmpty
                    className={`transition-opacity duration-300 absolute text-white
                        ${hovered || isFavorite ? 'opacity-0' : 'opacity-100'} `}
                    style={{ fontSize: '32px' }}
                />
                <IoMdHeart
                    className={`transition-opacity duration-300 absolute text-red-500
                        ${hovered && !isFavorite ? 'opacity-100 scale-110' : 'opacity-0'}`}
                    style={{ fontSize: '32px' }}
                />
                <IoMdHeart
                    className={`transition-opacity duration-300 absolute text-red-500
                        ${!hovered && isFavorite ? 'opacity-100' : 'opacity-0'}`}
                    style={{ fontSize: '32px' }}
                />
                <IoMdHeartDislike 
                    className={`transition-opacity duration-300 absolute
                        ${hovered && isFavorite ? 'opacity-100' : 'opacity-0'} 
                        text-white`}
                    style={{ fontSize: '32px' }}
                />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity duration-300">
                {tooltipText}
            </span>
        </div>
    );
};

export default FavoriteButton;