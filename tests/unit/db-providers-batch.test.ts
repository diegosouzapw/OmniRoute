/**
 * Tests for getProviderConnectionsByProviders (batch N+1 eliminator).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-providers-batch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
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

test.before(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test("batch result per provider equals looped single calls", async () => {
  await resetStorage();

  // Seed 2 providers × 2 connections each
  await providersDb.createProviderConnection({
    provider: "p1",
    authType: "apikey",
    name: "p1-conn-a",
    apiKey: "k-p1a",
    priority: 2,
  });
  await providersDb.createProviderConnection({
    provider: "p1",
    authType: "apikey",
    name: "p1-conn-b",
    apiKey: "k-p1b",
    priority: 1,
  });
  await providersDb.createProviderConnection({
    provider: "p2",
    authType: "apikey",
    name: "p2-conn-a",
    apiKey: "k-p2a",
    priority: 1,
  });
  await providersDb.createProviderConnection({
    provider: "p2",
    authType: "apikey",
    name: "p2-conn-b",
    apiKey: "k-p2b",
    priority: 2,
    isActive: false,
  });

  const batch = await providersDb.getProviderConnectionsByProviders(["p1", "p2"]);

  const p1Single = await providersDb.getProviderConnections({ provider: "p1" });
  const p2Single = await providersDb.getProviderConnections({ provider: "p2" });

  // Batch result for p1 must equal single call result for p1
  const batchP1 = batch.get("p1")!;
  assert.deepEqual(batchP1, p1Single, "p1 batch should equal single-call result");

  // Same for p2
  const batchP2 = batch.get("p2")!;
  assert.deepEqual(batchP2, p2Single, "p2 batch should equal single-call result");
});

test("isActive filter works the same in batch and single calls", async () => {
  await resetStorage();

  await providersDb.createProviderConnection({
    provider: "pf1",
    authType: "apikey",
    name: "active-conn",
    apiKey: "k-active",
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "pf1",
    authType: "apikey",
    name: "inactive-conn",
    apiKey: "k-inactive",
    isActive: false,
  });

  const batchActive = await providersDb.getProviderConnectionsByProviders(["pf1"], true);
  const singleActive = await providersDb.getProviderConnections({ provider: "pf1", isActive: 1 });

  assert.deepEqual(batchActive.get("pf1"), singleActive, "active filter should match");

  const batchInactive = await providersDb.getProviderConnectionsByProviders(["pf1"], false);
  const singleInactive = await providersDb.getProviderConnections({
    provider: "pf1",
    isActive: 0,
  });
  assert.deepEqual(batchInactive.get("pf1"), singleInactive, "inactive filter should match");
});

test("empty providerIds returns empty Map without error", async () => {
  await resetStorage();
  const result = await providersDb.getProviderConnectionsByProviders([]);
  assert.ok(result instanceof Map, "should be a Map");
  assert.strictEqual(result.size, 0, "empty input → empty Map");
});

test("requested provider with no connections returns empty array", async () => {
  await resetStorage();
  // seed one unrelated provider so DB is not empty
  await providersDb.createProviderConnection({
    provider: "existing",
    authType: "apikey",
    name: "conn",
    apiKey: "k-existing",
  });

  const result = await providersDb.getProviderConnectionsByProviders(["nonexistent"]);
  assert.ok(result.has("nonexistent"), "key should be present");
  assert.deepEqual(result.get("nonexistent"), [], "zero connections → empty array");
});
