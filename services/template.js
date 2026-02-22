import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

const templatesDir = path.resolve("templates");

export function renderTemplate(name, data = {}) {
  const file = name.endsWith(".hbs") ? name : `${name}.hbs`;
  const filePath = path.join(templatesDir, file);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Template not found: ${file}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const template = Handlebars.compile(source);
  return template(data);
}
