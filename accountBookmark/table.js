const pool = require("../dbPool");

class AccountBookmarkTable {
  static deleteAccountBookmark({ bookmarkId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM accountBookmark WHERE "bookmarkId" = $1 RETURNING "bookmarkId"`,
        [bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          const id = response.rows[0].bookmarkId;
          resolve({ id });
          // resolve();
        }
      );
    });
  }

  static storeAccountBookmark({ accountId, bookmarkId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO accountBookmark("accountId", "bookmarkId") VALUES($1, $2)',
        [accountId, bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static getAccountBookmarks({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "bookmarkId" FROM accountBookmark WHERE "accountId" = $1',
        [accountId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ accountBookmarks: response.rows });
        }
      );
    });
  }

  static getBookmarkAccount({ bookmarkId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "accountId" FROM accountBookmark WHERE "bookmarkId" = $1',
        [bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ accountId: response.rows.accountId });
        }
      );
    });
  }

  static updateBookmarkAccount({ bookmarkId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE accountBookmark SET "accountId" = $1 WHERE "bookmarkId" = $2',
        [accountId, bookmarkId],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  // Call when user deletes account
  static purgeAccountBookmark({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM accountBookmark WHERE "accountId" = $1`,
        [accountId],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

// AccountBookmarkTable.storeAccountBookmark({
//   accountId: 1,
//   bookmarkId: 1
// })
//   .then(() => console.log("Success"))
//   .catch(error => console.log(error));

module.exports = AccountBookmarkTable;
