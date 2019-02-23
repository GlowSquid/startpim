const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be betweeen 2 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "username field can't be empty";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field can't be empty";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 512 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field can't be empty";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm your password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
