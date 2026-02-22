import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Mailer is Online");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.post("/send", async (req, res) => {
  try {
    const { to, subject, template, data, from } = req.body;
    await sendMail({ to, subject, template, data, from });
    res.json({ success: true, message: "Email queued" });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({ error: err.message });
  }
});

// RAILWAY FIX: Use process.env.PORT and bind specifically to 0.0.0.0
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is LIVE on 0.0.0.0:${PORT}`);
});
