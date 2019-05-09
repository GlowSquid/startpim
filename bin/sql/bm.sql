CREATE TABLE bm(
  id              SERIAL PRIMARY KEY,
  url             CHARACTER(255),
  title           CHARACTER(128),
  icon            CHARACTER(36),
  folder          CHARACTER(36),
  description     CHARACTER(255)
  -- added           TIMESTAMP NOT NULL,
  -- updated         TIMESTAMP NOT NULL
);
