import React from 'react';
import FavoriteButton from './FavoriteButton';

interface MovieCardProps {
    movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="border p-4">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full" />
        <h2 className="text-lg font-bold">{movie.title}</h2>
        <p>Rating: {movie.vote_average}</p>
        <FavoriteButton movie={movie} />
        </div>
    );
};

export default MovieCard;
