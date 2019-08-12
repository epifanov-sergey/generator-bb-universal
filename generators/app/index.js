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
        message: "Enter component's name"
      },
      {
        type: "input",
        name: "title",
        message: "Enter component's title"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const sourceFolder = `${this.templatePath(this.props.type)}`;
    const destinationFolder = `${this.destinationPath(this.props.name)}`;
    this.copyMedia(sourceFolder, destinationFolder);
    this.copyScripts(sourceFolder, destinationFolder);
    this.copyTemplate(sourceFolder, destinationFolder);
    this.copyModel(sourceFolder, destinationFolder);
    this.copyReadme(sourceFolder, destinationFolder);
  }

  copyMedia(source, destination) {
    this.fs.copy(`${source}/media`, `${destination}/media`);
  }

  copyScripts(source, destination) {
    this.fs.copy(`${source}/scripts`, `${destination}/scripts`);
  }

  copyTemplate(source, destination) {
    this.fs.copyTpl(
      `${source}/index.hbs`,
      `${destination}/index.hbs`,
      this.props
    );
  }

  copyModel(source, destination) {
    this.fs.copyTpl(
      `${source}/model.xml`,
      `${destination}/model.xml`,
      this.props
    );
  }

  copyReadme(source, destination) {
    this.fs.copyTpl(
      `${source}/readme.md`,
      `${destination}/readme.md`,
      this.props
    );
  }
};
