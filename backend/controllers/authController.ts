import { Request, Response } from 'express';
import { signIn, signOut, signUp } from '../services/authService';

export const handleSignUp = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await signUp(email, password);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const handleSignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await signIn(email, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const handleSignOut = async (req: Request, res: Response) => {
    try {
        await signOut();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
