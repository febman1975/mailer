// services/template.js
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";

/* ============================
   ESM __dirname FIX
============================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ============================
   TEMPLATE RENDERER
============================ */
export function renderTemplate(templateName, data = {}) {
  if (!templateName) {
    throw new Error("Template name is required");
  }

  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    templateName
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templateName}`);
  }

  const source = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(source);

  return template(data);
}