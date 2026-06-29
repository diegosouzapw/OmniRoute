/**
 * tests/unit/migration-107-quota-share-strategy.test.ts
 *
 * Migration 107 flips the routing strategy of the existing auto-minted qtSd/ combos
 * from the legacy "fill-first" to the dedicated "quota-share" engine (Fase 3 #9),
 * WITHOUT touching combos already on quota-share or any user-authored combo.
 *
 * The migration is applied in isolation against an in-memory DB seeded with a mix
 * of combos, so the assertions pin the exact WHERE scope (name LIKE 'qtSd/%' AND
 * strategy = 'fill-first') and prove the other JSON fields are preserved.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATION_107 = fs.readFileSync(
  path.join(__dirname, "../../src/lib/db/migrations/107_quota_combos_quota_share_strategy.sql"),
  "utf-8"
);

interface TestDb {
  exec: (sql: string) => unknown;
  prepare: (sql: string) => {
    run: (...p: unknown[]) => unknown;
    get: (...p: unknown[]) => Record<string, unknown> | undefined;
  };
  close: () => void;
}

function makeDb(): TestDb {
  const db = new Database(":memory:") as unknown as TestDb;
  db.exec(
    `CREATE TABLE combos (
       id TEXT PRIMARY KEY,
       name TEXT NOT NULL UNIQUE,
       data TEXT NOT NULL,
       created_at TEXT NOT NULL,
       updated_at TEXT NOT NULL
     );`
  );
  return db;
}

function insertCombo(db: TestDb, id: string, name: string, strategy: string): void {
  const data = JSON.stringify({
    name,
    strategy,
    models: [{ kind: "model", model: "p/m", weight: 100 }],
    isHidden: name.startsWith("qtSd/"),
  });
  db.prepare(
    "INSERT INTO combos (id, name, data, created_at, updated_at) VALUES (?, ?, ?, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z')"
  ).run(id, name, data);
}

function strategyOf(db: TestDb, name: string): string | null {
  const row = db
    .prepare("SELECT json_extract(data, '$.strategy') AS s FROM combos WHERE name = ?")
    .get(name);
  return (row?.s as string | undefined) ?? null;
}

function dataOf(db: TestDb, name: string): Record<string, unknown> {
  const row = db.prepare("SELECT data FROM combos WHERE name = ?").get(name);
  return JSON.parse(row!.data as string) as Record<string, unknown>;
}

test("107 flips stale qtSd/ fill-first combos to quota-share", () => {
  const db = makeDb();
  insertCombo(db, "c1", "qtSd/grp/deepseek/deepseek-v4-flash", "fill-first");
  insertCombo(db, "c2", "qtSd/grp/claude/claude-opus-4-8", "fill-first");

  db.exec(MIGRATION_107);

  assert.equal(strategyOf(db, "qtSd/grp/deepseek/deepseek-v4-flash"), "quota-share");
  assert.equal(strategyOf(db, "qtSd/grp/claude/claude-opus-4-8"), "quota-share");
  db.close();
});

test("107 preserves the other JSON fields (only strategy changes)", () => {
  const db = makeDb();
  insertCombo(db, "c1", "qtSd/grp/glm/glm-5", "fill-first");

  db.exec(MIGRATION_107);

  const data = dataOf(db, "qtSd/grp/glm/glm-5");
  assert.equal(data.strategy, "quota-share");
  assert.equal(data.isHidden, true, "isHidden must be preserved");
  assert.deepEqual(
    data.models,
    [{ kind: "model", model: "p/m", weight: 100 }],
    "models array must be preserved"
  );
  db.close();
});

test("107 leaves qtSd/ combos already on quota-share untouched", () => {
  const db = makeDb();
  insertCombo(db, "c1", "qtSd/grp/glm/glm-4.6", "quota-share");

  db.exec(MIGRATION_107);

  assert.equal(strategyOf(db, "qtSd/grp/glm/glm-4.6"), "quota-share");
  db.close();
});

test("107 never touches user-authored (non-qtSd/) combos", () => {
  const db = makeDb();
  insertCombo(db, "c1", "my-coding-combo", "fill-first");
  insertCombo(db, "c2", "team/fast", "fill-first");

  db.exec(MIGRATION_107);

  assert.equal(
    strategyOf(db, "my-coding-combo"),
    "fill-first",
    "a user's fill-first combo must be preserved"
  );
  assert.equal(strategyOf(db, "team/fast"), "fill-first");
  db.close();
});

test("107 is idempotent (second run is a no-op)", () => {
  const db = makeDb();
  insertCombo(db, "c1", "qtSd/grp/minimax/MiniMax-M2.7", "fill-first");

  db.exec(MIGRATION_107);
  const afterFirst = dataOf(db, "qtSd/grp/minimax/MiniMax-M2.7");
  db.exec(MIGRATION_107);
  const afterSecond = dataOf(db, "qtSd/grp/minimax/MiniMax-M2.7");

  assert.equal(strategyOf(db, "qtSd/grp/minimax/MiniMax-M2.7"), "quota-share");
  assert.deepEqual(afterFirst, afterSecond, "second run must not change the row");
  db.close();
});
