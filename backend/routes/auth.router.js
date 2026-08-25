import { Router } from "express";
import {
  refresh,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", userRegister);

router.post("/login", userLogin);

router.post("/refresh-token", refresh);

router.post("/logout", userLogout);

export default router;
