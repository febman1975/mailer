// mailer.js
import nodemailer from "nodemailer";
import { renderTemplate } from "./services/template.js";

const transporter = nodemailer.createTransport({
  host: "smtp.nifty.com",
  port: 587,
  secure: false, // correct for 587
  auth: {
    user: "tsudakunn@nifty.com",
    pass: "FB54J657"
  }
});

<<<<<<< HEAD
export async function sendMail({ to, subject, template, data, from }) {
  if (!to || !subject || !template) {
    throw new Error("Missing required fields");
=======
export async function sendMail({ to, subject, template, data }) {
  if (!to || !subject || !template) {
    throw new Error("to, subject, and template are required");
>>>>>>> 146501b (Finalize mailer config, templates, and dependencies)
  }

  const html = renderTemplate(template, data || {});

  await transporter.sendMail({
<<<<<<< HEAD
    from: from || `"Maptrapp" <sales@nifty.com>`,
=======
    from: `"Maptrapp" <tsudakunn@nifty.com>`,
>>>>>>> 146501b (Finalize mailer config, templates, and dependencies)
    to,
    subject,
    html
  });

  return { status: "sent" };
}