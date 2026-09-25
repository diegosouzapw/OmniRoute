/**
 * Data shapes and defensive parsers for the per-key details page.
 *
 * Sources (self-usage contract §2/§3):
 *   GET /api/keys/[id]/self-service  -> settings, visibility, availableProviders, status
 *   GET /api/keys/[id]               -> key config (name, scopes, usage-limit fields)
 *   GET /api/usage/token-limits      -> per-key token limits
 *   GET /api/usage/key-quota         -> tpm / rpm / monthly USD quota
 *
 * Every parser accepts `unknown` and degrades to empty values instead of throwing,
 * so a partially deployed backend renders empty states rather than a crash.
 */

import { toNumber, toNumberOrNull } from "@/shared/utils/numeric";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } from "@/shared/constants/selfServiceScopes";
import { readSelfServiceQuota } from "../selfServiceQuota";
import type { QuotaProviderOption, SelfServiceQuota } from "../selfServiceQuota";

type JsonRecord = Record<string, unknown>;

export interface UsageTokens {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  reasoning: number;
  total: number;
}

export interface UsagePeriod {
  periodStartAt: string | null;
  resetAt: string | null;
  costUsd: number;
  requests: number;
  tokens: UsageTokens;
}

export interface StatusLimit {
  id: string;
  source: string;
  metric: string;
  window: string;
  scope: { type: string; value: string | null };
  limit: number;
  used: number;
  remaining: number;
  utilization: number;
  exceeded: boolean;
  periodStartAt: string | null;
  resetAt: string | null;
}

export interface QuotaWindowView {
  name: string;
  usedPercentage: number | null;
  resetAt: string | null;
}

export interface AccountQuotaView {
  provider: string;
  connectionId: string;
  label: string;
  plan: string | null;
  quotas: QuotaWindowView[];
  fetchedAt: string | null;
  stale: boolean;
  /** Set when the quota could not be read (`available: false` on the wire). */
  unavailableReason: string | null;
}

export interface SelfServiceView {
  apiKey: { id: string; name: string };
  generatedAt: string | null;
  settings: SelfServiceQuota;
  visibility: { selfUsage: boolean; accountQuota: boolean };
  availableProviders: QuotaProviderOption[];
  usage: { daily: UsagePeriod | null; weekly: UsagePeriod | null };
  limits: StatusLimit[];
  accountQuotas: AccountQuotaView[];
}

export interface KeyConfig {
  id: string;
  name: string;
  scopes: string[];
  usageLimitEnabled: boolean;
  dailyUsageLimitUsd: number | null;
  weeklyUsageLimitUsd: number | null;
}

export interface TokenLimitRow {
  id: string;
  scopeType: "global" | "provider" | "model";
  scopeValue: string;
  tokenLimit: number;
  resetInterval: "daily" | "weekly" | "monthly";
  resetTime: string;
  enabled: boolean;
  tokensUsed: number;
  nextResetAt: string | null;
}

export interface KeyQuotaView {
  tpmLimit: number | null;
  rpmLimit: number | null;
  monthlyAmountUsd: number | null;
  tpmUsed: number;
  rpmUsed: number;
  monthlyUsedUsd: number;
  tpmExceeded: boolean;
  rpmExceeded: boolean;
  monthlyExceeded: boolean;
}

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asIso(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  return Number.isFinite(Date.parse(value)) ? value : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** A positive number, or `null` for "no limit" (0, negative, blank, absent). */
function positiveOrNull(value: unknown): number | null {
  const parsed = toNumberOrNull(value);
  return parsed !== null && parsed > 0 ? parsed : null;
}

function parseTokens(value: unknown): UsageTokens {
  const record = asRecord(value) ?? {};
  const input = toNumber(record.input);
  const output = toNumber(record.output);
  const cacheRead = toNumber(record.cacheRead);
  const cacheCreation = toNumber(record.cacheCreation);
  const reasoning = toNumber(record.reasoning);
  return {
    input,
    output,
    cacheRead,
    cacheCreation,
    reasoning,
    total: toNumber(record.total, input + output + cacheRead + cacheCreation + reasoning),
  };
}

function parseUsagePeriod(value: unknown): UsagePeriod | null {
  const record = asRecord(value);
  if (!record) return null;
  return {
    periodStartAt: asIso(record.periodStartAt),
    resetAt: asIso(record.resetAt),
    costUsd: toNumber(record.costUsd),
    requests: toNumber(record.requests),
    tokens: parseTokens(record.tokens),
  };
}

function parseLimit(value: unknown, index: number): StatusLimit | null {
  const record = asRecord(value);
  if (!record) return null;
  const limit = toNumber(record.limit);
  const used = toNumber(record.used);
  const scope = asRecord(record.scope) ?? {};
  const utilization = toNumber(record.utilization, limit > 0 ? used / limit : 0);
  return {
    id: asString(record.id) || `limit-${index}`,
    source: asString(record.source, "unknown"),
    metric: asString(record.metric, "tokens"),
    window: asString(record.window, "monthly"),
    scope: {
      type: asString(scope.type, "global"),
      value: typeof scope.value === "string" && scope.value ? scope.value : null,
    },
    limit,
    used,
    remaining: toNumber(record.remaining, Math.max(limit - used, 0)),
    utilization: Math.min(Math.max(utilization, 0), 1),
    exceeded: record.exceeded === true,
    periodStartAt: asIso(record.periodStartAt),
    resetAt: asIso(record.resetAt),
  };
}

function parseQuotaWindows(value: unknown): QuotaWindowView[] {
  const record = asRecord(value);
  if (!record) return [];
  const windows: QuotaWindowView[] = [];
  for (const [name, raw] of Object.entries(record)) {
    const window = asRecord(raw);
    if (!window) continue;
    const used = toNumberOrNull(window.usedPercentage);
    const remaining = toNumberOrNull(window.remainingPercentage);
    windows.push({
      name,
      usedPercentage: used ?? (remaining === null ? null : 100 - remaining),
      resetAt: asIso(window.resetAt),
    });
  }
  return windows;
}

function parseAccountQuota(value: unknown): AccountQuotaView | null {
  const record = asRecord(value);
  if (!record) return null;
  const provider = asString(record.provider, "unknown");
  const plan =
    typeof record.plan === "string" || typeof record.plan === "number" ? String(record.plan) : null;
  return {
    provider,
    connectionId: asString(record.connectionId),
    label: asString(record.label) || provider,
    plan,
    quotas: parseQuotaWindows(record.quotas),
    fetchedAt: asIso(record.fetchedAt),
    stale: record.stale === true,
    unavailableReason: record.available === false ? asString(record.reason, "not_available") : null,
  };
}

function compact<T>(values: Array<T | null>): T[] {
  return values.filter((value): value is T => value !== null);
}

export function parseSelfServiceView(body: unknown): SelfServiceView | null {
  const record = asRecord(body);
  if (!record) return null;
  const status = asRecord(record.status) ?? {};
  const apiKey = asRecord(status.apiKey) ?? {};
  const usage = asRecord(status.usage) ?? {};
  const visibility = asRecord(record.visibility) ?? {};
  return {
    apiKey: { id: asString(apiKey.id), name: asString(apiKey.name) },
    generatedAt: asIso(status.generatedAt),
    settings: readSelfServiceQuota(asRecord(record.settings)),
    visibility: {
      selfUsage: visibility.selfUsage === true,
      accountQuota: visibility.accountQuota === true,
    },
    availableProviders: compact(
      asArray(record.availableProviders).map((entry) => {
        const option = asRecord(entry);
        const provider = asString(option?.provider).trim();
        if (!option || !provider) return null;
        return {
          provider,
          connectionCount: toNumber(option.connectionCount),
          quotaSupported: option.quotaSupported !== false,
        };
      })
    ),
    usage: { daily: parseUsagePeriod(usage.daily), weekly: parseUsagePeriod(usage.weekly) },
    limits: compact(asArray(status.limits).map(parseLimit)),
    accountQuotas: compact(asArray(status.accountQuotas).map(parseAccountQuota)),
  };
}

export function parseKeyConfig(body: unknown): KeyConfig | null {
  const record = asRecord(body);
  if (!record || typeof record.id !== "string") return null;
  return {
    id: record.id,
    name: asString(record.name),
    scopes: asArray(record.scopes).filter((scope): scope is string => typeof scope === "string"),
    usageLimitEnabled: record.usageLimitEnabled === true,
    dailyUsageLimitUsd: positiveOrNull(record.dailyUsageLimitUsd),
    weeklyUsageLimitUsd: positiveOrNull(record.weeklyUsageLimitUsd),
  };
}

const SCOPE_TYPES = new Set(["global", "provider", "model"]);
const RESET_INTERVALS = new Set(["daily", "weekly", "monthly"]);

export function parseTokenLimits(body: unknown): TokenLimitRow[] {
  return compact(
    asArray(asRecord(body)?.limits).map((entry) => {
      const record = asRecord(entry);
      if (!record || typeof record.id !== "string") return null;
      const scopeType = asString(record.scopeType);
      const resetInterval = asString(record.resetInterval);
      return {
        id: record.id,
        scopeType: (SCOPE_TYPES.has(scopeType)
          ? scopeType
          : "global") as TokenLimitRow["scopeType"],
        scopeValue: asString(record.scopeValue),
        tokenLimit: toNumber(record.tokenLimit),
        resetInterval: (RESET_INTERVALS.has(resetInterval)
          ? resetInterval
          : "monthly") as TokenLimitRow["resetInterval"],
        resetTime: asString(record.resetTime, "00:00") || "00:00",
        enabled: record.enabled !== false,
        tokensUsed: toNumber(record.tokensUsed),
        nextResetAt: asIso(record.nextResetAt),
      };
    })
  );
}

export function parseKeyQuota(body: unknown): KeyQuotaView {
  const record = asRecord(body) ?? {};
  const limits = asRecord(record.limits) ?? {};
  const counters = asRecord(record.counters) ?? {};
  return {
    tpmLimit: positiveOrNull(limits.tpmLimit),
    rpmLimit: positiveOrNull(limits.rpmLimit),
    monthlyAmountUsd: positiveOrNull(limits.monthlyAmountUsd),
    tpmUsed: toNumber(counters.tpmUsed),
    rpmUsed: toNumber(counters.rpmUsed),
    monthlyUsedUsd: toNumber(counters.monthlyAmountUsd),
    tpmExceeded: record.tpmExceeded === true,
    rpmExceeded: record.rpmExceeded === true,
    monthlyExceeded: record.monthlyExceeded === true,
  };
}

/** Blank input = unlimited (`null`); otherwise a non-negative number, or `undefined` if invalid. */
export function parseOptionalLimitInput(value: string): number | null | undefined {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return undefined;
  return parsed > 0 ? parsed : null;
}

/** Add/remove only the two self-service visibility scopes, keeping every other scope. */
export function withVisibilityScopes(
  scopes: readonly string[],
  next: { selfUsage: boolean; accountQuota: boolean }
): string[] {
  const result = new Set(scopes);
  if (next.selfUsage) result.add(SELF_USAGE_SCOPE);
  else result.delete(SELF_USAGE_SCOPE);
  // Account quota visibility is only reachable through the status endpoint.
  if (next.selfUsage && next.accountQuota) result.add(SELF_ACCOUNT_QUOTA_SCOPE);
  else result.delete(SELF_ACCOUNT_QUOTA_SCOPE);
  return [...result];
}

const MAX_ERROR_MESSAGE_LENGTH = 200;

/**
 * Human-readable message from an API error body. Anything that is not a short plain
 * sentence (JSON, markup, stack-like text) is replaced with the translated fallback.
 */
export function safeApiErrorMessage(body: unknown, fallback: string): string {
  const message = extractApiErrorMessage(body, fallback);
  if (message === fallback) return fallback;
  if (message.length > MAX_ERROR_MESSAGE_LENGTH || /[{}<>[\]]|\n|\bat\s+\S+\s+\(/.test(message)) {
    return fallback;
  }
  return message;
}
