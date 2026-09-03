// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import DatabaseSync from "better-sqlite3";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const migrationPath = path.join(repoRoot, "src/lib/db/migrations/149_api_key_combo_access.sql");

test("combo-access migration preserves legacy allow-all rows and named allowlists", () => {
  const sql = fs.readFileSync(migrationPath, "utf8");
  const db = new DatabaseSync(":memory:");
  db.exec(`
    CREATE TABLE api_keys (
      id TEXT PRIMARY KEY,
      allowed_combos TEXT
    );

    INSERT INTO api_keys (id, allowed_combos) VALUES
      ('legacy-null', NULL),
      ('legacy-empty', '[]'),
      ('legacy-blank', ''),
      ('legacy-malformed', 'not-json'),
      ('named', '["fast-chat"]'),
      ('all', '["combo/*"]');
  `);

  db.exec(sql);
  db.exec(sql);

  const rows = db.prepare("SELECT id, allowed_combos FROM api_keys ORDER BY id").all() as Array<{
    id: string;
    allowed_combos: string;
  }>;
  const combosById = new Map(
    rows.map((row) => [row.id, JSON.parse(row.allowed_combos) as string[]])
  );

  assert.deepEqual(combosById.get("legacy-null"), ["combo/*"]);
  assert.deepEqual(combosById.get("legacy-empty"), ["combo/*"]);
  assert.deepEqual(combosById.get("legacy-blank"), ["combo/*"]);
  assert.deepEqual(combosById.get("legacy-malformed"), ["combo/*"]);
  assert.deepEqual(combosById.get("named"), ["fast-chat"]);
  assert.deepEqual(combosById.get("all"), ["combo/*"]);
});
