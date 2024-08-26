import { Router } from 'express';
import { handleSignUp, handleSignIn, handleSignOut } from '../controllers/authController';

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.post('/signout', handleSignOut);

export default router;
