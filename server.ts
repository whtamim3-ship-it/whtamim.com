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
      const { productName, productDescription, targetAudience, videoGoal, stylePreference, visualStyle } = req.body;

      if (!productName || !productDescription) {
        return res.status(400).json({ error: "Product name and description are required." });
      }

      const selectedVisualStyle = visualStyle || "Cinematic";
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });

          const prompt = `You are whtamim, a world-class SaaS Motion Designer and Product Video Editor inspired by Apple, Linear, and Stripe product launch films.
Generate a structured, production-ready SaaS Product Video Script & Motion Storyboard for:
Product Name: ${productName}
Description: ${productDescription}
Target Audience: ${targetAudience || "SaaS founders, tech leaders, decision-makers"}
Primary Video Goal: ${videoGoal || "Product Launch & User Conversion"}
Visual Style Category: ${selectedVisualStyle}
Custom Style Notes: ${stylePreference || "Modern UI Motion, Apple-like precision"}

CRITICAL REQUIREMENT: The visual descriptions, motion camera directions, UI animation rigs, and keyframe details MUST explicitly reflect the chosen Visual Style Category ("${selectedVisualStyle}"):
- If Minimalist: Emphasize monochrome contrasts, clean vector typography, micro-spring easing, and stark negative space.
- If Cinematic: Emphasize filmic depth of field, anamorphic lens flares, dramatic studio key lights, cinematic volumetric shadows, and steadycam moves.
- If Isometric: Emphasize 3D isometric grid perspectives, floating extruded UI layers, spatial dimension cards, and multi-planar camera orbits.
- If Neon Dark Mode: Emphasize cyber ambient dark canvas, glowing neon UI edges, ray-traced glassmorphism, and intense backdrop blurs.
- If Apple Keynote: Emphasize ultra-polished 3D hardware renders, glass reflections, floating device frames, keyframe zooms, and fluid mask transitions.
- If Abstract Vector: Emphasize morphing geometric paths, fluid kinetic typography, vibrant gradient fills, and artistic vector transitions.

Return ONLY a valid JSON object matching this exact schema:
{
  "projectTitle": "string",
  "logline": "string",
  "recommendedDuration": "string (e.g. '60 Seconds')",
  "pacingAndTone": "string",
  "musicStyle": "string",
  "visualStyle": "${selectedVisualStyle}",
  "scenes": [
    {
      "sceneNumber": 1,
      "timestamp": "0:00 - 0:08",
      "visualDescription": "string detailing exact motion graphics, AE UI animation, 3D depth, or camera move tailored to ${selectedVisualStyle}",
      "uiAnimationDetails": "string specifying Figma/AE UI components, cursor clicks, glass reflections in ${selectedVisualStyle} aesthetic",
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
          if (!parsedData.visualStyle) {
            parsedData.visualStyle = selectedVisualStyle;
          }

          return res.json({ success: true, storyboard: parsedData });
        } catch (geminiErr: any) {
          console.warn("Gemini API error, using intelligent fallback storyboard:", geminiErr.message);
        }
      }

      // Intelligent fallback storyboard tailored to selected Visual Style
      const styleKey = selectedVisualStyle.toLowerCase();
      let styleVisualPrefix = "Cinematic filmic lighting with 35mm depth-of-field";
      let transitionDef = "3D Depth Axis Swipe";
      let keyframeAE = "After Effects Camera Tracker & Optical Flares";

      if (styleKey.includes("minimal")) {
        styleVisualPrefix = "Stark high-contrast monochrome vector canvas with crisp typographic hierarchy";
        transitionDef = "Micro-Spring Snap Cut";
        keyframeAE = "Vector Path Trim & Apple-style Cubic Easing";
      } else if (styleKey.includes("iso")) {
        styleVisualPrefix = "3D Isometric grid stage with floating extruded UI planes and multi-planar depth";
        transitionDef = "3D Spatial Grid Orbit";
        keyframeAE = "Isometric Projection Matrix & Depth Map Blur";
      } else if (styleKey.includes("neon")) {
        styleVisualPrefix = "Cyber ambient dark canvas with glowing neon UI edges and glassmorphic blurs";
        transitionDef = "Glow Pulse Cross-Fade";
        keyframeAE = "Ray-Traced Edge Glow & Dynamic Backdrop Blur";
      } else if (styleKey.includes("apple")) {
        styleVisualPrefix = "Ultra-polished floating hardware frame with glass reflections and studio keylights";
        transitionDef = "Fluid Mask Zoom & Rotate";
        keyframeAE = "3D Layer Camera Tracking & Glass Shader Reflection";
      } else if (styleKey.includes("abstract")) {
        styleVisualPrefix = "Fluid morphing vector geometry with kinetic typography and vibrant gradient fills";
        transitionDef = "Morphing Path Transition";
        keyframeAE = "Vector Shape Morphing & Kinetic Typographic Scale";
      }

      const fallbackStoryboard = {
        projectTitle: `${productName} — ${selectedVisualStyle} Launch Film`,
        logline: `A high-impact ${selectedVisualStyle.toLowerCase()} product showcase highlighting how ${productName} revolutionizes workflows with precision motion design.`,
        recommendedDuration: "45 Seconds",
        pacingAndTone: `${selectedVisualStyle} Pacing, Confident & Technical`,
        musicStyle: "Custom Hybrid Electronic with Ambient Synth Risers",
        visualStyle: selectedVisualStyle,
        scenes: [
          {
            sceneNumber: 1,
            timestamp: "0:00 - 0:08",
            visualDescription: `${styleVisualPrefix}: Cold opening macro shot focusing on ${productName}'s core headline. Camera slowly pushes in.`,
            uiAnimationDetails: `Cursor glides smoothly across ${selectedVisualStyle.toLowerCase()} UI components, triggering a subtle micro-interaction.`,
            voiceoverText: `Every great workflow begins with clarity. Introducing ${productName}.`,
            onScreenText: productName.toUpperCase(),
            transitionType: transitionDef,
          },
          {
            sceneNumber: 2,
            timestamp: "0:08 - 0:20",
            visualDescription: `${styleVisualPrefix}: The camera pans seamlessly across key features (${productDescription.slice(0, 60)}...). Floating UI cards animate into view.`,
            uiAnimationDetails: `Interactive data streams and real-time dashboard widgets update with smooth keyframe springs.`,
            voiceoverText: `Engineered from the ground up for speed, automation, and effortless control.`,
            onScreenText: "POWERFUL. AUTOMATED. EFFORTLESS.",
            transitionType: "Whip Pan Zoom",
          },
          {
            sceneNumber: 3,
            timestamp: "0:20 - 0:35",
            visualDescription: `${styleVisualPrefix}: Split-screen reveal showing real-time performance metrics and deep workflow automation in action.`,
            uiAnimationDetails: `Glassmorphic modal overlays emerge with precise backdrop blur and specular highlights.`,
            voiceoverText: `Scale your productivity without breaking momentum. Everything synced instantly.`,
            onScreenText: "SEAMLESS EXECUTION AT SCALE",
            transitionType: transitionDef,
          },
          {
            sceneNumber: 4,
            timestamp: "0:35 - 0:45",
            visualDescription: `${styleVisualPrefix}: Grand hero lockup showing ${productName} logo framed in dramatic backlight, closing on a strong CTA.`,
            uiAnimationDetails: `Primary call-to-action button pulses with soft light sweep and tactile press feedback.`,
            voiceoverText: `Transform your workflow today with ${productName}. Start your trial now.`,
            onScreenText: `TRY ${productName.toUpperCase()} TODAY`,
            transitionType: "Fade to Black with Audio Ring-Out",
          },
        ],
        motionDesignKeyframes: [
          keyframeAE,
          "Cinema 4D / After Effects Glassmorphism Pass",
          "Custom Audio-Reactive Keyframe Oscillations",
        ],
        estimatedProductionTimeline: "2-3 Weeks",
        budgetTierEstimate: "$3,500 - $6,000",
      };

      return res.json({ success: true, storyboard: fallbackStoryboard });
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
