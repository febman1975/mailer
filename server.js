import express from "express";
import { sendMail } from "./mailer.js";

const app = express();
app.use(express.json());

/**
 * REQUIRED FOR RAILWAY
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * SEND EMAIL
 */
app.post("/send", async (req, res) => {
  try {
    const { to, subject, template, data, from } = req.body;

    await sendMail({ to, subject, template, data, from });

    res.json({ status: "queued" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mailer API listening on port ${PORT}`);
});
