/**
 * tests/unit/quota-plan-resolver.test.ts
 *
 * Coverage for src/lib/quota/planResolver.ts:
 *   - DB plan present → return that plan
 *   - DB absent, known provider → catalog plan (source="auto")
 *   - DB absent, unknown provider → empty plan (source="manual")
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Set up isolated DATA_DIR before any imports that touch the DB
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plan-resolver-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Import modules
const core = await import("../../src/lib/db/core.ts");
const providerPlansDb = await import("../../src/lib/db/providerPlans.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (err: unknown) {
      const e = err as { code?: string };
      if ((e?.code === "EBUSY" || e?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw err;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Scenario 1 ─────────────────────────────────────────────────────────────
test("planResolver: DB plan present → returns DB plan (source=manual)", async () => {
  const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");

  // Seed a DB override
  providerPlansDb.upsertPlan("conn-123", "openai", [
    { unit: "tokens", window: "hourly", limit: 10_000 },
  ], "manual");

  const plan = resolvePlan("conn-123", "openai");
  assert.equal(plan.source, "manual");
  assert.equal(plan.provider, "openai");
  assert.ok(plan.dimensions.length > 0);
  assert.equal(plan.dimensions[0].limit, 10_000);
});

// ─── Scenario 2 ─────────────────────────────────────────────────────────────
test("planResolver: DB absent + known provider (codex) → catalog plan (source=auto)", async () => {
  const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");

  const plan = resolvePlan("conn-no-override", "codex");
  assert.equal(plan.source, "auto");
  assert.equal(plan.provider, "codex");
  assert.ok(plan.dimensions.length > 0);
  // Codex catalog has percent + 5h + weekly
  const units = plan.dimensions.map((d) => d.unit);
  assert.ok(units.includes("percent"), "Expected percent dimension");
});

// ─── Scenario 3 ─────────────────────────────────────────────────────────────
test("planResolver: DB absent + unknown provider → empty plan (source=manual)", async () => {
  const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");

  const plan = resolvePlan("conn-unknown", "unknown_provider_xyz");
  assert.equal(plan.source, "manual");
  assert.equal(plan.provider, "unknown_provider_xyz");
  assert.equal(plan.dimensions.length, 0);
  assert.equal(plan.connectionId, null);
});

// ─── Scenario 4 ─────────────────────────────────────────────────────────────
test("planResolver: DB plan overrides catalog for same provider", async () => {
  const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");

  // codex is in catalog, but we add a DB override
  providerPlansDb.upsertPlan("conn-codex-override", "codex", [
    { unit: "requests", window: "daily", limit: 999 },
  ], "manual");

  const plan = resolvePlan("conn-codex-override", "codex");
  assert.equal(plan.source, "manual");
  // Should return DB override, not catalog
  assert.equal(plan.dimensions[0].unit, "requests");
  assert.equal(plan.dimensions[0].limit, 999);
});

// ─── Scenario 5 ─────────────────────────────────────────────────────────────
test("planResolver: runtimeSignals parameter is accepted without error", async () => {
  const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");

  // Should not throw even with headers provided
  const plan = resolvePlan("conn-signals", "kimi", {
    headers: { "x-ratelimit-remaining-requests": "1234" },
  });
  assert.ok(plan);
  // kimi is in catalog
  assert.equal(plan.source, "auto");
  assert.equal(plan.provider, "kimi");
});
