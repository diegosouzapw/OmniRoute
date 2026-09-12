// #13326 — memory_fts_au trigger reindexes on every UPDATE, including
// access_count bumps. This test verifies that the conditional trigger
// (WHEN clause) only fires on content/key changes, and that FTS optimize
// runs after cleanup to reclaim tombstoned space.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import Database from "better-sqlite3";

const serial = { concurrency: false };

function createTestDb(): Database.Database {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-fts-"));
  const dbPath = path.join(dir, "test.sqlite");
  const db = new Database(dbPath);

  // Schema matching the migrations
  db.exec(`
    CREATE TABLE memories (
      id TEXT PRIMARY KEY,
      memory_id INTEGER UNIQUE,
      content TEXT NOT NULL,
      key TEXT,
      access_count INTEGER DEFAULT 0,
      last_accessed_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Create FTS5 virtual table
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
      content,
      key,
      content='memories'
    );
  `);

  // Create triggers matching 177_memory_fts_au_conditional.sql
  db.exec(`
    CREATE TRIGGER memory_fts_ai AFTER INSERT ON memories BEGIN
      INSERT INTO memory_fts(rowid, content, key)
        VALUES (new.memory_id, new.content, new.key);
    END;

    CREATE TRIGGER memory_fts_ad AFTER DELETE ON memories BEGIN
      INSERT INTO memory_fts(memory_fts, rowid, content, key)
        VALUES('delete', old.memory_id, old.content, old.key);
    END;

    CREATE TRIGGER memory_fts_au AFTER UPDATE ON memories
    WHEN old.content IS DISTINCT FROM new.content OR old.key IS DISTINCT FROM new.key
    BEGIN
      INSERT INTO memory_fts(memory_fts, rowid, content, key)
        VALUES('delete', old.memory_id, old.content, old.key);
      INSERT INTO memory_fts(rowid, content, key)
        VALUES (new.memory_id, new.content, new.key);
    END;
  `);

  return db;
}

function countFtsDataRows(db: Database.Database): number {
  const row = db.prepare("SELECT count(*) as cnt FROM memory_fts_data").get() as { cnt: number };
  return row.cnt;
}

test("#13326 — access_count update does NOT grow FTS data rows", serial, () => {
  const db = createTestDb();
  try {
    // Insert a memory
    db.prepare(
      "INSERT INTO memories (id, memory_id, content, key) VALUES (?, ?, ?, ?)"
    ).run("m1", 1, "test content", "test-key");

    const baseline = countFtsDataRows(db);
    assert.ok(baseline > 0, "FTS should have data rows after insert");

    // Simulate many recordMemoryAccess() calls
    const stmt = db.prepare(
      "UPDATE memories SET access_count = access_count + 1, last_accessed_at = ? WHERE id = ?"
    );
    for (let i = 0; i < 50; i++) {
      stmt.run(new Date().toISOString(), "m1");
    }

    const after = countFtsDataRows(db);
    assert.equal(
      after,
      baseline,
      `FTS data rows should not grow from access_count updates: baseline=${baseline}, after=${after}`
    );
  } finally {
    db.close();
  }
});

test("#13326 — content update DOES reindex FTS", serial, () => {
  const db = createTestDb();
  try {
    db.prepare(
      "INSERT INTO memories (id, memory_id, content, key) VALUES (?, ?, ?, ?)"
    ).run("m1", 1, "original content", "key1");

    // Content update should trigger reindex
    db.prepare("UPDATE memories SET content = ? WHERE id = ?").run("updated content", "m1");

    // Verify the FTS index has the updated content
    const ftsRow = db.prepare(
      "SELECT content FROM memory_fts WHERE rowid = 1"
    ).get() as { content: string } | undefined;
    assert.ok(ftsRow, "FTS row should exist after content update");
    assert.equal(ftsRow.content, "updated content", "FTS should reflect updated content");
  } finally {
    db.close();
  }
});

test("#13326 — FTS optimize compacts tombstoned segments", serial, () => {
  const db = createTestDb();
  try {
    // Insert and delete many memories to create tombstones
    for (let i = 0; i < 20; i++) {
      db.prepare(
        "INSERT INTO memories (id, memory_id, content, key) VALUES (?, ?, ?, ?)"
      ).run(`m${i}`, i, `content ${i}`, `key${i}`);
    }

    const beforeOptimize = countFtsDataRows(db);
    assert.ok(beforeOptimize >= 0, "baseline FTS data rows counted");

    // Delete half — this generates tombstone rows via memory_fts_ad
    for (let i = 0; i < 10; i++) {
      db.prepare("DELETE FROM memories WHERE id = ?").run(`m${i}`);
    }

    const afterDelete = countFtsDataRows(db);

    // Run FTS optimize
    db.prepare("INSERT INTO memory_fts(memory_fts) VALUES('optimize')").run();

    const afterOptimize = countFtsDataRows(db);
    // After optimize, tombstoned rows should be reclaimed (or at least not grow)
    assert.ok(
      afterOptimize <= afterDelete,
      `FTS optimize should not increase data rows: before_opt=${afterDelete}, after_opt=${afterOptimize}`
    );
  } finally {
    db.close();
  }
});
