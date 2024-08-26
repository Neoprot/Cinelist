import { supabase } from './supabaseClient';

export const addFavorite = async (userId: string, movieId: number) => {
    const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, movie_id: movieId }]);
    
    if (error) throw error;
    return data;
};

export const removeFavorite = async (userId: string, movieId: number) => {
    const { data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movieId);
    
    if (error) throw error;
    return data;
};

export const getFavorites = async (userId: string) => {
    const { data, error } = await supabase
        .from('favorites')
        .select('movie_id')
        .eq('user_id', userId);

    if (error) throw error;
    return data;
};
