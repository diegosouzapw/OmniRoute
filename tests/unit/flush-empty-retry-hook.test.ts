import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Hook-level tests for the flush empty-turn retry (translate-path streams).
//
// A Gemini upstream speaks a non-OpenAI format, so the OpenAI-speaking client
// path always goes through the translate transform — the hook's
// `isTranslatePath` gate is armed. Two Gemini accounts isolate rotation:
// the first serves an empty turn, the second serves content.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-flush-empty-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = `test-flush-empty-retry-${Date.now()}`;
}
process.env.STREAM_READINESS_TIMEOUT_MS = "1000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

const FLAG = "FLUSH_EMPTY_RETRY_ENABLED";
const ORIGINAL_FLAG = process.env[FLAG];

function setFlag(enabled: boolean) {
  if (enabled) process.env[FLAG] = "true";
  else delete process.env[FLAG];
}

async function resetStorage() {
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
  initTranslators();
}

async function seedGemini(name: string, apiKey: string) {
  const row = (await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  return { id: row.id, apiKey };
}

// Anonymized replay of the 19/09 reasoning-only payload shape: 74 tokens of
// thinking text (native thought part), empty message text, terminal stop.
function reasoningOnlyStreamResponse(): Response {
  const thinking = "r".repeat(74);
  return new Response(
    `data: ${JSON.stringify({
      candidates: [{ content: { parts: [{ text: thinking, thought: true }] } }],
    })}\n\ndata: ${JSON.stringify({
      candidates: [{ finishReason: "STOP" }],
    })}\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

// Anonymized replay of the 19/09 zero-chunk payload shape: no candidates at
// all (the upstream turn emitted nothing translatable).
function zeroChunkStreamResponse(): Response {
  return new Response(
    `data: ${JSON.stringify({ candidates: [] })}\n\n` +
      `data: ${JSON.stringify({ candidates: [] })}\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

// The upstream sent a first frame with nothing usable in it, then the
// connection dropped (undici surfaces this as a TypeError "terminated" on the
// body). The first frame lets the stream readiness gate pass, so the failure
// happens while the flush hook is buffering the turn.
function droppedStreamResponse(): Response {
  let sent = false;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (!sent) {
        sent = true;
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify({ candidates: [] })}\n\n`)
        );
        return;
      }
      controller.error(new TypeError("terminated"));
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function contentStreamResponse(text: string): Response {
  return new Response(
    `data: ${JSON.stringify({
      candidates: [{ content: { parts: [{ text }] } }],
    })}\n\ndata: ${JSON.stringify({
      candidates: [{ finishReason: "STOP" }],
    })}\n\ndata: [DONE]\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function streamRequest() {
  const nonce = `flush-empty-retry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({
      model: "gemini/gemini-2.5-flash",
      messages: [{ role: "user", content: `Reply with OK only. ${nonce}` }],
      max_tokens: 64,
      stream: true,
      temperature: 0,
    }),
  });
}

function stubFetch(dispatches: string[], handler: (auth: string, callIndex: number) => Response) {
  globalThis.fetch = (async (_url: unknown, init: { headers?: unknown }) => {
    const headers = new Headers((init?.headers ?? {}) as HeadersInit);
    const auth = headers.get("authorization") ?? headers.get("x-goog-api-key") ?? "";
    const callIndex = dispatches.length;
    dispatches.push(auth);
    return handler(auth, callIndex);
  }) as typeof fetch;
}

async function drainText(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  return text;
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  setFlag(true);
  await resetStorage();
});

test.afterEach(async () => {
  await new Promise((r) => setTimeout(r, 50));
  globalThis.fetch = originalFetch;
  if (ORIGINAL_FLAG === undefined) delete process.env[FLAG];
  else process.env[FLAG] = ORIGINAL_FLAG;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag off: empty reasoning-only turn exposes current behavior with zero retry", async () => {
  setFlag(false);
  await seedGemini("gemini-off-a", "sk-flush-off-a");
  await seedGemini("gemini-off-b", "sk-flush-off-b");
  const dispatches: string[] = [];
  stubFetch(dispatches, () => reasoningOnlyStreamResponse());
  const response = await handleChat(streamRequest());
  await drainText(response);
  assert.equal(
    dispatches.length,
    1,
    `flag off must issue exactly 1 dispatch, got ${dispatches.length}`
  );
});

test("reasoning-only turn retries once through the normal credential path and serves content", async () => {
  await seedGemini("gemini-empty-a", "sk-flush-empty-a");
  await seedGemini("gemini-content-b", "sk-flush-content-b");
  const dispatches: string[] = [];
  stubFetch(dispatches, (_auth, callIndex) =>
    callIndex === 0 ? reasoningOnlyStreamResponse() : contentStreamResponse("served-after-retry")
  );
  const response = await handleChat(streamRequest());
  const bodyText = await drainText(response);
  assert.equal(dispatches.length, 2, `expected initial + 1 retry, got ${dispatches.length}`);
  assert.match(bodyText, /served-after-retry/, "client must receive the retry content");
});

test("persistent empty turns exhaust the budget with exactly 5 dispatches", async () => {
  await seedGemini("gemini-empty2-a", "sk-flush-empty2-a");
  await seedGemini("gemini-empty2-b", "sk-flush-empty2-b");
  const dispatches: string[] = [];
  stubFetch(dispatches, () => zeroChunkStreamResponse());
  const response = await handleChat(streamRequest());
  await drainText(response);
  assert.equal(
    dispatches.length,
    5,
    `budget 4 means 1 initial + 4 retries, got ${dispatches.length}`
  );
});

test("single slot retries the same account and serves content", async () => {
  await seedGemini("gemini-lone", "sk-flush-lone");
  const dispatches: string[] = [];
  stubFetch(dispatches, (_auth, callIndex) =>
    callIndex === 0 ? reasoningOnlyStreamResponse() : contentStreamResponse("served-after-retry")
  );
  const response = await handleChat(streamRequest());
  const bodyText = await drainText(response);
  assert.equal(
    dispatches.length,
    2,
    `single slot replays the same account, got ${dispatches.length}`
  );
  assert.match(bodyText, /served-after-retry/, "client must receive the retry content");
});

test("a stream that drops before anything reaches the client retries and serves content", async () => {
  await seedGemini("gemini-drop-a", "sk-flush-drop-a");
  await seedGemini("gemini-drop-b", "sk-flush-drop-b");
  const dispatches: string[] = [];
  stubFetch(dispatches, (_auth, callIndex) =>
    callIndex === 0 ? droppedStreamResponse() : contentStreamResponse("served-after-drop")
  );
  const response = await handleChat(streamRequest());
  const bodyText = await drainText(response);
  assert.equal(dispatches.length, 2, `expected initial + 1 retry, got ${dispatches.length}`);
  assert.match(bodyText, /served-after-drop/, "client must receive the retry content");
});

test("persistent stream drops exhaust the same budget as empty turns", async () => {
  await seedGemini("gemini-drop2-a", "sk-flush-drop2-a");
  await seedGemini("gemini-drop2-b", "sk-flush-drop2-b");
  const dispatches: string[] = [];
  stubFetch(dispatches, () => droppedStreamResponse());
  const response = await handleChat(streamRequest());
  await drainText(response);
  assert.equal(
    dispatches.length,
    5,
    `budget 4 means 1 initial + 4 retries, got ${dispatches.length}`
  );
});

test("flag off: a dropped stream is not retried", async () => {
  setFlag(false);
  await seedGemini("gemini-drop3-a", "sk-flush-drop3-a");
  await seedGemini("gemini-drop3-b", "sk-flush-drop3-b");
  const dispatches: string[] = [];
  stubFetch(dispatches, () => droppedStreamResponse());
  const response = await handleChat(streamRequest());
  await drainText(response);
  assert.equal(
    dispatches.length,
    1,
    `flag off must issue exactly 1 dispatch, got ${dispatches.length}`
  );
});
