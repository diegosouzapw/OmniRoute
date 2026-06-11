/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyErrorText,
  formatRetryAfter,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
  type ProviderProfile,
} from "../accountFallback.ts";

import { FETCH_TIMEOUT_MS, RateLimitReason } from "../../config/constants.ts";

import { errorResponse, unavailableResponse } from "../../utils/error.ts";

import { clamp01 } from "../../utils/number.ts";

import {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboTargetTimeoutMs,
  PRE_SCREEN_CONCURRENCY,
} from "../comboConfig.ts";

import { getQuotaFetcher } from "../quotaPreflight.ts";

import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";

import { selectWithStrategy, type SlaRoutingPolicy } from "../autoCombo/routerStrategy.ts";

import { getProviderConnections } from "../../../src/lib/db/providers";

import { getProviderModels } from "../../config/providerModels.ts";

import { finiteNumberOrNull, isRecord } from "./utils.ts";
import {
  RESET_AWARE_DEFAULTS,
  RESET_WINDOW_DEFAULT_TIE_BAND_MS,
  RESET_AWARE_SESSION_WINDOW_MS,
  RESET_AWARE_SESSION_REMAINING_WEIGHT,
  RESET_AWARE_SESSION_RESET_PRESSURE_WEIGHT,
  RESET_AWARE_WEEKLY_WINDOW_MS,
  RESET_AWARE_WEEKLY_REMAINING_WEIGHT,
  RESET_AWARE_WEEKLY_RESET_PRESSURE_WEIGHT,
  RESET_AWARE_CONNECTION_CACHE_TTL_MS,
  RESET_AWARE_QUOTA_FETCH_CONCURRENCY,
} from "./constants.ts";
import {
  ResetWindowName,
  RESET_WINDOW_NAMES,
  ResolvedComboTarget,
  QuotaFetchCacheConfig,
  IsModelAvailable,
  PreScreenResult,
  ResetWindowConfig,
} from "./types.ts";
import {
  resetAwareConnectionCache,
  MAX_RESET_AWARE_CACHE,
  resetAwareQuotaCache,
  rrCounters,
  MAX_RR_COUNTERS,
} from "./state.ts";

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

function resolveResetAwareConfig(config: Record<string, unknown> | null | undefined) {
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

function getResetAwareProvider(target: ResolvedComboTarget): string | null {
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

function getNamedQuotaWindow(
  quota: unknown,
  windowName: ResetWindowName
): { percentUsed: number | null; resetAt: string | null } | null {
  if (!quota || !isRecord(quota)) return null;

  if (windowName === "session") return getQuotaWindow(quota, "window5h");
  if (windowName === "weekly") {
    return getQuotaWindow(quota, "window7d") || getQuotaWindow(quota, "windowWeekly");
  }
  if (windowName === "monthly") return getQuotaWindow(quota, "windowMonthly");

  return null;
}

function getWindowsMapQuotaWindow(
  quota: unknown,
  windowName: ResetWindowName
): { percentUsed: number | null; resetAt: string | null } | null {
  if (!quota || !isRecord(quota) || !isRecord(quota.windows)) return null;
  const candidates = Object.entries(quota.windows)
    .map(([key, value]) => ({ key: key.toLowerCase(), value }))
    .filter(({ key }) => key === windowName || key.startsWith(`${windowName} `));

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.key.localeCompare(b.key));
  const window = candidates[0].value;
  if (!isRecord(window)) return null;

  return {
    percentUsed: normalizeWindowPercentUsed(window.percentUsed),
    resetAt: normalizeResetAt(window.resetAt),
  };
}

function resolveQuotaWindowByName(
  quota: unknown,
  windowName: ResetWindowName
): { percentUsed: number | null; resetAt: string | null } | null {
  return getNamedQuotaWindow(quota, windowName) || getWindowsMapQuotaWindow(quota, windowName);
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

function scoreResetAwareQuota(quota: unknown, config: ReturnType<typeof resolveResetAwareConfig>) {
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

async function getQuotaAwareConnectionsForTarget(
  target: ResolvedComboTarget,
  connectionCache: Map<string, Array<Record<string, unknown>>>,
  connectionLoadPromises: Map<string, Promise<Array<Record<string, unknown>>>>,
  comboName: string,
  log: { warn?: (...args: unknown[]) => void }
) {
  const provider = getResetAwareProvider(target);
  if (!provider || !getQuotaFetcher(provider)) return [];
  if (!connectionCache.has(provider)) {
    const cached = resetAwareConnectionCache.get(provider);
    if (cached && Date.now() - cached.fetchedAt < RESET_AWARE_CONNECTION_CACHE_TTL_MS) {
      connectionCache.set(provider, cached.connections);
      return cached.connections;
    }

    if (!connectionLoadPromises.has(provider)) {
      connectionLoadPromises.set(
        provider,
        (async () => {
          try {
            const connections = await getProviderConnections({ provider, isActive: true });
            const activeConnections = Array.isArray(connections)
              ? (connections as Array<Record<string, unknown>>)
              : [];
            if (
              !resetAwareConnectionCache.has(provider) &&
              resetAwareConnectionCache.size >= MAX_RESET_AWARE_CACHE
            ) {
              const oldest = resetAwareConnectionCache.keys().next().value;
              if (oldest !== undefined) resetAwareConnectionCache.delete(oldest);
            }
            resetAwareConnectionCache.set(provider, {
              connections: activeConnections,
              fetchedAt: Date.now(),
            });
            return activeConnections;
          } catch (error) {
            log.warn?.("COMBO", "Reset-aware failed to load quota-aware connections.", {
              comboName,
              err: error,
              operation: "getProviderConnections",
              provider,
            });
            return [];
          }
        })()
      );
    }

    const connections = await connectionLoadPromises.get(provider)!;
    connectionCache.set(provider, connections);
  }
  return connectionCache.get(provider) || [];
}

function normalizeConnectionIds(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const ids = value.filter(
    (connectionId): connectionId is string =>
      typeof connectionId === "string" && connectionId.trim().length > 0
  );
  return ids.length > 0 ? ids : null;
}

function filterAllowedConnectionIds(
  connectionIds: string[],
  apiKeyAllowedConnectionIds: string[] | null | undefined
): string[] {
  const allowedIds = normalizeConnectionIds(apiKeyAllowedConnectionIds);
  if (!allowedIds) return connectionIds;
  const allowedSet = new Set(allowedIds);
  return connectionIds.filter((connectionId) => allowedSet.has(connectionId));
}

function getTargetConnectionIds(
  target: ResolvedComboTarget,
  connections: Array<Record<string, unknown>>
): string[] {
  let connectionIds: string[];
  if (target.connectionId) {
    return [target.connectionId];
  }

  if (Array.isArray(target.allowedConnectionIds) && target.allowedConnectionIds.length > 0) {
    return target.allowedConnectionIds.filter(
      (connectionId): connectionId is string =>
        typeof connectionId === "string" && connectionId.trim().length > 0
    );
  }

  connectionIds = connections
    .map((connection) => (typeof connection.id === "string" ? connection.id : null))
    .filter((connectionId): connectionId is string => !!connectionId);
  return connectionIds;
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  const workerCount = Math.max(1, Math.min(concurrency, items.length));

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextIndex < items.length) {
        const currentIndex = nextIndex++;
        results[currentIndex] = await mapper(items[currentIndex], currentIndex);
      }
    })
  );

  return results;
}

export async function fetchResetAwareQuotaWithCache({
  provider,
  connectionId,
  connection,
  fetcher,
  config,
  log,
  comboName,
}: {
  provider: string;
  connectionId: string;
  connection?: Record<string, unknown>;
  fetcher: (connectionId: string, connection?: Record<string, unknown>) => Promise<unknown>;
  config: QuotaFetchCacheConfig;
  log: { debug?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void };
  comboName: string;
}): Promise<unknown> {
  const cacheKey = `${provider}:${connectionId}`;
  const ttlMs = config.quotaCacheTtlMs;
  const maxStaleMs = config.quotaCacheMaxStaleMs;
  const now = Date.now();
  const cached = resetAwareQuotaCache.get(cacheKey);

  if (ttlMs <= 0 && maxStaleMs <= 0) {
    try {
      return await fetcher(connectionId, connection);
    } catch (error) {
      log.warn?.("COMBO", "Reset-aware quota fetch failed.", {
        comboName,
        connectionId,
        err: error,
        operation: "quotaFetch",
        provider,
      });
      return null;
    }
  }

  const refresh = () => {
    const existing = resetAwareQuotaCache.get(cacheKey);
    if (existing?.refreshPromise != null) return existing.refreshPromise;

    const refreshPromise = fetcher(connectionId, connection)
      .then((quota) => {
        if (quota) {
          if (
            !resetAwareQuotaCache.has(cacheKey) &&
            resetAwareQuotaCache.size >= MAX_RESET_AWARE_CACHE
          ) {
            const oldest = resetAwareQuotaCache.keys().next().value;
            if (oldest !== undefined) resetAwareQuotaCache.delete(oldest);
          }
          resetAwareQuotaCache.set(cacheKey, {
            quota,
            fetchedAt: Date.now(),
            refreshPromise: null,
          });
        } else {
          resetAwareQuotaCache.delete(cacheKey);
        }
        return quota;
      })
      .catch((error) => {
        const previous = resetAwareQuotaCache.get(cacheKey);
        if (previous) {
          if (
            !resetAwareQuotaCache.has(cacheKey) &&
            resetAwareQuotaCache.size >= MAX_RESET_AWARE_CACHE
          ) {
            const oldest = resetAwareQuotaCache.keys().next().value;
            if (oldest !== undefined) resetAwareQuotaCache.delete(oldest);
          }
          resetAwareQuotaCache.set(cacheKey, { ...previous, refreshPromise: null });
        }
        log.warn?.("COMBO", "Reset-aware quota fetch failed.", {
          comboName,
          connectionId,
          err: error,
          operation: "quotaFetch",
          provider,
        });
        return null;
      });

    if (!resetAwareQuotaCache.has(cacheKey) && resetAwareQuotaCache.size >= MAX_RESET_AWARE_CACHE) {
      const oldest = resetAwareQuotaCache.keys().next().value;
      if (oldest !== undefined) resetAwareQuotaCache.delete(oldest);
    }
    resetAwareQuotaCache.set(cacheKey, {
      quota: existing?.quota ?? cached?.quota ?? null,
      fetchedAt: existing?.fetchedAt ?? cached?.fetchedAt ?? 0,
      refreshPromise,
    });
    return refreshPromise;
  };

  if (ttlMs > 0 && cached) {
    const age = now - cached.fetchedAt;
    if (age <= ttlMs) return cached.quota;
    if (maxStaleMs > 0 && age <= ttlMs + maxStaleMs) {
      void refresh();
      return cached.quota;
    }
  }

  return refresh();
}

export async function preScreenTargets(
  targets: ResolvedComboTarget[],
  isModelAvailable?: IsModelAvailable | null
): Promise<Map<string, PreScreenResult>> {
  if (targets.length === 0) {
    return new Map();
  }

  const results = await mapWithConcurrency(
    targets,
    PRE_SCREEN_CONCURRENCY,
    async (target): Promise<{ key: string; result: PreScreenResult }> => {
      const profile = await getRuntimeProviderProfile(target.provider).catch(() => null);

      const breaker = getCircuitBreaker(target.provider);
      if (breaker.getStatus().state === "OPEN") {
        return { key: target.executionKey, result: { profile, available: false } };
      }

      let available = true;
      if (isModelAvailable) {
        // IsModelAvailable may return a sync boolean or a Promise; Promise.resolve
        // normalizes both so the .catch() never runs against a bare boolean.
        available = await Promise.resolve(isModelAvailable(target.modelStr, target)).catch(
          () => true
        );
      }
      return { key: target.executionKey, result: { profile, available } };
    }
  );

  const map = new Map<string, PreScreenResult>();
  for (const { key, result } of results) {
    map.set(key, result);
  }
  return map;
}

export async function orderTargetsByResetAwareQuota(
  targets: ResolvedComboTarget[],
  comboName: string,
  configSource: Record<string, unknown> | null | undefined,
  log: { warn?: (...args: unknown[]) => void },
  apiKeyAllowedConnectionIds?: string[] | null
) {
  if (targets.length === 0) return targets;

  const config = resolveResetAwareConfig(configSource);
  const connectionCache = new Map<string, Array<Record<string, unknown>>>();
  const connectionLoadPromises = new Map<string, Promise<Array<Record<string, unknown>>>>();
  const quotaPromises = new Map<string, Promise<unknown>>();
  const connectionById = new Map<string, Record<string, unknown>>();
  const expandedTargets: ResolvedComboTarget[] = [];

  const targetsWithConnections = await Promise.all(
    targets.map(async (target) => ({
      connections: await getQuotaAwareConnectionsForTarget(
        target,
        connectionCache,
        connectionLoadPromises,
        comboName,
        log
      ),
      target,
    }))
  );

  for (const { target, connections } of targetsWithConnections) {
    for (const connection of connections) {
      if (typeof connection.id === "string") connectionById.set(connection.id, connection);
    }

    const unrestrictedConnectionIds = getTargetConnectionIds(target, connections);
    const connectionIds = filterAllowedConnectionIds(
      unrestrictedConnectionIds,
      apiKeyAllowedConnectionIds
    );
    if (connectionIds.length === 0) {
      if (
        unrestrictedConnectionIds.length > 0 &&
        normalizeConnectionIds(apiKeyAllowedConnectionIds)
      ) {
        continue;
      }
      expandedTargets.push(target);
      continue;
    }

    for (const connectionId of connectionIds) {
      expandedTargets.push({
        ...target,
        connectionId,
        executionKey:
          target.connectionId === connectionId
            ? target.executionKey
            : `${target.executionKey}@${connectionId}`,
      });
    }
  }

  const scoredTargets = await mapWithConcurrency(
    expandedTargets,
    RESET_AWARE_QUOTA_FETCH_CONCURRENCY,
    async (target, index) => {
      let quota: unknown = null;
      const provider = getResetAwareProvider(target);
      const fetcher = provider ? getQuotaFetcher(provider) : null;
      if (fetcher && provider && target.connectionId) {
        const quotaKey = `${provider}:${target.connectionId}`;
        if (!quotaPromises.has(quotaKey)) {
          quotaPromises.set(
            quotaKey,
            fetchResetAwareQuotaWithCache({
              provider,
              connectionId: target.connectionId,
              connection: connectionById.get(target.connectionId),
              fetcher,
              config,
              log,
              comboName,
            })
          );
        }
        quota = await quotaPromises.get(quotaKey)!;
      }
      const { score } = scoreResetAwareQuota(quota, config);
      return { target, score, index };
    }
  );

  scoredTargets.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.index - b.index;
  });

  const bestScore = scoredTargets[0]?.score ?? 0;
  const tiedTargets = scoredTargets.filter((entry) => bestScore - entry.score <= config.tieBand);
  let orderedTiedTargets = tiedTargets;
  if (tiedTargets.length > 1) {
    const key = `reset-aware:${comboName}`;
    const counter = rrCounters.get(key) || 0;
    if (!rrCounters.has(key) && rrCounters.size >= MAX_RR_COUNTERS) {
      const oldest = rrCounters.keys().next().value;
      if (oldest !== undefined) rrCounters.delete(oldest);
    }
    rrCounters.set(key, counter + 1);
    const startIndex = counter % tiedTargets.length;
    orderedTiedTargets = [...tiedTargets.slice(startIndex), ...tiedTargets.slice(0, startIndex)];
  }

  const tiedExecutionKeys = new Set(orderedTiedTargets.map((entry) => entry.target.executionKey));
  return [
    ...orderedTiedTargets,
    ...scoredTargets.filter((entry) => !tiedExecutionKeys.has(entry.target.executionKey)),
  ].map((entry) => entry.target);
}

function getResetWindowTimestampMs(quota: unknown, windows: ResetWindowName[]): number {
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
    selectedResetMs = parseResetTimeMs(normalizeResetAt(quota.resetAt));
  }

  return Number.isFinite(selectedResetMs) ? selectedResetMs : Infinity;
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

export async function orderTargetsByResetWindow(
  targets: ResolvedComboTarget[],
  comboName: string,
  configSource: Record<string, unknown> | null | undefined,
  log: { warn?: (...args: unknown[]) => void },
  apiKeyAllowedConnectionIds?: string[] | null
) {
  if (targets.length === 0) return targets;

  const config = resolveResetWindowConfig(configSource);
  const connectionCache = new Map<string, Array<Record<string, unknown>>>();
  const connectionLoadPromises = new Map<string, Promise<Array<Record<string, unknown>>>>();
  const quotaPromises = new Map<string, Promise<unknown>>();
  const connectionById = new Map<string, Record<string, unknown>>();
  const expandedTargets: ResolvedComboTarget[] = [];

  const targetsWithConnections = await Promise.all(
    targets.map(async (target) => ({
      connections: await getQuotaAwareConnectionsForTarget(
        target,
        connectionCache,
        connectionLoadPromises,
        comboName,
        log
      ),
      target,
    }))
  );

  for (const { target, connections } of targetsWithConnections) {
    for (const connection of connections) {
      if (typeof connection.id === "string") connectionById.set(connection.id, connection);
    }

    const unrestrictedConnectionIds = getTargetConnectionIds(target, connections);
    const connectionIds = filterAllowedConnectionIds(
      unrestrictedConnectionIds,
      apiKeyAllowedConnectionIds
    );
    if (connectionIds.length === 0) {
      if (
        unrestrictedConnectionIds.length > 0 &&
        normalizeConnectionIds(apiKeyAllowedConnectionIds)
      ) {
        continue;
      }
      expandedTargets.push(target);
      continue;
    }

    for (const connectionId of connectionIds) {
      expandedTargets.push({
        ...target,
        connectionId,
        executionKey:
          target.connectionId === connectionId
            ? target.executionKey
            : `${target.executionKey}@${connectionId}`,
      });
    }
  }

  const scoredTargets = await mapWithConcurrency(
    expandedTargets,
    RESET_AWARE_QUOTA_FETCH_CONCURRENCY,
    async (target, index) => {
      let quota: unknown = null;
      const provider = getResetAwareProvider(target);
      const fetcher = provider ? getQuotaFetcher(provider) : null;
      if (fetcher && provider && target.connectionId) {
        const quotaKey = `${provider}:${target.connectionId}`;
        if (!quotaPromises.has(quotaKey)) {
          quotaPromises.set(
            quotaKey,
            fetchResetAwareQuotaWithCache({
              provider,
              connectionId: target.connectionId,
              connection: connectionById.get(target.connectionId),
              fetcher,
              config,
              log,
              comboName,
            })
          );
        }
        quota = await quotaPromises.get(quotaKey)!;
      }

      return {
        target,
        resetMs: getResetWindowTimestampMs(quota, config.windows),
        index,
      };
    }
  );

  scoredTargets.sort((a, b) => {
    if (a.resetMs !== b.resetMs) return a.resetMs - b.resetMs;
    return a.index - b.index;
  });

  const bestResetMs = scoredTargets[0]?.resetMs ?? Infinity;
  if (!Number.isFinite(bestResetMs) || config.tieBandMs <= 0) {
    return scoredTargets.map((entry) => entry.target);
  }

  const tiedTargets = scoredTargets.filter(
    (entry) => entry.resetMs - bestResetMs <= config.tieBandMs
  );
  if (tiedTargets.length <= 1) return scoredTargets.map((entry) => entry.target);

  const key = `reset-window:${comboName}`;
  const counter = rrCounters.get(key) || 0;
  if (!rrCounters.has(key) && rrCounters.size >= MAX_RR_COUNTERS) {
    const oldest = rrCounters.keys().next().value;
    if (oldest !== undefined) rrCounters.delete(oldest);
  }
  rrCounters.set(key, counter + 1);
  const startIndex = counter % tiedTargets.length;
  const orderedTiedTargets = [
    ...tiedTargets.slice(startIndex),
    ...tiedTargets.slice(0, startIndex),
  ];
  const tiedExecutionKeys = new Set(orderedTiedTargets.map((entry) => entry.target.executionKey));

  return [
    ...orderedTiedTargets,
    ...scoredTargets.filter((entry) => !tiedExecutionKeys.has(entry.target.executionKey)),
  ].map((entry) => entry.target);
}
