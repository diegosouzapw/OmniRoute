// @ts-nocheck
// #2942 — persistent session for deepseek-web. Default (no config) keeps the legacy
// fresh-session-per-request behavior. With providerSpecificData.persistSession=true the
// executor reuses one upstream chat session across requests (keyed by userToken), does
// not delete it, and on a reused-session failure falls back to a fresh session + retries
// once. historyWindow is threaded into the prompt builder.
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

const OK_SSE = [
  "event: ready\n",
  'data: {"request_message_id":1,"response_message_id":2}\n',
  "\n",
  'data: {"v":{"response":{"message_id":2,"fragments":[{"id":1,"type":"RESPONSE","content":"Hi"}]}}}\n',
  "\n",
  'data: {"p":"response/status","o":"SET","v":"FINISHED"}\n',
  "\n",
  "event: close\n",
  'data: {"click_behavior":"none"}\n',
].join("");

/**
 * Mock the DeepSeek web API. `completionOutcomes` is consumed one per completion call:
 *   "ok"   -> 200 SSE stream
 *   "fail" -> 500 error
 * When exhausted, defaults to "ok".
 */
function installMock(completionOutcomes = []) {
  const original = globalThis.fetch;
  const calls = { create: 0, delete: 0, completion: 0, completionBodies: [] };
  let outcomeIdx = 0;
  dsMod.tokenCache?.clear();
  dsMod.sessionCache?.clear();

  globalThis.fetch = async (url, opts = {}) => {
    const u = String(url);
    if (u.includes("/users/current")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { token: "access-token-xyz" } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (u.includes("/chat_session/create")) {
      calls.create += 1;
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { chat_session: { id: `session-${calls.create}` } } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (u.includes("/chat_session/delete")) {
      calls.delete += 1;
      return new Response(JSON.stringify({ code: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (u.includes("/create_pow_challenge")) {
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { challenge: POW_CHALLENGE } } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (u.includes("/chat/completion")) {
      calls.completion += 1;
      try {
        calls.completionBodies.push(JSON.parse(opts.body));
      } catch {
        calls.completionBodies.push(null);
      }
      const outcome = completionOutcomes[outcomeIdx++] ?? "ok";
      if (outcome === "fail") {
        return new Response(JSON.stringify({ error: "server" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(new TextEncoder().encode(OK_SSE), {
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

async function run(executor, { persistSession, historyWindow, messages, token } = {}) {
  const providerSpecificData = {};
  if (persistSession !== undefined) providerSpecificData.persistSession = persistSession;
  if (historyWindow !== undefined) providerSpecificData.historyWindow = historyWindow;
  const result = await executor.execute({
    model: "default",
    body: { messages: messages ?? [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: token ?? "user-token-1", providerSpecificData },
    signal: AbortSignal.timeout(10000),
  });
  // drain so the stream-cleanup (delete) fires deterministically
  await result.response.text();
  return result;
}

test("default (no config): fresh session per request + deletes it", async () => {
  const mock = installMock();
  try {
    const executor = new DeepSeekWebExecutor();
    await run(executor, { token: "tkn-default" });
    await run(executor, { token: "tkn-default" });
    assert.equal(mock.calls.create, 2, "creates a fresh session each request");
    assert.ok(mock.calls.delete >= 1, "deletes the session (no persistence)");
  } finally {
    mock.restore();
  }
});

test("persistSession=true: reuses cached session across requests, does not delete", async () => {
  const mock = installMock();
  try {
    const executor = new DeepSeekWebExecutor();
    await run(executor, { persistSession: true, token: "tkn-persist" });
    await run(executor, { persistSession: true, token: "tkn-persist" });
    assert.equal(mock.calls.create, 1, "session created once and reused");
    assert.equal(mock.calls.delete, 0, "persistent session is not deleted");
  } finally {
    mock.restore();
  }
});

test("persistSession=true: reused-session failure falls back to a fresh session and retries once", async () => {
  // call 1 -> create+cache (ok). call 2 -> reuse cached -> completion 500 -> create fresh -> retry ok.
  const mock = installMock(["ok", "fail", "ok"]);
  try {
    const executor = new DeepSeekWebExecutor();
    const r1 = await run(executor, { persistSession: true, token: "tkn-heal" });
    assert.ok(r1.response.ok, "first call ok");
    const r2 = await run(executor, { persistSession: true, token: "tkn-heal" });
    assert.ok(r2.response.ok, "second call recovers via fresh-session retry");
    assert.equal(mock.calls.create, 2, "one initial + one fresh-session retry");
    assert.equal(mock.calls.completion, 3, "1 (call1) + 1 failed reuse + 1 retry");
  } finally {
    mock.restore();
  }
});

test("historyWindow is threaded into the completion prompt", async () => {
  const mock = installMock();
  try {
    const executor = new DeepSeekWebExecutor();
    await run(executor, {
      historyWindow: 10,
      token: "tkn-hist",
      messages: [
        { role: "user", content: "earlier-turn-marker" },
        { role: "assistant", content: "ack" },
        { role: "user", content: "latest-turn" },
      ],
    });
    const body = mock.calls.completionBodies[0];
    assert.ok(body.prompt.includes("earlier-turn-marker"), "earlier turn carried into prompt");
    assert.ok(body.prompt.includes("latest-turn"), "latest turn present");
  } finally {
    mock.restore();
  }
});
