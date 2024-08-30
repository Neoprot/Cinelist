// src/models/userModel.ts
import { supabase } from '../services/supabaseClient';

interface User {
    id: string;
    email: string;
    created_at: string;
    password: string;
}

export const User = {
    async create(userData: { email: string; password: string }) {
        const { data, error } = await supabase
            .from<any, any>('users')
            .insert([{ ...userData }])
            .single();
        if (error) throw error;
        return data as User;
    },

    async findOne(query: { email: string }) {
        const { data, error } = await supabase
            .from<any,any>('users')
            .select('*')
            .eq('email', query.email)
            .single();
        if (error) throw error;
        return data as User;
    },
};
