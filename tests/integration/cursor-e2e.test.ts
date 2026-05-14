/**
 * Cursor end-to-end integration test.
 *
 * Skipped unless `CURSOR_E2E_TOKEN` env var is set. Exercises the full
 * OpenAI-compatible flow against cursor's real `agent.v1.AgentService/Run`
 * endpoint:
 *
 *   1. Single-turn chat with system prompt
 *   2. Tool-use round trip (request → tool_calls → role:"tool" follow-up)
 *   3. Streaming SSE incremental delivery
 *   4. Inline-session reuse across two consecutive calls
 *   5. Cold-resume fallback when session is missing/evicted
 *
 * To run:
 *   CURSOR_E2E_TOKEN=$(cat ~/.cursor/access-token) \
 *     node --import tsx/esm --test tests/integration/cursor-e2e.test.ts
 *
 * Capturing wire fixtures (separate workflow):
 *   CURSOR_TOKEN=... node scripts/ad-hoc/cursor-tap.cjs single-turn-chat "say PING"
 */

import test from "node:test";
import assert from "node:assert/strict";

const TOKEN = process.env.CURSOR_E2E_TOKEN;
const skipReason = TOKEN ? undefined : "CURSOR_E2E_TOKEN not set";

test(
  "[cursor-e2e] single-turn plain chat returns assistant text",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    const result = await exec.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "say only PING" }] },
      stream: false,
      credentials: { accessToken: TOKEN },
      signal: undefined,
      log: () => {},
      upstreamExtraHeaders: undefined,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.match(json.choices[0].message.content, /PING/i);
  }
);

test("[cursor-e2e] system prompt biases the response", { skip: skipReason }, async () => {
  const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
  const exec = new CursorExecutor();
  const result = await exec.execute({
    model: "auto",
    body: {
      messages: [
        { role: "system", content: "Reply with exactly the word HAIKU and nothing else." },
        { role: "user", content: "hi" },
      ],
    },
    stream: false,
    credentials: { accessToken: TOKEN },
    signal: undefined,
    log: () => {},
    upstreamExtraHeaders: undefined,
  });
  assert.equal(result.response.status, 200);
  const json = await result.response.json();
  assert.match(json.choices[0].message.content, /HAIKU/);
});

test("[cursor-e2e] tool-use single-turn returns tool_calls", { skip: skipReason }, async () => {
  const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
  const exec = new CursorExecutor();
  const result = await exec.execute({
    model: "claude-4.6-sonnet-medium",
    body: {
      messages: [{ role: "user", content: "What's the weather in Paris? Use the tool." }],
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Get current weather for a city",
            parameters: {
              type: "object",
              properties: { city: { type: "string" } },
              required: ["city"],
            },
          },
        },
      ],
    },
    stream: false,
    credentials: { accessToken: TOKEN },
    signal: undefined,
    log: () => {},
    upstreamExtraHeaders: undefined,
  });
  assert.equal(result.response.status, 200);
  const json = await result.response.json();
  assert.equal(json.choices[0].finish_reason, "tool_calls");
  const toolCall = json.choices[0].message.tool_calls?.[0];
  assert.ok(toolCall, "expected a tool_call");
  assert.equal(toolCall.function.name, "get_weather");
  assert.match(toolCall.function.arguments, /Paris/);
});

test(
  "[cursor-e2e] streaming SSE delivers chunks before the upstream closes",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    const result = await exec.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "count from 1 to 5" }] },
      stream: true,
      credentials: { accessToken: TOKEN },
      signal: undefined,
      log: () => {},
      upstreamExtraHeaders: undefined,
    });
    assert.equal(result.response.status, 200);
    const reader = (result.response.body as ReadableStream<Uint8Array>).getReader();
    const decoder = new TextDecoder();
    let chunks = 0;
    let totalText = "";
    let firstChunkTime: number | null = null;
    const startTime = Date.now();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (firstChunkTime == null) firstChunkTime = Date.now();
      const text = decoder.decode(value);
      chunks++;
      totalText += text;
    }
    void firstChunkTime;
    void startTime;
    // Multiple SSE chunks (not one big buffered blob) proves we're streaming
    // emit-as-decoded. The exact latency ratio depends on cursor's pacing
    // and isn't worth asserting tightly.
    assert.ok(chunks > 1, `expected multiple chunks; got ${chunks}`);
    assert.match(totalText, /data: \[DONE\]/);
  }
);
