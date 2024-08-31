import { Router } from 'express';
import { fetchMovies, fetchMovieDetails, addFavoriteMovie, fetchFavorites, deleteFavorites} from '../controllers/movieController';

const router = Router();

router.get('/search', fetchMovies); // Exemplo: GET /movies?query=matrix
router.get('/search/:movieId', fetchMovieDetails); // Exemplo: GET /movies/12345
router.post('/favorites', addFavoriteMovie); // Exemplo: POST /favorites
router.get('/favorites/:userId', fetchFavorites); // Exemplo: GET /favorites/1
router.delete('/favorites/:userId/:movieId', deleteFavorites); // Exemplo: DELETE /favorites/1/12345

export default router;
