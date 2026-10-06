// #9159 route-layer follow-up — the /api/mcp/* transport routes call
// requireManagementAuth() whose API-key branch only accepts the `manage`
// scope. The policy layer (managementPolicy) already carves out mcp:connect
// for /api/mcp/* paths, but the route handler's own check runs independently
// and rejects mcp:connect-only keys with 403 before the MCP transport ever
// starts — stranding MCP-only clients (remote search gateways) with keys far
// broader than the least-privilege design intended. These tests pin the route
// layer to the same carve-out contract the policy layer already enforces.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mcp-route-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const { requireManagementAuth } = await import("../../src/lib/api/requireManagementAuth.ts");
const { MCP_CONNECT_SCOPE } = await import("../../src/shared/constants/managementScopes.ts");

const ORIGINAL_JWT = process.env.JWT_SECRET;
const ORIGINAL_INITIAL = process.env.INITIAL_PASSWORD;

function reset() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(() => {
  reset();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_JWT === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT;
  if (ORIGINAL_INITIAL === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL;
});

async function seedAuthRequired() {
  process.env.JWT_SECRET = "test-jwt-secret-for-mcp-route-scope";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
}

async function seedKey(scopes: string[], machineId: string): Promise<string> {
  const created = await apiKeysDb.createApiKey(`test-${scopes.join("-")}`, machineId, scopes);
  // createApiKey returns the raw key only at creation time.
  return created.key;
}

function mcpRequest(key: string, pathname = "/api/mcp/stream", method = "POST"): Request {
  return new Request(`http://localhost:20128${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
  });
}

test("mcp:connect-only key passes the route-layer guard on /api/mcp/stream", async () => {
  await seedAuthRequired();
  const key = await seedKey([MCP_CONNECT_SCOPE], "machine-route-mcp-connect");
  const err = await requireManagementAuth(mcpRequest(key), {
    acceptMcpConnectScope: true,
  });
  assert.equal(err, null, "mcp:connect key must pass the MCP route guard");
});

test("mcp:connect-only key passes the guard for GET transport routes too", async () => {
  await seedAuthRequired();
  const key = await seedKey([MCP_CONNECT_SCOPE], "machine-route-mcp-get");
  const err = await requireManagementAuth(mcpRequest(key, "/api/mcp/status", "GET"), {
    acceptMcpConnectScope: true,
  });
  assert.equal(err, null, "guard is method-agnostic (GET status route)");
});

test("mcp:connect-only key passes the guard on the sse and tools transport routes", async () => {
  await seedAuthRequired();
  const key = await seedKey([MCP_CONNECT_SCOPE], "machine-route-mcp-sse-tools");
  for (const [path, method] of [
    ["/api/mcp/sse", "GET"],
    ["/api/mcp/tools", "GET"],
  ] as const) {
    const err = await requireManagementAuth(mcpRequest(key, path, method), {
      acceptMcpConnectScope: true,
    });
    assert.equal(err, null, `mcp:connect key must pass ${method} ${path}`);
  }
});

test("manage-only routes keep the historical 403 message for insufficient scope", async () => {
  await seedAuthRequired();
  const key = await seedKey(["execute:search"], "machine-route-manage-msg");
  const err = await requireManagementAuth(mcpRequest(key, "/api/providers"));
  assert.ok(err !== null && err instanceof Response);
  assert.equal(err.status, 403);
  const body = (await err.json()) as { error?: { message?: string } | string };
  const message = typeof body.error === "string" ? body.error : (body.error?.message ?? "");
  assert.match(message, /API key lacks 'manage' scope\./, "default guard message unchanged");
});

test("mcp:connect-only rejection without the option pins the default 403 message", async () => {
  await seedAuthRequired();
  const key = await seedKey([MCP_CONNECT_SCOPE], "machine-route-default-msg");
  const err = await requireManagementAuth(mcpRequest(key, "/api/providers"));
  assert.ok(err !== null && err instanceof Response);
  assert.equal(err.status, 403);
  const body = (await err.json()) as { error?: { message?: string } | string };
  const message = typeof body.error === "string" ? body.error : (body.error?.message ?? "");
  assert.match(message, /API key lacks 'manage' scope\./);
});

test("admin-only key passes the MCP carve-out", async () => {
  await seedAuthRequired();
  const key = await seedKey(["admin"], "machine-route-admin-only");
  const err = await requireManagementAuth(mcpRequest(key), {
    acceptMcpConnectScope: true,
  });
  assert.equal(err, null, "admin scope is accepted by hasMcpConnectOrManageScope");
});

test("a key with an empty scopes array is rejected", async () => {
  await seedAuthRequired();
  const key = await seedKey([], "machine-route-empty-scopes");
  const err = await requireManagementAuth(mcpRequest(key), {
    acceptMcpConnectScope: true,
  });
  assert.ok(err !== null && err instanceof Response, "no scopes -> 403");
  assert.equal(err.status, 403);
  const body = (await err.json()) as { error?: { message?: string } | string };
  const message = typeof body.error === "string" ? body.error : (body.error?.message ?? "");
  assert.ok(message.length > 0, `unexpected error envelope: ${JSON.stringify(body)}`);
  assert.match(message, /mcp:connect/);
});

test("admin + mcp:connect scopes pass the carve-out (no precedence bug)", async () => {
  await seedAuthRequired();
  const key = await seedKey(["admin", MCP_CONNECT_SCOPE], "machine-route-admin-connect");
  const err = await requireManagementAuth(mcpRequest(key), {
    acceptMcpConnectScope: true,
  });
  assert.equal(err, null, "admin+mcp:connect combination must pass");
});

test("mcp:connect-only key is rejected by the DEFAULT guard (manage-only routes unchanged)", async () => {
  await seedAuthRequired();
  const key = await seedKey([MCP_CONNECT_SCOPE], "machine-route-mcp-default");
  const err = await requireManagementAuth(mcpRequest(key, "/api/providers"));
  assert.ok(err !== null, "without the option the guard stays manage-only");
  assert.equal(err?.status, 403);
});

test("scope-less key is rejected with an actionable message mentioning mcp:connect", async () => {
  await seedAuthRequired();
  const key = await seedKey(["execute:search"], "machine-route-search-only");
  const err = await requireManagementAuth(mcpRequest(key), {
    acceptMcpConnectScope: true,
  });
  assert.ok(err !== null, "insufficient scope must be rejected");
  assert.ok(err instanceof Response);
  const body = (await err.json()) as { error?: { message?: string } | string };
  const message = typeof body.error === "string" ? body.error : (body.error?.message ?? "");
  assert.ok(message.length > 0, `unexpected error envelope: ${JSON.stringify(body)}`);
  // Pin the full actionable guidance, not just the scope token.
  assert.match(
    message,
    /API key lacks 'mcp:connect' \(or 'manage'\) scope\./,
    "403 message must name the required scopes"
  );
});

test("manage-scope key keeps working with the MCP option enabled", async () => {
  await seedAuthRequired();
  const key = await seedKey(["manage", MCP_CONNECT_SCOPE], "machine-route-manage");
  const err = await requireManagementAuth(mcpRequest(key), {
    acceptMcpConnectScope: true,
  });
  assert.equal(err, null, "manage+connect key must pass the MCP route guard");
});

test("an unauthenticated request is still rejected with the MCP option enabled", async () => {
  await seedAuthRequired();
  const noAuth = new Request("http://localhost:20128/api/mcp/stream", {
    method: "POST",
    headers: { Accept: "application/json, text/event-stream" },
  });
  const err = await requireManagementAuth(noAuth, {
    acceptMcpConnectScope: true,
  });
  assert.ok(err !== null, "no credential must be rejected");
  assert.ok(err instanceof Response);
  assert.equal(err.status, 401, "scope carve-out must not bypass authentication");
});

test("when auth is not required (no JWT_SECRET), the guard passes everything — carve-out included", async () => {
  // Deployment without requireLogin: every management route is open; the
  // carve-out option changing nothing here is the pre-existing contract.
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
  await settingsDb.updateSettings({ requireLogin: false });
  const key = await seedKey([], "machine-route-noauth");
  const err = await requireManagementAuth(mcpRequest(key), {
    acceptMcpConnectScope: true,
  });
  assert.equal(err, null, "auth-disabled deployment keeps the open-door contract");
});

// Design decision (owner 2026-06-19, shared with the policy layer's
// inferRequiredScope in src/server/authz/accessScopes.ts): /api/mcp sits in
// ADMIN_SCOPE_PREFIXES, so an oma_ access token needs `admin` regardless of
// acceptMcpConnectScope. The carve-out is an API-key-only feature — pinning
// it here so a future "fix" that routes oma_ tokens through the carve-out
// fails loudly.
test("oma_ access token with only mcp:connect scope is rejected (admin required by owner policy)", async () => {
  await seedAuthRequired();
  const token = accessTokensDb.createAccessToken({
    name: "mcp-oma-test",
    scope: MCP_CONNECT_SCOPE,
    expiresAt: null,
  });
  const req = new Request("http://localhost:20128/api/mcp/stream", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.secret}`,
      "Content-Type": "application/json",
    },
  });
  const err = await requireManagementAuth(req, { acceptMcpConnectScope: true });
  assert.ok(err !== null && err instanceof Response, "oma_ + mcp:connect must be rejected");
  assert.equal(err.status, 403);
});

test("oma_ access token with admin scope passes the MCP guard", async () => {
  await seedAuthRequired();
  const token = accessTokensDb.createAccessToken({
    name: "mcp-oma-admin",
    scope: "admin",
    expiresAt: null,
  });
  const req = new Request("http://localhost:20128/api/mcp/stream", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.secret}`,
      "Content-Type": "application/json",
    },
  });
  const err = await requireManagementAuth(req, { acceptMcpConnectScope: true });
  assert.equal(err, null, "oma_ + admin must pass");
});
