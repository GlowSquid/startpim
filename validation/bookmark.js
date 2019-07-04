const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function bookmarkValidate(data) {
  let errors;

  data.url = !isEmpty(data.url) ? data.url : "";

  if (
    !Validator.isURL(data.url, {
      protocols: ["http", "https", "ftp"],
      require_protocol: true
    })
  ) {
    errors = "Enter a valid URL. Example:  https://example.com";
  }

  if (Validator.isEmpty(data.url)) {
    errors = "URL field can't be empty";
  }

  if (!Validator.isLength(data.url, { min: 11, max: 255 })) {
    errors = "Error: URL is too long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
