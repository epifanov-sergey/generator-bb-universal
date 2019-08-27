"use strict";
const path = require("path");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { isObject, isString } = require("./utils");
const prompts = require("./prompts");

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red("bb-universal")} generator!`));

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.sourceFolder = `${this.templatePath(this.props.type)}${path.sep}src`;
      this.destinationFolder = `${this.destinationPath(this.props.name)}`;
    });
  }

  writing() {
    this._copy(this.props.type, this.sourceFolder, this.destinationFolder);
  }

  _copy(componentType = "", sourceFolder = "", destinationFolder = "") {
    if (componentType) {
      const {
        schema: { templates, staticFiles } = {}
      } = require(`./templates/${componentType}/config/schema`);
      this._copyFiles(staticFiles, sourceFolder, destinationFolder);
      this._copyTemplates(
        templates,
        this.props,
        this.sourceFolder,
        this.destinationFolder
      );
    } else {
      throw new Error("Empty component's type");
    }
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
