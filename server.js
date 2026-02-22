import express from "express";
import { sendMail } from "./mailer.js";

const app = express();
app.use(express.json());

/**
 * API KEY AUTH (REQUIRED)
 */
app.use((req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || auth !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

/**
 * HEALTH CHECK (Railway friendly)
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * SEND EMAIL
 */
app.post("/send", async (req, res) => {
  try {
    await sendMail(req.body);
    res.json({ status: "queued" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mailer API listening on port ${PORT}`);
});
