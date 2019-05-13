const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function registerValidate(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.email, { min: 6, max: 64 })) {
    errors.email = "Please enter a valid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Enter your email";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 64 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // if (!Validator.equals(data.password, data.password2)) {
  //   errors.password2 = "Passwords must match";
  // }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Make a secure password for your account";
  }

  // if (Validator.isEmpty(data.password2)) {
  //   errors.password2 = "Please confirm your password";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
