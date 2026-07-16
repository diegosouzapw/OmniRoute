import { randomUUID, createHash } from "crypto";
import {
  getProviderConnections,
  getProviderNodes,
  validateApiKey,
  updateProviderConnection,
  clearConnectionErrorIfUnchanged,
  getSettings,
  getCachedSettings,
} from "@/lib/localDb";
import {
  DEFAULT_QUOTA_THRESHOLD_PERCENT,
  getQuotaCache,
  getQuotaWindowStatus,
  isQuotaExhaustedForRequest,
} from "@/domain/quotaCache";
import { getQuotaScopeLabelForProvider } from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import {
  isAccountUnavailable,
  getUnavailableUntil,
  getEarliestRateLimitedUntil,
  cooldownUntilMs,
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
import { COOLDOWN_MS, RateLimitReason } from "@omniroute/open-sse/config/constants.ts";
import {
  preflightQuota,
  isQuotaPreflightEnabled,
} from "@omniroute/open-sse/services/quotaPreflight.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { resolveModelLockoutSettings } from "@/lib/resilience/modelLockoutSettings";
import { syncHealthFromDB, type KeyHealth } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "@omniroute/open-sse/services/errorClassifier.ts";

import {
  getCodexModelScope,
  getCodexQuotaWindowFilterForModel,
  toCodexBaseQuotaWindowName,
  toCodexScopedQuotaWindowName,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import {
  getProviderById,
  getProviderAlias,
  resolveProviderId,
  NOAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import {
  applySessionAffinityPin,
  formatSessionKeyForLog,
  resolveSessionAffinityTtlMs,
  selectSessionAffinityConnection,
} from "./sessionAffinityPin";
import { isNoAuthProviderBlockedBySettings } from "./noAuthProviderSettings";
import { resolveAccountProxiesFromRegistry } from "./noAuthProxyResolution";
import * as log from "../utils/logger";
import { fisherYatesShuffle, getNextFromDeckSync } from "@/shared/utils/shuffleDeck";

type JsonRecord = Record<string, unknown>;

interface ProviderConnectionView {
  id: string;
  provider: string;
  email: string | null;
  isActive: boolean;
  rateLimitedUntil: string | null;
  testStatus: string | null;
  apiKey: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: string | null;
  expiresAt: string | null;
  projectId: string | null;
  defaultModel: string | null;
  providerSpecificData: JsonRecord;
  lastUsedAt: string | null;
  consecutiveUseCount: number;
  priority: number;
  lastError: string | null;
  lastErrorType: string | null;
  lastErrorSource: string | null;
  errorCode: string | number | null;
  backoffLevel: number;
  maxConcurrent: number | null;
  // Per-window quota cutoff overrides — null means "no overrides, inherit
  // resilience-settings defaults." Read by getProviderCredentialsWithQuotaPreflight
  // to decide whether to invoke the upstream usage fetcher.
  quotaWindowThresholds: Record<string, number> | null;
}

interface RecoverableConnectionState {
  connectionId: string;
  testStatus?: string | null;
  lastError?: string | null;
  rateLimitedUntil?: string | null;
  errorCode?: string | number | null;
  lastErrorType?: string | null;
  lastErrorSource?: string | null;
}

interface CredentialSelectionOptions {
  allowSuppressedConnections?: boolean;
  allowRateLimitedConnections?: boolean;
  bypassQuotaPolicy?: boolean;
  forcedConnectionId?: string | null;
  excludeConnectionIds?: string[] | null;
  sessionKey?: string | null;
  sessionAffinityTtlMs?: number | null;
}

interface CooldownInspectionState {
  connection: ProviderConnectionView;
  connectionCooldownMs: number | null;
  codexScopeCooldownMs: number | null;
  retryableModelCooldownMs: number | null;
}

const MIN_QUOTA_THRESHOLD_PERCENT = 1;
const MAX_QUOTA_THRESHOLD_PERCENT = 100;
const NON_RETRYABLE_MODEL_LOCKOUT_REASONS = new Set(["not_found", "not_found_local"]);
// Antigravity Gemini family 429 with no parseable upstream hint: seed the backoff at
// this base. Real upstream Retry-After hints still win — they flow through
// `exactCooldownMs` (usedUpstreamRetryHint), not this base. (#5222)
const ANTIGRAVITY_FAMILY_INFERRED_BASE_COOLDOWN_MS = 30_000;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = toNumber(value, Number.NaN);
  return Number.isFinite(parsed) ? parsed : null;
}

function toProviderConnection(value: unknown): ProviderConnectionView {
  const row = asRecord(value);
  // Only accept the per-window override map when it's a plain object —
  // anything else collapses to null so the preflight gate treats it as "no
  // overrides set."
  const rawThresholds = row.quotaWindowThresholds;
  const quotaWindowThresholds: Record<string, number> | null =
    rawThresholds && typeof rawThresholds === "object" && !Array.isArray(rawThresholds)
      ? (rawThresholds as Record<string, number>)
      : null;
  return {
    id: toStringOrNull(row.id) || "",
    provider: toStringOrNull(row.provider) || "",
    email: toStringOrNull(row.email),
    isActive: row.isActive === true,
    rateLimitedUntil: toStringOrNull(row.rateLimitedUntil),
    testStatus: toStringOrNull(row.testStatus),
    apiKey: toStringOrNull(row.apiKey),
    accessToken: toStringOrNull(row.accessToken),
    refreshToken: toStringOrNull(row.refreshToken),
    tokenExpiresAt: toStringOrNull(row.tokenExpiresAt),
    expiresAt: toStringOrNull(row.expiresAt),
    projectId: toStringOrNull(row.projectId),
    defaultModel: toStringOrNull(row.defaultModel),
    providerSpecificData: asRecord(row.providerSpecificData),
    lastUsedAt: toStringOrNull(row.lastUsedAt),
    consecutiveUseCount: toNumber(row.consecutiveUseCount, 0),
    priority: toNumber(row.priority, 999),
    lastError: toStringOrNull(row.lastError),
    lastErrorType: toStringOrNull(row.lastErrorType),
    lastErrorSource: toStringOrNull(row.lastErrorSource),
    errorCode:
      typeof row.errorCode === "string" || typeof row.errorCode === "number" ? row.errorCode : null,
    backoffLevel: toNumber(row.backoffLevel, 0),
    maxConcurrent: toNullableNumber(row.maxConcurrent),
    quotaWindowThresholds,
  };
}

function toBooleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function readHeaderValue(
  headers:
    | Headers
    | { get?: (name: string) => string | null }
    | Record<string, string | string[] | undefined>
    | null
    | undefined,
  name: string
): string | null {
  if (!headers) return null;

  if (typeof (headers as Headers).get === "function") {
    const value = (headers as Headers).get(name) || (headers as Headers).get(name.toLowerCase());
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
  }

  const recordHeaders = headers as Record<string, string | string[] | undefined>;
  const value =
    recordHeaders[name] || recordHeaders[name.toLowerCase()] || recordHeaders[name.toUpperCase()];

  if (Array.isArray(value)) {
    return typeof value[0] === "string" && value[0].trim().length > 0 ? value[0].trim() : null;
  }

  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeSessionKey(value: unknown, prefix: string): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const trimmed = value.trim();
  if (trimmed.length <= 180 && /^[A-Za-z0-9._:-]+$/.test(trimmed)) {
    return `${prefix}:${trimmed}`;
  }
  return `${prefix}:sha256:${createHash("sha256").update(trimmed).digest("hex")}`;
}

function extractTextForSessionHash(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const parts = value
      .map((item) => {
        if (typeof item === "string") return item;
        const record = asRecord(item);
        if (typeof record.text === "string") return record.text;
        if (typeof record.content === "string") return record.content;
        return null;
      })
      .filter(Boolean) as string[];
    return parts.length > 0 ? parts.join("\n") : JSON.stringify(value);
  }
  if (value && typeof value === "object") return JSON.stringify(value);
  return null;
}

function getFirstInputText(body: unknown): string | null {
  const record = asRecord(body);
  if (record.input !== undefined) {
    if (typeof record.input === "string") return record.input;
    if (Array.isArray(record.input)) {
      for (const item of record.input) {
        const itemRecord = asRecord(item);
        const text = extractTextForSessionHash(itemRecord.content ?? item);
        if (text && text.trim().length > 0) return text;
      }
    }
    const text = extractTextForSessionHash(record.input);
    if (text && text.trim().length > 0) return text;
  }

  if (Array.isArray(record.messages)) {
    const userMessage = record.messages.find((message) => asRecord(message).role === "user");
    const firstMessage = userMessage ?? record.messages[0];
    const text = extractTextForSessionHash(asRecord(firstMessage).content ?? firstMessage);
    if (text && text.trim().length > 0) return text;
  }

  return null;
}

export function extractSessionAffinityKey(
  body: unknown,
  headers?: Headers | { get?: (name: string) => string | null } | null
): string | null {
  const headerKey = normalizeSessionKey(
    readHeaderValue(headers, "x-codex-session-id") ??
      readHeaderValue(headers, "x-session-id") ??
      readHeaderValue(headers, "x-omniroute-session"),
    "header"
  );
  if (headerKey) return headerKey;

  const record = asRecord(body);
  const metadata = asRecord(record.metadata);
  const explicitKey =
    normalizeSessionKey(metadata.session_id, "metadata") ??
    normalizeSessionKey(metadata.sessionId, "metadata") ??
    normalizeSessionKey(record.conversation_id, "conversation") ??
    normalizeSessionKey(record.session_id, "session") ??
    normalizeSessionKey(record.prompt_cache_key, "prompt-cache");
  if (explicitKey) return explicitKey;

  const inputText = getFirstInputText(body);
  if (!inputText || inputText.trim().length === 0) return null;
  return `input:sha256:${createHash("sha256").update(inputText.slice(0, 4096)).digest("hex")}`;
}

function getCodexLimitPolicy(providerSpecificData: JsonRecord): {
  use5h: boolean;
  useWeekly: boolean;
} {
  const policy = asRecord(providerSpecificData.codexLimitPolicy);
  return {
    use5h: toBooleanOrDefault(policy.use5h, true),
    useWeekly: toBooleanOrDefault(policy.useWeekly, true),
  };
}

interface QuotaLimitPolicy {
  enabled: boolean;
  thresholdPercent: number;
  windows: string[];
}

interface QuotaCacheView {
  quotas?: Record<
    string,
    {
      remainingPercentage?: number;
      resetAt?: string | null;
    }
  >;
}

function normalizeQuotaThreshold(
  value: unknown,
  fallback = DEFAULT_QUOTA_THRESHOLD_PERCENT
): number {
  const parsed = toNumber(value, fallback);
  return Math.min(MAX_QUOTA_THRESHOLD_PERCENT, Math.max(MIN_QUOTA_THRESHOLD_PERCENT, parsed));
}

function normalizeWindowName(windowName: unknown): string | null {
  if (typeof windowName !== "string") return null;
  const normalized = windowName.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

function uniqueWindows(windows: string[]): string[] {
  return [...new Set(windows)];
}

function normalizeCodexWindowName(windowName: unknown): string | null {
  if (typeof windowName !== "string") return null;
  const normalized = windowName.trim().toLowerCase();
  if (normalized === "session (5h)" || normalized === "5h" || normalized === "five_hour") {
    return "session";
  }
  if (normalized === "weekly (7d)" || normalized === "7d" || normalized === "seven_day") {
    return "weekly";
  }
  return toCodexBaseQuotaWindowName(normalized);
}

function applyCodexWindowPolicy(rawWindows: string[], providerSpecificData: JsonRecord): string[] {
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

function getCodexScopeRateLimitedUntil(
  providerSpecificData: JsonRecord,
  model: string | null
): string | null {
  if (!model) return null;
  const scope = getCodexModelScope(model);
  const scopeMap = asRecord(providerSpecificData.codexScopeRateLimitedUntil);
  const value = scopeMap[scope];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function isCodexScopeUnavailable(
  connection: ProviderConnectionView,
  model: string | null
): boolean {
  const until = getCodexScopeRateLimitedUntil(connection.providerSpecificData, model);
  if (!until) return false;
  return new Date(until).getTime() > Date.now();
}

function getEarliestCodexScopeRateLimitedUntil(
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

function normalizeStatus(value: string | null): string {
  return (value || "").trim().toLowerCase();
}

function isTerminalConnectionStatus(connection: ProviderConnectionView): boolean {
  const status = normalizeStatus(connection.testStatus);
  return status === "credits_exhausted" || status === "banned" || status === "expired";
}

function resolveTerminalConnectionStatus(
  status: number,
  result: { permanent?: boolean; creditsExhausted?: boolean },
  providerErrorType: string | null = null
): string | null {
  if (result.creditsExhausted || status === 402) return "credits_exhausted";
  if (
    providerErrorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR ||
    providerErrorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN
  ) {
    return null;
  }
  if (result.permanent || providerErrorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
    return "banned";
  }
  if (
    providerErrorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED ||
    providerErrorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED ||
    status === 401
  ) {
    return "expired";
  }
  return null;
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
  connection: ProviderConnectionView,
  requestedModel: string | null = null
): { blocked: boolean; reasons: string[]; resetAt: string | null } {
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  if (!policy.enabled || policy.windows.length === 0) {
    return { blocked: false, reasons: [], resetAt: null };
  }

  const reasons: string[] = [];
  const resetCandidates: Array<string | null> = [];

  for (const windowName of policy.windows) {
    const effectiveWindowName =
      provider === "codex" ? toCodexScopedQuotaWindowName(windowName, requestedModel) : windowName;
    const status = getQuotaWindowStatus(
      connection.id,
      effectiveWindowName,
      policy.thresholdPercent
    );
    if (!status?.reachedThreshold) continue;
    reasons.push(`${effectiveWindowName} usage ${Math.round(status.usedPercentage)}%`);
    resetCandidates.push(status.resetAt);
  }

  return {
    blocked: reasons.length > 0,
    reasons,
    resetAt: getEarliestFutureDate(resetCandidates),
  };
}

function parseFutureDateMs(value: string | null): number | null {
  if (!value) return null;
  // Tolerate numeric-epoch strings (e.g. "1781696905131.0") as well as ISO
  // strings — the rate_limited_until TEXT column can hold either (#3954).
  const ms = cooldownUntilMs(value);
  if (!Number.isFinite(ms) || ms <= Date.now()) return null;
  return ms;
}

function getEarliestFutureDate(candidates: Array<string | null>): string | null {
  return (
    candidates
      .map((candidate) => ({
        raw: candidate,
        ms: parseFutureDateMs(candidate),
      }))
      .filter((entry) => entry.ms !== null)
      .sort((a, b) => (a.ms as number) - (b.ms as number))[0]?.raw || null
  );
}

function isRetryableModelLockoutReason(reason: unknown): boolean {
  return typeof reason === "string" && reason.length > 0
    ? !NON_RETRYABLE_MODEL_LOCKOUT_REASONS.has(reason)
    : false;
}

function pushClampedPercentage(percentages: number[], value: number): void {
  if (Number.isFinite(value)) {
    percentages.push(Math.max(0, Math.min(100, value)));
  }
}

function isResetAtInPast(resetAt: string | null): boolean {
  if (!resetAt) return false;
  const resetMs = new Date(resetAt).getTime();
  return Number.isFinite(resetMs) && resetMs <= Date.now();
}

function collectPolicyQuotaHeadroomPercentages(
  provider: string,
  connection: ProviderConnectionView,
  policy: QuotaLimitPolicy,
  requestedModel: string | null
): number[] {
  const percentages: number[] = [];
  const seenWindows = new Set<string>();

  for (const windowName of policy.windows) {
    const scopedWindow =
      provider === "codex" ? toCodexScopedQuotaWindowName(windowName, requestedModel) : windowName;
    const normalizedWindow = normalizeWindowName(scopedWindow);
    if (!normalizedWindow || seenWindows.has(normalizedWindow)) continue;
    seenWindows.add(normalizedWindow);

    const status = getQuotaWindowStatus(connection.id, normalizedWindow, policy.thresholdPercent);
    if (status) pushClampedPercentage(percentages, status.remainingPercentage);
  }

  return percentages;
}

function collectCachedQuotaHeadroomPercentages(
  provider: string,
  connection: ProviderConnectionView,
  requestedModel: string | null
): number[] {
  const quotaEntry = getQuotaCache(connection.id) as QuotaCacheView | null;
  const rawQuotas = quotaEntry?.quotas || {};
  const codexWindowFilter =
    provider === "codex" ? getCodexQuotaWindowFilterForModel(requestedModel) : undefined;
  const percentages: number[] = [];

  for (const [quotaName, quota] of Object.entries(rawQuotas)) {
    if (codexWindowFilter && !codexWindowFilter(quotaName)) continue;
    if (!quota || isResetAtInPast(toStringOrNull(quota.resetAt))) continue;
    pushClampedPercentage(percentages, toNumber(quota.remainingPercentage, Number.NaN));
  }

  return percentages;
}

function getConnectionQuotaHeadroomPercent(
  provider: string,
  connection: ProviderConnectionView,
  requestedModel: string | null = null
): number | null {
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  const policyPercentages = collectPolicyQuotaHeadroomPercentages(
    provider,
    connection,
    policy,
    requestedModel
  );
  const percentages =
    policyPercentages.length > 0
      ? policyPercentages
      : collectCachedQuotaHeadroomPercentages(provider, connection, requestedModel);

  return percentages.length > 0 ? Math.min(...percentages) : null;
}

function getConnectionErrorPenalty(connection: ProviderConnectionView): number {
  const errorType = normalizeStatus(connection.lastErrorType);
  const errorSource = normalizeStatus(connection.lastErrorSource);
  const numericErrorCode = toNumber(connection.errorCode, 0);

  let penalty = 0;
  if (connection.lastError) penalty += 6;

  if (
    errorType === "rate_limited" ||
    errorType === "quota_exhausted" ||
    errorType === "quota" ||
    numericErrorCode === 429
  ) {
    penalty += 24;
  } else if (numericErrorCode === 401 || numericErrorCode === 403 || errorSource === "oauth") {
    penalty += 18;
  } else if (numericErrorCode >= 500) {
    penalty += 10;
  }

  return penalty;
}

function getConnectionRecencyPenalty(connection: ProviderConnectionView): number {
  if (!connection.lastUsedAt) return 0;
  const ageMs = Date.now() - new Date(connection.lastUsedAt).getTime();
  if (!Number.isFinite(ageMs)) return 0;
  if (ageMs < 15_000) return 3;
  if (ageMs < 60_000) return 2;
  if (ageMs < 5 * 60_000) return 1;
  return 0;
}

function getP2CConnectionScore(
  provider: string,
  connection: ProviderConnectionView,
  requestedModel: string | null = null
): { score: number; quotaHeadroomPercent: number | null } {
  const quotaBlocked = evaluateQuotaLimitPolicy(provider, connection, requestedModel).blocked;
  const quotaExhausted = isQuotaExhaustedForRequest(connection.id, provider, requestedModel);
  const quotaHeadroomPercent = getConnectionQuotaHeadroomPercent(
    provider,
    connection,
    requestedModel
  );

  let quotaPenalty = 0;
  if (quotaHeadroomPercent !== null) {
    quotaPenalty += Math.round((100 - quotaHeadroomPercent) / 8);
    if (quotaHeadroomPercent <= 10) quotaPenalty += 10;
    else if (quotaHeadroomPercent <= 25) quotaPenalty += 4;
  } else if (!quotaBlocked && !quotaExhausted) {
    quotaPenalty += 4;
  }

  const score =
    (quotaExhausted ? 200 : 0) +
    (quotaBlocked ? 80 : 0) +
    getConnectionErrorPenalty(connection) +
    Math.min(40, (connection.backoffLevel || 0) * 8) +
    quotaPenalty +
    Math.min(12, (connection.consecutiveUseCount || 0) * 2) +
    getConnectionRecencyPenalty(connection) +
    Math.min(6, Math.max(0, connection.priority || 0) - 1);

  return { score, quotaHeadroomPercent };
}

function compareP2CConnections(
  provider: string,
  a: ProviderConnectionView,
  b: ProviderConnectionView,
  requestedModel: string | null = null
): number {
  const aScore = getP2CConnectionScore(provider, a, requestedModel);
  const bScore = getP2CConnectionScore(provider, b, requestedModel);
  if (aScore.score !== bScore.score) {
    return aScore.score - bScore.score;
  }

  const aHeadroom = aScore.quotaHeadroomPercent ?? -1;
  const bHeadroom = bScore.quotaHeadroomPercent ?? -1;
  if (aHeadroom !== bHeadroom) {
    return bHeadroom - aHeadroom;
  }

  if ((a.priority || 999) !== (b.priority || 999)) {
    return (a.priority || 999) - (b.priority || 999);
  }

  return a.id.localeCompare(b.id);
}

/**
 * Sentinel connection id used for the synthetic credentials of no-auth /
 * keyless providers. It is NOT a real DB row, so it
 * cannot carry cooldown state — the account-fallback loop must be able to
 * exclude it (#3061), otherwise it gets re-selected forever.
 */
const SYNTHETIC_NOAUTH_CONNECTION_ID = "noauth";

type AnonymousFallbackProviderDefinition = {
  anonymousFallback?: boolean;
  noAuth?: boolean;
};

function buildSyntheticNoAuthCredentials(providerSpecificData: JsonRecord = {}): {
  apiKey: null;
  accessToken: null;
  refreshToken: null;
  expiresAt: null;
  projectId: null;
  defaultModel: null;
  copilotToken: null;
  providerSpecificData: JsonRecord;
  connectionId: typeof SYNTHETIC_NOAUTH_CONNECTION_ID;
  testStatus: "active";
  lastError: null;
  lastErrorType: null;
  lastErrorSource: null;
  errorCode: null;
  rateLimitedUntil: null;
  maxConcurrent: null;
  allRateLimited?: never;
  allExpired?: never;
  retryAfter?: never;
  retryAfterHuman?: never;
} {
  return {
    apiKey: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    projectId: null,
    defaultModel: null,
    copilotToken: null,
    providerSpecificData,
    connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
    testStatus: "active",
    lastError: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    rateLimitedUntil: null,
    maxConcurrent: null,
  };
}

/**
 * #4954 / #5217 (Gap 1) — no-auth providers persist a connection row whose
 * `providerSpecificData` carries `fingerprints` + `accountProxies`. Hydrate those
 * and resolve by-id Proxy Pool references to live records (./noAuthProxyResolution)
 * so the executor gets a resolved inline `proxy`. Best-effort: failures → empty.
 */
async function loadNoAuthProviderSpecificData(providerId: string): Promise<JsonRecord> {
  try {
    const connectionsRaw = await getProviderConnections({ provider: providerId });
    const connections = (Array.isArray(connectionsRaw) ? connectionsRaw : []).map(
      toProviderConnection
    );
    const hydrated: JsonRecord = {};
    for (const conn of connections) {
      const psd = conn.providerSpecificData;
      if (!psd || typeof psd !== "object") continue;
      if (Array.isArray(psd.fingerprints) && !Array.isArray(hydrated.fingerprints)) {
        hydrated.fingerprints = psd.fingerprints;
      }
      if (Array.isArray(psd.accountProxies) && !Array.isArray(hydrated.accountProxies)) {
        hydrated.accountProxies = psd.accountProxies;
      }
    }
    if (Array.isArray(hydrated.accountProxies)) {
      hydrated.accountProxies = await resolveAccountProxiesFromRegistry(hydrated.accountProxies);
    }
    return hydrated;
  } catch {
    return {};
  }
}

function providerCanUseSyntheticNoAuthFallback(providerId: string): boolean {
  const providerDef = getProviderById(providerId) as
    AnonymousFallbackProviderDefinition | undefined;
  const noAuthProviderDef = (
    NOAUTH_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>
  )[providerId];
  const webCookieProviderDef = (
    WEB_COOKIE_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>
  )[providerId];
  return (
    providerDef?.anonymousFallback === true ||
    noAuthProviderDef?.noAuth === true ||
    webCookieProviderDef?.noAuth === true
  );
}

async function maybeSyntheticNoAuthFallback(
  providerId: string,
  excludedConnectionIds: Set<string>
) {
  if (!providerCanUseSyntheticNoAuthFallback(providerId)) return null;
  if (excludedConnectionIds.has(SYNTHETIC_NOAUTH_CONNECTION_ID)) return null;
  // #4954: hydrate per-account proxy/rotation config off the connection row so
  // no-auth executors (opencode, mimocode) actually honor configured proxies.
  const providerSpecificData = await loadNoAuthProviderSpecificData(providerId);
  return buildSyntheticNoAuthCredentials(providerSpecificData);
}

function normalizeExcludedConnectionIds(
  excludeConnectionId: string | null,
  extraExcludedConnectionIds: string[] | null | undefined
): Set<string> {
  const normalized = new Set<string>();

  if (typeof excludeConnectionId === "string" && excludeConnectionId.trim().length > 0) {
    normalized.add(excludeConnectionId.trim());
  }

  if (Array.isArray(extraExcludedConnectionIds)) {
    for (const connectionId of extraExcludedConnectionIds) {
      if (typeof connectionId === "string" && connectionId.trim().length > 0) {
        normalized.add(connectionId.trim());
      }
    }
  }

  return normalized;
}

function formatConnectionPrefixesForLog(ids: Iterable<string>, max = 6): string {
  const prefixes = Array.from(ids)
    .filter((id) => typeof id === "string" && id.length > 0)
    .slice(0, max)
    .map((id) => `${id.slice(0, 8)}...`);
  return prefixes.length > 0 ? prefixes.join(",") : "none";
}

function buildQuotaPreflightRateLimitedResult(
  provider: string,
  blockedByPreflight: Array<{
    id: string;
    quotaPercent?: number;
    resetAt?: string | null;
  }>
) {
  const retryAfter =
    getEarliestFutureDate(blockedByPreflight.map((entry) => entry.resetAt ?? null)) ||
    new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const blockedSummary = blockedByPreflight
    .map((entry) => {
      const percent = Number.isFinite(entry.quotaPercent)
        ? `${Math.round((entry.quotaPercent as number) * 100)}%`
        : "quota exhausted";
      return `${entry.id.slice(0, 8)}(${percent})`;
    })
    .join("; ");

  log.info("AUTH", `${provider} | quota preflight filtered account(s): ${blockedSummary}`);

  return {
    allRateLimited: true,
    retryAfter,
    retryAfterHuman: formatRetryAfter(retryAfter),
    lastError: `All ${provider} accounts blocked by quota preflight`,
    lastErrorCode: 429,
  };
}

function quotaPreflightUnavailableUntil(resetAt?: string | null): string {
  const resetMs = parseFutureDateMs(resetAt ?? null);
  return new Date(resetMs ?? Date.now() + 5 * 60 * 1000).toISOString();
}

async function markQuotaPreflightAccountUnavailable(
  provider: string,
  connectionId: string,
  preflight: { quotaPercent?: number; resetAt?: string | null },
  requestedModel: string | null
): Promise<string> {
  const unavailableUntil = quotaPreflightUnavailableUntil(preflight.resetAt ?? null);
  const percentLabel = Number.isFinite(preflight.quotaPercent)
    ? `${Math.round((preflight.quotaPercent as number) * 100)}%`
    : "exhausted";
  const modelLabel = requestedModel ? ` for ${requestedModel}` : "";

  await updateProviderConnection(connectionId, {
    rateLimitedUntil: unavailableUntil,
    testStatus: "unavailable",
    lastError: `Quota preflight blocked${modelLabel}: ${percentLabel}`,
    lastErrorType: "quota_exhausted",
    lastErrorSource: "quota_preflight",
    errorCode: 429,
    lastErrorAt: new Date().toISOString(),
  });

  return unavailableUntil;
}

// Provider-scoped mutexes prevent race conditions during account selection without
// serializing unrelated providers behind a single global lock.
const selectionMutexes = new Map<string, Promise<void>>();

function getSelectionMutexKey(provider: string, options: CredentialSelectionOptions): string {
  return [
    resolveProviderId(provider) || provider,
    options.forcedConnectionId ? `forced:${options.forcedConnectionId}` : "pool",
  ].join(":");
}

function createSelectionLock(key: string) {
  const currentMutex = selectionMutexes.get(key) ?? Promise.resolve();
  let resolveMutex: (() => void) | undefined;
  const nextMutex = new Promise<void>((resolve) => {
    resolveMutex = resolve;
  });
  selectionMutexes.set(key, nextMutex);

  return {
    wait: currentMutex,
    release: () => {
      resolveMutex?.();
      if (selectionMutexes.get(key) === nextMutex) {
        selectionMutexes.delete(key);
      }
    },
  };
}

// ─── Anti-Thundering Herd: per-connection mutex for markAccountUnavailable ───
// Prevents multiple concurrent requests from marking the same connection
// unavailable in parallel, which was the root cause of cascading 502 lockouts.
const markMutexes = new Map<string, Promise<void>>();

// Strict-Random shuffle deck moved to src/shared/utils/shuffleDeck.ts
// auth.ts uses getNextFromDeckSync inside the provider-scoped selection mutex.
// Re-export for backwards compat with existing test imports.
export { fisherYatesShuffle, getNextFromDeckSync as getNextFromDeck };

/**
 * Resolve provider aliases (e.g., nvidia -> nvidia_nim) for DB lookup
 */
async function getProviderSearchPool(provider: string): Promise<string[]> {
  const canonicalProvider = resolveProviderId(provider);
  const canonicalAlias = getProviderAlias(canonicalProvider);

  if (provider === "nvidia") {
    return ["nvidia", "nvidia_nim"];
  }
  if (provider === "nvidia_nim") {
    return ["nvidia_nim", "nvidia"];
  }

  const searchPool = new Set([provider, canonicalProvider, canonicalAlias].filter(Boolean));

  // Built-in providers already resolve through static ids/aliases. Only
  // compatible/custom providers need provider_nodes expansion back to the
  // generated internal connection ids. (#3058)
  if (getProviderById(canonicalProvider)) {
    return Array.from(searchPool);
  }

  // Custom provider nodes are referenced by user-facing prefixes in combos
  // (for example "78code/gpt-5.4"), but live credentials are stored under
  // internal provider ids like openai-compatible-responses-<uuid>.
  try {
    const providerNodes = await getProviderNodes();
    for (const node of Array.isArray(providerNodes) ? providerNodes : []) {
      const nodeRecord = asRecord(node);
      const nodePrefix = typeof nodeRecord.prefix === "string" ? nodeRecord.prefix.trim() : "";
      const nodeId = typeof nodeRecord.id === "string" ? nodeRecord.id.trim() : "";
      if (!nodePrefix || !nodeId) continue;
      if (
        nodePrefix === provider ||
        nodePrefix === canonicalProvider ||
        nodePrefix === canonicalAlias
      ) {
        searchPool.add(nodeId);
      }
    }
  } catch {
    // Best-effort alias expansion only.
  }

  return Array.from(searchPool);
}

/**
 * Get provider credentials from localDb
 * Filters out unavailable accounts and returns the selected account based on strategy
 * @param {string} provider - Provider name
 * @param {string|null} excludeConnectionId - Connection ID to exclude (for retry with next account)
 */
export async function getProviderCredentials(
  provider: string,
  excludeConnectionId: string | null = null,
  allowedConnections: string[] | null = null,
  requestedModel: string | null = null,
  options: CredentialSelectionOptions = {}
) {
  const selectionLock = createSelectionLock(getSelectionMutexKey(provider, options));

  try {
    await selectionLock.wait;

    // No-auth providers (e.g. opencode) need no DB connection — return synthetic credentials
    // so the executor receives a valid credentials object without auth headers being added.
    const resolvedId = resolveProviderId(provider);
    const providerMaps: Record<string, { noAuth?: boolean } | undefined>[] = [
      NOAUTH_PROVIDERS as Record<string, { noAuth?: boolean } | undefined>,
      WEB_COOKIE_PROVIDERS as Record<string, { noAuth?: boolean } | undefined>,
    ];
    if (providerMaps.some((map) => map[resolvedId]?.noAuth)) {
      if (await isNoAuthProviderBlockedBySettings(resolvedId)) return null;
      // #3061: there is only one synthetic "noauth" connection for a no-auth
      // provider. If the caller already tried and excluded it (account-fallback
      // after a persistent upstream error), do NOT hand it back — that would let
      // the chat fallback loop re-select "noauth" forever (no real DB row → no
      // cooldown to brake it), writing logs every iteration until the disk fills.
      // Returning null here lets the handler stop after a single attempt.
      const excludedForNoAuth = normalizeExcludedConnectionIds(
        excludeConnectionId,
        options.excludeConnectionIds
      );
      return await maybeSyntheticNoAuthFallback(resolvedId, excludedForNoAuth);
    }

    const allowSuppressedConnections = options.allowSuppressedConnections === true;
    const allowRateLimitedConnections =
      allowSuppressedConnections || options.allowRateLimitedConnections === true;
    const bypassQuotaPolicy = options.bypassQuotaPolicy === true;
    let forcedConnectionId =
      typeof options.forcedConnectionId === "string" && options.forcedConnectionId.trim().length > 0
        ? options.forcedConnectionId.trim()
        : null;
    const excludedConnectionIds = normalizeExcludedConnectionIds(
      excludeConnectionId,
      options.excludeConnectionIds
    );

    // Fetched early so the session-affinity-pin override (#5903) can consult
    // the TTL before forcedConnectionId narrows the connection pool.
    const settings = await getSettings();
    const sessionAffinityTtlMs = resolveSessionAffinityTtlMs(provider, options, settings);

    // Fix #922: Check for aliases (nvidia/nvidia_nim) to ensure credentials are found
    const providersToSearch = await getProviderSearchPool(provider);
    const connectionResults = await Promise.all(
      providersToSearch.map((p) => getProviderConnections({ provider: p, isActive: true }))
    );
    const connectionsRaw = connectionResults.filter(Array.isArray).flat();

    let connections = (Array.isArray(connectionsRaw) ? connectionsRaw : [])
      .map(toProviderConnection)
      .filter((conn) => conn.id.length > 0);
    // allowedConnections: restrict to specific connection IDs (from API key policy, #363)
    if (allowedConnections && allowedConnections.length > 0) {
      connections = connections.filter((conn) => allowedConnections.includes(conn.id));
    }

    // #5903: an active session-affinity pin outranks a per-request reset-aware
    // forcedConnectionId (see sessionAffinityPin leaf for the full rationale).
    forcedConnectionId =
      applySessionAffinityPin({
        forcedConnectionId,
        options,
        sessionAffinityTtlMs,
        connections,
        provider,
        requestedModel,
        excludedConnectionIds,
        isTerminalConnectionStatus,
        isCodexScopeUnavailable,
        isQuotaPolicyBlocked: (c) =>
          evaluateQuotaLimitPolicy(provider, c as ProviderConnectionView, requestedModel).blocked,
      }) ?? forcedConnectionId;

    if (forcedConnectionId) {
      connections = connections.filter((conn) => conn.id === forcedConnectionId);
    }
    const activeConnectionsCount = connections.length;
    const rawConnectionsCount = connectionsRaw.length;
    const blockedByForcedConnection = forcedConnectionId
      ? rawConnectionsCount - connections.length
      : 0;
    const blockedByAllowedConnections =
      allowedConnections && allowedConnections.length > 0
        ? Math.max(0, rawConnectionsCount - connections.length - blockedByForcedConnection)
        : 0;
    const forcedIdForLog = forcedConnectionId ? `${forcedConnectionId.slice(0, 8)}...` : "none";

    log.debug(
      "AUTH",
      `${provider} | active=${activeConnectionsCount}, excluded=${excludedConnectionIds.size} (${formatConnectionPrefixesForLog(excludedConnectionIds)}), forcedId=${forcedIdForLog}, blocked_forced=${blockedByForcedConnection}, blocked_allowed=${blockedByAllowedConnections}`
    );
    if (provider === "antigravity" && (forcedConnectionId || allowedConnections?.length)) {
      const reasons: string[] = [];
      if (forcedConnectionId) reasons.push(`forcedConnectionId kept ${connections.length}`);
      if (allowedConnections?.length) {
        reasons.push(`allowedConnections=${allowedConnections.length}`);
      }
      log.info("AUTH", `${provider} selection constrained: ${reasons.join(", ")}`);
    }

    if (connections.length === 0) {
      // Check all connections (including inactive) to see if rate limited
      // Fix #922: Also search aliases here
      const allConnectionsResults = await Promise.all(
        providersToSearch.map((p) => getProviderConnections({ provider: p }))
      );
      let allConnections = (allConnectionsResults.filter(Array.isArray).flat() as unknown[])
        .map(toProviderConnection)
        .filter((conn) => conn.id.length > 0);
      if (allowedConnections && allowedConnections.length > 0) {
        allConnections = allConnections.filter((conn) => allowedConnections.includes(conn.id));
      }
      if (forcedConnectionId) {
        allConnections = allConnections.filter((conn) => conn.id === forcedConnectionId);
      }
      log.debug("AUTH", `${provider} | all connections (incl inactive): ${allConnections.length}`);
      if (allConnections.length > 0) {
        const earliest = getEarliestRateLimitedUntil(allConnections);
        if (earliest) {
          log.warn(
            "AUTH",
            `${provider} | all ${allConnections.length} accounts rate limited (${formatRetryAfter(earliest)})`
          );
          return {
            allRateLimited: true,
            retryAfter: earliest,
            retryAfterHuman: formatRetryAfter(earliest),
          };
        }
        log.warn("AUTH", `${provider} | ${allConnections.length} accounts found but none active`);
        allConnections.forEach((c) => {
          log.debug(
            "AUTH",
            `  → ${c.id?.slice(0, 8)} | isActive=${c.isActive} | rateLimitedUntil=${c.rateLimitedUntil || "none"} | testStatus=${c.testStatus}`
          );
        });

        // If every existing connection is in a terminal state (expired/banned/
        // credits_exhausted), surface that as a re-auth signal instead of the
        // generic "No credentials" 400. The classic case is AWS SSO/Kiro
        // refresh tokens hitting their 90-day TTL: all connections flip to
        // is_active=0 with testStatus=banned|expired, and without this branch
        // the dashboard sees a misleading "bad_request" code.
        const terminalConnections = allConnections.filter(isTerminalConnectionStatus);
        if (terminalConnections.length === allConnections.length) {
          const syntheticFallback = await maybeSyntheticNoAuthFallback(
            resolvedId,
            excludedConnectionIds
          );
          if (syntheticFallback) return syntheticFallback;

          const statusCounts = new Map<string, number>();
          for (const c of terminalConnections) {
            const key = normalizeStatus(c.testStatus) || "expired";
            statusCounts.set(key, (statusCounts.get(key) || 0) + 1);
          }
          const dominantStatus =
            [...statusCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "expired";
          return {
            allExpired: true,
            expiredCount: terminalConnections.length,
            expiredStatus: dominantStatus,
          };
        }
      }
      const syntheticFallback = await maybeSyntheticNoAuthFallback(
        resolvedId,
        excludedConnectionIds
      );
      if (syntheticFallback) return syntheticFallback;
      log.warn("AUTH", `No credentials for ${provider}`);
      return null;
    }

    // Auto-decay backoffLevel for accounts whose rateLimitedUntil has passed.
    // Without this, high backoffLevel permanently deprioritizes accounts even
    // after the rate limit window expires, creating a deadlock where the account
    // needs a successful request to reset but never gets selected.
    for (const c of connections) {
      if (
        c.backoffLevel > 0 &&
        !isTerminalConnectionStatus(c) &&
        !isAccountUnavailable(c.rateLimitedUntil)
      ) {
        c.backoffLevel = 0;
        updateProviderConnection(c.id, {
          backoffLevel: 0,
          testStatus: "active",
          lastError: null,
          lastErrorAt: null,
          lastErrorType: null,
          lastErrorSource: null,
          errorCode: null,
        }).catch(() => {});
      }
    }

    let modelLockedCount = 0;
    let familyLockedCount = 0;
    // Filter out unavailable accounts and excluded connection
    const availableConnections = connections.filter((c) => {
      if (excludedConnectionIds.has(c.id)) return false;
      if (requestedModel && isModelExcludedByConnection(requestedModel, c.providerSpecificData)) {
        return false;
      }
      if (!allowSuppressedConnections) {
        if (!allowRateLimitedConnections && isAccountUnavailable(c.rateLimitedUntil)) return false;
        if (isTerminalConnectionStatus(c)) return false;
        if (provider === "codex" && isCodexScopeUnavailable(c, requestedModel)) return false;
        // Per-model lockout: if this specific model/family is locked on this connection, skip it
        if (requestedModel && isModelLocked(provider, c.id, requestedModel)) {
          if (
            provider === "antigravity" &&
            getQuotaScopeLabelForProvider(provider, requestedModel) === "family"
          ) {
            familyLockedCount += 1;
          } else {
            modelLockedCount += 1;
          }
          return false;
        }
      }
      return true;
    });

    log.debug(
      "AUTH",
      `${provider} | available: ${availableConnections.length}/${connections.length}`
    );
    if (provider === "antigravity") {
      log.info(
        "AUTH",
        `${provider} selection candidates model=${requestedModel || "none"}: active=${activeConnectionsCount}, excluded=${excludedConnectionIds.size}, modelLocked=${modelLockedCount}, familyLocked=${familyLockedCount}, eligible=${availableConnections.length}`
      );
    }
    connections.forEach((c) => {
      const excluded = excludedConnectionIds.has(c.id);
      const rateLimited = isAccountUnavailable(c.rateLimitedUntil);
      const terminalStatus = isTerminalConnectionStatus(c);
      const codexScopeLimited = provider === "codex" && isCodexScopeUnavailable(c, requestedModel);
      const modelLocked =
        Boolean(requestedModel) && isModelLocked(provider, c.id, requestedModel as string);
      const modelExcluded =
        Boolean(requestedModel) &&
        isModelExcludedByConnection(requestedModel as string, c.providerSpecificData);
      if (excluded || rateLimited) {
        log.debug(
          "AUTH",
          `  → ${c.id?.slice(0, 8)} | ${excluded ? "excluded" : ""} ${rateLimited ? `rateLimited until ${c.rateLimitedUntil}` : ""}${allowSuppressedConnections && rateLimited ? " (retained for combo live test)" : ""}`
        );
      } else if (modelExcluded) {
        log.debug(
          "AUTH",
          `  → ${c.id?.slice(0, 8)} | excluded by per-account model rule for ${requestedModel}`
        );
      } else if (terminalStatus) {
        log.debug(
          "AUTH",
          allowSuppressedConnections
            ? `  → ${c.id?.slice(0, 8)} | retained terminal status=${c.testStatus} for combo live test`
            : `  → ${c.id?.slice(0, 8)} | skipped terminal status=${c.testStatus}`
        );
      } else if (codexScopeLimited) {
        const scopeUntil = getCodexScopeRateLimitedUntil(c.providerSpecificData, requestedModel);
        log.debug(
          "AUTH",
          allowSuppressedConnections
            ? `  → ${c.id?.slice(0, 8)} | retained codex scope-limited account until ${scopeUntil} for combo live test`
            : `  → ${c.id?.slice(0, 8)} | codex scope-limited until ${scopeUntil}`
        );
      } else if (modelLocked) {
        const lockout = getModelLockoutInfo(provider, c.id, requestedModel);
        log.debug(
          "AUTH",
          allowSuppressedConnections
            ? `  → ${c.id?.slice(0, 8)} | retained model lockout for ${requestedModel} (${lockout?.remainingMs || 0}ms remaining) for combo live test`
            : `  → ${c.id?.slice(0, 8)} | model-locked for ${requestedModel} (${lockout?.remainingMs || 0}ms remaining)`
        );
      }
    });

    if (availableConnections.length === 0) {
      const cooldownStates: CooldownInspectionState[] = connections.map((connection) => {
        const connectionCooldownMs = parseFutureDateMs(connection.rateLimitedUntil);
        const codexScopeCooldownMs =
          provider === "codex"
            ? parseFutureDateMs(
                getCodexScopeRateLimitedUntil(connection.providerSpecificData, requestedModel)
              )
            : null;
        const modelLockout = requestedModel
          ? getModelLockoutInfo(provider, connection.id, requestedModel)
          : null;
        const retryableModelCooldownMs =
          modelLockout &&
          modelLockout.remainingMs > 0 &&
          isRetryableModelLockoutReason(modelLockout.reason)
            ? Date.now() + modelLockout.remainingMs
            : null;

        return {
          connection,
          connectionCooldownMs,
          codexScopeCooldownMs,
          retryableModelCooldownMs,
        };
      });

      const cooldownCandidates = cooldownStates
        .flatMap((state) => {
          const candidates: Array<{ ms: number; connection: ProviderConnectionView }> = [];
          if (state.connectionCooldownMs !== null) {
            candidates.push({ ms: state.connectionCooldownMs, connection: state.connection });
          }
          if (state.codexScopeCooldownMs !== null) {
            candidates.push({ ms: state.codexScopeCooldownMs, connection: state.connection });
          }
          if (state.retryableModelCooldownMs !== null) {
            candidates.push({ ms: state.retryableModelCooldownMs, connection: state.connection });
          }
          return candidates;
        })
        .sort((a, b) => a.ms - b.ms);

      const allBlockedByModelCooldown =
        Boolean(requestedModel) &&
        cooldownStates.length > 0 &&
        cooldownStates.every((state) => {
          const hasModelSpecificCooldown =
            state.codexScopeCooldownMs !== null || state.retryableModelCooldownMs !== null;
          return hasModelSpecificCooldown && state.connectionCooldownMs === null;
        });

      const earliestCandidate = cooldownCandidates[0];
      const earliest =
        earliestCandidate?.ms && Number.isFinite(earliestCandidate.ms)
          ? new Date(earliestCandidate.ms).toISOString()
          : null;

      if (earliest) {
        const earliestConn = earliestCandidate?.connection;
        log.warn(
          "AUTH",
          allBlockedByModelCooldown
            ? `${provider} | all ${connections.length} active accounts cooling down for model ${requestedModel} (${formatRetryAfter(earliest)}) | lastErrorCode=${earliestConn?.errorCode}, lastError=${earliestConn?.lastError?.slice(0, 50)}`
            : `${provider} | all ${connections.length} active accounts rate limited (${formatRetryAfter(earliest)}) | lastErrorCode=${earliestConn?.errorCode}, lastError=${earliestConn?.lastError?.slice(0, 50)}`
        );
        return {
          allRateLimited: true,
          retryAfter: earliest,
          retryAfterHuman: formatRetryAfter(earliest),
          lastError: earliestConn?.lastError || null,
          lastErrorCode: allBlockedByModelCooldown ? 429 : earliestConn?.errorCode || null,
          cooldownScope: allBlockedByModelCooldown ? "model" : "connection",
          cooldownModel: allBlockedByModelCooldown ? requestedModel : null,
          connectionsCount: connections.length,
        };
      }
      const syntheticFallback = await maybeSyntheticNoAuthFallback(
        resolvedId,
        excludedConnectionIds
      );
      if (syntheticFallback) return syntheticFallback;
      log.warn("AUTH", `${provider} | all ${connections.length} accounts unavailable`);
      return null;
    }

    let policyEligibleConnections = availableConnections;
    const blockedByPolicy: Array<{
      id: string;
      reasons: string[];
      resetAt: string | null;
    }> = [];

    if (!bypassQuotaPolicy) {
      policyEligibleConnections = availableConnections.filter((connection) => {
        const evaluation = evaluateQuotaLimitPolicy(provider, connection, requestedModel);
        if (!evaluation.blocked) return true;

        blockedByPolicy.push({
          id: connection.id,
          reasons: evaluation.reasons,
          resetAt: evaluation.resetAt,
        });
        return false;
      });
    } else if (availableConnections.length > 0) {
      log.debug("AUTH", `${provider} | bypassing quota policy for combo live test`);
    }

    if (blockedByPolicy.length > 0) {
      log.info(
        "AUTH",
        `${provider} | quota policy filtered ${blockedByPolicy.length} account(s): ${blockedByPolicy
          .map((entry) => `${entry.id.slice(0, 8)}(${entry.reasons.join(", ")})`)
          .join("; ")}`
      );
    }

    if (policyEligibleConnections.length === 0 && availableConnections.length > 0) {
      const earliestResetAt = getEarliestFutureDate(blockedByPolicy.map((entry) => entry.resetAt));
      const earliestResetMs = parseFutureDateMs(earliestResetAt);

      const retryAfter = earliestResetMs
        ? new Date(earliestResetMs).toISOString()
        : new Date(Date.now() + 5 * 60 * 1000).toISOString();

      return {
        allRateLimited: true,
        retryAfter,
        retryAfterHuman: formatRetryAfter(retryAfter),
        lastError: `All ${provider} accounts reached configured quota threshold`,
        lastErrorCode: 429,
      };
    }

    // Quota-aware: filter out accounts with exhausted quota for the requested scope.
    const withQuota = policyEligibleConnections.filter(
      (c) => !isQuotaExhaustedForRequest(c.id, provider, requestedModel)
    );
    const exhaustedQuota = policyEligibleConnections.filter((c) =>
      isQuotaExhaustedForRequest(c.id, provider, requestedModel)
    );

    if (exhaustedQuota.length > 0) {
      log.info(
        "AUTH",
        `${provider} | quota-aware: ${withQuota.length} with quota, skipping ${exhaustedQuota.length} exhausted`
      );
    }

    if (withQuota.length === 0 && exhaustedQuota.length > 0) {
      // All remaining eligible accounts are exhausted
      const earliestResetAt = getEarliestFutureDate(
        exhaustedQuota.map((c) => {
          const entry = getQuotaCache(c.id);
          return entry?.nextResetAt || null;
        })
      );
      const earliestResetMs = parseFutureDateMs(earliestResetAt);
      const retryAfter = earliestResetMs
        ? new Date(earliestResetMs).toISOString()
        : new Date(Date.now() + 5 * 60 * 1000).toISOString();

      return {
        allRateLimited: true,
        retryAfter,
        retryAfterHuman: formatRetryAfter(retryAfter),
        lastError: `All ${provider} accounts have exhausted their quota`,
        lastErrorCode: 429,
      };
    }

    const orderedConnections = withQuota;

    const providerStrategyOverrides = (settings.providerStrategies || {}) as Record<
      string,
      { fallbackStrategy?: string; stickyRoundRobinLimit?: number }
    >;
    const providerOverride = providerStrategyOverrides[resolvedId] || {};
    const strategy =
      providerOverride.fallbackStrategy || settings.fallbackStrategy || "fill-first";

    let connection;
    const affinityConnection = await selectSessionAffinityConnection(
      provider,
      options.sessionKey,
      orderedConnections,
      sessionAffinityTtlMs
    );
    if (affinityConnection) {
      connection = affinityConnection;
    } else if (options.sessionKey) {
      log.info(
        "AUTH",
        `session_key=${formatSessionKeyForLog(options.sessionKey)} has no available affinity target`
      );
    }

    if (connection) {
      // Session affinity selected a connection before global sticky routing.
    } else if (strategy === "round-robin") {
      const stickyLimit = toNumber(
        providerOverride.stickyRoundRobinLimit ??
          (settings as Record<string, unknown>).stickyRoundRobinLimit,
        3
      );

      // If excluding account(s) (fallback scenario), skip sticky logic and go straight to LRU.
      // This prevents same-model retries from getting stuck on a failed account.
      const isFallbackScenario = excludeConnectionId !== null || excludedConnectionIds.size > 0;

      if (!isFallbackScenario) {
        // Sort by lastUsed (most recent first) to find current candidate
        const byRecency = [...orderedConnections].sort((a: any, b: any) => {
          if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
          if (!a.lastUsedAt) return 1;
          if (!b.lastUsedAt) return -1;
          return new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime();
        });

        const current = byRecency[0];
        const currentCount = current?.consecutiveUseCount || 0;

        if (current && current.lastUsedAt && currentCount < stickyLimit) {
          // Stay with current account
          connection = current;
          log.debug(
            "AUTH",
            `${provider} round-robin: staying with ${current.id?.slice(0, 8)}... (count=${currentCount}/${stickyLimit})`
          );
          // Update lastUsedAt and increment count (await to ensure persistence)
          await updateProviderConnection(connection.id, {
            lastUsedAt: new Date().toISOString(),
            consecutiveUseCount: (connection.consecutiveUseCount || 0) + 1,
          });
        } else {
          // Pick the least recently used (excluding current if possible)
          // Also penalize accounts with high backoffLevel (previously rate-limited)
          // so they don't get immediately re-selected after cooldown (#340)
          const sortedByOldest = [...orderedConnections].sort((a: any, b: any) => {
            // Penalize previously rate-limited accounts (backoffLevel > 0)
            const aBackoff = a.backoffLevel || 0;
            const bBackoff = b.backoffLevel || 0;
            if (aBackoff !== bBackoff) return aBackoff - bBackoff; // lower backoff first
            if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
            if (!a.lastUsedAt) return -1;
            if (!b.lastUsedAt) return 1;
            return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
          });

          connection = sortedByOldest[0];
          log.debug(
            "AUTH",
            `${provider} round-robin: switching to LRU ${connection.id?.slice(0, 8)}... (current count=${currentCount} >= limit=${stickyLimit} or no lastUsedAt)`
          );

          // Update lastUsedAt and reset count to 1 (await to ensure persistence)
          await updateProviderConnection(connection.id, {
            lastUsedAt: new Date().toISOString(),
            consecutiveUseCount: 1,
          });
        }
      } else {
        // Fallback scenario: excluded an account due to failure
        // Always pick the least recently used to ensure proper cycling
        // Also penalize accounts with high backoffLevel (#340)
        const sortedByOldest = [...orderedConnections].sort((a: any, b: any) => {
          const aBackoff = a.backoffLevel || 0;
          const bBackoff = b.backoffLevel || 0;
          if (aBackoff !== bBackoff) return aBackoff - bBackoff;
          if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
          if (!a.lastUsedAt) return -1;
          if (!b.lastUsedAt) return 1;
          return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
        });

        connection = sortedByOldest[0];
        log.info(
          "AUTH",
          `${provider} round-robin: FALLBACK MODE - excluded_count=${excludedConnectionIds.size} excluded=${formatConnectionPrefixesForLog(excludedConnectionIds)} picked_lru=${connection.id?.slice(0, 8)}...`
        );

        // Update lastUsedAt and reset count to 1 (await to ensure persistence)
        await updateProviderConnection(connection.id, {
          lastUsedAt: new Date().toISOString(),
          consecutiveUseCount: 1,
        });
      }
    } else if (strategy === "p2c") {
      const candidatePool = withQuota.length > 0 ? withQuota : orderedConnections;
      // Power of Two Choices: sample from the quota-eligible pool and compare
      // health instead of defaulting to random-first selection.
      if (candidatePool.length <= 2) {
        connection = [...candidatePool].sort((a, b) =>
          compareP2CConnections(provider, a, b, requestedModel)
        )[0];
      } else {
        const i =
          parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % candidatePool.length;
        let j =
          parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % (candidatePool.length - 1);
        if (j >= i) j++;
        const a = candidatePool[i];
        const b = candidatePool[j];
        connection = compareP2CConnections(provider, a, b, requestedModel) <= 0 ? a : b;
      }
    } else if (strategy === "random") {
      // Random: Fisher-Yates-inspired random pick
      const idx =
        parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % orderedConnections.length;
      connection = orderedConnections[idx];
    } else if (strategy === "least-used") {
      // Least Used: pick the one with oldest lastUsedAt
      const sorted = [...orderedConnections].sort((a, b) => {
        if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
        if (!a.lastUsedAt) return -1;
        if (!b.lastUsedAt) return 1;
        return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
      });
      connection = sorted[0];
    } else if (strategy === "cost-optimized") {
      // Cost Optimized: sort by priority ascending (lower = cheaper/preferred)
      // Future: can be enhanced with actual cost data per provider
      const sorted = [...orderedConnections].sort(
        (a, b) => (a.priority || 999) - (b.priority || 999)
      );
      connection = sorted[0];
    } else if (strategy === "strict-random") {
      // Strict Random: shuffle deck — uses each account once before reshuffling
      const ids = orderedConnections.map((c) => c.id);
      const selectedId = getNextFromDeckSync(`conn:${provider}`, ids);
      connection = orderedConnections.find((c) => c.id === selectedId) || orderedConnections[0];
    } else {
      // Default: fill-first (already sorted by priority in getProviderConnections)
      connection = orderedConnections[0];
    }

    if (provider === "antigravity" && connection) {
      log.info(
        "AUTH",
        `${provider} selected account=${connection.id?.slice(0, 8)}... eligible=${orderedConnections.length} excluded=${excludedConnectionIds.size}`
      );
    }

    const apiKeyHealth = connection.providerSpecificData?.apiKeyHealth as
      Record<string, KeyHealth> | undefined;
    if (apiKeyHealth) {
      syncHealthFromDB(connection.id, apiKeyHealth);
    }

    return {
      apiKey: connection.apiKey,
      accessToken: connection.accessToken,
      refreshToken: connection.refreshToken,
      expiresAt: connection.tokenExpiresAt || connection.expiresAt || null,
      projectId: connection.projectId,
      // #474: surface the connection's configured defaultModel so the chat /
      // embeddings handlers can resolve a bare model name (e.g. an alias that
      // resolved to "auto") to a real provider model ID before the upstream call.
      defaultModel: connection.defaultModel || null,
      copilotToken:
        typeof connection.providerSpecificData.copilotToken === "string"
          ? connection.providerSpecificData.copilotToken
          : null,
      providerSpecificData: connection.providerSpecificData,
      // Fields the generic quota fetcher (open-sse/services/genericQuotaFetcher.ts)
      // needs to delegate to getUsageForProvider for any provider — kept aliased
      // (`id` + `connectionId`) for back-compat with callers that already use the
      // connectionId name.
      id: connection.id,
      provider: connection.provider,
      email: connection.email,
      connectionId: connection.id,
      // Include current status for optimization check
      testStatus: connection.testStatus,
      lastError: connection.lastError,
      lastErrorType: connection.lastErrorType,
      lastErrorSource: connection.lastErrorSource,
      errorCode: connection.errorCode,
      rateLimitedUntil: connection.rateLimitedUntil,
      maxConcurrent: connection.maxConcurrent,
      // Surface per-window quota overrides so the preflight latency gate in
      // getProviderCredentialsWithQuotaPreflight can see them. Without this,
      // user-set cutoffs would silently never enforce.
      quotaWindowThresholds: connection.quotaWindowThresholds ?? null,
    };
  } finally {
    selectionLock.release();
  }
}

export async function getProviderCredentialsWithQuotaPreflight(
  provider: string,
  excludeConnectionId: string | null = null,
  allowedConnections: string[] | null = null,
  requestedModel: string | null = null,
  options: CredentialSelectionOptions = {}
) {
  if (options.bypassQuotaPolicy === true) {
    return getProviderCredentials(
      provider,
      excludeConnectionId,
      allowedConnections,
      requestedModel,
      options
    );
  }

  const blockedByPreflight: Array<{
    id: string;
    quotaPercent?: number;
    resetAt?: string | null;
  }> = [];
  const excludedConnectionIds = normalizeExcludedConnectionIds(
    excludeConnectionId,
    options.excludeConnectionIds
  );

  const resilience = resolveResilienceSettings(await getCachedSettings());
  const { defaultThresholdPercent, warnThresholdPercent, providerWindowDefaults } =
    resilience.quotaPreflight;
  const providerWindowMap = providerWindowDefaults[provider] || {};
  const providerHasDefaults = Object.keys(providerWindowMap).length > 0;
  // The factory default is "block at 2% remaining" — effectively "right
  // before 429." Skipping preflight at that level is a clean no-op. If an
  // operator has raised the global to anything stricter (e.g. 20% remaining
  // = stop at 80% used), preflight needs to run for every connection so the
  // tighter floor is honored.
  const FACTORY_NO_OP_REMAINING_PERCENT = 2;
  const globalDefaultIsRestrictive = defaultThresholdPercent > FACTORY_NO_OP_REMAINING_PERCENT;

  while (true) {
    const credentials = await getProviderCredentials(
      provider,
      null,
      allowedConnections,
      requestedModel,
      {
        ...options,
        excludeConnectionIds: Array.from(excludedConnectionIds),
      }
    );

    if (!credentials) {
      if (blockedByPreflight.length > 0) {
        return buildQuotaPreflightRateLimitedResult(provider, blockedByPreflight);
      }
      return null;
    }

    if (
      ("allRateLimited" in credentials && credentials.allRateLimited) ||
      ("allExpired" in credentials && credentials.allExpired)
    ) {
      if (
        "allRateLimited" in credentials &&
        credentials.allRateLimited &&
        blockedByPreflight.length > 0
      ) {
        return buildQuotaPreflightRateLimitedResult(provider, blockedByPreflight);
      }
      return credentials;
    }

    const connectionId = credentials.connectionId;
    if (!connectionId) {
      return credentials;
    }

    // Cascading resolver: per-connection override → per-(provider, window)
    // default → global default. Used per-window when the fetcher exposes
    // multiple windows, and once (with window=null) for single-signal
    // fetchers. The warn fallback is uniform — windows don't need their own
    // warn levels in v1.
    const perConnectionWindowOverrides =
      (credentials as { quotaWindowThresholds?: Record<string, number> | null })
        .quotaWindowThresholds || {};

    // Latency gate: skip the upstream usage fetch entirely when there's
    // nothing to enforce. Preflight is only worth its cost when at least
    // one of the following is true:
    //   • a per-connection override on this row
    //   • a per-(provider, window) default in resilience settings
    //   • the legacy `quotaPreflightEnabled` flag in providerSpecificData
    //   • the global default is stricter than the factory no-op level
    //     (factory = 2% remaining, basically "right before 429" — anything
    //     stricter means the operator wants enforcement everywhere)
    // Otherwise the resolver would return the factory default for every
    // window, and a near-exhausted account would still be caught by the
    // normal 429 → cooldown path.
    // Explicit per-connection opt-out always wins over global/provider defaults.
    // isQuotaPreflightEnabled is strict-=== true (back-compat), so it returns
    // false for both "not set" and "explicit false" — we need an explicit check
    // here to distinguish them.
    const legacyForceDisable =
      (credentials as { providerSpecificData?: Record<string, unknown> }).providerSpecificData
        ?.quotaPreflightEnabled === false;
    if (legacyForceDisable) return credentials;

    const hasConnectionOverrides = Object.keys(perConnectionWindowOverrides).length > 0;
    const legacyForceEnable = isQuotaPreflightEnabled(credentials);
    if (
      !hasConnectionOverrides &&
      !providerHasDefaults &&
      !legacyForceEnable &&
      !globalDefaultIsRestrictive
    ) {
      return credentials;
    }

    // Returns the minimum-remaining cutoff for a window — matches the
    // dashboard's quota bars so the number the user types in the modal
    // means the same thing as the percentage rendered on the bar.
    const resolveMinRemainingPercent = (windowName: string | null): number => {
      if (windowName !== null) {
        const lookupWindowNames =
          provider === "codex"
            ? uniqueWindows(
                [windowName, toCodexBaseQuotaWindowName(windowName)].filter(Boolean) as string[]
              )
            : [windowName];
        for (const lookupWindowName of lookupWindowNames) {
          const override = perConnectionWindowOverrides[lookupWindowName];
          if (typeof override === "number") return override;
          const providerDefault = providerWindowMap[lookupWindowName];
          if (typeof providerDefault === "number") return providerDefault;
        }
      }
      return defaultThresholdPercent;
    };
    const preflightCredentials =
      requestedModel && provider === "codex" ? { ...credentials, requestedModel } : credentials;
    const preflight = await preflightQuota(provider, connectionId, preflightCredentials, {
      resolveMinRemainingPercent,
      resolveWarnRemainingPercent: () => warnThresholdPercent,
    });
    if (preflight.proceed) {
      return credentials;
    }

    const unavailableUntil = await markQuotaPreflightAccountUnavailable(
      provider,
      connectionId,
      preflight,
      requestedModel
    );
    blockedByPreflight.push({
      id: connectionId,
      quotaPercent: preflight.quotaPercent,
      resetAt: unavailableUntil,
    });
    excludedConnectionIds.add(connectionId);

    log.info(
      "AUTH",
      `${provider} | preflight blocked ${connectionId.slice(0, 8)}${
        Number.isFinite(preflight.quotaPercent)
          ? ` at ${Math.round((preflight.quotaPercent as number) * 100)}%`
          : ""
      } until ${unavailableUntil}`
    );
  }
}

/**
 * Mark account as unavailable — reads backoffLevel from DB, calculates cooldown with exponential backoff, saves new level
 * @param {string} connectionId
 * @param {number} status - HTTP status code
 * @param {string} errorText - Error message
 * @param {string|null} provider
 * @param {string|null} model - Model name for per-model lockout
 * @returns {{ shouldFallback: boolean, cooldownMs: number }}
 */
export async function markAccountUnavailable(
  connectionId: string,
  status: number,
  errorText: string,
  provider: string | null = null,
  model: string | null = null,
  providerProfile = null,
  options: {
    persistUnavailableState?: boolean;
    /** Caller is the combo engine — it records its own model-level lockouts. */
    isCombo?: boolean;
  } = {}
) {
  const currentMutex = markMutexes.get(connectionId) || Promise.resolve();
  let resolveMutex: (() => void) | undefined;
  markMutexes.set(
    connectionId,
    new Promise((resolve) => {
      resolveMutex = resolve;
    })
  );

  try {
    await currentMutex;

    // Read current connection to get backoffLevel
    const connectionsRaw = await getProviderConnections({ provider });
    const connections = (Array.isArray(connectionsRaw) ? connectionsRaw : [])
      .map(toProviderConnection)
      .filter((connection) => connection.id.length > 0);
    const conn = connections.find((connection) => connection.id === connectionId);
    const backoffLevel = conn?.backoffLevel || 0;

    // T06/T10/T36: terminal statuses should not be overwritten by transient cooldown state.
    if (conn && isTerminalConnectionStatus(conn)) {
      log.info(
        "AUTH",
        `${connectionId.slice(0, 8)} terminal status=${conn.testStatus}, skipping cooldown overwrite`
      );
      return { shouldFallback: true, cooldownMs: 0 };
    }

    // ─── Anti-Thundering Herd Guard ─────────────────────────────────
    // If this connection was ALREADY marked unavailable by a prior concurrent
    // request (within the mutex window), skip re-marking to avoid resetting
    // the cooldown timer or double-incrementing the backoff level.
    // Uses cooldownUntilMs (not a raw `new Date()`) because `rate_limited_until`
    // can hold a numeric-epoch string (e.g. the Antigravity full-quota path) —
    // see #3954.
    const existingCooldownMs = conn?.rateLimitedUntil
      ? cooldownUntilMs(conn.rateLimitedUntil)
      : NaN;
    if (Number.isFinite(existingCooldownMs) && existingCooldownMs > Date.now()) {
      log.info(
        "AUTH",
        `${connectionId.slice(0, 8)} already marked unavailable (until ${conn?.rateLimitedUntil}), skipping duplicate mark`
      );
      return {
        shouldFallback: true,
        cooldownMs: existingCooldownMs - Date.now(),
      };
    }

    // T09: Codex scope-aware lockout guard (codex vs spark independent pools).
    if (provider === "codex" && model) {
      const scopeRateLimitedUntil = getCodexScopeRateLimitedUntil(
        conn?.providerSpecificData || {},
        model
      );
      if (scopeRateLimitedUntil && new Date(scopeRateLimitedUntil).getTime() > Date.now()) {
        log.info(
          "AUTH",
          `${connectionId.slice(0, 8)} already scope-limited for ${getCodexModelScope(model)} (until ${scopeRateLimitedUntil}), skipping duplicate mark`
        );
        return {
          shouldFallback: true,
          cooldownMs: new Date(scopeRateLimitedUntil).getTime() - Date.now(),
        };
      }
    }

    const effectiveProviderProfile =
      providerProfile || (provider ? await getRuntimeProviderProfile(provider) : null);
    // #4530 follow-up: the combo.ts lockout sites forward the admin-configured
    // maxCooldownMs cap to recordModelLockoutFailure, but the markAccountUnavailable
    // lockout sites (per-model quota, grok-web 403, local 404) never did, so the cap
    // fell back to BACKOFF_CONFIG.max here. Resolve it once and pass it at every site.
    const mlSettings = resolveModelLockoutSettings(await getCachedSettings());
    const fallbackResult = checkFallbackError(
      status,
      errorText,
      backoffLevel,
      model,
      provider,
      null,
      effectiveProviderProfile
    );

    // Read passthroughModels from connection config (user-configured per-model quota)
    const connProviderSpecificData = (conn?.providerSpecificData as Record<string, unknown>) || {};
    const connectionPassthroughModels = connProviderSpecificData.passthroughModels as
      boolean | undefined;
    // #2997: per-connection opt-out of the TRANSIENT connection cooldown. When set,
    // a recoverable failure records lastError/backoff but does NOT cool the
    // connection, so getProviderCredentials keeps selecting it. Terminal states
    // (banned/expired/credits_exhausted) are unaffected — they are resolved below
    // via resolveTerminalConnectionStatus() and still take the connection out.
    // NOTE: this first cut scopes the opt-out to the CONNECTION-level cooldown only;
    // per-model lockout branches (per-model quota 403/404, codex scope) are left
    // as-is — extending disableCooling to model lockout is a follow-up.
    const disableCooling = connProviderSpecificData.disableCooling === true;

    const isPerModelQuotaProvider = hasPerModelQuota(provider, model, connectionPassthroughModels);
    const modelLockoutOptions = { maxCooldownMs: effectiveProviderProfile?.maxCooldownMs };
    if (
      isPerModelQuotaProvider &&
      provider &&
      provider !== "codex" &&
      model &&
      (status === 404 || status === 429 || status >= 500)
    ) {
      const reason =
        status === 404
          ? "not_found"
          : status === 429 && fallbackResult.reason === RateLimitReason.QUOTA_EXHAUSTED
            ? "quota_exhausted"
            : status === 429
              ? "rate_limited"
              : "server_error";

      // #5976: a bare 500 is intermittent and NOT model-specific — skip
      // lockout/cooldown ONLY for the exact 500 (the contract its own tests pin:
      // combo-provider-cooldown-sibling.test.ts — "Gemini 503 should NOT skip
      // cooldown"). 502/503/504 keep the pre-#6216 model-lockout path: cooldownMs
      // 0 hot-loops the failing upstream (broke resilience-http-e2e on the PR).
      if (status === 500) {
        updateProviderConnection(connectionId, {
          lastErrorType: reason,
          lastError: `Model ${model} ${reason}`,
          lastErrorAt: new Date().toISOString(),
          errorCode: status,
        }).catch(() => {});
        log.info(
          "AUTH",
          `Server error for ${provider}:${model} — ${status} ${reason} (no model lockout, connection stays active for sibling models)`
        );
        return { shouldFallback: true, cooldownMs: 0 };
      }

      const quotaScope = getQuotaScopeLabelForProvider(provider, model);
      const antigravityFamilyInferredBaseCooldownMs =
        provider === "antigravity" && quotaScope === "family" && status === 429
          ? ANTIGRAVITY_FAMILY_INFERRED_BASE_COOLDOWN_MS
          : null;
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        reason,
        status,
        status === 404
          ? (effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.notFoundLocal)
          : (antigravityFamilyInferredBaseCooldownMs ??
              fallbackResult.baseCooldownMs ??
              effectiveProviderProfile?.baseCooldownMs ??
              0),
        effectiveProviderProfile,
        {
          ...modelLockoutOptions,
          exactCooldownMs:
            fallbackResult.usedUpstreamRetryHint === true
              ? fallbackResult.cooldownMs
              : (fallbackResult.quotaResetHintMs ?? null),
          maxCooldownMs: mlSettings.maxCooldownMs,
        }
      );
      // Update last error for observability (without changing terminal status)
      updateProviderConnection(connectionId, {
        lastErrorType: reason,
        lastError: `Model ${model} ${reason}`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Model-only lockout for ${provider}:${model} — ${status} ${reason} ${Math.ceil(lockout.cooldownMs / 1000)}s (failureCount=${lockout.failureCount}, connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }
    const result = fallbackResult;
    const { shouldFallback, cooldownMs: rawCooldownMs, newBackoffLevel, reason } = result;
    if (!shouldFallback) return { shouldFallback: false, cooldownMs: 0 };
    const providerErrorType = classifyProviderError(status, errorText, provider);

    if (provider && resolveProviderId(provider) === "grok-web" && status === 403 && model) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "forbidden",
        status,
        effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.serviceUnavailable,
        effectiveProviderProfile,
        { maxCooldownMs: mlSettings.maxCooldownMs }
      );
      updateProviderConnection(connectionId, {
        lastErrorType: "forbidden",
        lastError: `Mode ${model} forbidden for this Grok account`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Mode-only lockout for ${provider}:${model} — 403 forbidden ${Math.ceil(lockout.cooldownMs / 1000)}s (connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }

    const terminalStatus = resolveTerminalConnectionStatus(
      status,
      result as { permanent?: boolean; creditsExhausted?: boolean },
      providerErrorType
    );
    const cooldownMs = terminalStatus ? 0 : rawCooldownMs;

    // ── #3027: per-model subscription/permission 403 → model-only lockout ──
    if (isPerModelQuotaProvider && status === 403 && provider && model && !terminalStatus) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "forbidden",
        status,
        fallbackResult.baseCooldownMs ??
          effectiveProviderProfile?.baseCooldownMs ??
          COOLDOWN_MS.serviceUnavailable,
        effectiveProviderProfile,
        {
          ...modelLockoutOptions,
          exactCooldownMs:
            fallbackResult.usedUpstreamRetryHint === true ? fallbackResult.cooldownMs : null,
          maxCooldownMs: mlSettings.maxCooldownMs,
        }
      );
      updateProviderConnection(connectionId, {
        lastErrorType: "forbidden",
        lastError: `Model ${model} forbidden (per-model access/subscription)`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Model-only lockout for ${provider}:${model} — 403 forbidden ${Math.ceil(lockout.cooldownMs / 1000)}s (per-model quota provider, connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }

    // ── 404 model-only lockout: connection stays active ──
    // For local providers (detected by URL), a 404 means the specific model
    // doesn't exist or isn't available for this account — it should NOT lock
    // out the entire connection.
    const connBaseUrl = (conn?.providerSpecificData as Record<string, unknown>)?.baseUrl as
      string | undefined;

    if (isLocalProvider(connBaseUrl) && status === 404 && provider && model) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "not_found",
        status,
        status === 404
          ? (effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.notFoundLocal)
          : COOLDOWN_MS.notFoundLocal,
        effectiveProviderProfile,
        { maxCooldownMs: mlSettings.maxCooldownMs }
      );
      updateProviderConnection(connectionId, {
        lastErrorType: "not_found",
        lastError: `Model ${model} not_found`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Model-only lockout for ${provider}:${model} — 404 not_found ${Math.ceil(lockout.cooldownMs / 1000)}s (failureCount=${lockout.failureCount}, connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }

    const errorMsg = typeof errorText === "string" ? errorText.slice(0, 100) : "Provider error";

    // T09: Codex per-scope lockout (do not block the whole account globally).
    if (provider === "codex" && status === 429 && model && conn) {
      const scope = getCodexModelScope(model);
      const existingScopeMap = asRecord(conn.providerSpecificData.codexScopeRateLimitedUntil);
      const persistedScopeUntil = getCodexScopeRateLimitedUntil(conn.providerSpecificData, model);
      const scopeRateLimitedUntil = persistedScopeUntil || getUnavailableUntil(cooldownMs);
      const scopeCooldownMs = Math.max(new Date(scopeRateLimitedUntil).getTime() - Date.now(), 0);

      await updateProviderConnection(connectionId, {
        testStatus: "unavailable",
        lastError: errorMsg,
        errorCode: status,
        lastErrorAt: new Date().toISOString(),
        backoffLevel: newBackoffLevel ?? backoffLevel,
        providerSpecificData: {
          ...conn.providerSpecificData,
          codexScopeRateLimitedUntil: {
            ...existingScopeMap,
            [scope]: scopeRateLimitedUntil,
          },
        },
      });

      if (scopeCooldownMs > 0) {
        lockModel(provider, connectionId, model, reason || "unknown", scopeCooldownMs);
      }

      if (status && errorMsg) {
        console.error(`❌ ${provider} [${status}] (${scope}): ${errorMsg}`);
      }

      return { shouldFallback: true, cooldownMs: scopeCooldownMs };
    }

    const baseUpdate = {
      lastError: errorMsg,
      lastErrorType: providerErrorType,
      errorCode: status,
      lastErrorAt: new Date().toISOString(),
      backoffLevel: newBackoffLevel ?? backoffLevel,
    };
    const persistUnavailableState = options.persistUnavailableState !== false;

    if (!persistUnavailableState) {
      // Combo-managed transient failure (e.g. 429): keep the connection clean in
      // the DB, but record an in-memory model lockout so credential selection
      // skips this exact provider+connection+model while it cools down — other
      // models on the same connection stay usable.
      if (provider && model && cooldownMs > 0) {
        lockModel(provider, connectionId, model, reason || "unknown", cooldownMs);
      }
      await updateProviderConnection(connectionId, {
        ...baseUpdate,
      });
    } else if (cooldownMs > 0 && !disableCooling) {
      await updateProviderConnection(connectionId, {
        ...baseUpdate,
        rateLimitedUntil: getUnavailableUntil(cooldownMs),
        testStatus: "unavailable",
      });
    } else {
      await updateProviderConnection(connectionId, {
        ...baseUpdate,
        rateLimitedUntil: null,
        ...(terminalStatus ? { testStatus: terminalStatus } : {}),
      });
    }

    // T-AUTODISABLE: If auto-disable setting is enabled and error is permanent/terminal,
    // mark account as inactive so it is never retried again.
    // Uses getCachedSettings() to avoid DB overhead on hot error path.
    // NOTE: For permanent bans we disable immediately — no threshold needed,
    // because a permanent ban (403 "Verify your account" / ToS violation) will
    // NEVER recover, so retrying is pointless regardless of attempt count.
    if ((result as { permanent?: boolean }).permanent) {
      try {
        const settings = await getCachedSettings();
        const autoDisableEnabled = settings.autoDisableBannedAccounts ?? false;
        if (autoDisableEnabled) {
          await updateProviderConnection(connectionId, { isActive: false });
          log.info(
            "AUTH",
            `Auto-disabled ${connectionId.slice(0, 8)} — permanent ban detected (autoDisableBannedAccounts=true)`
          );
        }
      } catch (e) {
        log.info("AUTH", `Auto-disable check failed (non-fatal): ${e}`);
      }
    }

    if (provider && status && errorMsg) {
      console.error(`❌ ${provider} [${status}]: ${errorMsg}`);
    }

    return { shouldFallback: true, cooldownMs };
  } finally {
    if (resolveMutex) resolveMutex();
    // Cleanup stale mutex entries (avoid memory leak)
    markMutexes.delete(connectionId);
  }
}

/**
 * Clear account error status (only if currently has error)
 * Optimized to avoid unnecessary DB updates
 */
export async function clearAccountError(
  connectionId: string,
  currentConnection: Partial<RecoverableConnectionState>
) {
  // Only update if currently has error status
  const hasError =
    (currentConnection.testStatus && currentConnection.testStatus !== "active") ||
    currentConnection.lastError ||
    currentConnection.rateLimitedUntil ||
    currentConnection.errorCode ||
    currentConnection.lastErrorType ||
    currentConnection.lastErrorSource;

  if (!hasError) return; // Skip if already clean

  await updateProviderConnection(connectionId, {
    testStatus: "active",
    lastError: null,
    lastErrorAt: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    rateLimitedUntil: null,
    backoffLevel: 0,
  });
  log.info("AUTH", `Account ${connectionId.slice(0, 8)} error cleared`);
}

/**
 * Optional CAS token. When provided, the clear is performed via an atomic
 * conditional UPDATE (clearConnectionErrorIfUnchanged) that aborts if the row
 * was written by a concurrent path between the caller's snapshot read and this
 * clear. Closes the TOCTOU window in the quota-recovery path. When omitted,
 * the clear is unconditional (preserves existing post-success-call behavior).
 */
export interface RecoveredStateExpectation {
  testStatus: string | null;
  lastErrorAt: string | null;
  rateLimitedUntil: string | null;
}

export async function clearRecoveredProviderState(
  credentials: Partial<RecoverableConnectionState> | null,
  expectedState?: RecoveredStateExpectation
): Promise<{ applied: boolean }> {
  if (!credentials?.connectionId) return { applied: false };
  if (expectedState) {
    const applied = await clearConnectionErrorIfUnchanged(credentials.connectionId, expectedState);
    if (!applied) {
      log.info(
        "AUTH",
        `Skipped recovery clear for ${credentials.connectionId.slice(0, 8)} — state changed concurrently (CAS miss)`
      );
      return { applied: false };
    }
    log.info("AUTH", `Account ${credentials.connectionId.slice(0, 8)} error cleared (CAS)`);
    return { applied: true };
  }
  await clearAccountError(credentials.connectionId, credentials);
  return { applied: true };
}

type AuthRequestHeaders = Headers | Record<string, string | string[] | undefined>;

type AuthRequestLike = {
  headers?: AuthRequestHeaders | null;
  url?: string | null;
};

function readNonEmptyUrlToken(request: AuthRequestLike): string | null {
  if (typeof request?.url !== "string" || request.url.trim().length === 0) return null;

  try {
    const url = new URL(request.url, "http://localhost");

    const segments = url.pathname
      .split("/")
      .map((segment) => segment.trim())
      .filter(Boolean);

    if (segments[0] === "vscode" && segments[1]) {
      const decodedSegment = decodeURIComponent(segments[1]).trim();
      if (decodedSegment.length > 0) return decodedSegment;
    }

    if (segments[0] === "api" && segments[1] === "v1" && segments[2] === "vscode") {
      if (segments[3] && segments[3] !== "raw" && segments[3] !== "combos") {
        const decodedSegment = decodeURIComponent(segments[3]).trim();
        if (decodedSegment.length > 0) return decodedSegment;
      }

      if ((segments[3] === "raw" || segments[3] === "combos") && segments[4]) {
        const decodedSegment = decodeURIComponent(segments[4]).trim();
        if (decodedSegment.length > 0) return decodedSegment;
      }
    }

    // NOTE: query-string token fallbacks (`?token=`/`?key=`/`?apiKey=`/`?api_key=`)
    // were intentionally REMOVED. They are a broad credential-in-URL surface that
    // leaks into access logs, Referer headers and proxy logs, and — because this
    // extractor also feeds management auth — would let `?token=<mgmt-key>`
    // authenticate management routes. The VS Code integration only needs the
    // path-scoped `/vscode/<token>/…` form above. (security review, #3300 follow-up)
  } catch {
    return null;
  }

  return null;
}

/**
 * Extract API key from request auth inputs.
 *
 * Honors explicit auth headers and (for client-facing routes only) a
 * path-scoped URL token:
 * - `Authorization: Bearer <key>` (OpenAI / OmniRoute / Codex CLI / Bearer clients)
 * - `x-api-key: <key>` (Anthropic Messages API contract — Claude Code,
 *   `@anthropic-ai/sdk`, any SDK that sets `anthropic-version`)
 * - `/vscode/<key>/...` (path-scoped tokenized aliases — only when `allowUrl`)
 *
 * When multiple inputs are present, explicit auth headers win.
 *
 * The `x-api-key` fallback only triggers when the request also carries an
 * `anthropic-version` header — the documented signal that the caller is
 * speaking the Anthropic Messages API contract. Without this scoping,
 * non-Anthropic SDKs that happen to set `x-api-key` (or local-mode tools
 * with placeholder keys) would be treated as authenticated attempts and
 * rejected by per-route gates that compare against OmniRoute keys.
 *
 * `opts.allowUrl` (default `true`) gates the path-scoped URL token. Management
 * auth MUST pass `allowUrl: false` — a credential in the URL must never
 * authenticate a management route (it leaks into logs/Referer and would widen
 * the management surface). See the #3300 security follow-up.
 */
export function extractApiKey(request: AuthRequestLike, opts?: { allowUrl?: boolean }) {
  const authHeader =
    readHeaderValue(request?.headers, "Authorization") ||
    readHeaderValue(request?.headers, "authorization");
  if (typeof authHeader === "string") {
    const trimmedHeader = authHeader.trim();
    if (trimmedHeader.toLowerCase().startsWith("bearer ")) {
      return trimmedHeader.slice(7).trim() || null;
    }
  }

  // Issue #2225: Anthropic Messages API clients authenticate via x-api-key.
  // Gate the fallback on the anthropic-version header so we don't trip up
  // local-mode requests from non-Anthropic clients that send placeholder
  // x-api-key values (which would otherwise be rejected as Invalid API key).
  const anthropicVersion =
    readHeaderValue(request?.headers, "anthropic-version") ||
    readHeaderValue(request?.headers, "Anthropic-Version");
  if (anthropicVersion) {
    const xApiKey =
      readHeaderValue(request?.headers, "x-api-key") ||
      readHeaderValue(request?.headers, "X-Api-Key");
    if (typeof xApiKey === "string") {
      const trimmed = xApiKey.trim();
      if (trimmed.length > 0) return trimmed;
    }
  }

  if (opts?.allowUrl === false) return null;
  return readNonEmptyUrlToken(request);
}

/**
 * Validate API key (optional - for local use can skip).
 * Feature #1350: Supports OMNIROUTE_API_KEY / ROUTER_API_KEY env vars as
 * persistent passthrough keys that always validate, surviving Docker
 * restarts and backup restores without DB dependency.
 */
export async function isValidApiKey(apiKey: string) {
  if (!apiKey) return false;

  // Persistent env-var key — always valid regardless of DB state (#1350)
  const envKey = process.env.OMNIROUTE_API_KEY || process.env.ROUTER_API_KEY;
  if (envKey && apiKey === envKey) return true;

  return await validateApiKey(apiKey);
}
