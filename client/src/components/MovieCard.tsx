import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

interface MovieCardProps {
    movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();
    const hasPoster = movie.poster_path !== null;
    
    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div 
            className="min-w-[200px] max-w-[200px] flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-md pb-2"
        >
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={handleCardClick}>
                {hasPoster ? (
                    <img 
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                        alt={movie.title} 
                        className="w-full h-full object-cover cursor-pointer" 
                    />
                ) : (
                    <span className="text-gray-500 text-center">Image not available</span>
                )}
            </div>
            <h2 className="text-md font-bold mt-2 text-center cursor-pointer hover:text-blue-500" onClick={handleCardClick}>{movie.title}</h2>
            <p className="text-sm mt-1">Rating: {movie.vote_average || "Not Rated"}</p>
            <FavoriteButton movie={movie} />
        </div>
    );
};

export default MovieCard;
