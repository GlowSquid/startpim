const pool = require("../dbPool");

class BookmarkTable {
  // Saving Bookmark
  static storeBookmark(bookmark) {
    const { url, title, icon } = bookmark;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO bookmark(url, title, icon)
        VALUES($1, $2, $3) RETURNING id`,
        [url, title, icon],
        (error, response) => {
          if (error) return reject(error);
          const bookmarkId = response.rows[0].id;
          resolve({ bookmarkId });
          // resolve({ id: bookmarkId });
        }
      );
    });
  }

  // Update Bookmark
  static updateBookmark(bookmark) {
    const { url, title, id } = bookmark;
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE bookmark SET url = $1, title = $2 WHERE bookmark.id = $3`,
        [url, title, id],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  // Give Title to Existing Bookmark
  static storeTitle(bookmark) {
    const { title, bookmarkId } = bookmark;
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE bookmark SET title = $1 WHERE bookmark.id = $2`,
        [title, bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  // Attach ogImage to Bookmark
  static storeImage(bookmark) {
    const { image, title, bookmarkId } = bookmark;
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE bookmark SET image = $1, title = $2 WHERE bookmark.id = $3`,
        [image, title, bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  // Verify Bookmark
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

  // Read & Display Bookmark
  static readBookmark({ bookmarkId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT url, title, icon, image, id FROM bookmark WHERE bookmark.id = $1",
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

  // Delete Bookmark
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
}

module.exports = BookmarkTable;
