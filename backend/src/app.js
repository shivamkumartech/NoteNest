import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";

const app = express();

app.set("trust proxy", 1);

// Middlewares
app.use(express.json());
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


app.get("/api/v1/debug/ip", (req, res) => {
  res.json({
    ip: req.ip,
    forwardedFor: req.headers["x-forwarded-for"] || null,
    cfConnectingIp: req.headers["cf-connecting-ip"] || null,
  });
});

export default app;
