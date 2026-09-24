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
import { selectExpiryFirstConnection } from "@/sse/services/expiryFirstAccountSelection";
import {
  resolveExpiryFirstConfig,
  scoreExpiryFirstQuota,
} from "@omniroute/open-sse/services/combo/quotaScoring.ts";

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
});
