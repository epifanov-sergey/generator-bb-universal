"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-bb-universal")} generator!`)
    );

    const prompts = [
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
        message: "Enter your component's name"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const template = `${this.templatePath(this.props.type)}`;
    const destination = `${this.destinationPath(this.props.name)}`;
    this.fs.copy(`${template}/media`, `${destination}/media`);
    this.fs.copyTpl(
      `${template}/index.hbs`,
      `${destination}/index.hbs`,
      this.props
    );
    this.fs.copyTpl(
      `${template}/model.xml`,
      `${destination}/model.xml`,
      this.props
    );
    this.fs.copyTpl(
      `${template}/readme.md`,
      `${destination}/readme.md`,
      this.props
    );
  }

  install() {
    this.installDependencies()
      .then(() => {
        this.log(yosay("The dependencies successfully installed"));
      })
      .catch(err => {
        this.log(
          yosay(
            `
  Installing
  of
  dependencies
  finished
  with
  errors: ${err.toString()}
`
          )
        );
      });
  }
};
