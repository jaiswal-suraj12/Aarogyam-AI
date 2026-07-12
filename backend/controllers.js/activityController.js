import ActivityLog from "../models/ActivityLog.js";

// Add activity
export const addActivityLog = async (req, res) => {
  console.log("Activity API called");
console.log(req.body);
console.log(req.userId);
  try {
    const { name, duration, calories, date } = req.body;

    if (!name || !duration || calories === undefined) {
      return res.status(400).json({
        message: "Name, duration and calories are required",
      });
    }

    const activityLog = await ActivityLog.create({
      user: req.userId,
      name,
      duration: Number(duration),
      calories: Number(calories),
      date: date || new Date(),
    });

    res.status(201).json({
      message: "Activity added successfully",
      activityLog,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to add activity",
    });
  }
};

// Get all activities
export const getActivityLogs = async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(activityLogs);

  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to get activities",
    });
  }
};

// Delete activity
export const deleteActivityLog = async (req, res) => {
  try {
    const activityLog = await ActivityLog.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!activityLog) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json({
      message: "Activity deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to delete activity",
    });
  }
};