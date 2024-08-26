import React, { useState } from 'react';
import { fetchMovies } from '../services/api';
import MovieList from './MovieList';

const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const results = await fetchMovies(query);
        setMovies(results);
    };

    return (
        <div>
        <form onSubmit={handleSearch} className="mb-4">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="p-2 border border-gray-300 rounded w-full"
            />
            <button type="submit" className="mt-2 w-full bg-blue-500 text-white py-2 rounded">Search</button>
        </form>
        <MovieList movies={movies} />
        </div>
    );
};

export default MovieSearch;
