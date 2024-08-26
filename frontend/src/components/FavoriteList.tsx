import React, { useEffect, useState } from 'react';
import { getFavorites } from '../services/api';

interface FavoriteListProps {
    userId: string;
}

const FavoriteList: React.FC<FavoriteListProps> = ({ userId }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
        const data = await getFavorites(userId);
        setFavorites(data.map((fav: any) => fav.movie_id));
        };
        fetchFavorites();
    }, [userId]);

    return (
        <div>
        <h2 className="text-xl font-bold mb-4">Your Favorites</h2>
        <ul>
            {favorites.map(fav => (
            <li key={fav} className="mb-2">
                Movie ID: {fav}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default FavoriteList;
