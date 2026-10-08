import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Split out of combo-routing-engine.test.ts (frozen size): #14188 quota reset timing on the
// "every combo target skipped" 429.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-skipped-reset-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

function createLog() {
  const noop = () => {};
  return { info: noop, warn: noop, error: noop, debug: noop };
}

test.beforeEach(() => {
  resetAllCircuitBreakers();
});

test.after(() => {
  resetAllCircuitBreakers();
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("handleComboChat surfaces the earliest provider-account reset when every target is unavailable", async () => {
  const later = new Date(Date.now() + 5 * 60_000).toISOString();
  const sooner = new Date(Date.now() + 2 * 60_000).toISOString();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Cooling later",
    apiKey: "sk-cooling-later",
    testStatus: "unavailable",
    rateLimitedUntil: later,
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Cooling sooner",
    apiKey: "sk-cooling-sooner",
    testStatus: "unavailable",
    rateLimitedUntil: sooner,
  });

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "provider-pool-cooling-down",
      strategy: "priority",
      models: ["openai/model-a", "openai/model-b"],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not run when all models are inactive");
    },
    isModelAvailable: async () => false,
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  const payload = (await result.json()) as {
    error: { type?: string; code?: string; retry_after?: number; reset_at?: string };
  };
  assert.equal(result.status, 429);
  assert.equal(payload.error.type, "rate_limit_error");
  assert.equal(payload.error.code, "ALL_TARGETS_SKIPPED");
  assert.equal(payload.error.reset_at, sooner);
  assert.ok(payload.error.retry_after >= 119 && payload.error.retry_after <= 120);
  assert.equal(result.headers.get("Retry-After"), String(payload.error.retry_after));
  assert.match(payload.error.message, /reset after (?:1m \d+s|2m)/);
});
