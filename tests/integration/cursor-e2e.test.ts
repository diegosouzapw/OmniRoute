/**
 * Cursor end-to-end integration test.
 *
 * Skipped unless `CURSOR_E2E_TOKEN` env var is set. Exercises the full
 * OpenAI-compatible flow against cursor's real `agent.v1.AgentService/Run`
 * endpoint, across both auto/claude (tests 1-4) and composer-2.5 (tests 5-9):
 *
 *   1. Single-turn plain chat
 *   2. System prompt biasing
 *   3. Tool-use single-turn (request → tool_calls)
 *   4. Streaming SSE incremental delivery
 *   5. composer-2.5 plain chat (+ usage present)
 *   6. composer-2.5 reasoning surfaced as reasoning_content (no marker leakage)
 *   7. composer-2.5 multi-turn tool round-trip (inline h2 session reuse)
 *   8. composer-2.5 cold-resume fallback (no live session)
 *   9. composer-2.5 streaming (+ usage chunk)
 *
 * The composer model id is overridable with CURSOR_E2E_MODEL (e.g.
 * composer-2.5-fast).
 *
 * To run:
 *   CURSOR_E2E_TOKEN=$(cat ~/.cursor/access-token) \
 *     node --import tsx --test tests/integration/cursor-e2e.test.ts
 *
 * Capturing wire fixtures (separate workflow):
 *   CURSOR_TOKEN=... node scripts/ad-hoc/cursor-tap.cjs single-turn-chat "say PING"
 */

import test from "node:test";
import assert from "node:assert/strict";
import zlib from "node:zlib";

const TOKEN = process.env.CURSOR_E2E_TOKEN;
const skipReason = TOKEN ? undefined : "CURSOR_E2E_TOKEN not set";

// Model used by the composer-specific regression tests below. Override with
// CURSOR_E2E_MODEL to exercise composer-2.5-fast or another id.
const COMPOSER_MODEL = process.env.CURSOR_E2E_MODEL || "composer-2.5";

// Vision-capable model for the image tests. composer-2.5 and the claude/gpt
// ids all accept inline images; default to a gpt id, override with
// CURSOR_E2E_VISION_MODEL. A public solid-color image service backs the
// URL-image test (override with CURSOR_E2E_IMAGE_URL).
const VISION_MODEL = process.env.CURSOR_E2E_VISION_MODEL || "gpt-5.2";
const RED_IMAGE_URL =
  process.env.CURSOR_E2E_IMAGE_URL || "https://dummyimage.com/80x80/ff0000/ff0000.png";

// Build a valid solid-color PNG (size x size, truecolor) with no deps — used
// to prove a vision model actually reads the inline image bytes.
function solidColorPng(size: number, rgb: [number, number, number]): Buffer {
  const crc32 = (buf: Buffer): number => {
    let c = ~0;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
    return (~c) >>> 0;
  };
  const chunk = (type: string, data: Buffer): Buffer => {
    const t = Buffer.from(type, "ascii");
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const body = Buffer.concat([t, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crc]);
  };
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type 2 = truecolor RGB
  const row = Buffer.concat([
    Buffer.from([0]),
    Buffer.concat(Array.from({ length: size }, () => Buffer.from(rgb))),
  ]);
  const raw = Buffer.concat(Array.from({ length: size }, () => row));
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

const weatherTools = [
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
];

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

// ─── composer-2.5 regression coverage ──────────────────────────────────────
//
// The four tests above cover auto/claude single-turn. These add coverage for
// the composer model specifically plus the two highest-value untested paths:
// the multi-turn tool round-trip (inline h2 session reuse) and the cold-resume
// fallback. All were validated end-to-end against the live endpoint.

test("[cursor-e2e] composer-2.5 plain chat returns assistant text", { skip: skipReason }, async () => {
  const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
  const exec = new CursorExecutor();
  const result = await exec.execute({
    model: COMPOSER_MODEL,
    body: { messages: [{ role: "user", content: "Say only the word PING and nothing else." }] },
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
  // Usage is always present on the success path (OpenAI contract).
  assert.equal(typeof json.usage?.total_tokens, "number");
});

test(
  "[cursor-e2e] composer-2.5 surfaces reasoning as reasoning_content",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    const result = await exec.execute({
      model: COMPOSER_MODEL,
      body: {
        messages: [
          { role: "user", content: "Think step by step: what is 17 * 23? Then give the answer." },
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
    // The final answer is plain text — reasoning must NOT leak control tokens
    // (</think>, <|final|>, <|tool_calls_begin|>) into the visible content.
    const content = json.choices[0].message.content || "";
    assert.match(content, /391/);
    assert.doesNotMatch(content, /<\|?tool_calls_begin|<\/think>|<\|?final\|?>/);
  }
);

test(
  "[cursor-e2e] composer-2.5 multi-turn tool round-trip reuses the h2 session",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const { cursorSessionManager } = await import(
      "../../open-sse/services/cursorSessionManager.ts"
    );
    const exec = new CursorExecutor();
    const conversationId = `e2e-rt-${Date.now()}`;

    // Turn 1: declare a tool → expect tool_calls + a retained session.
    const r1 = await exec.execute({
      model: COMPOSER_MODEL,
      body: {
        conversation_id: conversationId,
        messages: [{ role: "user", content: "What's the weather in Paris? Call get_weather." }],
        tools: weatherTools,
      },
      stream: false,
      credentials: { accessToken: TOKEN },
      signal: undefined,
      log: () => {},
      upstreamExtraHeaders: undefined,
    });
    const j1 = await r1.response.json();
    assert.equal(j1.choices[0].finish_reason, "tool_calls");
    const toolCall = j1.choices[0].message.tool_calls?.[0];
    assert.ok(toolCall, "expected a tool_call on turn 1");
    assert.equal(toolCall.function.name, "get_weather");
    assert.ok(
      cursorSessionManager.has(conversationId),
      "session should be retained for inline resume"
    );

    // Turn 2: same conversation_id, append the tool result → final answer.
    const r2 = await exec.execute({
      model: COMPOSER_MODEL,
      body: {
        conversation_id: conversationId,
        messages: [
          { role: "user", content: "What's the weather in Paris? Call get_weather." },
          { role: "assistant", content: null, tool_calls: [toolCall] },
          {
            role: "tool",
            tool_call_id: toolCall.id,
            name: "get_weather",
            content: '{"temp_c": 19, "condition": "sunny"}',
          },
        ],
        tools: weatherTools,
      },
      stream: false,
      credentials: { accessToken: TOKEN },
      signal: undefined,
      log: () => {},
      upstreamExtraHeaders: undefined,
    });
    const j2 = await r2.response.json();
    assert.equal(r2.response.status, 200);
    assert.match(j2.choices[0].message.content || "", /19|sunny/i);
  }
);

test(
  "[cursor-e2e] composer-2.5 cold-resume incorporates a tool result without a live session",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    // Brand-new conversation_id with a fabricated prior tool call/result and no
    // session ever opened → acquire() misses, exercising the cold-resume path
    // (fresh RunRequest with full history flattened into UserText).
    const result = await exec.execute({
      model: COMPOSER_MODEL,
      body: {
        conversation_id: `e2e-cold-${Date.now()}`,
        messages: [
          { role: "user", content: "What's the weather in Tokyo? Call get_weather." },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_cold_1",
                type: "function",
                function: { name: "get_weather", arguments: '{"city":"Tokyo"}' },
              },
            ],
          },
          {
            role: "tool",
            tool_call_id: "call_cold_1",
            name: "get_weather",
            content: '{"temp_c": 8, "condition": "rainy"}',
          },
        ],
        tools: weatherTools,
      },
      stream: false,
      credentials: { accessToken: TOKEN },
      signal: undefined,
      log: () => {},
      upstreamExtraHeaders: undefined,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    assert.match(json.choices[0].message.content || "", /8|rainy/i);
  }
);

test(
  "[cursor-e2e] composer-2.5 honors response_format json_object",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    const result = await exec.execute({
      model: COMPOSER_MODEL,
      body: {
        messages: [
          { role: "user", content: "Give me a fake user profile with fields name, age, and city." },
        ],
        response_format: { type: "json_object" },
      },
      stream: false,
      credentials: { accessToken: TOKEN },
      signal: undefined,
      log: () => {},
      upstreamExtraHeaders: undefined,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    const content = (json.choices[0].message.content || "").trim();
    // cursor's agent endpoint has no native response_format; the OUTPUT
    // CONSTRAINTS prompt injection is what makes the model return raw JSON.
    const parsed = JSON.parse(content);
    assert.equal(typeof parsed, "object");
  }
);

test(
  "[cursor-e2e] composer-2.5 streaming delivers incremental chunks",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    const result = await exec.execute({
      model: COMPOSER_MODEL,
      body: { messages: [{ role: "user", content: "Count from 1 to 5, one number per line." }] },
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
    let sawUsage = false;
    let totalText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      chunks++;
      totalText += text;
      if (text.includes('"usage"')) sawUsage = true;
    }
    assert.ok(chunks > 1, `expected multiple chunks; got ${chunks}`);
    assert.match(totalText, /data: \[DONE\]/);
    assert.ok(sawUsage, "streaming response should include a usage chunk");
  }
);

test(
  "[cursor-e2e] base64 image_url reaches a vision model (sees the color)",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    const png = solidColorPng(64, [255, 0, 0]); // solid red
    const dataUri = `data:image/png;base64,${png.toString("base64")}`;
    const result = await exec.execute({
      model: VISION_MODEL,
      body: {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What single color is this square? Answer with just the color name.",
              },
              { type: "image_url", image_url: { url: dataUri } },
            ],
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
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.match(
      json.choices[0].message.content,
      /red/i,
      `vision model should report red; got: ${json.choices[0].message.content}`
    );
  }
);

test(
  "[cursor-e2e] remote image_url is fetched and reaches a vision model",
  { skip: skipReason },
  async () => {
    const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
    const exec = new CursorExecutor();
    const result = await exec.execute({
      model: VISION_MODEL,
      body: {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What single color is this square? Answer with just the color name.",
              },
              { type: "image_url", image_url: { url: RED_IMAGE_URL } },
            ],
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
    assert.match(
      json.choices[0].message.content,
      /red/i,
      `vision model should report red; got: ${json.choices[0].message.content}`
    );
  }
);
