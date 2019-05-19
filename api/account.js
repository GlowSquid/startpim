const { Router } = require("express");
const { hash } = require("../account/helper");
const Session = require("../account/session");
const { setSession, authenticatedAccount } = require("./helper");
const AccountTable = require("../account/table");
const AccountBookmarkTable = require("../accountBookmark/table");
const registerValidate = require("../validation/register");
const loginValidate = require("../validation/login");
const { readBookmark } = require("../bookmark/table");

const router = new Router();

router.post("/register", (req, res, next) => {
  const { email, password } = req.body;

  const emailHash = hash(email);
  const passwordHash = hash(password);

  AccountTable.getAccount({ emailHash })

    .then(({ account }) => {
      if (!account) {
        const { errors, isValid } = registerValidate(req.body);
        if (!isValid) {
          // const error = new Error(JSON.stringify(errors));
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
    .then(() => {
      // res.json({ message: error });
    })
    .catch(error => next(error));
});

// delete account
router.delete("/delete", (req, res, next) => {
  const { email, password } = req.body;
  const emailHash = hash(email);
  AccountTable.getAccount({ emailHash: hash(email) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        return AccountTable.dropAccount({ emailHash });
      } else {
        const error = new Error("Invalid account credentials");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      res.clearCookie("sessionString");
      res.json({ message: "Account deleted" });
    })
    .catch(error => next(error));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const { error, isValid } = loginValidate(req.body);

  if (!isValid) {
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

router.get("/authenticated", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ authenticated }) => {
      res.json({ authenticated });
    })
    .catch(error => next(error));
});

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

router.get("/info", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ email }) => {
      res.json({ info: { email } });
    })
    .catch(error => next(error));
});

module.exports = router;
