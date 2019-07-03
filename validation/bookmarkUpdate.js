const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function bookmarkUpdateValidate(data) {
  let errors;

  data.url = !isEmpty(data.url) ? data.url : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.url, { min: 11, max: 255 })) {
    errors = "Error: URL is too long. Max 255 characters";
  }

  if (
    !Validator.isURL(data.url, {
      protocols: ["http", "https", "ftp"],
      require_protocol: true
    })
  ) {
    errors = "Error: Invalid URL. Example:  https://example.com";
  }

  if (Validator.isEmpty(data.url)) {
    errors = "URL field can't be empty";
  }

  if (Validator.isEmpty(data.title)) {
    errors = "Please add a title to your bookmark";
  }

  if (!Validator.isLength(data.title, { min: 1, max: 255 })) {
    errors = "Error: Title is too long. Max 255 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
