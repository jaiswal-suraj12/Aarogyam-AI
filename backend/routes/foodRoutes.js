import express from "express";
import {
  addFoodLog,
  getFoodLogs,
  deleteFoodLog,
} from "../controllers.js/foodController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addFoodLog);
router.get("/", authMiddleware, getFoodLogs);
router.delete("/:id", authMiddleware, deleteFoodLog);

export default router;
