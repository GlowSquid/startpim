// id              SERIAL PRIMARY KEY,
// url             CHARACTER(255),
// title           CHARACTER(128),
// icon            CHARACTER(36),
// folder          CHARACTER(36),
// description     CHARACTER(255),
// added           TIMESTAMP NOT NULL,
// updated         TIMESTAMP NOT NULL

const { Router } = require("express");
// const { setSession, authenticatedAccount } = require("./helper");
const BmTable = require("../bm/table");
const bmValidate = require("../validation/bm");

const router = new Router();

router.post("/add-bm", (req, res, next) => {
  const { url, title } = req.body;
  const { error, isValid } = bmValidate(req.body);

  if (!isValid) {
    error.statusCode = 400;
    throw error;
  }

  BmTable.getBm({ url })
    .then(({ bm }) => {
      if (!bm) {
        return BmTable.storeBm({ url, title });
      } else {
        const error = new Error("This URL is already stored");

        error.statusCode = 409;

        throw error;
      }
    })

    .then(() => res.json({ message: "Bookmark successfully added" }))
    .catch(error => next(error));
});

module.exports = router;
