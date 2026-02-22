import express from "express";
import bodyParser from "body-parser";
import { emailQueue } from "./queue.js";

const app = express();
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  await emailQueue.add("send-email", req.body);
  res.json({ status: "queued" });
});

app.listen(3000, () => {
  console.log("Mailer API listening on port 3000");
});
