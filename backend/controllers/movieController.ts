import { Request, Response } from 'express';
import { getMovies, getMovieDetails, addFavorite, getFavorites, deleteFavorite } from '../services/movieService';
import { Database } from '../utils/databaseTypes';


type FavoriteRow = Database['public']['Tables']['favorites']['Row'];

export const fetchMovies = async (req: Request, res: Response) => {
    const query = req.query.query as string; // Assumindo que a query de pesquisa é passada como parâmetro na URL
    try {
        const movies = await getMovies(query);
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const fetchMovieDetails = async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.movieId, 10);
    try {
        const movieDetails = await getMovieDetails(movieId);
        res.status(200).json(movieDetails);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const addFavoriteMovie = async (req: Request, res: Response) => {
    const { userId, movieId, title, poster_path} = req.body;
    try {
        const favorite: FavoriteRow = await addFavorite(userId, movieId, title, poster_path);
        res.status(201).json(favorite);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const fetchFavorites = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const favorites = await getFavorites(userId);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteFavorites = async (req: Request, res: Response) => {
    const { userId, movieId } = req.params;
    try {
        const favorites = await deleteFavorite(userId,movieId);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};