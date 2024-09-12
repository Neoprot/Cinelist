import React from 'react';
import MovieCard from './moviecard/MovieCard';

interface MovieListProps {
    movies: any[];
}

const MoviesGrid: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesGrid;