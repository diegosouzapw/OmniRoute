import {
  getProviderConnections,
  validateApiKey,
  updateProviderConnection,
  getSettings,
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

const CODEX_QUOTA_THRESHOLD_PERCENT = 90;

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
  allowedConnections: string[] | null = null
) {
  // Acquire mutex to prevent race conditions
  const currentMutex = selectionMutex;
  let resolveMutex: (() => void) | undefined;
  selectionMutex = new Promise((resolve) => {
    resolveMutex = resolve;
  });

  try {
    await currentMutex;

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

    // Filter out unavailable accounts and excluded connection
    const availableConnections = connections.filter((c) => {
      if (excludeConnectionId && c.id === excludeConnectionId) return false;
      if (isAccountUnavailable(c.rateLimitedUntil)) return false;
      return true;
    });

    log.debug(
      "AUTH",
      `${provider} | available: ${availableConnections.length}/${connections.length}`
    );
    connections.forEach((c) => {
      const excluded = excludeConnectionId && c.id === excludeConnectionId;
      const rateLimited = isAccountUnavailable(c.rateLimitedUntil);
      if (excluded || rateLimited) {
        log.debug(
          "AUTH",
          `  → ${c.id?.slice(0, 8)} | ${excluded ? "excluded" : ""} ${rateLimited ? `rateLimited until ${c.rateLimitedUntil}` : ""}`
        );
      }
    });

    if (availableConnections.length === 0) {
      const earliest = getEarliestRateLimitedUntil(connections);
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
    if (provider === "codex") {
      const blockedByPolicy: Array<{
        id: string;
        reasons: string[];
        resetAt: string | null;
      }> = [];

      policyEligibleConnections = availableConnections.filter((connection) => {
        const policy = getCodexLimitPolicy(connection.providerSpecificData);
        const sessionStatus = policy.use5h
          ? getQuotaWindowStatus(connection.id, "session", CODEX_QUOTA_THRESHOLD_PERCENT)
          : null;
        const weeklyStatus = policy.useWeekly
          ? getQuotaWindowStatus(connection.id, "weekly", CODEX_QUOTA_THRESHOLD_PERCENT)
          : null;

        const reasons: string[] = [];
        const resetCandidates: Array<string | null> = [];

        if (policy.use5h && sessionStatus?.reachedThreshold) {
          reasons.push(`5h usage ${Math.round(sessionStatus.usedPercentage)}%`);
          resetCandidates.push(sessionStatus.resetAt);
        }

        if (policy.useWeekly && weeklyStatus?.reachedThreshold) {
          reasons.push(`weekly usage ${Math.round(weeklyStatus.usedPercentage)}%`);
          resetCandidates.push(weeklyStatus.resetAt);
        }

        if (reasons.length > 0) {
          const nextResetAt = getEarliestFutureDate(resetCandidates);

          blockedByPolicy.push({
            id: connection.id,
            reasons,
            resetAt: nextResetAt,
          });
          return false;
        }

        return true;
      });

      if (blockedByPolicy.length > 0) {
        log.info(
          "AUTH",
          `${provider} | quota policy filtered ${blockedByPolicy.length} account(s): ${blockedByPolicy
            .map((entry) => `${entry.id.slice(0, 8)}(${entry.reasons.join(", ")})`)
            .join("; ")}`
        );
      }

      if (policyEligibleConnections.length === 0 && availableConnections.length > 0) {
        const earliestResetAt = getEarliestFutureDate(
          blockedByPolicy.map((entry) => entry.resetAt)
        );
        const earliestResetMs = parseFutureDateMs(earliestResetAt);

        const retryAfter = earliestResetMs
          ? new Date(earliestResetMs).toISOString()
          : new Date(Date.now() + 5 * 60 * 1000).toISOString();

        return {
          allRateLimited: true,
          retryAfter,
          retryAfterHuman: formatRetryAfter(retryAfter),
          lastError: "All Codex accounts reached configured quota threshold",
          lastErrorCode: 429,
        };
      }
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
          const sortedByOldest = [...orderedConnections].sort((a: any, b: any) => {
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
        const sortedByOldest = [...orderedConnections].sort((a: any, b: any) => {
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

    const { shouldFallback, cooldownMs, newBackoffLevel, reason } = checkFallbackError(
      status,
      errorText,
      backoffLevel,
      model,
      provider // ← Now passes provider for profile-aware cooldowns
    );
    if (!shouldFallback) return { shouldFallback: false, cooldownMs: 0 };

    const rateLimitedUntil = getUnavailableUntil(cooldownMs);
    const errorMsg = typeof errorText === "string" ? errorText.slice(0, 100) : "Provider error";

    await updateProviderConnection(connectionId, {
      rateLimitedUntil,
      testStatus: "unavailable",
      lastError: errorMsg,
      errorCode: status,
      lastErrorAt: new Date().toISOString(),
      backoffLevel: newBackoffLevel ?? backoffLevel,
    });

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
