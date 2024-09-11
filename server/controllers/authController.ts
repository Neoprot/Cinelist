import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { userService } from "../services/userService";


export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await registerUser(username, email, password);
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

export const validateToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const user = await userService.validateToken(token);
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
