import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, before, after, mock } from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-13891-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getPricingForModel, updatePricing } = await import("../../src/lib/db/settings/pricing.ts");

describe("getPricingForModel — issue #13891 (uncached getPricing rebuild per call)", () => {
  before(() => {
    core.resetDbInstance();
    core.getDbInstance();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("hits the DB at most once across many repeated lookups (simulating usageStats' 531 groups/request)", async () => {
    const db = core.getDbInstance();
    const prepareSpy = mock.method(db, "prepare");
    const callsBefore = prepareSpy.mock.calls.length;

    for (let i = 0; i < 20; i++) {
      await getPricingForModel("openai", "gpt-4o");
    }

    const callsAfter = prepareSpy.mock.calls.length;
    prepareSpy.mock.restore();

    const dbCallsMade = callsAfter - callsBefore;
    assert.ok(
      dbCallsMade <= 3,
      `expected getPricingForModel() to be served from the pricing cache after the ` +
        `first call (<=3 db.prepare() calls across 20 lookups), but it re-queried the ` +
        `DB ${dbCallsMade} times`
    );
  });

  it("picks up fresh pricing immediately after a write invalidates the cache", async () => {
    // Warm the cache with the pre-write price.
    const before = await getPricingForModel("acme-test-provider", "acme-test-model");
    assert.equal(before, null);

    // A pricing write (updatePricing -> touchPricing -> invalidateDbCache("pricing"))
    // must invalidate the 30s TTL cache so the very next lookup is not stale.
    await updatePricing({
      "acme-test-provider": {
        "acme-test-model": { inputCostPerToken: 0.000123, outputCostPerToken: 0.000456 },
      },
    });

    const after = await getPricingForModel("acme-test-provider", "acme-test-model");
    assert.ok(after, "expected fresh pricing to be visible right after updatePricing()");
    assert.equal((after as { inputCostPerToken?: number }).inputCostPerToken, 0.000123);
  });
});
