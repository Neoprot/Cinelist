import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, 
});

export const fetchMovies = async (query: string) => {
    const response = await api.get(`/movies/search?query=${query}`);
    return response.data;
};

export const getTreadingMovies = async () => {
    const response = await api.get(`/movies/trending`);
    return response.data;
};

export const addFavorite = async (movieId: string) => {
    const response = await api.post(`/favorites`, { movieId });
    return response.data;
};

export const removeFavorite = async (movieId: string) => {
    const response = await api.delete(`/favorites/${movieId}`);
    return response.data;
};


