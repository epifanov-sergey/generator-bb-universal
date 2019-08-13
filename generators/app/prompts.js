module.exports = [
  {
    type: "list",
    name: "type",
    message: "What type of BackBase components are you want to create?",
    choices: [
      "widget",
      {
        name: "container",
        disabled: "Unavailable at this time"
      },
      {
        name: "feature",
        disabled: "Unavailable at this time"
      }
    ]
  },
  {
    type: "input",
    name: "name",
    message: "Enter component's name"
  },
  {
    type: "input",
    name: "title",
    message: "Enter component's title"
  }
];
