// server.js
import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();

/* Middleware */
app.use(bodyParser.json());

/* Root route (Railway hits this sometimes) */
app.get("/", (req, res) => {
  res.status(200).send("Mailer API is Online");
});

/* Health check */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

/* Send email */
app.post("/send", async (req, res) => {
  try {
    const { to, subject, template, data, from } = req.body;

    if (!to || !subject || !template) {
      return res.status(400).json({
        error: "Missing required fields: to, subject, template"
      });
    }

    const result = await sendMail({ to, subject, template, data, from });

    res.json({
      success: true,
      result
    });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/* 🚨 CRITICAL: Railway port binding */
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mailer listening on 0.0.0.0:${PORT}`);
});
