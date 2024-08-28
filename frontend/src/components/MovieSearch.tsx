import React, { useState } from 'react';
import { fetchMovies } from '../services/api';

const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await fetchMovies(query);
        setMovies(result);
    };

    return (
        <div>
        <form onSubmit={searchMovies}>
            <input 
            type="text" 
            placeholder="Search for movies..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="border p-2"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white">
            Search
            </button>
        </form>
        <div>
            {/* Renderizar a lista de filmes aqui */}
        </div>
        </div>
    );
};

export default MovieSearch;
