/**
 * Combo quota — reset-aware quota scoring & connection helpers (split from combo/quota.ts).
 */

import { clamp01 } from "../../utils/number.ts";

import { getProviderConnections } from "../../../src/lib/db/providers";
import { getQuotaFetcher } from "../quotaPreflight.ts";

import { finiteNumberOrNull, isRecord } from "../utils.ts";
import {
  RESET_AWARE_SESSION_WINDOW_MS,
  RESET_AWARE_SESSION_REMAINING_WEIGHT,
  RESET_AWARE_SESSION_RESET_PRESSURE_WEIGHT,
  RESET_AWARE_WEEKLY_WINDOW_MS,
  RESET_AWARE_WEEKLY_REMAINING_WEIGHT,
  RESET_AWARE_WEEKLY_RESET_PRESSURE_WEIGHT,
  RESET_AWARE_CONNECTION_CACHE_TTL_MS,
} from "../constants.ts";
import { ResetWindowName, ResolvedComboTarget } from "../types.ts";
import { resetAwareConnectionCache, MAX_RESET_AWARE_CACHE } from "../state.ts";

import { resolveResetAwareConfig, type ResetAwareConfig } from "./config";

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

function scoreResetAwareQuota(quota: unknown, config: ResetAwareConfig) {
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

