const path = require("path");
const answers = require("./answers");

module.exports = [
  {
    type: answers.widget.type,
    files: [
      "model.xml",
      "index.hbs",
      "readme.md",
      `media${path.sep}icon.png`,
      `scripts${path.sep}index.js`
    ],
    templates: [
      {
        file: "model.xml",
        regexp: [`<value type="string">${answers.widget.title}</value>`]
      },
      {
        file: "index.hbs",
        regexp: [
          `<title>${answers.widget.title}</title>`,
          `<body onload="window['${answers.widget.name}'](widget);">`
        ]
      },
      {
        file: "readme.md",
        regexp: [`# Виджет ${answers.widget.title}`, `${answers.widget.name}`]
      }
    ]
  },
  {
    type: answers.container.type,
    files: [
      "model.xml",
      "index.hbs",
      "readme.md",
      `media${path.sep}icon.png`,
      `scripts${path.sep}index.js`
    ],
    templates: [
      {
        file: "model.xml",
        regexp: [`<value type="string">${answers.container.title}</value>`]
      },
      {
        file: "index.hbs",
        regexp: [
          `<title>${answers.container.title}</title>`,
          `<body onload="window['${answers.container.name}'](widget);">`
        ]
      },
      {
        file: "readme.md",
        regexp: [`# Контейнер ${answers.container.title}`]
      }
    ]
  }
];
