// Edit this file to change the seed data.
//
// The server will automatically drop and recreate all tables, then seed
// on restart when this file (or schema.sql) changes.

import { sql } from "./db";

export async function seed() {
  await sql`INSERT INTO notes (title, content) VALUES
    ('Welcome', 'This is a sample note to get you started.'),
    ('Markdown support?', 'It would be cool to render **bold** and *italic* text.')`;
}
