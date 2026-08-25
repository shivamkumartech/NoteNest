import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/note.controller.js";

const router = Router();

router.get("/get-AllNotes", getAllNotes);

router.post("/create-note", createNote);

router.put("/update-note/:id", updateNote);

router.delete("/delete-note/:id", deleteNote);

export default router;
