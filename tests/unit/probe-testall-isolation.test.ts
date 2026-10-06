import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-probe-testall-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { runSingleModelTest } = await import("../../src/lib/api/modelTestRunner.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { refreshConnectionRateLimits, enableRateLimitProtection } =
  await import("@omniroute/open-sse/services/rateLimitManager.ts");

const originalFetch = globalThis.fetch;

// A test-all 403 can also open the provider circuit breaker and stale the
// 5s connections read cache (rawConnectionsCache) — either would
// short-circuit the NEXT tests before chatCore, a false positive for the
// isolation asserts. Reset both before every test.
test.beforeEach(() => {
  resetAllCircuitBreakers();
  invalidateDbCache("connections");
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function readConnectionRow(connId: string) {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => {
      get: (id: string) =>
        | {
            is_active: unknown;
            test_status: unknown;
            rate_limited_until: unknown;
            last_error: unknown;
          }
        | undefined;
    };
  };
  return db
    .prepare(
      "SELECT is_active, test_status, rate_limited_until, last_error FROM provider_connections WHERE id = ?"
    )
    .get(connId);
}

async function createConnection(): Promise<string> {
  const conn = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "probe-testall",
    apiKey: "sk-probe-testall", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
  });
  return String((conn as { id: string }).id);
}

// Warm up the chat-completions pipeline (SSE translators, compression
// settings, etc. lazy-init on the first real request in a process) with a
// fast success mock, mirroring model-test-runner.test.ts.
async function warmUp(connId: string): Promise<void> {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }), {
      headers: { "content-type": "application/json" },
    });
  await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
}

async function mockUpstream(status: number, message: string): Promise<void> {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message } }), {
      status,
      headers: { "content-type": "application/json" },
    });
}

const ASSERT_ISOLATED = (connId: string) => {
  const row = readConnectionRow(connId);
  assert.equal(row?.is_active, 1, "connection stays active after a probe failure");
  assert.notEqual(row?.test_status, "banned", "no terminal banned status from a probe");
  assert.notEqual(row?.test_status, "deactivated", "no deactivated status from a probe");
  assert.equal(row?.rate_limited_until, null, "no cooldown persisted by a probe");
  assert.ok(row?.last_error, "probe failure is recorded for visibility");
};

test("test-all FORBIDDEN failure (Sentinel) does not deactivate the connection", async () => {
  const connId = await createConnection();
  await warmUp(connId);
  await mockUpstream(403, "SENTINEL_BLOCKED");
  const result = await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "error");
  ASSERT_ISOLATED(connId);
});

test("test-all ACCOUNT_DEACTIVATED failure does not deactivate the connection", async () => {
  const connId = await createConnection();
  await warmUp(connId);
  await mockUpstream(403, "this account is deactivated");
  const result = await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "error");
  ASSERT_ISOLATED(connId);
});

test("queued (rate-limited) test-all failure stays isolated", async () => {
  const connId = await createConnection();
  await warmUp(connId);
  // Rate-limit protection is OFF by default for test connections (empty
  // enabledConnections — withRateLimit:537-540 would short-circuit directly,
  // a false positive on the inner wrapper). Enable it so the calls really
  // go through the Bottleneck limiter.
  enableRateLimitProtection(connId);
  // minTime 200 forces the 2nd job to wait behind the 1st — the queued job
  // must run inside the probe context (inner wrapper in withRateLimit);
  // without it, ASSERT_ISOLATED goes red.
  refreshConnectionRateLimits(connId, { minTime: 200 });
  await mockUpstream(403, "SENTINEL_BLOCKED");
  await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  ASSERT_ISOLATED(connId);
});

test("RESTORE: probe with opt-in probeCanDisable=true deactivates like real traffic", async () => {
  const settingsDb = await import("../../src/lib/db/settings.ts");
  await settingsDb.updateSettings({ probeCanDisable: true });
  try {
    const connId = await createConnection();
    await warmUp(connId);
    await mockUpstream(403, "SENTINEL_BLOCKED");
    const result = await runSingleModelTest({
      providerId: "openai",
      modelId: "gpt-4o",
      connectionId: connId,
      timeoutMs: 10_000,
    });
    assert.equal(result.status, "error");
    const row = readConnectionRow(connId);
    assert.equal(row?.is_active, 0, "opt-in restores historical behavior: probe deactivates");
    assert.equal(row?.test_status, "banned", "terminal banned status restored for probe");
  } finally {
    await settingsDb.updateSettings({ probeCanDisable: false });
  }
});
