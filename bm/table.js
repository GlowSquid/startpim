// id              SERIAL PRIMARY KEY,
// title           CHARACTER(128),
// url             CHARACTER(255),
// icon            CHARACTER(36),
// folder          CHARACTER(36),
// description     CHARACTER(255),
// added           TIMESTAMP NOT NULL,
// updated         TIMESTAMP NOT NULL

const pool = require("../dbPool");

class BmTable {
  // saving bm
  static storeBm({ title, url }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO bm(title, url)
        VALUES($1, $2)`,
        [title, url],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  // reading bm
  static getBm({ title }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, title, url FROM bm
        WHERE title = $1`,
        [title],
        (error, response) => {
          if (error) return reject(error);

          resolve({ bm: response.rows[0] });
        }
      );
    });
  }

  // update bm

  // delete bm
}

module.exports = BmTable;
