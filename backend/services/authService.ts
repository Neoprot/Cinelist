import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';

export const registerUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = generateToken(user.id);
    return { user, token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }
    const token = generateToken(user.id);
    return { user, token };
};
