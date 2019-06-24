CREATE TABLE bookmark(
  id              SERIAL PRIMARY KEY,
  url             CHARACTER(255),
  title           CHARACTER(255),
  icon            CHARACTER(255),
  image           CHARACTER(255),
  folder          CHARACTER(36),
  added           TIMESTAMP,
  updated         TIMESTAMP
);
