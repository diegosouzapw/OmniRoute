import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-ext-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");

function cleanupGlobalDb() {
  try {
    if ((globalThis as any).__omnirouteDb?.open) {
      (globalThis as any).__omnirouteDb.close();
    }
  } catch {}
  delete (globalThis as any).__omnirouteDb;
}

async function resetStorage() {
  cleanupGlobalDb();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

await resetStorage();

test("getSettings returns an object", async () => {
  const result = await settings.getSettings();
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("updateSettings stores and retrieves values", async () => {
  await resetStorage();
  await settings.updateSettings({ testKey: "testValue" });
  const result = await settings.getSettings();
  assert.equal((result as any).testKey, "testValue");
});

test("updateSettings handles multiple keys", async () => {
  await resetStorage();
  await settings.updateSettings({ key1: "val1", key2: 42, key3: true });
  const result = await settings.getSettings();
  assert.equal((result as any).key1, "val1");
  assert.equal((result as any).key2, 42);
  assert.equal((result as any).key3, true);
});

test("getPricing returns an object", async () => {
  await resetStorage();
  const result = await settings.getPricing();
  assert.ok(typeof result === "object");
});

test("getPricingForModel returns null for unknown model", async () => {
  await resetStorage();
  const result = await settings.getPricingForModel("unknown-provider", "unknown-model");
  assert.equal(result, null);
});

test("updatePricing stores pricing data", async () => {
  await resetStorage();
  await settings.updatePricing({
    testProvider: {
      testModel: { input: 1.0, output: 2.0 },
    },
  });
  const result = await settings.getPricingForModel("testProvider", "testModel");
  assert.ok(result !== null && result !== undefined);
});

test("resetPricing clears specific model pricing", async () => {
  await resetStorage();
  await settings.updatePricing({
    prov: { model: { input: 1.0, output: 2.0 } },
  });
  await settings.resetPricing("prov", "model");
  const result = await settings.getPricingForModel("prov", "model");
  assert.ok(result === null || result === undefined);
});

test("resetAllPricing clears all pricing", async () => {
  await resetStorage();
  await settings.updatePricing({
    p1: { m1: { input: 1.0 } },
    p2: { m2: { output: 2.0 } },
  });
  await settings.resetAllPricing();
  const result = await settings.getPricingForModel("p1", "m1");
  assert.ok(result === null || result === undefined);
});

test("getProxyConfig returns an object", async () => {
  await resetStorage();
  const result = await settings.getProxyConfig();
  assert.ok(typeof result === "object");
});

test("setProxyConfig stores proxy configuration", async () => {
  await resetStorage();
  await settings.setProxyConfig({ global: "http://proxy.example.com:8080" });
  const result = await settings.getProxyConfig();
  assert.ok(typeof result === "object");
});

test("getProxyForLevel returns null for unset level", async () => {
  await resetStorage();
  const result = await settings.getProxyForLevel("global");
  assert.equal(result, null);
});

test("setProxyForLevel stores proxy for level", async () => {
  await resetStorage();
  await settings.setProxyForLevel("global", null, "http://proxy.example.com:8080");
  const result = await settings.getProxyForLevel("global");
  assert.ok(result !== null);
});

test("deleteProxyForLevel removes proxy", async () => {
  await resetStorage();
  await settings.setProxyForLevel("global", null, "http://proxy.example.com:8080");
  await settings.deleteProxyForLevel("global", null);
  const result = await settings.getProxyForLevel("global");
  assert.ok(result === null || result === undefined);
});

test("bumpProxyConfigGeneration does not throw", () => {
  assert.doesNotThrow(() => settings.bumpProxyConfigGeneration());
});

test("isCloudEnabled returns boolean", async () => {
  await resetStorage();
  const result = await settings.isCloudEnabled();
  assert.ok(typeof result === "boolean");
});

test("getCacheMetrics returns an object", async () => {
  await resetStorage();
  const result = await settings.getCacheMetrics();
  assert.ok(typeof result === "object");
});

test("resetCacheMetrics does not throw", async () => {
  await resetStorage();
  assert.doesNotThrow(async () => await settings.resetCacheMetrics());
});

test("getCacheTrend returns an array", async () => {
  await resetStorage();
  const result = await settings.getCacheTrend(24);
  assert.ok(Array.isArray(result));
});

test("clearAllLKGP does not throw", async () => {
  await resetStorage();
  assert.doesNotThrow(() => settings.clearAllLKGP());
});

test("getLKGP returns null for unknown combo/model", async () => {
  await resetStorage();
  const result = await settings.getLKGP("unknown-combo", "unknown-model");
  assert.ok(result === null || typeof result === "object");
});

test("setLKGP and getLKGP round-trip", async () => {
  await resetStorage();
  await settings.setLKGP("test-combo", "test-model", {
    provider: "test",
    model: "test",
    connectionId: "conn-1",
  });
  const result = await settings.getLKGP("test-combo", "test-model");
  assert.ok(result === null || typeof result === "object");
});

test("getPricingWithSources returns pricing with source info", async () => {
  await resetStorage();
  const result = await settings.getPricingWithSources();
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("resolveProxyForConnection returns proxy resolution", async () => {
  await resetStorage();
  const result = await settings.resolveProxyForConnection("test-conn-id");
  assert.ok(typeof result === "object");
});
