import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import CircularRate from './CircularRate';

interface MovieCardProps {
    movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();
    const hasPoster = movie.poster_path !== null;

    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    const handleFavoriteButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "Not Rated";

    return (
        <div className="min-w-[200px] max-w-[200px] flex flex-col items-center pb-2">
            <div
                className="relative w-full h-[300px] flex items-center justify-center rounded-t-3xl bg-gray-200 rounded-b-md cursor-pointer"
                onClick={handleCardClick}
            >
                {hasPoster ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-t-2xl rounded-b-md"
                    />
                ) : (
                    <span className="text-gray-500 text-center">Image not available</span>
                )}

                <div className="absolute bottom-2 left-2">
                    <CircularRate rate={rating} />
                </div>

                <div
                    className="absolute bottom-2 right-2"
                    onClick={handleFavoriteButtonClick}
                >
                    <FavoriteButton movie={movie} />
                </div>
            </div>

            <div className="w-full text-center">
                <h2
                    className="text-lg text-white font-bold mt-2 hover:text-blue-500 cursor-pointer inline"
                    onClick={handleCardClick}
                >
                    {movie.title}
                </h2>
            </div>
        </div>
    );
};

export default MovieCard;