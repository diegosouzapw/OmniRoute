import Database from "better-sqlite3";
import { runMigrations, getMigrationStatus } from "../../src/lib/db/migrationRunner.js";

const db = new Database("/tmp/test-migrations.sqlite");
db.exec(
  "CREATE TABLE _omniroute_migrations (version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now')))"
);

const fakeApplied = [
  "001",
  "002",
  "003",
  "004",
  "005",
  "006",
  "007",
  "008",
  "009",
  "010",
  "011",
  "012",
  "013",
  "014",
  "015",
  "016",
  "017",
  "018",
  "019",
  "020",
  "021",
];
for (const v of fakeApplied) {
  db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(v, "fake_" + v);
}
db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
  "026",
  "call_logs_cache_source"
);
db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
  "029",
  "provider_connection_max_concurrent"
);

console.log(
  "Status before:",
  getMigrationStatus(db).pending.map((p) => p.version)
);
try {
  runMigrations(db, { isNewDb: false });
} catch (e: any) {
  console.error("Error:", e.message);
}
console.log(
  "Status after:",
  getMigrationStatus(db).pending.map((p) => p.version)
);
