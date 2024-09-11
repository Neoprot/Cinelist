import jwt from "jsonwebtoken";
import { supabase } from "./supabaseClient";

export const userService = {
  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", (decoded as any).userId)
        .single();

      if (error || !data) {
        throw new Error("User not found");
      }

      return data;
    } catch (error) {
      throw new Error("Invalid token");
    }
  },
};
