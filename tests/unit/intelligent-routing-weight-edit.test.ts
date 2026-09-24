import assert from "node:assert/strict";
import test from "node:test";
import * as routing from "../../src/lib/combos/intelligentRouting.ts";
import { parseAutoConfig } from "../../open-sse/services/combo/autoConfig.ts";
import { calculateAutoResetWindowAffinity } from "../../open-sse/services/combo/quotaScoring.ts";
import { calculateFactors, calculateScore } from "../../open-sse/services/autoCombo/scoring.ts";

const patchConfig = routing.applyIntelligentRoutingConfigPatch;

test("editing reset weight switches off ship-fast and activates the saved distribution", () => {
  const saved = {
    modePack: "ship-fast",
    weights: { quota: 0.25, resetWindowAffinity: 0.15 },
    resetWindowWindows: ["weekly"],
  };
  const next = patchConfig(saved, { weights: { resetWindowAffinity: 0.3 } });
  assert.equal(next.modePack, "custom");
  assert.equal(next.weights.quota, 0.25);
  assert.equal(next.weights.resetWindowAffinity, 0.3);
  assert.deepEqual(next.resetWindowWindows, ["weekly"]);
  assert.equal(saved.modePack, "ship-fast");
  assert.deepEqual(saved.weights, { quota: 0.25, resetWindowAffinity: 0.15 });
  const cfg = parseAutoConfig({ name: "test", config: next }, []);
  assert.ok(cfg.weights.resetWindowAffinity > 0);
});

test("unrelated edits preserve the preset and choosing a preset remains explicit", () => {
  const saved = { modePack: "ship-fast", weights: { resetWindowAffinity: 0.3 } };
  assert.equal(patchConfig(saved, { explorationRate: 0.02 }).modePack, "ship-fast");
  const next = patchConfig({ ...saved, modePack: "custom" }, { modePack: "ship-fast" });
  assert.equal(next.modePack, "ship-fast");
  assert.equal(parseAutoConfig({ name: "test", config: next }, []).weights.resetWindowAffinity, 0);
});

test("edited reset weight favors a near weekly reset despite a nearer competing session reset", () => {
  const next = patchConfig(
    { modePack: "ship-fast" },
    {
      weights: {
        ...Object.fromEntries(Object.keys(routing.DEFAULT_INTELLIGENT_WEIGHTS).map((k) => [k, 0])),
        resetWindowAffinity: 1,
      },
    }
  );
  const cfg = parseAutoConfig({ name: "test", config: next }, []);
  const now = Date.now();
  const quota = (weeklyMinutes: number, sessionMinutes: number) => ({
    window7d: { percentUsed: 0.5, resetAt: new Date(now + weeklyMinutes * 60000).toISOString() },
    window5h: { percentUsed: 0.1, resetAt: new Date(now + sessionMinutes * 60000).toISOString() },
  });
  const candidate = (weeklyMinutes: number, sessionMinutes: number) => ({
    provider: "codex",
    model: "test",
    quotaRemaining: 50,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED" as const,
    costPer1MTokens: 1,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0,
    resetWindowAffinity: calculateAutoResetWindowAffinity(
      quota(weeklyMinutes, sessionMinutes),
      cfg.resetWindowConfig
    ),
  });
  const pool = [candidate(17, 299), candidate(6 * 1440, 1)];
  const scores = pool.map((c) =>
    calculateScore(
      calculateFactors(c, pool, "default", () => 0.5),
      cfg.weights
    )
  );
  assert.ok(scores[0] > scores[1], "weekly reset must contribute to actual auto scoring");
});

test("auto reset affinity weights weekly 65 percent and session 35 percent", async () => {
  const scoring = await import("../../open-sse/services/combo/quotaScoring.ts");
  const fn = Reflect.get(scoring, "calculateAutoResetWindowAffinity");
  assert.equal(typeof fn, "function");
  const now = Date.now();
  const q = (weekly: number, session: number) => ({
    window7d: { percentUsed: 0.2, resetAt: new Date(now + weekly).toISOString() },
    window5h: { percentUsed: 0.2, resetAt: new Date(now + session).toISOString() },
  });
  const week = 7 * 24 * 3600000,
    session = 5 * 3600000;
  assert.ok(Math.abs(fn(q(0, session), undefined, now) - 0.65) < 0.00001);
  assert.ok(Math.abs(fn(q(week, 0), undefined, now) - 0.35) < 0.00001);
  assert.equal(
    fn(
      q(week, 0),
      { windows: ["weekly"], tieBandMs: 0, quotaCacheTtlMs: 0, quotaCacheMaxStaleMs: 0 },
      now
    ),
    0
  );
  assert.equal(
    fn({ window7d: { percentUsed: 0.2, resetAt: new Date(now).toISOString() } }, undefined, now),
    1
  );
  assert.equal(fn({ limitReached: true }, undefined, now), 0);
});
