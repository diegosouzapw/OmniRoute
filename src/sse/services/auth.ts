import { randomUUID } from "crypto";
import {
  getProviderConnections,
  validateApiKey,
  updateProviderConnection,
  getSettings,
  getCachedSettings,
} from "@/lib/localDb";
import { getQuotaCache, getQuotaWindowStatus, isAccountQuotaExhausted } from "@/domain/quotaCache";
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
import { preflightQuota } from "@omniroute/open-sse/services/quotaPreflight.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "@omniroute/open-sse/services/errorClassifier.ts";
import { getCodexModelScope } from "@omniroute/open-sse/executors/codex.ts";
import { getProviderAlias, resolveProviderId } from "@/shared/constants/providers";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import * as log from "../utils/logger";
import { fisherYatesShuffle, getNextFromDeckSync } from "@/shared/utils/shuffleDeck";

type JsonRecord = Record<string, unknown>;

interface ProviderConnectionView {
  id: string;
  isActive: boolean;
  rateLimitedUntil: string | null;
  testStatus: string | null;
  apiKey: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: string | null;
  expiresAt: string | null;
  projectId: string | null;
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
  bypassQuotaPolicy?: boolean;
  forcedConnectionId?: string | null;
  excludeConnectionIds?: string[] | null;
}

interface CooldownInspectionState {
  connection: ProviderConnectionView;
  connectionCooldownMs: number | null;
  codexScopeCooldownMs: number | null;
  retryableModelCooldownMs: number | null;
}

const CODEX_QUOTA_THRESHOLD_PERCENT = 90;
const MIN_QUOTA_THRESHOLD_PERCENT = 1;
const MAX_QUOTA_THRESHOLD_PERCENT = 100;
const NON_RETRYABLE_MODEL_LOCKOUT_REASONS = new Set(["not_found", "not_found_local"]);

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
  return {
    id: toStringOrNull(row.id) || "",
    isActive: row.isActive === true,
    rateLimitedUntil: toStringOrNull(row.rateLimitedUntil),
    testStatus: toStringOrNull(row.testStatus),
    apiKey: toStringOrNull(row.apiKey),
    accessToken: toStringOrNull(row.accessToken),
    refreshToken: toStringOrNull(row.refreshToken),
    tokenExpiresAt: toStringOrNull(row.tokenExpiresAt),
    expiresAt: toStringOrNull(row.expiresAt),
    projectId: toStringOrNull(row.projectId),
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
  };
}

function toBooleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
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

function normalizeQuotaThreshold(value: unknown, fallback = CODEX_QUOTA_THRESHOLD_PERCENT): number {
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
  return normalized;
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
  if (result.permanent || providerErrorType === PROVIDER_ERROR_TYPES.FORBIDDEN || status === 403) {
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

function parseFutureDateMs(value: string | null): number | null {
  if (!value) return null;
  const ms = new Date(value).getTime();
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

function getConnectionQuotaHeadroomPercent(
  provider: string,
  connection: ProviderConnectionView
): number | null {
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  const percentages: number[] = [];
  const seenWindows = new Set<string>();

  const collectWindow = (windowName: string) => {
    const normalizedWindow = normalizeWindowName(windowName);
    if (!normalizedWindow || seenWindows.has(normalizedWindow)) return;
    seenWindows.add(normalizedWindow);

    const status = getQuotaWindowStatus(connection.id, normalizedWindow, policy.thresholdPercent);
    if (!status) return;
    percentages.push(Math.max(0, Math.min(100, status.remainingPercentage)));
  };

  for (const windowName of policy.windows) {
    collectWindow(windowName);
  }

  if (percentages.length > 0) {
    return Math.min(...percentages);
  }

  const quotaEntry = getQuotaCache(connection.id) as QuotaCacheView | null;
  const rawQuotas = quotaEntry?.quotas || {};
  for (const quota of Object.values(rawQuotas)) {
    if (!quota) continue;
    const resetAt = toStringOrNull(quota.resetAt);
    if (resetAt) {
      const resetMs = new Date(resetAt).getTime();
      if (Number.isFinite(resetMs) && resetMs <= Date.now()) {
        continue;
      }
    }
    const remaining = toNumber(quota.remainingPercentage, Number.NaN);
    if (Number.isFinite(remaining)) {
      percentages.push(Math.max(0, Math.min(100, remaining)));
    }
  }

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
  connection: ProviderConnectionView
): { score: number; quotaHeadroomPercent: number | null } {
  const quotaBlocked = evaluateQuotaLimitPolicy(provider, connection).blocked;
  const quotaExhausted = isAccountQuotaExhausted(connection.id);
  const quotaHeadroomPercent = getConnectionQuotaHeadroomPercent(provider, connection);

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
  b: ProviderConnectionView
): number {
  const aScore = getP2CConnectionScore(provider, a);
  const bScore = getP2CConnectionScore(provider, b);
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

// Mutex to prevent race conditions during account selection
let selectionMutex = Promise.resolve();

// ─── Anti-Thundering Herd: per-connection mutex for markAccountUnavailable ───
// Prevents multiple concurrent requests from marking the same connection
// unavailable in parallel, which was the root cause of cascading 502 lockouts.
const markMutexes = new Map<string, Promise<void>>();

// Strict-Random shuffle deck moved to src/shared/utils/shuffleDeck.ts
// auth.ts uses getNextFromDeckSync (already inside selectionMutex).
// Re-export for backwards compat with existing test imports.
export { fisherYatesShuffle, getNextFromDeckSync as getNextFromDeck };

/**
 * Resolve provider aliases (e.g., nvidia -> nvidia_nim) for DB lookup
 */
function getProviderSearchPool(provider: string): string[] {
  const canonicalProvider = resolveProviderId(provider);
  const canonicalAlias = getProviderAlias(canonicalProvider);

  if (provider === "nvidia") {
    return ["nvidia", "nvidia_nim"];
  }
  if (provider === "nvidia_nim") {
    return ["nvidia_nim", "nvidia"];
  }

  return Array.from(new Set([provider, canonicalProvider, canonicalAlias].filter(Boolean)));
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
  // Acquire mutex to prevent race conditions
  const currentMutex = selectionMutex;
  let resolveMutex: (() => void) | undefined;
  selectionMutex = new Promise((resolve) => {
    resolveMutex = resolve;
  });

  try {
    await currentMutex;

    const allowSuppressedConnections = options.allowSuppressedConnections === true;
    const bypassQuotaPolicy = options.bypassQuotaPolicy === true;
    const forcedConnectionId =
      typeof options.forcedConnectionId === "string" && options.forcedConnectionId.trim().length > 0
        ? options.forcedConnectionId.trim()
        : null;
    const excludedConnectionIds = normalizeExcludedConnectionIds(
      excludeConnectionId,
      options.excludeConnectionIds
    );

    // Fix #922: Check for aliases (nvidia/nvidia_nim) to ensure credentials are found
    const providersToSearch = getProviderSearchPool(provider);
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
    if (forcedConnectionId) {
      connections = connections.filter((conn) => conn.id === forcedConnectionId);
    }
    log.debug(
      "AUTH",
      `${provider} | total connections: ${connections.length}, excludeIds: ${
        excludedConnectionIds.size > 0 ? Array.from(excludedConnectionIds).join(",") : "none"
      }, forcedId: ${forcedConnectionId || "none"}`
    );

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
      }
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

    // Filter out unavailable accounts and excluded connection
    const availableConnections = connections.filter((c) => {
      if (excludedConnectionIds.has(c.id)) return false;
      if (requestedModel && isModelExcludedByConnection(requestedModel, c.providerSpecificData)) {
        return false;
      }
      if (!allowSuppressedConnections) {
        if (isAccountUnavailable(c.rateLimitedUntil)) return false;
        if (isTerminalConnectionStatus(c)) return false;
        if (provider === "codex" && isCodexScopeUnavailable(c, requestedModel)) return false;
        // Per-model lockout: if this specific model is locked on this connection, skip it
        if (requestedModel && isModelLocked(provider, c.id, requestedModel)) return false;
      }
      return true;
    });

    log.debug(
      "AUTH",
      `${provider} | available: ${availableConnections.length}/${connections.length}`
    );
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
        };
      }
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
        const evaluation = evaluateQuotaLimitPolicy(provider, connection);
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

    // Quota-aware: prioritize accounts with available quota
    const withQuota = policyEligibleConnections.filter((c) => !isAccountQuotaExhausted(c.id));
    const exhaustedQuota = policyEligibleConnections.filter((c) => isAccountQuotaExhausted(c.id));
    const orderedConnections =
      withQuota.length > 0 ? [...withQuota, ...exhaustedQuota] : policyEligibleConnections;

    if (exhaustedQuota.length > 0) {
      log.debug(
        "AUTH",
        `${provider} | quota-aware: ${withQuota.length} with quota, ${exhaustedQuota.length} exhausted`
      );
    }

    const settings = await getSettings();
    const strategy = settings.fallbackStrategy || "fill-first";

    let connection;
    if (strategy === "round-robin") {
      const stickyLimit = toNumber((settings as Record<string, unknown>).stickyRoundRobinLimit, 3);

      // If excluding an account (fallback scenario), skip sticky logic and go straight to LRU
      // This prevents the system from getting stuck on a failed account
      const isFallbackScenario = excludeConnectionId !== null;

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
          `${provider} round-robin: FALLBACK MODE - excluded ${excludeConnectionId?.slice(0, 8)}..., picked LRU ${connection.id?.slice(0, 8)}...`
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
        connection = [...candidatePool].sort((a, b) => compareP2CConnections(provider, a, b))[0];
      } else {
        const i =
          parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % candidatePool.length;
        let j =
          parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % (candidatePool.length - 1);
        if (j >= i) j++;
        const a = candidatePool[i];
        const b = candidatePool[j];
        connection = compareP2CConnections(provider, a, b) <= 0 ? a : b;
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

    return {
      apiKey: connection.apiKey,
      accessToken: connection.accessToken,
      refreshToken: connection.refreshToken,
      expiresAt: connection.tokenExpiresAt || connection.expiresAt || null,
      projectId: connection.projectId,
      copilotToken:
        typeof connection.providerSpecificData.copilotToken === "string"
          ? connection.providerSpecificData.copilotToken
          : null,
      providerSpecificData: connection.providerSpecificData,
      connectionId: connection.id,
      // Include current status for optimization check
      testStatus: connection.testStatus,
      lastError: connection.lastError,
      lastErrorType: connection.lastErrorType,
      lastErrorSource: connection.lastErrorSource,
      errorCode: connection.errorCode,
      rateLimitedUntil: connection.rateLimitedUntil,
      maxConcurrent: connection.maxConcurrent,
    };
  } finally {
    if (resolveMutex) resolveMutex();
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

    if (credentials.allRateLimited) {
      return credentials;
    }

    const preflight = await preflightQuota(provider, credentials.connectionId, credentials);
    if (preflight.proceed) {
      return credentials;
    }

    blockedByPreflight.push({
      id: credentials.connectionId,
      quotaPercent: preflight.quotaPercent,
      resetAt: preflight.resetAt ?? null,
    });
    excludedConnectionIds.add(credentials.connectionId);

    log.info(
      "AUTH",
      `${provider} | preflight blocked ${credentials.connectionId.slice(0, 8)}${
        Number.isFinite(preflight.quotaPercent)
          ? ` at ${Math.round((preflight.quotaPercent as number) * 100)}%`
          : ""
      }`
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
  providerProfile = null
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
    if (conn?.rateLimitedUntil && new Date(conn.rateLimitedUntil).getTime() > Date.now()) {
      log.info(
        "AUTH",
        `${connectionId.slice(0, 8)} already marked unavailable (until ${conn.rateLimitedUntil}), skipping duplicate mark`
      );
      return {
        shouldFallback: true,
        cooldownMs: new Date(conn.rateLimitedUntil).getTime() - Date.now(),
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
      | boolean
      | undefined;

    const isPerModelQuotaProvider = hasPerModelQuota(provider, model, connectionPassthroughModels);
    if (isPerModelQuotaProvider && provider && model && (status === 404 || status === 429)) {
      const reason = status === 404 ? "not_found" : "rate_limited";
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        reason,
        status,
        status === 404
          ? (effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.notFoundLocal)
          : (fallbackResult.baseCooldownMs ?? effectiveProviderProfile?.baseCooldownMs ?? 0),
        effectiveProviderProfile,
        {
          exactCooldownMs:
            fallbackResult.usedUpstreamRetryHint === true ? fallbackResult.cooldownMs : null,
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
        effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.unavailable,
        effectiveProviderProfile
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

    const terminalStatus = resolveTerminalConnectionStatus(status, result, providerErrorType);
    const cooldownMs = terminalStatus ? 0 : rawCooldownMs;

    // ── 404 model-only lockout: connection stays active ──
    // For local providers (detected by URL), a 404 means the specific model
    // doesn't exist or isn't available for this account — it should NOT lock
    // out the entire connection.
    const connBaseUrl = (conn?.providerSpecificData as Record<string, unknown>)?.baseUrl as
      | string
      | undefined;

    if (isLocalProvider(connBaseUrl) && status === 404 && provider && model) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "not_found",
        status,
        COOLDOWN_MS.notFoundLocal,
        effectiveProviderProfile
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

    if (cooldownMs > 0) {
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
    if (result.permanent) {
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

export async function clearRecoveredProviderState(
  credentials: Partial<RecoverableConnectionState> | null
) {
  if (!credentials?.connectionId) return;
  await clearAccountError(credentials.connectionId, credentials);
}

/**
 * Extract API key from request headers
 * Follows management API standard: case-insensitive bearer matching and full trimming
 */
export function extractApiKey(request: Request) {
  const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");
  if (typeof authHeader === "string") {
    const trimmedHeader = authHeader.trim();
    if (trimmedHeader.toLowerCase().startsWith("bearer ")) {
      return trimmedHeader.slice(7).trim();
    }
  }
  return null;
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
