/**
 * Combo quota — configuration resolvers (split from combo/quota.ts).
 * Parses operator config into normalized reset-aware / reset-window / SLA policies.
 */

import { clamp01 } from "../../utils/number.ts";

import { type SlaRoutingPolicy } from "../autoCombo/routerStrategy.ts";

import { finiteNumberOrNull, isRecord } from "../utils.ts";
import { RESET_AWARE_DEFAULTS, RESET_WINDOW_DEFAULT_TIE_BAND_MS } from "../constants.ts";
import { ResetWindowName, RESET_WINDOW_NAMES } from "../types.ts";

function getPercentConfig(value: unknown, fallback: number): number {
  const numericValue = finiteNumberOrNull(value);
  if (numericValue === null) return fallback;
  return Math.max(0, Math.min(100, numericValue));
}

function getWeightConfig(value: unknown, fallback: number): number {
  const numericValue = finiteNumberOrNull(value);
  if (numericValue === null || numericValue < 0) return fallback;
  return numericValue;
}

function getDurationConfig(value: unknown, fallback: number, max: number): number {
  const numericValue = finiteNumberOrNull(value);
  if (numericValue === null || numericValue < 0) return fallback;
  return Math.min(max, Math.floor(numericValue));
}

export interface ResetAwareConfig {
  sessionWeight: number;
  weeklyWeight: number;
  tieBand: number;
  exhaustionGuard: number;
  quotaCacheTtlMs: number;
  quotaCacheMaxStaleMs: number;
}

export function resolveResetAwareConfig(
  config: Record<string, unknown> | null | undefined
): ResetAwareConfig {
  const sessionWeight = getWeightConfig(
    config?.resetAwareSessionWeight,
    RESET_AWARE_DEFAULTS.sessionWeight
  );
  const weeklyWeight = getWeightConfig(
    config?.resetAwareWeeklyWeight,
    RESET_AWARE_DEFAULTS.weeklyWeight
  );
  const totalWeight = sessionWeight + weeklyWeight;
  const normalizedSessionWeight =
    totalWeight > 0 ? sessionWeight / totalWeight : RESET_AWARE_DEFAULTS.sessionWeight;

  return {
    sessionWeight: normalizedSessionWeight,
    weeklyWeight: 1 - normalizedSessionWeight,
    tieBand:
      getPercentConfig(config?.resetAwareTieBandPercent, RESET_AWARE_DEFAULTS.tieBandPercent) / 100,
    exhaustionGuard:
      getPercentConfig(
        config?.resetAwareExhaustionGuardPercent,
        RESET_AWARE_DEFAULTS.exhaustionGuardPercent
      ) / 100,
    quotaCacheTtlMs: getDurationConfig(config?.resetAwareQuotaCacheTtlMs, 0, 300_000),
    quotaCacheMaxStaleMs: getDurationConfig(config?.resetAwareQuotaCacheMaxStaleMs, 0, 3_600_000),
  };
}

export function resolveResetWindowConfig(config: Record<string, unknown> | null | undefined) {
  const rawWindows = Array.isArray(config?.resetWindowWindows) ? config.resetWindowWindows : null;
  const windows = rawWindows
    ?.filter((windowName): windowName is ResetWindowName =>
      (RESET_WINDOW_NAMES as readonly string[]).includes(String(windowName))
    )
    .filter((windowName, index, array) => array.indexOf(windowName) === index);

  const effectiveWindows =
    windows && windows.length > 0
      ? windows
      : config?.resetWindowIncludeSession === true
        ? (["weekly", "session"] as ResetWindowName[])
        : (["weekly"] as ResetWindowName[]);

  return {
    windows: effectiveWindows,
    tieBandMs: Math.max(
      0,
      finiteNumberOrNull(config?.resetWindowTieBandMs) ?? RESET_WINDOW_DEFAULT_TIE_BAND_MS
    ),
    quotaCacheTtlMs: getDurationConfig(config?.resetWindowQuotaCacheTtlMs, 0, 300_000),
    quotaCacheMaxStaleMs: getDurationConfig(config?.resetWindowQuotaCacheMaxStaleMs, 0, 3_600_000),
  };
}

export function resolveSlaRoutingPolicy(
  config: Record<string, unknown> | null | undefined
): SlaRoutingPolicy | undefined {
  if (!config) return undefined;
  const nestedSla = isRecord(config.sla) ? config.sla : {};
  const targetP95Ms = finiteNumberOrNull(config.slaTargetP95Ms ?? nestedSla.targetP95Ms);
  const maxErrorRate = finiteNumberOrNull(config.slaMaxErrorRate ?? nestedSla.maxErrorRate);
  const maxCostPer1MTokens = finiteNumberOrNull(
    config.slaMaxCostPer1MTokens ?? nestedSla.maxCostPer1MTokens
  );
  const hardConstraints = config.slaHardConstraints ?? nestedSla.hardConstraints;

  const policy: SlaRoutingPolicy = {};
  if (targetP95Ms !== null && targetP95Ms > 0) policy.targetP95Ms = targetP95Ms;
  if (maxErrorRate !== null && maxErrorRate >= 0) policy.maxErrorRate = clamp01(maxErrorRate);
  if (maxCostPer1MTokens !== null && maxCostPer1MTokens > 0) {
    policy.maxCostPer1MTokens = maxCostPer1MTokens;
  }
  if (typeof hardConstraints === "boolean") policy.hardConstraints = hardConstraints;

  return Object.keys(policy).length > 0 ? policy : undefined;
}

