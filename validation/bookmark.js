const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function bookmarkValidate(data) {
  let error = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.url = !isEmpty(data.url) ? data.url : "";
  // data.icon = !isEmpty(data.icon) ? data.icon : "";
  // data.folder = !isEmpty(data.folder) ? data.folder : "";
  // data.color = !isEmpty(data.color) ? data.color : "";
  // data.description = !isEmpty(data.description) ? data.description : "";

  if (
    !Validator.isURL(data.url, {
      protocols: ["http", "https", "ftp"],
      require_protocol: true
    })
  ) {
    error.url = "Enter a valid URL. Example:  https://example.com";
  }

  if (Validator.isEmpty(data.url)) {
    error.url = "URL field can't be empty";
  }

  if (Validator.isEmpty(data.title)) {
    error.title = "Please add a title to your bookmark";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
