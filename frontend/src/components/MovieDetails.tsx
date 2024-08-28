import React from 'react';

interface MovieDetailsProps {
    movie: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Release Date: {movie.release_date}</p>
        </div>
    );
};

export default MovieDetails;
