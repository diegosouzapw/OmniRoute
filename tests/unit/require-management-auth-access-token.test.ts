import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Integration: the management auth gate must accept scoped CLI access tokens
// (`oma_...`) and enforce the method+admin-allowlist scope policy. Other
// credential paths (dashboard JWT, loopback CLI token, manage-scope API key)
// are unaffected. Isolated DATA_DIR + DB handle closed in test.after.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mgmt-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// Force isAuthRequired() === true deterministically (config'd password present).
process.env.INITIAL_PASSWORD = "test-pass";

const core = await import("../../src/lib/db/core.ts");
const at = await import("../../src/lib/db/accessTokens.ts");
const { requireManagementAuth } = await import("../../src/lib/api/requireManagementAuth.ts");

const BASE = "http://localhost:20128";

function req(method: string, pathname: string, token?: string): Request {
  const headers: Record<string, string> = {};
  if (token) headers.authorization = `Bearer ${token}`;
  return new Request(`${BASE}${pathname}`, { method, headers });
}

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
  delete process.env.INITIAL_PASSWORD;
});

test("read token: allowed on GET, rejected (403) on a write route", async () => {
  const { secret } = at.createAccessToken({ name: "read-tok", scope: "read" });
  assert.equal(await requireManagementAuth(req("GET", "/api/v1/models", secret)), null);

  const denied = await requireManagementAuth(req("POST", "/api/keys", secret));
  assert.ok(denied, "expected a rejection Response");
  assert.equal(denied?.status, 403);
});

test("write token: allowed on write route, rejected (403) on admin route", async () => {
  const { secret } = at.createAccessToken({ name: "write-tok", scope: "write" });
  assert.equal(await requireManagementAuth(req("POST", "/api/keys", secret)), null);
  assert.equal(await requireManagementAuth(req("GET", "/api/v1/models", secret)), null);

  const denied = await requireManagementAuth(req("POST", "/api/cli/tokens", secret));
  assert.equal(denied?.status, 403);
});

test("admin token: allowed on admin route", async () => {
  const { secret } = at.createAccessToken({ name: "admin-tok", scope: "admin" });
  assert.equal(await requireManagementAuth(req("POST", "/api/cli/tokens", secret)), null);
  assert.equal(await requireManagementAuth(req("POST", "/api/providers", secret)), null);
});

test("invalid/expired access token is rejected with 401", async () => {
  const bad = await requireManagementAuth(req("GET", "/api/v1/models", "oma_live_not_a_real_token"));
  assert.equal(bad?.status, 401);

  const past = new Date(Date.now() - 60_000).toISOString();
  const { secret } = at.createAccessToken({ name: "exp", scope: "admin", expiresAt: past });
  const expired = await requireManagementAuth(req("GET", "/api/v1/models", secret));
  assert.equal(expired?.status, 401);
});

test("revoked access token is rejected", async () => {
  const { secret, record } = at.createAccessToken({ name: "rev", scope: "admin" });
  assert.equal(await requireManagementAuth(req("GET", "/api/v1/models", secret)), null);
  at.revokeAccessToken(record.id);
  const denied = await requireManagementAuth(req("GET", "/api/v1/models", secret));
  assert.equal(denied?.status, 401);
});

test("no credential at all → 401 (auth still required)", async () => {
  const denied = await requireManagementAuth(req("GET", "/api/v1/models"));
  assert.equal(denied?.status, 401);
});
