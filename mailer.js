// mailer.js
import nodemailer from "nodemailer";
import { renderTemplate } from "./services/template.js";

const transporter = nodemailer.createTransport({
  host: "smtp.nifty.com",
  port: 587,
  secure: false,
  auth: {
    user: "tsudakunn@nifty.com",
    pass: "FB54J657"
  }
});

export async function sendMail({ to, subject, template, data, from }) {
  if (!to || !subject || !template) {
    throw new Error("Missing required fields");
  }

  const html = renderTemplate(template, data || {});

  await transporter.sendMail({
    from: from || `"Maptrapp" <sales@nifty.com>`,
    to,
    subject,
    html
  });
}
