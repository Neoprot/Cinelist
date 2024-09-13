import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchMovies = async (query: string, page: number = 1) => {
  const response = await api.get(`/movies/search?query=${query}&page=${page}`);
  return response.data;
};

export const getTreadingMovies = async (time: string) => {
  const response = await api.get(`/movies/trending/${time}`);
  return response.data;
};

export const fetchFavorites = async (userId: string) => {
  const response = await api.get(`/movies/favorites?userId=${userId}`);
  return response.data;
};

export const addFavorite = async (userId: string, movieId: number) => {
  const response = await api.post(`/movies/favorites`, { userId, movieId });
  return response.data;
};

export const removeFavorite = async (userId: string, movieId: number) => {
  const response = await api.delete(`/movies/favorites`, {
    data: { userId, movieId },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await api.get(`/movies/search/${movieId}`);
  return response.data;
};

export const postSharedFavorites = async (
  userId: string,
  username: string,
  email: string,
  movieIds: number[]
) => {
  const response = await api.post(`/shared/shared-favorites`, {
    userId,
    username,
    email,
    movieIds,
  });
  return response.data;
};

export const getSharedFavorites = async (id: string) => {
  const response = await api.get(`/shared/shared-favorites/${id}`);
  return response.data;
};

export const hasSharedFavorites = async (userId: string) => {
  const response = await api.get(`/shared/has-shared-favorites/${userId}`);
  return response.data;
};

export const deleteSharedFavorites = async (userId: string) => {
  const response = await api.delete(
    `/shared/delete-shared-favorites/${userId}`
  );
  return response.data;
};
