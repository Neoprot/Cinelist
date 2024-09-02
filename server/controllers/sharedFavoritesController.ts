import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient"; // Importe o cliente do Supabase
import { SharedFavorite } from "../models/sharedFavoriteModel";
import {
  postSharedFavorites,
  getSharedFavorites,
  checkSharedFavorites,
  excludeSharedFavorites,
} from "../services/sharedFavoritesService";

export const createSharedFavorites = async (req: Request, res: Response) => {
  const { userId, username, email, movieIds } = req.body;

  try {
    const row = await postSharedFavorites(userId, username, email, movieIds);
    res.status(201).json(row);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const findSharedFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await getSharedFavorites(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const hasSharedFavorites = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const hasSharedFavorites = await checkSharedFavorites(userId);
    res.status(200).json(hasSharedFavorites);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteSharedFavorites = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await excludeSharedFavorites(userId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
