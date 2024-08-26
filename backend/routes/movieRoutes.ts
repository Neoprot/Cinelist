import { Router } from 'express';
import { handleAddFavorite, handleRemoveFavorite, handleGetFavorites } from '../controllers/movieController';

const router = Router();

router.post('/favorites', handleAddFavorite);
router.delete('/favorites', handleRemoveFavorite);
router.get('/favorites/:userId', handleGetFavorites);

export default router;
