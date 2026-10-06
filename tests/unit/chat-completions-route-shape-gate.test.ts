/**
 * Regression guard for the T06 route-validation gate on
 * `POST /api/v1/chat/completions` (`scripts/check/check-route-validation.mjs`).
 *
 * This is the hottest path in the proxy: the route already parses the body
 * exactly once (`parsedBody`) and threads it into `handleChat` without a second
 * `request.json()` call — the double parse doubled heap residency for large
 * coding-agent payloads and fed the OOM crash-loop in #4380/#7862. The T06 gate
 * flagged this file because it calls `request.json()` without a literal
 * `validateBody(`/`.safeParse(` call anywhere in the file.
 *
 * The fix adds `chatCompletionsRouteShapeSchema.safeParse()` INSIDE the route,
 * applied to the already-parsed `parsedBody` object (no new body read). The
 * schema is deliberately minimal — `model` a nullable string when present,
 * `messages` an array when present, `.passthrough()` for everything else — so
 * it can only reject shapes the deep validation in `src/sse/handlers/chat.ts`
 * would already reject with its own 400. These tests pin:
 *   - the body is still read exactly once (no new json()/clone() call);
 *   - a large, realistic payload still passes through;
 *   - shapes the deep pipeline accepts today (e.g. a `developer`-role message,
 *     or a request with `messages` but no `model`) are NOT newly rejected by
 *     the route-level gate;
 *   - shapes that were already a 400 stay a 400.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-shape-gate-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;

async function flushBackgroundWork() {
  await new Promise((resolve) => setTimeout(resolve, 20));
  await new Promise((resolve) => setImmediate(resolve));
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makeCountingRequest(body: string) {
  const request = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  let jsonCalls = 0;
  let cloneCalls = 0;
  const originalJson = request.json.bind(request);
  const originalClone = request.clone.bind(request);

  Object.defineProperties(request, {
    json: {
      value: async () => {
        jsonCalls++;
        return originalJson();
      },
    },
    clone: {
      value: () => {
        cloneCalls++;
        return originalClone();
      },
    },
  });

  return {
    request,
    jsonCalls: () => jsonCalls,
    cloneCalls: () => cloneCalls,
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// Malformed / structurally-invalid shapes still 400 (unchanged status)
// ═════════════════════════════════════════════════════════════════════════════

test("model as a number is rejected with 400 (matches the deep validation's own guard)", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: 12345,
      messages: [{ role: "user", content: "hi" }],
    }),
  });
  const res = await chatRoute.POST(req);
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /model/i);
});

test("messages as a non-array object is rejected with 400", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: { role: "user", content: "hi" },
    }),
  });
  const res = await chatRoute.POST(req);
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /messages/i);
});

// ═════════════════════════════════════════════════════════════════════════════
// Shapes the deep pipeline already accepts must NOT become newly rejected
// ═════════════════════════════════════════════════════════════════════════════

test("a request with messages but no model is NOT rejected by the route-level gate (still fails later, at 'Missing model')", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "hi" }],
    }),
  });
  const res = await chatRoute.POST(req);
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  // If the route-level gate had wrongly required `model`, this would read
  // something like "model: Required" instead of the pipeline's own message.
  assert.equal(body.error?.message, "Missing model");
});

test("model: null is NOT rejected by the route-level gate (passes through to deep resolution)", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: null,
      messages: [{ role: "user", content: "hi" }],
    }),
  });
  const res = await chatRoute.POST(req);
  // Must not be rejected AS a type mismatch by the shape gate; may still 400
  // downstream as "Missing model" once `modelStr` resolves falsy, but never
  // with the shape gate's own "model: Expected string" message.
  const body = (await res.json()) as { error?: { message?: string } };
  assert.doesNotMatch(body.error?.message ?? "", /Expected string/);
});

test("a developer-role message is NOT rejected by the route-level gate (full round trip to 200)", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-shape-gate-dev-role",
    apiKey: "sk-shape-gate-dev-role",
    isActive: true,
    testStatus: "active",
  });

  globalThis.fetch = async () =>
    Response.json({
      id: "chatcmpl-shape-gate-dev-role",
      choices: [{ message: { role: "assistant", content: "OK" } }],
    });

  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: [
        { role: "developer", content: "Be concise." },
        { role: "user", content: "hi" },
      ],
      stream: false,
    }),
  });

  const res = await chatRoute.POST(req);
  const text = await res.text();
  assert.equal(res.status, 200, `expected 200, got ${res.status}: ${text.slice(0, 200)}`);
});

// ═════════════════════════════════════════════════════════════════════════════
// Large realistic payload: still accepted, body still read exactly once
// ═════════════════════════════════════════════════════════════════════════════

test("a large realistic payload is still accepted and the body is read exactly once", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-shape-gate-large-body",
    apiKey: "sk-shape-gate-large-body",
    isActive: true,
    testStatus: "active",
  });

  globalThis.fetch = async () =>
    Response.json({
      id: "chatcmpl-shape-gate-large-body",
      choices: [{ message: { role: "assistant", content: "OK" } }],
    });

  // ~300 KB of message content — representative of a coding-agent payload
  // (#4380's regression class), well past the large-body admission threshold.
  const largeContent = "x".repeat(300 * 1024);
  const largeBody = JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: largeContent },
    ],
    stream: false,
  });

  const counting = makeCountingRequest(largeBody);
  const res = await chatRoute.POST(counting.request);
  const text = await res.text();

  assert.equal(res.status, 200, `expected 200, got ${res.status}: ${text.slice(0, 200)}`);
  assert.equal(
    counting.jsonCalls(),
    0,
    "the ORIGINAL request must never be json()-parsed — admission ingests the bytes and " +
      "the route parses the admission-rebuilt request exactly once"
  );
  assert.equal(counting.cloneCalls(), 0, "the request body stream must not be teed/cloned");
});
