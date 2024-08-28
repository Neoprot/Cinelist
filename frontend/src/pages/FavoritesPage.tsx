import React from 'react';
import FavoriteList from '../components/FavoriteList';

const FavoritesPage: React.FC = () => {
    return (
        <div>
        <h1 className="text-3xl font-bold">Your Favorite Movies</h1>
        <FavoriteList />
        </div>
    );
};

export default FavoritesPage;
