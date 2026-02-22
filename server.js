// server.js
import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();

/* Middleware */
app.use(bodyParser.json());

/* ROOT — REQUIRED BY RAILWAY */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "mailer",
    env: process.env.NODE_ENV || "development"
  });
});

/* HEALTH CHECK — REQUIRED BY RAILWAY */
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

/* SEND MAIL */
app.post("/send", async (req, res) => {
  try {
    await sendMail(req.body);
    res.json({ status: "queued" });
  } catch (err) {
    console.error("SEND ERROR:", err);
    res.status(500).json({
      error: err.message || "Send failed"
    });
  }
});

/* PORT — RAILWAY COMPATIBLE */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mailer API listening on port ${PORT}`);
});
