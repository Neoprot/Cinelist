import { Router } from 'express';
import { fetchMovies, fetchMovieDetails, addFavoriteMovie, fetchFavorites } from '../controllers/movieController';

const router = Router();

router.get('/movies', fetchMovies); // Exemplo: GET /movies?query=matrix
router.get('/movies/:movieId', fetchMovieDetails); // Exemplo: GET /movies/12345
router.post('/favorites', addFavoriteMovie); // Exemplo: POST /favorites
router.get('/favorites/:userId', fetchFavorites); // Exemplo: GET /favorites/1

export default router;
