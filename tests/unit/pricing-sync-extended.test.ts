import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const pricingSync = await import("../../src/lib/pricingSync.ts");

const originalFetch = globalThis.fetch;
const originalWarn = console.warn;

function buildLiteLLMFixture() {
  return {
    "openai/gpt-4o": {
      input_cost_per_token: 0.0000025,
      output_cost_per_token: 0.00001,
      litellm_provider: "openai",
      mode: "chat",
    },
    "anthropic/claude-sonnet": {
      input_cost_per_token: 0.000003,
      output_cost_per_token: 0.000015,
      litellm_provider: "anthropic",
      mode: "chat",
    },
  };
}

async function resetStorage() {
  pricingSync.stopPeriodicSync();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;
  delete process.env.PRICING_SYNC_ENABLED;
});

test.after(async () => {
  pricingSync.stopPeriodicSync();
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("fetchLiteLLMPricing parses JSON and rejects invalid payloads", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(buildLiteLLMFixture()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const parsed = await pricingSync.fetchLiteLLMPricing();
  assert.ok(parsed["openai/gpt-4o"]);

  globalThis.fetch = async () =>
    new Response("not-json", {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  await assert.rejects(() => pricingSync.fetchLiteLLMPricing(), /LiteLLM returned invalid JSON/);
});

test("synced pricing round-trips through SQLite and skips corrupted rows", () => {
  pricingSync.saveSyncedPricing({
    openai: {
      "gpt-4o": { input: 2.5, output: 10 },
    },
  });

  const db = core.getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES ('pricing_synced', ?, ?)").run(
    "broken-provider",
    "{"
  );

  const warnings = [];
  console.warn = (message) => warnings.push(String(message));

  const synced = pricingSync.getSyncedPricing();
  assert.deepEqual(synced.openai["gpt-4o"], { input: 2.5, output: 10 });
  assert.equal(synced["broken-provider"], undefined);
  assert.equal(warnings.length, 1);

  pricingSync.clearSyncedPricing();
  assert.deepEqual(pricingSync.getSyncedPricing(), {});
});

test("syncPricingFromSources rejects unsupported sources", async () => {
  const result = await pricingSync.syncPricingFromSources({
    sources: ["bogus-source"],
    dryRun: true,
  });

  assert.equal(result.success, false);
  assert.match(result.error, /No valid sources provided/);
});

test("syncPricingFromSources supports dry runs with warnings without persisting data", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(buildLiteLLMFixture()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const result = await pricingSync.syncPricingFromSources({
    sources: ["litellm", "bogus-source"],
    dryRun: true,
  });

  assert.equal(result.success, true);
  assert.ok(result.data.openai);
  assert.deepEqual(result.warnings, ["Unknown sources ignored: bogus-source"]);
  assert.deepEqual(pricingSync.getSyncedPricing(), {});
});

test("syncPricingFromSources persists data and updates sync status", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(buildLiteLLMFixture()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const result = await pricingSync.syncPricingFromSources({
    sources: ["litellm"],
    dryRun: false,
  });

  const synced = pricingSync.getSyncedPricing();
  const status = pricingSync.getSyncStatus();

  assert.equal(result.success, true);
  assert.ok(synced.openai["gpt-4o"]);
  assert.equal(status.lastSyncModelCount, 4);
  assert.equal(status.lastSync !== null, true);
});

test("startPeriodicSync, stopPeriodicSync, and initPricingSync manage the timer lifecycle", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(buildLiteLLMFixture()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  pricingSync.startPeriodicSync(25);
  await new Promise((resolve) => setTimeout(resolve, 10));

  let status = pricingSync.getSyncStatus();
  assert.equal(status.intervalMs, 25);
  assert.equal(status.lastSyncModelCount, 4);

  pricingSync.stopPeriodicSync();

  process.env.PRICING_SYNC_ENABLED = "true";
  await pricingSync.initPricingSync();
  await new Promise((resolve) => setTimeout(resolve, 10));

  status = pricingSync.getSyncStatus();
  assert.equal(status.enabled, true);
  assert.equal(status.lastSyncModelCount, 4);
  pricingSync.stopPeriodicSync();
});
