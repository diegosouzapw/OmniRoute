/**
 * `expiry-first`: a per-provider ACCOUNT fallback strategy that spends the quota
 * closest to being lost.
 *
 * Why a new strategy rather than reusing `reset-aware`: they answer different
 * questions. `scoreResetAwareQuota` ranks mostly on leftover and adds
 * `resetUrgency * (1 - remaining)`, a RECOVERY signal that favours a nearly empty
 * account about to refresh. Its urgency term is also relative to a nominal window
 * length (5h session / 7d weekly) and saturates to zero outside it, so on the
 * real four-account Codex pool below it scores the two 88% accounts IDENTICALLY
 * (0.341725 each) and cannot separate a reset 69h away from one 145h away.
 *
 * The pool, measured 2026-09-22:
 *
 *   priority 1   26% left, resets in ~145h   -> 0.26 / 145   = 0.0018 /h
 *   priority 2   88% left, resets in ~145h   -> 0.88 / 145   = 0.0061 /h
 *   priority 3    1% left, resets in ~8h     -> exhausted, excluded
 *   priority 4   88% left, resets in ~69h    -> 0.88 / 69.3  = 0.0127 /h
 *
 * fill-first picks priority 1 and lets priority 4's 88% expire. expiry-first
 * picks priority 4. Priority 3 must NOT win despite the nearest reset: there is
 * nothing left to spend, which is why ranking on the deadline alone (plain
 * earliest-deadline-first) is the wrong rule.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { __clearForTests, getQuotaCache, setQuotaCache } from "@/domain/quotaCache";
import { selectExpiryFirstConnection } from "@/sse/services/expiryFirstAccountSelection";
import {
  resolveExpiryFirstConfig,
  scoreExpiryFirstQuota,
} from "@omniroute/open-sse/services/combo/quotaScoring.ts";
import {
  resolveExpiryFirstPlanWeight,
  selectExpiryFirstQuotaWindowNames,
} from "@/sse/services/expiryFirstMetrics";
import { updateQuotaBurnMetrics } from "@/domain/quotaBurnMetrics";

const HOUR = 60 * 60 * 1000;
const NOW = Date.UTC(2026, 8, 22, 11, 36);

type Account = {
  id: string;
  priority: number;
  lastUsedAt?: string | null;
  backoffLevel?: number | null;
};

function view(remainingPercent: number, resetInHours: number) {
  return {
    windows: {
      session: {
        percentUsed: 1 - remainingPercent / 100,
        resetAt: new Date(NOW + resetInHours * HOUR).toISOString(),
      },
    },
  };
}

const POOL: Account[] = [
  { id: "prio1", priority: 1 },
  { id: "prio2", priority: 2 },
  { id: "prio3", priority: 3 },
  { id: "prio4", priority: 4 },
];
const VIEWS: Record<string, Record<string, unknown>> = {
  prio1: view(26, 144.8),
  prio2: view(88, 145.0),
  prio3: view(1, 7.7),
  prio4: view(88, 69.3),
};
const pick = (pool: Account[], views: Record<string, Record<string, unknown> | null>) =>
  selectExpiryFirstConnection(pool, null, (id) => views[id] ?? null, NOW);

describe("expiry-first account rotation", () => {
  it("prefers the account whose quota is closest to expiring unused", () => {
    assert.equal(pick(POOL, VIEWS)?.id, "prio4");
  });

  it("separates two equally full accounts by reset time", () => {
    const config = resolveExpiryFirstConfig(null);
    const sooner = scoreExpiryFirstQuota(view(88, 69.3), config, NOW).score;
    const later = scoreExpiryFirstQuota(view(88, 145.0), config, NOW).score;
    assert.ok(sooner > later, `${sooner} should exceed ${later}`);
  });

  it("does not pick a nearly empty account just because it resets first", () => {
    assert.notEqual(pick(POOL, VIEWS)?.id, "prio3");
  });

  it("scores an exhausted account at zero so it is never preferred", () => {
    const config = resolveExpiryFirstConfig(null);
    assert.equal(scoreExpiryFirstQuota(view(0, 2), config, NOW).score, 0);
  });

  it("is bound by the tightest window, not the roomiest", () => {
    const config = resolveExpiryFirstConfig(null);
    const both = {
      windows: {
        session: { percentUsed: 1 - 0.9, resetAt: new Date(NOW + 100 * HOUR).toISOString() },
        weekly: { percentUsed: 1 - 0.2, resetAt: new Date(NOW + 10 * HOUR).toISOString() },
      },
    };
    // usable is the weekly 20%, deadline the weekly 10h -> 0.02/h, not 0.009/h.
    assert.ok(Math.abs(scoreExpiryFirstQuota(both, config, NOW).score - 0.02) < 1e-9);
  });

  it("rotates accounts whose pressure ties, instead of pinning the first", () => {
    const twins: Account[] = [
      { id: "a", priority: 1, lastUsedAt: new Date(NOW - 1 * HOUR).toISOString() },
      { id: "b", priority: 2, lastUsedAt: new Date(NOW - 9 * HOUR).toISOString() },
    ];
    const same = view(80, 40);
    assert.equal(
      selectExpiryFirstConnection(twins, null, () => same, NOW)?.id,
      "b",
      "least-recently-used account should win a tie"
    );
  });

  it("skips an account in backoff when pressure ties", () => {
    const twins: Account[] = [
      {
        id: "hurt",
        priority: 1,
        lastUsedAt: new Date(NOW - 9 * HOUR).toISOString(),
        backoffLevel: 2,
      },
      {
        id: "ok",
        priority: 2,
        lastUsedAt: new Date(NOW - 1 * HOUR).toISOString(),
        backoffLevel: 0,
      },
    ];
    const same = view(80, 40);
    assert.equal(selectExpiryFirstConnection(twins, null, () => same, NOW)?.id, "ok");
  });

  it("falls back to the incoming priority order when no account reports quota", () => {
    assert.equal(pick(POOL, {})?.id, "prio1");
  });

  it("ranks on leftover when windows report no reset time", () => {
    const config = resolveExpiryFirstConfig(null);
    const noReset = { windows: { session: { percentUsed: 0.4, resetAt: null } } };
    assert.equal(scoreExpiryFirstQuota(noReset, config, NOW).score, 0.6);
  });

  it("returns null for an empty pool", () => {
    assert.equal(
      selectExpiryFirstConnection([], null, () => null, NOW),
      null
    );
  });

  it("scopes Antigravity expiry windows to the requested model family", () => {
    const names = selectExpiryFirstQuotaWindowNames(
      [
        "claude-opus-5-5-high",
        "claude_gpt_session",
        "claude_gpt_weekly",
        "gemini-3.7-flash-high",
        "gemini_session",
        "gemini_weekly",
      ],
      { provider: "agy", requestedModel: "agy/gemini-3.7-flash-high" }
    );

    assert.deepEqual(names, ["gemini-3.7-flash-high", "gemini_session", "gemini_weekly"]);
  });

  it("scopes Codex Spark expiry windows away from normal Codex windows", () => {
    const names = selectExpiryFirstQuotaWindowNames(
      ["session", "weekly", "gpt_5_3_codex_spark_session", "gpt_5_3_codex_spark_weekly"],
      { provider: "codex", requestedModel: "gpt-5.3-codex-spark" }
    );

    assert.deepEqual(names, ["gpt_5_3_codex_spark_session", "gpt_5_3_codex_spark_weekly"]);
  });

  it("uses a detected plan weight and permits case-insensitive per-provider overrides", () => {
    assert.equal(resolveExpiryFirstPlanWeight("Ultra"), 4);
    assert.equal(resolveExpiryFirstPlanWeight("Pro"), 2);
    assert.equal(resolveExpiryFirstPlanWeight("unknown"), 1);
    assert.equal(resolveExpiryFirstPlanWeight("uLtRa", { ultra: 6 }), 6);
    assert.equal(resolveExpiryFirstPlanWeight("Ultra", { ultra: 0 }), 4);
  });

  it("orders equal quota pressure by the detected account plan capacity", () => {
    const accounts: Account[] = [
      {
        id: "pro",
        priority: 1,
        providerSpecificData: { plan: "Pro" },
      },
      {
        id: "ultra",
        priority: 2,
        providerSpecificData: { plan: "Ultra" },
      },
    ];
    const sameQuota = view(50, 2);

    assert.equal(
      selectExpiryFirstConnection(accounts, null, () => sameQuota, NOW, {
        provider: "agy",
        requestedModel: "agy/gemini-3.7-flash-high",
      })?.id,
      "ultra"
    );
  });

  it("accepts account-provided weekly and session capacity independently", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = {
      windows: {
        session: { percentUsed: 0.5, resetAt: new Date(NOW + HOUR).toISOString() },
        weekly: { percentUsed: 0.25, resetAt: new Date(NOW + 10 * HOUR).toISOString() },
      },
    };
    const weighted = scoreExpiryFirstQuota(quota, config, NOW, {
      capacityWeight: 2,
      burnFractionPerHourByWindow: { session: 0.1, weekly: 0.01 },
    }).score;

    // Session: (50% - 10%/h × 1h) × 2 / 1h = 0.8.
    // Weekly: (75% - 1%/h × 10h) × 2 / 10h = 0.13.
    assert.ok(Math.abs(weighted - 0.8) < 1e-9);
  });

  it("scores predicted waste with plan capacity and measured burn", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = view(50, 2);
    const score = scoreExpiryFirstQuota(quota, config, NOW, {
      capacityWeight: 2,
      burnFractionPerHourByWindow: { session: 0.1 },
    }).score;

    // 50% usable - (10%/h * 2h) projected burn = 30% expected waste;
    // plan capacity 2 => 60 capacity-points / 2h = 0.3 score.
    assert.ok(Math.abs(score - 0.3) < 1e-9, `expected 0.3, received ${score}`);
  });

  it("only applies plan capacity when metrics are explicitly supplied", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = view(50, 2);
    assert.equal(scoreExpiryFirstQuota(quota, config, NOW).score, 0.25);
    assert.equal(
      scoreExpiryFirstQuota(quota, config, NOW, { capacityWeight: 4 }).score,
      1,
      "plan weight participates in the explicitly metric-aware score"
    );
  });

  it("keeps the prior score exactly when no metrics are supplied", () => {
    const config = resolveExpiryFirstConfig(null);
    const quota = view(50, 2);
    assert.equal(scoreExpiryFirstQuota(quota, config, NOW).score, 0.25);
  });

  it("tracks burn from the start of the same reset window, then smooths later samples", () => {
    const resetAt = new Date(NOW + 3 * HOUR).toISOString();
    const baseline = {
      gemini_session: { remainingPercentage: 80, resetAt },
    };
    const first = updateQuotaBurnMetrics(null, null, null, baseline, NOW - 2 * HOUR);
    assert.equal(first.rates.gemini_session, undefined, "first observation seeds the window");

    const second = updateQuotaBurnMetrics(
      baseline,
      NOW - 2 * HOUR,
      first,
      { gemini_session: { remainingPercentage: 60, resetAt } },
      NOW
    );
    assert.ok(Math.abs(second.rates.gemini_session.fractionPerHour - 0.1) < 1e-9);

    const resetCycle = updateQuotaBurnMetrics(
      { gemini_session: { remainingPercentage: 60, resetAt } },
      NOW,
      second,
      {
        gemini_session: {
          remainingPercentage: 100,
          resetAt: new Date(NOW + 8 * HOUR).toISOString(),
        },
      },
      NOW + HOUR
    );
    assert.equal(
      resetCycle.rates.gemini_session,
      undefined,
      "a new reset cycle resets burn history"
    );
  });

  it("stores observed burn on the connection quota cache used by expiry-first", () => {
    const connectionId = "expiry-first-burn-cache";
    const resetAt = new Date(NOW + 4 * HOUR).toISOString();
    const realNow = Date.now;
    __clearForTests();
    try {
      Date.now = () => NOW - 2 * HOUR;
      setQuotaCache(connectionId, "agy", {
        "gemini-3.7-flash-high": { remainingPercentage: 80, resetAt },
      });
      Date.now = () => NOW;
      setQuotaCache(connectionId, "agy", {
        "gemini-3.7-flash-high": { remainingPercentage: 60, resetAt },
      });

      const burn = getQuotaCache(connectionId)?.burnMetrics?.rates["gemini-3.7-flash-high"];
      assert.ok(burn);
      assert.ok(burn.fractionPerHour > 0);
    } finally {
      Date.now = realNow;
      __clearForTests();
    }
  });

  it("keeps the previous burn baseline for small quota decreases", () => {
    const resetAt = new Date(NOW + 3 * HOUR).toISOString();
    const previousQuotas = { gemini_session: { remainingPercentage: 80, resetAt } };
    const previousMetrics = updateQuotaBurnMetrics(null, null, null, previousQuotas, NOW - HOUR);
    const next = updateQuotaBurnMetrics(
      previousQuotas,
      NOW - HOUR,
      previousMetrics,
      { gemini_session: { remainingPercentage: 79.9, resetAt } },
      NOW
    );

    assert.equal(next.observations.gemini_session.remainingPercentage, 80);
    assert.equal(next.rates.gemini_session, undefined);
  });

  it("clears burn observations with quota-cache test state", async () => {
    const { __clearForTests, getQuotaCache, setQuotaCache } = await import("@/domain/quotaCache");
    __clearForTests();
    setQuotaCache("burn-clear", "agy", {
      "gemini-3.7-flash-high": {
        remainingPercentage: 80,
        resetAt: new Date(NOW + 3 * HOUR).toISOString(),
      },
    });
    assert.ok(getQuotaCache("burn-clear")?.burnMetrics);
    __clearForTests();
    assert.equal(getQuotaCache("burn-clear"), null);
  });

  it("selects the Antigravity quota family before computing expiry urgency", () => {
    const mixed = {
      windows: {
        "gemini-3.7-flash-high": {
          percentUsed: 0.5,
          resetAt: new Date(NOW + 2 * HOUR).toISOString(),
        },
        gemini_weekly: { percentUsed: 0.2, resetAt: new Date(NOW + 100 * HOUR).toISOString() },
        "claude-opus-5-5-high": { percentUsed: 1, resetAt: new Date(NOW + HOUR).toISOString() },
      },
    };
    const scopedNames = selectExpiryFirstQuotaWindowNames(Object.keys(mixed.windows), {
      provider: "agy",
      requestedModel: "agy/gemini-3.7-flash-high",
    });
    const scoped = {
      windows: Object.fromEntries(
        scopedNames.map((name) => [name, mixed.windows[name as keyof typeof mixed.windows]])
      ),
    };

    const config = resolveExpiryFirstConfig(null);
    assert.ok(scopedNames.includes("gemini-3.7-flash-high"));
    assert.ok(!scopedNames.includes("claude-opus-5-5-high"));
    assert.ok(scoreExpiryFirstQuota(scoped, config, NOW).score > 0);
  });
});
