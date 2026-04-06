import { Database } from "bun:sqlite";

const db = new Database("data.db");

db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA foreign_keys = ON");

const schema = await Bun.file(import.meta.dir + "/schema.sql").text();

// Auto-recreate tables when schema changes (for development convenience).
// Edit schema.sql and the server will drop and rebuild tables on restart.
const hash = new Bun.CryptoHasher("md5").update(schema).digest("hex");

db.run("CREATE TABLE IF NOT EXISTS _meta (key TEXT PRIMARY KEY, value TEXT)");
const prev = db.query("SELECT value FROM _meta WHERE key = 'schema_hash'").get() as { value: string } | null;

if (prev?.value !== hash) {
  // Drop all user tables and recreate
  const tables = db.query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_meta' AND name NOT LIKE 'sqlite_%'").all() as { name: string }[];
  for (const { name } of tables) {
    db.run(`DROP TABLE IF EXISTS "${name}"`);
  }
  db.run(schema);
  db.run("INSERT OR REPLACE INTO _meta (key, value) VALUES ('schema_hash', ?)", [hash]);
  console.log("Schema changed — recreated database tables.");
}

export default db;
