import { Router } from "express";
import {
  fetchMovies,
  fetchMovieDetails,
  getTrending,
  fetchFavorites,
  addFavoriteMovie,
  deleteFavorites,
} from "../controllers/movieController";
import {
  createSharedFavorites,
  findSharedFavorites,
} from "../controllers/sharedFavoritesController";

const router = Router();

router.get("/search", fetchMovies);
router.get("/search/:movieId", fetchMovieDetails);
router.get("/trending", getTrending);
router.get("/favorites/:userId", fetchFavorites);
router.post("/shared-favorites", createSharedFavorites);
router.get("/shared-favorites/:id", findSharedFavorites);
router.post("/favorites", addFavoriteMovie);
router.delete("/favorites/:userId/:movieId", deleteFavorites);

export default router;
