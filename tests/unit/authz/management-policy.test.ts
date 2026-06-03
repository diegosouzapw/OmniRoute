import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mgmt-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
// API-key validation falls through to a Redis-backed cache otherwise — disable
// it for the local test loop so isValidApiKey() does not stall on ETIMEDOUT.
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const modelSync = await import("../../../src/shared/services/modelSyncScheduler.ts");

const ORIGINAL_JWT = process.env.JWT_SECRET;
const ORIGINAL_INITIAL = process.env.INITIAL_PASSWORD;

function reset() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(() => {
  reset();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_JWT === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT;
  if (ORIGINAL_INITIAL === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL;
});

async function loadPolicy() {
  const mod = await import(`../../../src/server/authz/policies/management.ts?ts=${Date.now()}`);
  return mod.managementPolicy;
}

async function dashboardCookieHeader(expiresIn = "1h"): Promise<string> {
  // Mirrors tests/unit/authz/pipeline.test.ts: mint a real HS256 auth_token
  // JWT against process.env.JWT_SECRET so isDashboardSessionAuthenticated()
  // accepts it. The header path is sufficient — the policy reads the cookie
  // from `request.headers.get("cookie")` when there's no `request.cookies`
  // accessor on the plain ctx() object.
  assert.ok(
    process.env.JWT_SECRET,
    "JWT_SECRET must be set before minting dashboard cookie (otherwise TextEncoder would encode the string 'undefined' and silently mint a wrong-secret JWT)"
  );
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
  return `auth_token=${token}`;
}

function ctx(headers: Headers, method = "GET", path = "/api/keys") {
  return {
    request: { method, headers, url: `http://localhost${path}`, nextUrl: { pathname: path } },
    classification: {
      routeClass: "MANAGEMENT" as const,
      reason: path.startsWith("/dashboard")
        ? ("dashboard_prefix" as const)
        : ("management_api" as const),
      normalizedPath: path,
    },
    requestId: "req_test",
  };
}

function remoteCtx(headers: Headers, method = "GET", path = "/api/keys") {
  return {
    request: {
      method,
      headers,
      url: `https://dashboard.example${path}`,
      nextUrl: { hostname: "dashboard.example", pathname: path },
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      reason: path.startsWith("/dashboard")
        ? ("dashboard_prefix" as const)
        : ("management_api" as const),
      normalizedPath: path,
    },
    requestId: "req_remote_test",
  };
}

test("managementPolicy: allows when auth not required (no password set)", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: null });
  const policy = await loadPolicy();
  const out = await policy.evaluate(ctx(new Headers()));
  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "anonymous");
    assert.equal(out.subject.label, "auth-disabled");
  }
});

test("managementPolicy: rejects remote fresh bootstrap without a password", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: null });
  const policy = await loadPolicy();

  const out = await policy.evaluate(remoteCtx(new Headers()));

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 401);
    assert.equal(out.code, "AUTH_001");
  }
});

test("managementPolicy: rejects 401 when auth required and no credentials", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  const policy = await loadPolicy();
  const out = await policy.evaluate(ctx(new Headers()));
  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 401);
    assert.equal(out.code, "AUTH_001");
  }
});

test("managementPolicy: rejects client API keys for dashboard access", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
  const created = await apiKeysDb.createApiKey("dashboard-denied", "machine-dashboard-denied");

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ authorization: `Bearer ${created.key}` }), "GET", "/dashboard")
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "AUTH_001");
  }
});

test("managementPolicy: allows API keys with manage scope", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
  const created = await apiKeysDb.createApiKey("mgmt-key", "machine-mgmt-allow", ["manage"]);

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ authorization: `Bearer ${created.key}` }), "POST", "/api/keys")
  );

  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "management_key");
    assert.equal(out.subject.label, "api-key-manage-scope");
    assert.equal(out.subject.id, created.id);
  }
});

test("managementPolicy: rejects valid API keys that lack manage scope", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
  const created = await apiKeysDb.createApiKey("no-scope-key", "machine-no-scope", []);

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ authorization: `Bearer ${created.key}` }), "POST", "/api/keys")
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    // A valid bearer is present but its scope is insufficient → 403.
    assert.equal(out.status, 403);
    assert.equal(out.code, "AUTH_001");
  }
});

test("managementPolicy: rejects invalid API keys with 403 when bearer is present", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ authorization: "Bearer not-a-real-key" }), "POST", "/api/keys")
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "AUTH_001");
  }
});

// ─── LOCAL_ONLY manage-scope bypass for /api/mcp/* ───────────────────────────
//
// `/api/mcp/*` is in LOCAL_ONLY_API_PREFIXES (because it can spawn child
// processes for unauthenticated callers) AND in
// LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES (so a manage-scoped API key
// presented from non-loopback may reach it). `/api/cli-tools/runtime/*` is
// LOCAL_ONLY but NOT bypassable — the carve-out is path-scoped.
//
// `ctx()` uses `new Headers()` without an explicit `host`, so
// `isLoopbackHost(null)` returns false → the policy treats it as non-loopback,
// which is the exact case this block exercises.

test("LOCAL_ONLY manage-scope bypass: no Bearer + non-loopback → 403 (regression guard)", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  const policy = await loadPolicy();
  const out = await policy.evaluate(ctx(new Headers(), "GET", "/api/mcp/stream"));

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "LOCAL_ONLY");
  }
});

test("LOCAL_ONLY manage-scope bypass: non-manage key + non-loopback → 403", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
  const created = await apiKeysDb.createApiKey("chat-only", "machine-chat-only", ["chat"]);

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ authorization: `Bearer ${created.key}` }), "GET", "/api/mcp/stream")
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "LOCAL_ONLY");
  }
});

test("LOCAL_ONLY manage-scope bypass: manage-scope key + non-loopback → allow", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
  const created = await apiKeysDb.createApiKey("mcp-bypass-key", "machine-mcp-bypass", ["manage"]);

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ authorization: `Bearer ${created.key}` }), "GET", "/api/mcp/stream")
  );

  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "management_key");
    assert.equal(out.subject.id, created.id);
    assert.ok(
      (out.subject.label ?? "").includes("local-only-bypass"),
      `expected label to include 'local-only-bypass', got ${out.subject.label}`
    );
  }
});

test("LOCAL_ONLY manage-scope bypass: carve-out does not extend to /api/cli-tools/runtime/*", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
  const created = await apiKeysDb.createApiKey("cli-runtime-denied", "machine-cli-runtime-denied", [
    "manage",
  ]);

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(
      new Headers({ authorization: `Bearer ${created.key}` }),
      "GET",
      "/api/cli-tools/runtime/foo"
    )
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "LOCAL_ONLY");
  }
});

test("LOCAL_ONLY manage-scope bypass: loopback + no Bearer → allow (local CLI flow preserved)", async () => {
  // Match the fresh-bootstrap pattern used by the "allows when auth not
  // required" test above: no password configured + loopback request →
  // `isAuthRequired` returns false → anonymous-allow fires once the LOCAL_ONLY
  // gate is satisfied via the loopback `host` header.
  await settingsDb.updateSettings({ requireLogin: true, password: null });

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ host: "localhost:20128" }), "GET", "/api/mcp/stream")
  );

  assert.equal(out.allow, true);
});

// ─── LOCAL_ONLY dashboard-session bypass ─────────────────────────────────────
//
// Regression cover for commit ca284a91 ("refine LOCAL_ONLY bypass — dashboard
// cookie + admin label + error log"). The dashboard-session bypass mirrors the
// manage-scope bypass: an authenticated `auth_token` cookie reaching a
// bypassable LOCAL_ONLY path (e.g. /api/mcp/status) from a public hostname is
// allowed, but the cli-tools-runtime carve-out is NOT extended to it.

test("LOCAL_ONLY dashboard-session bypass: authenticated dashboard cookie + non-loopback → allow", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  const cookie = await dashboardCookieHeader();
  const policy = await loadPolicy();
  const out = await policy.evaluate(ctx(new Headers({ cookie }), "GET", "/api/mcp/stream"));

  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "dashboard_session");
    assert.equal(out.subject.id, "dashboard");
    assert.equal(out.subject.label, "dashboard-session-local-only-bypass");
  }
});

test("LOCAL_ONLY dashboard-session bypass: authenticated dashboard cookie + /api/cli-tools/runtime/ → 403 LOCAL_ONLY", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  const cookie = await dashboardCookieHeader();
  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ cookie }), "GET", "/api/cli-tools/runtime/foo")
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "LOCAL_ONLY");
  }
});

test("managementPolicy: allows internal model sync only on the dedicated provider routes", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-for-mgmt-policy";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  const policy = await loadPolicy();
  const internalHeaders = new Headers(modelSync.buildModelSyncInternalHeaders());

  const allowed = await policy.evaluate(
    ctx(internalHeaders, "POST", "/api/providers/conn-123/sync-models")
  );
  assert.equal(allowed.allow, true);
  if (allowed.allow) {
    assert.equal(allowed.subject.kind, "management_key");
    assert.equal(allowed.subject.id, "model-sync");
  }

  const denied = await policy.evaluate(ctx(internalHeaders, "POST", "/api/keys"));
  assert.equal(denied.allow, false);
});
