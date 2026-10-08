// @ts-nocheck
// End to end: the agent context resolved in handleChatCore must reach saveRequestUsage on every
// path that persists usage — streaming (chatCore/streamingTail.ts), non-streaming
// (chatCore/nonStreamingResponse.ts) and upstream failures (persistFailureUsage). The helper
// tests exercise the leaves in isolation; this guards the wiring between chatCore and them, which
// a conflict-only resolution of #14725's split silently dropped.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-agent-ctx-chatcore-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const noopLog = () => ({ debug() {}, info() {}, warn() {}, error() {} });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function sse(text) {
  return new Response(text, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function chatStream() {
  const chunk = (delta, extra = {}) =>
    `data: ${JSON.stringify({ id: "c1", object: "chat.completion.chunk", created: 1, model: "m", choices: [{ index: 0, delta, finish_reason: null }], ...extra })}\n\n`;
  return sse(
    chunk({ role: "assistant", content: "" }) +
      chunk({ content: "Hello" }) +
      `data: ${JSON.stringify({ id: "c1", object: "chat.completion.chunk", created: 1, model: "m", choices: [{ index: 0, delta: {}, finish_reason: "stop" }], usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 } })}\n\ndata: [DONE]\n\n`
  );
}

function chatJson() {
  return new Response(
    JSON.stringify({
      id: "c2",
      object: "chat.completion",
      created: 1,
      model: "gpt-4o-mini",
      choices: [
        { index: 0, message: { role: "assistant", content: "Hello" }, finish_reason: "stop" },
      ],
      usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function upstreamError() {
  return new Response(JSON.stringify({ error: { message: "bad request", type: "invalid" } }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

async function drain(response) {
  if (!response?.body) return;
  const reader = response.body.getReader();
  for (;;) {
    const { done } = await reader.read();
    if (done) break;
  }
}

async function sessionRowFor(sessionId, timeoutMs = 15000) {
  const db = core.getDbInstance();
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const row = db
      .prepare(
        `SELECT s.client_session_id, s.project_name, s.request_count, s.error_count,
                (SELECT COUNT(*) FROM usage_history u WHERE u.agent_session_id = s.id) AS usage_rows
           FROM agent_sessions s WHERE s.client_session_id = ?`
      )
      .get(sessionId);
    if (row && row.usage_rows > 0) return row;
    await sleep(25);
  }
  return null;
}

async function run({ stream, upstream, sessionId }) {
  globalThis.fetch = async () => upstream();
  const body = { model: "gpt-4o-mini", stream, messages: [{ role: "user", content: "hi" }] };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({
        accept: stream ? "text/event-stream" : "application/json",
        "user-agent": "claude-cli/2.1.282 (external, cli)",
        "x-claude-code-session-id": sessionId,
        "x-omniroute-project": "acme",
      }),
    },
    connectionId: "openai-conn",
  });
  if (result.success) await drain(result.response);
  return { result, row: await sessionRowFor(sessionId) };
}

test("streaming usage is attributed to the request's agent session", async () => {
  const { result, row } = await run({
    stream: true,
    upstream: chatStream,
    sessionId: "stream-session",
  });
  assert.equal(result.success, true, JSON.stringify(result.error ?? result.status));
  assert.ok(row, "expected an agent_sessions row linked to the streamed usage row");
  assert.equal(row.project_name, "acme");
  assert.equal(row.request_count, 1);
  assert.equal(row.usage_rows, 1);
});

test("non-streaming usage is attributed to the request's agent session", async () => {
  const { result, row } = await run({
    stream: false,
    upstream: chatJson,
    sessionId: "json-session",
  });
  assert.equal(result.success, true, JSON.stringify(result.error ?? result.status));
  assert.ok(row, "expected an agent_sessions row linked to the non-streamed usage row");
  assert.equal(row.project_name, "acme");
  assert.equal(row.usage_rows, 1);
});

test("an upstream failure is attributed to the request's agent session", async () => {
  const { result, row } = await run({
    stream: false,
    upstream: upstreamError,
    sessionId: "failure-session",
  });
  assert.equal(result.success, false);
  assert.ok(row, "expected an agent_sessions row linked to the failure usage row");
  assert.equal(row.error_count >= 1, true);
});
