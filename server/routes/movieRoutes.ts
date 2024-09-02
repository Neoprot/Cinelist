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
  deleteSharedFavorites,
  findSharedFavorites,
  hasSharedFavorites,
} from "../controllers/sharedFavoritesController";

const router = Router();

router.get("/search", fetchMovies);
router.get("/search/:movieId", fetchMovieDetails);
router.get("/trending/:time", getTrending);
router.post("/shared-favorites", createSharedFavorites);
router.get("/shared-favorites/:id", findSharedFavorites);
router.get(
  "/shared-favorites/has-shared-favorites/:userId",
  hasSharedFavorites
);
router.delete("/shared-favorites/:userId", deleteSharedFavorites);
router.get("/favorites/:userId", fetchFavorites);
router.post("/favorites", addFavoriteMovie);
router.delete("/favorites/:userId/:movieId", deleteFavorites);

export default router;
