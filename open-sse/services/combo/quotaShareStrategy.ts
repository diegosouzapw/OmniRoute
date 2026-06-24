/**
 * quotaShareStrategy.ts — Dedicated selection strategy for quota-share combos.
 *
 * Activated ONLY for the internal "quota-share" strategy (the auto-minted qtSd/
 * combos). It is never imported by generic combo routing paths, so tuning this
 * module can never regress the existing strategies (fill-first, p2c, headroom…).
 *
 * Three mechanisms are applied in sequence:
 *
 *   1. Per-model bucket gating (accountBuckets.isBucketSaturated):
 *      A connection whose 5h, 7d, or per-model 7d:<model> window is saturated
 *      for the requested model is moved to a DEPRIORITIZED tail rather than
 *      dropped. If EVERY connection is saturated, all are eligible again
 *      (fail-open: a quota-share combo is never hard-blocked here).
 *
 *   2. DRR (Deficit Round Robin):
 *      Among the eligible connections, each round adds a quantum proportional to
 *      the target weight to that target's deficit, then selects the target with
 *      the largest accumulated deficit and zeroes it. Over many requests this
 *      distributes load proportionally to weight, deterministically.
 *
 *   3. P2C (Power of Two Choices) over real in-flight load:
 *      Between the top two DRR candidates, the one with fewer active in-flight
 *      requests (quotaShareInflight) wins; ties keep the DRR order. The winner's
 *      in-flight counter is incremented immediately and a decrement callback is
 *      returned for the caller's finally/abort handler.
 *
 * All state is in-process; no DB or network calls. The clock is injectable
 * (the `nowMs` param) so unit tests are fully deterministic.
 *
 * Part of: Quota Sharing Engine — Phase 3 (#9 dedicated quota-share strategy).
 */

import { isBucketSaturated } from "../../../src/lib/quota/accountBuckets.ts";
import { incrementInflight, decrementInflight, getInflight } from "./quotaShareInflight.ts";
import type { ResolvedComboTarget } from "./types.ts";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum number of per-combo DRR states retained before oldest-entry eviction. */
const MAX_DRR_COMBOS = 200;

// ---------------------------------------------------------------------------
// DRR state
// ---------------------------------------------------------------------------

/**
 * Outer key: comboName. Inner key: target.executionKey. Value: accumulated
 * deficit (higher = this target is "owed" more service). Single instance —
 * never duplicate this Map (state cohesion).
 */
const _drrState = new Map<string, Map<string, number>>();

function getDrrDeficits(comboName: string): Map<string, number> {
  let deficits = _drrState.get(comboName);
  if (!deficits) {
    if (_drrState.size >= MAX_DRR_COMBOS) {
      // Evict the oldest entry (Map iterates in insertion order).
      const oldestKey = _drrState.keys().next().value;
      if (oldestKey !== undefined) _drrState.delete(oldestKey);
    }
    deficits = new Map();
    _drrState.set(comboName, deficits);
  }
  return deficits;
}

// ---------------------------------------------------------------------------
// Mechanism 1 — per-model bucket gating
// ---------------------------------------------------------------------------

/** Extract the bare model name from "<provider>/<model>" (or pass through). */
function bareModelName(modelStr: string): string {
  const slash = modelStr.indexOf("/");
  return slash >= 0 ? modelStr.slice(slash + 1) : modelStr;
}

/**
 * Return the eligible (non-saturated) targets. Fail-open: when every target is
 * saturated, the original list is returned so the combo is never hard-blocked.
 */
function filterEligibleBySaturation(
  targets: ResolvedComboTarget[],
  modelStr: string,
  nowMs: number
): ResolvedComboTarget[] {
  const modelName = bareModelName(modelStr);

  const eligible = targets.filter((target) => {
    const connId = target.connectionId ?? "";
    if (connId === "") return true; // no connection → cannot be saturation-scored
    const saturated =
      isBucketSaturated(connId, "5h", nowMs) ||
      isBucketSaturated(connId, "7d", nowMs) ||
      (modelName !== "" && isBucketSaturated(connId, `7d:${modelName}`, nowMs));
    return !saturated;
  });

  return eligible.length > 0 ? eligible : targets;
}

// ---------------------------------------------------------------------------
// Mechanism 2 — DRR ordering
// ---------------------------------------------------------------------------

/**
 * Reorder `targets` by deficit round-robin (quantum proportional to weight).
 * Returns a NEW array with the highest-deficit target first; mutates the shared
 * DRR state for `comboName`.
 *
 * Classic DRR: every round each target gains a quantum equal to its normalized
 * weight share; the target with the largest deficit is selected and pays a fixed
 * cost of 1. Subtracting a constant (rather than zeroing) keeps the accumulated
 * fractional credit, so long-run selection frequency converges EXACTLY to the
 * weight ratio and the choice stays deterministic (no fragile float ties).
 */
function applyDrr(targets: ResolvedComboTarget[], comboName: string): ResolvedComboTarget[] {
  if (targets.length <= 1) return targets.slice();

  const deficits = getDrrDeficits(comboName);
  const totalWeight = targets.reduce((sum, t) => sum + normalizeWeight(t.weight), 0);

  // Add each target's quantum (weight share) to its deficit.
  for (const target of targets) {
    const quantum = normalizeWeight(target.weight) / totalWeight;
    deficits.set(target.executionKey, (deficits.get(target.executionKey) ?? 0) + quantum);
  }

  // Select the target with the largest deficit (ties keep input order).
  let winner = targets[0];
  let bestDeficit = deficits.get(winner.executionKey) ?? 0;
  for (let i = 1; i < targets.length; i++) {
    const d = deficits.get(targets[i].executionKey) ?? 0;
    if (d > bestDeficit) {
      bestDeficit = d;
      winner = targets[i];
    }
  }

  // Winner pays a unit cost; the leftover credit carries into the next round.
  deficits.set(winner.executionKey, bestDeficit - 1);

  const rest = targets.filter((t) => t.executionKey !== winner.executionKey);
  return [winner, ...rest];
}

/** Weights default to 1 and are floored at 1 to keep quantum math well-defined. */
function normalizeWeight(weight: number | undefined): number {
  return Number.isFinite(weight) && (weight as number) > 0 ? (weight as number) : 1;
}

// ---------------------------------------------------------------------------
// Mechanism 3 — P2C over in-flight load
// ---------------------------------------------------------------------------

/**
 * Pick the less-loaded of the first two candidates. Returns 0 to keep the DRR
 * winner, or 1 to prefer the runner-up. Ties favor the DRR winner (index 0).
 */
function pickByInflightP2C(
  first: ResolvedComboTarget,
  second: ResolvedComboTarget,
  nowMs: number
): 0 | 1 {
  const loadFirst = getInflight(first.connectionId ?? "", nowMs);
  const loadSecond = getInflight(second.connectionId ?? "", nowMs);
  return loadSecond < loadFirst ? 1 : 0;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface QuotaShareResult {
  /** The selected target, or null when `targets` was empty. */
  target: ResolvedComboTarget | null;
  /**
   * Full ordered dispatch list: winner first, then the remaining eligible
   * targets, then any deprioritized (saturated) targets as last-resort fallbacks.
   */
  orderedTargets: ResolvedComboTarget[];
  /**
   * Release the winner's in-flight slot. Call this in a finally/abort handler.
   * Idempotent — safe to call more than once. If never called, the slot still
   * auto-expires (see quotaShareInflight DEFAULT_LEASE_MS).
   */
  decrementInflight: () => void;
}

/**
 * Select the best target using the dedicated quota-share strategy.
 *
 * @param targets    Resolved combo targets (the combo's eligible step entries).
 * @param comboName  Combo name; used as the DRR state key.
 * @param modelStr   Requested model string, e.g. "anthropic/claude-opus-4".
 * @param nowMs      Current epoch ms for bucket/in-flight checks; defaults to Date.now().
 */
export function selectQuotaShareTarget(
  targets: ResolvedComboTarget[],
  comboName: string,
  modelStr: string,
  nowMs: number = Date.now()
): QuotaShareResult {
  const noOp = (): void => {};

  if (targets.length === 0) {
    return { target: null, orderedTargets: [], decrementInflight: noOp };
  }

  // 1) Per-model bucket gating.
  const eligible = filterEligibleBySaturation(targets, modelStr, nowMs);
  const deprioritized = targets.filter((t) => !eligible.includes(t));

  // 2) DRR ordering over the eligible set.
  const ordered = applyDrr(eligible, comboName);

  // 3) P2C over in-flight between the top two.
  let winner: ResolvedComboTarget;
  let rest: ResolvedComboTarget[];
  if (ordered.length >= 2 && pickByInflightP2C(ordered[0], ordered[1], nowMs) === 1) {
    winner = ordered[1];
    rest = [ordered[0], ...ordered.slice(2)];
  } else {
    winner = ordered[0];
    rest = ordered.slice(1);
  }

  // Reserve the winner's in-flight slot immediately.
  const winnerConnectionId = winner.connectionId ?? "";
  if (winnerConnectionId) incrementInflight(winnerConnectionId, undefined, nowMs);

  const orderedTargets = [winner, ...rest, ...deprioritized];

  // Idempotent decrement callback for the caller's finally/abort path. Uses the
  // selection-time clock so the slot (stamped nowMs + lease) is never treated as
  // expired here — it decrements the live count deterministically.
  let released = false;
  const release = (): void => {
    if (released) return;
    released = true;
    if (winnerConnectionId) decrementInflight(winnerConnectionId, nowMs);
  };

  return { target: winner, orderedTargets, decrementInflight: release };
}

// ---------------------------------------------------------------------------
// Test helpers (never call in production code)
// ---------------------------------------------------------------------------

/** Clear all DRR state. Tests only — keeps state isolation between cases. */
export function _clearDrrStateForTest(): void {
  _drrState.clear();
}

/** Return the DRR deficit for a (comboName, executionKey). Tests only. */
export function _getDrrDeficitForTest(comboName: string, executionKey: string): number {
  return _drrState.get(comboName)?.get(executionKey) ?? 0;
}
