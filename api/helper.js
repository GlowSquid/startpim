const Session = require("../account/session");
const AccountTable = require("../account/table");
const { hash } = require("../account/helper");

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie("sessionString", sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "PROD"
  });
};

const setSession = ({ email, res, sessionId }) => {
  let session, sessionString;

  return new Promise((resolve, reject) => {
    if (sessionId) {
      sessionString = Session.sessionString({ email, id: sessionId });
      setSessionCookie({ sessionString, res });
      resolve({ message: "session restored" });
    } else {
      session = new Session({ email });
      sessionString = session.toString();

      AccountTable.updateSessionId({
        sessionId: session.id,
        emailHash: hash(email)
      })
        .then(() => {
          setSessionCookie({ sessionString, res });
          resolve({ message: "session created" });
        })
        .catch(error => reject(error));
    }
  });
};

const authenticatedAccount = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error("Invalid session");
      error.statusCode = 400;
      // return reject(error); // Please spam my logs
      // return reject(""); // Please eat my cpu
      // return reject; // Please cause instability
      return reject("🧙‍"); // Works!
    }

    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ emailHash: hash(email) })
      .then(({ account }) => {
        const authenticated = account.sessionId === id;

        resolve({ authenticated, account, email });
      })
      .catch(error => reject(error));
  });
};

module.exports = { setSession, authenticatedAccount };
