// Regression for #3931 / #3958: Qwen's session probe endpoint must return a real
// user object for the validator to accept it.
//
// History of the probe URL:
//   - Originally `GET /api/v2/user` returned `{ user: { ... } }` (nested).
//   - As of mid-2026, `/api/v2/user` is retired and answers `not found` regardless
//     of credentials. The probe moved to `GET /api/v1/auths/` (trailing slash
//     required), which returns the user object at the top level:
//     `{ id, email, name, role, ... }`.
//
// These tests mock `/api/v1/auths/` and assert the validator accepts a real user
// object (top-level `id`), and rejects bodies that lack one (was the original
// #3958 false-positive: HTTP 200 with no user).

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

test("qwen-web validation is VALID when /api/v1/auths/ returns a top-level user object", async () => {
  let probedUrl = "";
  globalThis.fetch = (async (url: any) => {
    probedUrl = String(url);
    return jsonResponse(JSON.stringify({ id: "u-1", email: "tester@example.com", name: "tester", role: "user" }));
  }) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, true);
  assert.equal(probedUrl, "https://chat.qwen.ai/api/v1/auths/");
});

test("qwen-web validation rejects a 200 response with no user object (was false-positive)", async () => {
  globalThis.fetch = (async () => jsonResponse(JSON.stringify({}))) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, false);
  assert.match(result.error, /invalid or expired/i);
});

test("qwen-web validation still accepts legacy nested shapes for robustness", async () => {
  globalThis.fetch = (async () =>
    jsonResponse(JSON.stringify({ user: { id: "u-2" } }))) as typeof fetch;
  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, true);

  globalThis.fetch = (async () =>
    jsonResponse(JSON.stringify({ data: { user: { id: "u-3" } } }))) as typeof fetch;
  const result2 = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result2.valid, true);
});

test("qwen-web validation rejects a 200 body that is not valid JSON", async () => {
  globalThis.fetch = (async () => jsonResponse("<<not json>>")) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, false);
  assert.match(result.error, /invalid JSON/i);
});
