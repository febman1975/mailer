import nodemailer from "nodemailer";
import { renderTemplate } from "./services/template.js";

const transporter = nodemailer.createTransport({
  host: "smtp.nifty.com",
  port: 587,
  secure: false,
  auth: {
    user: "tsudakunn@nifty.com",
    pass: process.env.SENDGRID_API_KEY
  }
});

export async function sendMail({ to, subject, template, data, from }) {
  if (!template) throw new Error("Template is required");

  const html = renderTemplate(template, data);

  await transporter.sendMail({
    from: from || `"Maptrapp" <tsudakunn@nifty.com>`,
    to,
    subject,
    html
  });
}
