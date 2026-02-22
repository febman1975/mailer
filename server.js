import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();

app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  try {
    await sendMail(req.body);
    res.json({ status: "queued" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Mailer API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mailer API listening on port ${PORT}`);
});
