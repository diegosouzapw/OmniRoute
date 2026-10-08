// @ts-nocheck
// deepseek-web's non-stream/tool-call path (collectSSEContent) drains the upstream SSE
// body and returns whatever content it collected once the reader reports `done` — with
// no check that DeepSeek actually signalled completion via `response/status: "FINISHED"`.
// When the upstream cookie session drops mid-generation (expired session, anti-bot
// challenge, network interruption), the HTTP body simply closes early. Before this fix,
// that premature close was indistinguishable from a real completion: execute() returned
// HTTP 200 with `finish_reason: "stop"` and whatever partial stub text had arrived so far
// (observed in production: a lone "I'll check that..." with no continuation). The caller
// has no way to know the task was never actually finished, so it looks like the model just
// stopped mid-task.
//
// Fix: collectSSEContent now tracks whether the FINISHED status event was seen. If the
// stream ends without it, it throws instead of returning the stub — execute()'s existing
// try/catch turns that into a proper 502 the client (or a combo's retry/fallback logic)
// can react to.
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

// Same shape as a real completion, but the upstream body closes right after the partial
// text fragment — no `response/status: "FINISHED"` line ever arrives. This is what a
// dropped cookie session / anti-bot cutoff / network interruption looks like on the wire.
function sseWithPrematureClose(text) {
  return [
    "event: ready\n",
    'data: {"request_message_id":1,"response_message_id":2}\n',
    "\n",
    `data: ${JSON.stringify({ v: { response: { message_id: 2, fragments: [{ id: 1, type: "RESPONSE", content: text }] } } })}\n`,
    "\n",
    // (no response/status FINISHED event, no close event — body just ends here)
  ].join("");
}

function sseWithFinished(text) {
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

function installMock(sseBody) {
  const original = globalThis.fetch;
  dsMod.tokenCache?.clear();
  dsMod.sessionCache?.clear();
  globalThis.fetch = async (url, _opts = {}) => {
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
      return new Response(new TextEncoder().encode(sseBody), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("not found", { status: 404 });
  };
  return {
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

test("execute (tools[], non-stream) returns an error instead of a silent partial stub when the upstream session drops before FINISHED", async () => {
  const mock = installMock(sseWithPrematureClose("I'll check the weather for you..."));
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "weather in Paris?" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-premature-close" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(
      result.response.status,
      502,
      "a session that closes before FINISHED must surface as an error, not HTTP 200"
    );
    const body = await result.response.text();
    assert.ok(
      /finished|premature|dropped|retry/i.test(body),
      "error message should explain the session ended before completion"
    );
  } finally {
    mock.restore();
  }
});

test("execute (tools[], non-stream) still succeeds normally when FINISHED is received", async () => {
  const mock = installMock(sseWithFinished("Just a normal answer, no tool needed."));
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-normal-finish" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.choices[0].message.content.includes("normal answer"));
  } finally {
    mock.restore();
  }
});
