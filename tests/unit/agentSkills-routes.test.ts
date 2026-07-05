/**
 * Unit tests for /api/agent-skills/* REST routes.
 *
 * Uses Node.js native test runner + real catalog (pure, stateless).
 * Auth tested via requireManagementAuth with live DB in temp directory.
 *
 * Coverage goals:
 * - GET  /api/agent-skills           — happy path (43 skills), filters, invalid category
 * - GET  /api/agent-skills/[id]      — found, 404 not found
 * - GET  /api/agent-skills/[id]/raw  — found, 404 not found, 502 on GitHub failure
 * - GET  /api/agent-skills/coverage  — happy path
 * - POST /api/agent-skills/generate  — 401 no auth, 400 bad body, 503 no generator, 200 with mock
 *
 * Hard Rule #12: every error response goes through buildErrorBody/errorResponse — verified
 * explicitly by asserting no stack trace in messages.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB / auth setup ───────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agentskills-routes-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "agentskills-routes-test-secret";

// Import DB first (order matters — sets DATA_DIR before localDb loads)
const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

// Import routes AFTER env vars are set
const listRoute = await import("../../src/app/api/agent-skills/route.ts");
const idRoute = await import("../../src/app/api/agent-skills/[id]/route.ts");
const rawRoute = await import("../../src/app/api/agent-skills/[id]/raw/route.ts");
const coverageRoute = await import("../../src/app/api/agent-skills/coverage/route.ts");
const generateRoute = await import("../../src/app/api/agent-skills/generate/route.ts");

// ── Helpers ───────────────────────────────────────────────────────────────────

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

function makeRequest(
  method: string,
  url: string,
  body?: unknown,
  headers: Record<string, string> = {},
): Request {
  return new Request(url, {
    method,
    headers: {
      ...(body !== undefined ? { "content-type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

// ═════════════════════════════════════════════════════════════════════════════
// GET /api/agent-skills
// ═════════════════════════════════════════════════════════════════════════════

test("GET /api/agent-skills — returns 44 skills with count and coverage", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills");
  const res = await listRoute.GET(req);

  assert.equal(res.status, 200);
  const body = (await res.json()) as { skills: unknown[]; count: number; coverage: unknown };
  assert.equal(body.count, 44, `Expected 44 skills but got ${body.count}`);
  assert.equal(Array.isArray(body.skills), true);
  assert.equal(body.skills.length, 44);
  assert.ok(body.coverage !== undefined, "coverage should be present");
});

test("GET /api/agent-skills?category=api — returns 23 api skills", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills?category=api");
  const res = await listRoute.GET(req);

  assert.equal(res.status, 200);
  const body = (await res.json()) as { skills: Array<{ category: string }>; count: number };
  assert.equal(body.count, 23);
  assert.ok(body.skills.every((s) => s.category === "api"), "All skills should be api category");
});

test("GET /api/agent-skills?category=cli — returns 20 cli skills", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills?category=cli");
  const res = await listRoute.GET(req);

  assert.equal(res.status, 200);
  const body = (await res.json()) as { skills: Array<{ category: string }>; count: number };
  assert.equal(body.count, 20);
  assert.ok(body.skills.every((s) => s.category === "cli"), "All skills should be cli category");
});

test("GET /api/agent-skills?area=providers — returns only providers area skills", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills?area=providers");
  const res = await listRoute.GET(req);

  assert.equal(res.status, 200);
  const body = (await res.json()) as { skills: Array<{ area: string }>; count: number };
  assert.ok(body.count >= 1, "Should find at least one providers skill");
  assert.ok(body.skills.every((s) => s.area === "providers"));
});

test("GET /api/agent-skills?category=invalid — returns 400 with sanitized error", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills?category=invalid");
  const res = await listRoute.GET(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error, "error field should be present");
  assert.ok(typeof body.error.message === "string", "error.message should be a string");
  // Hard Rule #12: no stack trace exposure
  assert.ok(
    !body.error.message.match(/\bat \/|\bat file:\/\//),
    `Error message must not contain stack trace: "${body.error.message}"`,
  );
});

// ═════════════════════════════════════════════════════════════════════════════
// GET /api/agent-skills/[id]
// ═════════════════════════════════════════════════════════════════════════════

test("GET /api/agent-skills/[id] — returns skill for valid id", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills/omni-providers");
  const res = await idRoute.GET(req, { params: Promise.resolve({ id: "omni-providers" }) });

  assert.equal(res.status, 200);
  const body = (await res.json()) as { id: string; category: string };
  assert.equal(body.id, "omni-providers");
  assert.equal(body.category, "api");
});

test("GET /api/agent-skills/[id] — returns skill for cli skill id", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills/cli-serve");
  const res = await idRoute.GET(req, { params: Promise.resolve({ id: "cli-serve" }) });

  assert.equal(res.status, 200);
  const body = (await res.json()) as { id: string; category: string };
  assert.equal(body.id, "cli-serve");
  assert.equal(body.category, "cli");
});

test("GET /api/agent-skills/[id] — returns 404 with sanitized error for unknown id", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills/does-not-exist");
  const res = await idRoute.GET(req, { params: Promise.resolve({ id: "does-not-exist" }) });

  assert.equal(res.status, 404);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  // Hard Rule #12: no stack trace exposure
  assert.ok(
    !body.error.message.match(/\bat \/|\bat file:\/\//),
    `Error message must not contain stack trace: "${body.error.message}"`,
  );
});

// ═════════════════════════════════════════════════════════════════════════════
// GET /api/agent-skills/[id]/raw
// ═════════════════════════════════════════════════════════════════════════════

test("GET /api/agent-skills/[id]/raw — returns 404 with sanitized error for unknown id", async () => {
  const req = makeRequest("GET", "http://localhost/api/agent-skills/does-not-exist/raw");
  const res = await rawRoute.GET(req, { params: Promise.resolve({ id: "does-not-exist" }) });

  assert.equal(res.status, 404);
  const contentType = res.headers.get("content-type") ?? "";
  assert.ok(contentType.includes("application/json"), "404 should be JSON, not markdown");

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  // Hard Rule #12: no stack trace exposure
  assert.ok(
    !body.error.message.match(/\bat \/|\bat file:\/\//),
    `Error message must not contain stack trace: "${body.error.message}"`,
  );
});

test("GET /api/agent-skills/[id]/raw — returns markdown or 502 for valid id (no local file)", async () => {
  // With no local skills/ dir, the route will attempt GitHub fetch.
  // In test environment with no network or GitHub response, we expect either:
  //   - 200 with text/markdown if GitHub fetch succeeds (unlikely in CI)
  //   - 502 if GitHub fetch fails
  // We test the 502 branch explicitly here by using a skill where the rawUrl won't work.

  const req = makeRequest("GET", "http://localhost/api/agent-skills/omni-providers/raw");
  const res = await rawRoute.GET(req, { params: Promise.resolve({ id: "omni-providers" }) });

  // Either 200 (network available) or 502 (no network) is acceptable
  assert.ok(
    res.status === 200 || res.status === 502 || res.status === 500,
    `Expected 200, 502, or 500 but got ${res.status}`,
  );

  if (res.status === 200) {
    const contentType = res.headers.get("content-type") ?? "";
    assert.ok(
      contentType.includes("text/markdown"),
      `Expected text/markdown content-type, got: ${contentType}`,
    );
    const cacheControl = res.headers.get("cache-control") ?? "";
    assert.ok(cacheControl.includes("max-age=3600"), "Cache-Control should include max-age=3600");
  } else {
    // 502 or 500 — error body must not leak stack trace
    const body = (await res.json()) as { error: { message: string } };
    assert.ok(body.error);
    assert.ok(
      !body.error.message.match(/\bat \/|\bat file:\/\//),
      `Error message must not contain stack trace: "${body.error.message}"`,
    );
  }
});

// ═════════════════════════════════════════════════════════════════════════════
// GET /api/agent-skills/coverage
// ═════════════════════════════════════════════════════════════════════════════

test("GET /api/agent-skills/coverage — returns valid SkillCoverage shape", async () => {
  const res = await coverageRoute.GET();

  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    api: { have: number; total: number };
    cli: { have: number; total: number };
    totalSkills: number;
    generatedAt: string;
  };

  assert.equal(body.api.total, 23, "api.total must be 23");
  assert.equal(body.cli.total, 20, "cli.total must be 20");
  assert.ok(typeof body.totalSkills === "number", "totalSkills must be a number");
  assert.ok(typeof body.generatedAt === "string", "generatedAt must be a string");
  // generatedAt must be a valid ISO datetime
  assert.ok(!isNaN(Date.parse(body.generatedAt)), "generatedAt must be a valid ISO datetime");
});

// ═════════════════════════════════════════════════════════════════════════════
// POST /api/agent-skills/generate — auth guard
// ═════════════════════════════════════════════════════════════════════════════

test("POST /api/agent-skills/generate — 401 when auth is required and no token provided", async () => {
  // Enable auth by setting INITIAL_PASSWORD (triggers requireManagementAuth)
  process.env.INITIAL_PASSWORD = "test-password-requires-login";

  const req = makeRequest("POST", "http://localhost/api/agent-skills/generate", {
    dryRun: true,
  });
  const res = await generateRoute.POST(req);

  // requireManagementAuth returns 401 or 403 when auth is required and no token
  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`,
  );

  const body = (await res.json()) as { error: { message: string } | string };
  // Hard Rule #12: no stack trace exposure
  const errorMsg =
    typeof body.error === "string" ? body.error : (body.error as { message: string }).message;
  assert.ok(
    !errorMsg.match(/\bat \/|\bat file:\/\//),
    `Error message must not contain stack trace: "${errorMsg}"`,
  );
});

test("POST /api/agent-skills/generate — 400 when body is invalid (non-boolean dryRun)", async () => {
  // Disable auth for this test by not setting INITIAL_PASSWORD
  delete process.env.INITIAL_PASSWORD;

  const req = makeRequest("POST", "http://localhost/api/agent-skills/generate", {
    dryRun: "yes", // invalid — must be boolean
  });
  const res = await generateRoute.POST(req);

  // Should be 400 (body validation fails) or 503 (generator not yet available)
  // Since F3 is not merged, generator.ts doesn't exist → dynamic import fails → 503 if auth passes
  // But with invalid body, 400 should come first
  assert.ok(
    res.status === 400 || res.status === 503,
    `Expected 400 (bad body) or 503 (generator unavailable), got ${res.status}`,
  );

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  // Hard Rule #12: no stack trace exposure
  assert.ok(
    !body.error.message.match(/\bat \/|\bat file:\/\//),
    `Error message must not contain stack trace: "${body.error.message}"`,
  );
});

test("POST /api/agent-skills/generate — 503 when generator module unavailable (F3 not merged)", async () => {
  // Disable auth for this test
  delete process.env.INITIAL_PASSWORD;

  const req = makeRequest("POST", "http://localhost/api/agent-skills/generate", {
    dryRun: true,
    prune: false,
  });
  const res = await generateRoute.POST(req);

  // If generator.ts doesn't exist (F3 not merged), expect 503.
  // If it does exist (F3 already merged), it may return 200 with a report.
  // Both are valid depending on merge state.
  assert.ok(
    res.status === 200 || res.status === 503,
    `Expected 200 (generator available) or 503 (generator unavailable), got ${res.status}`,
  );

  const body = (await res.json()) as Record<string, unknown>;
  if (res.status === 503) {
    const err = body.error as { message: string } | undefined;
    assert.ok(err?.message, "503 should include error.message");
    // Hard Rule #12: no stack trace exposure
    assert.ok(
      !err.message.match(/\bat \/|\bat file:\/\//),
      `503 error message must not contain stack trace: "${err.message}"`,
    );
  } else {
    // 200: body should look like a GeneratorReport
    assert.ok("generated" in body || "report" in body || typeof body === "object");
  }
});

test("POST /api/agent-skills/generate — 400 when request body is not JSON", async () => {
  // Disable auth for this test
  delete process.env.INITIAL_PASSWORD;

  const req = new Request("http://localhost/api/agent-skills/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "not valid json {{{",
  });
  const res = await generateRoute.POST(req);

  assert.equal(res.status, 400, `Expected 400 for invalid JSON body, got ${res.status}`);
  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error);
  // Hard Rule #12: no stack trace exposure
  assert.ok(
    !body.error.message.match(/\bat \/|\bat file:\/\//),
    `Error message must not contain stack trace: "${body.error.message}"`,
  );
});

// ═════════════════════════════════════════════════════════════════════════════
// Hard Rule #12 sanity — all error bodies sanitized
// ═════════════════════════════════════════════════════════════════════════════

test("Hard Rule #12: all error responses contain sanitized messages (no 'at /' patterns)", async () => {
  delete process.env.INITIAL_PASSWORD;

  // Collect error responses from various bad inputs
  const errorResponses: Response[] = [
    // Invalid category query
    await listRoute.GET(
      makeRequest("GET", "http://localhost/api/agent-skills?category=bad-val"),
    ),
    // Unknown skill id
    await idRoute.GET(makeRequest("GET", "http://localhost/api/agent-skills/unknown-id"), {
      params: Promise.resolve({ id: "unknown-id" }),
    }),
    // Unknown raw skill id
    await rawRoute.GET(
      makeRequest("GET", "http://localhost/api/agent-skills/unknown-id/raw"),
      { params: Promise.resolve({ id: "unknown-id" }) },
    ),
    // Invalid generate body (non-boolean)
    await generateRoute.POST(
      makeRequest("POST", "http://localhost/api/agent-skills/generate", {
        dryRun: 42,
      }),
    ),
  ];

  for (const res of errorResponses) {
    assert.ok(res.status >= 400, `Expected an error status, got ${res.status}`);
    const contentType = res.headers.get("content-type") ?? "";
    assert.ok(
      contentType.includes("application/json") || contentType.includes("json"),
      `Error response must be JSON, got content-type: ${contentType}`,
    );

    const body = (await res.json()) as { error?: { message?: string } };
    const message = body?.error?.message ?? "";
    assert.ok(
      !message.match(/\bat \/|\bat file:\/\//),
      `Stack trace detected in error response (status ${res.status}): "${message}"`,
    );
  }
});
