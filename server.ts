import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", studio: "whtamim motion design" });
  });

  // XML Sitemap for Google Search Console & Search Crawlers
  app.get("/sitemap.xml", (req, res) => {
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://whtamim.work/</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://whtamim.work/#work</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://whtamim.work/#about</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://whtamim.work/#assets</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://whtamim.work/#faq</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://whtamim.work/#contact</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.status(200).send(sitemapXml.trim());
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://whtamim.work/sitemap.xml\n`;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.status(200).send(robotsTxt);
  });

  // Contact / Project Inquiry endpoint (Destination: whtamim3@gmail.com)
  app.post("/api/inquire", async (req, res) => {
    try {
      const { name, email, company, projectType, budget, timeline, message, access_key } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
      }

      console.log("------------------------------------------");
      console.log("📩 NEW PROJECT INQUIRY FOR: whtamim3@gmail.com");
      console.log(`From: ${name} <${email}>`);
      console.log(`Company: ${company || 'N/A'}`);
      console.log(`Project Type: ${projectType || 'N/A'}`);
      console.log(`Budget Tier: ${budget || 'N/A'}`);
      console.log(`Timeline: ${timeline || 'N/A'}`);
      console.log(`Message:\n${message || 'No message provided'}`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log("------------------------------------------");

      // Forward to Web3Forms if access_key is available
      const web3Key = access_key || process.env.WEB3FORMS_ACCESS_KEY;
      if (web3Key) {
        try {
          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: web3Key,
              name,
              email,
              to_email: "whtamim3@gmail.com",
              subject: `New Project Inquiry from ${name} [whtamim portfolio]`,
              from_name: `${name} (Client Inquiry)`,
              replyto: email,
              message: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nProject Type: ${projectType || 'N/A'}\nBudget: ${budget || 'N/A'}\nTimeline: ${timeline || 'N/A'}\n\nProject Brief & Goals:\n${message}`,
            }),
          });
        } catch (forwardErr: any) {
          console.warn("Web3Forms forward notice:", forwardErr?.message);
        }
      }

      return res.json({
        success: true,
        message: "Message Sent Successfully! whtamim will review your project requirements and respond within 24 hours.",
      });
    } catch (err: any) {
      console.error("Error handling inquiry:", err);
      return res.status(500).json({ error: "Failed to submit inquiry. Please try emailing directly." });
    }
  });

  // Newsletter Subscription endpoint (Destination: whtamim3@gmail.com)
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, access_key, source } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "A valid email address is required." });
      }

      console.log("------------------------------------------");
      console.log("📰 NEW JOURNAL NEWSLETTER SUBSCRIBER");
      console.log(`Destination: whtamim3@gmail.com`);
      console.log(`Subscriber Email: ${email}`);
      console.log(`Subject: New Newsletter Subscriber`);
      console.log(`Source: ${source || 'Blog Journal'}`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log("------------------------------------------");

      // Forward to Web3Forms if access_key is available
      const web3Key = access_key || process.env.WEB3FORMS_ACCESS_KEY;
      if (web3Key) {
        try {
          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: web3Key,
              email,
              to_email: "whtamim3@gmail.com",
              subject: `New Newsletter Subscriber: ${email}`,
              from_name: `Journal Newsletter`,
              replyto: email,
              message: `New Journal Newsletter Subscriber:\nEmail: ${email}\nSource: ${source || 'Blog Journal'}\nTimestamp: ${new Date().toISOString()}`,
            }),
          });
        } catch (forwardErr: any) {
          console.warn("Web3Forms subscriber forward notice:", forwardErr?.message);
        }
      }

      return res.json({
        success: true,
        message: "Subscribed successfully!",
      });
    } catch (err: any) {
      console.error("Error subscribing email:", err);
      return res.status(500).json({ success: false, error: "Failed to subscribe. Please try again." });
    }
  });

  // Video Stream Proxy for Google Drive / direct MP4 videos (supports byte-range streaming, looping, and autoplay)
  app.get("/api/video-stream/:id", async (req, res) => {
    try {
      const driveId = req.params.id;
      const targetUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`;

      const headers: Record<string, string> = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      };
      if (req.headers.range) {
        headers["Range"] = req.headers.range;
      }

      const response = await fetch(targetUrl, { headers });

      if (!response.ok && response.status !== 206) {
        return res.status(response.status).json({ error: "Failed to fetch video stream" });
      }

      const contentType = response.headers.get("content-type") || "video/mp4";
      const contentLength = response.headers.get("content-length");
      const contentRange = response.headers.get("content-range");
      const acceptRanges = response.headers.get("accept-ranges") || "bytes";

      res.status(response.status);
      res.setHeader("Content-Type", contentType.includes("html") ? "video/mp4" : contentType);
      res.setHeader("Accept-Ranges", acceptRanges);
      if (contentLength) res.setHeader("Content-Length", contentLength);
      if (contentRange) res.setHeader("Content-Range", contentRange);
      res.setHeader("Cache-Control", "public, max-age=86400");

      if (response.body) {
        const { Readable } = await import("stream");
        // @ts-ignore
        Readable.fromWeb(response.body).pipe(res);
      } else {
        res.end();
      }
    } catch (err: any) {
      console.error("Video streaming error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Streaming error" });
      }
    }
  });

  // API 404 Catch-All: Ensure any unmatched /api route returns JSON, never HTML
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      success: false,
      error: `API route '${req.method} ${req.originalUrl}' not found.`,
    });
  });

  // Global Error Handler for API routes
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Server API Error:", err);
    if (req.originalUrl.startsWith("/api") || req.path.startsWith("/api")) {
      return res.status(500).json({
        success: false,
        error: err.message || "Internal server error",
      });
    }
    next(err);
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
