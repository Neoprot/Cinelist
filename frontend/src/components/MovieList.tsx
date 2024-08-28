import React from 'react';
import MovieCard from './MovieCard';

interface MovieListProps {
    movies: any[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
        </div>
    );
};

export default MovieList;
