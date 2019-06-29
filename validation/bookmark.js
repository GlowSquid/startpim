const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function bookmarkValidate(data) {
  let errors = {};

  // data.title = !isEmpty(data.title) ? data.title : "";
  data.url = !isEmpty(data.url) ? data.url : "";
  // data.icon = !isEmpty(data.icon) ? data.icon : "";
  // data.folder = !isEmpty(data.folder) ? data.folder : "";
  // data.color = !isEmpty(data.color) ? data.color : "";

  if (
    !Validator.isURL(data.url, {
      protocols: ["http", "https", "ftp"],
      require_protocol: true
    })
  ) {
    errors.url = "Enter a valid URL. Example:  https://example.com";
  }

  if (Validator.isEmpty(data.url)) {
    errors.url = "URL field can't be empty";
  }

  if (!Validator.isLength(data.url, { min: 11, max: 255 })) {
    errors.password = "URL is too long";
  }

  // if (Validator.isEmpty(data.title)) {
  //   errors.title = "Please add a title to your bookmark";
  // }

  // if (!Validator.isLength(data.title, { min: 1, max: 255 })) {
  //   errors.password = "Title is too long";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
