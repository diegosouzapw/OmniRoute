import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const apiAuth = await import("../../src/shared/utils/apiAuth.ts");
const { requireManagementAuth } = await import("../../src/lib/api/requireManagementAuth.ts");
const { getLegacyCliTokenSync, getMachineTokenSync } =
  await import("../../src/lib/machineToken.ts");
const { AUTHZ_HEADER_PEER_LOCALITY, CLI_TOKEN_HEADER, PEER_IP_HEADER, VIA_PROXY_HEADER } =
  await import("../../src/server/authz/headers.ts");

const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_PEER_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;

// The per-process secret the custom Node server uses to stamp the real TCP peer
// (scripts/dev/peer-stamp.mjs). Tests mint the same `<token>|<ip>` shape.
const TEST_PEER_STAMP_TOKEN = "api-auth-test-peer-stamp-token";

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
}

/**
 * A request as the authz policy sees it: the custom server already stamped the
 * real TCP peer into PEER_IP_HEADER (token-validated), so the verdict cannot be
 * influenced by the URL / Host header the client chose.
 */
function stampedPeerRequest(url: string, peerIp: string, init: RequestInit = {}): Request {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = TEST_PEER_STAMP_TOKEN;
  const headers = new Headers(init.headers);
  headers.set(PEER_IP_HEADER, `${TEST_PEER_STAMP_TOKEN}|${peerIp}`);
  headers.set(VIA_PROXY_HEADER, `${TEST_PEER_STAMP_TOKEN}|0`);
  return new Request(url, { ...init, headers });
}

/** A direct Node / non-pipeline caller carrying a real socket peer. */
function socketPeerRequest(url: string, peerIp: string, init: RequestInit = {}): Request {
  return Object.assign(new Request(url, init), { ip: peerIp }) as Request;
}

function makeCookieRequest(token: string) {
  return {
    cookies: {
      get(name: string) {
        return name === "auth_token" && token ? { value: token } : undefined;
      },
    },
    headers: new Headers(),
  };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }

  if (ORIGINAL_PEER_STAMP_TOKEN === undefined) {
    delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  } else {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_PEER_STAMP_TOKEN;
  }
});

test("isPublicRoute recognizes allowed API prefixes", () => {
  assert.equal(apiAuth.isPublicRoute("/api/auth/login"), true);
  assert.equal(apiAuth.isPublicRoute("/api/v1/chat/completions"), true);
  assert.equal(apiAuth.isPublicRoute("/api/sync/bundle"), true);
  assert.equal(apiAuth.isPublicRoute("/api/monitoring/health", "GET"), true);
  assert.equal(apiAuth.isPublicRoute("/api/monitoring/health", "DELETE"), false);
  assert.equal(apiAuth.isPublicRoute("/api/settings"), false);
});

test("verifyAuth accepts a valid JWT session cookie", async () => {
  process.env.JWT_SECRET = "jwt-secret-for-tests";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  const result = await apiAuth.verifyAuth(makeCookieRequest(token));

  assert.equal(result, null);
});

test("verifyAuth falls back to bearer API key validation after a bad JWT", async () => {
  process.env.JWT_SECRET = "jwt-secret-for-tests";
  const key = await apiKeysDb.createApiKey("integration", "machine1234567890");
  const request = {
    cookies: {
      get() {
        return { value: "definitely-not-a-valid-jwt" };
      },
    },
    headers: new Headers({ authorization: `Bearer ${key.key}` }),
    url: "https://example.com/api/v1/models",
  };

  const result = await apiAuth.verifyAuth(request);

  assert.equal(result, null);
});

test("verifyAuth no longer accepts API keys supplied via query string (#3300 follow-up)", async () => {
  // Query-string token fallbacks were removed (credential-in-URL leaks into logs).
  const key = await apiKeysDb.createApiKey("query-auth", "machine1234567890");

  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers(),
    url: `https://example.com/api/v1/models?token=${encodeURIComponent(key.key)}`,
  });

  // No usable credential → authentication fails (was incorrectly accepted before).
  assert.notEqual(result, null);
});

test("isAuthenticated accepts API keys embedded in vscode path aliases", async () => {
  const key = await apiKeysDb.createApiKey("path-auth", "machine1234567890");
  const request = new Request(
    `https://example.com/api/v1/vscode/${encodeURIComponent(key.key)}/models`
  );

  const result = await apiAuth.isAuthenticated(request);

  assert.equal(result, true);
});

test("verifyAuth never honours a URL-borne token on MANAGEMENT routes (#3300 follow-up)", async () => {
  // The historical escalation: a credential in the query string on a management
  // route (/api/* but not /api/v1/*). It must not be extracted at all, so the
  // failure is "Authentication required" (no credential) — NOT "Invalid
  // management token" (which the pre-fix code returned, proving the URL token
  // had been picked up and tried against management validation).
  const key = await apiKeysDb.createApiKey("mgmt-url", "machine1234567890");

  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers(),
    url: `https://example.com/api/providers?token=${encodeURIComponent(key.key)}`,
  });

  assert.equal(result, "Authentication required");
});

test("verifyAuth rejects bearer API keys on management routes", async () => {
  const key = await apiKeysDb.createApiKey("integration", "machine1234567890");
  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers({ authorization: `Bearer ${key.key}` }),
    url: "https://example.com/api/providers",
  });

  assert.equal(result, "Invalid management token");
});

test("verifyAuth rejects requests without valid credentials", async () => {
  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers({ authorization: "Bearer sk-invalid" }),
    url: "https://example.com/api/v1/models",
  });

  assert.equal(result, "Authentication required");
});

test("isAuthenticated accepts bearer API keys on client-facing routes", async () => {
  const key = await apiKeysDb.createApiKey("integration", "machine1234567890");
  const request = new Request("https://example.com/api/v1/models", {
    headers: { authorization: `Bearer ${key.key}` },
  });

  const result = await apiAuth.isAuthenticated(request);

  assert.equal(result, true);
});

test("isAuthenticated rejects bearer API keys on management routes", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const key = await apiKeysDb.createApiKey("integration", "machine1234567890");
  const request = new Request("https://example.com/api/providers", {
    headers: { authorization: `Bearer ${key.key}` },
  });

  const result = await apiAuth.isAuthenticated(request);

  assert.equal(result, false);
});

test("verifyAuth accepts bearer API keys with manage scope on management routes", async () => {
  const key = await apiKeysDb.createApiKey("mcp-management", "machine1234567890", ["manage"]);
  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers({ authorization: `Bearer ${key.key}` }),
    url: "https://example.com/api/providers",
  });

  assert.equal(result, null);
});

test("verifyAuth accepts bearer API keys with admin scope on management routes", async () => {
  const key = await apiKeysDb.createApiKey("mcp-admin", "machine1234567890", ["admin"]);
  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers({ authorization: `Bearer ${key.key}` }),
    url: "https://example.com/api/settings",
  });

  assert.equal(result, null);
});

test("verifyAuth still rejects unscoped bearer API keys on management routes", async () => {
  const key = await apiKeysDb.createApiKey("integration-no-scope", "machine1234567890");
  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers({ authorization: `Bearer ${key.key}` }),
    url: "https://example.com/api/providers",
  });

  assert.equal(result, "Invalid management token");
});

test("isAuthenticated accepts bearer API keys with manage scope on management routes", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const key = await apiKeysDb.createApiKey("mcp-management", "machine1234567890", ["manage"]);
  const request = new Request("https://example.com/api/providers", {
    headers: { authorization: `Bearer ${key.key}` },
  });

  const result = await apiAuth.isAuthenticated(request);

  assert.equal(result, true);
});

test("monitoring health reset route requires dashboard authentication", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const healthRoute = await import("../../src/app/api/monitoring/health/route.ts");
  const response = await healthRoute.DELETE(
    new Request("https://example.com/api/monitoring/health", { method: "DELETE" })
  );

  assert.equal(response.status, 401);
});

test("isAuthenticated returns false when auth is required without valid credentials", async () => {
  // Force requireLogin to be active
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const request = new Request("https://example.com/api/providers");

  const result = await apiAuth.isAuthenticated(request);

  assert.equal(result, false);
});

test("isAuthRequired is disabled when requireLogin is false", async () => {
  await localDb.updateSettings({ requireLogin: false });

  const result = await apiAuth.isAuthRequired();

  assert.equal(result, false);
});

test("isAuthRequired is disabled while no password exists", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const result = await apiAuth.isAuthRequired();

  assert.equal(result, false);
});

test("isAuthRequired keeps fresh bootstrap open only on loopback", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "" });

  // Loopback is decided from the trusted peer (token-stamped real TCP peer or a
  // real socket), never from the URL / Host header (GHSA-7pq4-8pvv-rx7r).
  assert.equal(
    await apiAuth.isAuthRequired(stampedPeerRequest("http://localhost/api/providers", "127.0.0.1")),
    false
  );
  assert.equal(
    await apiAuth.isAuthRequired(stampedPeerRequest("http://127.0.0.1/api/providers", "::1")),
    false
  );
  assert.equal(
    await apiAuth.isAuthRequired(socketPeerRequest("http://localhost/api/providers", "127.0.0.1")),
    false
  );
  assert.equal(
    await apiAuth.isAuthRequired(new Request("https://example.com/api/providers")),
    true
  );
  assert.equal(
    await apiAuth.isAuthRequired(
      stampedPeerRequest("https://example.com/api/providers", "203.0.113.9")
    ),
    true
  );
});

// ── GHSA-7pq4-8pvv-rx7r — the bootstrap gate must not trust Host / nextUrl ─────

test("isLoopbackRequest ignores a spoofed Host header — a non-loopback stamped peer is never loopback (GHSA-7pq4-8pvv-rx7r)", async () => {
  // Remote attacker sending `Host: localhost` (the URL's hostname is exactly what
  // nextUrl.hostname / the Host header carry). The custom server stamped the real
  // peer as 203.0.113.9 → NOT loopback, whatever the client put in Host.
  const spoofed = stampedPeerRequest("http://localhost/api/providers", "203.0.113.9", {
    headers: { host: "localhost" },
  });
  assert.equal(apiAuth.isLoopbackRequest(spoofed), false);

  // A Host-only "localhost" with no trusted peer signal at all is not loopback either.
  assert.equal(
    apiAuth.isLoopbackRequest(new Request("http://localhost/api/providers")),
    false,
    "Host / nextUrl.hostname alone must never make a request loopback"
  );
  assert.equal(
    apiAuth.isLoopbackRequest(
      new Request("http://127.0.0.1/api/providers", { headers: { host: "127.0.0.1" } })
    ),
    false
  );

  // The forged stamp shape (`<wrong-token>|127.0.0.1`) fails closed.
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = TEST_PEER_STAMP_TOKEN;
  assert.equal(
    apiAuth.isLoopbackRequest(
      new Request("http://localhost/api/providers", {
        headers: { [PEER_IP_HEADER]: "not-the-process-token|127.0.0.1" },
      })
    ),
    false
  );

  // The genuine stamp for a loopback peer IS loopback — but not when the custom
  // server also flagged that the request arrived through a reverse-proxy hop.
  assert.equal(
    apiAuth.isLoopbackRequest(stampedPeerRequest("https://example.com/api/providers", "127.0.0.1")),
    true
  );
  assert.equal(
    apiAuth.isLoopbackRequest(
      new Request("http://localhost/api/providers", {
        headers: {
          [PEER_IP_HEADER]: `${TEST_PEER_STAMP_TOKEN}|127.0.0.1`,
          [VIA_PROXY_HEADER]: `${TEST_PEER_STAMP_TOKEN}|1`,
        },
      })
    ),
    false
  );
});

test("isLoopbackRequest consults Host only when no stamping server exists in the process (GHSA-7pq4-8pvv-rx7r)", async () => {
  // Every supported runtime calls ensurePeerStampToken() at boot, so once a token
  // exists a signal-less request is never loopback, whatever Host says.
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = TEST_PEER_STAMP_TOKEN;
  assert.equal(
    apiAuth.isLoopbackRequest(
      new Request("http://localhost/api/providers", { headers: { host: "localhost" } })
    ),
    false,
    "with a stamping server in front, Host must never make a request loopback"
  );

  // No token at all = no stamping server = direct handler invocation (the unit-test
  // harness). There is no real peer to read, so the historical URL verdict applies —
  // and it still rejects a non-loopback hostname.
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  assert.equal(apiAuth.isLoopbackRequest(new Request("http://localhost/api/providers")), true);
  assert.equal(apiAuth.isLoopbackRequest(new Request("https://example.com/api/providers")), false);
});

test("isLoopbackRequest trusts the pipeline locality verdict only when a stamping server is in front (GHSA-7pq4-8pvv-rx7r)", async () => {
  // Route handlers see AUTHZ_HEADER_PEER_LOCALITY, re-stamped by the pipeline
  // after every client-supplied copy was stripped — trustworthy only when the
  // per-process stamp token exists (i.e. the custom server is actually stamping).
  const verdict = new Request("https://example.com/api/providers", {
    headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "loopback" },
  });
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  assert.equal(apiAuth.isLoopbackRequest(verdict), false);

  process.env.OMNIROUTE_PEER_STAMP_TOKEN = TEST_PEER_STAMP_TOKEN;
  assert.equal(apiAuth.isLoopbackRequest(verdict), true);
  assert.equal(
    apiAuth.isLoopbackRequest(
      new Request("http://localhost/api/providers", {
        headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "remote" },
      })
    ),
    false
  );

  // A forged locality header never outranks the real stamped peer.
  assert.equal(
    apiAuth.isLoopbackRequest(
      stampedPeerRequest("http://localhost/api/providers", "203.0.113.9", {
        headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "loopback" },
      })
    ),
    false
  );
});

test("isAuthRequired gates the bootstrap require-login write on the trusted peer (GHSA-7pq4-8pvv-rx7r)", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "" });

  // The write that disarms every other guard (requireLogin=false) used to be an
  // unconditional `return false` — open to any network peer in the window.
  assert.equal(
    await apiAuth.isAuthRequired(
      new Request("https://example.com/api/settings/require-login", { method: "POST" })
    ),
    true,
    "remote POST /api/settings/require-login must require auth in the bootstrap window"
  );
  assert.equal(
    await apiAuth.isAuthRequired(
      stampedPeerRequest("http://localhost/api/settings/require-login", "203.0.113.9", {
        method: "POST",
        headers: { host: "localhost" },
      })
    ),
    true,
    "Host: localhost from a non-loopback stamped peer must not reopen the write path"
  );
  assert.equal(
    await apiAuth.isAuthenticated(
      new Request("https://example.com/api/settings/require-login", { method: "POST" })
    ),
    false
  );

  // The genuine local operator keeps the first-password flow — including after
  // onboarding completed without a password (setupComplete: true).
  assert.equal(
    await apiAuth.isAuthRequired(
      stampedPeerRequest("http://localhost/api/settings/require-login", "127.0.0.1", {
        method: "POST",
      })
    ),
    false
  );
  await localDb.updateSettings({ requireLogin: true, password: "", setupComplete: true });
  assert.equal(
    await apiAuth.isAuthRequired(
      stampedPeerRequest("http://localhost/api/settings/require-login", "127.0.0.1", {
        method: "POST",
      })
    ),
    false
  );
  assert.equal(
    await apiAuth.isAuthRequired(
      new Request("https://example.com/api/settings/require-login", { method: "POST" })
    ),
    true
  );
});

test("isAuthRequired honours an explicit trusted loopback verdict from the policy layer", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "" });

  // The authz policy resolves locality itself (peerContext) and hands the
  // verdict down, so the bootstrap gate never re-reads the ORIGINAL request's
  // client-controlled headers.
  const forged = new Request("http://localhost/api/settings/require-login", {
    method: "POST",
    headers: { host: "localhost", [AUTHZ_HEADER_PEER_LOCALITY]: "loopback" },
  });
  assert.equal(await apiAuth.isAuthRequired(forged, { loopback: false }), true);
  assert.equal(await apiAuth.isAuthRequired(forged, { loopback: true }), false);
  assert.equal(
    await apiAuth.isAuthRequired(new Request("https://example.com/api/providers"), {
      loopback: true,
    }),
    false
  );
});

test("isAuthenticated rejects remote management bootstrap without a configured password", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const request = new Request("https://example.com/api/providers");

  assert.equal(await apiAuth.isAuthenticated(request), false);
});

test("isAuthRequired stays enabled when a password exists", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "hashed-password" });

  const result = await apiAuth.isAuthRequired();

  assert.equal(result, true);
});

test("isAuthRequired stays enabled when INITIAL_PASSWORD is present", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const result = await apiAuth.isAuthRequired();

  assert.equal(result, true);

  delete process.env.INITIAL_PASSWORD;
});
test("isAuthRequired stays enabled when OIDC is fully configured (replaces password for gate)", async () => {
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.example.com",
    oidcClientId: "client-123",
    oidcClientSecret: "secret-xyz",
  });

  const result = await apiAuth.isAuthRequired();
  assert.equal(result, true);
});

test("isAuthRequired treats partial OIDC config as not configured (bootstrap behavior preserved)", async () => {
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.example.com",
    // missing clientId + clientSecret
  });

  // On loopback (trusted stamped peer) without full config → bootstrap allowed
  assert.equal(
    await apiAuth.isAuthRequired(stampedPeerRequest("http://localhost/api/providers", "127.0.0.1")),
    false
  );
  // Remote still requires auth
  assert.equal(
    await apiAuth.isAuthRequired(new Request("https://example.com/api/providers")),
    true
  );
});

test("getApiKeyMetadata recognizes OMNIROUTE_API_KEY environment variable", async () => {
  const envKey = "sk-test-env-key-" + Date.now();
  process.env.OMNIROUTE_API_KEY = envKey;

  const metadata = await apiKeysDb.getApiKeyMetadata(envKey);

  assert.ok(metadata);
  assert.equal(metadata.id, "env-key");
  assert.equal(metadata.name, "Environment Key");

  delete process.env.OMNIROUTE_API_KEY;
});

test("getApiKeyMetadata recognizes ROUTER_API_KEY environment variable", async () => {
  const envKey = "sk-test-router-key-" + Date.now();
  process.env.ROUTER_API_KEY = envKey;

  const metadata = await apiKeysDb.getApiKeyMetadata(envKey);

  assert.ok(metadata);
  assert.equal(metadata.id, "env-key");

  delete process.env.ROUTER_API_KEY;
});

// ──── requireManagementAuth ────

async function setupAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

function managementRequest(bearerKey?: string) {
  return new Request("https://example.com/api/combos", {
    headers: bearerKey ? { authorization: `Bearer ${bearerKey}` } : {},
  });
}

function managementCliRequest(token: string) {
  const request = new Request("http://localhost:20128/api/combos", {
    headers: { [CLI_TOKEN_HEADER]: token },
  });
  return Object.assign(request, { ip: "127.0.0.1" }) as Request;
}

test("requireManagementAuth returns 401 with no credentials", async () => {
  await setupAuth();
  const res = await requireManagementAuth(managementRequest());
  assert.ok(res);
  assert.equal(res.status, 401);
});

test("requireManagementAuth returns 403 for an invalid management token", async () => {
  await setupAuth();
  const res = await requireManagementAuth(managementRequest("sk-not-a-real-key"));
  assert.ok(res);
  assert.equal(res.status, 403);
  const body = await res.json();
  assert.equal(body.error?.message, "Invalid management token");
});

test("requireManagementAuth returns 403 for valid key without manage scope", async () => {
  await setupAuth();
  const key = await apiKeysDb.createApiKey("inference-only", "machine-test");
  const res = await requireManagementAuth(managementRequest(key.key));
  assert.ok(res);
  assert.equal(res.status, 403);
  const body = await res.json();
  assert.ok(body.error?.message?.includes("manage"));
});

test("requireManagementAuth returns null for valid key with manage scope", async () => {
  await setupAuth();
  const key = await apiKeysDb.createApiKey("admin-key", "machine-test", ["manage"]);
  const res = await requireManagementAuth(managementRequest(key.key));
  assert.equal(res, null);
});

test("requireManagementAuth accepts the 64-character local machine token", async () => {
  await setupAuth();
  const token = getMachineTokenSync();
  assert.equal(token.length, 64);
  const res = await requireManagementAuth(managementCliRequest(token));
  assert.equal(res, null);
});

test("requireManagementAuth accepts the legacy 32-character local CLI token", async () => {
  await setupAuth();
  const token = getLegacyCliTokenSync();
  assert.equal(token.length, 32);
  const res = await requireManagementAuth(managementCliRequest(token));
  assert.equal(res, null);
});

test("requireManagementAuth returns null for OMNIROUTE_API_KEY env passthrough", async () => {
  await setupAuth();
  const envKey = "sk-env-root-" + Date.now();
  process.env.OMNIROUTE_API_KEY = envKey;
  try {
    const res = await requireManagementAuth(managementRequest(envKey));
    assert.equal(res, null);
  } finally {
    delete process.env.OMNIROUTE_API_KEY;
  }
});

test("requireManagementAuth returns 403 for revoked key with manage scope", async () => {
  await setupAuth();
  const key = await apiKeysDb.createApiKey("revoked-admin", "machine-test", ["manage"]);
  await apiKeysDb.revokeApiKey(key.id);
  const res = await requireManagementAuth(managementRequest(key.key));
  assert.ok(res);
  assert.equal(res.status, 403);
  const body = await res.json();
  assert.equal(body.error?.message, "Invalid management token");
});

test("requireManagementAuth returns null for valid JWT cookie", async () => {
  await setupAuth();
  process.env.JWT_SECRET = "jwt-secret-for-tests";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  const request = {
    cookies: { get: (name: string) => (name === "auth_token" ? { value: token } : undefined) },
    headers: new Headers(),
    url: "https://example.com/api/combos",
  };
  const res = await requireManagementAuth(request as unknown as Request);
  assert.equal(res, null);
});
