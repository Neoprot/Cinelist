import bcrypt from "bcrypt";
import prisma from "./prismaClient";
import { generateToken } from "../utils/jwtUtils";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
  const token = generateToken(user.id);
  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }
  const token = generateToken(user.id);
  return { user, token };
};
