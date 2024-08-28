import { Request, Response } from 'express';
import { signUp, signIn, signOut } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await signUp(email, password);
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const session = await signIn(email, password);
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        await signOut();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
