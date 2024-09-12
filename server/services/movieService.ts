import axios from "axios";
import prisma from "./prismaClient";
import { syncSharedFavorites } from "./sharedFavoritesService";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Funções para interagir com a API do TMDB
export const getMovies = async (query: string, page: number) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        page,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch movies: ${(error as Error).message}`);
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch movie details: ${(error as Error).message}`
    );
  }
};

export const getTrendingMovies = async (time: string) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/${time}`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    throw new Error(
      `Failed to fetch trending movies: ${(error as Error).message}`
    );
  }
};

// Funções utilizando Prisma para favoritos
export const addFavorite = async (
  user_id: string,
  movie_id: number,
  title: string,
  poster_path: string
) => {
  const existingFavorite = await prisma.favorite.findFirst({
    where: {
      user_id,
      movie_id,
    },
  });

  if (existingFavorite) {
    return "Este filme já está na lista de favoritos.";
  }

  const newFavorite = await prisma.favorite.create({
    data: {
      user_id,
      movie_id,
      title,
      poster_path: poster_path,
    },
  });

  try {
    await syncSharedFavorites(user_id);
  } catch (error) {
    throw error;
  }

  return newFavorite;
};

export const getFavorites = async (user_id: string) => {
  const favorites = await prisma.favorite.findMany({
    where: {
      user_id,
    },
  });
  return favorites;
};

export const deleteFavorite = async (user_id: string, movie_id: number) => {
  await prisma.favorite.deleteMany({
    where: {
      user_id,
      movie_id,
    },
  });

  try {
    await syncSharedFavorites(user_id);
  } catch (error) {
    throw error;
  }
};
