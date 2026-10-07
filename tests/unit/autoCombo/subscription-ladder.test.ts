/**
 * Subscription-first routing — regression guard for `connectionBilling.ts` and
 * `subscriptionLadder.ts`, wired into
 * `open-sse/services/autoCombo/virtualFactory.ts::createVirtualAutoComboFromPrepared`
 * for the `auto/subscription` and `auto/thrifty` ids.
 *
 * Pure and dependency-light by design, mirroring
 * `strict-zero-cost-filter.test.ts`: every side-effecting dependency (live
 * quota state, connection auth types, the economic tier resolver, the billing
 * catalog) is injected, so nothing here touches the DB, the network, or global
 * state.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import type { ConnectionBillingEntry } from "@omniroute/open-sse/config/connectionBillingCatalog.ts";
import {
  classifyConnectionBilling,
  isOverageSafe,
  isPlanIncluded,
} from "@omniroute/open-sse/services/autoCombo/connectionBilling.ts";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "@omniroute/open-sse/services/autoCombo/resilienceCandidateFilter.ts";
import {
  RUNG_ORDER,
  assignRung,
  clampCooldownToReset,
  filterSubscriptionOnlyCandidates,
  isQuotaUsable,
  isStateStaleForReset,
  orderPoolByRung,
  type LadderCandidate,
  type LadderOptions,
} from "@omniroute/open-sse/services/autoCombo/subscriptionLadder.ts";
import type { FreeAccessState } from "@omniroute/open-sse/services/autoCombo/strictZeroCostFilter.ts";

const NOW = Date.parse("2026-08-22T12:00:00.000Z");

/** Synthetic catalog — never the real one, so these tests keep passing when
 * the curated entries are edited (the autodiscovery contract). */
const CATALOG: readonly ConnectionBillingEntry[] = [
  {
    provider: "planned",
    authType: "oauth",
    billing: "subscription",
    overage: "hard-stop",
    reason: "test fixture: plan-included, refuses past the allowance",
  },
  {
    provider: "planned",
    authType: "apikey",
    billing: "metered",
    overage: "meters-to-paid",
    reason: "test fixture: same provider, metered credential",
  },
  {
    provider: "overflowing",
    billing: "subscription",
    overage: "meters-to-paid",
    reason: "test fixture: plan-included but bills past the allowance",
  },
  {
    provider: "metered-co",
    billing: "metered",
    overage: "meters-to-paid",
    reason: "test fixture: pay per token",
  },
];

function state(overrides: Partial<FreeAccessState> = {}): FreeAccessState {
  return {
    status: "SAFE",
    remainingFreeAllowance: 50,
    resetAt: null,
    checkedAt: new Date(NOW - 1000).toISOString(),
    ...overrides,
  };
}

function options(overrides: Partial<LadderOptions> = {}): LadderOptions {
  return {
    enabled: true,
    resolveFreeAccessState: () => state(),
    resolveAuthType: () => "oauth",
    resolveEconomicTier: () => "cheap",
    maxStateAgeMs: 180_000,
    admitUnknownQuota: false,
    now: () => NOW,
    catalog: CATALOG,
    ...overrides,
  };
}

function candidate(overrides: Partial<LadderCandidate> = {}): LadderCandidate {
  return {
    provider: "planned",
    model: "m1",
    connectionId: "c1",
    ...overrides,
  };
}

// ── classification ──────────────────────────────────────────────────────────

test("the synthetic no-auth connection classifies as keyless without consulting the catalog", () => {
  const verdict = classifyConnectionBilling(
    { provider: "metered-co", connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID },
    CATALOG
  );
  assert.equal(verdict.billing, "keyless");
  assert.equal(isPlanIncluded(verdict), true);
});

test("an authType-specific entry wins over the provider-wide one", () => {
  const oauth = classifyConnectionBilling(
    { provider: "planned", authType: "oauth", connectionId: "c1" },
    CATALOG
  );
  const apikey = classifyConnectionBilling(
    { provider: "planned", authType: "apikey", connectionId: "c2" },
    CATALOG
  );
  assert.equal(oauth.billing, "subscription");
  assert.equal(apikey.billing, "metered");
});

test("a provider-wide entry applies when no authType entry matches", () => {
  const verdict = classifyConnectionBilling(
    { provider: "overflowing", authType: "cookie", connectionId: "c1" },
    CATALOG
  );
  assert.equal(verdict.billing, "subscription");
  assert.equal(isOverageSafe(verdict), false);
});

test("an uncurated provider is unknown — never silently plan-included", () => {
  const verdict = classifyConnectionBilling(
    { provider: "brand-new", authType: "oauth", connectionId: "c1" },
    CATALOG
  );
  assert.equal(verdict.billing, "unknown");
  assert.equal(isPlanIncluded(verdict), false);
  assert.equal(isOverageSafe(verdict), false);
});

test("rung assignment prefers billing class, falling back to the economic tier", () => {
  const opts = options({ resolveEconomicTier: () => "premium" });
  assert.equal(
    assignRung(
      { provider: "planned", model: "m1" },
      { provider: "planned", authType: "oauth" },
      opts
    ),
    "subscription"
  );
  assert.equal(
    assignRung(
      { provider: "metered-co", model: "m1" },
      { provider: "metered-co", authType: "apikey" },
      opts
    ),
    "premium"
  );
  assert.equal(
    assignRung(
      { provider: "whatever", model: "m1" },
      { provider: "whatever", connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID },
      opts
    ),
    "keyless"
  );
});

// ── auto/subscription — fails closed ────────────────────────────────────────

test("disabled leaves the pool byte-identical (the opt-in contract)", () => {
  const pool = [candidate()];
  assert.equal(filterSubscriptionOnlyCandidates(pool, options({ enabled: false })), pool);
  assert.equal(orderPoolByRung(pool, options({ enabled: false })), pool);
});

test("a plan-included, hard-stop connection with headroom is kept", () => {
  const pool = [candidate()];
  assert.deepEqual(filterSubscriptionOnlyCandidates(pool, options()), pool);
});

test("a subscription that meters past the plan is excluded", () => {
  const pool = [candidate({ provider: "overflowing" })];
  assert.deepEqual(filterSubscriptionOnlyCandidates(pool, options()), []);
});

test("a metered connection is excluded even on a provider that also sells a plan", () => {
  const pool = [candidate({ connectionId: "c2" })];
  const result = filterSubscriptionOnlyCandidates(
    pool,
    options({ resolveAuthType: () => "apikey" })
  );
  assert.deepEqual(result, []);
});

test("keyless is not a subscription — auto/subscription means the plan you pay for", () => {
  const pool = [candidate({ provider: "freebie", connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID })];
  assert.deepEqual(filterSubscriptionOnlyCandidates(pool, options()), []);
});

test("an unverifiable quota reading fails closed", () => {
  const pool = [candidate()];
  assert.deepEqual(
    filterSubscriptionOnlyCandidates(pool, options({ resolveFreeAccessState: () => undefined })),
    []
  );
  assert.deepEqual(
    filterSubscriptionOnlyCandidates(
      pool,
      options({ resolveFreeAccessState: () => state({ status: "UNKNOWN" }) })
    ),
    []
  );
});

test("a stale quota reading fails closed even when it says SAFE", () => {
  const stale = state({ checkedAt: new Date(NOW - 10 * 60_000).toISOString() });
  assert.deepEqual(
    filterSubscriptionOnlyCandidates(
      [candidate()],
      options({ resolveFreeAccessState: () => stale })
    ),
    []
  );
});

test("a multi-account candidate keeps only the connections proven safe", () => {
  const pool = [candidate({ connectionId: null, allowedConnectionIds: ["a", "b", "c"] })];
  const result = filterSubscriptionOnlyCandidates(
    pool,
    options({
      resolveFreeAccessState: (_provider, connectionId) =>
        connectionId === "b" ? state({ status: "EXHAUSTED", remainingFreeAllowance: 0 }) : state(),
    })
  );
  assert.equal(result.length, 1);
  assert.deepEqual(result[0].allowedConnectionIds, ["a", "c"]);
});

test("a multi-account candidate with no safe connection is dropped, not emptied", () => {
  const pool = [candidate({ connectionId: null, allowedConnectionIds: ["a", "b"] })];
  const result = filterSubscriptionOnlyCandidates(
    pool,
    options({
      resolveFreeAccessState: () => state({ status: "EXHAUSTED", remainingFreeAllowance: 0 }),
    })
  );
  assert.deepEqual(result, []);
});

// ── auto/thrifty — escalates ───────────────────────────────────────────────

test("rungs order plan-included capacity ahead of every paid rung", () => {
  const pool: LadderCandidate[] = [
    { provider: "metered-co", model: "premium-model", connectionId: "p1" },
    { provider: "metered-co", model: "cheap-model", connectionId: "c1" },
    { provider: "planned", model: "plan-model", connectionId: "s1" },
    { provider: "anything", model: "keyless-model", connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID },
  ];
  const result = orderPoolByRung(
    pool,
    options({
      admitUnknownQuota: true,
      resolveAuthType: (id) => (id === "s1" ? "oauth" : "apikey"),
      resolveEconomicTier: (_provider, model) => (model === "premium-model" ? "premium" : "cheap"),
    })
  );
  assert.deepEqual(
    result.map((c) => c.model),
    ["plan-model", "keyless-model", "cheap-model", "premium-model"]
  );
});

test("an exhausted plan connection steps aside so a paid rung can serve", () => {
  const pool: LadderCandidate[] = [
    { provider: "planned", model: "plan-model", connectionId: "s1" },
    { provider: "metered-co", model: "cheap-model", connectionId: "c1" },
  ];
  const result = orderPoolByRung(
    pool,
    options({
      admitUnknownQuota: true,
      resolveAuthType: (id) => (id === "s1" ? "oauth" : "apikey"),
      resolveFreeAccessState: (_provider, connectionId) =>
        connectionId === "s1"
          ? state({ status: "EXHAUSTED", remainingFreeAllowance: 0 })
          : undefined,
    })
  );
  assert.deepEqual(
    result.map((c) => c.model),
    ["cheap-model"]
  );
});

test("the ladder admits an unverifiable plan connection rather than paying on missing telemetry", () => {
  const pool = [candidate({ connectionId: "s1", model: "plan-model" })];
  const result = orderPoolByRung(
    pool,
    options({ admitUnknownQuota: true, resolveFreeAccessState: () => undefined })
  );
  assert.equal(result.length, 1);
});

test("ordering is stable within a rung so the auto scorer is not reshuffled", () => {
  const pool: LadderCandidate[] = [
    { provider: "metered-co", model: "first", connectionId: "a" },
    { provider: "metered-co", model: "second", connectionId: "b" },
    { provider: "metered-co", model: "third", connectionId: "c" },
  ];
  const result = orderPoolByRung(
    pool,
    options({ admitUnknownQuota: true, resolveAuthType: () => "apikey" })
  );
  assert.deepEqual(
    result.map((c) => c.model),
    ["first", "second", "third"]
  );
});

test("a rung budgeted at zero is disabled outright", () => {
  const pool: LadderCandidate[] = [
    { provider: "metered-co", model: "cheap-model", connectionId: "c1" },
    { provider: "metered-co", model: "premium-model", connectionId: "p1" },
  ];
  const result = orderPoolByRung(
    pool,
    options({
      admitUnknownQuota: true,
      resolveAuthType: () => "apikey",
      resolveEconomicTier: (_p, model) => (model === "premium-model" ? "premium" : "cheap"),
      rungBudgetUsd: { premium: 0 },
    })
  );
  assert.deepEqual(
    result.map((c) => c.model),
    ["cheap-model"]
  );
});

test("a paid rung drops out once its budget is spent, and is ungated without accounting", () => {
  const pool: LadderCandidate[] = [
    { provider: "metered-co", model: "cheap-model", connectionId: "c1" },
  ];
  const base = {
    admitUnknownQuota: true,
    resolveAuthType: () => "apikey",
    rungBudgetUsd: { cheap: 5 },
  };
  assert.deepEqual(orderPoolByRung(pool, options({ ...base, resolveRungSpendUsd: () => 5 })), []);
  assert.equal(orderPoolByRung(pool, options({ ...base, resolveRungSpendUsd: () => 1 })).length, 1);
  // No spend accounting available → the rung is ordered, never gated.
  assert.equal(
    orderPoolByRung(pool, options({ ...base, resolveRungSpendUsd: () => null })).length,
    1
  );
});

// ── decision 3: returning to the plan after a reset ─────────────────────────

test("a cached reading whose own resetAt has passed is stale regardless of age", () => {
  assert.equal(
    isStateStaleForReset(state({ resetAt: new Date(NOW - 1).toISOString() }), NOW),
    true
  );
  assert.equal(
    isStateStaleForReset(state({ resetAt: new Date(NOW + 60_000).toISOString() }), NOW),
    false
  );
  assert.equal(isStateStaleForReset(state({ resetAt: null }), NOW), false);
  assert.equal(isStateStaleForReset(state({ resetAt: "not-a-date" }), NOW), false);
  assert.equal(isStateStaleForReset(undefined, NOW), false);
});

test("hysteresis: re-entry needs more headroom than staying in did", () => {
  const opts = options({ exitCutoffPercent: 2, reentryMinRemainingPercent: 5 });
  const hovering = state({ remainingFreeAllowance: 3 });
  // Still in play at 3% remaining…
  assert.equal(isQuotaUsable(hovering, opts, false), true);
  // …but not enough to climb back after having dropped out.
  assert.equal(isQuotaUsable(hovering, opts, true), false);
  assert.equal(isQuotaUsable(state({ remainingFreeAllowance: 6 }), opts, true), true);
});

test("a re-entry floor below the exit cutoff cannot create a re-entry gap", () => {
  const opts = options({ exitCutoffPercent: 10, reentryMinRemainingPercent: 1 });
  assert.equal(isQuotaUsable(state({ remainingFreeAllowance: 5 }), opts, true), false);
});

test("cooldown is clamped to the upstream's own reset instant, never extended", () => {
  const resetIn60s = new Date(NOW + 60_000).toISOString();
  assert.equal(clampCooldownToReset(600_000, resetIn60s, NOW), 60_000);
  // Already shorter than the reset → untouched.
  assert.equal(clampCooldownToReset(10_000, resetIn60s, NOW), 10_000);
  // Absent / unparseable / already elapsed → untouched, never widened.
  assert.equal(clampCooldownToReset(600_000, null, NOW), 600_000);
  assert.equal(clampCooldownToReset(600_000, "nonsense", NOW), 600_000);
  assert.equal(clampCooldownToReset(600_000, new Date(NOW - 1).toISOString(), NOW), 600_000);
});

test("rung order is the documented escalation order", () => {
  assert.deepEqual([...RUNG_ORDER], ["subscription", "keyless", "free", "cheap", "premium"]);
});
