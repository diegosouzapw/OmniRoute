// Regression for #3931 / #3958: Qwen's `GET /api/v2/user` returns HTTP 200 even
// for invalid tokens, so the validator must inspect the response body for a real
// `user` object — checking `resp.ok` alone produced a false-positive "Valid".

import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function jsonResponse(body: string) {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

test("qwen-web validation is VALID when the 200 body carries a real user object", async () => {
  globalThis.fetch = (async () =>
    jsonResponse(JSON.stringify({ user: { id: "u-1", name: "tester" } }))) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, true);
});

test("qwen-web validation rejects a 200 response with no user object (was false-positive)", async () => {
  globalThis.fetch = (async () => jsonResponse(JSON.stringify({}))) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, false);
  assert.match(result.error, /invalid or expired/i);
});

test("qwen-web validation accepts a nested data.user object", async () => {
  globalThis.fetch = (async () =>
    jsonResponse(JSON.stringify({ data: { user: { id: "u-2" } } }))) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, true);
});

test("qwen-web validation rejects a 200 body that is not valid JSON", async () => {
  globalThis.fetch = (async () => jsonResponse("<<not json>>")) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, false);
  assert.match(result.error, /invalid JSON/i);
});
