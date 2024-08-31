import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/api';
import FavoriteButton from './FavoriteButton';

interface MovieDetailsProps {
    movieId: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId }) => {
    const [movie, setMovie] = useState<any>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await getMovieDetails(movieId);
                setMovie(response);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

    return (
        <div className="relative flex flex-col md:flex-row bg-white shadow-lg shadow-blue-400 rounded-lg overflow-hidden mb-6">
            <div className="md:w-1/6 w-1/2 mx-auto">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 md:w-5/6 relative">
                <div className="absolute top-4 right-4">
                    <FavoriteButton movie={movie} />
                </div>

                <h1 className="text-4xl font-bold mb-2 text-black pr-44">
                    {movie.title} ({releaseYear})
                </h1>
                <p className="text-gray-700 mb-4">{movie.tagline}</p>
                <p className="text-gray-700 mb-2"><strong>Rating:</strong> {movie.vote_average || "Not Rated"}</p>
                <p className="text-gray-700 mb-2"><strong>Genres:</strong> {movie.genres.map((genre: any) => genre.name).join(', ') || "Not Specified"}</p>
                <p className="text-gray-700 mb-2"><strong>Runtime:</strong> {movie.runtime} minutes</p>
                <h1 className="text-4xl font-bold mb-2 text-black">Overview</h1>
                <p className="text-gray-700 mb-4">{movie.overview}</p>
                <p className="text-gray-700 mb-2"><strong>Production Companies:</strong> {movie.production_companies.map((company: any) => company.name).join(', ') || "Not Specified"}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
