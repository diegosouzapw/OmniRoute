/**
 * Conversation tracker: a client session id narrows the reconnect bucket.
 *
 * Production incident: every parallel coding agent behind one API key shares the
 * apiKeyId + model + toolNames fingerprint bucket, and resolveConversationId only
 * walks the 20 most recently seen conversations in it. Once more than 20 other
 * conversations in that bucket were touched since a session's own last request, its
 * continuation found no candidate, minted a new conversation and re-inserted its whole
 * history as new turn nodes. One deployment grew conversation_turn_nodes by ~1.3M
 * rows (~1 GB) a day that way.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-conv-session-bucket-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "conversation-session-bucket-secret";

const { computeFingerprintHash, resolveConversationId } =
  await import("../../open-sse/services/conversationTracker.ts");
const core = await import("../../src/lib/db/core.ts");

const API_KEY_ID = "key-shared-by-many-agents";
const MODEL = "codex-luna";
const TOOLS = [{ name: "Bash" }, { name: "Read" }];

let correlation = 0;
const nextCorrelationId = () => `corr-${++correlation}`;

function history(label: string, turns: number) {
  const messages: Array<{ role: string; content: string }> = [];
  for (let i = 0; i < turns; i++) {
    messages.push({ role: i % 2 === 0 ? "user" : "assistant", content: `${label} turn ${i}` });
  }
  return messages;
}

function resolve(messages: unknown[], clientSessionId: string | null, tools = TOOLS) {
  return resolveConversationId({
    body: { model: MODEL, messages, tools },
    model: MODEL,
    apiKeyId: API_KEY_ID,
    clientSessionIdHeader: null,
    clientSessionId,
    correlationId: nextCorrelationId(),
  });
}

/** 25 other agents on the same key/model/tools each start a conversation. */
async function crowdTheBucket(withSessionIds: boolean) {
  for (let agent = 0; agent < 25; agent++) {
    await resolve(history(`agent-${agent}`, 4), withSessionIds ? `session-${agent}` : null);
  }
}

test.after(() => {
  core.resetDbInstance();
});

test("a continuation reconnects after 20+ other agents touched the shared bucket", async () => {
  const first = history("long-session", 6);
  const opened = await resolve(first, "session-long");
  assert.equal(opened.isNewConversation, true);

  await crowdTheBucket(true);

  const next = await resolve(
    [...first, { role: "assistant", content: "reply" }, { role: "user", content: "next" }],
    "session-long"
  );
  assert.equal(next.isNewConversation, false, "the session's own conversation must be found");
  assert.equal(next.conversationId, opened.conversationId);
});

test("parallel agents of one client session do not crowd each other out", async () => {
  // Subagents share their parent's session id, so a busy session's own bucket can hold
  // more than 20 conversations too.
  const first = history("busy-parent", 6);
  const opened = await resolve(first, "session-busy");
  for (let agent = 0; agent < 25; agent++) {
    await resolve(history(`subagent-${agent}`, 4), "session-busy");
  }

  const next = await resolve(
    [...first, { role: "assistant", content: "reply" }, { role: "user", content: "next" }],
    "session-busy"
  );
  assert.equal(next.conversationId, opened.conversationId);
});

test("without a session id a continuation also survives 20+ busier conversations", async () => {
  const first = history("no-session-client", 6);
  const opened = await resolve(first, null);
  await crowdTheBucket(false);

  const next = await resolve(
    [...first, { role: "assistant", content: "reply" }, { role: "user", content: "next" }],
    null
  );
  assert.equal(next.conversationId, opened.conversationId);
});

test("a tool list that grows mid-session does not split the conversation", async () => {
  const first = history("tool-growth", 4);
  const opened = await resolve(first, "session-tools");

  const next = await resolve(
    [...first, { role: "assistant", content: "loading a deferred tool" }],
    "session-tools",
    [...TOOLS, { name: "WebFetch" }]
  );
  assert.equal(next.conversationId, opened.conversationId);
});

test("without a client session id the fingerprint stays apiKeyId + model + toolNames", () => {
  const legacy = computeFingerprintHash({
    apiKeyId: API_KEY_ID,
    model: MODEL,
    toolNames: ["Bash", "Read"],
  });
  assert.equal(
    computeFingerprintHash({
      apiKeyId: API_KEY_ID,
      model: MODEL,
      toolNames: ["Bash", "Read"],
      clientSessionId: null,
    }),
    legacy
  );
  assert.notEqual(
    computeFingerprintHash({
      apiKeyId: API_KEY_ID,
      model: MODEL,
      toolNames: ["Bash", "Read"],
      clientSessionId: "session-x",
    }),
    legacy
  );
});

test("sessions on different API keys never share a bucket", () => {
  const a = computeFingerprintHash({
    apiKeyId: "key-a",
    model: MODEL,
    toolNames: [],
    clientSessionId: "same-session",
  });
  const b = computeFingerprintHash({
    apiKeyId: "key-b",
    model: MODEL,
    toolNames: [],
    clientSessionId: "same-session",
  });
  assert.notEqual(a, b);
});

test("a conversation recorded before the client sent a session id still continues", async () => {
  const first = history("pre-upgrade", 4);
  const opened = await resolve(first, null);

  const next = await resolve(
    [...first, { role: "assistant", content: "after upgrade" }],
    "session-new-client"
  );
  assert.equal(next.conversationId, opened.conversationId);
});

test("resolveClientSessionId reads the stable client session identifiers only", async () => {
  const { resolveClientSessionId } = await import("../../open-sse/services/conversationTracker.ts");

  const claudeHeader = new Headers({ "x-claude-code-session-id": "cc-session" });
  assert.equal(resolveClientSessionId(claudeHeader, {}), "cc-session");
  assert.equal(
    resolveClientSessionId(new Headers({ session_id: "codex-session" }), {}),
    "codex-session"
  );
  assert.equal(
    resolveClientSessionId(new Headers(), {
      metadata: { user_id: JSON.stringify({ device_id: "d", session_id: "meta-session" }) },
    }),
    "meta-session"
  );
  assert.equal(
    resolveClientSessionId(new Headers({ "x-request-id": "per-request" }), {}),
    null,
    "per-request ids must not bucket a conversation"
  );
  assert.equal(resolveClientSessionId(null, { metadata: { user_id: "not json" } }), null);
});
