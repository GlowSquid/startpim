const pool = require("../dbPool");

class AccountTable {
  static storeAccount({ emailHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account("emailHash", "passwordHash")
        VALUES($1, $2)`,
        [emailHash, passwordHash],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  // delete account
  static dropAccount({ emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        // `DELETE FROM account WHERE "emailHash" = $1`, // works
        `UPDATE account SET "emailHash" = NULL, "passwordHash" = NULL, "sessionId" = NULL
        WHERE "emailHash" = $1`,

        // `UPDATE "emailHash", "passwordHash", "sessionId" FROM account
        // WHERE "emailHash" = $1`,
        [emailHash],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  // Drop account
  // static updateSessionId({ sessionId, emailHash }) {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       'UPDATE account SET "sessionId" = NULL WHERE "emailHash" = $2',
  //       [sessionId, emailHash],
  //       (error, response) => {
  //         if (error) return reject(error);

  //         resolve();
  //       }
  //     );
  //   });
  // }

  static getAccount({ emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "passwordHash", "sessionId" FROM account
         WHERE "emailHash" = $1`,
        [emailHash],
        (error, response) => {
          if (error) return reject(error);

          resolve({ account: response.rows[0] });
        }
      );
    });
  }

  static updateSessionId({ sessionId, emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE account SET "sessionId" = $1 WHERE "emailHash" = $2',
        [sessionId, emailHash],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

module.exports = AccountTable;
