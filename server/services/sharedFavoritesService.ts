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
    .select();

  if (sharedError) {
    console.error("Error syncing shared favorites:", sharedError.message);
    throw sharedError;
  }
};

export const checkSharedFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("shared_favorites")
    .select("id")
    .eq("user_id", userId)
    .limit(1);

  if (error) {
    console.error("Error checking shared favorites:", error.message);
    throw error;
  }
  if (data.length === 0) return { id: null };
  return data[0];
};

export const excludeSharedFavorites = async (userId: string) => {
  const { error } = await supabase
    .from("shared_favorites")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting shared favorites:", error.message);
    throw error;
  }
};
