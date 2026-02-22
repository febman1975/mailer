import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export function renderTemplate(name, data = {}) {
  const filePath = path.resolve("templates", `${name}.hbs`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Template not found: ${name}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const template = Handlebars.compile(source);

  return template(data);
}
