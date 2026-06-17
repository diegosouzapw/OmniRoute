/**
 * Combo quota — exported orchestration: quota fetch/cache, pre-screen, and
 * reset-aware / reset-window target ordering (split from combo/quota.ts).
 */

import { clamp01 } from "../../utils/number.ts";

import { getRuntimeProviderProfile } from "../accountFallback.ts";
import { getQuotaFetcher } from "../quotaPreflight.ts";
import { PRE_SCREEN_CONCURRENCY } from "../comboConfig.ts";

import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";

import { isRecord } from "../utils.ts";
import {
  RESET_AWARE_SESSION_WINDOW_MS,
  RESET_AWARE_WEEKLY_WINDOW_MS,
  RESET_AWARE_QUOTA_FETCH_CONCURRENCY,
} from "../constants.ts";
import {
  ResetWindowName,
  ResolvedComboTarget,
  QuotaFetchCacheConfig,
  IsModelAvailable,
  PreScreenResult,
  ResetWindowConfig,
} from "../types.ts";
import { resetAwareQuotaCache, MAX_RESET_AWARE_CACHE, rrCounters, MAX_RR_COUNTERS } from "../state.ts";

import { resolveResetAwareConfig, resolveResetWindowConfig } from "./config";
import {
  getResetAwareProvider,
  normalizeResetAt,
  parseResetTimeMs,
  resolveQuotaWindowByName,
  scoreResetAwareQuota,
  getQuotaAwareConnectionsForTarget,
  normalizeConnectionIds,
  filterAllowedConnectionIds,
  getTargetConnectionIds,
  mapWithConcurrency,
} from "./resetAware";

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
