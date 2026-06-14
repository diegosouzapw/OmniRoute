// @ts-nocheck
// #2820 — deepseek-web execute() now translates tool calls instead of 400-ing on tools[].
// Request: the OpenAI tools[] is serialized into the prompt. Response: the upstream
// <tool>{...}</tool> text is parsed into OpenAI tool_calls with finish_reason "tool_calls".
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

function installMock(completionText) {
  const original = globalThis.fetch;
  const calls = { completionBodies: [] };
  dsMod.tokenCache?.clear();
  dsMod.sessionCache?.clear();
  globalThis.fetch = async (url, opts = {}) => {
    const u = String(url);
    if (u.includes("/users/current"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { token: "access-token-xyz" } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    if (u.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s-1" } } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
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
      try {
        calls.completionBodies.push(JSON.parse(opts.body));
      } catch {
        calls.completionBodies.push(null);
      }
      return new Response(new TextEncoder().encode(sseWithContent(completionText)), {
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
      description: "Get weather",
      parameters: { type: "object", properties: { city: { type: "string" } } },
    },
  },
];

const TOOL_REPLY = '<tool>{"name": "get_weather", "arguments": {"city": "Paris"}}</tool>';

test("execute with tools[] no longer returns 400 and serializes tools into the prompt", async () => {
  const mock = installMock(TOOL_REPLY);
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather in Paris?" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-tools" },
      signal: AbortSignal.timeout(10000),
    });
    assert.notEqual(result.response.status, 400, "tools[] must not hard-fail anymore");
    const body = mock.calls.completionBodies[0];
    assert.ok(body.prompt.includes("get_weather"), "tool schema serialized into prompt");
  } finally {
    mock.restore();
  }
});

test("execute (non-stream) parses <tool> reply into OpenAI tool_calls", async () => {
  const mock = installMock(TOOL_REPLY);
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather?" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-tools-ns" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    const choice = json.choices[0];
    assert.equal(choice.finish_reason, "tool_calls");
    assert.equal(choice.message.tool_calls.length, 1);
    assert.equal(choice.message.tool_calls[0].function.name, "get_weather");
    assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), { city: "Paris" });
    assert.ok(
      !String(choice.message.content || "").includes("<tool>"),
      "raw tool block stripped from content"
    );
  } finally {
    mock.restore();
  }
});

test("execute (non-stream) parses bare JSON reply into OpenAI tool_calls", async () => {
  const mock = installMock('{"name":"getWeather","arguments":{"city":"Paris"}}');
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather?" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-tools-bare-json" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    const choice = json.choices[0];
    assert.equal(choice.finish_reason, "tool_calls");
    assert.equal(choice.message.tool_calls.length, 1);
    assert.equal(choice.message.tool_calls[0].function.name, "get_weather");
    assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), { city: "Paris" });
    assert.equal(choice.message.content, null, "bare JSON tool call is stripped from content");
  } finally {
    mock.restore();
  }
});

test("execute (stream) emits tool_calls + finish_reason tool_calls in the SSE", async () => {
  const mock = installMock(TOOL_REPLY);
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather?" }], tools: TOOLS },
      stream: true,
      credentials: { apiKey: "tkn-tools-stream" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const text = await result.response.text();
    assert.ok(text.includes("tool_calls"), "stream carries tool_calls");
    assert.ok(text.includes("get_weather"), "stream carries the tool name");
    assert.ok(text.includes('"finish_reason":"tool_calls"'), "finish_reason tool_calls");
    assert.ok(text.includes("[DONE]"), "stream terminates");
  } finally {
    mock.restore();
  }
});

test("execute with tools[] but a plain reply still returns normal content", async () => {
  const mock = installMock("Just a normal answer, no tool needed.");
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-tools-plain" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.choices[0].message.content.includes("normal answer"));
    assert.ok(!json.choices[0].message.tool_calls, "no tool_calls on a plain reply");
  } finally {
    mock.restore();
  }
});
