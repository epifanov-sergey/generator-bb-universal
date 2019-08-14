"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const rimraf = require("rimraf");
const mockAnswers = require("../app/mockData/answers");
const mockGenerators = require("../app/mockData/generators");

const getRootFolder = type => {
  const name = mockAnswers[type].name;
  return path.join(__dirname, "../", `${name}`);
};

const createTemplate = type => {
  const configPath = path.join(__dirname, "../app");
  return helpers
    .run(configPath, { tmpdir: false })
    .withPrompts(mockAnswers[type]);
};

const deleteTemplate = type => {
  rimraf.sync(getRootFolder(type));
};

beforeAll(async () => {
  const types = mockGenerators.map(({ type }) => type);
  await Promise.all(types.map(type => createTemplate(type)));
});

describe("generator-bb-universal tests", () => {
  describe.each(
    mockGenerators.map(({ type, files, templates }) => [type, files, templates])
  )("check %s structure", (type = "", files = [], templates = []) => {
    const targetPath = `${getRootFolder(type)}${path.sep}`;
    test.each(files.map(file => [file]))("check %s existed", async file => {
      assert.file(`${targetPath}${file}`);
    });
    test.each(templates.map(({ file, regexp }) => [file, regexp]))(
      "check %s contented mock values",
      async (file = "", regexp = []) => {
        regexp.forEach(rule => {
          assert.fileContent(`${targetPath}${file}`, rule);
        });
      }
    );
  });
});

afterAll(() => {
  mockGenerators.forEach(({ type }) => {
    deleteTemplate(type);
  });
});
