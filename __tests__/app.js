"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const rimraf = require("rimraf");
const mockAnswers = require("../generators/app/mockAnswers");

const createGenerator = async type => {
  let gen = helpers.run(path.join(__dirname, "../generators/app"), {
    tmpdir: false
  });
  await gen.inDir(path.join(__dirname, "tmp"));
  gen.withPrompts(mockAnswers[type]);
};

describe("generator-bb-universal tests", () => {
  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp1"));
  });

  it("check widget structure", async () => {
    await createGenerator("widget");
    assert.file(["model.xml", "index.hbs", "readme.md"]);
  });
});
