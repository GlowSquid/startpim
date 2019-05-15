const pool = require("../dbPool");

class AccountBMTable {
  static storeAccountBM({ accountId, bmId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO accountBM("accountId", "bmId") VALUES($1, $2)',
        [accountId, bmId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  static getAccountBM({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "bmId" FROM accountBM WHERE "accountId" = $1',
        [accountId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountBM: response.rows });
        }
      );
    });
  }

  static getBMAccount({ bmId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "accountId" FROM accountBM WHERE "bmId" = $1',
        [bmId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountId: response.rows.accountId });
        }
      );
    });
  }

  static updateBMAccount({ bmId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE accountBM SET "accountId" = $1 WHERE "bmId" = $2',
        [accountId, bmId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

// AccountBMTable.storeAccountBM({
//   accountId: 1,
//   bmId: 1
// })
//   .then(() => console.log("Success"))
//   .catch(error => console.log(error));

module.exports = AccountBMTable;
