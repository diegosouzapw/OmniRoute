/**
 * Issue #12453 — conversation_turn_nodes / agentic_conversations have no
 * retention path, so storage.sqlite grows without bound (1.15M node rows,
 * ~775 MB in four days on one busy coding-agent workload).
 *
 * The identity nodes only make sense while the call_logs row their
 * last_correlation_id points at still exists, so both tables follow the
 * existing `retention.callLogs` window instead of getting a knob of their own.
 *
 * These tests call the REAL cleanup functions against a real SQLite adapter
 * seeded with test rows, exactly like telemetry-auto-cleanup-6848.test.ts.
 *
 * DATA_DIR isolation is self-contained (mkdtempSync below), not dependent on
 * the test:unit harness's `--import ./tests/_setup/isolateDataDir.ts`: this
 * file runs real DELETEs through getDbInstance(), which resolves to the
 * developer's ~/.omniroute/storage.sqlite when DATA_DIR is unset. Do NOT
 * remove the DATA_DIR override below.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12453-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { cleanupConversationTurnNodes, cleanupAgenticConversations, runAutoCleanup } =
  await import("../../src/lib/db/cleanup.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getUserDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 86_400_000;
const RETENTION_DAYS = getUserDatabaseSettings().retention.callLogs;
const OLD = new Date(Date.now() - (RETENTION_DAYS + 10) * DAY_MS).toISOString();
const RECENT = new Date(Date.now() - 1 * DAY_MS).toISOString();

function insertConversation(id: string, lastSeenAt: string): void {
  getDbInstance()!
    .prepare(
      `INSERT INTO agentic_conversations
         (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at)
       VALUES (?, 'key1', 'fp', 0, '', 1, ?, ?)`
    )
    .run(id, lastSeenAt, lastSeenAt);
}

function insertNode(id: string, conversationId: string, lastSeenAt: string): void {
  getDbInstance()!
    .prepare(
      `INSERT INTO conversation_turn_nodes
         (id, conversation_id, parent_id, role, content_hash, last_correlation_id, first_seen_at, last_seen_at)
       VALUES (?, ?, NULL, 'user', 'hash', 'corr', ?, ?)`
    )
    .run(id, conversationId, lastSeenAt, lastSeenAt);
}

function count(table: string): number {
  const row = getDbInstance()!.prepare(`SELECT COUNT(*) AS cnt FROM ${table}`).get() as {
    cnt: number;
  };
  return row.cnt;
}

function ids(table: string): string[] {
  const rows = getDbInstance()!.prepare(`SELECT id FROM ${table} ORDER BY id`).all() as Array<{
    id: string;
  }>;
  return rows.map((r) => r.id);
}

test.beforeEach(() => {
  const db = getDbInstance()!;
  db.exec("DELETE FROM conversation_turn_nodes");
  db.exec("DELETE FROM agentic_conversations");
});

test("#12453 cleanupConversationTurnNodes: deletes nodes older than the call-log retention window", async () => {
  insertConversation("conv_a", RECENT);
  insertNode("old-1", "conv_a", OLD);
  insertNode("old-2", "conv_a", OLD);
  insertNode("old-3", "conv_a", OLD);
  insertNode("recent-1", "conv_a", RECENT);
  insertNode("recent-2", "conv_a", RECENT);

  const result = await cleanupConversationTurnNodes();

  assert.strictEqual(result.deleted, 3);
  assert.strictEqual(result.errors, 0);
  assert.deepStrictEqual(ids("conversation_turn_nodes"), ["recent-1", "recent-2"]);
});

test("#12453 cleanupAgenticConversations: sweeps stale conversations that have no nodes left", async () => {
  // Stale and orphaned: every node already expired -> must go.
  insertConversation("conv_orphan_old", OLD);
  // Stale but still anchored by a live node -> must stay.
  insertConversation("conv_anchored", OLD);
  insertNode("live-1", "conv_anchored", RECENT);
  // Fresh root whose nodes are not written yet (createConversation runs before
  // the node insert in the same request) -> must stay.
  insertConversation("conv_fresh_no_nodes", RECENT);

  const result = await cleanupAgenticConversations();

  assert.strictEqual(result.deleted, 1);
  assert.strictEqual(result.errors, 0);
  assert.deepStrictEqual(ids("agentic_conversations"), ["conv_anchored", "conv_fresh_no_nodes"]);
  assert.strictEqual(count("conversation_turn_nodes"), 1);
});

test("#12453 nodes expire first, then the conversation they anchored is swept in the same pass", async () => {
  insertConversation("conv_dead", OLD);
  insertNode("dead-1", "conv_dead", OLD);
  insertNode("dead-2", "conv_dead", OLD);

  // Conversation-only sweep must not touch a root that still has (old) nodes.
  const first = await cleanupAgenticConversations();
  assert.strictEqual(first.deleted, 0);
  assert.strictEqual(count("agentic_conversations"), 1);

  const nodes = await cleanupConversationTurnNodes();
  assert.strictEqual(nodes.deleted, 2);

  const second = await cleanupAgenticConversations();
  assert.strictEqual(second.deleted, 1);
  assert.strictEqual(count("agentic_conversations"), 0);
});

test("#12453 runAutoCleanup: registers both tables and reports them in results", async () => {
  insertConversation("conv_x", OLD);
  insertNode("x-1", "conv_x", OLD);
  insertConversation("conv_y", RECENT);
  insertNode("y-1", "conv_y", RECENT);

  const summary = await runAutoCleanup();

  assert.ok(summary.results.conversationTurnNodes, "conversationTurnNodes missing from results");
  assert.ok(summary.results.agenticConversations, "agenticConversations missing from results");
  assert.strictEqual(summary.results.conversationTurnNodes.deleted, 1);
  assert.strictEqual(summary.results.agenticConversations.deleted, 1);
  assert.strictEqual(summary.results.conversationTurnNodes.errors, 0);
  assert.strictEqual(summary.results.agenticConversations.errors, 0);
  assert.deepStrictEqual(ids("conversation_turn_nodes"), ["y-1"]);
  assert.deepStrictEqual(ids("agentic_conversations"), ["conv_y"]);
});
