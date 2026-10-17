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

/**
 * Claude subscription pool, measured 2026-10-12/13: a Team account whose week
 * resets on Friday and a Max account whose week resets on Wednesday, each with a
 * 5h session inside the weekly cap. Ranked on the nearest reset, the account
 * whose session happened to roll over next won every few hours, so the Max
 * account reached its Wednesday reset with 59% of the week unspent.
 */
type WindowReading = [remainingPercent: number, resetInHours: number | null];

function claudeView(session: WindowReading, weekly: WindowReading, now: number) {
  const reading = ([remaining, resetIn]: WindowReading) => ({
    percentUsed: 1 - remaining / 100,
    resetAt: resetIn === null ? null : new Date(now + resetIn * HOUR).toISOString(),
  });
  return { windows: { "session (5h)": reading(session), "weekly (7d)": reading(weekly) } };
}

describe("expiry-first with a 5h session inside a weekly cap", () => {
  const pool: Account[] = [
    { id: "team", priority: 1 },
    { id: "max", priority: 2 },
  ];
  const pickAt = (now: number, views: Record<string, Record<string, unknown>>) =>
    selectExpiryFirstConnection(pool, null, (id) => views[id] ?? null, now)?.id;
  const config = resolveExpiryFirstConfig(null);

  it("ranks on the weekly reset, not on whichever session rolls over first", () => {
    const t1 = Date.UTC(2026, 9, 12, 12);
    const t2 = Date.UTC(2026, 9, 13, 22);
    assert.equal(
      pickAt(t1, {
        team: claudeView([95, 3.5], [93, 96], t1),
        max: claudeView([98, 4.33], [70, 47], t1),
      }),
      "max"
    );
    assert.equal(
      pickAt(t2, {
        team: claudeView([59, 0.5], [69, 62], t2),
        max: claudeView([92, 1.67], [61, 13], t2),
      }),
      "max"
    );
  });

  it("hands over to the other account once a weekly window has reset", () => {
    assert.equal(
      pickAt(NOW, {
        team: claudeView([100, 4], [63, 49], NOW),
        max: claudeView([100, 5], [100, 168], NOW),
      }),
      "team"
    );
  });

  it("still lets a nearly spent session cap what the account can take now", () => {
    const score = scoreExpiryFirstQuota(claudeView([2, 1], [60, 2], NOW), config, NOW).score;
    assert.ok(Math.abs(score - 0.01) < 1e-9, `${score} should be 0.02 / 2h`);
  });

  it("treats a session whose reset has passed as refilled, not as a deadline", () => {
    const score = scoreExpiryFirstQuota(claudeView([10, -0.5], [60, 5], NOW), config, NOW).score;
    assert.ok(Math.abs(score - 0.12) < 1e-9, `${score} should be 0.6 / 5h`);
  });

  it("falls back to the session reset when the weekly window reports none", () => {
    const score = scoreExpiryFirstQuota(claudeView([50, 2], [80, null], NOW), config, NOW).score;
    assert.ok(Math.abs(score - 0.25) < 1e-9, `${score} should be 0.5 / 2h`);
  });
});
