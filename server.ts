import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", studio: "whtamim motion design" });
  });

  // AI Script & Storyboard Generator endpoint for SaaS Product Launch Videos
  app.post("/api/generate-storyboard", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured in environment variables.",
        });
      }

      const { productName, productDescription, targetAudience, videoGoal, stylePreference } = req.body;

      if (!productName || !productDescription) {
        return res.status(400).json({ error: "Product name and description are required." });
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are whtamim, a world-class SaaS Motion Designer and Product Video Editor inspired by Apple, Linear, and Stripe product launch films.
Generate a structured, production-ready SaaS Product Video Script & Motion Storyboard for:
Product Name: ${productName}
Description: ${productDescription}
Target Audience: ${targetAudience || "SaaS founders, tech leaders, decision-makers"}
Primary Video Goal: ${videoGoal || "Product Launch & User Conversion"}
Style Direction: ${stylePreference || "Minimal, Cinematic, Modern UI Motion, Apple-like precision"}

Return ONLY a valid JSON object matching this exact schema:
{
  "projectTitle": "string",
  "logline": "string",
  "recommendedDuration": "string (e.g. '60 Seconds')",
  "pacingAndTone": "string",
  "musicStyle": "string",
  "scenes": [
    {
      "sceneNumber": 1,
      "timestamp": "0:00 - 0:08",
      "visualDescription": "string detailing exact motion graphics, AE UI animation, 3D depth, or camera move",
      "uiAnimationDetails": "string specifying Figma/AE UI components, cursor clicks, glass reflections",
      "voiceoverText": "string",
      "onScreenText": "string",
      "transitionType": "string (e.g. 'Smooth 3D Axis Rotate' or 'Fluid Mask Zoom')"
    }
  ],
  "motionDesignKeyframes": [
    "string describing key AE effect or vector path animation"
  ],
  "estimatedProductionTimeline": "string (e.g. '2-3 Weeks')",
  "budgetTierEstimate": "string (e.g. '$3,500 - $6,000')"
}
Do not enclose in markdown codeblocks if possible, or return plain JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      return res.json({ success: true, storyboard: parsedData });
    } catch (err: any) {
      console.error("Error generating storyboard:", err);
      return res.status(500).json({
        error: "Failed to generate AI storyboard.",
        details: err.message || String(err),
      });
    }
  });

  // Contact / Project Inquiry endpoint
  app.post("/api/inquire", async (req, res) => {
    try {
      const { name, email, company, projectType, budget, timeline, message } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
      }
      
      // Log inquiry on server side
      console.log("New Project Inquiry Received for whtamim:", {
        name,
        email,
        company,
        projectType,
        budget,
        timeline,
        message,
        receivedAt: new Date().toISOString(),
      });

      return res.json({
        success: true,
        message: "Inquiry received successfully! whtamim will review your project requirements within 24 hours.",
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to submit inquiry." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`whtamim Motion Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
