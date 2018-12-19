const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Enter a valid email';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field can't be empty";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field can't be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
