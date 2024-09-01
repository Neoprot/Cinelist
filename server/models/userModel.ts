import { supabase } from "../services/supabaseClient";

interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  password: string;
}

export const User = {
  async create(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    const { data, error } = await supabase
      .from("users")
      .insert([{ ...userData }])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }

    console.log("User created:", data);
    return data as User;
  },

  async findOne(query: { email: string }) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", query.email)
      .single();

    if (error) {
      console.error("Error finding user:", error.message);
      throw error;
    }

    console.log("User found:", data);
    return data as User;
  },
};
