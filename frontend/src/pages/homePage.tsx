import React from 'react';
import MovieSearch from '../components/MovieSearch';
import FavoriteList from '../components/FavoriteList';
import { useFavorites } from '../hooks/useFavorites';

const HomePage: React.FC = () => {
    const { userId } = useFavorites();

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Movie List</h1>
        <MovieSearch />
        <FavoriteList userId={userId} />
        </div>
    );
};

export default HomePage;
