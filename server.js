import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();

/* Middleware */
app.use(bodyParser.json());

/* Root route (Railway expects this) */
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "mailer" });
});

/* Health check (Railway uses this internally) */
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

/* Send mail endpoint */
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
    console.error("Send error:", err);
    res.status(500).json({
      error: err.message || "Failed to send email"
    });
  }
});

/* PORT HANDLING — Railway compatible */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mailer API listening on port ${PORT}`);
});
