const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStartInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.folders = !isEmpty(data.folders) ? data.folders : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
