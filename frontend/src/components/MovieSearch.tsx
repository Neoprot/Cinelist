import React, { useState } from 'react';
import { fetchMovies } from '../services/api';
import MovieList from './MovieList';

const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await fetchMovies(query);
        setMovies(result);
        console.log(result);
    };

    return (
        <div className='h-full w-full'>
            <form onSubmit={searchMovies} className='flex justify-center mt-8'>
                <input 
                
                    type="text" 
                    placeholder="Search for movies..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    className="border rounded p-2 rounded-md"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded rounded-md ml-4">
                    Search
                </button>
            </form>
            <div className="mt-4">
                {movies.length > 0 ? (
                    <MovieList movies={movies} />
                ) : (
                    <p>No movies found. Try searching for something else.</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
