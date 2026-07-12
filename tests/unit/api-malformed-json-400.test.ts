/**
 * Regression tests: mutating API routes must return 400 (not 500) on a malformed
 * JSON request body.
 *
 * Before the fix, both handlers called `await request.json()` on a raw body:
 *   - PUT /api/plugins/[name]/config had no try/catch → unhandled 500.
 *   - POST /api/model-combo-mappings parsed inside the outer try whose catch
 *     returns a generic 500.
 * A malformed body must instead surface as a clean 400 with the standard error
 * envelope, while a well-formed body keeps its existing behavior.
 *
 * DB/auth setup mirrors tests/unit/agentSkills-routes.test.ts: a temp DATA_DIR
 * with no configured password means requireManagementAuth() is a no-op (auth is
 * not required), so the handlers run unauthenticated. DB handles are released in
 * test.after (resetDbInstance) per CLAUDE.md — unreleased SQLite handles hang the
 * Node test runner.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// ── DB / auth setup ─────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-malformed-json-400-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "malformed-json-400-test-secret";
delete process.env.INITIAL_PASSWORD; // ensure auth is NOT required

// Import DB first (order matters — sets DATA_DIR before localDb loads)
const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

// Import routes AFTER env vars are set
const pluginConfigRoute = await import("../../src/app/api/plugins/[name]/config/route.ts");
const modelComboRoute = await import("../../src/app/api/model-combo-mappings/route.ts");

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build a POST/PUT Request that CLAIMS to be JSON but carries a non-JSON body. */
function malformedJsonRequest(url: string, method = "POST"): Request {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: "not-json",
  });
}

/** Build a POST/PUT Request with a well-formed JSON body. */
function jsonRequest(url: string, body: unknown, method = "POST"): Request {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

// ═════════════════════════════════════════════════════════════════════════════
// PUT /api/plugins/[name]/config
// ═════════════════════════════════════════════════════════════════════════════

test("PUT /api/plugins/[name]/config — malformed JSON body returns 400 (was 500)", async () => {
  const req = malformedJsonRequest("http://localhost/api/plugins/demo/config", "PUT");
  const res = await pluginConfigRoute.PUT(req, {
    params: Promise.resolve({ name: "demo" }),
  });

  assert.equal(res.status, 400, "malformed JSON must yield 400, not an unhandled 500");
  const body = (await res.json()) as { error?: { message?: string } };
  assert.ok(body.error, "response must carry a structured error envelope");
  assert.equal(typeof body.error.message, "string");
  // Hard rule #12: no stack trace leaked in the error message.
  assert.ok(!body.error.message?.includes("at /"), "error message must not leak a stack trace");
});

test("PUT /api/plugins/[name]/config — valid body does NOT 400 on parse (404 for unknown plugin)", async () => {
  // Well-formed body against a plugin that does not exist: the handler must get
  // PAST body parsing/validation and reach the not-found branch (404) — proving
  // the happy path is unregressed.
  const req = jsonRequest(
    "http://localhost/api/plugins/does-not-exist/config",
    { config: { foo: "bar" } },
    "PUT"
  );
  const res = await pluginConfigRoute.PUT(req, {
    params: Promise.resolve({ name: "does-not-exist" }),
  });

  assert.notEqual(res.status, 400, "a well-formed body must not be rejected as invalid JSON");
  assert.equal(res.status, 404, "unknown plugin should surface as 404, past the parse guard");
});

// ═════════════════════════════════════════════════════════════════════════════
// POST /api/model-combo-mappings
// ═════════════════════════════════════════════════════════════════════════════

test("POST /api/model-combo-mappings — malformed JSON body returns 400 (was 500)", async () => {
  const req = malformedJsonRequest("http://localhost/api/model-combo-mappings");
  const res = await modelComboRoute.POST(req);

  assert.equal(res.status, 400, "malformed JSON must yield 400, not a generic 500");
  const body = (await res.json()) as {
    error?: {
      message?: string;
      details?: Array<{ field: string; message: string }>;
    };
  };
  // Uses the canonical validatedJsonBody envelope.
  assert.equal(body.error?.message, "Invalid request");
  assert.deepEqual(body.error?.details, [{ field: "body", message: "Invalid JSON body" }]);
});

test("POST /api/model-combo-mappings — well-formed body succeeds (201), no parse regression", async () => {
  // Seed a real combo so the mapping's FK (combo_id → combos.id) is satisfied.
  await combosDb.createCombo({
    id: "combo-under-test",
    name: "combo-under-test",
  });

  const req = jsonRequest("http://localhost/api/model-combo-mappings", {
    pattern: "gpt-4*",
    comboId: "combo-under-test",
  });
  const res = await modelComboRoute.POST(req);

  assert.equal(res.status, 201, "a valid body must still create the mapping (201)");
  const body = (await res.json()) as {
    mapping?: { pattern?: string; comboId?: string };
  };
  assert.equal(body.mapping?.pattern, "gpt-4*");
  assert.equal(body.mapping?.comboId, "combo-under-test");
});

test("POST /api/model-combo-mappings — well-formed but invalid body still returns 400", async () => {
  // Empty pattern fails the Zod schema — same 400 envelope as the malformed path.
  const req = jsonRequest("http://localhost/api/model-combo-mappings", {
    pattern: "",
    comboId: "combo-x",
  });
  const res = await modelComboRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as {
    error?: { message?: string; details?: Array<{ field: string }> };
  };
  assert.equal(body.error?.message, "Invalid request");
  assert.ok(
    body.error?.details?.some((d) => d.field === "pattern"),
    "validation failure should name the offending field"
  );
});
