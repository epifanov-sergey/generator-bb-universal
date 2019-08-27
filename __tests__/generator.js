"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const rimraf = require("rimraf");
const { getTemplates } = require("../app/utils");

const getRootFolder = type => {
  const { name } = require(`../app/templates/${type}/config/mock`);
  return path.join(__dirname, "../", `${name}`);
};

const getPrompts = type => {
  const { name, title } = require(`../app/templates/${type}/config/mock`);
  return { type, name, title };
};

const createTemplate = type => {
  const configPath = path.join(__dirname, "../app");
  return helpers
    .run(configPath, { tmpdir: false })
    .withPrompts(getPrompts(type));
};

const deleteTemplate = type => {
  rimraf.sync(getRootFolder(type));
};

beforeAll(async () => {
  const tasks = getTemplates().map(type => createTemplate(type));
  await Promise.all(tasks);
});

describe("generator-bb-universal tests", () => {
  const types = getTemplates();
  describe.each(types.map(type => [type]))(
    "check %s structure",
    (type = "") => {
      const targetPath = `${getRootFolder(type)}${path.sep}`;
      const {
        validator: { fileExists, fileContents } = {}
      } = require(`../app/templates/${type}/config/validator`);
      test.each(fileExists.map(file => [file]))(
        "check %s existed",
        async file => {
          assert.file(`${targetPath}${file}`);
        }
      );
      test.each(fileContents.map(({ file, regexp }) => [file, regexp]))(
        "check %s contented mock values",
        async (file = "", regexp = []) => {
          regexp.forEach(rule => {
            assert.fileContent(`${targetPath}${file}`, rule);
          });
        }
      );
    }
  );
});

afterAll(() => {
  getTemplates().forEach(type => {
    deleteTemplate(type);
  });
});
