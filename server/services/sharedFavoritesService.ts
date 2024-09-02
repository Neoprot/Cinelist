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

export const syncSharedFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("movie_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error syncing shared favorites:", error.message);
    throw error;
  }

  const movieIds = data.map((row) => row.movie_id);

  const { data: sharedFavorites, error: sharedError } = await supabase
    .from("shared_favorites")
    .update([{ movie_ids: movieIds }])
    .eq("user_id", userId)
    .select()
    .single();

  if (sharedError) {
    console.error("Error syncing shared favorites:", sharedError.message);
    throw sharedError;
  }
};
