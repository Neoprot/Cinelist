import { Router } from "express";
import {
  fetchMovies,
  fetchMovieDetails,
  getTrending,
  fetchFavorites,
  addFavoriteMovie,
  deleteFavorites,
} from "../controllers/movieController";

const router = Router();

router.get("/search", fetchMovies);
router.get("/search/:movieId", fetchMovieDetails);
router.get("/trending/:time", getTrending);
router.get("/favorites/:userId", fetchFavorites);
router.post("/favorites", addFavoriteMovie);
router.delete("/favorites/:userId/:movieId", deleteFavorites);

export default router;
