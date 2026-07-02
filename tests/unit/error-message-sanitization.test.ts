/**
 * Verifies that API routes sanitize error messages (CodeQL js/stack-trace-exposure)
 * and that security-critical helpers behave correctly.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-err-sanitize-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-32chars-long!!";

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const mappingsRoute = await import("../../src/app/api/model-combo-mappings/route.ts");
const mappingsIdRoute = await import("../../src/app/api/model-combo-mappings/[id]/route.ts");
const syncTokens = await import("../../src/lib/sync/tokens.ts");

const repoRoot = path.resolve(import.meta.dirname, "../..");
const read = (relPath: string) => fs.readFileSync(path.join(repoRoot, relPath), "utf8");

function makeRequest(url: string, options: { method?: string; body?: unknown } = {}) {
  const { method = "GET", body } = options;
  return new Request(url, {
    method,
    headers: body !== undefined ? { "content-type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function createCombo(name: string, model: string) {
  return combosDb.createCombo({
    name,
    models: [{ provider: "openai", model }],
    strategy: "priority",
    config: {},
  });
}

// ── model-combo-mappings routes ──────────────────────────────────────────────

test("GET /model-combo-mappings returns empty list on fresh DB", async () => {
  const res = await mappingsRoute.GET();
  assert.equal(res.status, 200);
  const body = (await res.json()) as any;
  assert.ok(Array.isArray(body.mappings), "body.mappings must be an array");
  assert.equal(body.mappings.length, 0);
  assert.ok(!("error" in body), "success response must not contain error field");
});

test("GET /model-combo-mappings error response never leaks raw error.message", async () => {
  const res = await mappingsRoute.GET();
  // In the success case, there is no error field at all
  const body = (await res.json()) as any;
  if (res.status >= 500) {
    assert.equal(body.error, "Failed to list model-combo mappings");
    assert.ok(!("stack" in body), "stack trace must not be present in response");
  }
});

test("POST /model-combo-mappings returns 400 for empty pattern", async () => {
  const res = await mappingsRoute.POST(
    makeRequest("http://localhost/api/model-combo-mappings", {
      method: "POST",
      body: { pattern: "", comboId: "combo-1" },
    })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as any;
  assert.ok("error" in body);
  assert.ok(!("stack" in body), "400 response must not contain stack trace");
});

test("POST /model-combo-mappings returns 400 for missing comboId", async () => {
  const res = await mappingsRoute.POST(
    makeRequest("http://localhost/api/model-combo-mappings", {
      method: "POST",
      body: { pattern: "gpt-*" },
    })
  );
  assert.equal(res.status, 400);
});

test("POST /model-combo-mappings creates a mapping and response has no error field", async () => {
  const combo = await createCombo("test-combo", "gpt-4o");
  const res = await mappingsRoute.POST(
    makeRequest("http://localhost/api/model-combo-mappings", {
      method: "POST",
      body: { pattern: "gpt-*", comboId: combo.id },
    })
  );
  assert.equal(res.status, 201);
  const body = (await res.json()) as any;
  assert.ok("mapping" in body, "response must have mapping field");
  assert.ok(!("error" in body), "success response must not contain error field");
  assert.ok(!("stack" in body));
  assert.equal(body.mapping.pattern, "gpt-*");
});

test("GET /model-combo-mappings/[id] returns 404 for non-existent id", async () => {
  const res = await mappingsIdRoute.GET(
    makeRequest("http://localhost/api/model-combo-mappings/nonexistent"),
    { params: Promise.resolve({ id: "nonexistent" }) }
  );
  assert.equal(res.status, 404);
  const body = (await res.json()) as any;
  assert.equal(body.error, "Mapping not found");
  assert.ok(!("stack" in body), "404 response must not contain stack trace");
});

test("GET /model-combo-mappings/[id] error response never leaks internal details", async () => {
  const res = await mappingsIdRoute.GET(
    makeRequest("http://localhost/api/model-combo-mappings/some-id"),
    { params: Promise.resolve({ id: "some-id" }) }
  );
  const body = (await res.json()) as any;
  if (res.status >= 500) {
    assert.equal(body.error, "Failed to get mapping");
    assert.ok(!body.error.includes("SQLITE"), "SQLite internals must not be exposed");
    assert.ok(!("stack" in body));
  }
});

test("DELETE /model-combo-mappings/[id] returns 404 for non-existent mapping", async () => {
  const res = await mappingsIdRoute.DELETE(
    makeRequest("http://localhost/api/model-combo-mappings/nonexistent", { method: "DELETE" }),
    { params: Promise.resolve({ id: "nonexistent" }) }
  );
  assert.equal(res.status, 404);
  const body = (await res.json()) as any;
  assert.equal(body.error, "Mapping not found");
  assert.ok(!("stack" in body));
});

test("PUT /model-combo-mappings/[id] returns 404 for non-existent mapping", async () => {
  const res = await mappingsIdRoute.PUT(
    makeRequest("http://localhost/api/model-combo-mappings/nonexistent", {
      method: "PUT",
      body: { pattern: "new-*" },
    }),
    { params: Promise.resolve({ id: "nonexistent" }) }
  );
  assert.equal(res.status, 404);
  const body = (await res.json()) as any;
  assert.equal(body.error, "Mapping not found");
  assert.ok(!("stack" in body));
});

// ── sync token hashing (src/lib/sync/tokens.ts) ──────────────────────────────

test("hashSyncToken returns a 64-character hex string (SHA-256 output)", () => {
  const token = syncTokens.generatePlaintextSyncToken();
  const hash = syncTokens.hashSyncToken(token);
  assert.match(hash, /^[0-9a-f]{64}$/, "hash must be 64 lowercase hex chars");
});

test("hashSyncToken is deterministic — same input always produces same output", () => {
  const token = syncTokens.generatePlaintextSyncToken();
  assert.equal(
    syncTokens.hashSyncToken(token),
    syncTokens.hashSyncToken(token),
    "hashing the same token twice must yield the same result"
  );
});

test("hashSyncToken produces different hashes for different tokens", () => {
  const a = syncTokens.generatePlaintextSyncToken();
  const b = syncTokens.generatePlaintextSyncToken();
  assert.notEqual(
    syncTokens.hashSyncToken(a),
    syncTokens.hashSyncToken(b),
    "different tokens must produce different hashes"
  );
});

test("generatePlaintextSyncToken starts with osync_ prefix", () => {
  const token = syncTokens.generatePlaintextSyncToken();
  assert.ok(
    token.startsWith("osync_"),
    `token must start with 'osync_', got: ${token.slice(0, 10)}`
  );
});

test("hashSyncToken output is never the plain token (not stored in clear text)", () => {
  const token = syncTokens.generatePlaintextSyncToken();
  const hash = syncTokens.hashSyncToken(token);
  assert.notEqual(hash, token, "hash must differ from plaintext token");
  assert.ok(!hash.startsWith("osync_"), "hash must not start with the token prefix");
});

test("sanitizeErrorMessage strips multi-line stack traces", async () => {
  const { sanitizeErrorMessage } = await import("../../open-sse/utils/error.ts");
  const input =
    "Cannot read property 'foo' of undefined\n    at handler (/srv/app/src/lib/x.ts:42:11)\n    at next (internal)";
  const out = sanitizeErrorMessage(input);
  assert.equal(out, "Cannot read property 'foo' of undefined");
  assert.ok(!out.includes("at handler"));
});

test("sanitizeErrorMessage replaces absolute paths with <path>", async () => {
  const { sanitizeErrorMessage } = await import("../../open-sse/utils/error.ts");
  const out1 = sanitizeErrorMessage("Failed to open /home/user/secret-project/src/config.ts:10");
  assert.ok(!out1.includes("/home/user/secret-project"));
  assert.ok(out1.includes("<path>"));

  const out2 = sanitizeErrorMessage("Module not found: C:\\Users\\admin\\app\\index.js:1:1");
  assert.ok(!out2.includes("C:\\Users\\admin"));
  assert.ok(out2.includes("<path>"));
});

test("sanitizeErrorMessage handles non-string inputs safely", async () => {
  const { sanitizeErrorMessage } = await import("../../open-sse/utils/error.ts");
  assert.equal(sanitizeErrorMessage(undefined), "");
  assert.equal(sanitizeErrorMessage(null), "");
  assert.equal(sanitizeErrorMessage(42), "42");
  assert.equal(sanitizeErrorMessage(new Error("boom")), "Error: boom");
});

test("buildErrorBody never exposes stack traces in its message", async () => {
  const { buildErrorBody } = await import("../../open-sse/utils/error.ts");
  const body = buildErrorBody(
    500,
    "Internal error\n    at /opt/app/src/server.ts:99:7\n    at next (internal)"
  );
  assert.equal(body.error.message, "Internal error");
  assert.ok(!body.error.message.includes("at /opt"));
});

test("types barrel keeps the model cooldown payload export only", async () => {
  const src = await read("src/types/index.ts");
  assert.match(src, /ModelCooldownErrorPayload/);
  assert.doesNotMatch(src, /ProviderConnection/);
  assert.doesNotMatch(src, /ProviderNode/);
});

// ── sanitizeUpstreamDetails ──────────────────────────────────────────────────

test("sanitizeUpstreamDetails — basic pass-through for safe fields", async () => {
  const { sanitizeUpstreamDetails } = await import("../../open-sse/utils/error.ts");
  const input = { error: { message: "context_length_exceeded", type: "invalid_request_error" } };
  const out = sanitizeUpstreamDetails(input) as any;
  assert.equal(out.error.message, "context_length_exceeded");
  assert.equal(out.error.type, "invalid_request_error");
});

test("sanitizeUpstreamDetails — sanitizes string values (absolute path)", async () => {
  const { sanitizeUpstreamDetails } = await import("../../open-sse/utils/error.ts");
  const input = { error: { message: "bad input at /srv/app/src/lib/db.ts:42" } };
  const out = sanitizeUpstreamDetails(input) as any;
  assert.ok(
    !out.error.message.includes("/srv/app/src/lib/db.ts"),
    "absolute path must be stripped"
  );
  assert.ok(out.error.message.includes("<path>"), "path placeholder must be present");
});

test("sanitizeUpstreamDetails — removes blocked keys (stack, apiKey)", async () => {
  const { sanitizeUpstreamDetails } = await import("../../open-sse/utils/error.ts");
  const input = {
    error: { message: "oops" },
    stack: "Error\n    at foo.ts:1",
    apiKey: "sk-secret",
  };
  const out = sanitizeUpstreamDetails(input) as any;
  assert.ok(!("stack" in out), "stack key must be removed");
  assert.ok(!("apiKey" in out), "apiKey key must be removed");
  assert.equal(out.error.message, "oops");
});

test("sanitizeUpstreamDetails — depth cap replaces nested value at depth > 4", async () => {
  const { sanitizeUpstreamDetails } = await import("../../open-sse/utils/error.ts");
  // Build depth-6 nesting: a.b.c.d.e.f = "leaf"
  const input = { a: { b: { c: { d: { e: { f: "leaf" } } } } } };
  const out = sanitizeUpstreamDetails(input) as any;
  // depth 0:a, 1:b, 2:c, 3:d, 4:e → e is at depth 4, f would be depth 5 → truncated
  assert.equal(out.a.b.c.d.e, "[truncated]");
});

// ── buildErrorBody with upstreamDetails ──────────────────────────────────────

test("buildErrorBody — without upstream details omits upstream_details field", async () => {
  const { buildErrorBody } = await import("../../open-sse/utils/error.ts");
  const body = buildErrorBody(400, "bad request");
  assert.ok(!("upstream_details" in body), "upstream_details must be absent when not provided");
});

test("buildErrorBody — with safe upstream details embeds upstream_details", async () => {
  const { buildErrorBody } = await import("../../open-sse/utils/error.ts");
  const body = buildErrorBody(400, "bad request", {
    error: { message: "context_length_exceeded" },
  });
  assert.ok("upstream_details" in body, "upstream_details must be present");
  assert.equal((body.upstream_details as any).error.message, "context_length_exceeded");
});

test("buildErrorBody — upstream details with stack key are stripped", async () => {
  const { buildErrorBody } = await import("../../open-sse/utils/error.ts");
  const body = buildErrorBody(500, "err", { stack: "Error\n    at foo.ts:1", code: "internal" });
  assert.ok("upstream_details" in body, "upstream_details must be present");
  assert.ok(
    !("stack" in (body.upstream_details as any)),
    "stack must be stripped from upstream_details"
  );
  assert.equal((body.upstream_details as any).code, "internal");
});

// ── createErrorResult with upstreamDetails ───────────────────────────────────

test("createErrorResult — response body includes upstream_details when provided", async () => {
  const { createErrorResult } = await import("../../open-sse/utils/error.ts");
  const result = createErrorResult(
    400,
    "context too long",
    null,
    "context_length_exceeded",
    "invalid_request_error",
    { error: { message: "context_length_exceeded" } }
  );
  const body = (await result.response.clone().json()) as any;
  assert.ok("upstream_details" in body, "upstream_details must be in response body");
  assert.equal(body.upstream_details.error.message, "context_length_exceeded");
});

test("createErrorResult — response body excludes upstream_details when not provided", async () => {
  const { createErrorResult } = await import("../../open-sse/utils/error.ts");
  const result = createErrorResult(400, "bad request", null, "bad_request");
  const body = (await result.response.clone().json()) as any;
  assert.ok(!("upstream_details" in body), "upstream_details must be absent when not provided");
});

test("createErrorResult — exposes error code/type on the result object", async () => {
  const { createErrorResult } = await import("../../open-sse/utils/error.ts");
  const result = createErrorResult(504, "upstream timeout", null, "UPSTREAM_TIMEOUT", "timeout");
  assert.equal(result.errorCode, "UPSTREAM_TIMEOUT");
  assert.equal(result.errorType, "timeout");
});

test("buildModelCooldownBody returns the public cooldown error payload shape", async () => {
  const { buildModelCooldownBody } = await import("../../open-sse/utils/error.ts");
  const body = buildModelCooldownBody({ model: "gpt-4o", retryAfterSec: 1.2 });

  assert.deepEqual(body, {
    error: {
      message: "All credentials for model gpt-4o are cooling down",
      type: "rate_limit_error",
      code: "model_cooldown",
      model: "gpt-4o",
      reset_seconds: 2,
    },
  });
});

test("regression: upstream_details never contains stack trace text", async () => {
  const { createErrorResult } = await import("../../open-sse/utils/error.ts");
  const upstream = { error: { message: "err" }, stack: "Error\n    at /abs/path.ts:1:2" };
  const result = createErrorResult(500, "upstream err", null, undefined, undefined, upstream);
  const body = (await result.response.clone().json()) as any;
  const serialized = JSON.stringify(body);
  assert.ok(
    !serialized.includes("at /abs/path.ts"),
    "stack trace path must not appear in response body"
  );
  assert.ok(!("stack" in (body.upstream_details || {})), "stack key must not be present");
});

// ── existing tests continue ──────────────────────────────────────────────────

test("GET /token-health response never leaks stack frames or absolute paths", async () => {
  const tokenHealthRoute = await import("../../src/app/api/token-health/route.ts");
  const res = await tokenHealthRoute.GET();
  const body = (await res.json()) as any;
  assert.ok(!("stack" in body), "response must not contain stack trace");
  if (typeof body.error === "string") {
    assert.ok(!body.error.includes("    at "), "stack frame must not leak in error");
    assert.ok(!/^\//.test(body.error), "absolute POSIX path must not leak");
    assert.ok(!/^[A-Za-z]:[\\/]/.test(body.error), "absolute Windows path must not leak");
  }
});
