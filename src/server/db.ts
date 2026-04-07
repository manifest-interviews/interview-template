import { SQL } from "bun";

/**
 * SQLite database connection using Bun's built-in SQL client.
 * Use as a tagged template literal:
 * ```
 * await sql<Row[]>`SELECT * FROM ...`
 * ```
 * @see https://bun.com/docs/runtime/sql
 */
export const sql = new SQL("sqlite://data.db");

await sql`PRAGMA journal_mode = WAL`;
await sql`PRAGMA foreign_keys = ON`;

const schema = await Bun.file(import.meta.dir + "/schema.sql").text();
const seedFile = await Bun.file(import.meta.dir + "/seed.ts").text();

// Auto-recreate tables when schema or seed changes (for development convenience).
// Edit schema.sql or seed.ts and the server will drop and rebuild tables on restart.
const hash = new Bun.CryptoHasher("md5").update(schema).update(seedFile).digest("hex");

await sql`CREATE TABLE IF NOT EXISTS _meta (key TEXT PRIMARY KEY, value TEXT)`;
const [prev] = await sql`SELECT value FROM _meta WHERE key = 'schema_hash'`;

if (prev?.value !== hash) {
  // Drop all user tables and recreate
  const tables =
    await sql`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_meta' AND name NOT LIKE 'sqlite_%'`;
  for (const { name } of tables) {
    await sql.unsafe(`DROP TABLE IF EXISTS "${name}"`);
  }
  await sql.unsafe(schema);
  const { seed } = await import("./seed");
  await seed();
  await sql`INSERT OR REPLACE INTO _meta (key, value) VALUES ('schema_hash', ${hash})`;
  console.log("Schema changed — recreated and seeded database.");
}
