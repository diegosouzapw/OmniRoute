// #14862: the per-key `anthropicRateLimitHeaders` policy must reach the headers the
// client actually receives, through handleChatCore — not only the pure builder.
//
// - Streaming: upstream headers are forwarded by assembleStreamingResponseHeaders
//   (chatCore/streamingTail.ts), so the key's policy has to be passed there.
// - Non-streaming: the client response headers are rebuilt from scratch by
//   buildNonStreamingResponseHeaders (no upstream header is forwarded), so nothing
//   leaks and nothing is stripped from the upstream Response. Stripping it would
//   only blind the internal consumers that read the upstream headers (rate-limit
//   learning, call logs).
// - In both cases the rate-limit learner still sees the anthropic-ratelimit-*
//   headers for a `strip` key.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-anthropic-hdr-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const rateLimits = await import("../../open-sse/services/rateLimitManager.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await rateLimits.__resetRateLimitManagerForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const ACCOUNT_HEADERS = {
  "anthropic-ratelimit-requests-limit": "100",
  "anthropic-ratelimit-requests-remaining": "90",
  "anthropic-ratelimit-requests-reset": new Date(Date.now() + 60_000).toISOString(),
  "anthropic-ratelimit-unified-5h-utilization": "42",
  "anthropic-organization-id": "org-anthropic-wiring",
};

function sseEvent(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function claudeStream(): string {
  return (
    sseEvent("message_start", {
      type: "message_start",
      message: {
        id: "msg_wiring",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-4-5",
        content: [],
        stop_reason: null,
        usage: { input_tokens: 3, output_tokens: 0 },
      },
    }) +
    sseEvent("content_block_start", {
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    }) +
    sseEvent("content_block_delta", {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "OK" },
    }) +
    sseEvent("content_block_stop", { type: "content_block_stop", index: 0 }) +
    sseEvent("message_delta", {
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: { output_tokens: 1 },
    }) +
    sseEvent("message_stop", { type: "message_stop" })
  );
}

function claudeJson(): string {
  return JSON.stringify({
    id: "msg_wiring",
    type: "message",
    role: "assistant",
    model: "claude-sonnet-4-5",
    content: [{ type: "text", text: "OK" }],
    stop_reason: "end_turn",
    usage: { input_tokens: 3, output_tokens: 1 },
  });
}

async function invoke({
  stream,
  connectionId,
  apiKeyInfo,
}: {
  stream: boolean;
  connectionId: string;
  apiKeyInfo: Record<string, unknown> | null;
}) {
  globalThis.fetch = async () => {
    // Opt the connection into limit learning here: handleChatCore syncs the
    // connection's own (unset) rate-limit setting before dispatch.
    rateLimits.enableRateLimitProtection(connectionId);
    return new Response(stream ? claudeStream() : claudeJson(), {
      status: 200,
      headers: {
        "Content-Type": stream ? "text/event-stream" : "application/json",
        ...ACCOUNT_HEADERS,
      },
    });
  };
  const body = {
    model: "claude-sonnet-4-5",
    max_tokens: 32,
    messages: [{ role: "user", content: "hi" }],
    stream,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "claude", model: "claude-sonnet-4-5", extendedContext: false },
    credentials: { apiKey: "sk-ant-test", connectionId, providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: stream ? "text/event-stream" : "application/json",
        "content-type": "application/json",
      }),
    },
    apiKeyInfo,
    connectionId,
    userAgent: "unit-test",
  } as never);
  assert.equal(result.success, true, `handleChatCore failed: ${JSON.stringify(result.error)}`);
  // Drain the body so stream-side bookkeeping completes.
  await result.response.text();
  await flushAsyncSideEffects();
  return result.response.headers as Headers;
}

function learnedLimitFor(connectionId: string) {
  return Object.values(rateLimits.getLearnedLimits()).find(
    (entry) => (entry as { connectionId?: string }).connectionId === connectionId
  ) as { limit?: number } | undefined;
}

const STRIP_KEY = { id: "key-strip", name: "strip", anthropicRateLimitHeaders: "strip" };
const FORWARD_KEY = { id: "key-forward", name: "forward", anthropicRateLimitHeaders: "forward" };

test("streaming: a `strip` key does not receive the upstream Anthropic account headers", async () => {
  const headers = await invoke({ stream: true, connectionId: "conn-strip", apiKeyInfo: STRIP_KEY });
  assert.equal(headers.get("anthropic-ratelimit-requests-limit"), null);
  assert.equal(headers.get("anthropic-ratelimit-unified-5h-utilization"), null);
  assert.equal(headers.get("anthropic-organization-id"), null);
  // The learner reads the upstream Response, which the policy never touches.
  assert.equal(learnedLimitFor("conn-strip")?.limit, 100);
});

test("streaming: a `forward` key (the default) keeps receiving them", async () => {
  const headers = await invoke({
    stream: true,
    connectionId: "conn-forward",
    apiKeyInfo: FORWARD_KEY,
  });
  assert.equal(headers.get("anthropic-ratelimit-requests-limit"), "100");
  assert.equal(headers.get("anthropic-organization-id"), "org-anthropic-wiring");
});

test("non-streaming: the client response never carries upstream Anthropic account headers", async () => {
  for (const [connectionId, apiKeyInfo] of [
    ["conn-ns-strip", STRIP_KEY],
    ["conn-ns-forward", FORWARD_KEY],
  ] as const) {
    const headers = await invoke({ stream: false, connectionId, apiKeyInfo });
    assert.equal(headers.get("anthropic-ratelimit-requests-limit"), null, connectionId);
    assert.equal(headers.get("anthropic-organization-id"), null, connectionId);
  }
});
