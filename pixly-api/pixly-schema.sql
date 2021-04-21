CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    location TEXT,
    camera TEXT,
    username VARCHAR(25) NOT NULL REFERENCES users ON DELETE CASCADE,
    isPrivate BOOLEAN NOT NULL DEFAULT false
)