-- Edit this file to change the database schema.
--
-- The server will automatically drop and recreate all tables, then seed
-- on restart when this file (or seed.ts) changes.

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  price_cents INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
