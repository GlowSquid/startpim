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

function showMe() {
  let titleFile = "api/bin/title.txt";
  fs.readFile(titleFile, function(err, buf) {
    console.log("Finished Title:", buf.toString());
    return buf.toString();
  });
}

function getTitle(url) {
  console.log("Getting title of:", url);
  let titleFile = "api/bin/title.txt";
  try {
    if (fs.existsSync(titleFile)) {
      fs.truncate(titleFile, 0, function() {
        console.log("File Deleted");
      });
    }
  } catch (err) {
    console.log(err);
  }
  exec(`api/bin/lynx.sh ${url}`, err => {
    if (err) {
      console.log(err);
    }
    console.log("Title Added");
    showMe();
  });
}

router.post("/add-bookmark", (req, res, next) => {
  let accountId, bookmark;
  const { url, title } = req.body;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(() => {
      // fs.truncate("api/bin/title.txt", 0, function() {
      //   console.log("File Deleted");
      // });
      return getTitle(url);

      // fs.readFile("api/bin/title.txt", function(err, buf) {
      //   console.log("Finished Title:", buf.toString());
      // });
    })
    .then(({ account }) => {
      accountId = account.id;

      let icon;
      console.log("the url is still", url);

      // const findRoot = new URL(url);
      // const root = findRoot.protocol + "//" + findRoot.hostname;
      // const icon = `https://www.google.com/s2/favicons?domain=${url}`;

      // return BookmarkTable.getBookmark({ url, title});
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
