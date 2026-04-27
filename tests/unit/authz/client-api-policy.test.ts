import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-clientapi-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const core = await import("../../../src/lib/db/core.ts");

const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;
const ORIGINAL_ROUTER_API_KEY = process.env.ROUTER_API_KEY;

function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_OMNIROUTE_API_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_OMNIROUTE_API_KEY;
  if (ORIGINAL_ROUTER_API_KEY === undefined) delete process.env.ROUTER_API_KEY;
  else process.env.ROUTER_API_KEY = ORIGINAL_ROUTER_API_KEY;
});

async function loadPolicy() {
  const mod = await import(`../../../src/server/authz/policies/clientApi.ts?ts=${Date.now()}`);
  return mod.clientApiPolicy;
}

function ctx(headers: Headers) {
  return {
    request: { method: "POST", headers },
    classification: {
      routeClass: "CLIENT_API" as const,
      reason: "client_api_v1" as const,
      normalizedPath: "/api/v1/chat/completions",
    },
    requestId: "req_test",
  };
}

test("clientApiPolicy: missing bearer is rejected with 401", async () => {
  const policy = await loadPolicy();
  const out = await policy.evaluate(ctx(new Headers()));
  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 401);
    assert.equal(out.code, "AUTH_002");
  }
});

test("clientApiPolicy: invalid bearer is rejected with 401", async () => {
  const policy = await loadPolicy();
  const headers = new Headers({ authorization: "Bearer sk-totally-bogus" });
  const out = await policy.evaluate(ctx(headers));
  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 401);
    assert.equal(out.code, "AUTH_002");
  }
});

test("clientApiPolicy: valid bearer is accepted as client_api_key subject", async () => {
  const created = await apiKeysDb.createApiKey("policy-test-key", "machine-test-1234");
  assert.ok(created?.key, "createApiKey must return a key");

  const policy = await loadPolicy();
  const headers = new Headers({ authorization: `Bearer ${created.key}` });
  const out = await policy.evaluate(ctx(headers));
  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "client_api_key");
    assert.match(out.subject.id, /^key_/);
  }
});

test("clientApiPolicy: revoked bearer is rejected", async () => {
  const created = await apiKeysDb.createApiKey("policy-revoked-key", "machine-revoked");
  assert.ok(await apiKeysDb.revokeApiKey(created.id));

  const policy = await loadPolicy();
  const headers = new Headers({ authorization: `Bearer ${created.key}` });
  const out = await policy.evaluate(ctx(headers));
  assert.equal(out.allow, false);
});

test("clientApiPolicy: environment API key remains accepted for client API routes", async () => {
  process.env.OMNIROUTE_API_KEY = "sk-env-policy-test";

  const policy = await loadPolicy();
  const out = await policy.evaluate(
    ctx(new Headers({ authorization: "Bearer sk-env-policy-test" }))
  );

  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "client_api_key");
  }
});
