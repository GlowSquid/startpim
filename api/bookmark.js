// id              SERIAL PRIMARY KEY,
// url             CHARACTER(255),
// title           CHARACTER(128),
// icon            CHARACTER(36),
// folder          CHARACTER(36),
// description     CHARACTER(255),
// added           TIMESTAMP NOT NULL,
// updated         TIMESTAMP NOT NULL

const { Router } = require("express");
const BookmarkTable = require("../bookmark/table");
// const AccountTable = require("../account/table");
const AccountBookmarkTable = require("../accountBookmark/table");
const { authenticatedAccount } = require("./helper");
// const bookmarkValidate = require("../validation/bookmark");

const router = new Router();

// Delete Bookmark
router.delete("/drop-bookmark", (req, res, next) => {
  let { id } = req.body;
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ bookmarkId }) => {
      bookmarkId = id;
      return AccountBookmarkTable.deleteAccountBookmark({
        bookmarkId
      });
    })
    .then(({ id }) => {
      // console.log(id);
      return BookmarkTable.dropBookmark(id);
    })
    .then(() => {
      res.json({ message: "Bookmark Deleted" });
    })
    .catch(error => next(error));
});

router.post("/add-bookmark", (req, res, next) => {
  let accountId, bookmark;
  const { url, title } = req.body;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      bookmark = { url, title };
      // return BookmarkTable.getBookmark({ url, title});
      return BookmarkTable.storeBookmark(bookmark);
    })
    // .then(({ bookmark }) => {
    //   if (!bookmark) {
    //     return BookmarkTable.storeBookmark(bookmark);
    //   } else {
    //     const error = new Error("This URL is already stored");
    //     error.statusCode = 409;
    //     throw error;
    //   }
    // })
    .then(({ bookmarkId }) => {
      // console.log("bm: ", bm); // url & title
      // console.log("bm.id: ", bm.id); // undefined
      // console.log("bmId: ", bmId); // undefined
      // console.log("bm.bmId: ", bm.bmId); // undefined
      bookmark.bookmarkId = bookmarkId;

      return AccountBookmarkTable.storeAccountBookmark({
        accountId,
        bookmarkId
      });
    })
    .then(() => {
      // res.json({ bm });
      res.json({ message: "Bookmark Added" });
    })
    .catch(error => next(error));
});

module.exports = router;
