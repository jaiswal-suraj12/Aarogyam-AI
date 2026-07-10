import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

router.post(
  "/analyze-food",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,
          message: "Gemini API key is missing. Add GEMINI_API_KEY in backend .env.",
        });
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const imagePart = {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: req.file.mimetype,
        },
      };

      const prompt = `
You are a professional nutrition coach.

Analyze this food image.

Return your answer in Markdown format.

Include:

# Meal Name

# Estimated Calories

# Protein

# Carbohydrates

# Fat

# Healthy Score (1-10)

# Suggestions
`;

      const result = await model.generateContent([
        prompt,
        imagePart,
      ]);

      const response = await result.response;

      res.json({
        success: true,
        response: response.text(),
      });
    } catch (error) {
      console.error("Gemini food analysis error :",error);
      console.error("Error cause:", error?.cause);

      const message =
        error?.status === 400 ||
        error?.message?.includes("API key not valid")
          ? "Gemini API key is invalid. Update GEMINI_API_KEY in backend .env."
          : "Image analysis failed";

      res.status(500).json({
        success: false,
        message,
      });
    }
  }
);

export default router;
