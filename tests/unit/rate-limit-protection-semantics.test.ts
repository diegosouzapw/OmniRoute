import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-rate-limit-protection-semantics-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports ensure DATA_DIR is configured before DB modules load
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const { POST: toggleRateLimitRoute } = await import("../../src/app/api/rate-limits/route.ts");
const { updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas/provider.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("rateLimitProtection: false does not opt active API-key connection out of auto-enable safety net", async () => {
  const explicitFalseConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Explicit False OpenAI",
    apiKey: "sk-false-key",
    isActive: true,
  });
  // Explicitly persist rateLimitProtection = false in database
  await providersDb.updateProviderConnection(explicitFalseConn.id, {
    rateLimitProtection: false,
  });

  const updatedConn = await providersDb.getProviderConnectionById(explicitFalseConn.id);
  assert.equal(updatedConn?.rateLimitProtection, false);

  // When autoEnableApiKeyProviders = true (default safety net)
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: true,
  });

  // Even though rateLimitProtection is explicitly false, the connection is still covered
  // under the global auto-enable safety net because false and undefined are equivalent
  // in reconcileEnabledConnections
  assert.equal(rateLimitManager.isRateLimitEnabled(explicitFalseConn.id), true);
  assert.ok(rateLimitManager.getAllRateLimitStatus()[`openai:${explicitFalseConn.id}`]);

  // When the global safety net is turned off:
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
  });

  // Now that auto-enable is disabled, the connection is not protected
  assert.equal(rateLimitManager.isRateLimitEnabled(explicitFalseConn.id), false);
  assert.equal(
    rateLimitManager.getAllRateLimitStatus()[`openai:${explicitFalseConn.id}`],
    undefined
  );
});

test("rateLimitProtection: true explicitly protects connection even when autoEnableApiKeyProviders is false", async () => {
  const explicitTrueConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Explicit True OpenAI",
    apiKey: "sk-true-key",
    isActive: true,
  });
  await providersDb.updateProviderConnection(explicitTrueConn.id, {
    rateLimitProtection: true,
  });

  // Disable global auto-enable
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
  });

  // Explicit true connection remains protected despite auto-enable being off
  assert.equal(rateLimitManager.isRateLimitEnabled(explicitTrueConn.id), true);
  assert.equal(rateLimitManager.getRateLimitStatus("openai", explicitTrueConn.id).enabled, true);

  // Once a request runs through the connection, the limiter is active
  await rateLimitManager.withRateLimit("openai", explicitTrueConn.id, "gpt-4o", async () => "ok");
  assert.ok(rateLimitManager.getAllRateLimitStatus()[`openai:${explicitTrueConn.id}`]);
});

test("POST /api/rate-limits toggles rateLimitProtection in DB and in-memory manager", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Anthropic Test",
    apiKey: "sk-ant-test",
    isActive: true,
  });

  // 1. Enable via POST /api/rate-limits
  const enableReq = new Request("http://localhost/api/rate-limits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ connectionId: conn.id, enabled: true }),
  });
  const enableRes = await toggleRateLimitRoute(enableReq);
  const enableJson = await enableRes.json();
  assert.equal(enableRes.status, 200);
  assert.deepEqual(enableJson, { success: true, connectionId: conn.id, enabled: true });

  let fetched = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(fetched?.rateLimitProtection, true);
  assert.equal(rateLimitManager.isRateLimitEnabled(conn.id), true);

  // 2. Disable via POST /api/rate-limits
  const disableReq = new Request("http://localhost/api/rate-limits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ connectionId: conn.id, enabled: false }),
  });
  const disableRes = await toggleRateLimitRoute(disableReq);
  const disableJson = await disableRes.json();
  assert.equal(disableRes.status, 200);
  assert.deepEqual(disableJson, { success: true, connectionId: conn.id, enabled: false });

  fetched = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(fetched?.rateLimitProtection, false);
});

test("PUT /api/providers/[id] validation schema strips/ignores rateLimitProtection (#11278)", async () => {
  // updateProviderConnectionSchema defines allowed fields for PUT /api/providers/[id]
  const parsed = updateProviderConnectionSchema.safeParse({
    name: "Updated Name",
    rateLimitProtection: true,
  });
  assert.equal(parsed.success, true);
  // rateLimitProtection must not be accepted as a valid update field
  assert.equal("rateLimitProtection" in (parsed.data as Record<string, unknown>), false);
});
