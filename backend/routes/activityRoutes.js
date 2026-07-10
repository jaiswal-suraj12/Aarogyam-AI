import express from "express";

import {
addActivityLog,
getActivityLogs,
deleteActivityLog,
} from "../controllers.js/activityController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add activity
router.post("/add", authMiddleware, addActivityLog);

// Get all activities
router.get("/get", authMiddleware, getActivityLogs);

// Delete activity
router.delete("/:id", authMiddleware, deleteActivityLog);

export default router;
