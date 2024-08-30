import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async (query: string) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query,
            },
        });
        return response.data.results;
    } catch (error: any) {
        throw new Error(`Failed to fetch movies: ${(error as Error).message}`);
    }
};

export const getMovieDetails = async (movieId: number) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch movie details: ${(error as Error).message}`);
    }
};

import { supabase } from './supabaseClient';
import { Database } from '../utils/databaseTypes';

type FavoriteRow = Database['public']['Tables']['favorites']['Row'];

export const addFavorite = async (userId: string, movieId: number, title: string): Promise<FavoriteRow> => {
    const { data, error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, movie_id: movieId, title })
        .single();

    if (error) throw error;
    return data as FavoriteRow;
};

export const getFavorites = async (userId: string) => {
    const { data, error } = await supabase.from('favorites').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};
