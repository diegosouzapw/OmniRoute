import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15707m-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance?.();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("#15707: migration 203 backfills NULL memory_id, drops orphan FTS docs and keeps search consistent", () => {
  const db = core.getDbInstance();

  // Recreate the legacy broken state: no triggers, NULL ids, stale/orphan FTS docs.
  for (const t of ["ai", "ai_assign", "au", "ad"])
    db.exec(`DROP TRIGGER IF EXISTS memory_fts_${t}`);
  const ins = db.prepare(
    "INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, memory_id) " +
      "VALUES (?, 'k', 's', 'factual', ?, ?, '{}', datetime('now'), datetime('now'), ?)"
  );
  ins.run("m1", "k1", "alpha", 1);
  ins.run("m2", "k2", "beta", null);
  ins.run("m3", "k3", "gamma unicorn", null);
  db.exec(
    "INSERT INTO memory_fts(rowid, content, key) VALUES (900, 'ghost', 'g'), (901, 'ghost2', 'g2')"
  );

  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/203_memory_fts_content_rowid.sql"),
    "utf8"
  );
  db.exec(sql);
  db.exec(sql); // idempotent

  const nullIds = db.prepare("SELECT COUNT(*) c FROM memories WHERE memory_id IS NULL").get().c;
  const memories = db.prepare("SELECT COUNT(*) c FROM memories").get().c;
  const docs = db.prepare("SELECT COUNT(*) c FROM memory_fts_docsize").get().c;
  assert.equal(nullIds, 0);
  assert.equal(docs, memories);
  assert.doesNotThrow(() =>
    db.exec("INSERT INTO memory_fts(memory_fts) VALUES('integrity-check')")
  );

  const hit = (term: string) =>
    db
      .prepare(
        "SELECT m.id FROM memories m JOIN memory_fts f ON m.memory_id = f.rowid WHERE memory_fts MATCH ?"
      )
      .all(term)
      .map((r: { id: string }) => r.id);
  assert.deepEqual(hit("unicorn"), ["m3"]);
  assert.deepEqual(hit("ghost"), []);

  // Post-migration inserts get an id, are indexed once, and updates/deletes stay consistent.
  ins.run("m4", "k4", "zebrafish", null);
  assert.deepEqual(hit("zebrafish"), ["m4"]);
  db.prepare("UPDATE memories SET content = 'okapi' WHERE id = 'm4'").run();
  assert.deepEqual(hit("zebrafish"), []);
  assert.deepEqual(hit("okapi"), ["m4"]);
  db.prepare("DELETE FROM memories WHERE id = 'm4'").run();
  assert.deepEqual(hit("okapi"), []);
  assert.equal(
    db.prepare("SELECT COUNT(*) c FROM memory_fts_docsize").get().c,
    db.prepare("SELECT COUNT(*) c FROM memories").get().c
  );
});
