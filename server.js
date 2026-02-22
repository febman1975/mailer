import express from "express";
import { sendMail } from "./mailer.js";

const app = express();
app.use(express.json());

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

import fs from "fs";
import path from "path";

app.post("/templates", (req, res) => {
  const { name, html } = req.body;

  if (!name || !html) {
    return res.status(400).json({ error: "name and html are required" });
  }

  const templatePath = path.join(
    process.cwd(),
    "templates",
    `${name}.html`
  );

  fs.writeFileSync(templatePath, html, "utf8");

  res.json({ status: "template saved", template: name });
});
