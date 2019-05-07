const { Pool } = require("pg");
const dbConfig = require("./config/dbConfig");

const pool = new Pool(dbConfig);

module.exports = pool;
