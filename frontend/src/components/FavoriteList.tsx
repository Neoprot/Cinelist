import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from './MovieCard';

const FavoriteList: React.FC = () => {
    const { favorites } = useFavorites();

    return (
        <div>
        {favorites.length === 0 ? (
            <p>No favorite movies added yet.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            </div>
        )}
        </div>
    );
};

export default FavoriteList;
