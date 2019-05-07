CREATE TABLE accountBM(
  "accountId"   INTEGER REFERENCES account(id),
  "bmId"  INTEGER REFERENCES bm(id),
  PRIMARY KEY ("accountId", "bmId")
)