/**
 * fairShare.ts — Work-conserving fair-share algorithm for quota allocation.
 *
 * Implements a multi-dimension, 3-policy (hard/soft/burst) fair-share decision
 * engine. Two modes:
 *   - Generous: globalUsedPercent < saturationThreshold → allow borrowing from
 *     unallocated pool while global capacity remains.
 *   - Strict:   globalUsedPercent >= saturationThreshold → enforce fatias estritas
 *     (hard policy blocks at fair_share, soft penalises, burst still allows
 *     if there is global headroom).
 *
 * Cap absoluto is always enforced regardless of mode or policy.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

import type { QuotaUnit, QuotaWindow, Policy } from "./dimensions";

// ---------------------------------------------------------------------------
// Input / output types
// ---------------------------------------------------------------------------

export interface FairShareDimension {
  key: {
    poolId: string;
    unit: QuotaUnit;
    window: QuotaWindow;
  };
  limit: number; // global pool limit for this dimension
  consumedTotal: number; // total consumed by ALL keys so far
  globalUsedPercent: number; // 0..1 signal from saturationSignals
}

export interface FairShareAllocation {
  weight: number; // 0..100 — this key's share percentage
  capValue?: number; // absolute cap (optional)
  capUnit?: QuotaUnit; // unit of capValue
  policy: Policy; // hard | soft | burst
}

export interface FairShareInput {
  dimensions: FairShareDimension[];
  allocation: FairShareAllocation;
  /** consumedByThisKey[dimensionKeyString] = amount consumed by this key. */
  consumedByThisKey: Record<string, number>;
  saturationThreshold: number; // default 0.5
}

export interface FairShareDecision {
  kind: "allow" | "block";
  reason: "ok" | "fair-share" | "cap-absolute" | "global-saturated";
  penalized?: boolean;
  retryAfterMs?: number;
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function dimensionKeyString(key: FairShareDimension["key"]): string {
  return `${key.poolId}:${key.unit}:${key.window}`;
}

// ---------------------------------------------------------------------------
// Core algorithm
// ---------------------------------------------------------------------------

/**
 * Decide whether to allow/block/penalise a request for one API key across
 * all dimensions of a quota pool.
 */
export function decideFairShare(input: FairShareInput): FairShareDecision {
  const { dimensions, allocation, consumedByThisKey, saturationThreshold } = input;

  // Empty plan → always allow
  if (dimensions.length === 0) {
    return { kind: "allow", reason: "ok" };
  }

  let anyPenalized = false;

  for (const dim of dimensions) {
    const dKey = dimensionKeyString(dim.key);
    const consumed = consumedByThisKey[dKey] ?? 0;
    const fairShare = (allocation.weight / 100) * dim.limit;

    // ── Cap absoluto (intransponível, sempre) ──────────────────────────────
    if (
      allocation.capValue !== undefined &&
      allocation.capUnit === dim.key.unit &&
      consumed >= allocation.capValue
    ) {
      return { kind: "block", reason: "cap-absolute" };
    }

    // ── Teto global intransponível ─────────────────────────────────────────
    // If the pool's global limit is already reached AND this key's request
    // would exceed it (burst mode without borrow room), block as "global-saturated".
    if (dim.consumedTotal >= dim.limit) {
      if (allocation.policy !== "burst") {
        return { kind: "block", reason: "global-saturated" };
      }
      // burst also blocked when no room at all
      return { kind: "block", reason: "global-saturated" };
    }

    const isStrict = dim.globalUsedPercent >= saturationThreshold;

    if (isStrict) {
      // ── Strict mode ────────────────────────────────────────────────────
      switch (allocation.policy) {
        case "hard":
          // Hard: block once consumed >= fair_share
          if (consumed >= fairShare) {
            return { kind: "block", reason: "fair-share" };
          }
          break;

        case "soft":
          // Soft: allow but penalise if above fair_share
          if (consumed >= fairShare) {
            anyPenalized = true;
          }
          break;

        case "burst":
          // Burst: always allow as long as global headroom exists (already
          // checked above — if we reach here there IS room).
          break;
      }
    } else {
      // ── Generous mode ──────────────────────────────────────────────────
      // There is slack — allow borrowing up to the global limit.
      switch (allocation.policy) {
        case "hard":
          // Hard in generous mode: allow if global limit not reached AND
          // the key is within global limit (which we know because
          // consumedTotal < limit was checked above).
          // Only block if key has consumed >= global limit itself
          // (very unlikely but safe).
          if (consumed >= dim.limit) {
            return { kind: "block", reason: "global-saturated" };
          }
          break;

        case "soft":
          // Soft in generous mode: allow but mark penalised if past fair_share
          if (consumed >= fairShare) {
            anyPenalized = true;
          }
          break;

        case "burst":
          // Burst: always allow while global headroom exists.
          break;
      }
    }
  }

  // All dimensions passed → allow
  return {
    kind: "allow",
    reason: "ok",
    penalized: anyPenalized || undefined,
  };
}
