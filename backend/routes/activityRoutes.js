import express from "express";

import {
addActivityLog,
getActivityLogs,
deleteActivityLog,
} from "../controllers.js/activityController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add activity
router.post("/", authMiddleware, addActivityLog);

// Get all activities
router.get("/", authMiddleware, getActivityLogs);

// Delete activity
router.delete("/:id", authMiddleware, deleteActivityLog);

export default router;
