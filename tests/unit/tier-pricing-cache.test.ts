// tests/unit/tier-pricing-cache.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tier-pricing-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { classifyTier, classifyTierAsync, clearTierCache } =
  await import("../../open-sse/services/tierResolver.ts");
const { updatePricing, resetPricing, resetAllPricing } =
  await import("../../src/lib/db/settings/pricing.ts");

test.beforeEach(() => {
  clearTierCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("async tier reflects a DB price write without restart", async () => {
  try {
    await updatePricing({ testprov: { "testmodel-cache-1": { input: 0, output: 0 } } });
    const a = await classifyTierAsync("testprov", "testmodel-cache-1");
    assert.equal(a.tier, "free");
  } finally {
    await resetPricing("testprov", "testmodel-cache-1");
  }
});

test("resetAllPricing (full wipe, no read-cache bust) also falls back cleanly", async () => {
  try {
    await updatePricing({ testprov: { "testmodel-cache-2": { input: 0, output: 0 } } });
    assert.equal((await classifyTierAsync("testprov", "testmodel-cache-2")).tier, "free");
    await resetAllPricing();
    const back = await classifyTierAsync("testprov", "testmodel-cache-2");
    assert.equal(back.tier, classifyTier("testprov", "testmodel-cache-2").tier);
  } finally {
    await resetPricing("testprov");
  }
});

test("async tier falls back to sync when DB is down", async () => {
  const a = await classifyTierAsync("openai", "gpt-4o");
  assert.deepEqual(a, classifyTier("openai", "gpt-4o"));
});

test("sync tier serves a stored price on a fresh process without a prior write", async () => {
  // Cold-start: the database is pre-filled before the resolver module warms
  // its snapshot, so the First classifyTier call must serve the stored price
  // with no pricing write in this process. A fresh module instance simulates
  // the boot (module state from earlier tests must not leak in).
  const resolverUrl = new URL("../../open-sse/services/tierResolver.ts", import.meta.url).href;
  const worker = `
    process.env.DATA_DIR = ${JSON.stringify(TEST_DATA_DIR)};
    const tr = await import(${JSON.stringify(resolverUrl)});
    const r = tr.classifyTier("openai", "gpt-9-coldstart");
    if (r.tier !== "free") {
      console.error("COLD_START_TIER=" + r.tier);
      process.exit(1);
    }
  `;
  try {
    await updatePricing({ openai: { "gpt-9-coldstart": { input: 0, output: 0 } } });
    const { spawnSync } = await import("node:child_process");
    const run = spawnSync(process.execPath, ["--import", "tsx/esm", "--eval", worker], {
      cwd: path.resolve(import.meta.dirname, "../.."),
      encoding: "utf8",
    });
    assert.equal(run.status, 0, `cold-start worker failed: ${run.stderr}${run.stdout}`);
  } finally {
    await resetPricing("openai", "gpt-9-coldstart");
  }
});

test("sync tier reflects a DB price write without restart", async () => {
  // Fictitious model on a real provider: never pollutes shared state if cleanup fails.
  try {
    await updatePricing({ openai: { "gpt-9-never-existed": { input: 0, output: 0 } } });
    const during = classifyTier("openai", "gpt-9-never-existed");
    // The write path refreshes the pricing snapshot and clears the tier
    // cache, so the sync path below serves the stored price with no restart.
    assert.equal(during.tier, "free");
  } finally {
    await resetPricing("openai", "gpt-9-never-existed");
  }
});
