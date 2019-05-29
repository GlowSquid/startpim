const { Router } = require("express");
const BookmarkTable = require("../bookmark/table");
// const AccountTable = require("../account/table");
const AccountBookmarkTable = require("../accountBookmark/table");
const { authenticatedAccount } = require("./helper");
// const bookmarkValidate = require("../validation/bookmark");
// const metafetch = require("metafetch");

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
      let icon;
      bookmark = { url, title, icon };

      // const findRoot = new URL(url);
      // const root = findRoot.protocol + "//" + findRoot.hostname;

      // const icon = `https://www.google.com/s2/favicons?domain=${url}`;

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
