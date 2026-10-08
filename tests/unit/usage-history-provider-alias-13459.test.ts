import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #13459: usage_history rows written under a provider alias ("af") and under the
// canonical id ("api-airforce") split one provider into two analytics buckets.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-alias-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13459 saveRequestUsage stores the canonical provider id for an alias", async () => {
  // Distinct timestamps: the dedup guard skips an INSERT when timestamp +
  // provider + model + connection + keys + token counts all match, so sharing
  // one timestamp between the two writes would collapse them to a single row
  // on fast/loaded CI runners (same-ms Date.now()).
  const base = Date.now();
  for (const [i, provider] of ["af", "api-airforce"].entries()) {
    await usageHistory.saveRequestUsage({
      provider,
      model: "gpt-4o-mini",
      tokens: { input: 10, output: 5 },
      success: true,
      latencyMs: 100,
      timestamp: new Date(base + i * 1000).toISOString(),
    });
  }
  const rows = core
    .getDbInstance()
    .prepare("SELECT provider, COUNT(*) AS n FROM usage_history GROUP BY provider")
    .all() as Array<{ provider: string; n: number }>;
  assert.deepEqual(rows, [{ provider: "api-airforce", n: 2 }]);
});
