/**
 * Unit tests for src/lib/db/agenticConversations.ts CRUD.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-agentic-conv-db-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "agentic-conversations-test-secret";

// Dynamic imports (not static) are required here: a static `import` of a module
// that reads process.env.DATA_DIR at its own top level (src/lib/db/core.ts's
// `export const DATA_DIR = ...`) is evaluated before this file's own top-level
// code runs — ESM instantiates the whole dependency graph, dependencies first,
// regardless of source-line order — so the override above would silently miss
// and the module would resolve the real host DATA_DIR instead of the temp dir.
const {
  createAgenticConversation,
  findAgenticConversationsByFingerprint,
  updateAgenticConversation,
  touchOrCreateExternalConversation,
  listMultiTurnConversations,
  getConversationTurnIndex,
  insertConversationTurnNodes,
  getConversationTurnPage,
  resolveCallLogIdsByCorrelationIds,
} = await import("../../../src/lib/db/agenticConversations.ts");
const { getDbInstance } = await import("../../../src/lib/db/core.ts");

test("createAgenticConversation + findAgenticConversationsByFingerprint round-trip", () => {
  const row = createAgenticConversation({
    apiKeyId: "key-a",
    fingerprintHash: "fp-round-trip",
  });

  assert.match(row.id, /^conv_/);
  assert.equal(row.turnCount, 1);

  const found = findAgenticConversationsByFingerprint("fp-round-trip");
  assert.equal(found.length, 1);
  assert.equal(found[0].id, row.id);
  assert.equal(found[0].apiKeyId, "key-a");
});

test("findAgenticConversationsByFingerprint returns multiple rows for a shared fingerprint", () => {
  createAgenticConversation({ apiKeyId: "key-b", fingerprintHash: "fp-shared" });
  createAgenticConversation({ apiKeyId: "key-b", fingerprintHash: "fp-shared" });

  const found = findAgenticConversationsByFingerprint("fp-shared");
  assert.equal(found.length, 2);
});

test("updateAgenticConversation updates turn count", () => {
  const row = createAgenticConversation({ apiKeyId: "key-c", fingerprintHash: "fp-update" });

  updateAgenticConversation(row.id, { turnCount: 3 });

  const found = findAgenticConversationsByFingerprint("fp-update");
  assert.equal(found[0].turnCount, 3);
});

test("insertConversationTurnNodes + getConversationTurnIndex round-trip", () => {
  const row = createAgenticConversation({ apiKeyId: "key-nodes", fingerprintHash: "fp-nodes" });

  insertConversationTurnNodes(row.id, "corr-1", [
    { id: "node-a", parentId: null, role: "user", contentHash: "hash-a" },
    { id: "node-b", parentId: "node-a", role: "assistant", contentHash: "hash-b" },
  ]);

  const index = getConversationTurnIndex(row.id);
  assert.equal(index.nodeIds.size, 2);
  assert.ok(index.nodeIds.has("node-a"));
  assert.ok(index.nodeIds.has("node-b"));
  assert.deepEqual(index.byContentHash.get("hash-a"), ["node-a"]);
  assert.deepEqual(index.byContentHash.get("hash-b"), ["node-b"]);

  // A different conversation's nodes must never leak into this index.
  const other = createAgenticConversation({
    apiKeyId: "key-nodes-2",
    fingerprintHash: "fp-nodes-2",
  });
  insertConversationTurnNodes(other.id, "corr-2", [
    { id: "node-c", parentId: null, role: "user", contentHash: "hash-c" },
  ]);
  const reReadIndex = getConversationTurnIndex(row.id);
  assert.equal(reReadIndex.nodeIds.size, 2);
  assert.equal(reReadIndex.byContentHash.has("hash-c"), false);
});

test("getConversationTurnIndex groups multiple node ids under the same content hash (duplicate turn text at different tree positions)", () => {
  const row = createAgenticConversation({ apiKeyId: "key-dup-content", fingerprintHash: "fp-dup" });

  insertConversationTurnNodes(row.id, "corr-1", [
    { id: "node-1", parentId: null, role: "user", contentHash: "hash-ok" },
    { id: "node-2", parentId: "node-1", role: "assistant", contentHash: "hash-reply" },
    // Same content ("ok") recurs later in the same tree, at a different node.
    { id: "node-3", parentId: "node-2", role: "user", contentHash: "hash-ok" },
  ]);

  const index = getConversationTurnIndex(row.id);
  const matches = index.byContentHash.get("hash-ok");
  assert.equal(matches?.length, 2);
  assert.deepEqual([...matches!].sort(), ["node-1", "node-3"]);
});

test("insertConversationTurnNodes is idempotent for already-existing node ids (INSERT OR IGNORE)", () => {
  const row = createAgenticConversation({ apiKeyId: "key-idem", fingerprintHash: "fp-idem" });

  insertConversationTurnNodes(row.id, "corr-1", [
    { id: "node-dup", parentId: null, role: "user", contentHash: "hash-dup" },
  ]);
  // Re-insert the same id — must not throw, must not duplicate.
  insertConversationTurnNodes(row.id, "corr-2", [
    { id: "node-dup", parentId: null, role: "user", contentHash: "hash-dup" },
  ]);

  const tree = getConversationTurnPage(row.id, { limit: 500 }).nodes;
  assert.equal(tree.length, 1);
});

test("getConversationTurnPage returns the full chain with parent/child structure and content hash", () => {
  const row = createAgenticConversation({ apiKeyId: "key-tree", fingerprintHash: "fp-tree" });

  insertConversationTurnNodes(row.id, "corr-tree", [
    { id: "root-turn", parentId: null, role: "user", contentHash: "hash-hello" },
    { id: "child-turn", parentId: "root-turn", role: "assistant", contentHash: "hash-hi" },
  ]);
  // A sibling branch off the same parent.
  insertConversationTurnNodes(row.id, "corr-tree-2", [
    { id: "sibling-turn", parentId: "root-turn", role: "assistant", contentHash: "hash-hey" },
  ]);

  const tree = getConversationTurnPage(row.id, { limit: 500 }).nodes;
  assert.equal(tree.length, 3);

  const root = tree.find((n) => n.id === "root-turn");
  const children = tree.filter((n) => n.parentId === "root-turn");
  assert.equal(root?.parentId, null);
  assert.equal(root?.contentHash, "hash-hello");
  assert.equal(children.length, 2);
  assert.deepEqual(children.map((c) => c.id).sort(), ["child-turn", "sibling-turn"]);
});

test("getConversationTurnPage: initial load returns only the last `limit` turns, oldest-first, with hasMore", () => {
  const row = createAgenticConversation({ apiKeyId: "key-page", fingerprintHash: "fp-page" });
  const nodes = Array.from({ length: 25 }, (_, i) => ({
    id: `n${i}`,
    parentId: i === 0 ? null : `n${i - 1}`,
    role: i % 2 === 0 ? "user" : "assistant",
    contentHash: `hash-${i}`,
  }));
  insertConversationTurnNodes(row.id, "corr-page", nodes);

  const page = getConversationTurnPage(row.id, { limit: 20 });
  assert.equal(page.nodes.length, 20);
  assert.equal(page.hasMore, true);
  // Oldest-first within the page, and it's the LAST 20 (n5..n24).
  assert.equal(page.nodes[0].id, "n5");
  assert.equal(page.nodes[19].id, "n24");
});

test("getConversationTurnPage: beforeSeq loads the previous page (older turns), with correct hasMore", () => {
  const row = createAgenticConversation({ apiKeyId: "key-page-2", fingerprintHash: "fp-page-2" });
  const nodes = Array.from({ length: 25 }, (_, i) => ({
    id: `m${i}`,
    parentId: i === 0 ? null : `m${i - 1}`,
    role: "user",
    contentHash: `hash-m${i}`,
  }));
  insertConversationTurnNodes(row.id, "corr-page-2", nodes);

  const firstPage = getConversationTurnPage(row.id, { limit: 20 });
  const oldestSeqInFirstPage = firstPage.nodes[0].seq;

  const olderPage = getConversationTurnPage(row.id, { limit: 20, beforeSeq: oldestSeqInFirstPage });
  assert.equal(olderPage.nodes.length, 5, "only 5 turns (0-4) exist before the first page");
  assert.equal(olderPage.hasMore, false);
  assert.equal(olderPage.nodes[0].id, "m0");
  assert.equal(olderPage.nodes[4].id, "m4");
});

test("getConversationTurnPage: afterSeq returns only turns newer than the cursor (for polling), uncapped", () => {
  const row = createAgenticConversation({ apiKeyId: "key-page-3", fingerprintHash: "fp-page-3" });
  insertConversationTurnNodes(row.id, "corr-page-3", [
    { id: "p0", parentId: null, role: "user", contentHash: "h0" },
    { id: "p1", parentId: "p0", role: "assistant", contentHash: "h1" },
  ]);
  const firstPage = getConversationTurnPage(row.id, { limit: 20 });
  const newestSeq = firstPage.nodes[firstPage.nodes.length - 1].seq;

  // Nothing new yet.
  assert.equal(getConversationTurnPage(row.id, { afterSeq: newestSeq }).nodes.length, 0);

  // A new turn arrives (e.g. a later request continuing this conversation).
  insertConversationTurnNodes(row.id, "corr-page-3b", [
    { id: "p2", parentId: "p1", role: "user", contentHash: "h2" },
  ]);
  const polled = getConversationTurnPage(row.id, { afterSeq: newestSeq });
  assert.equal(polled.nodes.length, 1);
  assert.equal(polled.nodes[0].id, "p2");
  assert.equal(polled.hasMore, false);
});

test("touchOrCreateExternalConversation creates then increments turn_count on repeat calls", () => {
  const id = "ext-conv-test-id";
  touchOrCreateExternalConversation(id, { apiKeyId: "key-d" });

  const db = getDbInstance();
  const afterCreate = db
    .prepare("SELECT turn_count FROM agentic_conversations WHERE id = ?")
    .get(id) as { turn_count: number };
  assert.equal(afterCreate.turn_count, 1);

  touchOrCreateExternalConversation(id, { apiKeyId: "key-d" });
  const afterTouch = db
    .prepare("SELECT turn_count FROM agentic_conversations WHERE id = ?")
    .get(id) as { turn_count: number };
  assert.equal(afterTouch.turn_count, 2);
});

test("listMultiTurnConversations only returns conversations with >= 2 actual turn nodes, joined to their latest call_logs row", () => {
  const db = getDbInstance();

  createAgenticConversation({
    id: "conv-single-turn",
    apiKeyId: null,
    fingerprintHash: "fp-single",
  });
  insertConversationTurnNodes("conv-single-turn", "corr-single", [
    { id: "single-node-1", parentId: null, role: "user", contentHash: "hash-single-1" },
  ]);

  const multi = createAgenticConversation({
    id: "conv-multi-turn",
    apiKeyId: null,
    fingerprintHash: "fp-multi",
  });
  // turn_count deliberately left at its default of 1 here: it tracks
  // requests-touched, not node count, and a freshly-minted conversation can
  // already carry many turn nodes from a single insert (see the doc comment
  // on listMultiTurnConversations) — the filter must key off actual node
  // count, not turn_count, for this conversation to be listed at all.
  insertConversationTurnNodes(multi.id, "corr-multi", [
    { id: "multi-node-1", parentId: null, role: "user", contentHash: "hash-multi-1" },
    {
      id: "multi-node-2",
      parentId: "multi-node-1",
      role: "assistant",
      contentHash: "hash-multi-2",
    },
  ]);

  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', 'opencode-zen', ?)`
  ).run("multi-turn-1", "2026-03-01T00:00:00.000Z", "conv-multi-turn");
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'gemma-4', 'gemini', ?)`
  ).run("multi-turn-2", "2026-03-01T00:01:00.000Z", "conv-multi-turn");

  const { rows, total } = listMultiTurnConversations();
  const ids = rows.map((r) => r.id);
  assert.ok(ids.includes("conv-multi-turn"));
  assert.ok(!ids.includes("conv-single-turn"));
  assert.ok(total >= 1);

  const found = rows.find((r) => r.id === "conv-multi-turn");
  assert.equal(found?.lastCallLogId, "multi-turn-2");
  assert.equal(found?.lastModel, "gemma-4");
  assert.equal(found?.lastProvider, "gemini");
});

test("resolveCallLogIdsByCorrelationIds bulk-resolves correlation_id to call_logs.id", () => {
  const db = getDbInstance();

  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, correlation_id)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("call-corr-1", "2026-04-01T00:00:00.000Z", "corr-a");
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, correlation_id)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("call-corr-2", "2026-04-01T00:01:00.000Z", "corr-b");

  const resolved = resolveCallLogIdsByCorrelationIds(["corr-a", "corr-b", "corr-missing"]);
  assert.equal(resolved.get("corr-a"), "call-corr-1");
  assert.equal(resolved.get("corr-b"), "call-corr-2");
  assert.equal(resolved.has("corr-missing"), false);
});

test("resolveCallLogIdsByCorrelationIds returns an empty map for an empty/all-falsy input", () => {
  assert.equal(resolveCallLogIdsByCorrelationIds([]).size, 0);
  assert.equal(resolveCallLogIdsByCorrelationIds(["", ""]).size, 0);
});
