import express from "express";
import {
  // getProfile,
  loginController,
  logoutController,
  refreshToken,
  signUpController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshToken);

// router.get("/profile", getProfile);

export default router;
