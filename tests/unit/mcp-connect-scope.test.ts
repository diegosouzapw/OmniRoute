// #7895 — narrow `mcp:connect` scope + per-key HTTP tool-scope binding for
// remote MCP. Security-critical (touches the LOCAL_ONLY manage-scope bypass,
// Hard Rules #15/#17) — dedicated regression tests, mirroring the harness in
// tests/unit/authz/management-policy.test.ts.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mcp-connect-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
// API-key validation falls through to a Redis-backed cache otherwise — disable
// it for the local test loop so isValidApiKey() does not stall on ETIMEDOUT.
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { managementPolicy } = await import("../../src/server/authz/policies/management.ts");
const {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
} = await import("../../src/server/authz/routeGuard.ts");
const { MCP_CONNECT_SCOPE, hasMcpConnectOrManageScope } = await import(
  "../../src/shared/constants/managementScopes.ts"
);
const { resolveMcpCallerAuthInfo } = await import("../../open-sse/mcp-server/httpAuthContext.ts");
const { resolveCallerScopeContext, evaluateToolScopes } = await import(
  "../../open-sse/mcp-server/scopeEnforcement.ts"
);

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
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_JWT === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT;
  if (ORIGINAL_INITIAL === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL;
});

function mgmtCtx(headers: Headers, method = "GET", pathname = "/api/keys") {
  return {
    request: {
      method,
      headers,
      url: `http://localhost${pathname}`,
      nextUrl: { pathname },
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      reason: "management_api" as const,
      normalizedPath: pathname,
    },
    requestId: "req_mcp_connect_test",
  };
}

async function seedAuthRequired() {
  process.env.JWT_SECRET = "test-jwt-secret-for-mcp-connect-scope";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
}

// ─── 1. mcp:connect-only key passes the /api/mcp/ carve-out ────────────────

test("mcp:connect-only key passes the /api/mcp/ LOCAL_ONLY carve-out from non-loopback", async () => {
  await seedAuthRequired();
  const created = await apiKeysDb.createApiKey("mcp-connect-only", "machine-mcp-connect", [
    MCP_CONNECT_SCOPE,
  ]);

  const out = await managementPolicy.evaluate(
    mgmtCtx(new Headers({ authorization: `Bearer ${created.key}` }), "GET", "/api/mcp/stream")
  );

  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "management_key");
    assert.equal(out.subject.id, created.id);
    assert.ok(
      (out.subject.label ?? "").includes("mcp-connect"),
      `expected label to credit mcp-connect scope, got ${out.subject.label}`
    );
  }
});

// ─── 2. no manage/admin/mcp:connect → still rejected ────────────────────────

test("key with neither manage/admin nor mcp:connect is rejected for /api/mcp/ (403 LOCAL_ONLY)", async () => {
  await seedAuthRequired();
  const created = await apiKeysDb.createApiKey("chat-only-mcp", "machine-chat-only-mcp", ["chat"]);

  const out = await managementPolicy.evaluate(
    mgmtCtx(new Headers({ authorization: `Bearer ${created.key}` }), "GET", "/api/mcp/stream")
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "LOCAL_ONLY");
  }
});

// ─── 3. mcp:connect does NOT open any other management route ───────────────

test("mcp:connect does NOT authorize a non-mcp management route (still needs manage/admin)", async () => {
  await seedAuthRequired();
  const created = await apiKeysDb.createApiKey("mcp-connect-scope-only", "machine-mcp-only-key", [
    MCP_CONNECT_SCOPE,
  ]);

  // /api/keys is NOT LOCAL_ONLY — it falls through to the generic
  // bearer-token management-auth branch at the bottom of evaluate(), which
  // must keep using plain hasManageScope() and reject mcp:connect.
  const out = await managementPolicy.evaluate(
    mgmtCtx(new Headers({ authorization: `Bearer ${created.key}` }), "GET", "/api/keys")
  );

  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 403);
    assert.equal(out.code, "AUTH_001");
  }
});

test("hasMcpConnectOrManageScope: mcp:connect alone authorizes; manage/admin still do too", () => {
  assert.equal(hasMcpConnectOrManageScope([MCP_CONNECT_SCOPE]), true);
  assert.equal(hasMcpConnectOrManageScope(["manage"]), true);
  assert.equal(hasMcpConnectOrManageScope(["admin"]), true);
  assert.equal(hasMcpConnectOrManageScope(["chat"]), false);
  assert.equal(hasMcpConnectOrManageScope([]), false);
});

// ─── 4. authInfo.scopes populated per-key over HTTP; enforcement uses them ──

test("resolveMcpCallerAuthInfo resolves the caller's real per-key scopes from a Bearer header", async () => {
  const created = await apiKeysDb.createApiKey("scoped-http-caller", "machine-scoped-http", [
    "read:health",
    "read:combos",
  ]);

  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { authorization: `Bearer ${created.key}` },
  });

  const authInfo = await resolveMcpCallerAuthInfo(request);
  assert.ok(authInfo, "expected authInfo to resolve for a valid API key");
  assert.equal(authInfo?.clientId, created.id);
  assert.equal(authInfo?.token, created.key);
  assert.deepEqual([...(authInfo?.scopes ?? [])].sort(), ["read:combos", "read:health"]);
});

test("resolveMcpCallerAuthInfo returns undefined without a resolvable API key (no false grant)", async () => {
  const request = new Request("http://localhost/api/mcp/stream");
  const authInfo = await resolveMcpCallerAuthInfo(request);
  assert.equal(authInfo, undefined);
});

test("per-key authInfo.scopes takes precedence over the env fallback once resolved", async () => {
  const created = await apiKeysDb.createApiKey("scoped-enforce-caller", "machine-scoped-enforce", [
    "read:health",
  ]);
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { authorization: `Bearer ${created.key}` },
  });

  const authInfo = await resolveMcpCallerAuthInfo(request);
  assert.ok(authInfo);

  // Mirror what httpTransport.ts hands the MCP SDK: extra.authInfo populated
  // from the per-key lookup. scopeEnforcement.ts must prefer it over any env
  // fallback scopes, even when the env fallback would have granted access.
  const scopeContext = resolveCallerScopeContext({ authInfo }, ["write:combos"]);
  assert.equal(scopeContext.source, "authInfo");
  assert.deepEqual(scopeContext.scopes, ["read:health"]);

  const allowedCheck = evaluateToolScopes(
    "irrelevant-tool-name",
    scopeContext.scopes,
    true,
    ["read:health"]
  );
  assert.equal(allowedCheck.allowed, true);

  const deniedCheck = evaluateToolScopes(
    "irrelevant-tool-name",
    scopeContext.scopes,
    true,
    ["write:combos"]
  );
  assert.equal(deniedCheck.allowed, false, "per-key scopes must gate, not the wider env fallback");
});

// ─── 5. stdio path unaffected — still env fallback ──────────────────────────

test("stdio path is unaffected: with no authInfo/meta, scope resolution still falls back to env scopes", () => {
  // stdio tool handlers never populate extra.authInfo (no per-caller identity
  // over stdio — see mcpCallerIdentity.ts) and never call
  // resolveMcpCallerAuthInfo (HTTP/SSE-only, see httpTransport.ts). The only
  // scope source left for them is the OMNIROUTE_MCP_SCOPES env fallback.
  const scopeContext = resolveCallerScopeContext({ sessionId: "stdio-session" }, ["read:health"]);
  assert.equal(scopeContext.source, "env");
  assert.deepEqual(scopeContext.scopes, ["read:health"]);
});

test("stdio entrypoint (server.ts) does not import the HTTP-only authInfo resolver", () => {
  const serverSource = fs.readFileSync(
    new URL("../../open-sse/mcp-server/server.ts", import.meta.url),
    "utf8"
  );
  assert.ok(
    serverSource.includes("StdioServerTransport"),
    "sanity check: server.ts still wires the stdio transport"
  );
  assert.ok(
    !serverSource.includes("resolveMcpCallerAuthInfo"),
    "resolveMcpCallerAuthInfo is HTTP/SSE-only (httpTransport.ts) and must not leak into the shared server.ts used by stdio"
  );
});

// ─── 6. isLocalOnlyPath()/bypass regression guard (Hard Rule #15/#17) ───────

test("isLocalOnlyPath/isLocalOnlyBypassableByManageScope classification is unchanged by #7895", () => {
  assert.equal(isLocalOnlyPath("/api/mcp/sse"), true);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/mcp/sse"), true);

  // /api/cli-tools/runtime/* stays LOCAL_ONLY and NON-bypassable — mcp:connect
  // must not leak the carve-out to other spawn-capable prefixes.
  assert.equal(isLocalOnlyPath("/api/cli-tools/runtime/foo"), true);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/cli-tools/runtime/foo"), false);
});

test("mcp:connect key is still rejected for the non-bypassable /api/cli-tools/runtime/* prefix", async () => {
  await seedAuthRequired();
  const created = await apiKeysDb.createApiKey("mcp-connect-cli-runtime", "machine-mcp-cli", [
    MCP_CONNECT_SCOPE,
  ]);

  const out = await managementPolicy.evaluate(
    mgmtCtx(
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
