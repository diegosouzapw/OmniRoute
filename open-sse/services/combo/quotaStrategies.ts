/**
 * Stateful + async reset-aware / reset-window quota strategies for combo routing.
 *
 * Holds the two mutable module-level caches that back reset-aware routing
 * (`resetAwareConnectionCache` for per-provider active connections and
 * `resetAwareQuotaCache` for per-connection quota snapshots), plus the helpers
 * that read/write them and the strategy orderers. Extracted byte-identically
 * from combo.ts (QG v2 Fase 9 T5 D7b) — the larger, stateful half of the
 * reset-aware quota block. The pure scoring/window-math half lives in
 * ./quotaScoring.ts and is imported here.
 *
 * State cohesion: `resetAwareConnectionCache`, `resetAwareQuotaCache`, and
 * `MAX_RESET_AWARE_CACHE` MUST remain single instances defined once here,
 * alongside their only readers/writers (getQuotaAwareConnectionsForTarget,
 * fetchResetAwareQuotaWithCache) — never duplicate a Map.
 *
 * Cross-module state: the tie-band round-robin in orderTargetsByResetAwareQuota
 * and orderTargetsByResetWindow shares the same rrCounters Map from ./rrState.ts
 * (D7a) so reset-aware tie rotation stays consistent with round-robin routing.
 *
 * Pure leaf: this module never imports from the combo barrel.
 */

import { getRuntimeProviderProfile, type ProviderProfile } from "../accountFallback.ts";
import { PRE_SCREEN_CONCURRENCY } from "../comboConfig.ts";
import { getQuotaFetcher } from "../quotaPreflight.ts";
import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";
import { getProviderConnections } from "../../../src/lib/db/providers";
import { MAX_RR_COUNTERS, rrCounters } from "./rrState.ts";
import type { ResolvedComboTarget, IsModelAvailable } from "./types.ts";
import {
  resolveResetAwareConfig,
  resolveResetWindowConfig,
  getResetAwareProvider,
  scoreResetAwareQuota,
  getResetWindowTimestampMs,
  type QuotaFetchCacheConfig,
} from "./quotaScoring.ts";

const RESET_AWARE_CONNECTION_CACHE_TTL_MS = 30_000;
const RESET_AWARE_QUOTA_FETCH_CONCURRENCY = 5;

const MAX_RESET_AWARE_CACHE = 200;

const resetAwareConnectionCache = new Map<
  string,
  { fetchedAt: number; connections: Array<Record<string, unknown>> }
>();
const resetAwareQuotaCache = new Map<
  string,
  { fetchedAt: number; quota: unknown; refreshPromise: Promise<unknown> | null }
>();

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

export type PreScreenResult = { profile: ProviderProfile | null; available: boolean };

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
