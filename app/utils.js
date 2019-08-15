const path = require("path");
const fs = require("fs");
module.exports = {
  isString: value => typeof value === "string" || value instanceof String,
  isObject: value =>
    value && typeof value === "object" && value.constructor === Object,
  getTemplates: () => {
    const templatesDir = path.join(__dirname, "templates");
    return fs.readdirSync(templatesDir);
  }
};
