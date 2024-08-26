import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchMovies = async (query: string) => {
    const response = await api.get(`/movies/search`, { params: { query } });
    return response.data;
};

export const addFavorite = async (movieId: number, userId: string) => {
    const response = await api.post(`/movies/favorites`, { movieId, userId });
    return response.data;
};

export const removeFavorite = async (movieId: number, userId: string) => {
    const response = await api.delete(`/movies/favorites`, { data: { movieId, userId } });
    return response.data;
};

export const getFavorites = async (userId: string) => {
    const response = await api.get(`/movies/favorites/${userId}`);
    return response.data;
};
