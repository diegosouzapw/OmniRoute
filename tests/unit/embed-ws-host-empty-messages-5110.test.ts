import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Regression tests for #5110 — two independent Docker/headless deployment bugs:
//
//  Issue 1) The Live/embed WebSocket proxy binds 127.0.0.1 only and ignores
//           LIVE_WS_HOST. Behind a reverse proxy/tunnel it can never be reached,
//           so the dashboard shows "Live disabled — WebSocket disconnected"
//           even with LIVE_WS_HOST=0.0.0.0 set. The embed proxy read only
//           EMBED_WS_PROXY_HOST; it now falls back to LIVE_WS_HOST.
//
//  Issue 4) A request with `messages: []` (empty array) was forwarded upstream,
//           which Anthropic rejects with a raw "[400]: messages: at least one
//           message is required". OmniRoute now rejects it early with a clear
//           OmniRoute-level 400 before any upstream call.

// ── Issue 1: embed WS bind host honours LIVE_WS_HOST ──────────────────────────
test("#5110-1: resolveEmbedWsHost prefers EMBED_WS_PROXY_HOST, then LIVE_WS_HOST, then loopback", async () => {
  const { resolveEmbedWsHost } = await import("../../src/lib/services/embedWsProxy.ts");
  const prevEmbed = process.env.EMBED_WS_PROXY_HOST;
  const prevLive = process.env.LIVE_WS_HOST;
  try {
    delete process.env.EMBED_WS_PROXY_HOST;
    delete process.env.LIVE_WS_HOST;
    assert.equal(resolveEmbedWsHost(), "127.0.0.1", "default stays loopback for safety");

    process.env.LIVE_WS_HOST = "0.0.0.0";
    assert.equal(
      resolveEmbedWsHost(),
      "0.0.0.0",
      "LIVE_WS_HOST should control the embed WS bind when EMBED_WS_PROXY_HOST is unset"
    );

    process.env.EMBED_WS_PROXY_HOST = "10.0.0.5";
    assert.equal(
      resolveEmbedWsHost(),
      "10.0.0.5",
      "EMBED_WS_PROXY_HOST still wins when both are set"
    );
  } finally {
    if (prevEmbed === undefined) delete process.env.EMBED_WS_PROXY_HOST;
    else process.env.EMBED_WS_PROXY_HOST = prevEmbed;
    if (prevLive === undefined) delete process.env.LIVE_WS_HOST;
    else process.env.LIVE_WS_HOST = prevLive;
  }
});

// ── Issue 4: empty messages array rejected early with a clear 400 ─────────────
const harness = await createChatPipelineHarness("chat-empty-messages-5110");
const { handleChat, buildRequest, resetStorage, seedConnection } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("#5110-4: an empty messages array is rejected with a clear 400 before hitting upstream", async () => {
  await seedConnection("anthropic", { apiKey: "sk-ant" });

  let upstreamCalled = false;
  globalThis.fetch = async () => {
    upstreamCalled = true;
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/messages",
      body: {
        model: "anthropic/claude-haiku-4-5",
        max_tokens: 100,
        system: "You are helpful.",
        messages: [],
      },
    })
  );

  assert.equal(response.status, 400, "empty messages must be a 400, not a forwarded upstream error");
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(
    body.error?.message ?? "",
    /at least one message is required/i,
    "error should clearly state messages must be non-empty"
  );
  assert.equal(upstreamCalled, false, "must not forward an empty-messages request upstream");
});

test("#5110-4: a non-empty messages array still routes normally (guard is not over-broad)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai" });

  let upstreamCalled = false;
  globalThis.fetch = async () => {
    upstreamCalled = true;
    return Response.json({
      id: "x",
      object: "chat.completion",
      choices: [{ index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
    });
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "Hello" }],
      },
    })
  );

  assert.notEqual(response.status, 400, "a valid request must not be caught by the empty guard");
  assert.equal(upstreamCalled, true, "a valid request must still reach upstream");
});
