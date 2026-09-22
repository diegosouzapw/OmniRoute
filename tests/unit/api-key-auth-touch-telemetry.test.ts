import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-auth-touch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "auth-touch-test-secret";
process.env.REQUIRE_API_KEY = "true";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const core = await import("../../src/lib/db/core.ts");

function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  process.env.REQUIRE_API_KEY = "true";
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function loadPolicy() {
  const mod = await import(`../../src/server/authz/policies/clientApi.ts?ts=${Date.now()}`);
  return mod.clientApiPolicy;
}

function context(options: {
  headers: Headers;
  method?: string;
  normalizedPath?: string;
  ip?: string;
  requestId?: string;
}) {
  const method = options.method ?? "GET";
  const normalizedPath = options.normalizedPath ?? "/api/v1/models";
  return {
    request: {
      method,
      headers: options.headers,
      url: `http://localhost${normalizedPath}`,
      ip: options.ip,
    },
    classification: {
      routeClass: "CLIENT_API" as const,
      reason: "client_api_v1" as const,
      normalizedPath,
    },
    requestId: options.requestId ?? "req_auth_touch",
  };
}

function authTouchRows() {
  return compliance.getAuditLog({
    action: compliance.API_KEY_AUTH_TOUCH_ACTION,
    limit: 500,
  });
}

test("successful discovery auth records bounded metadata without the credential or query", async () => {
  const created = await apiKeysDb.createApiKey("operator discovery", "machine-auth-touch");
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata?.keyHash);

  const userAgent = `Codex/1.2 Bearer ${created.key} hash=${metadata.keyHash}${"x".repeat(400)}`;
  const policy = await loadPolicy();
  const outcome = await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": userAgent,
        "x-forwarded-for": "203.0.113.99",
      }),
      normalizedPath: "/api/v1/models?api_key=query-secret",
      ip: "198.51.100.20",
    })
  );

  assert.equal(outcome.allow, true);
  const [row] = authTouchRows();
  assert.ok(row);
  assert.equal(row.target, created.id);
  assert.equal(row.actor, "api_key");
  assert.equal(row.ip, "198.51.100.20", "direct peers must ignore spoofed forwarding headers");
  assert.deepEqual(row.metadata, {
    method: "GET",
    path: "/api/v1/models",
    userAgent: (row.metadata as { userAgent: string }).userAgent,
  });

  const recordedUserAgent = (row.metadata as { userAgent: string }).userAgent;
  assert.ok(recordedUserAgent.length <= 256);
  assert.doesNotMatch(recordedUserAgent, /[\u0000-\u001f\u007f]/);
  assert.doesNotMatch(
    recordedUserAgent,
    new RegExp(created.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  );
  assert.doesNotMatch(recordedUserAgent, new RegExp(metadata.keyHash));

  const raw = core
    .getDbInstance()
    .prepare("SELECT * FROM audit_log WHERE action = ?")
    .get(compliance.API_KEY_AUTH_TOUCH_ACTION) as Record<string, unknown>;
  const serialized = JSON.stringify(raw);
  assert.doesNotMatch(serialized, /query-secret/);
  assert.doesNotMatch(serialized, new RegExp(created.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(serialized, new RegExp(metadata.keyHash));
  assert.doesNotMatch(serialized, /authorization/i);
});

test("trusted proxy forwarding is recorded while a direct peer cannot spoof it", async () => {
  const created = await apiKeysDb.createApiKey("proxy attribution", "machine-proxy-touch");
  const policy = await loadPolicy();
  const headers = new Headers({
    authorization: `Bearer ${created.key}`,
    "user-agent": "CatalogClient/1.0",
    "x-forwarded-for": "203.0.113.44",
  });

  await policy.evaluate(context({ headers, ip: "198.51.100.21", requestId: "req_direct" }));
  await policy.evaluate(context({ headers, ip: "127.0.0.1", requestId: "req_proxy" }));

  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "auth-touch-stamp";
  await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": "CatalogClient/1.0",
        "x-forwarded-for": "203.0.113.45",
        "x-omniroute-peer-ip": "auth-touch-stamp|172.18.0.2",
        "x-omniroute-via-proxy": "auth-touch-stamp|1",
      }),
      requestId: "req_docker_proxy",
    })
  );
  await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": "CatalogClient/1.0",
        "x-forwarded-for": "203.0.113.250",
        "x-omniroute-peer-ip": "auth-touch-stamp|198.51.100.22",
        "x-omniroute-via-proxy": "auth-touch-stamp|1",
      }),
      requestId: "req_public_peer_spoof",
    })
  );

  const ips = authTouchRows()
    .map((row) => row.ip)
    .sort();
  assert.deepEqual(ips, ["198.51.100.21", "198.51.100.22", "203.0.113.44", "203.0.113.45"]);
});

test("failed auth, inference POSTs, noLog keys, and environment keys produce no touch", async () => {
  const policy = await loadPolicy();

  const failed = await policy.evaluate(
    context({ headers: new Headers({ authorization: "Bearer invalid-secret" }) })
  );
  assert.equal(failed.allow, false);

  const inferenceKey = await apiKeysDb.createApiKey("inference", "machine-inference");
  const inference = await policy.evaluate(
    context({
      headers: new Headers({ authorization: `Bearer ${inferenceKey.key}` }),
      method: "POST",
      normalizedPath: "/api/v1/responses",
    })
  );
  assert.equal(inference.allow, true);

  const noLogKey = await apiKeysDb.createApiKey("private", "machine-private");
  assert.equal(await apiKeysDb.updateApiKeyPermissions(noLogKey.id, { noLog: true }), true);
  const noLog = await policy.evaluate(
    context({ headers: new Headers({ authorization: `Bearer ${noLogKey.key}` }) })
  );
  assert.equal(noLog.allow, true);

  process.env.OMNIROUTE_API_KEY = "environment-only-key";
  const envKey = await policy.evaluate(
    context({ headers: new Headers({ authorization: "Bearer environment-only-key" }) })
  );
  assert.equal(envKey.allow, true);

  assert.equal(authTouchRows().length, 0);
});

test("identical touches coalesce and the telemetry action is hard-capped", async () => {
  const created = await apiKeysDb.createApiKey("bounded", "machine-bounded");
  const base = Date.parse("2026-09-21T12:00:00.000Z");

  compliance.recordApiKeyAuthTouch({
    apiKeyId: created.id,
    method: "GET",
    normalizedPath: "/api/v1/models",
    ipAddress: "127.0.0.1",
    userAgent: "same-client",
    createdAt: new Date(base).toISOString(),
  });
  compliance.recordApiKeyAuthTouch({
    apiKeyId: created.id,
    method: "GET",
    normalizedPath: "/api/v1/models",
    ipAddress: "127.0.0.1",
    userAgent: "same-client",
    createdAt: new Date(base + 60_000).toISOString(),
  });
  assert.equal(compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }), 1);

  for (let index = 0; index <= compliance.API_KEY_AUTH_TOUCH_MAX_ROWS; index += 1) {
    compliance.recordApiKeyAuthTouch({
      apiKeyId: created.id,
      method: "GET",
      normalizedPath: `/api/v1/models/${index}`,
      ipAddress: "127.0.0.1",
      userAgent: `client-${index}`,
      createdAt: new Date(base + 10 * 60_000 + index).toISOString(),
    });
  }

  assert.equal(
    compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }),
    compliance.API_KEY_AUTH_TOUCH_MAX_ROWS
  );
  assert.equal(
    compliance.getAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION, limit: 10 }).length,
    10,
    "existing management read pagination remains usable"
  );
});

test("auth-touch rows follow existing application-log retention", async () => {
  const created = await apiKeysDb.createApiKey("retention", "machine-retention");
  compliance.recordApiKeyAuthTouch({
    apiKeyId: created.id,
    method: "GET",
    normalizedPath: "/api/v1/models",
    createdAt: "2000-01-01T00:00:00.000Z",
  });
  assert.equal(compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }), 1);

  const cleanup = await compliance.cleanupExpiredLogs();
  assert.ok(cleanup.deletedAuditLogs >= 1);
  assert.equal(compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }), 0);
});
