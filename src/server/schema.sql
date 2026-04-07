-- Edit this file to change the database schema.
--
-- The server will automatically drop and recreate all tables, then seed
-- on restart when this file (or seed.ts) changes.

CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
