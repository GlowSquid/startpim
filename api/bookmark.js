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

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(() => {
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
        // console.log("title          :", result.data.ogTitle);
        // console.log("ogSiteName     :", result.data.ogSiteName);
        if (result.data.ogTitle) {
          title = result.data.ogTitle;
          console.log("title is ogTitle");
        } else if (result.data.ogSiteName) {
          title = result.data.ogSiteName;
          console.log("title is ogSiteName");
        } else {
          console.log("Using Lynx");
          fetchTitle(bookmarkId);
        }
        image = result.data.ogImage.url;
        if (!image.startsWith("http" || "www")) {
          const findRoot = new URL(url);
          image =
            findRoot.protocol +
            "//" +
            findRoot.hostname +
            "/" +
            result.data.ogImage.url;
          console.log("img is", image);
          // image = url + result.data.ogImage.url;
          // return BookmarkTable.storeImage({ image, title, bookmarkId });
        }

        return BookmarkTable.storeImage({ image, title, bookmarkId });
      })
      .catch(function(error) {
        const findRoot = new URL(url);
        if (findRoot.hostname.startsWith("www.")) {
          image = findRoot.hostname[4];
        } else {
          image = findRoot.hostname[0];
        }
        if (title) {
          console.log("has title");
        } else {
          title = findRoot.hostname;
        }
        // fetchTitle(bookmarkId);
        return BookmarkTable.storeImage({ image, title, bookmarkId });
      })
      .then(() => {
        res.json({ message: "Bookmark Added" });
        console.log("bookmark added", title);
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
      // console.log("bookmarkId is", bookmarkId);
      // fetchTitle(bookmarkId);
      fetchImage(bookmarkId);
      return AccountBookmarkTable.storeAccountBookmark({
        accountId,
        bookmarkId
      });
    })
    // .then(() => {
    //   // res.json({ bm });
    //   // res.json({ message: "Bookmark Added" });
    //   console.log("bookmark added", title);
    // })
    .catch(error => next(error));
});

module.exports = router;
