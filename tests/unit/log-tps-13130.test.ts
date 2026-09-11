import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #13130 — TPS for thinking/interleaving models (kimi k2.x/k3) was computed as
//   wall-clock TPS: tokens_out / full request duration. Two fixes are pinned
//   here: the denominator is generation time (duration - TTFT, per the rule in
//   open-sse/utils/generationThroughput.ts), and the numerator defensively
//   counts reasoning tokens when a provider excludes them from completion
//   tokens (max(tokens_out, tokens_reasoning) — never double-counted).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-tps-13130-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const logTps = await import("../../src/shared/utils/logTps.ts");
const usageHelpers = await import("../../src/lib/usage/usageHistory/helpers.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("resolveGenerationMs subtracts TTFT only when it is a sane in-window value", () => {
  assert.equal(logTps.resolveGenerationMs(100_000, 20_000), 80_000);
  // No TTFT recorded (old rows / non-streaming): fall back to full duration.
  assert.equal(logTps.resolveGenerationMs(100_000, null), 100_000);
  assert.equal(logTps.resolveGenerationMs(100_000, undefined), 100_000);
  assert.equal(logTps.resolveGenerationMs(100_000, 0), 100_000);
  // Degenerate TTFT values must not zero-out or negate the window.
  assert.equal(logTps.resolveGenerationMs(100_000, 100_000), 100_000);
  assert.equal(logTps.resolveGenerationMs(100_000, 150_000), 100_000);
  assert.equal(logTps.resolveGenerationMs(100_000, -5), 100_000);
  // Unusable duration kills the sample entirely.
  assert.equal(logTps.resolveGenerationMs(0, 100), null);
  assert.equal(logTps.resolveGenerationMs(-1, null), null);
  assert.equal(logTps.resolveGenerationMs(Number.NaN, 10), null);
});

test("resolveTpsOutputTokens counts reasoning without double counting (#13130)", () => {
  // Provider folds reasoning into completion tokens (OpenAI/Anthropic/Gemini
  // convention, and what nvidia/kimi-k3 verified live does): max picks tokens_out.
  assert.equal(logTps.resolveTpsOutputTokens(3000, 2500), 3000);
  // Provider EXCLUDES reasoning from completion tokens but reports it
  // separately: reasoning count is the better lower bound for TPS.
  assert.equal(logTps.resolveTpsOutputTokens(500, 2500), 2500);
  // No reasoning reported: plain output tokens.
  assert.equal(logTps.resolveTpsOutputTokens(1000, null), 1000);
  assert.equal(logTps.resolveTpsOutputTokens(undefined, undefined), 0);
});

test("computeLogTps measures generation throughput, not wall-clock TPS", () => {
  // Real nvidia/kimi-k3 row shape (verified on a live instance): reasoning is
  // inside completion_tokens, no ttft persisted -> old behavior preserved.
  const kimi = logTps.computeLogTps(3000, null, 208_676, null);
  assert.ok(Math.abs(kimi - 14.375) < 0.01, `got ${kimi}`);

  // Thinking model with recorded TTFT: 60s of the 90s request was queue +
  // prefill + first-token wait; the model generated 1000 tokens in 30s.
  // Old wall-clock math said 11.1 t/s; generation math says 33.3 t/s.
  const thinking = logTps.computeLogTps(1000, 800, 90_000, 60_000);
  assert.ok(Math.abs(thinking - 33.333) < 0.01, `got ${thinking}`);

  // Reasoning-excluding provider: 500 visible tokens but 2500 reasoning
  // tokens reported separately, 80s generation window -> 31.25 t/s.
  const excluded = logTps.computeLogTps(500, 2500, 100_000, 20_000);
  assert.ok(Math.abs(excluded - 31.25) < 0.01, `got ${excluded}`);

  // Degenerate inputs still resolve to 0 (the historical display contract).
  assert.equal(logTps.computeLogTps(0, 0, 10_000, 100), 0);
  assert.equal(logTps.computeLogTps(100, 0, 0, 0), 0);
});

test("accumulateLatencySample uses generation window + reasoning-aware numerator", () => {
  const { accumulateLatencySample } = usageHelpers;
  const buckets = {
    successfulLatencies: [],
    allLatencies: [],
    successfulTtfts: [],
    allTtfts: [],
    successfulTps: [],
    allTps: [],
  };
  // 90s latency, 60s TTFT, 1000 out tokens, 800 of them reasoning -> the
  // sample must be 1000 / 30s = 33.33 tok/s, not the old 1000 / 90s.
  accumulateLatencySample(buckets, 90_000, 60_000, 1000, true, 800);
  assert.equal(buckets.allTps.length, 1);
  assert.ok(Math.abs(buckets.allTps[0] - 33.333) < 0.01, `got ${buckets.allTps[0]}`);
  assert.equal(buckets.successfulTps.length, 1);

  // Reasoning-excluding provider (tokens_output=500, tokens_reasoning=2500).
  accumulateLatencySample(buckets, 100_000, 20_000, 500, true, 2500);
  assert.ok(Math.abs(buckets.allTps[1] - 31.25) < 0.01, `got ${buckets.allTps[1]}`);

  // Back-compat: the 5th-arg-only call shape still works (no reasoning column).
  accumulateLatencySample(buckets, 2000, 0, 100, true);
  assert.ok(Math.abs(buckets.allTps[2] - 50) < 0.001, `got ${buckets.allTps[2]}`);

  // Unchanged guards: latency <= 0 is skipped entirely; TTFT still recorded.
  accumulateLatencySample(buckets, 0, 10, 100, true, 5);
  assert.equal(buckets.allTps.length, 3);
});

test("call_logs persists ttft_ms and the summary row exposes it as log.ttft", async () => {
  const callLogs = await import("../../src/lib/usage/callLogs.ts");
  const db = core.getDbInstance();
  const testId = `test-ttft-${Date.now()}`;
  try {
    await callLogs.saveCallLog({
      id: testId,
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "kimi-k3",
      provider: "nvidia",
      duration: 90_000,
      ttftMs: 60_000,
      tokens: { in: 100, out: 3000 },
    });

    const row = db
      .prepare("SELECT ttft_ms, duration FROM call_logs WHERE id = ?")
      .get(testId) as Record<string, unknown>;
    assert.ok(row, "row should exist in call_logs");
    assert.equal(row.ttft_ms, 60_000);
    assert.equal(row.duration, 90_000);

    const logs = await callLogs.getCallLogs({ search: "kimi-k3" });
    const entry = logs.find((l: { id: string }) => l.id === testId);
    assert.ok(entry, "summary row should come back from getCallLogs");
    assert.equal(entry.ttft, 60_000, "mapSummaryRow must expose ttft_ms as ttft");

    // Non-streaming rows: no ttft supplied -> NULL, dashboard falls back to
    // full duration instead of dividing by a phantom window.
    const nonStreamId = `test-nottft-${Date.now()}`;
    await callLogs.saveCallLog({
      id: nonStreamId,
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "kimi-k3",
      provider: "nvidia",
      duration: 5_000,
      tokens: { in: 10, out: 50 },
    });
    const row2 = db
      .prepare("SELECT ttft_ms FROM call_logs WHERE id = ?")
      .get(nonStreamId) as Record<string, unknown>;
    assert.equal(row2.ttft_ms, null);
    db.prepare("DELETE FROM call_logs WHERE id = ?").run(nonStreamId);

    // Negative/garbage TTFT is normalized away, never persisted.
    const badId = `test-badttft-${Date.now()}`;
    await callLogs.saveCallLog({
      id: badId,
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "kimi-k3",
      provider: "nvidia",
      duration: 1_000,
      ttftMs: -42,
      tokens: { in: 1, out: 1 },
    });
    const row3 = db.prepare("SELECT ttft_ms FROM call_logs WHERE id = ?").get(badId) as Record<
      string,
      unknown
    >;
    assert.equal(row3.ttft_ms, null);
    db.prepare("DELETE FROM call_logs WHERE id = ?").run(badId);
  } finally {
    db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
  }
});
