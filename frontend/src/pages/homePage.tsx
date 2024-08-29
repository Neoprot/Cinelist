import React from 'react';
import MovieSearch from '../components/MovieSearch';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-4 bg-blue-500 text-white">
                <h1 className="text-2xl font-bold">Movie App</h1>
            </header>
            <main className="flex-grow p-4">
                <MovieSearch />
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                <p>© 2024 Movie App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
