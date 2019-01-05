const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookmarksInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.icon = !isEmpty(data.icon) ? data.icon : '';
  data.tag = !isEmpty(data.tag) ? data.tag : '';
  data.color = !isEmpty(data.color) ? data.color : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isURL(data.url)) {
    errors.url = 'Enter a valid URL';
  }

  if (Validator.isEmpty(data.url)) {
    errors.url = "URL field can't be empty";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Please add a title to your bookmark';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
