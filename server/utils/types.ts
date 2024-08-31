export interface Movie {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
}

export interface Favorite {
    id: string;
    user_id: string;
    movie_id: string;
}
