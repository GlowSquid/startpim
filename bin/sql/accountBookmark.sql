CREATE TABLE accountBookmark(
  "accountId"   INTEGER REFERENCES account(id),
  "bookmarkId"  INTEGER REFERENCES bookmark(id),
  PRIMARY KEY ("accountId", "bookmarkId")
)