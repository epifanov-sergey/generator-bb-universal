const path = require("path");

module.exports = {
  schema: {
    templates: [`backbase${path.sep}index.hbs`, `backbase${path.sep}model.xml`, `backbase${path.sep}readme.md`],
    staticFiles: [`backbase${path.sep}media`, `backbase${path.sep}scripts`, "index.jsx", "bootstrap.jsx"]
  }
};
