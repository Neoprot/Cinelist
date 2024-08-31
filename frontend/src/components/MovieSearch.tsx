import React, { useState, useEffect } from 'react';
import { fetchMovies, getTreadingMovies } from '../services/api';
import MovieList from './MovieList';
import { FiSearch } from 'react-icons/fi';

const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const firstAcess = async () => {
        const trending = await getTreadingMovies();
        setMovies(trending);
    };

    useEffect(() => {
        firstAcess();
    }, []);

    const searchMovies = async (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() === '') {
            firstAcess();
        } else {
            const result = await fetchMovies(query);
            console.log(result);
            setMovies(result);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={searchMovies} className="relative flex items-center mt-8 w-full max-w-4xl center mx-auto">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    className="border rounded p-2 rounded-full w-2/3 pr-10 mx-auto text-lg pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    className="absolute right-44 top-1/2 transform -translate-y-1/2"
                >
                    <FiSearch className="text-gray-500 hover:text-blue-500 cursor-pointer" size={24} />
                </button>
            </form>
            <div className="mt-4 w-full overflow-x-hidden">
                {movies.length > 0 ? (
                    <MovieList movies={movies} />
                ) : (
                    <p className='text-white'>No movies found. Try searching for something else.</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;