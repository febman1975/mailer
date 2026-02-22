import { Queue, Worker } from "bullmq";
import { sendMail } from "./mailer.js";

const connection = {
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
};

export const mailQueue = new Queue("mail", { connection });

new Worker(
  "mail",
  async (job) => {
    await sendMail(job);
  },
  { connection }
);
