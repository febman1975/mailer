// server.js
import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();

/* ============================
   CONFIG
============================ */
const PORT = process.env.PORT || 3000;

/* ============================
   MIDDLEWARE
============================ */
app.use(bodyParser.json());

/* ============================
   ROUTES
============================ */

// Root route (required for Railway)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "mailer"
  });
});

// Health check (match Railway healthcheck path)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Send mail
app.post("/send", async (req, res) => {
  try {
    const { to, subject, template, data, from } = req.body;

    if (!to || !subject || !template) {
      return res.status(400).json({
        error: "Missing required fields: to, subject, template"
      });
    }

    const result = await sendMail({
      to,
      subject,
      template,
      data,
      from
    });

    res.json({
      success: true,
      message: "Email sent",
      result
    });
  } catch (err) {
    console.error("Mailer error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Internal server error"
    });
  }
});

/* ============================
   SERVER START
============================ */
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mailer listening on 0.0.0.0:${PORT}`);
});

server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});