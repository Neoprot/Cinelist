import React, { createContext, useContext, useState } from 'react';

interface FavoritesContextProps {
    favorites: any[];
    addFavorite: (movie: any) => void;
    removeFavorite: (movieId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<any[]>([]);

    const addFavorite = (movie: any) => {
        setFavorites([...favorites, movie]);
    };

    const removeFavorite = (movieId: string) => {
        setFavorites(favorites.filter((movie) => movie.id !== movieId));
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
