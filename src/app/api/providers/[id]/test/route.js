import { NextResponse } from "next/server";
import { getProviderConnectionById, updateProviderConnection, isCloudEnabled } from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { validateProviderApiKey } from "@/lib/providers/validation";
import { getCliRuntimeStatus } from "@/shared/services/cliRuntime";
// Use the shared open-sse token refresh with built-in dedup/race-condition cache
import { getAccessToken } from "@omniroute/open-sse/services/tokenRefresh.js";

// OAuth provider test endpoints
const OAUTH_TEST_CONFIG = {
  claude: {
    // Claude doesn't have userinfo, we verify token exists and not expired
    checkExpiry: true,
  },
  codex: {
    // Codex OAuth tokens are ChatGPT session tokens, NOT standard OpenAI API keys.
    // They don't work with api.openai.com/v1/models (returns 403 "Access denied").
    // Use checkExpiry mode instead — actual connectivity is validated via Usage/Limits.
    checkExpiry: true,
    refreshable: true,
  },
  "gemini-cli": {
    url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
  },
  antigravity: {
    url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
  },
  github: {
    url: "https://api.github.com/user",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    extraHeaders: { "User-Agent": "OmniRoute", Accept: "application/vnd.github+json" },
  },
  iflow: {
    url: "https://iflow.cn/api/oauth/getUserInfo",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
  },
  qwen: {
    url: "https://portal.qwen.ai/v1/models",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
  },
  cursor: {
    checkExpiry: true,
  },
  "kimi-coding": {
    checkExpiry: true,
    refreshable: true,
  },
  kilocode: {
    // Kilo OAuth does not expose a stable user-info endpoint in all environments.
    // Validate using token presence/expiry as a lightweight auth check.
    checkExpiry: true,
  },
  cline: {
    url: "https://api.cline.bot/api/v1/models",
    method: "GET",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    refreshable: true,
    extraHeaders: {
      "HTTP-Referer": "https://cline.bot",
      "X-Title": "Cline",
    },
  },
  kiro: {
    checkExpiry: true,
    refreshable: true,
  },
};

const CLI_RUNTIME_PROVIDER_MAP = {
  cline: "cline",
  kilocode: "kilo",
};

function toSafeMessage(value, fallback = "Unknown error") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function makeDiagnosis(type, source, message, code = null) {
  return {
    type,
    source,
    message: message || null,
    code: code ?? null,
  };
}

function classifyFailure({ error, statusCode = null, refreshFailed = false, unsupported = false }) {
  const message = toSafeMessage(error, "Connection test failed");
  const normalized = message.toLowerCase();
  const numericStatus = Number.isFinite(statusCode) ? Number(statusCode) : null;

  if (unsupported) {
    return makeDiagnosis("unsupported", "validation", message, "unsupported");
  }

  if (refreshFailed || normalized.includes("refresh failed")) {
    return makeDiagnosis("token_refresh_failed", "oauth", message, "refresh_failed");
  }

  if (numericStatus === 401 || numericStatus === 403) {
    return makeDiagnosis("upstream_auth_error", "upstream", message, String(numericStatus));
  }

  if (numericStatus === 429) {
    return makeDiagnosis("upstream_rate_limited", "upstream", message, "429");
  }

  if (numericStatus && numericStatus >= 500) {
    return makeDiagnosis("upstream_unavailable", "upstream", message, String(numericStatus));
  }

  if (normalized.includes("token expired") || normalized.includes("expired")) {
    return makeDiagnosis("token_expired", "oauth", message, "token_expired");
  }

  if (
    normalized.includes("invalid api key") ||
    normalized.includes("token invalid") ||
    normalized.includes("revoked") ||
    normalized.includes("access denied") ||
    normalized.includes("unauthorized") ||
    normalized.includes("forbidden")
  ) {
    return makeDiagnosis(
      "upstream_auth_error",
      "upstream",
      message,
      numericStatus ? String(numericStatus) : "auth_failed"
    );
  }

  if (
    normalized.includes("rate limit") ||
    normalized.includes("quota") ||
    normalized.includes("too many requests")
  ) {
    return makeDiagnosis(
      "upstream_rate_limited",
      "upstream",
      message,
      numericStatus ? String(numericStatus) : "rate_limited"
    );
  }

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("network") ||
    normalized.includes("timeout") ||
    normalized.includes("econn") ||
    normalized.includes("enotfound") ||
    normalized.includes("socket")
  ) {
    return makeDiagnosis("network_error", "upstream", message, "network_error");
  }

  return makeDiagnosis(
    "upstream_error",
    "upstream",
    message,
    numericStatus ? String(numericStatus) : "upstream_error"
  );
}

async function getProviderRuntimeStatus(provider) {
  const toolId = CLI_RUNTIME_PROVIDER_MAP[provider];
  if (!toolId) return null;

  try {
    const runtime = await getCliRuntimeStatus(toolId);
    if (runtime.installed && runtime.runnable) {
      return runtime;
    }

    const runtimeMessage = runtime.installed
      ? `Local CLI runtime is installed but not runnable (${runtime.reason || "healthcheck_failed"})`
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
    const runtimeMessage = `Failed to check local CLI runtime: ${error?.message || "runtime_check_failed"}`;
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
async function refreshOAuthToken(connection) {
  const { provider, refreshToken } = connection;
  if (!refreshToken) return null;

  try {
    // Kiro needs extra fields the generic function expects
    const credentials = {
      refreshToken,
      providerSpecificData: connection.providerSpecificData || {},
    };

    const result = await getAccessToken(provider, credentials, console);
    return result; // { accessToken, expiresIn, refreshToken } or null
  } catch (err) {
    console.log(`Error refreshing ${provider} token:`, err.message);
    return null;
  }
}

/**
 * Check if token is expired or about to expire (within 5 minutes)
 */
function isTokenExpired(connection) {
  const expiresAtValue = connection.expiresAt || connection.tokenExpiresAt;
  if (!expiresAtValue) return false;
  const expiresAt = new Date(expiresAtValue).getTime();
  const buffer = 5 * 60 * 1000; // 5 minutes
  return expiresAt <= Date.now() + buffer;
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
    console.log("Error syncing to cloud after token refresh:", error);
  }
}

/**
 * Test OAuth connection by calling provider API
 * Auto-refreshes token if expired
 * @returns {{ valid: boolean, error: string|null, refreshed: boolean, newTokens: object|null }}
 */
async function testOAuthConnection(connection) {
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

  // Auto-refresh if token is expired and provider supports refresh
  const tokenExpired = isTokenExpired(connection);
  if (config.refreshable && tokenExpired && connection.refreshToken) {
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
    const headers = {
      [config.authHeader]: `${config.authPrefix}${accessToken}`,
      ...config.extraHeaders,
    };

    const res = await fetch(config.url, {
      method: config.method,
      headers,
    });

    if (res.ok) {
      return {
        valid: true,
        error: null,
        refreshed,
        newTokens,
        diagnosis: makeDiagnosis("ok", "upstream", null, null),
      };
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
        const retryRes = await fetch(config.url, {
          method: config.method,
          headers: {
            [config.authHeader]: `${config.authPrefix}${tokens.accessToken}`,
            ...config.extraHeaders,
          },
        });

        if (retryRes.ok) {
          return {
            valid: true,
            error: null,
            refreshed: true,
            newTokens: tokens,
            diagnosis: makeDiagnosis("ok", "upstream", null, null),
          };
        }

        const error = `API returned ${retryRes.status} after token refresh`;
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

    const error =
      res.status === 401
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
    const error = toSafeMessage(err?.message, "Connection test failed");
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
async function testApiKeyConnection(connection) {
  if (!connection.apiKey) {
    const error = "Missing API key";
    return {
      valid: false,
      error,
      diagnosis: makeDiagnosis("auth_missing", "local", error, "missing_api_key"),
    };
  }

  const result = await validateProviderApiKey({
    provider: connection.provider,
    apiKey: connection.apiKey,
    providerSpecificData: connection.providerSpecificData,
  });

  if (result.unsupported) {
    const error = "Provider test not supported";
    return {
      valid: false,
      error,
      diagnosis: classifyFailure({ error, unsupported: true }),
    };
  }

  const error = result.valid ? null : result.error || "Invalid API key";
  const diagnosis = result.valid
    ? makeDiagnosis("ok", "upstream", null, null)
    : classifyFailure({ error });

  return {
    valid: !!result.valid,
    error,
    diagnosis,
  };
}

/**
 * Core test logic — reusable by test-batch without HTTP self-calls.
 * @param {string} connectionId
 * @returns {Promise<object>} Test result (same shape as the JSON response)
 */
export async function testSingleConnection(connectionId) {
  const connection = await getProviderConnectionById(connectionId);

  if (!connection) {
    return { valid: false, error: "Connection not found", diagnosis: null, latencyMs: 0 };
  }

  let result;
  const startTime = Date.now();
  const runtime = await getProviderRuntimeStatus(connection.provider);

  if (runtime?.diagnosis) {
    result = {
      valid: false,
      error: runtime.error,
      refreshed: false,
      diagnosis: runtime.diagnosis,
    };
  } else if (connection.authType === "apikey") {
    result = await testApiKeyConnection(connection);
  } else {
    result = await testOAuthConnection(connection);
  }

  const latencyMs = Date.now() - startTime;

  // Build update data
  const now = new Date().toISOString();
  const diagnosis =
    result.diagnosis ||
    (result.valid
      ? makeDiagnosis("ok", "local", null, null)
      : classifyFailure({ error: result.error, statusCode: result.statusCode }));

  const updateData = {
    testStatus: result.valid ? "active" : "error",
    lastError: result.valid ? null : result.error,
    lastErrorAt: result.valid ? null : now,
    lastTested: now,
    lastErrorType: result.valid ? null : diagnosis.type,
    lastErrorSource: result.valid ? null : diagnosis.source,
    errorCode: result.valid ? null : diagnosis.code || result.statusCode || null,
    rateLimitedUntil: result.valid ? null : connection.rateLimitedUntil || null,
  };

  if (result.valid) {
    updateData.backoffLevel = 0;
  }

  // If token was refreshed, update tokens in DB
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

  return {
    valid: result.valid,
    error: result.error,
    refreshed: result.refreshed || false,
    diagnosis,
    latencyMs,
    statusCode: result.statusCode || null,
    runtime: runtime || null,
    testedAt: now,
  };
}

// POST /api/providers/[id]/test - Test connection
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const data = await testSingleConnection(id);

    if (data.error === "Connection not found") {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error testing connection:", error);
    return NextResponse.json({ error: "Test failed" }, { status: 500 });
  }
}
