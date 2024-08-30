import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await registerUser(email, password);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
