const { getTemplates } = require("./utils");
const templates = getTemplates();

module.exports = [
  {
    type: "list",
    name: "type",
    message: "What type of BackBase components are you want to create?",
    choices: templates
  },
  {
    type: "input",
    name: "name",
    message: "Enter component's name",
    validate: input => (input ? true : "Empty component's name")
  },
  {
    type: "input",
    name: "title",
    message: "Enter component's title",
    validate: input => (input ? true : "Empty component's title")
  }
];
