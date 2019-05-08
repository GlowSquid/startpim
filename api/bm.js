// id              SERIAL PRIMARY KEY,
// title           CHARACTER(128),
// url             CHARACTER(255),
// icon            CHARACTER(36),
// folder          CHARACTER(36),
// description     CHARACTER(255),
// added           TIMESTAMP NOT NULL,
// updated         TIMESTAMP NOT NULL

const { Router } = require("express");
// const { setSession, authenticatedAccount } = require("./helper");
const BmTable = require("../bm/table");

const router = new Router();

router.post("/add-bm", (req, res, next) => {
  const { title, url } = req.body;

  BmTable.getBm({ title })
    .then(({ bm }) => {
      if (!bm) {
        return BmTable.storeBm({ title, url });
      } else {
        const error = new Error("This bookmark is already stored");

        error.statusCode = 409;

        throw error;
      }
    })

    .then(() => res.json({ message: "Bookmark successfully added" }))
    .catch(error => next(error));
});

module.exports = router;
