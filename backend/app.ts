import express from 'express';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

export default app;
