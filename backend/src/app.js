import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Health Check Endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NoteNest API is running",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);

export default app;
