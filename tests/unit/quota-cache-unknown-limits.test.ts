import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-unknown-quota-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const snapshots = await import("../../src/lib/db/quotaSnapshots.ts");

test.after(() => {
  cache.stopBackgroundRefresh();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test.beforeEach(() => cache.__clearForTests());

test("Vertex spend telemetry cannot exhaust an account, including after restart", () => {
  cache.setQuotaCache("vertex-spend", "vertex", {
    spend: {
      used: 0.326845,
      displayName: "Spend (USD)",
      quotaSource: "localUsageHistory",
      resetAt: null,
      unlimited: false,
    },
  });
  assert.equal(cache.isQuotaExhaustedForRequest("vertex-spend", "vertex"), false);
  assert.equal(cache.getQuotaWindowStatus("vertex-spend", "spend")?.reachedThreshold, false);
  cache.__clearForTests();
  assert.equal(cache.isAccountQuotaExhausted("vertex-spend"), false);
  assert.equal(cache.getQuotaWindowStatus("vertex-spend", "spend")?.reachedThreshold, false);
});

test("unknown and unlimited windows remain non-blocking after snapshot hydration", () => {
  for (const [index, quota] of [
    { used: 12 },
    { total: 0, used: 0 },
    { remainingPercentage: NaN },
    { remainingPercentage: 0, fractionReported: false },
    { remainingPercentage: 0, unlimited: true },
  ].entries()) {
    const id = `unknown-${index}`;
    cache.setQuotaCache(id, "openai", { daily: quota });
    assert.equal(cache.isAccountQuotaExhausted(id), false);
    assert.equal(cache.getQuotaWindowStatus(id, "daily")?.reachedThreshold, false);
    cache.__clearForTests();
    assert.equal(cache.isAccountQuotaExhausted(id), false);
    assert.equal(cache.getQuotaWindowStatus(id, "daily")?.reachedThreshold, false);
  }
});

test("informational windows do not mask a genuinely exhausted quota", () => {
  cache.setQuotaCache("mixed", "vertex", {
    spend: { used: 1 },
    daily: { total: 100, used: 100 },
  });
  assert.equal(cache.isAccountQuotaExhausted("mixed"), true);
  assert.equal(cache.getQuotaWindowStatus("mixed", "daily")?.reachedThreshold, true);
  cache.__clearForTests();
  assert.equal(cache.isAccountQuotaExhausted("mixed"), true);
});

test("known percentages, bounded usage and explicit 429 exhaustion remain enforced", () => {
  cache.setQuotaCache("known", "openai", { daily: { remainingPercentage: 0 } });
  assert.equal(cache.isAccountQuotaExhausted("known"), true);
  cache.setQuotaCache("bounded", "openai", { daily: { total: 100, used: 25 } });
  assert.equal(cache.getQuotaWindowStatus("bounded", "daily")?.remainingPercentage, 75);
  assert.equal(cache.isAccountQuotaExhausted("bounded"), false);
  cache.markAccountExhaustedFrom429("real-429", "vertex");
  assert.equal(cache.isQuotaExhaustedForRequest("real-429", "vertex"), true);
  const fetchedAt = cache.getQuotaCache("real-429")?.fetchedAt;
  cache.setQuotaCache("real-429", "vertex", { spend: { used: 1 } });
  assert.equal(cache.isQuotaExhaustedForRequest("real-429", "vertex"), true);
  assert.equal(cache.getQuotaCache("real-429")?.fetchedAt, fetchedAt);
  cache.setQuotaCache("real-429", "vertex", { daily: { remainingPercentage: 100 } });
  assert.equal(cache.isQuotaExhaustedForRequest("real-429", "vertex"), false);
});

test("legacy Vertex spend-only snapshots never restore a false lockout", () => {
  for (const provider of ["vertex", "vertex-partner"]) {
    snapshots.saveQuotaSnapshot({
      provider,
      connection_id: `legacy-${provider}`,
      window_key: "spend",
      remaining_percentage: 0,
      is_exhausted: 1,
      next_reset_at: null,
      window_duration_ms: null,
      raw_data: null,
    });
    assert.equal(cache.isQuotaExhaustedForRequest(`legacy-${provider}`, provider), false);
    assert.equal(
      cache.getQuotaWindowStatus(`legacy-${provider}`, "spend")?.reachedThreshold,
      false
    );
  }
});

test("unknown-to-known zero transitions persist without losing exhaustion on restart", () => {
  cache.setQuotaCache("transition", "openai", { daily: { used: 0 } });
  cache.setQuotaCache("transition", "openai", { daily: { remainingPercentage: 0 } });
  cache.__clearForTests();
  assert.equal(cache.isAccountQuotaExhausted("transition"), true);
  cache.setQuotaCache("transition", "openai", { daily: { fractionReported: false } });
  cache.__clearForTests();
  assert.equal(cache.isAccountQuotaExhausted("transition"), false);
});
