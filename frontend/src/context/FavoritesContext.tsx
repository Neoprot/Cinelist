import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface FavoritesContextProps {
    favorites: any[];
    addFavorite: (movie: any) => void;
    removeFavorite: (movieId: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<any[]>([]);
const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false);

useEffect(() => {
    const fetchFavorites = async () => {
        if (user) {
            try {
                const response = await api.get(`/movies/favorites/${user.id}`);
                setFavorites(response.data);
                setIsFavoritesLoaded(true);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        }
    };

    if (!isFavoritesLoaded) {
        fetchFavorites();
    }
}, [user, isFavoritesLoaded]);

    const addFavorite = async (movie: any) => {
        try {
            await api.post('/movies/favorites', { userId: user.id, movieId: movie.id, title: movie.title, poster_path: movie.poster_path });
            setFavorites((prevFavorites) => [...prevFavorites, movie]);
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const removeFavorite = async (movieId: string) => {
        try {
            console.log(user.id, movieId);
            await api.delete(`/movies/favorites/${user.id}/${movieId}`);
            setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.movie_id !== movieId && movie.id !== movieId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
