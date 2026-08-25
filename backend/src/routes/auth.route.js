import { Router } from "express";
import {
  refresh,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/refresh-token", refresh);

router.post("/logout", userLogout);

export default router;
