CREATE TABLE bm(
  id              SERIAL PRIMARY KEY,
  title           CHARACTER(128),
  url             CHARACTER(255),
  icon            CHARACTER(36),
  folder          CHARACTER(36),
  description     CHARACTER(255),
  added           TIMESTAMP NOT NULL,
  updated         TIMESTAMP NOT NULL
);
