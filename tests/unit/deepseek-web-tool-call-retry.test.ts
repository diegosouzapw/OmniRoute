// @ts-nocheck
// When DeepSeek's web session returns a reply where a `<tool...>` tag is present but the
// block is genuinely unparseable (even after salvageLeadingJsonObject's recovery — e.g. the
// JSON itself is truncated), execute() now retries with a brand-new session (bounded to
// MAX_TOOL_PARSE_ATTEMPTS) before giving up. This is the scraped-web-session equivalent of
// retrying a flaky upstream call, since unlike a real API this provider is non-deterministic
// enough that asking again usually just works.
import test from "node:test";
import assert from "node:assert/strict";

const dsMod = await import("../../open-sse/executors/deepseek-web.ts");
const { DeepSeekWebExecutor } = dsMod;

const POW_CHALLENGE = {
  algorithm: "DeepSeekHashV1",
  challenge: "311b26ae1e0fe7375e242958ce46db5552a6c67fea3f96880dcd846c63a74286",
  salt: "1122334455667788",
  signature: "sig123",
  difficulty: 1,
  expire_at: 1778891543095,
  expire_after: 300000,
  target_path: "/api/v0/chat/completion",
};

function sseWithContent(text) {
  return [
    "event: ready\n",
    'data: {"request_message_id":1,"response_message_id":2}\n',
    "\n",
    `data: ${JSON.stringify({ v: { response: { message_id: 2, fragments: [{ id: 1, type: "RESPONSE", content: text }] } } })}\n`,
    "\n",
    'data: {"p":"response/status","o":"SET","v":"FINISHED"}\n',
    "\n",
    "event: close\n",
    'data: {"click_behavior":"none"}\n',
  ].join("");
}

// installMock returns replies from `replies` in order, one per /chat/completion call — so
// the Nth upstream request (including retries) gets `replies[N-1]`.
function installMock(replies) {
  const original = globalThis.fetch;
  const calls = { completions: 0, sessionCreates: 0 };
  dsMod.tokenCache?.clear();
  dsMod.sessionCache?.clear();
  globalThis.fetch = async (url) => {
    const u = String(url);
    if (u.includes("/users/current"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { token: "access-token-xyz" } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    if (u.includes("/chat_session/create")) {
      calls.sessionCreates += 1;
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { chat_session: { id: `s-${calls.sessionCreates}` } } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (u.includes("/chat_session/delete"))
      return new Response(JSON.stringify({ code: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    if (u.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { challenge: POW_CHALLENGE } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    if (u.includes("/chat/completion")) {
      const text = replies[Math.min(calls.completions, replies.length - 1)];
      calls.completions += 1;
      return new Response(new TextEncoder().encode(sseWithContent(text)), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("not found", { status: 404 });
  };
  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
      dsMod.tokenCache?.clear();
      dsMod.sessionCache?.clear();
    },
  };
}

const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_weather",
      parameters: { type: "object", properties: { city: { type: "string" } } },
    },
  },
];

// Genuinely truncated — no balanced closing brace, so even salvageLeadingJsonObject cannot
// recover it. This is what a reply the retry must fix looks like.
const TRUNCATED = '<tool>{"name": "get_weather", "arguments": {"city": "Pa';
const GOOD_REPLY = '<tool>{"name": "get_weather", "arguments": {"city": "Paris"}}</tool>';

test("retries with a fresh session when the first reply's tool block is unparseable, and succeeds on the second attempt", async () => {
  const mock = installMock([TRUNCATED, GOOD_REPLY]);
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather in Paris?" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-retry-success" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    const choice = json.choices[0];
    assert.equal(choice.finish_reason, "tool_calls", "second attempt's valid reply must win");
    assert.equal(choice.message.tool_calls[0].function.name, "get_weather");
    assert.equal(mock.calls.completions, 2, "exactly one retry (2 completions total)");
    assert.equal(mock.calls.sessionCreates, 2, "retry uses a brand-new session, not the stale one");
  } finally {
    mock.restore();
  }
});

test("gives up after MAX_TOOL_PARSE_ATTEMPTS and returns the raw (still-tagged) content, not an infinite retry", async () => {
  const mock = installMock([TRUNCATED, TRUNCATED, TRUNCATED]);
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather?" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-retry-exhausted" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok, "still HTTP 200 — a best-effort text answer, not a hard failure");
    const json = JSON.parse(await result.response.text());
    const choice = json.choices[0];
    assert.equal(choice.finish_reason, "stop");
    assert.ok(!choice.message.tool_calls, "no tool_calls on an unrecoverable reply");
    assert.ok(
      choice.message.content.includes("<tool>"),
      "raw unparsed content is surfaced, not silently dropped"
    );
    assert.equal(mock.calls.completions, 2, "bounded to MAX_TOOL_PARSE_ATTEMPTS (2), never more");
  } finally {
    mock.restore();
  }
});

test("does not retry at all when the first reply parses cleanly (no wasted latency)", async () => {
  const mock = installMock([GOOD_REPLY, GOOD_REPLY, GOOD_REPLY]);
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather?" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-no-retry-needed" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].finish_reason, "tool_calls");
    assert.equal(mock.calls.completions, 1, "a clean first reply must not trigger any retry");
    assert.equal(mock.calls.sessionCreates, 1);
  } finally {
    mock.restore();
  }
});
