import express from "express";
import { sendMail } from "./mailer.js";

const app = express();

/**
 * Middleware
 */
app.use(express.json());

/**
 * Health check (Railway + browser)
 */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "mailer",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * Send email endpoint
 */
app.post("/send", async (req, res) => {
  try {
    const { to, subject, template, data, from } = req.body;

    if (!to || !subject || !template) {
      return res.status(400).json({
        error: "Missing required fields: to, subject, template"
      });
    }

    await sendMail({ to, subject, template, data, from });

    res.json({ status: "queued" });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});

/**
 * Port (Railway injects PORT automatically)
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Mailer API listening on port ${PORT}`);
});
