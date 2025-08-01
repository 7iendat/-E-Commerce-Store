import express from "express";
import {
  getProfile,
  loginController,
  logoutController,
  refreshToken,
  signUpController,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshToken);

router.get("/profile", protectRoute, getProfile);

export default router;
