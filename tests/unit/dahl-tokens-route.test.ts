import test from "node:test";
import assert from "node:assert/strict";

import { POST } from "../../src/app/api/dahl/tokens/route.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("POST /api/dahl/tokens proxies success response with token", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ available_tokens: 100000000, token: "dahl_abc123" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  const res = await POST();
  const data = await res.json();

  assert.equal(res.status, 200);
  assert.equal(data.token, "dahl_abc123");
  assert.equal(data.available_tokens, 100000000);
});

test("POST /api/dahl/tokens returns upstream error status", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "rate limited" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });

  const res = await POST();
  const data = await res.json();

  assert.equal(res.status, 429);
  assert.ok(data.error);
});

test("POST /api/dahl/tokens returns 5xx on network failure", async () => {
  globalThis.fetch = async () => {
    throw new Error("ECONNREFUSED");
  };

  const res = await POST();
  const data = await res.json();

  assert.ok(res.status >= 500, `status was ${res.status}`);
  assert.ok(data.error);
});
