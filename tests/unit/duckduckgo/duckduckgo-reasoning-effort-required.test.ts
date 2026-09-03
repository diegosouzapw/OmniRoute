import { test } from "node:test";
import assert from "node:assert/strict";

import { DuckDuckGoWebExecutor } from "../../../open-sse/executors/duckduckgo-web.ts";

/**
 * Regression: duckchat/v1/chat now REQUIRES a `reasoningEffort` field.
 *
 * The executor previously omitted it for most models on the assumption that the
 * upstream would apply its own default. It does not: an otherwise byte-identical
 * payload returns 200 with the field and 400 ERR_BAD_REQUEST without it
 * (A/B verified live against duck.ai, repeated). The live duck.ai bundle always
 * sends one, so every outgoing payload must carry it.
 *
 * These tests capture the executor's real outgoing request body by stubbing
 * fetch, so they assert on the wire format rather than on internal helpers.
 */

type Captured = { url: string; body: Record<string, unknown> };

async function captureChatPayload(model: string): Promise<Captured> {
  const realFetch = globalThis.fetch;
  const captured: Captured[] = [];

  globalThis.fetch = (async (input: unknown, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : String((input as { url?: string })?.url ?? "");

    if (url.includes("/duckchat/v1/status")) {
      // Hand back a trivially solvable challenge so the executor proceeds to the
      // chat POST without touching the network.
      const challenge = Buffer.from(
        `(async function(){ return { server_hashes: [], client_hashes: ["ua"], signals: {}, meta: {} }; })()`,
        "utf8"
      ).toString("base64");
      return new Response("{}", { status: 200, headers: { "x-vqd-hash-1": challenge } });
    }

    if (url.includes("/duckchat/v1/chat")) {
      captured.push({ url, body: JSON.parse(String(init.body)) });
      return new Response(`data: {"action":"success","message":"OK"}\n\ndata: [DONE]\n\n`, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    // Warm-up fetches (homepage, country.json, auth/token).
    return new Response("", { status: 200 });
  }) as typeof globalThis.fetch;

  try {
    const executor = new DuckDuckGoWebExecutor();
    await executor.execute({
      model,
      body: { messages: [{ role: "user", content: "Say OK" }] },
      stream: false,
    } as never);
  } finally {
    globalThis.fetch = realFetch;
  }

  assert.ok(captured.length > 0, "executor never issued a chat request");
  return captured[captured.length - 1];
}

test("chat payload always carries reasoningEffort", async () => {
  const { body } = await captureChatPayload("duckduckgo-web/gpt-4o-mini");
  assert.ok(
    Object.prototype.hasOwnProperty.call(body, "reasoningEffort"),
    "omitting reasoningEffort yields 400 ERR_BAD_REQUEST upstream"
  );
  assert.equal(typeof body.reasoningEffort, "string");
  assert.notEqual(body.reasoningEffort, "");
});

test("default models send reasoningEffort 'none'", async () => {
  const { body } = await captureChatPayload("duckduckgo-web/gpt-5.4-mini");
  assert.equal(body.model, "gpt-5.4-mini");
  assert.equal(body.reasoningEffort, "none");
});

test("reasoning models keep their 'low' effort", async () => {
  const haiku = await captureChatPayload("duckduckgo-web/claude-haiku-4-5");
  assert.equal(haiku.body.model, "claude-haiku-4-5");
  assert.equal(haiku.body.reasoningEffort, "low");

  const oss = await captureChatPayload("duckduckgo-web/gpt-oss-120b");
  assert.equal(oss.body.model, "tinfoil/gpt-oss-120b");
  assert.equal(oss.body.reasoningEffort, "low");
});

test("retired model ids are still aliased to live wire ids", async () => {
  const { body } = await captureChatPayload("duckduckgo-web/gpt-4o-mini");
  assert.equal(body.model, "gpt-5.4-mini");
});

test("executor issues exactly one chat request per call", async () => {
  // A throwaway "seed" chat POST used to run before the real one, doubling the
  // request volume against an IP-rate-limited endpoint and causing spurious 429s.
  const realFetch = globalThis.fetch;
  let chatCalls = 0;

  globalThis.fetch = (async (input: unknown, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : String((input as { url?: string })?.url ?? "");
    if (url.includes("/duckchat/v1/status")) {
      const challenge = Buffer.from(
        `(async function(){ return { server_hashes: [], client_hashes: ["ua"], signals: {}, meta: {} }; })()`,
        "utf8"
      ).toString("base64");
      return new Response("{}", { status: 200, headers: { "x-vqd-hash-1": challenge } });
    }
    if (url.includes("/duckchat/v1/chat")) {
      chatCalls++;
      void init;
      return new Response(`data: {"action":"success","message":"OK"}\n\ndata: [DONE]\n\n`, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 200 });
  }) as typeof globalThis.fetch;

  try {
    const executor = new DuckDuckGoWebExecutor();
    await executor.execute({
      model: "duckduckgo-web/gpt-5.4-mini",
      body: { messages: [{ role: "user", content: "Say OK" }] },
      stream: false,
    } as never);
  } finally {
    globalThis.fetch = realFetch;
  }

  assert.equal(chatCalls, 1, "expected exactly one POST /duckchat/v1/chat per user request");
});
