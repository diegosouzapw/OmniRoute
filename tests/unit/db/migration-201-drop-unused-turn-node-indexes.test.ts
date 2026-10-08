// Conversation turn nodes carry two indexes no query reads: lookups filter
// on conversation_id and retention sweeps on last_seen_at, while anchor
// search runs in memory after a bulk load. Migration 201 drops them.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-201-"));
for (const file of [
  "155_agentic_conversations.sql",
  "156_conversation_turn_nodes.sql",
  "186_conversation_turn_nodes_last_seen_index.sql",
  "201_drop_unused_turn_node_indexes.sql",
]) {
  fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
}
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

function openDb(): SqliteAdapter {
  return openMemorySqliteAdapter();
}

function indexes(db: SqliteAdapter): string[] {
  return (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'conversation_turn_nodes'"
      )
      .all() as Array<{ name: string }>
  ).map((row) => row.name);
}

function seed(db: SqliteAdapter): void {
  const insert = db.prepare(
    "INSERT INTO conversation_turn_nodes (id, conversation_id, parent_id, role, content_hash, last_correlation_id, first_seen_at, last_seen_at) VALUES (?, ?, ?, 'user', ?, NULL, '2026-01-01', ?)"
  );
  // Seed enough rows that the planner prefers an index over a scan: half
  // older than the cutoff (would be swept), half newer.
  for (let i = 0; i < 500; i++) {
    const day = String((i % 28) + 1).padStart(2, "0");
    const seenAt = i < 250 ? `2026-05-${day}` : `2026-09-${day}`;
    insert.run(`n${i}`, `c${i % 10}`, i === 0 ? null : `n${i - 1}`, `hash${i}`, seenAt);
  }
  db.prepare(
    "INSERT INTO agentic_conversations (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at) VALUES ('c0', NULL, 'fp', 0, '', 5, '2026-01-01', '2026-09-01')"
  ).run();
}

function planDetails(db: SqliteAdapter, sql: string, ...params: unknown[]): string[] {
  return (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...params) as Array<{ detail: string }>).map(
    (row) => row.detail
  );
}

const CUTOFF = "2026-06-01";

test("migration 201 drops the two unread indexes and keeps the used ones", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 4);
    const names = indexes(db);
    assert.ok(!names.includes("idx_turn_nodes_parent"), `parent index still present: ${names}`);
    assert.ok(
      !names.includes("idx_turn_nodes_content_hash"),
      `content_hash index still present: ${names}`
    );
    assert.ok(names.includes("idx_turn_nodes_conversation"));
    assert.ok(names.includes("idx_turn_nodes_last_seen"));
  } finally {
    db.close();
  }
});

test("a second run is a no-op", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 4);
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
    assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
      { version: "155", name: "agentic_conversations" },
      { version: "156", name: "conversation_turn_nodes" },
      { version: "186", name: "conversation_turn_nodes_last_seen_index" },
      { version: "201", name: "drop_unused_turn_node_indexes" },
    ]);
  } finally {
    db.close();
  }
});

test("every query on the table still takes an index (no full scan)", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 4);
    seed(db);
    const cases: Array<{ sql: string; params: unknown[]; index: string }> = [
      {
        sql: "SELECT id, parent_id, content_hash FROM conversation_turn_nodes WHERE conversation_id = ?",
        params: ["c0"],
        index: "idx_turn_nodes_conversation",
      },
      {
        sql: "SELECT rowid as seq, * FROM conversation_turn_nodes WHERE conversation_id = ? AND rowid > ? ORDER BY rowid ASC",
        params: ["c0", 10],
        index: "idx_turn_nodes_conversation",
      },
      {
        sql: "SELECT rowid as seq, * FROM conversation_turn_nodes WHERE conversation_id = ? AND rowid < ? ORDER BY rowid DESC LIMIT 21",
        params: ["c0", 400],
        index: "idx_turn_nodes_conversation",
      },
      {
        sql: "SELECT rowid as seq, * FROM conversation_turn_nodes WHERE conversation_id = ? ORDER BY rowid DESC LIMIT 21",
        params: ["c0"],
        index: "idx_turn_nodes_conversation",
      },
      {
        sql: "SELECT COUNT(*) as c FROM agentic_conversations ac WHERE (SELECT COUNT(*) FROM conversation_turn_nodes n WHERE n.conversation_id = ac.id) >= 2",
        params: [],
        index: "idx_turn_nodes_conversation",
      },
      {
        sql: "DELETE FROM conversation_turn_nodes WHERE rowid IN (SELECT rowid FROM conversation_turn_nodes WHERE last_seen_at < ? LIMIT 100)",
        params: [CUTOFF],
        index: "idx_turn_nodes_last_seen",
      },
      {
        sql: "DELETE FROM agentic_conversations WHERE rowid IN (SELECT rowid FROM agentic_conversations WHERE last_seen_at < ? AND NOT EXISTS (SELECT 1 FROM conversation_turn_nodes n WHERE n.conversation_id = agentic_conversations.id) LIMIT 10000)",
        params: [CUTOFF],
        index: "idx_turn_nodes_conversation",
      },
    ];
    for (const { sql, params, index } of cases) {
      const plan = planDetails(db, sql, ...params);
      assert.ok(
        plan.some((detail) => detail.includes(index)),
        `expected ${index} for ${sql}, got: ${JSON.stringify(plan)}`
      );
      assert.ok(
        plan.every(
          (detail) => !detail.includes("SCAN conversation_turn_nodes") && !detail.includes("SCAN n")
        ),
        `expected no scan for ${sql}, got: ${JSON.stringify(plan)}`
      );
    }
  } finally {
    db.close();
  }
});
