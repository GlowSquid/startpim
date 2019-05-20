// id              SERIAL PRIMARY KEY,
// title           CHARACTER(128),
// url             CHARACTER(255),
// icon            CHARACTER(36),
// folder          CHARACTER(36),
// description     CHARACTER(255),
// added           TIMESTAMP NOT NULL,
// updated         TIMESTAMP NOT NULL

const pool = require("../dbPool");

class BookmarkTable {
  // saving bm
  static storeBookmark(bookmark) {
    const { url, title } = bookmark;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO bookmark(url, title)
        VALUES($1, $2) RETURNING id`,
        [url, title],
        (error, response) => {
          if (error) return reject(error);
          // resolve();
          const bookmarkId = response.rows[0].id;
          resolve({ bookmarkId });
          // resolve({ id: bookmarkId });
        }
      );
    });
  }

  // verify bm
  static getBookmark({ url }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, url, title FROM bookmark
        WHERE url = $1`,
        [url],
        (error, response) => {
          if (error) return reject(error);

          resolve({ bookmark: response.rows[0] });
        }
      );
    });
  }

  static readBookmark({ bookmarkId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT url, title, id FROM bookmark WHERE bookmark.id = $1",
        [bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0) {
            return reject(new Error("no bookmarks here"));
          }
          resolve(response.rows[0]);
        }
      );
    });
  }

  // delete bookmark
  static dropBookmark(id) {
    console.log("Table says ", id);
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE bookmark SET title = NULL, url = NULL
      WHERE "id" = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
  // update bm

  // delete bm
}

module.exports = BookmarkTable;
