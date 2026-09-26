import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { adminStore } from "./server/adminStore";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", studio: "whtamim motion design" });
  });

  // Admin Authentication Middleware
  const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Unauthorized: Admin authentication token required." });
    }
    const token = authHeader.split(" ")[1];
    const verification = adminStore.verifySession(token);
    if (!verification.valid) {
      return res.status(401).json({ success: false, error: "Unauthorized: Session expired or invalid." });
    }
    (req as any).adminUser = verification.user;
    next();
  };

  // --- Dynamic Content Endpoints ---
  // Public content endpoint for frontend hydration
  app.get("/api/content", (req, res) => {
    try {
      const content = adminStore.getContent();
      res.json({ success: true, data: content });
    } catch (err: any) {
      res.status(500).json({ success: false, error: "Failed to retrieve site content" });
    }
  });

  // --- Admin Authentication Endpoints ---
  app.post("/api/admin/login", (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required." });
      }
      const result = adminStore.login(email, password);
      if (!result.success) {
        return res.status(401).json(result);
      }
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Login failed" });
    }
  });

  app.get("/api/admin/verify", (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : "";
      const result = adminStore.verifySession(token);
      if (!result.valid) {
        return res.status(401).json({ success: false, valid: false, error: "Session invalid or expired" });
      }
      return res.json({ success: true, valid: true, user: result.user });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Verification failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : "";
      adminStore.logout(token);
      return res.json({ success: true, message: "Logged out successfully" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Logout failed" });
    }
  });

  app.post("/api/admin/update-credentials", requireAdminAuth, (req, res) => {
    try {
      const { email, password } = req.body;
      const result = adminStore.updateCredentials(email, password);
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to update credentials" });
    }
  });

  // --- Protected Content Management Endpoints ---
  app.put("/api/admin/settings", requireAdminAuth, (req, res) => {
    try {
      const updated = adminStore.updateSettings(req.body);
      return res.json({ success: true, settings: updated });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to update settings" });
    }
  });

  app.post("/api/admin/projects", requireAdminAuth, (req, res) => {
    try {
      const newProj = adminStore.addProject(req.body);
      return res.status(201).json({ success: true, project: newProj });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to add project" });
    }
  });

  app.put("/api/admin/projects/:id", requireAdminAuth, (req, res) => {
    try {
      const updated = adminStore.updateProject(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      return res.json({ success: true, project: updated });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to update project" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAdminAuth, (req, res) => {
    try {
      const deleted = adminStore.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      return res.json({ success: true, message: "Project deleted successfully" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to delete project" });
    }
  });

  app.put("/api/admin/assets/:id", requireAdminAuth, (req, res) => {
    try {
      const updated = adminStore.updateAssetPack(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: "Asset pack not found" });
      }
      return res.json({ success: true, assetPack: updated });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to update asset pack" });
    }
  });

  app.post("/api/admin/reset", requireAdminAuth, (req, res) => {
    try {
      const content = adminStore.resetToDefaults();
      return res.json({ success: true, data: content, message: "Site content restored to original defaults" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to reset content" });
    }
  });

  // --- Inquiries & Leads Endpoints ---
  app.get("/api/admin/inquiries", requireAdminAuth, (req, res) => {
    try {
      const inquiries = adminStore.getInquiries();
      return res.json({ success: true, inquiries });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to fetch inquiries" });
    }
  });

  app.put("/api/admin/inquiries/:id/status", requireAdminAuth, (req, res) => {
    try {
      const { status } = req.body;
      const ok = adminStore.updateInquiryStatus(req.params.id, status);
      if (!ok) {
        return res.status(404).json({ success: false, error: "Inquiry not found" });
      }
      return res.json({ success: true, message: "Status updated" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to update inquiry status" });
    }
  });

  app.delete("/api/admin/inquiries/:id", requireAdminAuth, (req, res) => {
    try {
      const ok = adminStore.deleteInquiry(req.params.id);
      if (!ok) {
        return res.status(404).json({ success: false, error: "Inquiry not found" });
      }
      return res.json({ success: true, message: "Inquiry deleted" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: "Failed to delete inquiry" });
    }
  });


  // Serve public static assets directory directly (sitemap.xml, robots.txt, icons, etc.)
  app.use(express.static(path.join(process.cwd(), "public")));

  // XML Sitemap for Google Search Console & Search Crawlers
  const serveSitemap = (req: express.Request, res: express.Response) => {
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
    <loc>https://whtamim.work/assets</loc>
    <lastmod>2026-09-07</lastmod>
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

    res.status(200);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.send(sitemapXml.trim());
  };

  app.get("/sitemap.xml", serveSitemap);
  app.get("/sitemap", serveSitemap);
  app.get("/api/sitemap.xml", serveSitemap);

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://whtamim.work/sitemap.xml\n`;
    res.status(200);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(robotsTxt);
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

      // Save to adminStore so it appears in the Admin Dashboard inquiries inbox
      try {
        adminStore.addInquiry({
          name,
          email,
          company: company || 'N/A',
          projectType: projectType || 'General Inquiry',
          budget: budget || 'Undisclosed',
          timeline: timeline || 'Flexible',
          message: message || 'No message provided'
        });
      } catch (storeErr) {
        console.warn("Could not save inquiry to adminStore:", storeErr);
      }

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

    // Dev mode SPA fallback handler: ensures /admin, /work, /assets never return 404
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes so they return proper API 404s
      if (url.startsWith("/api")) {
        return next();
      }

      try {
        let htmlFile = path.resolve(process.cwd(), "index.html");
        // If visiting /admin directly, prefer admin/index.html if present
        if (url === "/admin" || url.startsWith("/admin/") || url.startsWith("/admin?")) {
          const adminHtml = path.resolve(process.cwd(), "admin", "index.html");
          if (fs.existsSync(adminHtml)) {
            htmlFile = adminHtml;
          }
        }

        let template = fs.readFileSync(htmlFile, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    // Production explicit routes for admin
    app.get(["/admin", "/admin/*", "/admin/index", "/admin/index.html"], (req, res) => {
      const adminHtml = path.join(distPath, "admin", "index.html");
      if (fs.existsSync(adminHtml)) {
        res.sendFile(adminHtml);
      } else {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });

    // General SPA catch-all for all client-side routes (e.g. /work, /assets, /)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`whtamim Motion Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
