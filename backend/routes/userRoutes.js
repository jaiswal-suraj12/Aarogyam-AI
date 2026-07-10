import express from "express";
import {
  getMyProfile,
  updateUserProfile,
} from "../controllers.js/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user
router.get("/me", authMiddleware, getMyProfile);

// Update profile / onboarding
router.put("/:id", authMiddleware, updateUserProfile);

export default router;
