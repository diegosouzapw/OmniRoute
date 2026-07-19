import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6875 — TTFT / E2E-latency / tokens-per-second aggregation in
// getModelLatencyStats(). Seeds usage_history rows directly through
// saveRequestUsage() and asserts the three new ModelLatencyStatsEntry fields.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-latency-ttft-6875-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

const clearPendingRequests = usageHistory.clearPendingRequests;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  clearPendingRequests();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getModelLatencyStats aggregates avgTtftMs/avgE2ELatencyMs/avgTokensPerSecond over successful rows", async () => {
  const now = Date.now();
  // latencyMs / ttft / tokensOutput chosen so tokens/sec is a clean number per row:
  // 50/(1000/1000)=50, 100/(2000/1000)=50, 300/(4000/1000)=75 -> mean 58.33
  const rows = [
    { latencyMs: 1000, ttftMs: 100, tokensOutput: 50 },
    { latencyMs: 2000, ttftMs: 200, tokensOutput: 100 },
    { latencyMs: 4000, ttftMs: 300, tokensOutput: 300 },
  ];

  for (const [index, row] of rows.entries()) {
    await usageHistory.saveRequestUsage({
      provider: "ttft-provider",
      model: "ttft-model",
      success: true,
      latencyMs: row.latencyMs,
      timeToFirstTokenMs: row.ttftMs,
      tokens: { output: row.tokensOutput },
      timestamp: new Date(now - index * 60 * 1000).toISOString(),
    });
  }

  const stats = await usageHistory.getModelLatencyStats({
    windowHours: 1,
    minSamples: 2,
    maxRows: 50,
  });

  const entry = stats["ttft-provider/ttft-model"];
  assert.ok(entry);
  assert.equal(entry.avgTtftMs, 200);
  // avgE2ELatencyMs aliases avgLatencyMs semantics (no distinct second latency
  // column exists in usage_history beyond latency_ms/ttft_ms).
  assert.equal(entry.avgE2ELatencyMs, entry.avgLatencyMs);
  assert.equal(entry.avgE2ELatencyMs, 2333);
  assert.equal(Math.round(entry.avgTokensPerSecond * 100) / 100, 58.33);
});

test("getModelLatencyStats guards divide-by-zero when latency_ms <= 0 for tokens/sec", async () => {
  await usageHistory.saveRequestUsage({
    provider: "zero-latency-provider",
    model: "zero-latency-model",
    success: true,
    latencyMs: 0,
    timeToFirstTokenMs: 0,
    tokens: { output: 999 },
    timestamp: new Date().toISOString(),
  });
  await usageHistory.saveRequestUsage({
    provider: "zero-latency-provider",
    model: "zero-latency-model",
    success: true,
    latencyMs: 1000,
    timeToFirstTokenMs: 50,
    tokens: { output: 100 },
    timestamp: new Date(Date.now() - 60 * 1000).toISOString(),
  });

  const stats = await usageHistory.getModelLatencyStats({
    windowHours: 1,
    minSamples: 1,
    maxRows: 50,
  });

  const entry = stats["zero-latency-provider/zero-latency-model"];
  assert.ok(entry);
  assert.ok(Number.isFinite(entry.avgTokensPerSecond));
  // Only the latencyMs=1000 row can contribute a valid tokens/sec sample
  // (100 tokens / 1s = 100 tok/s); the zero-latency row must be excluded,
  // not divide-by-zero into Infinity/NaN.
  assert.equal(entry.avgTokensPerSecond, 100);
});

test("getModelLatencyStats TTFT falls back to all-sample TTFTs when successful sample count is below minSamples", async () => {
  await usageHistory.saveRequestUsage({
    provider: "fallback-ttft-provider",
    model: "fallback-ttft-model",
    success: true,
    latencyMs: 100,
    timeToFirstTokenMs: 40,
    tokens: { output: 10 },
    timestamp: new Date().toISOString(),
  });
  await usageHistory.saveRequestUsage({
    provider: "fallback-ttft-provider",
    model: "fallback-ttft-model",
    success: false,
    latencyMs: 500,
    timeToFirstTokenMs: 200,
    tokens: { output: 5 },
    timestamp: new Date().toISOString(),
  });

  const stats = await usageHistory.getModelLatencyStats({
    windowHours: 1,
    minSamples: 2,
  });

  const entry = stats["fallback-ttft-provider/fallback-ttft-model"];
  assert.ok(entry);
  // successfulLatencies.length (1) < minSamples (2) -> same fallback-to-all
  // behavior avgLatencyMs already has must also apply to avgTtftMs.
  assert.equal(entry.avgLatencyMs, 300);
  assert.equal(entry.avgTtftMs, 120);
});
