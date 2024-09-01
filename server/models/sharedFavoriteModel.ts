import { supabase } from "../services/supabaseClient";

interface SharedFavorite {
  id: string;
  user_id: string;
  username: string;
  email: string;
  movie_ids: string[];
}

export const SharedFavorite = {
  async create(
    userId: string,
    username: string,
    email: string,
    movieIds: string[]
  ) {
    const { data: existingData, error: existingError } = await supabase
      .from("shared_favorites")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      console.error(
        "Error checking existing shared favorite:",
        existingError.message
      );
      throw existingError;
    }

    let data, error;

    if (existingData) {
      ({ data, error } = await supabase
        .from("shared_favorites")
        .update({ movie_ids: movieIds })
        .eq("user_id", userId)
        .select()
        .single());
    } else {
      ({ data, error } = await supabase
        .from("shared_favorites")
        .insert([
          {
            user_id: userId,
            username: username,
            email: email,
            movie_ids: movieIds,
          },
        ])
        .select()
        .single());
    }

    if (error) {
      console.error("Error creating/updating shared favorite:", error.message);
      throw error;
    }

    console.log("Shared favorite created/updated:", data);
    return data as SharedFavorite;
  },

  async findSharedFavorites(query: { id: string }) {
    const { data, error } = await supabase
      .from("shared_favorites")
      .select("*")
      .eq("id", query.id)
      .single();

    if (error) {
      console.error("Error finding shared favorite:", error.message);
      throw error;
    }

    console.log("Shared favorite found:", data);
    return data as SharedFavorite;
  },
};
