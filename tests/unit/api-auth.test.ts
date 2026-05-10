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
const localDb = await import("../../src/lib/localDb.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const apiAuth = await import("../../src/shared/utils/apiAuth.ts");
const { requireManagementAuth } = await import("../../src/lib/api/requireManagementAuth.ts");

const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

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

  assert.equal(await apiAuth.isAuthRequired(new Request("http://localhost/api/providers")), false);
  assert.equal(await apiAuth.isAuthRequired(new Request("http://127.0.0.1/api/providers")), false);
  assert.equal(
    await apiAuth.isAuthRequired(new Request("https://example.com/api/providers")),
    true
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

test("requireManagementAuth returns 401 with no credentials", async () => {
  await setupAuth();
  const res = await requireManagementAuth(managementRequest());
  assert.ok(res);
  assert.equal(res.status, 401);
});

test("requireManagementAuth returns 401 for an invalid API key", async () => {
  await setupAuth();
  const res = await requireManagementAuth(managementRequest("sk-not-a-real-key"));
  assert.ok(res);
  assert.equal(res.status, 401);
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

test("requireManagementAuth returns 401 for revoked key with manage scope", async () => {
  await setupAuth();
  const key = await apiKeysDb.createApiKey("revoked-admin", "machine-test", ["manage"]);
  await apiKeysDb.revokeApiKey(key.id);
  const res = await requireManagementAuth(managementRequest(key.key));
  assert.ok(res);
  assert.equal(res.status, 401);
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
