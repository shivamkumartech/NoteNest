import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/note.controller.js";

const router = express.Router()

router.post("/create-note", createNote)

router.get("/get-AllNotes", getAllNotes)

router.put("/update-note/:id", updateNote)

router.delete("/delete-note/:id", deleteNote)

export default router