import React, { useState } from 'react';
import { fetchMovies } from '../services/api';
import MovieList from './MovieList';
import { FiSearch } from 'react-icons/fi';

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
        <div className="flex flex-col items-center w-full">
            <form onSubmit={searchMovies} className="relative flex items-center mt-8 w-full max-w-4xl center mx-auto">
                    <input 
                        type="text" 
                        placeholder="Search for movies..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        className="border rounded p-2 rounded-md w-1/4 pr-10 ml-auto mr-72"
                    />
                    <button 
                        type="submit" 
                        className="absolute right-1/3 top-1/2 transform -translate-y-1/2"
                    >
                        <FiSearch className="text-gray-500 hover:text-blue-500 cursor-pointer" size={24} />
                    </button>
            </form>
            <div className="mt-4 w-full overflow-x-hidden">
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
