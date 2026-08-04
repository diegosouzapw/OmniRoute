/**
 * Round-robin sticky state for combo routing.
 *
 * Holds the two mutable module-level Maps that back round-robin distribution
 * (`rrCounters`) and sticky round-robin target affinity (`rrStickyTargets`),
 * plus the helpers that read/write them. Extracted byte-identically from
 * combo.ts (QG v2 Fase 9 T5 D7a).
 *
 * State cohesion: these two Maps MUST remain single instances. combo.ts imports
 * the same references back and mutates them directly (orderTargetsByResetAwareQuota,
 * orderTargetsByResetWindow, handleRoundRobinCombo) — never duplicate a Map.
 *
 * Pure leaf: this module never imports from the combo barrel.
 */

import type { ResolvedComboUnit } from "./types.ts";

// In-memory atomic counter per combo for round-robin distribution
// Resets on server restart (by design — no stale state)
// Eviction limits to prevent unbounded memory growth
export const MAX_RR_COUNTERS = 500;

export const rrCounters = new Map<string, number>();
export const rrStickyTargets = new Map<string, { executionKey: string; successCount: number }>();
export const weightedStickyTargets = new Map<
  string,
  { executionKey: string; successCount: number }
>();

export function clampStickyRoundRobinTargetLimit(value: unknown): number {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 1;
  return Math.min(Math.max(Math.floor(numericValue), 1), 1000);
}

export const clampStickyWeightedTargetLimit = clampStickyRoundRobinTargetLimit;

export function getStickyRoundRobinStartIndex(
  comboName: string,
  targets: ResolvedComboUnit[],
  stickyLimit: number
): { startIndex: number; counter: number } {
  const sticky = rrStickyTargets.get(comboName);
  const stickyIndex = sticky
    ? targets.findIndex((target) => target.executionKey === sticky.executionKey)
    : -1;
  if (stickyLimit > 1 && sticky && stickyIndex >= 0 && sticky.successCount < stickyLimit) {
    return { startIndex: stickyIndex, counter: rrCounters.get(comboName) || 0 };
  }

  const counter = rrCounters.get(comboName) || 0;
  return { startIndex: counter % targets.length, counter };
}

export function recordStickyRoundRobinSuccess(
  comboName: string,
  target: ResolvedComboUnit,
  stickyLimit: number,
  targets: ResolvedComboUnit[]
): void {
  const sticky = rrStickyTargets.get(comboName);
  const successCount = sticky?.executionKey === target.executionKey ? sticky.successCount + 1 : 1;
  if (successCount >= stickyLimit) {
    const servedIndex = targets.findIndex((entry) => entry.executionKey === target.executionKey);
    rrCounters.set(
      comboName,
      servedIndex >= 0 ? servedIndex + 1 : (rrCounters.get(comboName) || 0) + 1
    );
    rrStickyTargets.delete(comboName);
    return;
  }

  rrStickyTargets.set(comboName, { executionKey: target.executionKey, successCount });
}

export function getStickyWeightedExecutionKey(
  comboName: string,
  stickyLimit: number
): string | null {
  const sticky = weightedStickyTargets.get(comboName);
  if (!sticky || stickyLimit <= 1 || sticky.successCount >= stickyLimit) return null;
  return sticky.executionKey;
}

export function recordStickyWeightedSuccess(
  comboName: string,
  executionKey: string,
  stickyLimit: number
): void {
  const sticky = weightedStickyTargets.get(comboName);
  const successCount = sticky?.executionKey === executionKey ? sticky.successCount + 1 : 1;
  if (successCount >= stickyLimit) {
    weightedStickyTargets.delete(comboName);
    return;
  }

  weightedStickyTargets.set(comboName, { executionKey, successCount });
}

/**
 * Sticky batch size for round-robin combo targets (9router parity).
 * Per-combo config → comboStickyRoundRobinLimit → stickyRoundRobinLimit.
 * Uses clampStickyRoundRobinTargetLimit defined above in this module.
 */
export function resolveComboStickyRoundRobinLimit(
  perComboLimit: unknown,
  settings: Record<string, unknown> | null | undefined
): number {
  if (perComboLimit !== undefined && perComboLimit !== null) {
    return clampStickyRoundRobinTargetLimit(perComboLimit);
  }
  const comboSticky = settings?.comboStickyRoundRobinLimit;
  if (comboSticky !== undefined && comboSticky !== null) {
    return clampStickyRoundRobinTargetLimit(comboSticky);
  }
  return clampStickyRoundRobinTargetLimit(settings?.stickyRoundRobinLimit);
}
