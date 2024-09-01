import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/api';
import FavoriteButton from './FavoriteButton';
import { useNavigate } from 'react-router-dom';

interface MovieDetailsProps {
    movieId: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId }) => {
    const [movie, setMovie] = useState<any>(null);
    const [samePage, setSamePage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === `/movie/${movieId}`) {
            setSamePage(true);
        }
    }, [movieId]);

    const handleClick = () => {
        if (samePage) {
            console.log("You are already on the movie details page");    
        } else {
            navigate(`/movie/${movie.id}`);
        }
    };
    
    
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await getMovieDetails(movieId);
                console.log(response);
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
    
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "Not Rated";
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

    return (
        <div className="relative flex flex-col md:flex-row bg-white shadow-lg shadow-blue-400 rounded-lg overflow-hidden mb-6">
            <div className={`md:w-1/6 w-1/2 mx-auto ${!samePage ? 'cursor-pointer' : ''}`} onClick={!samePage ? handleClick : undefined}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 md:w-5/6 relative bg-gray-800">
                <div className="absolute top-8 right-8">
                    <FavoriteButton movie={movie} />
                </div>

                <h1
                    className={`text-4xl font-bold mb-2 text-white inline ${!samePage ? 'cursor-pointer hover:text-blue-500' : ''}`}
                    onClick={!samePage ? handleClick : undefined}
                >
                    {movie.title} ({releaseYear})
                </h1>

                <p className="text-white mb-4">{movie.tagline}</p>
                <p className="text-white mb-2"><strong>Rating:</strong> {rating}</p>
                <p className="text-white mb-2"><strong>Genres:</strong> {movie.genres.map((genre: any) => genre.name).join(', ') || "Not Specified"}</p>
                <p className="text-white mb-2"><strong>Runtime:</strong> {movie.runtime} minutes</p>
                
                <h1 className="text-4xl font-bold mb-2 text-white">Overview</h1>
                <p className="text-white mb-4">{movie.overview}</p>
                
                <h2 className="text-2xl font-bold mb-2 text-white">Production Companies</h2>
                <div className="flex flex-wrap gap-8">
                    {movie.production_companies.length > 0 ? (
                        movie.production_companies.map((company: any) => (
                            <div key={company.id} className="flex flex-col items-center justify-between space-y-2">
                                {company.logo_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                        alt={company.name}
                                        className="w-20 h-auto object-contain "
                                    />
                                ) : (
                                    <><span className="text-white">Image not available</span><span className="text-white">{company.name}</span></>
                                )}
                                {company.logo_path && (
                                    <span className="text-white">{company.name}</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No production companies listed.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
