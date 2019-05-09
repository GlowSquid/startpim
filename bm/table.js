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
  static storeBm({ url, title }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO bm(url, title)
        VALUES($1, $2)`,
        [url, title],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  // verify bm
  static getBm({ url }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, url, title FROM bm
        WHERE url = $1`,
        [url],
        (error, response) => {
          if (error) return reject(error);

          resolve({ bm: response.rows[0] });
        }
      );
    });
  }

  // read bm

  // update bm

  // delete bm
}

module.exports = BmTable;
