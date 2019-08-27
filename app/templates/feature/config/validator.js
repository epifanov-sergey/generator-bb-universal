const path = require("path");
const { title, name } = require("./mock");

module.exports = {
  validator: {
    fileExists: ["model.xml", "readme.md", `scripts${path.sep}index.js`],
    fileContents: [
      {
        file: "model.xml",
        regexp: [
          `<name>${name}</name>`,
          `<feature>`,
          `<value type="string">${title}</value>`
        ]
      },
      {
        file: "readme.md",
        regexp: [`# Фича ${title}`]
      }
    ]
  }
};
