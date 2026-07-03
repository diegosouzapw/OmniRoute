// Regression guard for #5907 — the provider-scoped chat/completions route
// (`/v1/providers/{provider}/chat/completions`) must NOT re-apply the strict
// `providerChatCompletionSchema`. Full body-format validation is delegated to
// handleChat; the route keeps only the minimal guards it needs to normalize the
// model prefix. This test locks that contract without mocking handleChat (the
// project's node:test runner does not enable --experimental-test-module-mocks,
// and the Stryker tap-runner rejects mock.module), by exercising the branches
// that return BEFORE delegation:
//   - a loosely-valid body (no `messages`, which the removed strict schema would
//     have 400'd) now reaches the model-prefix logic instead of a schema 400;
//   - the minimal route-level guards still reject invalid JSON, non-object
//     bodies, non-string models, and unknown providers.
import { test, after } from "node:test";
import assert from "node:assert/strict";

const { POST } =
  await import("../../src/app/api/v1/providers/[provider]/chat/completions/route.ts");

// Importing the route transitively opens the SQLite handle (handleChat's graph).
// Release it so Node's native test runner does not hang on open handles.
after(async () => {
  try {
    const core = await import("../../src/lib/db/core.ts");
    core.resetDbInstance();
  } catch {
    // best-effort cleanup — never fail the suite on teardown
  }
});

function makeRequest(body: string) {
  return new Request("http://localhost/v1/providers/openai/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

const params = (provider: string) => ({ params: Promise.resolve({ provider }) });

test("#5907 a loosely-valid body (no messages) is no longer rejected by the removed strict schema", async () => {
  // `{ model: "anthropic/..." }` has NO `messages`. Under the old strict
  // providerChatCompletionSchema this 400'd at the route before any prefix
  // check. The relaxed route must instead run the model-prefix validation and
  // return the *specific* cross-provider error — proving the schema is gone.
  const res = await POST(
    makeRequest(JSON.stringify({ model: "anthropic/claude-3-5-sonnet" })),
    params("openai")
  );
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.match(
    body.error.message,
    /does not belong to provider/i,
    "expected the model-prefix check to run — a schema validation 400 would mean the strict schema is still applied"
  );
});

test("#5907 rejects invalid JSON with 400", async () => {
  const res = await POST(makeRequest("{not json"), params("openai"));
  assert.equal(res.status, 400);
});

test("#5907 rejects a non-object body (array) with 400", async () => {
  const res = await POST(makeRequest(JSON.stringify([1, 2, 3])), params("openai"));
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.match(body.error.message, /must be a JSON object/i);
});

test("#5907 rejects a non-string model with 400", async () => {
  const res = await POST(makeRequest(JSON.stringify({ model: 123 })), params("openai"));
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.match(body.error.message, /model must be a string/i);
});

test("#5907 rejects an unknown provider with 400", async () => {
  const res = await POST(makeRequest(JSON.stringify({ model: "gpt-4o" })), params("nope-xyz"));
  assert.equal(res.status, 400);
});

test("#5907 route errors are sanitized (no stack trace leak in body)", async () => {
  const res = await POST(makeRequest("{bad"), params("openai"));
  const body = await res.json();
  assert.ok(!JSON.stringify(body).includes("at /"), "error body must not leak a stack trace");
});
