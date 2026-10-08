const assert = require("node:assert/strict");
const fs = require("node:fs");
const { DatabaseSync } = require("node:sqlite");

const queries = JSON.parse(fs.readFileSync(0, "utf8"));
const db = new DatabaseSync(":memory:");
try {
  db.exec("CREATE VIRTUAL TABLE memory_fts USING fts5(content)");
  db.prepare("INSERT INTO memory_fts(content) VALUES (?)").run("word a é");
  const match = db.prepare(
    "SELECT rowid FROM memory_fts WHERE memory_fts MATCH ? ORDER BY rank LIMIT 100"
  );
  const counts = queries.map((query) => {
    assert.ok(query.length <= 4160);
    return match.all(query).length;
  });
  process.stdout.write(JSON.stringify(counts));
} finally {
  db.close();
}
