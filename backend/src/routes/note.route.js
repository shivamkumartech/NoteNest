import { Router } from "express";

import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/note.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(protect, getAllNotes).post(protect, createNote);

router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

export default router;
