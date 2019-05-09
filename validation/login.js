const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function loginValidate(data) {
  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    error.email = "Enter a valid email";
  }

  if (Validator.isEmpty(data.email)) {
    error.email = "Enter your email";
  }

  if (Validator.isEmpty(data.password)) {
    error.password = "Enter your password";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
