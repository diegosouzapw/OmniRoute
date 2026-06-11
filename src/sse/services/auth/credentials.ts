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

import { compareP2CConnections, selectSessionAffinityConnection } from "./scoring.ts";
import { normalizeStatus, isTerminalConnectionStatus, parseFutureDateMs, getEarliestFutureDate, isRetryableModelLockoutReason } from "./connectionStatus.ts";
import { asRecord, toNumber, toProviderConnection, normalizeExcludedConnectionIds, buildQuotaPreflightRateLimitedResult } from "./utils.ts";
import { ProviderConnectionView, CredentialSelectionOptions, CooldownInspectionState } from "./types.ts";
import { getSelectionMutexKey, createSelectionLock } from "./selectionLocks.ts";
import { maybeSyntheticNoAuthFallback } from "./syntheticFallback.ts";
import { formatSessionKeyForLog } from "./sessionAffinity.ts";
import { getCodexScopeRateLimitedUntil, isCodexScopeUnavailable, evaluateQuotaLimitPolicy } from "./quotaLimits.ts";

/**
 * Resolve provider aliases (e.g., nvidia -> nvidia_nim) for DB lookup
 */
async export function getProviderSearchPool(provider: string): Promise<string[]> {
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
      return maybeSyntheticNoAuthFallback(resolvedId, excludedForNoAuth);
    }

    const allowSuppressedConnections = options.allowSuppressedConnections === true;
    const allowRateLimitedConnections =
      allowSuppressedConnections || options.allowRateLimitedConnections === true;
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

        // If every existing connection is in a terminal state (expired/banned/
        // credits_exhausted), surface that as a re-auth signal instead of the
        // generic "No credentials" 400. The classic case is AWS SSO/Kiro
        // refresh tokens hitting their 90-day TTL: all connections flip to
        // is_active=0 with testStatus=banned|expired, and without this branch
        // the dashboard sees a misleading "bad_request" code.
        const terminalConnections = allConnections.filter(isTerminalConnectionStatus);
        if (terminalConnections.length === allConnections.length) {
          const syntheticFallback = maybeSyntheticNoAuthFallback(resolvedId, excludedConnectionIds);
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
      const syntheticFallback = maybeSyntheticNoAuthFallback(resolvedId, excludedConnectionIds);
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
      const syntheticFallback = maybeSyntheticNoAuthFallback(resolvedId, excludedConnectionIds);
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

    // Quota-aware: filter out accounts with exhausted quota
    const withQuota = policyEligibleConnections.filter((c) => !isAccountQuotaExhausted(c.id));
    const exhaustedQuota = policyEligibleConnections.filter((c) => isAccountQuotaExhausted(c.id));

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

    const settings = await getSettings();
    const strategy = settings.fallbackStrategy || "fill-first";
    const sessionAffinityTtlMs =
      provider === "codex"
        ? Number.isFinite(Number(options.sessionAffinityTtlMs)) &&
          Number(options.sessionAffinityTtlMs) > 0
          ? Number(options.sessionAffinityTtlMs)
          : Number.isFinite(Number(settings.codexSessionAffinityTtlMs)) &&
              Number(settings.codexSessionAffinityTtlMs) > 0
            ? Number(settings.codexSessionAffinityTtlMs)
            : 0
        : 0;

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

    const apiKeyHealth = connection.providerSpecificData?.apiKeyHealth as
      | Record<string, KeyHealth>
      | undefined;
    if (apiKeyHealth) {
      syncHealthFromDB(connection.id, apiKeyHealth);
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
        const override = perConnectionWindowOverrides[windowName];
        if (typeof override === "number") return override;
        const providerDefault = providerWindowMap[windowName];
        if (typeof providerDefault === "number") return providerDefault;
      }
      return defaultThresholdPercent;
    };
    const preflight = await preflightQuota(provider, connectionId, credentials, {
      resolveMinRemainingPercent,
      resolveWarnRemainingPercent: () => warnThresholdPercent,
    });
    if (preflight.proceed) {
      return credentials;
    }

    blockedByPreflight.push({
      id: connectionId,
      quotaPercent: preflight.quotaPercent,
      resetAt: preflight.resetAt ?? null,
    });
    excludedConnectionIds.add(connectionId);

    log.info(
      "AUTH",
      `${provider} | preflight blocked ${connectionId.slice(0, 8)}${
        Number.isFinite(preflight.quotaPercent)
          ? ` at ${Math.round((preflight.quotaPercent as number) * 100)}%`
          : ""
      }`
    );
  }
}