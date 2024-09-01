import { SharedFavorite } from "../models/sharedFavoriteModel";
import { supabase } from "./supabaseClient";

export const postSharedFavorites = async (
  userId: string,
  username: string,
  email: string,
  movieIds: string[]
) => {
  const row = await SharedFavorite.create(userId, username, email, movieIds);
  return row;
};

export const getSharedFavorites = async (id: string) => {
  const data = await SharedFavorite.findSharedFavorites({ id });
  return data;
};
