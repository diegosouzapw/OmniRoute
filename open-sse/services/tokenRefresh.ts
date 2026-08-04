// @ts-nocheck
//
// Per-provider refresh implementations live in ./tokenRefresh/providers/ (one
// file per provider) with shared helpers in ./tokenRefresh/shared.ts. This
// file keeps the orchestrator (refreshAccessToken, getAccessToken), the
// in-flight/rotation dedup maps, the CAS guard, and refreshWithRetry — the
// cross-provider plumbing. The provider-module split was originally proposed
// by KooshaPari in PR #7338, whose base was too old to merge as-is; this is an
// independent implementation of the same idea against the current tip, not a
// reuse of that diff. All previously-public exports are re-exported below so existing
// importers (open-sse/index.ts, executors, src/sse/services/tokenRefresh.ts,
// tests) are unaffected.
import { AsyncLocalStorage } from "node:async_hooks";
import { PROVIDERS } from "../config/constants.ts";
import { runWithProxyContext } from "../utils/proxyFetch.ts";
import { serializeRefresh } from "./refreshSerializer.ts";
import {
  extractOAuthErrorCode,
  isUnrecoverableRefreshError,
  type RefreshLogger,
} from "./tokenRefresh/shared.ts";
import {
  getRefreshCacheKey,
  lookupRotation,
  recordRotation,
  _getTokenRotationMapStats,
  _clearTokenRotationMap,
} from "./tokenRefresh/rotationMap.ts";
import {
  runWithCasGuard,
  getActiveCasGuard,
  getCasGuardStats,
  _resetCasGuardStats,
  casGuardShouldSkipPersist,
} from "./tokenRefresh/casGuard.ts";
import {
  isProviderBlocked,
  getCircuitBreakerStatus,
  refreshWithRetry,
} from "./tokenRefresh/circuitBreaker.ts";
import { refreshWindsurfToken } from "./tokenRefresh/providers/windsurf.ts";
import { refreshCodebuddyCnToken } from "./tokenRefresh/providers/codebuddyCn.ts";
import { refreshClineToken } from "./tokenRefresh/providers/cline.ts";
import { refreshKimiCodingToken } from "./tokenRefresh/providers/kimiCoding.ts";
import { refreshGitLabDuoToken } from "./tokenRefresh/providers/gitlabDuo.ts";
import { refreshClaudeOAuthToken } from "./tokenRefresh/providers/claudeOAuth.ts";
import { refreshGoogleToken } from "./tokenRefresh/providers/google.ts";
import { ensureAntigravityProjectAssigned } from "./antigravityProjectBootstrap.ts";
import { persistDiscoveredAntigravityProjectId } from "./antigravityProjectPersist.ts";
import { refreshCodexToken } from "./tokenRefresh/providers/codex.ts";
import { refreshKiroToken } from "./tokenRefresh/providers/kiro.ts";
import { refreshQoderToken } from "./tokenRefresh/providers/qoder.ts";
import { refreshGitHubToken } from "./tokenRefresh/providers/github.ts";
import { refreshCopilotToken } from "./tokenRefresh/providers/copilot.ts";

export {
  refreshWindsurfToken,
  refreshCodebuddyCnToken,
  refreshClineToken,
  refreshKimiCodingToken,
  refreshGitLabDuoToken,
  refreshClaudeOAuthToken,
  refreshGoogleToken,
  refreshCodexToken,
  refreshKiroToken,
  refreshQoderToken,
  refreshGitHubToken,
  refreshCopilotToken,
  extractOAuthErrorCode,
  isUnrecoverableRefreshError,
  isProviderBlocked,
  getCircuitBreakerStatus,
  refreshWithRetry,
  runWithCasGuard,
  getActiveCasGuard,
  getCasGuardStats,
  _resetCasGuardStats,
  _getTokenRotationMapStats,
  _clearTokenRotationMap,
};

// Default token expiry buffer (refresh if expires within 5 minutes).
// Used as fallback for providers without an explicit lead time in
// REFRESH_LEAD_MS below.
export const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000;

// Per-provider proactive-refresh lead time.
//
// For multi-account OAuth on providers that enforce "single active session per
// client_id" (notably OpenAI Codex / Auth0), refreshing one account's token
// can invalidate the refresh_token family of OTHER accounts under the same
// client. We MINIMIZE refresh frequency for these providers: stay on the
// original access_token until it is genuinely about to expire, so each account
// gets the full access_token lifetime without triggering Auth0's family-
// invalidation logic on its siblings.
//
// Trade-off: when refresh finally happens (last 5 min before expiry), Auth0
// MAY invalidate other accounts' refresh_tokens. The user must re-auth those.
// This is the upstream limitation documented in openai/codex#9648.
//
// Providers with non-rotating tokens (Google, Anthropic) or where multi-
// account is naturally isolated keep longer lead times.
export const REFRESH_LEAD_MS: Record<string, number> = {
  // Rotating refresh tokens — minimize refresh frequency to avoid the
  // "refresh-invalidates-siblings" cascade documented for OpenAI Auth0.
  codex: 5 * 60 * 1000, // 5 minutes
  openai: 5 * 60 * 1000, // same Auth0 backend as codex
  claude: 5 * 60 * 1000, // Anthropic OAuth rotates refresh_tokens (user-reported)
  "gitlab-duo": 5 * 60 * 1000, // GitLab token family revocation on misuse
  kiro: 5 * 60 * 1000, // AWS SSO OIDC issues one-time-use refresh tokens
  "kimi-coding": 5 * 60 * 1000, // Moonshot rotates per-refresh
  // Google OAuth refresh_tokens are permanent (non-rotating) — longer lead
  // is safe and reduces unnecessary upstream chatter.
  antigravity: 15 * 60 * 1000,
  agy: 15 * 60 * 1000, // same Google backend as antigravity (non-rotating refresh tokens)
};

/**
 * Upstream providers that stored connections may still name, but that this build no
 * longer serves. They are NOT routable — absent from PROVIDERS, from the chat REGISTRY,
 * and without an executor — so keeping their token fresh maintains a credential that can
 * never answer a request.
 *
 * Deprecation, not deletion: a connection here becomes terminal with a reason that names
 * where to go instead, rather than silently sitting at `active` doing nothing. The
 * migration target must be routable — `tests/unit/gemini-cli-deprecation.test.ts` asserts
 * that, so the notice can never point somewhere useless.
 */
export const DEPRECATED_PROVIDERS: Readonly<
  Record<string, { readonly migrateTo: string; readonly reason: string }>
> = {
  "gemini-cli": {
    migrateTo: "gemini",
    // The legacy path redeemed the token with PROVIDERS.gemini's client — the very same
    // public Gemini CLI / Code Assist OAuth client — which is why re-adding the account
    // under `gemini` is a real migration and not a suggestion to start over.
    reason:
      "The gemini-cli provider was discontinued and is not routable. Re-add this account " +
      "under the `gemini` provider — it uses the same Google OAuth client, so the same " +
      "login works and the account becomes usable again.",
  },
};

/** Whether `provider` is a deprecated upstream that must not be refreshed. */
export function isDeprecatedProvider(provider: string): boolean {
  return Boolean(provider) && Object.prototype.hasOwnProperty.call(DEPRECATED_PROVIDERS, provider);
}

/** The migration notice for a deprecated provider, or null when it is not deprecated. */
export function getDeprecationNotice(
  provider: string
): { migrateTo: string; reason: string } | null {
  return isDeprecatedProvider(provider) ? DEPRECATED_PROVIDERS[provider] : null;
}

/**
 * Get the proactive refresh lead time (ms) for a given provider.
 *
 * Precedence:
 *   1. A per-connection override in `providerSpecificData.refreshLeadMs`
 *      (must be a positive finite number), so an operator can tune the lead
 *      time for a single connection without touching the provider defaults.
 *   2. The provider default from REFRESH_LEAD_MS.
 *   3. TOKEN_EXPIRY_BUFFER_MS (5 min) when nothing else applies.
 */
export function getRefreshLeadMs(
  provider: string,
  providerSpecificData?: { refreshLeadMs?: unknown } | null
): number {
  const override = providerSpecificData?.refreshLeadMs;
  if (typeof override === "number" && Number.isFinite(override) && override > 0) {
    return override;
  }
  return REFRESH_LEAD_MS[provider] ?? TOKEN_EXPIRY_BUFFER_MS;
}

// In-flight refresh promise cache to prevent race conditions
// Key: "provider:sha256(refreshToken)" → Value: Promise<result>
const refreshPromiseCache = new Map();

// Per-connection mutex: prevents parallel OAuth refresh for rotating tokens.
// Key: connectionId → Value: { promise, waiters }
// Primary dedup when credentials.connectionId is present; refreshPromiseCache is fallback.
const connectionRefreshMutex = new Map();

// Token Rotation Map (codex-multi-auth pattern) lives in
// ./tokenRefresh/rotationMap.ts — see that leaf for the in-memory rotation
// cache + getRefreshCacheKey. Imported above and re-exported for tests.

// AsyncLocalStorage for plumbing `onPersist` through executor.refreshCredentials
// without modifying every executor's signature. The chatCore.ts / base.ts call
// sites wrap executor.refreshCredentials in `runWithOnPersist(persistFn, () => ...)`
// and `getAccessToken` reads the active store as a fallback when no explicit
// onPersist parameter is provided. This keeps Fix A's atomic [refresh + persist]
// guarantee while avoiding per-executor signature changes.
type RefreshPersistResult = Record<string, unknown>;
type RefreshPersistFn = (result: RefreshPersistResult) => Promise<void>;
const onPersistStore = new AsyncLocalStorage<RefreshPersistFn>();

export function runWithOnPersist<T>(
  onPersist: RefreshPersistFn | undefined | null,
  fn: () => Promise<T>
): Promise<T> {
  if (!onPersist) return fn();
  return onPersistStore.run(onPersist, fn);
}

export function getActiveOnPersist(): RefreshPersistFn | undefined {
  return onPersistStore.getStore();
}

// #4038 compare-and-swap (CAS) guard on the refresh persist lives in
// ./tokenRefresh/casGuard.ts — imported above and re-exported for tests.
// casGuardShouldSkipPersist is imported and used by getAccessToken below.

// extractOAuthErrorCode + isUnrecoverableRefreshError live in
// ./tokenRefresh/shared.ts (imported above, re-exported below) — used both by
// the generic orchestrator below and by every per-provider refresh module.

/**
 * Refresh OAuth access token using refresh token
 */
export async function refreshAccessToken(
  provider,
  refreshToken,
  credentials,
  log,
  proxyConfig: unknown = null
) {
  const config = PROVIDERS[provider];

  const refreshEndpoint = config?.refreshUrl || config?.tokenUrl;
  if (!config || !refreshEndpoint) {
    log?.warn?.("TOKEN_REFRESH", `No refresh endpoint configured for provider: ${provider}`);
    return null;
  }

  if (!refreshToken) {
    log?.warn?.("TOKEN_REFRESH", `No refresh token available for provider: ${provider}`);
    return null;
  }

  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    if (config.clientId) params.set("client_id", config.clientId);
    if (config.clientSecret) params.set("client_secret", config.clientSecret);

    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(refreshEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params,
      })
    );

    if (!response.ok) {
      const errorText = await response.text();
      log?.error?.("TOKEN_REFRESH", `Failed to refresh token for ${provider}`, {
        status: response.status,
        error: errorText,
      });
      const code = extractOAuthErrorCode(errorText);
      if (code === "invalid_grant" || code === "invalid_request") {
        return { error: "unrecoverable_refresh_error", code };
      }
      return null;
    }

    const tokens = await response.json();

    log?.info?.("TOKEN_REFRESH", `Successfully refreshed token for ${provider}`, {
      hasNewAccessToken: !!tokens.access_token,
      hasNewRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expires_in,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || refreshToken,
      expiresIn: tokens.expires_in,
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", `Error refreshing token for ${provider}`, {
      error: error.message,
    });
    return null;
  }
}

/**
 * Get access token for a specific provider (internal, does the actual work)
 */
async function _getAccessTokenInternal(provider, credentials, log, proxyConfig: unknown = null) {
  switch (provider) {
    case "gemini-cli": {
      // Deprecated (see DEPRECATED_PROVIDERS). This used to refresh successfully against
      // PROVIDERS.gemini's client, but the provider is not routable, so the fresh token
      // had nowhere to go — periodic upstream calls maintaining an unusable credential.
      //
      // Return the ESTABLISHED unrecoverable contract, so every existing caller
      // (isUnrecoverableRefreshError, the manual-refresh route) already stops retrying —
      // but with a code that says WHY and a target to migrate to. A bare `null` here would
      // read as a transient failure and be retried forever.
      const notice = DEPRECATED_PROVIDERS[provider];
      log?.warn?.(
        "TOKEN_REFRESH",
        `${provider} is deprecated — not refreshing; migrate this account to ${notice.migrateTo}`
      );
      return {
        error: "unrecoverable_refresh_error",
        code: "provider_deprecated",
        migrateTo: notice.migrateTo,
        reason: notice.reason,
      };
    }

    case "gemini":
    case "antigravity":
    case "agy": {
      const result = await refreshGoogleToken(
        credentials.refreshToken,
        PROVIDERS[provider].clientId,
        PROVIDERS[provider].clientSecret,
        log,
        proxyConfig
      );

      // Google One AI accounts get no projectId at OAuth exchange time.
      // Recover it via loadCodeAssist so downstream routing works.
      if (
        result?.accessToken &&
        (provider === "antigravity" || provider === "agy") &&
        !(credentials.projectId || credentials.providerSpecificData?.projectId)
      ) {
        try {
          const discovered = await ensureAntigravityProjectAssigned(
            result.accessToken,
            fetch
          );
          if (discovered) {
            result.projectId = discovered;
            result.providerSpecificData = {
              ...(credentials.providerSpecificData || {}),
              ...(result.providerSpecificData || {}),
              projectId: discovered,
            };
            if (credentials.connectionId) {
              await persistDiscoveredAntigravityProjectId(
                credentials.connectionId,
                discovered,
                credentials.providerSpecificData
              );
            }
            log?.info?.("TOKEN", "Antigravity projectId discovered during token refresh", {
              projectId: discovered,
            });
          }
        } catch (discoveryError) {
          const msg = discoveryError instanceof Error ? discoveryError.message : String(discoveryError);
          log?.warn?.("TOKEN", `Antigravity projectId discovery failed: ${msg}`);
        }
      }

      return result;
    }

    case "claude":
      return await refreshClaudeOAuthToken(credentials.refreshToken, log, proxyConfig);

    case "codex":
      return await refreshCodexToken(credentials.refreshToken, log, proxyConfig);

    case "qoder":
      return await refreshQoderToken(credentials.refreshToken, log, proxyConfig);

    case "github":
      return await refreshGitHubToken(credentials.refreshToken, log, proxyConfig);

    case "kiro":
    case "amazon-q":
      return await refreshKiroToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    case "cline":
    case "clinepass": // reuses the Cline WorkOS refresh flow (clinepass: cline)
      return await refreshClineToken(credentials.refreshToken, log, proxyConfig);

    case "kimi-coding":
      return await refreshKimiCodingToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    case "gitlab-duo":
      return await refreshGitLabDuoToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    case "windsurf":
    case "devin-cli":
      return await refreshWindsurfToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    case "codebuddy-cn":
      return await refreshCodebuddyCnToken(credentials.refreshToken, log, proxyConfig);

    default:
      // Fallback to generic OAuth refresh for unknown providers
      return refreshAccessToken(provider, credentials.refreshToken, credentials, log, proxyConfig);
  }
}

/**
 * Whether a provider has a supported refresh path in this service.
 */
export function supportsTokenRefresh(provider) {
  const explicitlySupported = new Set([
    "gemini",
    "antigravity",
    "agy",
    "claude",
    "codex",
    "qoder",
    "github",
    "kiro",
    "amazon-q",
    "cline",
    "kimi-coding",
    "windsurf",
    // #8407: do NOT list "devin-cli" here. It is import-token / local-CLI owned
    // (`devin auth login`); connections never carry a refresh token. Leaving it
    // in this set made tokenHealthCheck treat it as refresh-capable and force
    // testStatus="expired" / errorCode="no_refresh_token". Keep it out of the
    // explicit set (same idea as not listing non-refresh local-CLI providers).
    "gitlab-duo",
    "codebuddy-cn",
  ]);
  if (explicitlySupported.has(provider)) return true;
  const config = PROVIDERS[provider];
  return !!(config?.refreshUrl || config?.tokenUrl);
}

// isUnrecoverableRefreshError lives in ./tokenRefresh/shared.ts (imported above
// and re-exported) — used by refreshWithRetry (./tokenRefresh/circuitBreaker.ts)
// and by callers that need to classify a refresh result.

/**
 * Get access token for a specific provider (with deduplication).
 *
 * Deduplication strategy (two layers):
 * 1. Per-connection mutex (primary): if credentials.connectionId is present, all concurrent
 *    callers for that connection share one in-flight promise regardless of which token they
 *    loaded. This prevents refresh_token_reused errors with rotating (one-time-use) tokens,
 *    e.g. Codex/OpenAI, where callers that loaded credentials at different times may hold
 *    different token strings but refer to the same connection.
 * 2. Token-hash fallback: if no connectionId, dedup by provider+sha256(refreshToken) as before.
 *
 * Additionally, when connectionId is present, the stale-token check reads the DB to detect
 * whether another process already refreshed the token. If the DB token is still valid it is
 * returned immediately without a new upstream call.
 *
 * @param onPersist - Optional callback invoked INSIDE the per-connection mutex closure after a
 *   successful refresh, before the mutex releases. Use this to atomically persist the new tokens
 *   to the DB within the same lock window. If `onPersist` throws, the error is logged and
 *   re-thrown so the caller is aware of the persistence failure.
 */
export async function getAccessToken(
  provider,
  credentials,
  log,
  proxyConfig: unknown = null,
  onPersist?: RefreshPersistFn
) {
  if (!credentials || !credentials.refreshToken || typeof credentials.refreshToken !== "string") {
    log?.warn?.("TOKEN_REFRESH", `No valid refresh token available for provider: ${provider}`);
    return null;
  }

  // If the caller did not pass onPersist explicitly, fall back to the active
  // AsyncLocalStorage store. This lets `runWithOnPersist(persistFn, () =>
  // executor.refreshCredentials(creds, log))` plumb the persist callback through
  // executors (e.g. CodexExecutor) without modifying their signature.
  const effectiveOnPersist = onPersist ?? getActiveOnPersist();

  const connectionId = credentials.connectionId;

  // ── Layer 1: per-connection mutex ──────────────────────────────────────────
  if (connectionId && typeof connectionId === "string") {
    const existing = connectionRefreshMutex.get(connectionId);
    if (existing) {
      existing.waiters++;
      log?.info?.("TOKEN_REFRESH", "Concurrent refresh detected — sharing in-flight refresh", {
        provider,
        connectionId,
        waiters: existing.waiters,
      });
      return existing.promise;
    }

    const entry = { promise: null, waiters: 0 };
    entry.promise = (async () => {
      const result = await _getAccessTokenWithStalenessCheck(
        provider,
        credentials,
        log,
        proxyConfig
      );
      // Invoke onPersist INSIDE the mutex so [network call + DB write] are one atomic step.
      // This prevents a concurrent waiter from reading stale credentials before the DB is updated.
      if (result?.accessToken && effectiveOnPersist) {
        // #4038: skip the persist if a concurrent writer already rotated this row past the
        // refresh_token we presented (compare-and-swap) — overwriting would revert it.
        if (await casGuardShouldSkipPersist(log)) {
          return result;
        }
        try {
          await effectiveOnPersist(result);
        } catch (persistErr) {
          const { sanitizeErrorMessage } = await import("../utils/error.ts");
          log?.error?.(
            "TOKEN_REFRESH",
            `onPersist callback failed for ${provider}/${connectionId}: ${sanitizeErrorMessage(persistErr instanceof Error ? persistErr : new Error(String(persistErr)))}`
          );
          throw persistErr;
        }
      }
      return result;
    })().finally(() => {
      connectionRefreshMutex.delete(connectionId);
    });
    connectionRefreshMutex.set(connectionId, entry);
    return entry.promise;
  }

  // ── Layer 2: token-hash fallback (no connectionId) ─────────────────────────
  const cacheKey = getRefreshCacheKey(provider, credentials.refreshToken);

  if (refreshPromiseCache.has(cacheKey)) {
    log?.info?.("TOKEN_REFRESH", `Reusing in-flight refresh for ${provider}`);
    return refreshPromiseCache.get(cacheKey);
  }

  // Layer 2 has no per-connection mutex, so callers that pass an onPersist
  // callback expect it to fire after a successful refresh. Without this hook
  // the legacy `connectionId`-less path would silently swallow the callback,
  // leaving DB rows out of sync with rotated tokens (Codex/OpenAI). We still
  // resolve the promise to all waiters with the refreshed credentials.
  const refreshPromise = serializeRefresh(provider, () =>
    _getAccessTokenInternal(provider, credentials, log, proxyConfig)
  )
    .then(async (result) => {
      if (result?.accessToken && effectiveOnPersist) {
        // #4038: same compare-and-swap guard as Layer 1 — skip the persist if a concurrent
        // writer already rotated this row past the refresh_token we presented.
        if (await casGuardShouldSkipPersist(log)) {
          return result;
        }
        try {
          await effectiveOnPersist(result);
        } catch (persistErr) {
          const { sanitizeErrorMessage } = await import("../utils/error.ts");
          log?.error?.(
            "TOKEN_REFRESH",
            `Layer 2 onPersist callback failed for ${provider}: ${sanitizeErrorMessage(persistErr instanceof Error ? persistErr : new Error(String(persistErr)))}`
          );
          throw persistErr;
        }
      } else if (result?.accessToken && !effectiveOnPersist) {
        log?.warn?.(
          "TOKEN_REFRESH",
          `Layer 2 refresh succeeded for ${provider} without onPersist — DB row will not be updated with rotated token. Callers should pass connectionId for Layer 1 atomicity.`
        );
      }
      return result;
    })
    .finally(() => {
      refreshPromiseCache.delete(cacheKey);
    });

  refreshPromiseCache.set(cacheKey, refreshPromise);
  return refreshPromise;
}

/**
 * Internal helper: performs the DB staleness check then calls the actual refresh.
 * Only called from the per-connection mutex path (Layer 1 above).
 */
async function _getAccessTokenWithStalenessCheck(provider, credentials, log, proxyConfig) {
  // ROTATION MAP CHECK (codex-multi-auth pattern): if this refresh_token was
  // rotated very recently (within ROTATION_MAP_TTL_MS), reuse the cached new
  // tokens INSTEAD of hitting upstream. Auth0 treats re-use of a rotated token
  // as a security event and revokes the entire token family — fatal for
  // multi-account Codex setups. The in-memory rotation map catches this even
  // when the caller bypasses the DB staleness path (no connectionId, stale
  // in-memory credentials in retries, etc.).
  const rotated = lookupRotation(provider, credentials.refreshToken);
  if (rotated) {
    log?.info?.(
      "TOKEN_REFRESH",
      `Rotation map hit for ${provider}. Returning cached rotated tokens (avoids family-revoke).`
    );
    return rotated.result;
  }

  // RACE CONDITION PREVENTION:
  // If the credentials object in memory is stale (e.g. it waited in a semaphore while another
  // request refreshed the token), using its OLD refreshToken will cause the provider (e.g. OpenAI)
  // to reject it with 'refresh_token_reused' and revoke the new token family.
  // We MUST check if the DB has a newer token before proceeding with a network refresh.
  if (credentials.connectionId) {
    try {
      const { getProviderConnectionById } = await import("@/lib/db/providers");
      const dbConnection = await getProviderConnectionById(credentials.connectionId);
      if (dbConnection && dbConnection.refreshToken) {
        const now = Date.now();
        const dbExpiresAt = dbConnection.expiresAt ? new Date(dbConnection.expiresAt).getTime() : 0;

        if (dbConnection.refreshToken !== credentials.refreshToken) {
          log?.info?.(
            "TOKEN_REFRESH",
            `Stale token detected in memory for ${provider}. Using refreshed token from DB.`
          );

          // If the DB token is not expired, we can just return it!
          if (dbExpiresAt > now + 60000) {
            // 60 seconds buffer
            log?.info?.("TOKEN_REFRESH", `DB token is still valid. Skipping OAuth refresh.`);
            return {
              accessToken: dbConnection.accessToken,
              refreshToken: dbConnection.refreshToken,
              // Return absolute expiresAt so downstream callers do NOT recompute lifetime
              // from a relative expiresIn value (which would incorrectly extend the TTL).
              // expiresIn intentionally omitted here.
              expiresAt: dbConnection.expiresAt,
            };
          } else {
            // DB token is also expired, but it's the NEWEST one. We must use it to refresh.
            credentials.refreshToken = dbConnection.refreshToken;
            credentials.accessToken = dbConnection.accessToken;
          }
        }
        // NOTE: Fix F (skip when DB == memory and DB > now+60s) was intentionally
        // removed. The caller (checkAndRefreshToken) already decided to refresh
        // because the token is within TOKEN_EXPIRY_BUFFER_MS of expiry. Re-checking
        // with a tighter 60-second window here would skip legitimate refreshes and
        // let near-expired tokens hit the upstream. Layer-1 mutex (per-connection)
        // and Layer-2 dedup (token-hash) already prevent concurrent refreshes for
        // the import-burst scenario.
      }
    } catch (e) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `Failed to check DB for stale token: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  }

  const oldRefreshToken = credentials.refreshToken;
  // Front 1: serialize the network refresh across all connections of the same
  // rotation group (e.g. Codex+openai share one Auth0 client) so two sibling
  // accounts never refresh concurrently and trip Auth0 family revocation.
  const result = await serializeRefresh(provider, () =>
    _getAccessTokenInternal(provider, credentials, log, proxyConfig)
  );

  // Record the rotation so subsequent stale callers can be redirected to the
  // new tokens without re-hitting upstream (which would trigger Auth0 family
  // revocation). Only records when the refresh actually rotated the token.
  if (
    result &&
    typeof result === "object" &&
    !("error" in result) &&
    (result as { accessToken?: string }).accessToken &&
    (result as { refreshToken?: string }).refreshToken
  ) {
    recordRotation(
      provider,
      oldRefreshToken,
      result as {
        accessToken: string;
        refreshToken: string;
        expiresIn?: number;
        expiresAt?: string;
      }
    );
  }

  return result;
}

/**
 * Refresh token by provider type (alias for getAccessToken)
 * @deprecated Since v0.2.70 — use getAccessToken() directly.
 * Still exported because open-sse/index.js and src/sse wrapper use it.
 * Will be removed in a future major version.
 */
export const refreshTokenByProvider = getAccessToken;

/**
 * Format credentials for provider
 */
export function formatProviderCredentials(provider, credentials, log) {
  const config = PROVIDERS[provider];
  if (!config) {
    log?.warn?.("TOKEN_REFRESH", `No configuration found for provider: ${provider}`);
    return null;
  }

  switch (provider) {
    case "gemini":
      return {
        apiKey: credentials.apiKey,
        accessToken: credentials.accessToken,
        projectId: credentials.projectId,
      };

    case "claude":
      return {
        apiKey: credentials.apiKey,
        accessToken: credentials.accessToken,
      };

    case "codex":
    case "qoder":
    case "openai":
    case "openrouter":
      return {
        apiKey: credentials.apiKey,
        accessToken: credentials.accessToken,
      };

    case "antigravity":
    case "agy":
      return {
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
      };

    default:
      return {
        apiKey: credentials.apiKey,
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
      };
  }
}

/**
 * Get all access tokens for a user
 */
export async function getAllAccessTokens(userInfo, log) {
  const results = {};

  if (userInfo.connections && Array.isArray(userInfo.connections)) {
    for (const connection of userInfo.connections) {
      if (connection.isActive && connection.provider) {
        const token = await getAccessToken(
          connection.provider,
          {
            refreshToken: connection.refreshToken,
          },
          log
        );

        if (token) {
          results[connection.provider] = token;
        }
      }
    }
  }

  return results;
}

// Per-provider circuit breaker + refreshWithRetry + withTimeout live in
// ./tokenRefresh/circuitBreaker.ts — imported above and re-exported for tests.
// isProviderBlocked / getCircuitBreakerStatus / refreshWithRetry are
// re-exported from that leaf.

/**
 * Get active per-connection mutex entries (for diagnostics/metrics).
 * Returns a snapshot of connections that have an in-flight refresh and their waiter count.
 */
export function getConnectionRefreshMutexStatus(): Record<string, { waiters: number }> {
  const result: Record<string, { waiters: number }> = {};
  for (const [connectionId, entry] of connectionRefreshMutex.entries()) {
    result[connectionId] = { waiters: entry.waiters };
  }
  return result;
}
