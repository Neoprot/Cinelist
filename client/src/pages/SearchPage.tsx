import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchMovies } from '../services/api';
import { useAuth } from '../context/AuthContext';
import SearchForm from '../components/SearchForm';
import MoviesGrid from '../components/MoviesGrid';

const SearchPage: React.FC = () => {
    const { user, logout } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchMovies(query, page);
            console.log(result.results);
            setMovies(result.results);
            setTotalPages(result.total_pages);
        };

        if (query) {
            fetchData();
        }
    }, [query, page]);

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const searchMovies = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <header className="px-20 py-6 bg-blue-500 text-white flex justify-between items-center">
                <Link to="/" className="text-white hover:underline">
                    <img src="/logo.png" alt="Logo" className="h-16" />
                </Link>
                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link to="/favorites" className="text-white hover:underline">
                                My Favorites
                            </Link>
                            <span className="ml-8">{user.email}</span>
                            <button onClick={logout} className="text-white hover:underline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:underline">
                                Login
                            </Link>
                            <span>|</span>
                            <Link to="/signup" className="text-white hover:underline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </header>
            <main className="flex-grow px-4 mx-8 ">

                
                    <div className='flex my-8'>
                        <h1 className="text-4xl font-bold font-serif py-6 px-6">Search Results for "{query}"</h1>
                        <SearchForm 
                        initialQuery={query} 
                        setQuery={(newQuery: string) => setSearchParams({ query: newQuery })} 
                        searchMovies={searchMovies}
                    />
                    </div>
                    <div className='pl-24'>
                        <MoviesGrid movies={movies} />
                    </div>
                    <div className="flex justify-center my-6 space-x-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={page === 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-xl">Page {page} of {totalPages}</span>
                        <button
                            onClick={goToNextPage}
                            disabled={page === totalPages}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                <p>© 2024 Cinelist. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SearchPage;