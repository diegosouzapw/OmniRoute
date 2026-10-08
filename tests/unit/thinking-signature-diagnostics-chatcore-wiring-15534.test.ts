// @ts-nocheck
// #15534 — handleChatCore must forward the pipeline's onSignatureFailure hook so an
// Anthropic invalid-signature 400 emits exactly one bounded THINKING_SIGNATURE event
// on both the streaming and the non-streaming legs (no payload text in the event).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sig-diag-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const SECRET_THINKING = "private chain of thought 15534";

function captureLog() {
  const warnings = [];
  return {
    warnings,
    log: {
      debug() {},
      info() {},
      warn(tag, message) {
        warnings.push({ tag, message });
      },
      error() {},
    },
  };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function okResponse(stream) {
  if (stream) {
    const events = [
      {
        type: "message_start",
        message: {
          id: "msg_ok",
          type: "message",
          role: "assistant",
          model: "claude-opus-5",
          content: [],
          usage: { input_tokens: 4, output_tokens: 0 },
        },
      },
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "OK" } },
      { type: "content_block_stop", index: 0 },
      {
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 1 },
      },
      { type: "message_stop" },
    ];
    const text = events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
    return new Response(text, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  }
  return new Response(
    JSON.stringify({
      id: "msg_ok",
      type: "message",
      role: "assistant",
      model: "claude-opus-5",
      content: [{ type: "text", text: "OK" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 4, output_tokens: 1 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

async function runSignatureFailure(stream) {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    if (calls === 1) {
      return new Response(
        JSON.stringify({
          type: "error",
          error: {
            type: "invalid_request_error",
            message: "messages.1.content.0: Invalid `signature` in `thinking` block",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return okResponse(stream);
  };

  const body = {
    model: "claude-opus-5",
    max_tokens: 64,
    messages: [
      { role: "user", content: "q1" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: SECRET_THINKING, signature: "SIG_FOREIGN_15534" },
          { type: "text", text: "a1" },
        ],
      },
      { role: "user", content: "q2" },
    ],
    stream,
  };

  const { warnings, log } = captureLog();
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "claude", model: "claude-opus-5", extendedContext: false },
    credentials: { apiKey: "test-claude-key", providerSpecificData: {} },
    log,
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: stream ? "text/event-stream" : "application/json",
        "content-type": "application/json",
        "user-agent": "claude-code/2.1.154",
      }),
    },
    userAgent: "claude-code/2.1.154",
  });
  if (stream && result?.response?.body) await result.response.text();
  return { calls, result, events: warnings.filter((w) => w.tag === "THINKING_SIGNATURE") };
}

for (const stream of [false, true]) {
  test(`handleChatCore (stream=${stream}) emits one bounded THINKING_SIGNATURE event`, async () => {
    const { calls, result, events } = await runSignatureFailure(stream);
    assert.equal(calls, 2, "one recovery send after the signature 400");
    assert.equal(result.success, true);
    assert.equal(events.length, 1, "exactly one diagnostics event per signature failure");
    const event = JSON.parse(events[0].message);
    assert.equal(event.provider, "claude");
    assert.equal(event.status, 400);
    assert.equal(event.recoveryAttempted, true);
    assert.equal(event.recoverySucceeded, true);
    assert.ok(!events[0].message.includes(SECRET_THINKING), "event must not carry thinking text");
    assert.ok(!events[0].message.includes("SIG_FOREIGN_15534"), "event must not carry signatures");
  });
}
