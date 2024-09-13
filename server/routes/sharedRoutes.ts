import { Router } from "express";
import {
  createSharedFavorites,
  deleteSharedFavorites,
  findSharedFavorites,
  hasSharedFavorites,
} from "../controllers/sharedFavoritesController";

const router = Router();

router.post("/shared-favorites", createSharedFavorites);
router.get("/shared-favorites/:id", findSharedFavorites);
router.get("/has-shared-favorites/:userId", hasSharedFavorites);
router.delete("/delete-shared-favorites/:userId", deleteSharedFavorites);

export default router;
