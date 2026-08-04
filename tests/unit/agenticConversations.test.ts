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

import {
  createAgenticConversation,
  findAgenticConversationsByFingerprint,
  updateAgenticConversation,
  touchOrCreateExternalConversation,
  getLatestCallLogForConversation,
  getAllCallLogsForConversation,
  listMultiTurnConversations,
} from "../../src/lib/db/agenticConversations.ts";
import { getDbInstance } from "../../src/lib/db/core.ts";

test("createAgenticConversation + findAgenticConversationsByFingerprint round-trip", () => {
  const row = createAgenticConversation({
    apiKeyId: "key-a",
    fingerprintHash: "fp-round-trip",
    lastMessageCount: 1,
    lastMessagesHash: "hash-1",
  });

  assert.match(row.id, /^conv_/);
  assert.equal(row.turnCount, 1);

  const found = findAgenticConversationsByFingerprint("fp-round-trip");
  assert.equal(found.length, 1);
  assert.equal(found[0].id, row.id);
  assert.equal(found[0].apiKeyId, "key-a");
});

test("findAgenticConversationsByFingerprint returns multiple rows for a shared fingerprint", () => {
  createAgenticConversation({
    apiKeyId: "key-b",
    fingerprintHash: "fp-shared",
    lastMessageCount: 1,
    lastMessagesHash: "hash-b1",
  });
  createAgenticConversation({
    apiKeyId: "key-b",
    fingerprintHash: "fp-shared",
    lastMessageCount: 1,
    lastMessagesHash: "hash-b2",
  });

  const found = findAgenticConversationsByFingerprint("fp-shared");
  assert.equal(found.length, 2);
});

test("updateAgenticConversation updates message count/hash/turn count", () => {
  const row = createAgenticConversation({
    apiKeyId: "key-c",
    fingerprintHash: "fp-update",
    lastMessageCount: 1,
    lastMessagesHash: "hash-c1",
  });

  updateAgenticConversation(row.id, {
    lastMessageCount: 5,
    lastMessagesHash: "hash-c5",
    turnCount: 3,
  });

  const found = findAgenticConversationsByFingerprint("fp-update");
  assert.equal(found[0].lastMessageCount, 5);
  assert.equal(found[0].lastMessagesHash, "hash-c5");
  assert.equal(found[0].turnCount, 3);
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

test("getLatestCallLogForConversation returns the most recent row with an exact session_tag match", () => {
  const db = getDbInstance();
  const conversationId = "conv-for-latest-lookup";

  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("call-older", "2026-01-01T00:00:00.000Z", conversationId);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("call-newer", "2026-01-01T00:05:00.000Z", conversationId);
  // A prefix-matching but NOT exact tag must never match (guards against
  // accidentally reusing a LIKE-based filter for this exact-match lookup).
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("call-prefix-decoy", "2026-01-01T00:10:00.000Z", conversationId + "-extra");

  const latest = getLatestCallLogForConversation(conversationId);
  assert.equal(latest?.id, "call-newer");
});

test("getAllCallLogsForConversation returns every row ascending, exact-match only", () => {
  const db = getDbInstance();
  const conversationId = "conv-for-all-rows";

  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("all-newer", "2026-02-01T00:05:00.000Z", conversationId);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("all-older", "2026-02-01T00:00:00.000Z", conversationId);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, session_tag)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?)`
  ).run("all-decoy", "2026-02-01T00:03:00.000Z", conversationId + "-extra");

  const rows = getAllCallLogsForConversation(conversationId);
  assert.deepEqual(
    rows.map((r) => r.id),
    ["all-older", "all-newer"]
  );
});

test("listMultiTurnConversations only returns conversations with turn_count >= 2, joined to their latest call_logs row", () => {
  const db = getDbInstance();

  createAgenticConversation({
    id: "conv-single-turn",
    apiKeyId: null,
    fingerprintHash: "fp-single",
    lastMessageCount: 1,
    lastMessagesHash: "h1",
  });

  const multi = createAgenticConversation({
    id: "conv-multi-turn",
    apiKeyId: null,
    fingerprintHash: "fp-multi",
    lastMessageCount: 3,
    lastMessagesHash: "h2",
  });
  updateAgenticConversation(multi.id, {
    lastMessageCount: 3,
    lastMessagesHash: "h2",
    turnCount: 2,
  });

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
