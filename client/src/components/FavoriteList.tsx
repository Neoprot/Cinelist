import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieDetails from './MovieDetails';

const FavoriteList: React.FC = () => {
    const { favorites } = useFavorites();

    return (
        <div>
            {favorites.length === 0 ? (
                <p>No favorite movies added yet.</p>
            ) : (
                <div className="space-y-12">
                    {favorites.map((movie) => {
                        return <MovieDetails key={movie.movie_id || movie.id} movieId={movie.movie_id || movie.id} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default FavoriteList;
