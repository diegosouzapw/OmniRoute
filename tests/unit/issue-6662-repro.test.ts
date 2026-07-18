import { describe, it, mock, afterEach } from "node:test";
import assert from "node:assert/strict";

// Repro for #6662: reasoning_content dropped from /v1/chat/completions SSE
// deltas on the v0-vercel-web and claude-web executors.
//
// v0-vercel-web: its upstream (v0.dev/api/chat) speaks an OpenAI-compatible
// SSE format. When the upstream chunk carries `delta.reasoning_content`
// (as OpenAI-compatible reasoning-capable backends do — see the DeepSeek
// pattern already handled at open-sse/executors/deepseek-web.ts:221), the
// v0 executor's stream transform only ever reads `delta?.content` and
// silently drops any `reasoning_content` field instead of forwarding it.
//
// claude-web: its upstream (claude.ai's real chat_conversations/.../completion
// endpoint) speaks the native Anthropic SSE shape — `content_block_delta`
// events with `delta.type === "thinking_delta"` / `delta.thinking` for
// extended-thinking text (the same shape the real-Anthropic-API translator
// at open-sse/translator/response/claude-to-openai.ts already maps to
// `reasoning_content`). Before the fix, `buildClaudeStreamingResponse` in
// open-sse/executors/claude-web.ts only ever read `delta.text`, so any
// `thinking_delta` event was silently dropped instead of forwarded.

const mod = await import("../../open-sse/executors/v0-vercel-web.ts");
const { ClaudeWebExecutor } = await import("../../open-sse/executors/claude-web.ts");
const { __setTlsFetchOverrideForTesting } = await import(
  "../../open-sse/services/claudeTlsClient.ts"
);

function sseUpstream(events: string[]): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const e of events) {
        controller.enqueue(encoder.encode(`data: ${e}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

describe("#6662 repro — v0-vercel-web drops reasoning_content", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("forwards reasoning_content deltas from the upstream SSE stream (RED on current code)", async () => {
    const upstreamEvents = [
      JSON.stringify({
        choices: [{ delta: { reasoning_content: "Let me think about 17*23..." } }],
      }),
      JSON.stringify({
        choices: [{ delta: { content: "391" } }],
      }),
    ];

    globalThis.fetch = mock.fn(async () => sseUpstream(upstreamEvents)) as unknown as typeof fetch;

    const executor = new mod.V0VercelWebExecutor();
    const result = await executor.execute({
      model: "v0-default",
      body: { messages: [{ role: "user", content: "Solve 17*23" }] },
      stream: true,
      credentials: { apiKey: "fake-cookie" },
      signal: null,
    });

    assert.ok(result.response instanceof Response);
    const text = await result.response.text();

    assert.ok(
      text.includes("reasoning_content"),
      `expected translated SSE stream to carry a reasoning_content field, got:\n${text}`
    );
  });
});

describe("#6662 repro — claude-web drops thinking_delta reasoning_content", () => {
  afterEach(() => {
    __setTlsFetchOverrideForTesting(null);
  });

  function claudeSseStream(events: Array<Record<string, unknown>>): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder();
    return new ReadableStream<Uint8Array>({
      start(controller) {
        for (const e of events) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(e)}\n\n`));
        }
        controller.close();
      },
    });
  }

  it("forwards thinking_delta text as reasoning_content in the translated SSE stream (RED on current code)", async () => {
    const upstreamEvents = [
      { type: "message_start", message: { id: "msg_1", model: "claude-sonnet-4-6" } },
      { type: "content_block_start", index: 0, content_block: { type: "thinking" } },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "thinking_delta", thinking: "Let me think about 17*23..." },
      },
      { type: "content_block_stop", index: 0 },
      { type: "content_block_start", index: 1, content_block: { type: "text" } },
      { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "391" } },
      { type: "content_block_stop", index: 1 },
      { type: "message_delta", delta: { stop_reason: "end_turn" } },
      { type: "message_stop" },
    ];

    __setTlsFetchOverrideForTesting(async () => ({
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: claudeSseStream(upstreamEvents),
    }));

    const executor = new ClaudeWebExecutor();
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "Solve 17*23" }] },
      stream: true,
      credentials: {
        // cf_clearance present up front so normalizeClaudeSessionCookieWithAutoRefresh
        // takes the fast path and never attempts a real Turnstile solve in-test.
        apiKey: "sessionKey=fake-session; cf_clearance=fake-clearance",
        orgId: "org-test",
        conversationId: "conv-test",
      },
      signal: null,
    });

    assert.ok(result.response instanceof Response);
    const text = await result.response.text();

    assert.ok(
      text.includes("reasoning_content"),
      `expected translated SSE stream to carry a reasoning_content field, got:\n${text}`
    );
    assert.ok(
      text.includes("Let me think about 17*23"),
      `expected the thinking text to be forwarded, got:\n${text}`
    );
  });
});
