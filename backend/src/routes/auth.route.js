import { Router } from "express";
import {
  refresh,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller.js";
import { authRateLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/register", authRateLimiter, userRegister);

router.post("/login", authRateLimiter, userLogin);

router.post("/refresh-token", authRateLimiter, refresh);

router.post("/logout", userLogout);

export default router;
