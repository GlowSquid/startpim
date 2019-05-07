const { Router } = require("express");
const { hash } = require("../account/helper");
const Session = require("../account/session");
const { setSession, authenticatedAccount } = require("./helper");
const AccountTable = require("../account/table");

const router = new Router();

router.post("/register", (req, res, next) => {
  const { email, password } = req.body;

  const emailHash = hash(email);
  const passwordHash = hash(password);

  AccountTable.getAccount({ emailHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ emailHash, passwordHash });
      } else {
        const error = new Error("This email has already been taken");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ email, res });
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

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
      // removeSession({ res });
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

router.get("/info", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account, email }) => {
      res.json({ info: { email } });
    })
    .catch(error => next(error));
});

module.exports = router;
