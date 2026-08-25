import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/note.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const port = process.env.PORT || 3000;

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
app.use("/api/v1/notesapp", noteRoutes);
app.use("/api/v1/notenest/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
