import { useState } from 'react';
import {api} from '../services/api';

interface UseFavoritesProps {
    userId: string;
    isLoggedIn: boolean;
}

const useFavorites = ({ userId, isLoggedIn }: UseFavoritesProps) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    const fetchFavorites = async () => {
        if (isLoggedIn) {
        try {
            const response = await api.get(`/movies/favorites?userId=${userId}`);
            setFavorites(response.data);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        }
        }
    };

    const addFavorite = async (movieId: number) => {
        if (isLoggedIn) {
        try {
            await api.post('/movies/favorites', { movieId, userId });
            setFavorites([...favorites, movieId]);
        } catch (error) {
            console.error("Failed to add favorite:", error);
        }
        } else {
        console.warn("User must be logged in to add favorites.");
        }
    };

    const removeFavorite = async (movieId: number) => {
        if (isLoggedIn) {
        try {
            await api.delete('/movies/favorites', { data: { movieId, userId } });
            setFavorites(favorites.filter(fav => fav !== movieId));
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
        } else {
        console.warn("User must be logged in to remove favorites.");
        }
    };

    return {
        favorites,
        fetchFavorites,
        addFavorite,
        removeFavorite,
    };
};

export default useFavorites;
