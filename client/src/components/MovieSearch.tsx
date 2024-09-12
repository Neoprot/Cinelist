import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    
    const searchMovies = async (e: React.FormEvent<HTMLFormElement>, searchQuery: string) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
          alert('Please enter a search query.');
        } else {
          navigate(`/search?query=${searchQuery}`);
        }
      };
      
    

    return (
        <div className="w-full">
            <div className="relative bg-cover bg-top bg-center h-60" style={{ backgroundImage: 'url(/oppen.webp)' }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-40 font-serif text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-2">Welcome to Cinelist</h1>
                    <h2 className="text-2xl md:text-4xl mb-8">Millions of movies. Explore now</h2>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
                <SearchForm initialQuery={query} setQuery={setQuery} searchMovies={searchMovies} />

                </div>
            </div>
        </div>
    );
};

export default MovieSearch;