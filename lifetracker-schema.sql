
/* Creating a table for users using sql lang*/
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()

);

/* Creating a nutrition table */
CREATE TABLE nutrition (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    image_url   VARCHAR(200) NOT NULL,
    user_id     INTEGER NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
)