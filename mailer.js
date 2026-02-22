import nodemailer from "nodemailer";
import { renderTemplate } from "./services/template.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendMail({ to, subject, template, data = {}, from }) {
  if (!template) {
    throw new Error("Template is required");
  }

  const html = renderTemplate(template, data);

  return transporter.sendMail({
    from: from || process.env.MAIL_FROM,
    to,
    subject,
    html
  });
}
