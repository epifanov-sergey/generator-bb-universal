"use strict";
const path = require("path");
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
        this._generateWidget();
        break;
      case "container":
        this._generateContainer();
        break;
      case "feature":
        this._generateFeature();
        break;
      case "page":
        this._generatePage();
        break;
      default:
        break;
    }
  }

  _generateWidget() {
    this._copy(["media", "scripts"], ["index.hbs", "model.xml", "readme.md"]);
  }

  _generateContainer() {
    this._copy(["media", "scripts"], ["index.hbs", "model.xml", "readme.md"]);
  }

  _generateFeature() {
    this._copy(["scripts"], ["model.xml", "readme.md"]);
  }

  _generatePage() {
    this._copy(["scripts", "media", "index.hbs"], ["model.xml", "readme.md"]);
  }

  _copy(files = [], templates = []) {
    this._copyFiles(files, this.sourceFolder, this.destinationFolder);
    this._copyTemplates(templates, this.props, this.sourceFolder, this.destinationFolder);
  }

  _copyFiles(files = [], sourceFolder = "", destinationFolder = "") {
    if (
      Array.isArray(files) &&
      isString(sourceFolder) &&
      isString(destinationFolder)
    ) {
      files.forEach(file => {
        this.fs.copy(
          `${sourceFolder}${path.sep}${file}`,
          `${destinationFolder}${path.sep}${file}`
        );
      });
    }
  }

  _copyTemplates(
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
          `${sourceFolder}${path.sep}${template}`,
          `${destinationFolder}${path.sep}${template}`,
          values
        );
      });
  }
};
