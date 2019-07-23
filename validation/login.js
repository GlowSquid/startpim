const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function loginValidate(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Enter your email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Enter your password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
