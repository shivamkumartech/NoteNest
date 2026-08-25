import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/note.route.js";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// DB connection
try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("connected");
} catch (error) {
  console.log("error", error);
}

// routing middleware

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/v1/notesapp", noteRoutes);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
