import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

// Repro for #14922: venice-web posted to the dead https://venice.ai/api/chat and
// never minted a Clerk session JWT. Fixed behavior: __client cookie -> clerk.venice.ai
// (GET /v1/client, POST .../tokens) -> Bearer JWT -> outerface.venice.ai/api/inference/chat,
// answering with newline-delimited JSON events. Fully mocked; no real Venice calls.
const mod = await import("../../open-sse/executors/venice-web.ts");

const INFERENCE = "https://outerface.venice.ai/api/inference/chat";

function makeJwt(sub = "user_abc", ttlSec = 3600): string {
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  return `eyJhbGciOiJub25lIn0.${b64({ sub, exp: Math.floor(Date.now() / 1000) + ttlSec })}.sig`;
}

interface Call {
  url: string;
  init?: RequestInit;
}

function installFetch(inferenceStatus = 200, tokenJwt = makeJwt()) {
  const calls: Call[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    calls.push({ url, init });
    if (url === "https://clerk.venice.ai/v1/client") {
      return Response.json({ response: { sessions: [{ id: "sess_1", status: "active" }] } });
    }
    if (url === "https://clerk.venice.ai/v1/client/sessions/sess_1/tokens") {
      return Response.json({ jwt: tokenJwt });
    }
    if (url === INFERENCE) {
      return new Response(
        '{"kind":"content","content":"Hel"}\nnot-json\n{"kind":"content","content":"lo"}\n{"kind":"meta","completion_id":"x"}\n',
        { status: inferenceStatus, headers: { "Content-Type": "text/html" } }
      );
    }
    return new Response("<!doctype html>404", { status: 404 });
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

const input = (cookie: string, stream = false) => ({
  model: "venice-uncensored",
  body: { model: "venice-uncensored", messages: [{ role: "user", content: "hi" }] },
  stream,
  credentials: { apiKey: cookie },
  signal: null,
});

let restore: (() => void) | null = null;
afterEach(() => restore?.());

describe("venice-web #14922", () => {
  it("mints a Clerk JWT then posts to the real inference endpoint with Bearer auth", async () => {
    const f = installFetch();
    restore = f.restore;
    const ex = new mod.VeniceWebExecutor();
    const result = await ex.execute(input("__client=eyJcookie.one.aaa"));
    const urls = f.calls.map((c) => c.url);
    assert.deepEqual(urls, [
      "https://clerk.venice.ai/v1/client",
      "https://clerk.venice.ai/v1/client/sessions/sess_1/tokens",
      INFERENCE,
    ]);
    const headers = f.calls[2].init?.headers as Record<string, string>;
    assert.match(headers.Authorization, /^Bearer eyJ/);
    assert.equal(headers.Cookie, undefined);
    const sent = JSON.parse(String(f.calls[2].init?.body));
    assert.equal(sent.modelId, "venice-uncensored");
    assert.equal(sent.userId, "user_abc");
    assert.deepEqual(sent.prompt, [{ role: "user", content: "hi" }]);
    assert.equal(typeof sent.temperature, "number");
    assert.equal(sent.requestId.length, 7);
    const json = await result.response.json();
    assert.equal(json.choices[0].message.content, "Hello");
  });

  it("reuses the cached JWT on the next request and evicts it on 401", async () => {
    const f = installFetch();
    restore = f.restore;
    const ex = new mod.VeniceWebExecutor();
    await ex.execute(input("__client=eyJcookie.two.bbb"));
    await ex.execute(input("__client=eyJcookie.two.bbb"));
    assert.equal(f.calls.filter((c) => c.url.includes("clerk.venice.ai")).length, 2);
    f.restore();

    const g = installFetch(401);
    restore = g.restore;
    const bad = await ex.execute(input("__client=eyJcookie.three.ccc"));
    assert.equal(bad.response.status, 401);
    await ex.execute(input("__client=eyJcookie.three.ccc"));
    assert.equal(g.calls.filter((c) => c.url.includes("clerk.venice.ai")).length, 4);
  });

  it("translates NDJSON to OpenAI SSE when streaming", async () => {
    const f = installFetch();
    restore = f.restore;
    const result = await new mod.VeniceWebExecutor().execute(
      input("__client=eyJcookie.four.ddd", true)
    );
    const text = await result.response.text();
    assert.match(text, /"content":"Hel"/);
    assert.match(text, /"content":"lo"/);
    assert.match(text, /"finish_reason":"stop"/);
    assert.ok(text.trimEnd().endsWith("data: [DONE]"));
  });

  it("returns 401 for an empty cookie and surfaces Clerk failures", async () => {
    const ex = new mod.VeniceWebExecutor();
    assert.equal((await ex.execute(input(""))).response.status, 401);
    const original = globalThis.fetch;
    globalThis.fetch = (async () => new Response("no", { status: 403 })) as typeof fetch;
    restore = () => (globalThis.fetch = original);
    const r = await ex.execute(input("__client=eyJcookie.five.eee"));
    assert.equal(r.response.status, 403);
  });
});
