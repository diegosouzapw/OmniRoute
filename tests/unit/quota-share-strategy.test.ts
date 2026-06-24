/**
 * Unit tests for the dedicated quota-share strategy (Phase 3 #9).
 *
 * Covers the three mechanisms of the isolated strategy module plus its
 * activation wiring:
 *   1. per-model bucket gating (accountBuckets.isBucketSaturated)
 *   2. DRR (deficit round-robin, quantum proportional to weight)
 *   3. P2C over real in-flight counters (quotaShareInflight)
 *   4. fail-open behavior (no data / all saturated / empty targets)
 *   5. qtSd/ combos are minted with strategy "quota-share"
 *
 * Runner: node:test + assert/strict (NO vitest, NO jest). Clock is injected via
 * the nowMs param on every call — the tested path never reads Date.now().
 */

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  selectQuotaShareTarget,
  _clearDrrStateForTest,
  _getDrrDeficitForTest,
} from "../../open-sse/services/combo/quotaShareStrategy.ts";
import {
  incrementInflight,
  decrementInflight,
  getInflight,
  _clearInflightForTest,
  DEFAULT_LEASE_MS,
} from "../../open-sse/services/combo/quotaShareInflight.ts";
import {
  recordUsage,
  _clearBucketsForTest,
} from "../../src/lib/quota/accountBuckets.ts";
import { QUOTA_SHARE_STRATEGY } from "../../src/lib/quota/quotaCombos.ts";
import { INTERNAL_ROUTING_STRATEGY_VALUES } from "../../src/shared/constants/routingStrategies.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const NOW = Date.UTC(2026, 5, 24, 12, 0, 0); // 2026-06-24T12:00:00.000Z
const RESET_AT = new Date(NOW + 3_600_000).toISOString(); // +1h (window still open)

function makeTarget(
  executionKey: string,
  connectionId: string,
  weight = 100,
  modelStr = "anthropic/claude-sonnet-4-5"
): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `step-${executionKey}`,
    executionKey,
    modelStr,
    provider: modelStr.split("/")[0],
    providerId: null,
    connectionId,
    weight,
    label: null,
  };
}

// ---------------------------------------------------------------------------
// Setup — reset all module state before each case for isolation.
// ---------------------------------------------------------------------------

beforeEach(() => {
  _clearBucketsForTest();
  _clearDrrStateForTest();
  _clearInflightForTest();
});

// ─── quotaShareInflight ─────────────────────────────────────────────────────

describe("quotaShareInflight", () => {
  test("increment → getInflight returns 1", () => {
    incrementInflight("conn-a", DEFAULT_LEASE_MS, NOW);
    assert.equal(getInflight("conn-a", NOW), 1);
  });

  test("increment twice → getInflight returns 2", () => {
    incrementInflight("conn-a", DEFAULT_LEASE_MS, NOW);
    incrementInflight("conn-a", DEFAULT_LEASE_MS, NOW);
    assert.equal(getInflight("conn-a", NOW), 2);
  });

  test("decrement after increment → returns 0", () => {
    incrementInflight("conn-a", DEFAULT_LEASE_MS, NOW);
    decrementInflight("conn-a", NOW);
    assert.equal(getInflight("conn-a", NOW), 0);
  });

  test("decrement below 0 is safe (floors at 0)", () => {
    decrementInflight("conn-a", NOW); // no prior increment
    assert.equal(getInflight("conn-a", NOW), 0);
  });

  test("TTL expiry: expired slot returns 0 without an explicit decrement", () => {
    const leaseMs = 1_000;
    incrementInflight("conn-b", leaseMs, NOW);
    assert.equal(getInflight("conn-b", NOW), 1);
    assert.equal(getInflight("conn-b", NOW + leaseMs + 1), 0);
  });

  test("empty connectionId returns 0 (fail-open)", () => {
    assert.equal(getInflight("", NOW), 0);
    incrementInflight("", DEFAULT_LEASE_MS, NOW); // must not throw / not store
    assert.equal(getInflight("", NOW), 0);
  });
});

// ─── per-model bucket gating ────────────────────────────────────────────────

describe("gating: per-model bucket saturation", () => {
  test("saturated 5h window → that connection is deprioritized, the clean one wins", () => {
    recordUsage("conn-sat", "5h", 100, RESET_AT, NOW);

    const targets = [makeTarget("ek-sat", "conn-sat"), makeTarget("ek-ok", "conn-ok")];
    const result = selectQuotaShareTarget(targets, "combo-5h", "anthropic/claude-sonnet-4-5", NOW);

    assert.ok(result.target !== null, "must return a target");
    assert.equal(result.target.executionKey, "ek-ok", "non-saturated target must be selected");
    // Saturated target stays available as a fallback (deprioritized, not dropped).
    assert.ok(
      result.orderedTargets.some((t) => t.executionKey === "ek-sat"),
      "saturated target must still appear in the fallback list"
    );
  });

  test("saturated 7d window → that connection is deprioritized", () => {
    recordUsage("conn-7d", "7d", 100, RESET_AT, NOW);
    const targets = [makeTarget("ek-7d", "conn-7d"), makeTarget("ek-clean", "conn-clean")];

    const result = selectQuotaShareTarget(targets, "combo-7d", "anthropic/claude-sonnet-4-5", NOW);
    assert.equal(result.target?.executionKey, "ek-clean");
  });

  test("saturated per-model 7d window for the requested model → deprioritized", () => {
    recordUsage("conn-pm", "7d:claude-sonnet-4-5", 100, RESET_AT, NOW);
    const targets = [
      makeTarget("ek-pm", "conn-pm", 100, "anthropic/claude-sonnet-4-5"),
      makeTarget("ek-other", "conn-other", 100, "anthropic/claude-sonnet-4-5"),
    ];

    const result = selectQuotaShareTarget(targets, "combo-pm", "anthropic/claude-sonnet-4-5", NOW);
    assert.equal(result.target?.executionKey, "ek-other");
  });

  test("per-model saturation for a DIFFERENT model does NOT deprioritize", () => {
    // conn-x is saturated only on 7d:claude-opus-4, but the request is for sonnet.
    recordUsage("conn-x", "7d:claude-opus-4", 100, RESET_AT, NOW);
    const targets = [makeTarget("ek-x", "conn-x", 100, "anthropic/claude-sonnet-4-5")];

    const result = selectQuotaShareTarget(targets, "combo-other-model", "anthropic/claude-sonnet-4-5", NOW);
    assert.equal(result.target?.executionKey, "ek-x", "must not be gated by an unrelated model window");
  });

  test("fail-open: all targets saturated → all eligible again, still returns a target", () => {
    recordUsage("conn-1", "5h", 100, RESET_AT, NOW);
    recordUsage("conn-2", "5h", 100, RESET_AT, NOW);
    const targets = [makeTarget("ek-1", "conn-1"), makeTarget("ek-2", "conn-2")];

    const result = selectQuotaShareTarget(targets, "combo-fo", "anthropic/claude-sonnet-4-5", NOW);
    assert.ok(result.target !== null, "must not return null when everything is saturated");
    assert.equal(result.orderedTargets.length, 2, "both targets remain dispatchable");
  });

  test("empty targets → returns null (fail-open, no crash)", () => {
    const result = selectQuotaShareTarget([], "combo-empty", "anthropic/claude-sonnet-4-5", NOW);
    assert.equal(result.target, null);
    assert.deepEqual(result.orderedTargets, []);
  });

  test("no buckets recorded at all → fail-open, first/healthy target selected", () => {
    const targets = [makeTarget("ek-a", "conn-a"), makeTarget("ek-b", "conn-b")];
    const result = selectQuotaShareTarget(targets, "combo-nodata", "anthropic/claude-sonnet-4-5", NOW);
    assert.ok(result.target !== null);
    assert.equal(result.orderedTargets.length, 2);
  });
});

// ─── DRR ─────────────────────────────────────────────────────────────────────

describe("DRR: deficit round robin", () => {
  test("equal weight: two connections alternate across consecutive calls", () => {
    const t1 = makeTarget("ek-1", "conn-1", 100);
    const t2 = makeTarget("ek-2", "conn-2", 100);

    const r1 = selectQuotaShareTarget([t1, t2], "combo-drr", "anthropic/claude-sonnet-4-5", NOW);
    const r2 = selectQuotaShareTarget([t1, t2], "combo-drr", "anthropic/claude-sonnet-4-5", NOW);

    const selected = [r1.target?.executionKey, r2.target?.executionKey];
    assert.ok(selected.includes("ek-1"), "ek-1 must be selected at some point");
    assert.ok(selected.includes("ek-2"), "ek-2 must be selected at some point");
  });

  test("higher weight connection receives proportionally more selections (2:1)", () => {
    const t1 = makeTarget("ek-heavy", "conn-heavy", 200); // 2x weight
    const t2 = makeTarget("ek-light", "conn-light", 100); // 1x weight

    const counts: Record<string, number> = { "ek-heavy": 0, "ek-light": 0 };
    for (let i = 0; i < 30; i++) {
      const r = selectQuotaShareTarget(
        [t1, t2],
        "combo-weighted",
        "anthropic/claude-sonnet-4-5",
        NOW
      );
      if (r.target) counts[r.target.executionKey]++;
      // Simulate the request settling (as a real caller's finally handler would),
      // so the P2C in-flight tie-break sees equal load and the DRR weighting shows.
      r.decrementInflight();
    }
    assert.ok(
      counts["ek-heavy"] > counts["ek-light"],
      `heavy (${counts["ek-heavy"]}) should be selected more than light (${counts["ek-light"]})`
    );
    // Roughly 2:1 — heavy should be at least ~1.5x light over 30 rounds.
    assert.ok(
      counts["ek-heavy"] >= counts["ek-light"] * 1.5,
      `heavy/light ratio should be ~2:1, got ${counts["ek-heavy"]}:${counts["ek-light"]}`
    );
  });

  test("DRR state is isolated per comboName", () => {
    const t = makeTarget("ek-shared", "conn-shared", 100);
    selectQuotaShareTarget([t], "combo-A", "anthropic/claude-sonnet-4-5", NOW);

    const deficitA = _getDrrDeficitForTest("combo-A", "ek-shared");
    const deficitB = _getDrrDeficitForTest("combo-B", "ek-shared");
    assert.equal(deficitB, 0, "combo-B deficit must remain 0 (isolated)");
    assert.equal(deficitA, 0, "the selected target's deficit must be reset to 0");
  });

  test("single eligible target is returned unchanged", () => {
    const t = makeTarget("ek-solo", "conn-solo", 100);
    const result = selectQuotaShareTarget([t], "combo-solo", "anthropic/claude-sonnet-4-5", NOW);
    assert.equal(result.target?.executionKey, "ek-solo");
    assert.equal(result.orderedTargets.length, 1);
  });
});

// ─── P2C in-flight ────────────────────────────────────────────────────────────

describe("P2C in-flight", () => {
  test("between two candidates, the one with fewer in-flight wins over the DRR pick", () => {
    const t1 = makeTarget("ek-busy", "conn-busy", 100);
    const t2 = makeTarget("ek-free", "conn-free", 100);

    // Pre-load conn-busy with active in-flight requests.
    incrementInflight("conn-busy", DEFAULT_LEASE_MS, NOW);
    incrementInflight("conn-busy", DEFAULT_LEASE_MS, NOW);

    const result = selectQuotaShareTarget([t1, t2], "combo-p2c", "anthropic/claude-sonnet-4-5", NOW);
    assert.equal(
      result.target?.executionKey,
      "ek-free",
      "the target with the lower in-flight load must win the P2C tie-break"
    );
  });

  test("decrementInflight() releases the in-flight load", () => {
    const t = makeTarget("ek-dec", "conn-dec", 100);
    const result = selectQuotaShareTarget([t], "combo-dec", "anthropic/claude-sonnet-4-5", NOW);
    assert.equal(getInflight("conn-dec", NOW), 1, "in-flight should be 1 after a dispatch");
    result.decrementInflight();
    assert.equal(getInflight("conn-dec", NOW), 0, "in-flight should be 0 after the decrement");
  });

  test("decrementInflight() is idempotent (safe to call more than once)", () => {
    const t = makeTarget("ek-idem", "conn-idem", 100);
    const result = selectQuotaShareTarget([t], "combo-idem", "anthropic/claude-sonnet-4-5", NOW);
    result.decrementInflight();
    result.decrementInflight(); // must not go negative or throw
    assert.equal(getInflight("conn-idem", NOW), 0);
  });

  test("TTL releases in-flight automatically when decrement is never called (abort fallback)", () => {
    const t = makeTarget("ek-ttl", "conn-ttl", 100);
    const result = selectQuotaShareTarget([t], "combo-ttl", "anthropic/claude-sonnet-4-5", NOW);
    // Simulate an aborted request: do NOT call result.decrementInflight().
    assert.equal(getInflight("conn-ttl", NOW), 1);
    assert.equal(
      getInflight("conn-ttl", NOW + DEFAULT_LEASE_MS + 1),
      0,
      "the slot must auto-expire after the lease, preventing a permanent leak"
    );
    // The returned callback must remain referenced to satisfy the contract.
    assert.equal(typeof result.decrementInflight, "function");
  });
});

// ─── activation wiring ──────────────────────────────────────────────────────

describe("activation: qtSd/ combos use strategy 'quota-share'", () => {
  test("QUOTA_SHARE_STRATEGY constant equals 'quota-share'", () => {
    assert.equal(
      QUOTA_SHARE_STRATEGY,
      "quota-share",
      "quotaCombos must mint qtSd/ combos with the 'quota-share' strategy"
    );
  });

  test("'quota-share' is registered as an INTERNAL routing strategy", () => {
    assert.ok(
      (INTERNAL_ROUTING_STRATEGY_VALUES as readonly string[]).includes("quota-share"),
      "'quota-share' must be in the internal (non-UI) routing strategy list"
    );
  });
});
