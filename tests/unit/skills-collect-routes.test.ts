/**
 * Unit tests for the skill-collector CLI-detection REST surface (PR #6294 review):
 *
 * - GET/POST /api/github-skills
 * - GET      /api/skills/collect/detect
 * - POST     /api/skills/collect/install
 *
 * Coverage goals (mandatory per PR #6294 plan-file):
 * - Auth-required assertion: every route returns 401/403 when management auth is
 *   required and no credential is provided (requireManagementAuth wiring).
 * - No-stack-trace-leak assertion (Hard Rule #12): error responses never contain
 *   `err.stack`/absolute-path fragments.
 * - Happy-path smoke test for each route.
 *
 * global.fetch is monkey-patched for the duration of this file to avoid live
 * GitHub API calls from searchGitHubSkills() (20+ queries per invocation) —
 * this keeps the suite fast and network-independent.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

// ── DB / auth setup ───────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-collect-routes-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "skills-collect-routes-test-secret";

// Import DB first (order matters — sets DATA_DIR before localDb loads)
const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

// Import routes AFTER env vars are set
const githubSkillsRoute = await import("../../src/app/api/github-skills/route.ts");
const detectRoute = await import("../../src/app/api/skills/collect/detect/route.ts");
const installRoute = await import("../../src/app/api/skills/collect/install/route.ts");

// ── fetch mock — avoid live GitHub API calls ────────────────────────────────

const originalFetch = globalThis.fetch;

test.before(() => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

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
  headers: Record<string, string> = {}
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

// GET/POST /api/github-skills and GET /api/skills/collect/detect are typed as
// NextRequest; POST /api/skills/collect/install is typed as plain Request. A
// standard Request satisfies every property NextRequest handlers actually read
// (method/url/headers/json()) — the same cast pattern as tests/unit/a2a-enabled-route.test.ts.
function asNextRequest(req: Request): NextRequest {
  return req as unknown as NextRequest;
}

function assertNoStackTrace(message: string) {
  assert.ok(
    !message.match(/\bat \/|\bat file:\/\//),
    `Error message must not contain a stack trace: "${message}"`
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

// ═════════════════════════════════════════════════════════════════════════════
// GET/POST /api/github-skills — auth guard
// ═════════════════════════════════════════════════════════════════════════════

test("GET /api/github-skills — 401/403 when auth is required and no token provided", async () => {
  process.env.INITIAL_PASSWORD = "test-password-requires-login";

  const req = makeRequest("GET", "http://localhost/api/github-skills");
  const res = await githubSkillsRoute.GET(asNextRequest(req));

  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`
  );
  const body = (await res.json()) as { error: { message: string } | string };
  const errorMsg =
    typeof body.error === "string" ? body.error : (body.error as { message: string }).message;
  assertNoStackTrace(errorMsg);
});

test("POST /api/github-skills — 401/403 when auth is required and no token provided", async () => {
  process.env.INITIAL_PASSWORD = "test-password-requires-login";

  const req = makeRequest("POST", "http://localhost/api/github-skills", {
    repoName: "user/repo",
  });
  const res = await githubSkillsRoute.POST(asNextRequest(req));

  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`
  );
});

test("GET /api/github-skills — 200 happy path when auth is not required", async () => {
  const req = makeRequest("GET", "http://localhost/api/github-skills?minStars=1&maxResults=5");
  const res = await githubSkillsRoute.GET(asNextRequest(req));

  assert.equal(res.status, 200);
  const body = (await res.json()) as { skills: unknown[]; total: number };
  assert.ok(Array.isArray(body.skills));
  assert.equal(typeof body.total, "number");
});

test("POST /api/github-skills — 400 when repoName is missing", async () => {
  const req = makeRequest("POST", "http://localhost/api/github-skills", {});
  const res = await githubSkillsRoute.POST(asNextRequest(req));
  assert.equal(res.status, 400);
});

test("POST /api/github-skills — 200 plans install for a valid repoName", async () => {
  const req = makeRequest("POST", "http://localhost/api/github-skills", {
    repoName: "user/skill-example",
    targets: ["claude"],
  });
  const res = await githubSkillsRoute.POST(asNextRequest(req));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { results: { target: string; action: string }[] };
  assert.equal(body.results[0].action, "planned");
});

// ═════════════════════════════════════════════════════════════════════════════
// GET /api/skills/collect/detect — auth guard + happy path
// ═════════════════════════════════════════════════════════════════════════════

test("GET /api/skills/collect/detect — 401/403 when auth is required and no token provided", async () => {
  process.env.INITIAL_PASSWORD = "test-password-requires-login";

  const req = makeRequest("GET", "http://localhost/api/skills/collect/detect");
  const res = await detectRoute.GET(asNextRequest(req));

  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`
  );
  const body = (await res.json()) as { error: { message: string } | string };
  const errorMsg =
    typeof body.error === "string" ? body.error : (body.error as { message: string }).message;
  assertNoStackTrace(errorMsg);
});

test("GET /api/skills/collect/detect — 200 happy path when auth is not required", async () => {
  const req = makeRequest("GET", "http://localhost/api/skills/collect/detect");
  const res = await detectRoute.GET(asNextRequest(req));

  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    tools: Record<string, unknown>;
    installedToolIds: string[];
    matchedSkills: unknown[];
    totalSkills: number;
  };
  assert.ok(typeof body.tools === "object" && body.tools !== null);
  assert.ok(Array.isArray(body.installedToolIds));
  assert.ok(Array.isArray(body.matchedSkills));
  assert.equal(typeof body.totalSkills, "number");
});

// ═════════════════════════════════════════════════════════════════════════════
// POST /api/skills/collect/install — auth guard + happy path
// ═════════════════════════════════════════════════════════════════════════════

test("POST /api/skills/collect/install — 401/403 when auth is required and no token provided", async () => {
  process.env.INITIAL_PASSWORD = "test-password-requires-login";

  const req = makeRequest("POST", "http://localhost/api/skills/collect/install", {
    repoName: "user/skill-example",
    targets: ["claude"],
  });
  const res = await installRoute.POST(req);

  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`
  );
  const body = (await res.json()) as { error: { message: string } | string };
  const errorMsg =
    typeof body.error === "string" ? body.error : (body.error as { message: string }).message;
  assertNoStackTrace(errorMsg);
});

test("POST /api/skills/collect/install — 400 on invalid body (missing repoName)", async () => {
  const req = makeRequest("POST", "http://localhost/api/skills/collect/install", {
    targets: ["claude"],
  });
  const res = await installRoute.POST(req);
  assert.equal(res.status, 400);
});

test("POST /api/skills/collect/install — 200 plans install for a valid body", async () => {
  const req = makeRequest("POST", "http://localhost/api/skills/collect/install", {
    repoName: "user/skill-example",
    targets: ["claude", "codex"],
    description: "an example agent skill",
  });
  const res = await installRoute.POST(req);

  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    ok: boolean;
    results: { target: string; action: string; destDir?: string }[];
  };
  assert.equal(body.ok, true);
  assert.equal(body.results.length, 2);
  for (const r of body.results) {
    assert.equal(r.action, "planned");
    assert.ok(r.destDir);
  }
});

test("POST /api/skills/collect/install — 200 with a per-target error for an unknown tool", async () => {
  const req = makeRequest("POST", "http://localhost/api/skills/collect/install", {
    repoName: "user/skill-example",
    targets: ["totally-unknown-tool"],
  });
  const res = await installRoute.POST(req);

  assert.equal(res.status, 200);
  const body = (await res.json()) as { ok: boolean; results: { ok: boolean; action: string }[] };
  assert.equal(body.ok, false);
  assert.equal(body.results[0].action, "error");
});
