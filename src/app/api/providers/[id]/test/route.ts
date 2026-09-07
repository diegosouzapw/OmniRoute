import { NextResponse } from "next/server";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getCachedProviderConnectionById } from "@/lib/db/readCache";
import { updateProviderConnection } from "@/lib/db/providers";
import { isCloudEnabled, resolveProxyForConnection } from "@/lib/db/settings";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { validateProviderApiKey } from "@/lib/providers/validation";
import { projectProviderValidationResultForPublicResponse } from "@/lib/providers/validation/transport";
import { getCliRuntimeStatus } from "@/shared/services/cliRuntime";
import { buildQoderCliNotFoundHint } from "@omniroute/open-sse/services/qoderCliResolve.ts";
// Use the shared open-sse token refresh with built-in dedup/race-condition cache
import { getAccessToken } from "@omniroute/open-sse/services/tokenRefresh.ts";
import { rotationGroupFor } from "@omniroute/open-sse/services/refreshSerializer.ts";
import { saveCallLog } from "@/lib/usageDb";
import { shouldHideLogs } from "@/lib/tokenHealthCheck";
import { logProxyEvent } from "@/lib/proxyLogger";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import {
  buildGitLabDuoProbeBody,
  buildGitLabDuoProbeHeaders,
  buildGitLabOAuthEndpoints,
  resolveGitLabOAuthBaseUrl,
  shouldFallbackToPublicCodeSuggestions,
} from "@/lib/oauth/gitlab";
import { providerAllowsOptionalApiKey } from "@/shared/constants/providers";
import { shouldUseApiKeyConnectionTest } from "./webSessionTestDispatch";
import { testCodexAppServerConnection, makeDiagnosis } from "./codexAppServerHealth";
import { recoverKeyHealth } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import { shouldClearErrorStateOnValidProbe } from "@/lib/usage/providerLimits";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { buildApiKeyConnectionTestResult } from "./apiKeyTestResult";
import { classifyOAuthProbeInconclusive, OAUTH_TEST_CONFIG } from "./oauthTestConfig";
import { isGeoBlockedError } from "@omniroute/open-sse/services/errorClassifier.ts";
import * as retirement from "@/lib/providers/chatgptWebRetirementResponse";
import {
  classifyFailure,
  isAccountDeactivatedMessage,
  projectConnectionTestResultForPublicResponse,
  projectProviderRuntimeForPublicResponse,
  toSafeMessage,
} from "./publicErrorBoundary";

export { classifyFailure, projectProviderRuntimeForPublicResponse } from "./publicErrorBoundary";

// Match the API-key path's 30s timeout so a hung OAuth upstream cannot block the test queue.
const OAUTH_TEST_TIMEOUT_MS = 30_000;

import { CLI_RUNTIME_PROVIDER_MAP } from "./cliRuntimeProviderMap";

/** POST body is optional; when present, only known fields are validated. */
const providerConnectionTestBodySchema = z.object({
  validationModelId: z.string().max(500).optional(),
});

function hasQoderToken(connection: any): boolean {
  if (typeof connection?.apiKey === "string" && connection.apiKey.trim().length > 0) return true;
  const psd = connection?.providerSpecificData;
  if (psd && typeof psd === "object") {
    const pat =
      (psd as Record<string, unknown>).personalAccessToken ??
      (psd as Record<string, unknown>).pat ??
      (psd as Record<string, unknown>).accessToken;
    if (typeof pat === "string" && pat.trim().length > 0) return true;
  }
  return false;
}

async function getProviderRuntimeStatus(connection: any) {
  const provider = typeof connection?.provider === "string" ? connection.provider : "";
  let toolId = CLI_RUNTIME_PROVIDER_MAP[provider];

  // Issue #2247: detect Qoder in OAuth/CLI-flavored mode with a PAT pasted
  // BEFORE the CLI-runtime early-return below, otherwise the disambiguation
  // message never reaches the user (they keep seeing the generic "CLI not
  // installed" + 401 cascade). For Qoder, this short-circuits the runtime
  // check entirely with an actionable diagnosis.
  const isQoderOauthWithToken =
    provider === "qoder" && connection?.authType !== "apikey" && hasQoderToken(connection);
  if (isQoderOauthWithToken) {
    const message =
      "Qoder OAuth/Local CLI mode is selected but a Personal Access Token is stored on this connection. Switch this connection to API Key auth instead.";
    return {
      installed: false,
      runnable: false,
      reason: "qoder_oauth_with_token",
      diagnosis: makeDiagnosis("runtime_error", "local", message, "qoder_oauth_with_token"),
      error: message,
    };
  }

  if (provider === "qoder" && connection?.authType !== "apikey") {
    toolId = null;
  }
  if (!toolId) return null;

  try {
    const runtime = await getCliRuntimeStatus(toolId);
    if (runtime.installed && runtime.runnable) {
      return runtime;
    }

    const runtimeMessage = runtime.installed
      ? `Local CLI runtime is installed but not runnable (${runtime.reason || "healthcheck_failed"})`
      : provider === "qoder"
        ? buildQoderCliNotFoundHint(runtime.reason || "not_found")
        : "Local CLI runtime is not installed";

    return {
      ...runtime,
      diagnosis: makeDiagnosis(
        "runtime_error",
        "local",
        runtimeMessage,
        runtime.reason || "runtime_error"
      ),
      error: runtimeMessage,
    };
  } catch (error) {
    const runtimeMessage = `Failed to check local CLI runtime: ${toSafeMessage(
      error,
      "runtime_check_failed"
    )}`;
    return {
      installed: false,
      runnable: false,
      reason: "runtime_check_failed",
      diagnosis: makeDiagnosis("runtime_error", "local", runtimeMessage, "runtime_check_failed"),
      error: runtimeMessage,
    };
  }
}

/**
 * Refresh OAuth token using the shared open-sse getAccessToken.
 * This shares the in-flight promise cache with the SSE layer,
 * preventing race conditions where two code paths attempt to
 * refresh the same token concurrently.
 *
 * @returns {object} { accessToken, expiresIn, refreshToken } or null if failed
 */
/**
 * Fallback expiry persisted when a successful refresh returns neither
 * expiresAt nor expiresIn: keeps a NULL expires_at (treated as expired by
 * isTokenExpired) from forcing a token rotation on every subsequent test.
 * 30 minutes — the historical Google/OAuth default window, well inside any
 * realistic token TTL.
 */
const FALLBACK_REFRESH_EXPIRY_MS = 30 * 60 * 1000;

async function refreshOAuthToken(connection: any) {
  const { provider, refreshToken } = connection;
  if (!refreshToken) return null;

  try {
    // Fix B: Pass connectionId + accessToken + expiresAt so getAccessToken enters
    // the per-connection mutex (Layer 1) instead of falling through to the
    // token-hash fallback (Layer 2). Without connectionId, parallel dashboard
    // batch-tests would each acquire a separate Layer-2 lock keyed by token hash
    // and concurrently POST the same refresh_token to Codex/OpenAI, triggering
    // refresh_token_reused on rotating providers.
    const credentials = {
      connectionId: connection.id,
      accessToken: connection.accessToken,
      refreshToken,
      expiresAt: connection.expiresAt,
      providerSpecificData: connection.providerSpecificData || {},
    };

    // Fix A: onPersist runs INSIDE the mutex inside getAccessToken so the DB
    // write happens before the lock releases. This prevents a concurrent caller
    // from reading the stale refresh_token between the network call and the DB
    // update.
    const result = await getAccessToken(provider, credentials, console, null, async (refreshed) => {
      if (!refreshed?.accessToken) return;
      const update: any = {
        accessToken: refreshed.accessToken,
      };
      if (refreshed.refreshToken) update.refreshToken = refreshed.refreshToken;
      if (refreshed.expiresAt) {
        update.expiresAt = refreshed.expiresAt;
        update.tokenExpiresAt = refreshed.expiresAt;
      } else if (refreshed.expiresIn) {
        const expiresAt = new Date(Date.now() + refreshed.expiresIn * 1000).toISOString();
        update.expiresAt = expiresAt;
        update.tokenExpiresAt = expiresAt;
      } else {
        // Upstream returned neither expiresAt nor expiresIn. Persist a
        // conservative 30-minute expiry so a NULL expiresAt (treated as
        // expired by isTokenExpired when a refresh token exists) does not
        // force a token rotation on EVERY subsequent test — the historical
        // Google/OAuth default window, well inside any realistic token TTL.
        const expiresAt = new Date(Date.now() + FALLBACK_REFRESH_EXPIRY_MS).toISOString();
        update.expiresAt = expiresAt;
        update.tokenExpiresAt = expiresAt;
      }
      if (refreshed.providerSpecificData) {
        update.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          ...refreshed.providerSpecificData,
        };
      }
      await updateProviderConnection(connection.id, update);
    });
    return result; // { accessToken, expiresIn, refreshToken } or null
  } catch (err) {
    console.error(
      `Error refreshing ${provider} token:`,
      toSafeMessage(err, "Token refresh failed")
    );
    return null;
  }
}

/**
 * Check if token is expired or about to expire (within 5 minutes).
 *
 * A NULL/missing expiry is treated as expired when the connection carries a
 * refresh token: connections imported without an expires_at (bulk import,
 * manual entry) would otherwise never trigger the proactive refresh before the
 * probe, and a stale access token then surfaces as a provider-specific 400
 * that the 401/403 reactive branch never recovers from. When there is no
 * refresh token the old behaviour stands — an unknown expiry cannot be fixed,
 * so probing as-is is the only option.
 */
function isTokenExpired(connection: any) {
  const expiresAtValue = connection.expiresAt || connection.tokenExpiresAt;
  if (!expiresAtValue) {
    return typeof connection.refreshToken === "string" && connection.refreshToken.length > 0;
  }
  const expiresAt = new Date(expiresAtValue).getTime();
  if (!Number.isFinite(expiresAt)) {
    // Corrupt date string: unverifiable, and refreshable if we can refresh.
    return typeof connection.refreshToken === "string" && connection.refreshToken.length > 0;
  }
  const buffer = 5 * 60 * 1000; // 5 minutes
  return expiresAt <= Date.now() + buffer;
}

/**
 * #10365 / #10499: the real chat path (open-sse/executors/gitlab.ts) treats a rejected
 * `direct_access` exchange (401) or an explicitly disabled direct-connections tenant
 * (403) as recoverable — it falls back to the public Code Suggestions completions
 * endpoint and keeps serving. "Test Connection" / Retest must apply the SAME contract:
 * a `direct_access` failure alone is not proof the token is bad, so probe the fallback
 * endpoint before reporting the connection unhealthy. Only a fallback-probe 401/403
 * means the token itself is rejected; any other status (including validation errors on
 * the deliberately minimal probe body) means auth was accepted.
 */
async function probeGitLabDuoPublicFallback(
  connection: any,
  accessToken: string,
  timeoutMs: number
): Promise<boolean> {
  const endpoints = buildGitLabOAuthEndpoints(
    resolveGitLabOAuthBaseUrl(connection?.providerSpecificData)
  );
  try {
    const fallbackRes = await fetch(endpoints.publicCompletionsUrl, {
      method: "POST",
      headers: buildGitLabDuoProbeHeaders(accessToken),
      body: JSON.stringify(buildGitLabDuoProbeBody()),
      signal: AbortSignal.timeout(timeoutMs),
    });
    return fallbackRes.status !== 401 && fallbackRes.status !== 403;
  } catch {
    // Network/timeout failures on the probe are not an auth verdict either way —
    // fall through to the caller's existing 401/403 handling instead of masking them.
    return false;
  }
}

/**
 * Sync to cloud if enabled
 */
async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log(
      "Error syncing to cloud after token refresh:",
      toSafeMessage(error, "Cloud sync failed")
    );
  }
}

/**
 * Whether a 400 probe failure should trigger one reactive refresh + retry:
 * the status is a hard 400 (not accepted as auth-ok by acceptStatuses, not
 * declared inconclusive by the provider config), nothing was refreshed yet,
 * the connection is refreshable with a non-empty refresh token, and the
 * provider is not a rotating one (single-use refresh tokens stay with the
 * mutex-guarded 401 path).
 */
export function isReactive400Recoverable(args: {
  status: number;
  config: { acceptStatuses?: unknown; inconclusiveStatuses?: unknown; refreshable?: boolean };
  refreshed: boolean;
  connection: { refreshToken?: unknown };
  isRotatingProvider: boolean;
}): boolean {
  const { status, config, refreshed, connection, isRotatingProvider } = args;
  if (status !== 400) return false;
  if (Array.isArray(config.acceptStatuses) && config.acceptStatuses.includes(400)) return false;
  // A provider that explicitly classifies 400 as inconclusive keeps that
  // contract — the refresh attempt would mask an inconclusive verdict.
  if (Array.isArray(config.inconclusiveStatuses) && config.inconclusiveStatuses.includes(400)) {
    return false;
  }
  if (refreshed) return false;
  if (!config.refreshable) return false;
  if (typeof connection.refreshToken !== "string" || connection.refreshToken.length === 0) {
    return false;
  }
  return !isRotatingProvider;
}

/**
 * Test OAuth connection by calling provider API
 * Auto-refreshes token if expired
 * @returns {{ valid: boolean, error: string|null, refreshed: boolean, newTokens: object|null }}
 */
export async function testOAuthConnection(
  connection: any,
  timeoutMs: number = OAUTH_TEST_TIMEOUT_MS
) {
  const config = OAUTH_TEST_CONFIG[connection.provider];

  if (!config) {
    const error = "Provider test not supported";
    return {
      valid: false,
      error,
      refreshed: false,
      diagnosis: classifyFailure({ error, unsupported: true }),
    };
  }

  // Check if token exists
  if (!connection.accessToken) {
    // If the refresh token is also missing on a refreshable provider,
    // this means re-authentication is needed (e.g. after refresh_token_reused)
    if (config.refreshable && !connection.refreshToken) {
      const error = "Refresh token expired. Please re-authenticate this account.";
      return {
        valid: false,
        error,
        refreshed: false,
        diagnosis: makeDiagnosis("reauth_required", "oauth", error, "reauth_required"),
      };
    }
    const error = "No access token";
    return {
      valid: false,
      error,
      refreshed: false,
      diagnosis: makeDiagnosis("auth_missing", "local", error, "missing_access_token"),
    };
  }

  let accessToken = connection.accessToken;
  let refreshed = false;
  let newTokens = null;

  // Auto-refresh if token is expired and provider supports refresh.
  // Front 2: NEVER burn a rotating provider's single-use refresh_token from a
  // connection test. Under a shared Auth0 client (Codex/OpenAI) a test-time
  // refresh can cascade-invalidate sibling accounts' refresh_token families
  // (openai/codex#9648). Leave rotation to the reactive, mutex-guarded 401 path.
  const tokenExpired = isTokenExpired(connection);
  const isRotatingProvider = rotationGroupFor(connection.provider) !== null;
  if (config.refreshable && tokenExpired && connection.refreshToken && !isRotatingProvider) {
    const tokens = await refreshOAuthToken(connection);
    if (tokens) {
      accessToken = tokens.accessToken;
      refreshed = true;
      newTokens = tokens;
    } else {
      // Refresh failed
      const error = "Token expired and refresh failed";
      return {
        valid: false,
        error,
        refreshed: false,
        diagnosis: classifyFailure({ error, refreshFailed: true }),
      };
    }
  }

  // For providers that only check expiry (no test endpoint available)
  if (config.checkExpiry) {
    // If we already refreshed successfully, token is valid
    if (refreshed) {
      return {
        valid: true,
        error: null,
        refreshed,
        newTokens,
        diagnosis: makeDiagnosis("ok", "oauth", null, null),
      };
    }
    // Check if token is expired (no refresh available)
    if (tokenExpired) {
      // Front 2: for rotating providers we intentionally did NOT refresh above.
      // An expired access_token here is recoverable on next real use via the
      // reactive 401 path, so don't report the account as broken (which would
      // tempt the operator to re-test and never resolve). Keep it active.
      if (isRotatingProvider && connection.refreshToken) {
        return {
          valid: true,
          error: null,
          refreshed: false,
          newTokens: null,
          diagnosis: makeDiagnosis("ok", "oauth", null, null),
        };
      }
      const error = "Token expired";
      return {
        valid: false,
        error,
        refreshed: false,
        diagnosis: classifyFailure({ error }),
      };
    }
    return {
      valid: true,
      error: null,
      refreshed: false,
      newTokens: null,
      diagnosis: makeDiagnosis("ok", "local", null, null),
    };
  }

  // Call test endpoint
  try {
    // Provider-specific probe builders (e.g. antigravity) construct the full
    // request — url/method/headers/body — because the real surface needs
    // dynamic headers (client profile) that the static config cannot express.
    const builtProbe =
      typeof config.buildProbe === "function"
        ? await config.buildProbe(connection, accessToken)
        : null;
    const headers = builtProbe
      ? builtProbe.headers
      : {
          [config.authHeader]: `${config.authPrefix}${accessToken}`,
          ...config.extraHeaders,
        };

    const url = builtProbe
      ? builtProbe.url
      : typeof config.getUrl === "function"
        ? config.getUrl(connection)
        : config.url;
    const fetchInit: RequestInit = {
      method: builtProbe?.method ?? config.method,
      headers,
      signal: AbortSignal.timeout(timeoutMs),
    };
    // Port of decolua/9router#347: providers like Codex must send a body so the
    // upstream returns 400 (auth ok) instead of 405/415.
    if (config.body && !builtProbe) fetchInit.body = config.body;
    if (builtProbe?.body) fetchInit.body = builtProbe.body;
    const res = await fetch(url, fetchInit);

    // Some providers (Antigravity family) reject a stale access token with 400
    // instead of 401/403. If the token has not been refreshed yet and the
    // connection is refreshable, try one reactive refresh + retry BEFORE the
    // inconclusive classification — a token that refreshes clean is a healthy
    // connection, not an "inconclusive" one. acceptStatuses (Codex's
    // intentional auth-ok 400) is checked first so that contract is untouched.
    if (
      isReactive400Recoverable({
        status: res.status,
        config,
        refreshed,
        connection,
        isRotatingProvider,
      })
    ) {
      const tokens = await refreshOAuthToken(connection);
      if (tokens?.accessToken) {
        // Rebuild the probe from scratch with the fresh token instead of
        // string-substituting inside the old headers: buildProbe derives the
        // full header set (provider-specific auth included) from the token,
        // so a rebuilt probe is always coherent — no accidental-substitution
        // risk across unrelated header values.
        const retryProbe =
          typeof config.buildProbe === "function"
            ? await config.buildProbe(connection, tokens.accessToken)
            : null;
        const retryHeaders = retryProbe
          ? (retryProbe.headers as Record<string, string>)
          : {
              ...headers,
              [config.authHeader]: `${config.authPrefix}${tokens.accessToken}`,
            };
        const retryUrl = retryProbe ? retryProbe.url : url;
        const retryInit: RequestInit = {
          method: retryProbe?.method ?? builtProbe?.method ?? config.method,
          headers: retryHeaders,
          signal: AbortSignal.timeout(timeoutMs),
        };
        // Mirror the original probe's body precedence exactly:
        // config.body && !builtProbe (static body only when no builder ran),
        // then builtProbe.body (first attempt's body if any), then retryProbe.body.
        // A built probe without a body deliberately sends none.
        if (!builtProbe && config.body) retryInit.body = config.body;
        else if (retryProbe?.body) retryInit.body = retryProbe.body;
        else if (builtProbe?.body) retryInit.body = builtProbe.body;
        let retryRes: Response;
        try {
          retryRes = await fetch(retryUrl, retryInit);
        } catch {
          // Network failure on the retry: the refresh itself succeeded and
          // is persisted — report it as a (recoverable) upstream error with
          // the new tokens instead of surfacing a raw transport exception.
          const error = "Connection test failed after token refresh (network)";
          return {
            valid: false,
            error,
            refreshed: true,
            newTokens: tokens,
            statusCode: 502,
            diagnosis: classifyFailure({ error, statusCode: 502 }),
          };
        }
        // An inconclusive retry result keeps the inconclusive semantics of
        // the main probe path (warning + valid), not a bare "ok".
        const retryInconclusive =
          Array.isArray(config.inconclusiveStatuses) &&
          config.inconclusiveStatuses.includes(retryRes.status);
        if (retryInconclusive) {
          const retryInconclusiveBody = await retryRes
            .clone()
            .text()
            .catch(() => "");
          const classification = classifyOAuthProbeInconclusive(
            config,
            connection.provider,
            retryRes.status,
            retryInconclusiveBody
          );
          if (classification) {
            return {
              valid: true,
              error: null,
              warning: classification.warning,
              refreshed: true,
              newTokens: tokens,
              statusCode: retryRes.status,
              diagnosis: makeDiagnosis(
                classification.diagnosisType,
                "upstream",
                classification.warning,
                classification.diagnosisCode
              ),
            };
          }
        }
        const retryAccepted =
          retryRes.ok ||
          (Array.isArray(config.acceptStatuses) && config.acceptStatuses.includes(retryRes.status));
        if (retryAccepted) {
          return {
            valid: true,
            error: null,
            refreshed: true,
            newTokens: tokens,
            diagnosis: makeDiagnosis("ok", "upstream", null, null),
          };
        }
        // The refresh itself succeeded and its tokens are already persisted
        // (onPersist inside refreshOAuthToken) — propagate them even though
        // the probe retry still fails, so the caller does not throw away a
        // healthy token pair and re-burn the old refresh token.
        return {
          valid: false,
          error: `API returned ${retryRes.status} after token refresh`,
          refreshed: true,
          newTokens: tokens,
          statusCode: retryRes.status,
          diagnosis: classifyFailure({
            error: `API returned ${retryRes.status} after token refresh`,
            statusCode: retryRes.status,
          }),
        };
      }
      // Fall through with the original 400 when the refresh itself fails — the
      // inconclusive / geo-block / generic-error paths below handle it.
    }

    const inconclusiveBody =
      Array.isArray(config.inconclusiveStatuses) && config.inconclusiveStatuses.includes(res.status)
        ? await res
            .clone()
            .text()
            .catch(() => "")
        : "";

    const inconclusive = classifyOAuthProbeInconclusive(
      config,
      connection.provider,
      res.status,
      inconclusiveBody
    );

    if (inconclusive) {
      return {
        valid: true,
        error: null,
        warning: inconclusive.warning,
        refreshed,
        newTokens,
        statusCode: res.status,
        diagnosis: makeDiagnosis(
          inconclusive.diagnosisType,
          "upstream",
          inconclusive.warning,
          inconclusive.diagnosisCode
        ),
      };
    }

    // Port of decolua/9router#347: some providers (Codex) intentionally trigger a
    // 400 because the probe body is invalid. A 400 from such a provider means auth
    // succeeded; only 401/403 means the token is bad.
    const accepted =
      res.ok ||
      (Array.isArray(config.acceptStatuses) && config.acceptStatuses.includes(res.status));
    if (accepted) {
      return {
        valid: true,
        error: null,
        refreshed,
        newTokens,
        diagnosis: makeDiagnosis("ok", "upstream", null, null),
      };
    }

    if (connection.provider === "gitlab-duo") {
      const gitlabText = await res.text();
      if (shouldFallbackToPublicCodeSuggestions(res.status, gitlabText)) {
        const fallbackOk = await probeGitLabDuoPublicFallback(connection, accessToken, timeoutMs);
        if (fallbackOk) {
          return {
            valid: true,
            error: null,
            refreshed,
            newTokens,
            diagnosis: makeDiagnosis("ok", "upstream", null, null),
          };
        }
      }
    }

    // If 401/403 and we haven't tried refresh yet, only attempt refresh
    // if the token is actually expired. This prevents corrupting valid tokens
    // when the upstream returns transient 401/403 errors (rate-limiting, etc.).
    if (
      (res.status === 401 || res.status === 403) &&
      !refreshed &&
      isTokenExpired(connection) &&
      connection.refreshToken &&
      typeof connection.refreshToken === "string"
    ) {
      const tokens = await refreshOAuthToken(connection);
      if (tokens) {
        // Retry with new token
        const retryInit: RequestInit = {
          method: builtProbe?.method ?? config.method,
          headers: builtProbe
            ? {
                ...builtProbe.headers,
                Authorization: `Bearer ${tokens.accessToken ?? accessToken}`,
              }
            : {
                ...headers,
                [config.authHeader]: `${config.authPrefix}${tokens.accessToken ?? accessToken}`,
              },
          signal: AbortSignal.timeout(timeoutMs),
        };
        if (builtProbe?.body) retryInit.body = builtProbe.body;
        else if (config.body) retryInit.body = config.body;
        const retryRes = await fetch(url, retryInit);

        const retryInconclusiveBody =
          Array.isArray(config.inconclusiveStatuses) &&
          config.inconclusiveStatuses.includes(retryRes.status)
            ? await retryRes
                .clone()
                .text()
                .catch(() => "")
            : "";

        const retryInconclusive = classifyOAuthProbeInconclusive(
          config,
          connection.provider,
          retryRes.status,
          retryInconclusiveBody
        );

        if (retryInconclusive) {
          return {
            valid: true,
            error: null,
            warning: retryInconclusive.warning,
            refreshed: true,
            newTokens: tokens,
            statusCode: retryRes.status,
            diagnosis: makeDiagnosis(
              retryInconclusive.diagnosisType,
              "upstream",
              retryInconclusive.warning,
              retryInconclusive.diagnosisCode
            ),
          };
        }

        const retryAccepted =
          retryRes.ok ||
          (Array.isArray(config.acceptStatuses) && config.acceptStatuses.includes(retryRes.status));
        if (retryAccepted) {
          return {
            valid: true,
            error: null,
            refreshed: true,
            newTokens: tokens,
            diagnosis: makeDiagnosis("ok", "upstream", null, null),
          };
        }

        const retryBody = await retryRes.text().catch(() => "");

        // #10365 / #10499: same fallback contract as the first attempt above — a
        // rejected direct_access exchange with a freshly-refreshed token is still
        // recoverable via the public Code Suggestions endpoint.
        if (
          connection.provider === "gitlab-duo" &&
          shouldFallbackToPublicCodeSuggestions(retryRes.status, retryBody)
        ) {
          const fallbackOk = await probeGitLabDuoPublicFallback(
            connection,
            tokens.accessToken,
            timeoutMs
          );
          if (fallbackOk) {
            return {
              valid: true,
              error: null,
              refreshed: true,
              newTokens: tokens,
              diagnosis: makeDiagnosis("ok", "upstream", null, null),
            };
          }
        }

        // #1444: a fresh token that still gets a 401 because the account itself was
        // deactivated must be labeled account_deactivated, not a generic auth error.
        const error = isAccountDeactivatedMessage(retryBody)
          ? "Account deactivated by the provider"
          : `API returned ${retryRes.status} after token refresh`;
        return {
          valid: false,
          error,
          refreshed: true,
          statusCode: retryRes.status,
          diagnosis: classifyFailure({ error, statusCode: retryRes.status }),
        };
      }
      const error = "Token expired and refresh failed";
      return {
        valid: false,
        error,
        refreshed: false,
        statusCode: 401,
        diagnosis: classifyFailure({ error, statusCode: 401, refreshFailed: true }),
      };
    }

    // #1444: read a 401/403 body so a deactivated account is labeled distinctly from a
    // revoked token. (The body is unread here for non-gitlab providers; the guard keeps
    // it safe if it was already consumed.) antigravity/agy read any failure body so a
    // geo-blocked egress location is labeled with an actionable message instead of a
    // generic "API returned 400".
    const bodyText =
      res.status === 401 ||
      res.status === 403 ||
      connection.provider === "antigravity" ||
      connection.provider === "agy"
        ? await res.text().catch(() => "")
        : "";
    const error = isGeoBlockedError(bodyText)
      ? "Egress location blocked by Google (User location is not supported). The Cloud Code API is not offered from this server's proxy exit region — route antigravity/agy through a proxy in a supported region (e.g. US/EU) or use a different provider. This is NOT an account problem."
      : isAccountDeactivatedMessage(bodyText)
        ? "Account deactivated by the provider"
        : res.status === 401
          ? "Token invalid or revoked"
          : res.status === 403
            ? "Access denied"
            : `API returned ${res.status}`;

    return {
      valid: false,
      error,
      refreshed,
      statusCode: res.status,
      diagnosis: classifyFailure({ error, statusCode: res.status }),
    };
  } catch (err) {
    // AbortSignal.timeout(...) surfaces as an AbortError/TimeoutError once the probe
    // exceeds its deadline (#1449). Report it with a clear, actionable message instead
    // of leaking the raw "The operation was aborted" text.
    const isTimeout = err?.name === "TimeoutError" || err?.name === "AbortError";
    const error = isTimeout
      ? `Test timed out after ${Math.round(timeoutMs / 1000)}s`
      : toSafeMessage(err?.message, "Connection test failed");
    return {
      valid: false,
      error,
      refreshed,
      diagnosis: classifyFailure({ error }),
    };
  }
}

/**
 * Test API key connection
 */
async function testApiKeyConnection(connection: any) {
  const requiresApiKey = !providerAllowsOptionalApiKey(connection.provider);
  if (requiresApiKey && !connection.apiKey) {
    const error = "Missing API key";
    return {
      valid: false,
      error,
      diagnosis: makeDiagnosis("auth_missing", "local", error, "missing_api_key"),
    };
  }

  const result = projectProviderValidationResultForPublicResponse(
    await validateProviderApiKey({
      provider: connection.provider,
      apiKey: connection.apiKey,
      providerSpecificData: connection.providerSpecificData,
    })
  );

  if (result.unsupported) {
    const error = "Provider test not supported";
    return {
      valid: false,
      skipped: true,
      error,
      diagnosis: classifyFailure({ error, unsupported: true, provider: connection.provider }),
    };
  }

  const error = result.valid ? null : result.error || "Invalid API key";
  const diagnosis = result.valid
    ? makeDiagnosis("ok", "upstream", null, null)
    : classifyFailure({ error, statusCode: result.statusCode, provider: connection.provider });

  return buildApiKeyConnectionTestResult(result, error, diagnosis);
}

/**
 * Core test logic — reusable by test-batch without HTTP self-calls.
 * @param {string} connectionId
 * @param {string} validationModelId Optional custom model ID to test connection with
 * @returns {Promise<object>} Test result (same shape as the JSON response)
 */
export async function testSingleConnection(connectionId: string, validationModelId?: string) {
  const connection = await getCachedProviderConnectionById(connectionId);

  if (!connection) {
    return { valid: false, error: "Connection not found", diagnosis: null, latencyMs: 0 };
  }

  if (await isConnectionUnavailableToAuxiliaryActivity(connectionId)) {
    const error = "Connection test deferred while an exclusive session lease is active";
    return {
      valid: false,
      skipped: true,
      error,
      diagnosis: makeDiagnosis("lease_active", "local", error, "exclusive_lease_active"),
      latencyMs: 0,
    };
  }

  const provider = typeof connection.provider === "string" ? connection.provider : "";
  if (!provider) {
    return {
      valid: false,
      error: "Connection provider is invalid",
      diagnosis: makeDiagnosis(
        "validation_error",
        "local",
        "Connection provider is invalid",
        "provider_invalid"
      ),
      latencyMs: 0,
    };
  }
  retirement.assertProviderAvailable(provider);

  let proxyInfo: any = null;
  try {
    proxyInfo = await resolveProxyForConnection(connectionId);
  } catch (proxyErr: unknown) {
    console.log(
      `[ConnectionTest] Failed to resolve proxy for ${connectionId}:`,
      toSafeMessage(proxyErr, "Proxy resolution failed")
    );
  }

  let result;
  const startTime = Date.now();
  const runtime = await getProviderRuntimeStatus(connection);

  // Codex app-server connections carry no validatable OpenAI token (the codex
  // app-server process self-manages its own OAuth). Probe the app-server's
  // /readyz liveness endpoint instead of the meaningless token check — otherwise
  // every sweep reports a false "Token invalid or revoked" 401 and cools the
  // connection down. Returns null for non-app-server connections (fall through).
  const appServerResult = await testCodexAppServerConnection(connection);

  if ((runtime as any)?.diagnosis) {
    result = {
      valid: false,
      error: (runtime as any).error,
      refreshed: false,
      diagnosis: (runtime as any).diagnosis,
    };
  } else if (appServerResult) {
    result = await runWithProxyContext(proxyInfo?.proxy || null, () =>
      Promise.resolve(appServerResult)
    );
  } else if (shouldUseApiKeyConnectionTest(connection.authType, provider)) {
    const enrichedConnection = validationModelId
      ? {
          ...connection,
          providerSpecificData: {
            ...((connection.providerSpecificData as any) || {}),
            validationModelId,
          },
        }
      : connection;
    result = await runWithProxyContext(proxyInfo?.proxy || null, () =>
      testApiKeyConnection(enrichedConnection)
    );
  } else {
    result = await runWithProxyContext(proxyInfo?.proxy || null, () =>
      testOAuthConnection(connection)
    );
  }

  // Every runtime path converges here before any health-state write, diagnosis,
  // persistent log, or public response. API-key validation is projected at its
  // own seam above as well so future refactors cannot move it past this boundary.
  result = projectConnectionTestResultForPublicResponse(result);
  const publicRuntime = projectProviderRuntimeForPublicResponse(runtime);

  const latencyMs = Date.now() - startTime;

  // Unsupported validation capability is neutral: the probe established that
  // this provider cannot be verified through the generic test surface, not
  // that its credential is invalid. Do not mutate persisted credential health
  // (testStatus/lastError/etc.) — but DO activate it if it isn't already: a
  // connection that can never be health-checked would otherwise stay hidden
  // from /v1/models forever under the "only advertise tested connections"
  // default (isActive starts false on creation — see POST /api/providers),
  // silently regressing every provider without a test surface.
  if (result.skipped === true) {
    if (connection.isActive !== true) {
      try {
        await updateProviderConnection(connectionId, { isActive: true });
      } catch (activateError) {
        console.log(
          `[ConnectionTest] Failed to activate unverifiable connection ${connectionId}:`,
          toSafeMessage(activateError, "Connection activation failed")
        );
      }
    }
    return {
      ...result,
      latencyMs,
      runtime: publicRuntime,
      testedAt: null,
    };
  }

  const now = new Date().toISOString();
  const diagnosis =
    result.diagnosis ||
    (result.valid
      ? makeDiagnosis("ok", "local", null, null)
      : classifyFailure({ error: result.error, statusCode: result.statusCode, provider }));

  // #9623: a failed connection test must not paint the connection permanently red.
  // Previously a non-terminal failure wrote `testStatus: "error"` with
  // `rateLimitedUntil: null` — since the cooldown filter only ever skips entries
  // whose rateLimitedUntil is in the future, a null cooldown left the connection
  // permanently unavailable after a transient outage. Give non-terminal test
  // failures a short cooldown so the lazy-recovery path retries them.
  const terminalTestStatuses = new Set(["banned", "expired", "credits_exhausted"]);
  const isTerminalFailure =
    !result.valid &&
    terminalTestStatuses.has(String(diagnosis.code ?? diagnosis.type ?? "").toLowerCase());
  const testFailureCooldownMs = result.valid ? 0 : 30_000; // 30s retry window

  // A successful credential probe proves the KEY is valid. It does NOT prove the
  // quota window reopened: the probe is a cheap auth/models call that never touches
  // the chat quota a weekly cap applies to. Clearing an ACTIVE cooldown here — which
  // the credential-health scheduler triggers for every connection every 300s — put
  // `zai/glm-5.3` back to `active` / `rate_limited_until = NULL` within 30s of every
  // restart, so combo dispatched it straight into the same weekly 429. Same rule as
  // maybeClearRecoveredQuotaState: a future rateLimitedUntil is the 429 handler's
  // hard statement and no poller may overrule it. Once it elapses, the next probe
  // clears it normally.
  const clearErrorState = shouldClearErrorStateOnValidProbe(
    connection as { rateLimitedUntil?: string | null },
    result.valid
  );
  const lastErrorType = result.valid ? connection.lastErrorType : diagnosis.type;

  const updateData: Record<string, any> = {
    testStatus: clearErrorState ? "active" : result.valid ? connection.testStatus : "error",
    // A passing test is the sole activation signal under the "only advertise
    // tested-working connections" default — see POST /api/providers, which
    // now creates connections isActive:false. Only ever flips ON here: a
    // failing test intentionally leaves isActive untouched (a transient
    // failure on an already-active, already-working connection must not take
    // it out of rotation — that's what the cooldown/rateLimitedUntil below is
    // for), so this never deactivates anything.
    ...(result.valid ? { isActive: true } : {}),
    lastError: clearErrorState ? null : result.valid ? connection.lastError : result.error,
    lastErrorAt: clearErrorState ? null : result.valid ? connection.lastErrorAt : now,
    lastTested: now,
    lastErrorType: clearErrorState ? null : lastErrorType,
    lastErrorSource: clearErrorState
      ? null
      : result.valid
        ? connection.lastErrorSource
        : diagnosis.source,
    errorCode: clearErrorState
      ? null
      : result.valid
        ? connection.errorCode
        : diagnosis.code || result.statusCode || null,
    rateLimitedUntil: clearErrorState
      ? null
      : isTerminalFailure
        ? connection.rateLimitedUntil || null
        : result.valid
          ? connection.rateLimitedUntil || null
          : new Date(Date.now() + testFailureCooldownMs).toISOString(),
  };

  if (clearErrorState) {
    updateData.backoffLevel = 0;
  }

  if (result.valid && (connection.apiKey || connection.accessToken)) {
    const recovered = recoverKeyHealth(connectionId, "primary", connection.providerSpecificData);
    if (recovered) updateData.providerSpecificData = recovered;
  }

  if (result.refreshed && result.newTokens) {
    updateData.accessToken = result.newTokens.accessToken;
    if (result.newTokens.refreshToken) {
      updateData.refreshToken = result.newTokens.refreshToken;
    }
    if (result.newTokens.expiresIn) {
      updateData.expiresAt = new Date(Date.now() + result.newTokens.expiresIn * 1000).toISOString();
    }
  }

  // Update status in db
  await updateProviderConnection(connectionId, updateData);

  // Sync to cloud if token was refreshed
  if (result.refreshed) {
    await syncToCloudIfEnabled();
  }

  // Log to Logger tab (call_logs table)
  try {
    const hideLogs = await shouldHideLogs();
    if (!hideLogs) {
      saveCallLog({
        method: "POST",
        path: "/api/providers/test",
        status: result.valid ? 200 : result.statusCode || 401,
        model: "connection-test",
        provider,
        connectionId,
        duration: latencyMs,
        error: result.valid ? null : result.error || null,
        sourceFormat: "test",
        targetFormat: "test",
      }).catch(() => {});
    }
  } catch {}

  // Log to Proxy tab (proxy_logs table)
  try {
    logProxyEvent({
      status: result.valid ? "success" : "error",
      proxy: proxyInfo?.proxy || null,
      level: proxyInfo?.level || "provider-test",
      levelId: proxyInfo?.levelId || null,
      provider,
      targetUrl: `${provider}/connection-test`,
      latencyMs,
      error: result.valid ? null : result.error || null,
      connectionId,
      comboId: null,
      account: connectionId?.slice(0, 8) || null,
      tlsFingerprint: false,
    });
  } catch {}

  return {
    valid: result.valid,
    error: result.error,
    warning: result.warning || null,
    refreshed: result.refreshed || false,
    diagnosis,
    latencyMs,
    statusCode: result.statusCode || null,
    runtime: publicRuntime,
    testedAt: now,
  };
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    let rawBody: unknown = {};
    try {
      rawBody = await request.json();
    } catch {
      // Empty or non-JSON body — treat as {}
    }
    const validation = validateBody(providerConnectionTestBodySchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { validationModelId } = validation.data;

    const data = await testSingleConnection(id, validationModelId);

    if (data.error === "Connection not found") {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const retired = retirement.responseForError(error);
    if (retired) return retired;
    console.log("Error testing connection:", toSafeMessage(error, "Connection test failed"));
    return NextResponse.json({ error: "Test failed" }, { status: 500 });
  }
}
