import fs from "fs/promises";
import Handlebars from "handlebars";

export async function renderTemplate(name, data) {
  const source = await fs.readFile(`templates/${name}.hbs`, "utf8");
  const template = Handlebars.compile(source);

  return {
    html: template(data),
    text: template(data)
  };
}
