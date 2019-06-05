const { Router } = require("express");
const BookmarkTable = require("../bookmark/table");
// const AccountTable = require("../account/table");
const AccountBookmarkTable = require("../accountBookmark/table");
const { authenticatedAccount } = require("./helper");
// const bookmarkValidate = require("../validation/bookmark");
// const BookmarkTitle = require("../bookmark/title");
const fs = require("fs");
const { exec } = require("child_process");

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
  const { url } = req.body;
  let titleFile = "api/bin/title.txt";
  let icon;
  let title = url;

  fs.writeFileSync(titleFile, "");
  exec(`api/bin/lynx.sh ${url}`, err => {
    if (err) {
      console.log(err);
    }
  });

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;
      console.log("Showing title: ", title);
      bookmark = { url, title, icon };
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
      console.log("bookmarkId is", bookmarkId);

      fs.watchFile(titleFile, function() {
        title = fs.readFileSync(titleFile, "utf8");
        console.log("url is", url);
        console.log("title is", title);
        fs.unwatchFile(titleFile);
        return BookmarkTable.storeTitle({ title, bookmarkId });
      });
      return AccountBookmarkTable.storeAccountBookmark({
        accountId,
        bookmarkId
      });
    })
    .then(() => {
      // res.json({ bm });
      res.json({ message: "Bookmark Added" });
      console.log("bookmark added", title);
    })
    .catch(error => next(error));
});

module.exports = router;
