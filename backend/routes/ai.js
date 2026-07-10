import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
  try {
    const { prompt, messages } = req.body;

    let finalPrompt = "";

    // AI Planner
    if (prompt) {
      finalPrompt = prompt;
    }

    // AI Chat
    else if (messages && Array.isArray(messages)) {
      finalPrompt = messages
        .map((msg) => {
          const speaker =
            msg.role === "user" ? "User" : "Assistant";

          return `${speaker}: ${msg.message}`;
        })
        .join("\n\n");
    }

    else {
      return res.status(400).json({
        success: false,
        message: "Prompt or messages are required.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(finalPrompt);

    const text = result.response.text();

    res.json({
      success: true,
      response: text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
});

export default router;