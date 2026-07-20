import Database from "better-sqlite3";
const db = new Database(":memory:");

db.exec(`
  CREATE TABLE provider_connections (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    priority INTEGER DEFAULT 0,
    updated_at TEXT NOT NULL
  )
`);

const insert = db.prepare("INSERT INTO provider_connections (id, provider, priority, updated_at) VALUES (?, ?, ?, ?)");
for (let i = 5; i >= 1; i--) {
  const now = new Date().toISOString();
  insert.run(`conn-${i}`, "openai", i, now);
}

// Test: exact adapter-level chain
const sql = "SELECT * FROM provider_connections WHERE provider = @provider ORDER BY priority ASC, updated_at DESC LIMIT @limit OFFSET @offset";
const params = { provider: "openai", limit: 2, offset: 2 };

// Native path
let rows = db.prepare(sql).all(params);
console.log("native:", rows.length, rows.map(r => r.id));

// Adapter path (rest spread)
const adapter = {
  prepare(s) {
    const stmt = db.prepare(s);
    return { all: (...a) => stmt.all(...a) };
  }
};
rows = adapter.prepare(sql).all(params);
console.log("adapter:", rows.length, rows.map(r => r.id));

// No pagination
rows = db.prepare(sql.replace("LIMIT @limit OFFSET @offset", "")).all(params);
console.log("no-limit:", rows.length, rows.map(r => r.id));

db.close();
