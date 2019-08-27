const path = require("path");
const { title, name } = require("./mock");

module.exports = {
  validator: {
    fileExists: [
      "model.xml",
      "index.hbs",
      "readme.md",
      `media${path.sep}icon.png`,
      `scripts${path.sep}index.js`
    ],
    fileContents: [
      {
        file: "model.xml",
        regexp: [
          `<value type="string">${title}</value>`,
          `<container>`
        ]
      },
      {
        file: "index.hbs",
        regexp: [
          `<title>${title}</title>`,
          `<body onload="window['${name}'](widget);">`
        ]
      },
      {
        file: "readme.md",
        regexp: [`# Контейнер ${title}`]
      }
    ]
  }
};
