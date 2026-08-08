/**
 * Pure scoring + window-math helpers for the reset-aware / reset-window combo
 * strategies. No module state, no async, no I/O — extracted byte-identically
 * from combo.ts (QG v2 Fase 9 T5 D7b) as the pure half of the reset-aware quota
 * block. The stateful/async half (cache Maps + connection/quota fetchers +
 * orderTargets*) lives in ./quotaStrategies.ts, which imports the scoring
 * helpers from here.
 *
 * Pure leaf: this module never imports from the combo barrel.
 */

import { clamp01 } from "../../utils/number.ts";
import { isRecord } from "./comboData.ts";
import type { SlaRoutingPolicy } from "../autoCombo/routerStrategy.ts";
import { RESET_WINDOW_NAMES } from "./types.ts";
import type { ResolvedComboTarget } from "./types.ts";

const RESET_AWARE_SESSION_WINDOW_MS = 5 * 60 * 60 * 1000;
const RESET_AWARE_WEEKLY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const RESET_AWARE_SESSION_REMAINING_WEIGHT = 0.45;
const RESET_AWARE_SESSION_RESET_PRESSURE_WEIGHT = 0.55;
const RESET_AWARE_WEEKLY_REMAINING_WEIGHT = 0.25;
const RESET_AWARE_WEEKLY_RESET_PRESSURE_WEIGHT = 0.75;
const RESET_AWARE_DEFAULTS = {
  sessionWeight: 0.35,
  weeklyWeight: 0.65,
  tieBandPercent: 5,
  exhaustionGuardPercent: 10,
};
const RESET_WINDOW_DEFAULT_TIE_BAND_MS = 60_000;

type ResetWindowName = (typeof RESET_WINDOW_NAMES)[number];
export type QuotaFetchCacheConfig = {
  quotaCacheTtlMs: number;
  quotaCacheMaxStaleMs: number;
};
export type ResetWindowConfig = ReturnType<typeof resolveResetWindowConfig>;

function finiteNumberOrNull(value: unknown): number | null {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

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

export function resolveResetAwareConfig(config: Record<string, unknown> | null | undefined) {
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

export function getResetAwareProvider(target: ResolvedComboTarget): string | null {
  const provider = (target.providerId || target.provider || "").toLowerCase();
  return provider || null;
}

function normalizeResetAt(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function parseResetTimeMs(resetAt: string | null | undefined): number {
  if (!resetAt) return NaN;
  const resetTime = Date.parse(resetAt);
  if (Number.isFinite(resetTime)) return resetTime;

  if (!/^\d+(?:\.\d+)?$/.test(resetAt)) return NaN;
  const numericResetAt = Number(resetAt);
  if (!Number.isFinite(numericResetAt)) return NaN;
  return numericResetAt < 10_000_000_000 ? numericResetAt * 1000 : numericResetAt;
}

function getQuotaWindow(
  quota: unknown,
  key: "window5h" | "window7d" | "windowWeekly" | "windowMonthly"
): { percentUsed: number | null; resetAt: string | null } | null {
  if (!isRecord(quota)) return null;
  const window = quota[key];
  if (!isRecord(window)) return null;
  const percentUsed = finiteNumberOrNull(window.percentUsed);
  const resetAt = normalizeResetAt(window.resetAt);
  return { percentUsed, resetAt };
}

function normalizeWindowPercentUsed(value: unknown): number | null {
  const numericValue = finiteNumberOrNull(value);
  if (numericValue === null) return null;
  if (numericValue > 1) return clamp01(numericValue / 100);
  return clamp01(numericValue);
}

type QuotaWindowSnapshot = { percentUsed: number | null; resetAt: string | null };

/**
 * Pick the first candidate that actually carries a reset instant, falling back
 * to the first present candidate. A window can be structurally present but
 * carry `resetAt: null` (e.g. Codex's `window7d` placeholder when the upstream
 * only reported the primary limit); a plain `a || b` short-circuit would let
 * that empty window shadow a sibling that does know when it resets — #9330.
 */
function pickWindowWithResetAt(
  ...candidates: Array<QuotaWindowSnapshot | null>
): QuotaWindowSnapshot | null {
  return candidates.find((candidate) => candidate?.resetAt) ?? candidates.find(Boolean) ?? null;
}

function getNamedQuotaWindow(
  quota: unknown,
  windowName: ResetWindowName
): QuotaWindowSnapshot | null {
  if (!quota || !isRecord(quota)) return null;

  if (windowName === "session") return getQuotaWindow(quota, "window5h");
  if (windowName === "weekly") {
    return pickWindowWithResetAt(
      getQuotaWindow(quota, "window7d"),
      getQuotaWindow(quota, "windowWeekly")
    );
  }
  if (windowName === "monthly") return getQuotaWindow(quota, "windowMonthly");

  return null;
}

function toWindowSnapshot(window: unknown): QuotaWindowSnapshot | null {
  if (!isRecord(window)) return null;
  return {
    percentUsed: normalizeWindowPercentUsed(window.percentUsed),
    resetAt: normalizeResetAt(window.resetAt),
  };
}

/**
 * Every entry of the snapshot's `windows` map, name lower-cased.
 *
 * Deliberately reads `windows` only, never Codex's wider `allWindows`: for a
 * Spark request `fetchCodexQuota` narrows `windows` to the Spark scope on
 * purpose, and pulling the normal-scope entries back in would rank a request
 * against a window it cannot spend.
 */
function getQuotaWindowEntries(
  quota: unknown
): Array<{ key: string; window: QuotaWindowSnapshot }> {
  if (!quota || !isRecord(quota) || !isRecord(quota.windows)) return [];
  const entries: Array<{ key: string; window: QuotaWindowSnapshot }> = [];
  for (const [key, value] of Object.entries(quota.windows)) {
    const window = toWindowSnapshot(value);
    if (window) entries.push({ key: key.toLowerCase(), window });
  }
  return entries;
}

function getWindowsMapQuotaWindow(
  quota: unknown,
  windowName: ResetWindowName
): QuotaWindowSnapshot | null {
  const candidates = getQuotaWindowEntries(quota).filter(
    ({ key }) => key === windowName || key.startsWith(`${windowName} `)
  );

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.key.localeCompare(b.key));
  // Prefer a candidate that knows when it resets (e.g. "weekly" vs a scoped
  // "weekly (spark)" placeholder without a resetAt) — #9330.
  return pickWindowWithResetAt(
    ...candidates.filter(({ window }) => window.resetAt).map(({ window }) => window),
    candidates[0].window
  );
}

function resolveQuotaWindowByName(
  quota: unknown,
  windowName: ResetWindowName
): QuotaWindowSnapshot | null {
  return pickWindowWithResetAt(
    getNamedQuotaWindow(quota, windowName),
    getWindowsMapQuotaWindow(quota, windowName)
  );
}

/**
 * Earliest reset instant across EVERY window a snapshot exposes, regardless of
 * how the provider named it.
 *
 * Last-resort normalizer for #9330: providers routed through
 * `genericQuotaFetcher.convertUsageToQuotaInfo` key their `windows` map by
 * MODEL ID (Antigravity: "gemini-3-flash", "claude-sonnet-5", …), so none of
 * the canonical "weekly" | "session" | "monthly" lookups match. Without this
 * those accounts resolved to `Infinity` ("never resets") and were sorted behind
 * a Codex account whose secondary window was 26 days out.
 */
function getEarliestWindowResetMs(quota: unknown): number {
  let earliest = Infinity;
  for (const { window } of getQuotaWindowEntries(quota)) {
    const resetMs = parseResetTimeMs(window.resetAt);
    if (Number.isFinite(resetMs)) earliest = Math.min(earliest, resetMs);
  }
  return earliest;
}

function getResetUrgency(resetAt: string | null | undefined, windowMs: number): number {
  if (!resetAt) return 0.5;
  const resetTime = parseResetTimeMs(resetAt);
  if (!Number.isFinite(resetTime)) return 0.5;
  const msUntilReset = resetTime - Date.now();
  if (msUntilReset <= 0) return 1;
  return clamp01(1 - msUntilReset / windowMs);
}

function scoreQuotaWindow(
  remaining: number,
  resetAt: string | null | undefined,
  windowMs: number,
  remainingWeight: number,
  resetPressureWeight: number
): number {
  const normalizedRemaining = clamp01(remaining);
  const resetUrgency = getResetUrgency(resetAt, windowMs);
  const resetPressure = resetUrgency * (1 - normalizedRemaining);
  return remainingWeight * normalizedRemaining + resetPressureWeight * resetPressure;
}

export function scoreResetAwareQuota(
  quota: unknown,
  config: ReturnType<typeof resolveResetAwareConfig>
) {
  if (!quota || !isRecord(quota)) return { score: 0.5 };
  if (quota.limitReached === true) return { score: -Infinity };

  const overallPercentUsed = clamp01(finiteNumberOrNull(quota.percentUsed) ?? 0.5);
  const sessionWindow = getQuotaWindow(quota, "window5h");
  const weeklyWindow = getQuotaWindow(quota, "window7d") || getQuotaWindow(quota, "windowWeekly");
  const sessionRemaining = clamp01(1 - (sessionWindow?.percentUsed ?? overallPercentUsed));
  const weeklyRemaining = clamp01(1 - (weeklyWindow?.percentUsed ?? overallPercentUsed));
  const sessionScore = scoreQuotaWindow(
    sessionRemaining,
    sessionWindow?.resetAt,
    RESET_AWARE_SESSION_WINDOW_MS,
    RESET_AWARE_SESSION_REMAINING_WEIGHT,
    RESET_AWARE_SESSION_RESET_PRESSURE_WEIGHT
  );
  const weeklyScore = scoreQuotaWindow(
    weeklyRemaining,
    weeklyWindow?.resetAt ?? normalizeResetAt(quota.resetAt),
    RESET_AWARE_WEEKLY_WINDOW_MS,
    RESET_AWARE_WEEKLY_REMAINING_WEIGHT,
    RESET_AWARE_WEEKLY_RESET_PRESSURE_WEIGHT
  );
  let score = config.sessionWeight * sessionScore + config.weeklyWeight * weeklyScore;

  if (config.exhaustionGuard > 0 && sessionRemaining < config.exhaustionGuard) {
    score *= Math.max(0.05, sessionRemaining / config.exhaustionGuard);
  }

  return { score };
}

/**
 * Absolute epoch-ms instant at which the configured quota window next resets,
 * or `Infinity` when the snapshot exposes no parseable reset (which sorts the
 * target last under the `reset-window` strategy).
 *
 * Resolution order — each step only runs when the previous one found nothing:
 *   1. the configured windows, by canonical name (structural `window5h` /
 *      `window7d` / `windowWeekly` / `windowMonthly` fields, then a `windows`
 *      map keyed by "weekly" | "session" | "monthly");
 *   2. the earliest reset across every entry of the `windows` map, whatever the
 *      provider named them (Antigravity keys its map by model id — #9330);
 *   3. the single-signal top-level `quota.resetAt`.
 *
 * Step 2 sits ahead of step 3 deliberately: `quota.resetAt` is populated from
 * the most-USED window, which is not necessarily the one resetting soonest, and
 * is left null entirely while every window is still at 0% used.
 */
export function getResetWindowTimestampMs(quota: unknown, windows: ResetWindowName[]): number {
  if (!quota || !isRecord(quota) || quota.limitReached === true) return Infinity;

  let selectedResetMs = Infinity;
  for (const windowName of windows) {
    const window = resolveQuotaWindowByName(quota, windowName);
    const resetMs = parseResetTimeMs(window?.resetAt ?? null);
    if (Number.isFinite(resetMs)) {
      selectedResetMs = Math.min(selectedResetMs, resetMs);
    }
  }

  if (!Number.isFinite(selectedResetMs)) {
    selectedResetMs = getEarliestWindowResetMs(quota);
  }

  if (!Number.isFinite(selectedResetMs)) {
    selectedResetMs = parseResetTimeMs(normalizeResetAt(quota.resetAt));
  }

  return Number.isFinite(selectedResetMs) ? selectedResetMs : Infinity;
}

/**
 * Milliseconds remaining until the configured window resets — the uniform
 * metric the `reset-window` strategy sorts on (ascending: soonest first).
 *
 * Normalizing to a duration (rather than comparing raw epoch timestamps) keeps
 * every provider on one scale and collapses already-elapsed resets to 0, so a
 * snapshot that is stale by three days ties with one that reset a second ago
 * instead of jumping the queue by virtue of being older. `Infinity` means "no
 * known reset" and sorts last.
 */
export function getResetWindowRemainingMs(
  quota: unknown,
  windows: ResetWindowName[],
  now: number = Date.now()
): number {
  const resetMs = getResetWindowTimestampMs(quota, windows);
  if (!Number.isFinite(resetMs)) return Infinity;
  return Math.max(0, resetMs - now);
}

function getResetWindowHorizonMs(windows: ResetWindowName[]): number {
  if (windows.includes("monthly")) return 30 * 24 * 60 * 60 * 1000;
  if (windows.includes("weekly")) return RESET_AWARE_WEEKLY_WINDOW_MS;
  return RESET_AWARE_SESSION_WINDOW_MS;
}

export function calculateResetWindowAffinity(quota: unknown, config: ResetWindowConfig): number {
  const resetMs = getResetWindowTimestampMs(quota, config.windows);
  if (!Number.isFinite(resetMs)) return 0.5;

  const msUntilReset = resetMs - Date.now();
  if (msUntilReset <= 0) return 1;
  return clamp01(1 - msUntilReset / getResetWindowHorizonMs(config.windows));
}
