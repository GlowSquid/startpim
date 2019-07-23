const { Router } = require("express");
const { hash } = require("../account/helper");
const Session = require("../account/session");
const { setSession, authenticatedAccount } = require("./helper");
const AccountTable = require("../account/table");
const AccountBookmarkTable = require("../accountBookmark/table");
// const BookmarkTable = require("../bookmark/table");
const registerValidate = require("../validation/register");
const loginValidate = require("../validation/login");
const { readBookmark } = require("../bookmark/table");

const router = new Router();

// Register Account
router.post("/register", (req, res, next) => {
  const { email, password } = req.body;

  const emailHash = hash(email);
  const passwordHash = hash(password);

  AccountTable.getAccount({ emailHash })

    .then(({ account }) => {
      if (!account) {
        const { errors, isValid } = registerValidate(req.body);
        if (!isValid) {
          let error = new Error(errors);
          error.statusCode = 400;
          throw error;
        }
        return AccountTable.storeAccount({ emailHash, passwordHash });
      } else {
        const err = new Error("This email has already been taken");
        err.statusCode = 409;
        throw err;
      }
    })
    .then(() => {
      return setSession({ email, res });
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

// Delete Account
router.delete("/delete", (req, res, next) => {
  const { email, password } = req.body;
  const emailHash = hash(email);

  AccountTable.getAccount({ emailHash: hash(email) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        return AccountBookmarkTable.purgeAccountBookmark({
          accountId: account.id
        });
      } else {
        const error = new Error("Invalid account credentials");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      return AccountTable.dropAccount({ emailHash });
    })
    .then(() => {
      res.clearCookie("sessionString");
      res.json({ message: "Account deleted" });
    })
    .catch(error => next(error));
});

// Login Account
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const { errors, isValid } = loginValidate(req.body);

  if (!isValid) {
    let error = new Error(errors);
    error.statusCode = 400;
    throw error;
  }

  AccountTable.getAccount({ emailHash: hash(email) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;

        return setSession({ email, res, sessionId });
      } else {
        const error = new Error("Incorrect email or password");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

// Log Out from Account
router.get("/logout", (req, res, next) => {
  const { email } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    sessionId: null,
    emailHash: hash(email)
  })
    .then(() => {
      res.clearCookie("sessionString");
      res.json({ message: "Logout Success" });
    })
    .catch(error => next(error));
});

// Check if Logged In
router.get("/authenticated", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ authenticated }) => {
      res.json({ authenticated });
    })
    .catch(error => next(error));
});

// Show Bookmarks of Account
router.get("/bookmarks", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      return AccountBookmarkTable.getAccountBookmarks({
        accountId: account.id
      });
    })
    .then(({ accountBookmarks }) => {
      return Promise.all(
        accountBookmarks.map(accountBookmark => {
          return readBookmark({
            bookmarkId: accountBookmark.bookmarkId
          });
        })
      );
    })
    .then(bookmarks => {
      res.json({ bookmarks });
    })
    .catch(error => next(error));
});

// Show Email of Authenticated Account
router.get("/info", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ email }) => {
      res.json({ info: { email } });
    })
    .catch(error => next(error));
});

// Public Stats
router.get("/stats", (req, res, next) => {
  AccountTable.getStats()
    .then(({ acc, bms }) => {
      res.json({ numAccounts: acc, numBookmarks: bms });
    })
    .catch(error => next(error));
});

module.exports = router;
