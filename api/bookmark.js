const { Router } = require("express");
const BookmarkTable = require("../bookmark/table");
// const AccountTable = require("../account/table");
const AccountBookmarkTable = require("../accountBookmark/table");
const { authenticatedAccount } = require("./helper");
// const bookmarkValidate = require("../validation/bookmark");
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

router.put("/update-bookmark", (req, res, next) => {
  let bookmark;
  const { url, title, id } = req.body;
  console.log("Need the ID: ", id);

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(() => {
      console.log("New title: ", title);
      console.log("New URL: ", url);
      console.log("Same ID: ", id);
      bookmark = { url, title, id };
      return BookmarkTable.updateBookmark(bookmark);
    })
    .then(() => {
      res.json({ message: "Bookmark Updated" });
      console.log("bookimarkee uptidated", title);
    })
    .catch(error => next(error));
});

router.post("/add-bookmark", (req, res, next) => {
  let accountId, bookmark;
  const { url } = req.body;
  let titleFile = "bin/title/title.txt";
  let icon;
  const findRoot = new URL(url);
  let title = findRoot.hostname;

  // const dota = extractor.lazy(url);

  // async function fetchIcon() {
  //   console.log("fetching icon");
  //   icon = await dota.favicon(url, function() {
  //     console.log("icon is ", icon);
  //   });
  //   return icon;
  // }

  function fetchTitle(bookmarkId) {
    fs.watchFile(titleFile, function() {
      title = fs.readFileSync(titleFile, "utf8");
      fs.unwatchFile(titleFile);
      console.log("unwatching");
      if (title.length <= 1) {
        const findRoot = new URL(url);
        title = findRoot.hostname;
        fs.unwatchFile(titleFile);
      }
      return BookmarkTable.storeTitle({ title, bookmarkId });
    });
  }

  fs.writeFileSync(titleFile, "");
  exec(`bin/title/lynx.sh ${url}`, err => {
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
      bookmark.bookmarkId = bookmarkId;
      console.log("bookmarkId is", bookmarkId);

      fetchTitle(bookmarkId);
      // fetchIcon();
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
