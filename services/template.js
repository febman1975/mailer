import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderTemplate(templateName, data = {}) {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    templateName
  );

  const source = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(source);
  return template(data);
}
