const pool = require("../dbPool");

class BookmarkTable {
  // saving bm
  static storeBookmark(bookmark) {
    const { url, title, icon } = bookmark;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO bookmark(url, title, icon)
        VALUES($1, $2, $3) RETURNING id`,
        [url, title, icon],
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

  static storeTitle(bookmark) {
    const { title, bookmarkId } = bookmark;
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE bookmark SET title = $1 WHERE bookmark.id = $2`,
        [title, bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          resolve();
          // const bookmarkId = response.rows[0].id;
          // resolve({ bookmarkId });
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

  // read & display bookmark
  static readBookmark({ bookmarkId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT url, title, icon, id FROM bookmark WHERE bookmark.id = $1",
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
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM bookmark WHERE "id" = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  // update bm
}

module.exports = BookmarkTable;
