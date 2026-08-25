import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import noteRoutes from "./routes/note.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

// Core Middlewares
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

// API Routes
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;
