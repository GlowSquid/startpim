const SHA256 = require("crypto-js/sha256");
const { APP_SECRET } = require("../config");

const hash = string => {
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};

module.exports = { hash };
