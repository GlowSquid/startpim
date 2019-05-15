// id              SERIAL PRIMARY KEY,
// url             CHARACTER(255),
// title           CHARACTER(128),
// icon            CHARACTER(36),
// folder          CHARACTER(36),
// description     CHARACTER(255),
// added           TIMESTAMP NOT NULL,
// updated         TIMESTAMP NOT NULL

const { Router } = require("express");
const BmTable = require("../bm/table");
const AccountTable = require("../account/table");
const AccountBMTable = require("../accountBM/table");
const { authenticatedAccount } = require("./helper");
// const bmValidate = require("../validation/bm");

const router = new Router();

router.post("/add-bm", (req, res, next) => {
  let accountId, bm;
  const { url, title } = req.body;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      bm = { url, title };
      // return BmTable.getBm({ url, title});
      return BmTable.storeBm(bm);
    })
    // .then(({ bm }) => {
    //   if (!bm) {
    //     return BmTable.storeBm(bm);
    //   } else {
    //     const error = new Error("This URL is already stored");
    //     error.statusCode = 409;
    //     throw error;
    //   }
    // })
    .then(({ bmId }) => {
      // console.log("bm: ", bm); // url & title
      // console.log("bm.id: ", bm.id); // undefined
      // console.log("bmId: ", bmId); // undefined
      // console.log("bm.bmId: ", bm.bmId); // undefined
      bm.bmId = bmId;

      return AccountBMTable.storeAccountBM({ accountId, bmId });
    })
    .then(() => {
      // res.json({ bm });
      res.json({ message: "Bookmark Added" });
    })
    .catch(error => next(error));
});

module.exports = router;
