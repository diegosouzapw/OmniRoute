/**
 * Opt-in latency term for p2c account selection (resilienceSettings.p2cLatency.weight).
 * Weight 0 (the default) keeps today's pick; a positive weight steers p2c toward the
 * connection with the lower rolling TTFB. Also covers the setting's resolve/merge/schema
 * round-trip and the request-path recorder in safeLogEvents.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-p2c-latency-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "p2c-latency-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const tracker = await import("../../open-sse/services/connectionLatencyTracker.ts");
const resilience = await import("../../src/lib/resilience/settings.ts");
const schemas = await import("../../src/shared/validation/schemas/settings.ts");
const chatHelpers = await import("../../src/sse/handlers/chatHelpers.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(name: string, priority: number) {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: {},
  });
}

function seedLatency(connectionId: string, ttfbMs: number) {
  for (let i = 0; i < tracker.LATENCY_MIN_SAMPLES; i++) {
    tracker.recordConnectionOutcome(connectionId, null, ttfbMs, true);
  }
}

test.beforeEach(async () => {
  tracker.resetConnectionLatencyTracker();
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("p2c latency weight defaults to 0 (off)", () => {
  assert.deepEqual(resilience.DEFAULT_RESILIENCE_SETTINGS.p2cLatency, { weight: 0 });
  assert.deepEqual(resilience.resolveResilienceSettings({}).p2cLatency, { weight: 0 });
});

test("p2c latency weight resolves, merges and clamps to 0..20", () => {
  const stored = resilience.resolveResilienceSettings({
    resilienceSettings: { p2cLatency: { weight: 8 } },
  });
  assert.equal(stored.p2cLatency.weight, 8);
  const clamped = resilience.resolveResilienceSettings({
    resilienceSettings: { p2cLatency: { weight: 500 } },
  });
  assert.equal(clamped.p2cLatency.weight, 20);

  const merged = resilience.mergeResilienceSettings(
    structuredClone(resilience.DEFAULT_RESILIENCE_SETTINGS),
    { p2cLatency: { weight: 5 } }
  );
  assert.equal(merged.p2cLatency.weight, 5);
  const untouched = resilience.mergeResilienceSettings(merged, {
    comboCooldownWait: { maxWaitMs: 2000 },
  });
  assert.equal(untouched.p2cLatency.weight, 5);
});

test("PATCH /api/resilience schema accepts p2cLatency on its own and rejects bad values", () => {
  const schema = schemas.updateResilienceSchema;
  assert.equal(schema.safeParse({ p2cLatency: { weight: 10 } }).success, true);
  assert.equal(schema.safeParse({ p2cLatency: { weight: 21 } }).success, false);
  assert.equal(schema.safeParse({ p2cLatency: { weight: -1 } }).success, false);
  assert.equal(schema.safeParse({ p2cLatency: { weight: 5, extra: 1 } }).success, false);
});

test("with weight 0, p2c ignores latency and keeps today's pick", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "p2c" });
  const slow = await seedConnection("p2c-slow-primary", 1);
  const fast = await seedConnection("p2c-fast-secondary", 2);
  seedLatency(slow.id, 400);
  seedLatency(fast.id, 100);

  const selected = await auth.getProviderCredentials("openai");

  assert.equal(selected.connectionId, slow.id);
});

test("with a positive weight, p2c prefers the connection with the lower rolling TTFB", async () => {
  await settingsDb.updateSettings({
    fallbackStrategy: "p2c",
    resilienceSettings: { p2cLatency: { weight: 10 } },
  });
  const slow = await seedConnection("p2c-slow-primary", 1);
  const fast = await seedConnection("p2c-fast-secondary", 2);
  seedLatency(slow.id, 400);
  seedLatency(fast.id, 100);

  const selected = await auth.getProviderCredentials("openai");

  assert.equal(selected.connectionId, fast.id);
});

test("with a positive weight, a connection without enough samples is not penalized", async () => {
  await settingsDb.updateSettings({
    fallbackStrategy: "p2c",
    resilienceSettings: { p2cLatency: { weight: 10 } },
  });
  const unproven = await seedConnection("p2c-unproven-primary", 1);
  const fast = await seedConnection("p2c-fast-secondary", 2);
  tracker.recordConnectionOutcome(unproven.id, null, 400, true);
  seedLatency(fast.id, 100);

  const selected = await auth.getProviderCredentials("openai");

  assert.equal(selected.connectionId, unproven.id);
});

test("safeLogEvents records the attempt TTFB and outcome for the serving connection", async () => {
  await chatHelpers.safeLogEvents({
    result: { success: true },
    proxyInfo: null,
    proxyLatency: 123,
    provider: "openai",
    model: "gpt-4o-mini",
    sourceFormat: "openai",
    targetFormat: "openai",
    credentials: { connectionId: "conn-recorded" },
    comboName: null,
    clientRawRequest: null,
  });
  await chatHelpers.safeLogEvents({
    result: { success: false, status: 500 },
    proxyInfo: null,
    proxyLatency: 50,
    provider: "openai",
    model: "gpt-4o-mini",
    sourceFormat: "openai",
    targetFormat: "openai",
    credentials: { connectionId: "conn-recorded" },
    comboName: null,
    clientRawRequest: null,
  });

  const stats = tracker.getConnectionLatencyStats("conn-recorded");
  assert.equal(stats.samples, 2);
  assert.equal(stats.avgTtfbMs, 123);
  assert.equal(stats.errorRate, 0.5);
});
