const { Router } = require("express");
const BookmarkTable = require("../bookmark/table");
// const AccountTable = require("../account/table");
const AccountBookmarkTable = require("../accountBookmark/table");
const { authenticatedAccount } = require("./helper");
const bookmarkValidate = require("../validation/bookmark");
const bookmarkUpdateValidate = require("../validation/bookmarkUpdate");
const ogs = require("open-graph-scraper");
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

      const { errors, isValid } = bookmarkUpdateValidate(req.body);
      if (!isValid) {
        const error = new Error(errors);
        error.statusCode = 400;
        throw error;
      }

      return BookmarkTable.updateBookmark(bookmark);
    })
    .then(() => {
      res.json({ message: "Bookmark Updated" });
      // console.log("bookimarkee uptidated", title);
    })
    .catch(error => next(error));
});

router.post("/add-bookmark", (req, res, next) => {
  let accountId, bookmark;
  const { url } = req.body;
  let titleFile = "bin/title/title.txt";
  let icon = `https://www.google.com/s2/favicons?domain=${url}`;
  let image;
  const findRoot = new URL(url);
  let title = findRoot.hostname;

  const { errors, isValid } = bookmarkValidate(req.body);
  if (!isValid) {
    const error = new Error(errors);
    error.statusCode = 400;
    throw error;
  }

  function fetchTitle(bookmarkId) {
    fs.watchFile(titleFile, function() {
      title = fs.readFileSync(titleFile, "utf8");
      if (title.length <= 1) {
        const findRoot = new URL(url);
        title = findRoot.hostname;
        // fs.unwatchFile(titleFile);
      }
      fs.unwatchFile(titleFile);
      console.log("unwatching");
      return BookmarkTable.storeTitle({ title, bookmarkId });
    });
  }

  fs.writeFileSync(titleFile, "");
  exec(`bin/title/lynx.sh ${url}`, err => {
    if (err) {
      console.log(err);
    }
  });

  function fetchImage(bookmarkId) {
    const ogsOptions = { url: url, onlyGetOpenGraphInfo: true, timeout: 5000 };
    ogs(ogsOptions)
      .then(function(result) {
        // console.log("Result: ", result.data.ogImage.url);
        // console.log("More info: ", result.data);
        console.log("title lang     : ", result.data.ogTitle);
        console.log("ogSiteName:    ", result.data.ogSiteName);
        if (result.data.ogTitle) {
          title = result.data.ogTitle;
          console.log("title is ogTitle", title);
        } else if (result.data.ogSiteName) {
          title = result.data.ogSiteName;
          console.log("title is ogSiteName", title);
        } else {
          console.log("time to use lynx");
          // fetchTitle(bookmarkId);
        }
        image = result.data.ogImage.url;
        if (!image.startsWith("http" || "www")) {
          image = url + result.data.ogImage.url;
          // return BookmarkTable.storeImage({ image, title, bookmarkId });
        }
        return BookmarkTable.storeImage({ image, title, bookmarkId });
        // }
      })
      .catch(function(error) {
        // console.log("ogs error: ", error);
        const findRoot = new URL(url);
        if (findRoot.hostname.startsWith("www.")) {
          image = findRoot.hostname[4];
        } else {
          image = findRoot.hostname[0];
        }
        console.log("solution:", image);
        title = findRoot.hostname;
        fetchTitle(bookmarkId);
        return BookmarkTable.storeImage({ image, title, bookmarkId });
      });
  }

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;
      console.log("Showing title: ", title);
      bookmark = { url, title, icon };
      return BookmarkTable.storeBookmark(bookmark);
    })
    .then(({ bookmarkId }) => {
      bookmark.bookmarkId = bookmarkId;
      console.log("bookmarkId is", bookmarkId);
      // fetchTitle(bookmarkId);
      fetchImage(bookmarkId);
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
