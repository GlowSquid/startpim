CREATE TABLE bookmark(
  id              SERIAL PRIMARY KEY,
  url             VARCHAR(255),
  title           VARCHAR(255),
  icon            VARCHAR(255),
  image           VARCHAR(255)
  -- folder          VARCHAR(36),
  -- added           TIMESTAMP,
  -- updated         TIMESTAMP
);
