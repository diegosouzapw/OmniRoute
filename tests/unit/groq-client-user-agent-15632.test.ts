import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #15632 bug 2 — the caller's User-Agent must not ride onto the upstream Groq request.
async function captureUpstreamHeaders(clientHeaders?: Record<string, string>) {
  const executor = new DefaultExecutor("groq");
  const original = globalThis.fetch;
  let seen: Record<string, string> = {};
  globalThis.fetch = (async (_url: unknown, init: RequestInit) => {
    seen = Object.fromEntries(new Headers(init.headers as HeadersInit).entries());
    return new Response(JSON.stringify({ choices: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  try {
    await executor.execute({
      model: "openai/gpt-oss-20b",
      body: {
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 10,
      },
      stream: false,
      credentials: { apiKey: "gsk_test" },
      clientHeaders,
    } as never);
  } finally {
    globalThis.fetch = original;
  }
  return seen;
}

test("groq upstream request does not carry the caller's Python-urllib User-Agent", async () => {
  const seen = await captureUpstreamHeaders({ "user-agent": "Python-urllib/3.12" });
  assert.notEqual(seen["user-agent"], "Python-urllib/3.12");
});

test("GROQ_USER_AGENT env override wins over the caller's User-Agent", async () => {
  process.env.GROQ_USER_AGENT = "omniroute-test/1.0";
  try {
    const seen = await captureUpstreamHeaders({ "user-agent": "Python-urllib/3.12" });
    assert.equal(seen["user-agent"], "omniroute-test/1.0");
  } finally {
    delete process.env.GROQ_USER_AGENT;
  }
});

test("x-opencode-* / agent metadata headers are still forwarded", async () => {
  const seen = await captureUpstreamHeaders({
    "user-agent": "Python-urllib/3.12",
    "x-session-id": "sess-1",
  });
  assert.equal(seen["x-session-id"], "sess-1");
});

test("control: no client UA -> no forwarded UA", async () => {
  const seen = await captureUpstreamHeaders();
  assert.notEqual(seen["user-agent"], "Python-urllib/3.12");
});
