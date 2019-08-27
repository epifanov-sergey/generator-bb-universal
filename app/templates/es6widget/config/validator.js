const path = require("path");
const { name, title } = require("./mock");

module.exports = {
  validator: {
    fileExists: [
      "index.jsx",
      "bootstrap.jsx",
      `backbase${path.sep}media${path.sep}icon.png`,
      `backbase${path.sep}scripts${path.sep}index.js`,
      `backbase${path.sep}index.hbs`,
      `backbase${path.sep}model.xml`,
      `backbase${path.sep}readme.md`,
    ],
    fileContents: [
      {
        file: `backbase${path.sep}model.xml`,
        regexp: [
          `<value type="string">${title}</value>`,
          `<widget>`
        ]
      },
      {
        file: `backbase${path.sep}index.hbs`,
        regexp: [
          `<title>${title}</title>`,
          `<body onload="window['${name}'](widget);">`
        ]
      },
      {
        file: `backbase${path.sep}readme.md`,
        regexp: [`# Виджет ${title}`]
      }
    ]

  }
};
