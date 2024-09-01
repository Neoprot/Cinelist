import React, { useState, useEffect } from 'react';
import { fetchMovies, getTreadingMovies } from '../services/api';
import MovieList from './MovieList';
import { FiSearch } from 'react-icons/fi';

const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isDailyTrending, setIsDailyTrending] = useState(false);

    const firstAcess = async () => {
        const trending = await getTreadingMovies("week");
        setTrendingMovies(trending);
    };

    useEffect(() => {
        firstAcess();
    }, []);

    const searchMovies = async (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() === '') {
            alert('Please enter a search query.');
        } else {
            const result = await fetchMovies(query);
            setMovies(result);
        }
    };

    const toggleTrending = async (period: 'day' | 'week') => {
        setIsDailyTrending(period === 'day');
        const trending = await getTreadingMovies(period);
        setTrendingMovies(trending);
    };

    return (
        <div className="w-full">
            <div className="relative bg-cover bg-top bg-center h-60" style={{ backgroundImage: 'url(/oppen.webp)' }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-40 font-serif text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-2 ">Welcome to Cinelist</h1>
                    <h2 className="text-2xl md:text-4xl mb-8">Millions of movies. Explore now</h2>
                </div>
                <form onSubmit={searchMovies} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-2xl">
                    <input 
                        type="text" 
                        placeholder="Search for movies..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        className="border rounded p-2 rounded-full w-full pr-10 text-lg pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                        <FiSearch className="text-gray-500 hover:text-blue-500 cursor-pointer" size={24} />
                    </button>
                </form>
            </div>

            <div className="flex flex-col items-center mt-8 w-full">
                <div className="mt-4 w-full overflow-x-hidden">
                    {movies.length > 0 ? (
                        <><h1 className="text-4xl font-bold font-serif text-white px-4">Searched Movies</h1><MovieList movies={movies} /></>
                    ) : (<></>
                    )}
                </div>
            </div>

            <div className="mt-8 w-full">
                <div className="flex items-center mb-4 px-4">
                    <h1 className="text-4xl font-bold mr-4 text-white font-serif">Trending</h1>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => toggleTrending('day')} 
                            className={`px-4 py-2 rounded ${isDailyTrending ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                            Day
                        </button>
                        <button 
                            onClick={() => toggleTrending('week')} 
                            className={`px-4 py-2 rounded ${!isDailyTrending ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                            Week
                        </button>
                    </div>
                </div>
                <div className="relative">
                    {/* Replace with your carousel implementation */}
                    <MovieList movies={trendingMovies} />
                </div>
            </div>

        </div>
    );
};

export default MovieSearch;
