/**
 * Regression test for /api/conversations's `activeCallLogId` field.
 *
 * `call_logs` only gets its row on completion (src/lib/usage/callLogs.ts's
 * INSERT needs duration/status/tokens, none of which exist yet while a reply
 * is still streaming) — so `lastCallLogId` (joined from `call_logs`) always
 * lags one request behind for a conversation with an in-flight reply. The
 * conversation panel needs the CURRENT pending request's own id (tracked
 * separately, in-memory, via usageHistory's pendingById) to poll its live
 * partial text. This test proves the route surfaces that id, keyed off the
 * pending request's `sessionTag` (== the conversation's own id).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conv-active-call-log-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const agenticConversations = await import("../../src/lib/db/agenticConversations.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const route = await import("../../src/app/api/conversations/route.ts");

test.after(() => {
  core.resetDbInstance();
  usageHistory.clearPendingRequests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  usageHistory.clearPendingRequests();
});

function seedTwoTurnConversation(id: string) {
  agenticConversations.createAgenticConversation({ id, apiKeyId: null, fingerprintHash: "fp" });
  agenticConversations.insertConversationTurnNodes(id, null, [
    { id: `${id}-n1`, parentId: null, role: "user", contentHash: "h1" },
    { id: `${id}-n2`, parentId: `${id}-n1`, role: "assistant", contentHash: "h2" },
  ]);
}

test("GET /api/conversations: surfaces the in-flight pending request's own id as activeCallLogId", async () => {
  const conversationId = "conv_active_test_1";
  seedTwoTurnConversation(conversationId);

  const pendingId = usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", true, {
    sessionTag: conversationId,
  });
  assert.ok(pendingId, "trackPendingRequest should return the generated pending id");

  const res = await route.GET(new Request("http://localhost/api/conversations?limit=50"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    conversations: Array<{ id: string; isActive: boolean; activeCallLogId: string | null }>;
  };

  const row = body.conversations.find((c) => c.id === conversationId);
  assert.ok(row, "seeded conversation should be present in the response");
  assert.equal(row!.isActive, true);
  assert.equal(row!.activeCallLogId, pendingId);
});

test("GET /api/conversations: activeCallLogId is null for a conversation with no in-flight request", async () => {
  const conversationId = "conv_active_test_2";
  seedTwoTurnConversation(conversationId);

  const res = await route.GET(new Request("http://localhost/api/conversations?limit=50"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    conversations: Array<{ id: string; isActive: boolean; activeCallLogId: string | null }>;
  };

  const row = body.conversations.find((c) => c.id === conversationId);
  assert.ok(row, "seeded conversation should be present in the response");
  assert.equal(row!.isActive, false);
  assert.equal(row!.activeCallLogId, null);
});
