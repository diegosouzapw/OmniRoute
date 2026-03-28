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

function makeCookieRequest(token) {
  return {
    cookies: {
      get(name) {
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
  };

  const result = await apiAuth.verifyAuth(request);

  assert.equal(result, null);
});

test("verifyAuth rejects requests without valid credentials", async () => {
  const result = await apiAuth.verifyAuth({
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers({ authorization: "Bearer sk-invalid" }),
  });

  assert.equal(result, "Authentication required");
});

test("isAuthenticated accepts bearer API keys", async () => {
  const key = await apiKeysDb.createApiKey("integration", "machine1234567890");
  const request = new Request("https://example.com/api/providers", {
    headers: { authorization: `Bearer ${key.key}` },
  });

  const result = await apiAuth.isAuthenticated(request);

  assert.equal(result, true);
});

test("isAuthenticated returns false without valid credentials", async () => {
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
});
