module.exports = {
  isString: value => typeof value === "string" || value instanceof String,
  isObject: value =>
    value && typeof value === "object" && value.constructor === Object
};
