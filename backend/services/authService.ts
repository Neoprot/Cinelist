import supabase from './supabaseClient';


export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    const { user, session } = data;

    if (error) throw error;
    return { user, session };
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    const { user, session } = data;

    if (error) throw error;
    return { user, session };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};
