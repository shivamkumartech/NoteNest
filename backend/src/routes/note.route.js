import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/note.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/get-AllNotes", protect, getAllNotes);

router.post("/create-note", protect, createNote);

router.put("/update-note/:id", protect, updateNote);

router.delete("/delete-note/:id", protect, deleteNote);

export default router;
