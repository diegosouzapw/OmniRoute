import { randomUUID, createHash } from "crypto";
import {
  getProviderConnections,
  getProviderNodes,
  validateApiKey,
  updateProviderConnection,
  getSettings,
  getCachedSettings,
  getSessionAccountAffinity,
  upsertSessionAccountAffinity,
  touchSessionAccountAffinity,
  deleteSessionAccountAffinity,
} from "@/lib/localDb";
import {
  DEFAULT_QUOTA_THRESHOLD_PERCENT,
  getQuotaCache,
  getQuotaWindowStatus,
  isAccountQuotaExhausted,
} from "@/domain/quotaCache";
import {
  isAccountUnavailable,
  getUnavailableUntil,
  getEarliestRateLimitedUntil,
  formatRetryAfter,
  checkFallbackError,
  isModelLocked,
  getModelLockoutInfo,
  lockModel,
  hasPerModelQuota,
  getRuntimeProviderProfile,
  recordModelLockoutFailure,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isLocalProvider } from "@omniroute/open-sse/config/providerRegistry.ts";
import { COOLDOWN_MS } from "@omniroute/open-sse/config/constants.ts";
import {
  preflightQuota,
  isQuotaPreflightEnabled,
} from "@omniroute/open-sse/services/quotaPreflight.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { syncHealthFromDB, type KeyHealth } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "@omniroute/open-sse/services/errorClassifier.ts";
import { looksLikeQuotaExhausted } from "@/shared/utils/classify429";
import { getCodexModelScope } from "@omniroute/open-sse/executors/codex.ts";
import {
  getProviderById,
  getProviderAlias,
  resolveProviderId,
  NOAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import * as log from "../utils/logger";
import { fisherYatesShuffle, getNextFromDeckSync } from "@/shared/utils/shuffleDeck";
import crypto from "node:crypto";

import { MIN_QUOTA_THRESHOLD_PERCENT, MAX_QUOTA_THRESHOLD_PERCENT } from "./constants.ts";
import { getEarliestFutureDate } from "./connectionStatus.ts";
import { asRecord, toNumber, toBooleanOrDefault } from "./utils.ts";
import { JsonRecord, ProviderConnectionView } from "./types.ts";

export function getCodexLimitPolicy(providerSpecificData: JsonRecord): {
  use5h: boolean;
  useWeekly: boolean;
} {
  const policy = asRecord(providerSpecificData.codexLimitPolicy);
  return {
    use5h: toBooleanOrDefault(policy.use5h, true),
    useWeekly: toBooleanOrDefault(policy.useWeekly, true),
  };
}

export interface QuotaLimitPolicy {
  enabled: boolean;
  thresholdPercent: number;
  windows: string[];
}

export interface QuotaCacheView {
  quotas?: Record<
    string,
    {
      remainingPercentage?: number;
      resetAt?: string | null;
    }
  >;
}

export function normalizeQuotaThreshold(
  value: unknown,
  fallback = DEFAULT_QUOTA_THRESHOLD_PERCENT
): number {
  const parsed = toNumber(value, fallback);
  return Math.min(MAX_QUOTA_THRESHOLD_PERCENT, Math.max(MIN_QUOTA_THRESHOLD_PERCENT, parsed));
}

export function normalizeWindowName(windowName: unknown): string | null {
  if (typeof windowName !== "string") return null;
  const normalized = windowName.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

export function uniqueWindows(windows: string[]): string[] {
  return [...new Set(windows)];
}

export function normalizeCodexWindowName(windowName: unknown): string | null {
  if (typeof windowName !== "string") return null;
  const normalized = windowName.trim().toLowerCase();
  if (normalized === "session (5h)" || normalized === "5h" || normalized === "five_hour") {
    return "session";
  }
  if (normalized === "weekly (7d)" || normalized === "7d" || normalized === "seven_day") {
    return "weekly";
  }
  return normalized;
}

export function applyCodexWindowPolicy(rawWindows: string[], providerSpecificData: JsonRecord): string[] {
  const codexPolicy = getCodexLimitPolicy(providerSpecificData);
  const normalizedRaw = rawWindows.map(normalizeCodexWindowName).filter(Boolean) as string[];

  // Preserve explicitly configured custom windows, but enforce canonical Codex windows
  // from toggles so weekly exhaustion is never skipped when useWeekly=true.
  let windows = [...normalizedRaw];
  windows = windows.filter((windowName) => {
    if (windowName === "session") return codexPolicy.use5h;
    if (windowName === "weekly") return codexPolicy.useWeekly;
    return true;
  });
  if (codexPolicy.use5h) windows.push("session");
  if (codexPolicy.useWeekly) windows.push("weekly");

  return uniqueWindows(windows);
}

export function getCodexScopeRateLimitedUntil(
  providerSpecificData: JsonRecord,
  model: string | null
): string | null {
  if (!model) return null;
  const scope = getCodexModelScope(model);
  const scopeMap = asRecord(providerSpecificData.codexScopeRateLimitedUntil);
  const value = scopeMap[scope];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function isCodexScopeUnavailable(
  connection: ProviderConnectionView,
  model: string | null
): boolean {
  const until = getCodexScopeRateLimitedUntil(connection.providerSpecificData, model);
  if (!until) return false;
  return new Date(until).getTime() > Date.now();
}

export function getEarliestCodexScopeRateLimitedUntil(
  connections: ProviderConnectionView[],
  model: string | null
): string | null {
  let earliest: string | null = null;
  let earliestMs = Infinity;

  for (const conn of connections) {
    const until = getCodexScopeRateLimitedUntil(conn.providerSpecificData, model);
    if (!until) continue;
    const ms = new Date(until).getTime();
    if (!Number.isFinite(ms) || ms <= Date.now()) continue;
    if (ms < earliestMs) {
      earliest = until;
      earliestMs = ms;
    }
  }

  return earliest;
}

export function resolveQuotaLimitPolicy(
  provider: string,
  providerSpecificData: JsonRecord
): QuotaLimitPolicy {
  const rawPolicy = asRecord(providerSpecificData.limitPolicy);
  const rawWindows = Array.isArray(rawPolicy.windows) ? rawPolicy.windows : [];
  const windows = rawWindows.map(normalizeWindowName).filter(Boolean) as string[];

  if (provider === "codex") {
    const defaultWindows = applyCodexWindowPolicy(windows, providerSpecificData);
    const enabled = toBooleanOrDefault(rawPolicy.enabled, defaultWindows.length > 0);

    return {
      enabled,
      thresholdPercent: normalizeQuotaThreshold(rawPolicy.thresholdPercent),
      windows: defaultWindows,
    };
  }

  return {
    enabled: toBooleanOrDefault(rawPolicy.enabled, false),
    thresholdPercent: normalizeQuotaThreshold(rawPolicy.thresholdPercent),
    windows,
  };
}

export function evaluateQuotaLimitPolicy(
  provider: string,
  connection: ProviderConnectionView
): { blocked: boolean; reasons: string[]; resetAt: string | null } {
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  if (!policy.enabled || policy.windows.length === 0) {
    return { blocked: false, reasons: [], resetAt: null };
  }

  const reasons: string[] = [];
  const resetCandidates: Array<string | null> = [];

  for (const windowName of policy.windows) {
    const status = getQuotaWindowStatus(connection.id, windowName, policy.thresholdPercent);
    if (!status?.reachedThreshold) continue;
    reasons.push(`${windowName} usage ${Math.round(status.usedPercentage)}%`);
    resetCandidates.push(status.resetAt);
  }

  return {
    blocked: reasons.length > 0,
    reasons,
    resetAt: getEarliestFutureDate(resetCandidates),
  };
}