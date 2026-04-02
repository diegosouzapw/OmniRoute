import {
  getProviderConnections,
  validateApiKey,
  updateProviderConnection,
  getSettings,
  getCachedSettings,
} from "@/lib/localDb";
import { getQuotaWindowStatus, isAccountQuotaExhausted } from "@/domain/quotaCache";
import {
  isAccountUnavailable,
  getUnavailableUntil,
  getEarliestRateLimitedUntil,
  formatRetryAfter,
  checkFallbackError,
  isModelLocked,
  lockModel,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isLocalProvider, getPassthroughProviders } from "@omniroute/open-sse/config/providerRegistry.ts";
import { COOLDOWN_MS } from "@omniroute/open-sse/config/constants.ts";
import { getCodexModelScope } from "@omniroute/open-sse/executors/codex.ts";
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
}

const CODEX_QUOTA_THRESHOLD_PERCENT = 90;
const MIN_QUOTA_THRESHOLD_PERCENT = 1;
const MAX_QUOTA_THRESHOLD_PERCENT = 100;

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

    const connectionsRaw = await getProviderConnections({ provider, isActive: true });
    let connections = (Array.isArray(connectionsRaw) ? connectionsRaw : [])
      .map(toProviderConnection)
      .filter((conn) => conn.id.length > 0);
    // allowedConnections: restrict to specific connection IDs (from API key policy, #363)
    if (allowedConnections && allowedConnections.length > 0) {
      connections = connections.filter((conn) => allowedConnections.includes(conn.id));
    }
    log.debug(
      "AUTH",
      `${provider} | total connections: ${connections.length}, excludeId: ${excludeConnectionId || "none"}`
    );

    if (connections.length === 0) {
      // Check all connections (including inactive) to see if rate limited
      const allConnectionsRaw = await getProviderConnections({ provider });
      const allConnections = (Array.isArray(allConnectionsRaw) ? allConnectionsRaw : [])
        .map(toProviderConnection)
        .filter((conn) => conn.id.length > 0);
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
      if (excludeConnectionId && c.id === excludeConnectionId) return false;
      if (!allowSuppressedConnections) {
        if (isAccountUnavailable(c.rateLimitedUntil)) return false;
        if (isTerminalConnectionStatus(c)) return false;
        if (provider === "codex" && isCodexScopeUnavailable(c, requestedModel)) return false;
      }
      return true;
    });

    log.debug(
      "AUTH",
      `${provider} | available: ${availableConnections.length}/${connections.length}`
    );
    connections.forEach((c) => {
      const excluded = excludeConnectionId && c.id === excludeConnectionId;
      const rateLimited = isAccountUnavailable(c.rateLimitedUntil);
      const terminalStatus = isTerminalConnectionStatus(c);
      const codexScopeLimited = provider === "codex" && isCodexScopeUnavailable(c, requestedModel);
      if (excluded || rateLimited) {
        log.debug(
          "AUTH",
          `  → ${c.id?.slice(0, 8)} | ${excluded ? "excluded" : ""} ${rateLimited ? `rateLimited until ${c.rateLimitedUntil}` : ""}${allowSuppressedConnections && rateLimited ? " (retained for combo live test)" : ""}`
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
      }
    });

    if (availableConnections.length === 0) {
      const earliest =
        getEarliestRateLimitedUntil(connections) ||
        (provider === "codex"
          ? getEarliestCodexScopeRateLimitedUntil(connections, requestedModel)
          : null);
      if (earliest) {
        // Find the connection with the earliest rateLimitedUntil to get its error info
        const rateLimitedConns = connections.filter(
          (c) => c.rateLimitedUntil && new Date(c.rateLimitedUntil).getTime() > Date.now()
        );
        const earliestConn = rateLimitedConns.sort(
          (a, b) =>
            new Date(a.rateLimitedUntil || 0).getTime() -
            new Date(b.rateLimitedUntil || 0).getTime()
        )[0];
        log.warn(
          "AUTH",
          `${provider} | all ${connections.length} active accounts rate limited (${formatRetryAfter(earliest)}) | lastErrorCode=${earliestConn?.errorCode}, lastError=${earliestConn?.lastError?.slice(0, 50)}`
        );
        return {
          allRateLimited: true,
          retryAfter: earliest,
          retryAfterHuman: formatRetryAfter(earliest),
          lastError: earliestConn?.lastError || null,
          lastErrorCode: earliestConn?.errorCode || null,
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
      // Power of Two Choices: pick 2 random, choose the one with fewer failures
      if (orderedConnections.length <= 2) {
        connection = orderedConnections[0];
      } else {
        const i = Math.floor(Math.random() * orderedConnections.length);
        let j = Math.floor(Math.random() * (orderedConnections.length - 1));
        if (j >= i) j++;
        const a = orderedConnections[i];
        const b = orderedConnections[j];
        // Prefer the one with fewer consecutive uses / better health
        const scoreA = (a.consecutiveUseCount || 0) + (a.lastError ? 10 : 0);
        const scoreB = (b.consecutiveUseCount || 0) + (b.lastError ? 10 : 0);
        connection = scoreA <= scoreB ? a : b;
      }
    } else if (strategy === "random") {
      // Random: Fisher-Yates-inspired random pick
      const idx = Math.floor(Math.random() * orderedConnections.length);
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
    };
  } finally {
    if (resolveMutex) resolveMutex();
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
  model: string | null = null
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

    const result = checkFallbackError(
      status,
      errorText,
      backoffLevel,
      model,
      provider // ← Now passes provider for profile-aware cooldowns
    );
    const { shouldFallback, cooldownMs, newBackoffLevel, reason } = result;
    if (!shouldFallback) return { shouldFallback: false, cooldownMs: 0 };

    // ── 404 model-only lockout: connection stays active ──
    // For local providers (detected by URL) and cloud providers with passthrough models
    // (like Antigravity), a 404 means the specific model doesn't exist or isn't available
    // for this account — it should NOT lock out the entire connection.
    const connBaseUrl = (conn?.providerSpecificData as Record<string, unknown>)?.baseUrl as
      | string
      | undefined;

    const isPassthroughProvider = provider && getPassthroughProviders().has(provider);
    if ((isLocalProvider(connBaseUrl) || isPassthroughProvider) && status === 404 && provider && model) {
      const localCooldown = COOLDOWN_MS.notFoundLocal;
      lockModel(provider, connectionId, model, "not_found", localCooldown);
      log.info(
        "AUTH",
        `Model-only lockout for ${model} — 404 lockout ${localCooldown / 1000}s (connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: localCooldown };
    }

    // ── 429 model-only lockout for passthrough providers ──
    // For passthrough providers like Antigravity, each model has independent quota.
    // A 429 on one model should NOT lock out the entire connection — other models
    // may still have quota available. Use lockModel() instead of connection-wide
    // rateLimitedUntil, same pattern as the 404 model-only lockout above.
    if (isPassthroughProvider && status === 429 && provider && model) {
      const modelCooldown = cooldownMs || COOLDOWN_MS.rateLimit;
      lockModel(provider, connectionId, model, reason || "rate_limited", modelCooldown);
      log.info(
        "AUTH",
        `Model-only lockout for ${model} — 429 rate limit ${Math.ceil(modelCooldown / 1000)}s (connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: modelCooldown };
    }

    const rateLimitedUntil = getUnavailableUntil(cooldownMs);
    const errorMsg = typeof errorText === "string" ? errorText.slice(0, 100) : "Provider error";

    // T09: Codex per-scope lockout (do not block the whole account globally).
    if (provider === "codex" && status === 429 && model && conn) {
      const scope = getCodexModelScope(model);
      const existingScopeMap = asRecord(conn.providerSpecificData.codexScopeRateLimitedUntil);
      const persistedScopeUntil = getCodexScopeRateLimitedUntil(conn.providerSpecificData, model);
      const scopeRateLimitedUntil = persistedScopeUntil || rateLimitedUntil;
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

    await updateProviderConnection(connectionId, {
      rateLimitedUntil,
      testStatus: "unavailable",
      lastError: errorMsg,
      errorCode: status,
      lastErrorAt: new Date().toISOString(),
      backoffLevel: newBackoffLevel ?? backoffLevel,
    });

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

    // Per-model lockout: lock the specific model if known
    if (provider && model && cooldownMs > 0) {
      lockModel(provider, connectionId, model, reason || "unknown", cooldownMs);
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
 */
export function extractApiKey(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}

/**
 * Validate API key (optional - for local use can skip)
 */
export async function isValidApiKey(apiKey: string) {
  if (!apiKey) return false;
  return await validateApiKey(apiKey);
}
