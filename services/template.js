import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export function renderTemplate(templateName, data = {}) {
  const filePath = path.join(
    process.cwd(),
    "templates",
    `${templateName}.html`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Template not found: ${templateName}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const template = Handlebars.compile(source);

  return template(data);
}
