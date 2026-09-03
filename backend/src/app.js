import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";
import helmet from "helmet";

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());

const allowedOrigins = process.env.FRONTEND_URL.split(",");

app.use(
  cors({
    origin: allowedOrigins,
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
