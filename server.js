import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();

/* Middleware */
app.use(bodyParser.json());

/* Root route — REQUIRED for Railway */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "mailer",
    message: "Mailer API is running"
  });
});

/* Health check — REQUIRED for Railway */
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

/* Send mail endpoint */
app.post("/send", async (req, res) => {
  try {
    const { to, subject, template, data, from } = req.body;

    await sendMail({
      to,
      subject,
      template,
      data,
      from
    });

    res.json({ status: "queued" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* PORT HANDLING — Railway compatible */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mailer API listening on port ${PORT}`);
});
