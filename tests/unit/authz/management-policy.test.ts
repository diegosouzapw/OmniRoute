import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mgmt-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

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
