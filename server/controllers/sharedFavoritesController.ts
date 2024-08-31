import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient"; // Importe o cliente do Supabase
import { SharedFavorite } from "../models/sharedFavoriteModel";
import {
  postSharedFavorites,
  getSharedFavorites,
} from "../services/sharedFavoritesService";

export const createSharedFavorites = async (req: Request, res: Response) => {
  const { userId, email, movieIds } = req.body;

  try {
    const row = await postSharedFavorites(userId, email, movieIds);
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
