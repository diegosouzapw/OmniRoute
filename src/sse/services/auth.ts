import {
  getProviderConnections,
  validateApiKey,
  updateProviderConnection,
  getSettings,
} from "@/lib/localDb";
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

// Mutex to prevent race conditions during account selection
let selectionMutex = Promise.resolve();

// ─── Anti-Thundering Herd: per-connection mutex for markAccountUnavailable ───
// Prevents multiple concurrent requests from marking the same connection
// unavailable in parallel, which was the root cause of cascading 502 lockouts.
const markMutexes = new Map<string, Promise<void>>();

/**
 * Get provider credentials from localDb
 * Filters out unavailable accounts and returns the selected account based on strategy
 * @param {string} provider - Provider name
 * @param {string|null} excludeConnectionId - Connection ID to exclude (for retry with next account)
 */
export async function getProviderCredentials(provider: string, excludeConnectionId: string | null = null) {
  // Acquire mutex to prevent race conditions
  const currentMutex = selectionMutex;
  let resolveMutex: (() => void) | undefined;
  selectionMutex = new Promise((resolve) => {
    resolveMutex = resolve;
  });

  try {
    await currentMutex;

    const connections = await getProviderConnections({ provider, isActive: true });
    log.debug(
      "AUTH",
      `${provider} | total connections: ${connections.length}, excludeId: ${excludeConnectionId || "none"}`
    );

    if (connections.length === 0) {
      // Check all connections (including inactive) to see if rate limited
      const allConnections = await getProviderConnections({ provider });
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
          (a: any, b: any) => new Date(a.rateLimitedUntil).getTime() - new Date(b.rateLimitedUntil).getTime()
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

    const settings = await getSettings();
    const strategy = settings.fallbackStrategy || "fill-first";

    let connection;
    if (strategy === "round-robin") {
      const stickyLimit = settings.stickyRoundRobinLimit || 3;

      // Sort by lastUsed (most recent first) to find current candidate
      const byRecency = [...availableConnections].sort((a: any, b: any) => {
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
        // Update lastUsedAt and increment count (await to ensure persistence)
        await updateProviderConnection(connection.id, {
          lastUsedAt: new Date().toISOString(),
          consecutiveUseCount: (connection.consecutiveUseCount || 0) + 1,
        });
      } else {
        // Pick the least recently used (excluding current if possible)
        const sortedByOldest = [...availableConnections].sort((a: any, b: any) => {
          if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
          if (!a.lastUsedAt) return -1;
          if (!b.lastUsedAt) return 1;
          return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
        });

        connection = sortedByOldest[0];

        // Update lastUsedAt and reset count to 1 (await to ensure persistence)
        await updateProviderConnection(connection.id, {
          lastUsedAt: new Date().toISOString(),
          consecutiveUseCount: 1,
        });
      }
    } else {
      // Default: fill-first (already sorted by priority in getProviderConnections)
      connection = availableConnections[0];
    }

    return {
      apiKey: connection.apiKey,
      accessToken: connection.accessToken,
      refreshToken: connection.refreshToken,
      expiresAt: connection.tokenExpiresAt || connection.expiresAt || null,
      projectId: connection.projectId,
      copilotToken: connection.providerSpecificData?.copilotToken,
      providerSpecificData: connection.providerSpecificData,
      connectionId: connection.id,
      // Include current status for optimization check
      testStatus: connection.testStatus,
      lastError: connection.lastError,
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
    const connections = await getProviderConnections({ provider });
    const conn = connections.find((c) => c.id === connectionId);
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
export async function clearAccountError(connectionId: string, currentConnection: any) {
  // Only update if currently has error status
  const hasError =
    currentConnection.testStatus === "unavailable" ||
    currentConnection.lastError ||
    currentConnection.rateLimitedUntil;

  if (!hasError) return; // Skip if already clean

  await updateProviderConnection(connectionId, {
    testStatus: "active",
    lastError: null,
    lastErrorAt: null,
    rateLimitedUntil: null,
    backoffLevel: 0,
  });
  log.info("AUTH", `Account ${connectionId.slice(0, 8)} error cleared`);
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
