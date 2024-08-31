import { Router } from "express";
import {
  fetchMovies,
  fetchMovieDetails,
  getTrending,
  addFavoriteMovie,
  fetchFavorites,
  deleteFavorites,
} from "../controllers/movieController";

const router = Router();

router.get("/search", fetchMovies);
router.get("/search/:movieId", fetchMovieDetails);
router.get("/trending", getTrending);
router.post("/favorites", addFavoriteMovie);
router.get("/favorites/:userId", fetchFavorites);
router.delete("/favorites/:userId/:movieId", deleteFavorites);

export default router;
