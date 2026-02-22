// services/template.js
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";

<<<<<<< HEAD
export function renderTemplate(name, data) {
  const filePath = path.resolve("templates", name);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Template not found: ${name}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
=======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderTemplate(templateName, data) {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    templateName
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templateName}`);
  }

  const source = fs.readFileSync(templatePath, "utf8");
>>>>>>> 146501b (Finalize mailer config, templates, and dependencies)
  const template = Handlebars.compile(source);

  return template(data);
}