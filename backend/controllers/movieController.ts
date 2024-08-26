import { Request, Response } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../services/movieService';

export const handleAddFavorite = async (req: Request, res: Response) => {
    try {
        const { userId, movieId } = req.body;
        const data = await addFavorite(userId, movieId);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const handleRemoveFavorite = async (req: Request, res: Response) => {
    try {
        const { userId, movieId } = req.body;
        const data = await removeFavorite(userId, movieId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const handleGetFavorites = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const data = await getFavorites(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
