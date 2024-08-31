import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.redirect(`http://localhost:3000/`);
});

export default app;
