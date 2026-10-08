import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15707-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/memory/store.ts");

test.after(() => {
  core.resetDbInstance?.();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const mk = (key: string, content: string) =>
  store.createMemory({
    apiKeyId: "k1",
    sessionId: "s1",
    type: "factual",
    key,
    content,
    metadata: {},
    expiresAt: null,
  } as Parameters<typeof store.createMemory>[0]);

test("#15707: a legacy NULL-memory_id row, once updated, must not leave orphan FTS docs or make later memories unsearchable", async () => {
  const db = core.getDbInstance();

  // Fresh-DB happy path: FTS auto-rowid coincides with memories.rowid.
  await mk("a", "alpha");
  await mk("b", "beta");

  // A row written by a release without the insert-time `memory_id = rowid` sync
  // (this is the state of 1,504 rows on the reporter's database).
  db.prepare(
    "INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at) " +
      "VALUES ('legacy','k1','s1','factual','L','legacy one','{}',datetime('now'),datetime('now'))"
  ).run();

  // Normal upsert traffic on that legacy key: UPDATE content fires memory_fts_au with
  // old.memory_id/new.memory_id = NULL (self-heal in store.ts runs only AFTER the update).
  for (let i = 0; i < 3; i++) await mk("L", `legacy revision ${i}`);

  // A brand-new memory created afterwards on the same DB.
  await mk("z", "zebrafish unique token");

  const memories = db.prepare("SELECT COUNT(*) c FROM memories").get().c;
  const nullIds = db.prepare("SELECT COUNT(*) c FROM memories WHERE memory_id IS NULL").get().c;
  const ftsDocs = db.prepare("SELECT COUNT(*) c FROM memory_fts_docsize").get().c;
  const zebraJoined = db
    .prepare(
      "SELECT COUNT(*) c FROM memories m JOIN memory_fts f ON m.memory_id = f.rowid " +
        "WHERE f.memory_fts MATCH 'zebrafish' AND m.key = 'z'"
    )
    .get().c;
  console.log("RESULT", JSON.stringify({ memories, nullIds, ftsDocs, zebraJoined }));

  assert.equal(nullIds, 0, "no NULL memory_id left");
  assert.equal(ftsDocs, memories, "memory_fts must hold exactly one doc per memory (no orphans)");
  assert.equal(zebraJoined, 1, "a freshly created memory must be reachable through the FTS join");
});
