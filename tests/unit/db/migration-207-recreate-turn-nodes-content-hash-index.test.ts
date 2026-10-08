// Migration 201 dropped idx_turn_nodes_content_hash as unread; #15637's
// content-based reconnect candidates (findAgenticConversationsByContent) read
// it on every tracked request. Migration 207 recreates it, and the candidate
// query must take it instead of filtering each conversation's nodes row by row.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-207-data-"));

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-207-"));
for (const file of [
  "155_agentic_conversations.sql",
  "156_conversation_turn_nodes.sql",
  "186_conversation_turn_nodes_last_seen_index.sql",
  "201_drop_unused_turn_node_indexes.sql",
  "207_recreate_turn_nodes_content_hash_index.sql",
]) {
  fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
}
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const { contentCandidatesSql } = await import("../../../src/lib/db/agenticConversations.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

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
  const conv = db.prepare(
    "INSERT INTO agentic_conversations (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at) VALUES (?, NULL, 'fp', 0, '', 5, '2026-01-01', ?)"
  );
  const node = db.prepare(
    "INSERT INTO conversation_turn_nodes (id, conversation_id, parent_id, role, content_hash, last_correlation_id, first_seen_at, last_seen_at) VALUES (?, ?, NULL, 'user', ?, NULL, '2026-01-01', '2026-09-01')"
  );
  for (let c = 0; c < 20; c++) {
    conv.run(`c${c}`, `2026-09-${String(c + 1).padStart(2, "0")}`);
    for (let i = 0; i < 50; i++) node.run(`n${c}-${i}`, `c${c}`, `hash${c}-${i}`);
  }
  db.prepare("ANALYZE").run();
}

test("migration 207 recreates the (conversation_id, content_hash) index after 201", () => {
  const db = openMemorySqliteAdapter();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 5);
    const names = indexes(db);
    assert.ok(names.includes("idx_turn_nodes_content_hash"), `missing index: ${names}`);
    assert.ok(!names.includes("idx_turn_nodes_parent"), `parent index came back: ${names}`);
    assert.equal(runMigrations(db, { isNewDb: true }), 0, "second run is a no-op");
  } finally {
    db.close();
  }
});

test("the content-candidate query probes turn nodes through the content_hash index", () => {
  const db = openMemorySqliteAdapter();
  try {
    runMigrations(db, { isNewDb: true });
    seed(db);
    const probes = ["hash3-0", "hash3-25", "hash3-47"];
    const plan = (
      db
        .prepare(`EXPLAIN QUERY PLAN ${contentCandidatesSql(probes.length)}`)
        .all(...probes, "fp", 500, 20) as Array<{ detail: string }>
    ).map((row) => row.detail);
    assert.ok(
      plan.some(
        (detail) =>
          detail.includes("idx_turn_nodes_content_hash") && detail.includes("content_hash=?")
      ),
      `expected an idx_turn_nodes_content_hash probe, got: ${JSON.stringify(plan)}`
    );
    const rows = db
      .prepare(contentCandidatesSql(probes.length))
      .all(...probes, "fp", 500, 20) as Array<{ id: string; hits: number }>;
    assert.deepEqual(
      rows.map((row) => [row.id, row.hits]),
      [["c3", 3]]
    );
  } finally {
    db.close();
  }
});
