const pool = require("../dbPool");

class AccountBookmarkTable {
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

          resolve({ accountBookmark: response.rows });
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
        'UPDATE accountBM SET "accountId" = $1 WHERE "bookmarkId" = $2',
        [accountId, bookmarkId],
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
