import React from 'react';
import { useFavorites } from '../hooks/useFavorites';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    const { addFavorite } = useFavorites();

    return (
        <div className="grid grid-cols-2 gap-4">
        {movies.map(movie => (
            <div key={movie.id} className="bg-white rounded shadow-md p-4">
            <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                className="mb-2 w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
            <button
                onClick={() => addFavorite(movie.id)}
                className="w-full bg-green-500 text-white py-2 rounded"
            >
                Add to Favorites
            </button>
            </div>
        ))}
        </div>
    );
};

export default MovieList;
