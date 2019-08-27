const path = require("path");
const { name, title } = require("./mock");

module.exports = {
  validator: {
    fileExists: ["model.xml", "readme.md", `media${path.sep}icon.png`, `scripts${path.sep}index.js`],
    fileContents: [
      {
        file: "model.xml",
        regexp: [
          `<name>${name}</name>`,
          `<page>`,
          `<value type="string">${title}</value>`
        ]
      },
      {
        file: "readme.md",
        regexp: [`# Страница ${title}`]
      }
    ]
  }
};
