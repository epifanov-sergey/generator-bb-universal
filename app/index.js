"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { isObject, isString } = require("./utils");
const prompts = require("./prompts");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-bb-universal")} generator!`)
    );

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.sourceFolder = `${this.templatePath(this.props.type)}`;
      this.destinationFolder = `${this.destinationPath(this.props.name)}`;
    });
  }

  writing() {
    switch (this.props.type) {
      case "widget":
        this.generateWidget();
        break;
      case "container":
        this.generateContainer();
        break;
      case "feature":
        break;
      default:
        break;
    }
  }

  generateWidget() {
    const filesForCopy = ["media", "scripts"];
    const templatesForCopy = ["index.hbs", "model.xml", "readme.md"];
    this.copyFiles(filesForCopy, this.sourceFolder, this.destinationFolder);
    this.copyTemplates(
      templatesForCopy,
      this.props,
      this.sourceFolder,
      this.destinationFolder
    );
  }

  generateContainer() {
    const filesForCopy = ["media", "scripts"];
    const templatesForCopy = ["index.hbs", "model.xml", "readme.md"];
    this.copyFiles(filesForCopy, this.sourceFolder, this.destinationFolder);
    this.copyTemplates(
      templatesForCopy,
      this.props,
      this.sourceFolder,
      this.destinationFolder
    );
  }

  copyFiles(files = [], sourceFolder = "", destinationFolder = "") {
    if (
      Array.isArray(files) &&
      isString(sourceFolder) &&
      isString(destinationFolder)
    ) {
      files.forEach(file => {
        this.fs.copy(`${sourceFolder}/${file}`, `${destinationFolder}/${file}`);
      });
    }
  }

  copyTemplates(
    templates = [],
    values = {},
    sourceFolder = "",
    destinationFolder = ""
  ) {
    if (
      Array.isArray(templates) &&
      isObject(values) &&
      isString(sourceFolder) &&
      isString(destinationFolder)
    )
      templates.forEach(template => {
        this.fs.copyTpl(
          `${sourceFolder}/${template}`,
          `${destinationFolder}/${template}`,
          values
        );
      });
  }
};
