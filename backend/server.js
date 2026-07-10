import "dotenv/config"

import express from "express";
import cors from "cors";


import mongoose from "mongoose";
import image from "./routes/image.js";
import ai from "./routes/ai.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";


console.log(
  "Gemini key loaded:",
  process.env.GEMINI_API_KEY
    ? "Yes"
    : "No"
);

const app = express();

app.use(
cors({
origin: "http://localhost:5173",
credentials: true,
})
);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
res.json({
message: "Aarogyam AI backend is running",
});
});
app.use("/api/image", image);
app.use("/api/ai", ai);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/activity", activityRoutes);

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
.then(() => {
console.log("MongoDB connected");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

})
.catch((error) => {
console.error("MongoDB connection error:", error.message);
});
