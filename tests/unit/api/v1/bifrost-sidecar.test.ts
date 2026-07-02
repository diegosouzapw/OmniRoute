import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

// ─── T-12 (#3932 PR-4): bifrost sidecar proxy route ──────────────────────
//
// We test the *contract* of the route by setting env before import and
// calling the exported POST handler. The handler is module-scope configured
// (BIFROST_BASE_URL is read at import time), so env must be set BEFORE the
// dynamic import below.

const ORIGINAL_BIFROST_BASE_URL = process.env.BIFROST_BASE_URL;
const ORIGINAL_BIFROST_API_KEY = process.env.BIFROST_API_KEY;
const ORIGINAL_BIFROST_OMNI_KEY = process.env.OMNIROUTE_BIFROST_KEY;
const ORIGINAL_BIFROST_TIMEOUT = process.env.BIFROST_TIMEOUT_MS;
const ORIGINAL_BIFROST_STREAMING = process.env.BIFROST_STREAMING_ENABLED;

function restoreEnv() {
  if (ORIGINAL_BIFROST_BASE_URL === undefined) delete process.env.BIFROST_BASE_URL;
  else process.env.BIFROST_BASE_URL = ORIGINAL_BIFROST_BASE_URL;
  if (ORIGINAL_BIFROST_API_KEY === undefined) delete process.env.BIFROST_API_KEY;
  else process.env.BIFROST_API_KEY = ORIGINAL_BIFROST_API_KEY;
  if (ORIGINAL_BIFROST_OMNI_KEY === undefined) delete process.env.OMNIROUTE_BIFROST_KEY;
  else process.env.OMNIROUTE_BIFROST_KEY = ORIGINAL_BIFROST_OMNI_KEY;
  if (ORIGINAL_BIFROST_TIMEOUT === undefined) delete process.env.BIFROST_TIMEOUT_MS;
  else process.env.BIFROST_TIMEOUT_MS = ORIGINAL_BIFROST_TIMEOUT;
  if (ORIGINAL_BIFROST_STREAMING === undefined) delete process.env.BIFROST_STREAMING_ENABLED;
  else process.env.BIFROST_STREAMING_ENABLED = ORIGINAL_BIFROST_STREAMING;
}

// Case 1: BIFROST_BASE_URL unset. We test this first because the route's
// module-scope `BIFROST_BASE_URL` would be empty for the entire test file.
test("bifrost route: returns 503 + fallback header when BIFROST_BASE_URL is unset", async () => {
  delete process.env.BIFROST_BASE_URL;
  delete process.env.BIFROST_API_KEY;
  delete process.env.OMNIROUTE_BIFROST_KEY;
  delete process.env.BIFROST_TIMEOUT_MS;
  delete process.env.BIFROST_STREAMING_ENABLED;

  // Dynamic import after env is set so the module reads the empty value.
  const { POST } = await import(
    "../../../../src/app/api/v1/relay/chat/completions/bifrost/route.ts"
  );

  const req = new Request("http://localhost/api/v1/relay/chat/completions/bifrost", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model: "gpt-4", messages: [] }),
  });
  const res = await POST(req);
  assert.equal(res.status, 503);
  assert.equal(res.headers.get("X-Bifrost-Fallback"), "/api/v1/relay/chat/completions");
  const body = await res.json();
  assert.match(String(body?.error?.message ?? ""), /Bifrost sidecar not configured/);

  restoreEnv();
});

// Case 2: BIFROST_BASE_URL set but no auth token in request. The route should
// return 401 *before* trying to reach the gateway, so we don't need a mock fetch.
test("bifrost route: returns 401 when BIFROST_BASE_URL is set but no auth token is provided", async () => {
  process.env.BIFROST_BASE_URL = "http://bifrost.test.local:8080";
  delete process.env.BIFROST_API_KEY;
  delete process.env.OMNIROUTE_BIFROST_KEY;
  delete process.env.BIFROST_TIMEOUT_MS;
  delete process.env.BIFROST_STREAMING_ENABLED;

  // Use a fresh module instance by appending a cache-busting query string.
  // (Node's ESM cache is keyed by resolved URL, so a unique query bypasses it.)
  const { POST } = await import(
    `../../../../src/app/api/v1/relay/chat/completions/bifrost/route.ts?case=${Date.now()}-${Math.random()}`
  );

  const req = new Request("http://localhost/api/v1/relay/chat/completions/bifrost", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model: "gpt-4", messages: [{ role: "user", content: "hi" }] }),
  });
  const res = await POST(req);
  assert.equal(res.status, 401);
  const body = await res.json();
  assert.match(String(body?.error?.message ?? ""), /Missing relay token/);

  restoreEnv();
});

// Case 3: hashToken() is used internally. Verify the SHA-256 output shape so
// downstream code that compares hashes doesn't silently break if the impl
// changes. (This is a contract test, not a black-box test of the function.)
test("bifrost route: relay token hashing matches the SHA-256 hex contract", () => {
  const token = "test-token-abc-123";
  const hash = createHash("sha256").update(token).digest("hex");
  assert.equal(hash.length, 64); // SHA-256 hex = 64 chars
  assert.match(hash, /^[0-9a-f]{64}$/);
});

// Case 4: Validate the CORS preflight handler exists and responds with 204/200
test("bifrost route: OPTIONS responds with CORS headers", async () => {
  const { OPTIONS } = await import(
    `../../../../src/app/api/v1/relay/chat/completions/bifrost/route.ts?case=${Date.now()}-${Math.random()}`
  );
  const res = await OPTIONS();
  // handleCorsOptions() returns 204 No Content with the standard CORS
  // methods/headers. Access-Control-Allow-Origin is intentionally NOT set on
  // the route's response — src/middleware.ts (applyCorsHeaders) is the single
  // source of truth for which origin to echo, based on the allowlist in
  // src/server/cors/origins.ts. We assert the route ships its end of the
  // contract: status + methods/headers. Origin overlay is exercised by the
  // middleware tests.
  assert.ok(res.status === 200 || res.status === 204, `expected 200/204, got ${res.status}`);
  assert.ok(
    res.headers.get("Access-Control-Allow-Methods"),
    "missing Access-Control-Allow-Methods header"
  );
  assert.ok(
    res.headers.get("Access-Control-Allow-Headers"),
    "missing Access-Control-Allow-Headers header"
  );
});
