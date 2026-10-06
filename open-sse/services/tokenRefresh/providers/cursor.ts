/**
 * Cursor OAuth token refresh via api2.cursor.sh/auth/exchange_user_api_key.
 * OpenCodex-compatible (Bearer refresh token, JSON body `{}`).
 * Self-contained in open-sse (no import from src/).
 */

const CURSOR_REFRESH_URL = "https://api2.cursor.sh/auth/exchange_user_api_key";
const REFRESH_TIMEOUT_MS = 15_000;
const REFRESH_ATTEMPTS = 3;
const REFRESH_RETRY_BASE_MS = 300;
const EXPIRY_SKEW_MS = 5 * 60 * 1000;
const FALLBACK_TTL_MS = 60 * 60 * 1000;

function isRetryableRefreshStatus(status: number): boolean {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function refreshRetryDelayMs(attempt: number, baseMs: number): number {
  const exp = baseMs * 2 ** attempt;
  return Math.floor(exp * (0.8 + Math.random() * 0.4));
}

function decodeExpMs(token: string): number {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return Date.now() + FALLBACK_TTL_MS;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8")) as {
      exp?: unknown;
    };
    if (typeof payload.exp === "number") return payload.exp * 1000 - EXPIRY_SKEW_MS;
  } catch {
    /* ignore */
  }
  return Date.now() + FALLBACK_TTL_MS;
}

export type RefreshCursorTokenOptions = {
  retryBaseMs?: number;
  attempts?: number;
};

/**
 * @returns {{ accessToken, refreshToken, expiresAt } | { error, code } | null}
 */
export async function refreshCursorToken(
  refreshToken: string,
  log?: { error?: (...args: unknown[]) => void; info?: (...args: unknown[]) => void },
  _proxyConfig: unknown = null,
  options: RefreshCursorTokenOptions = {}
) {
  if (!refreshToken) {
    return { error: "unrecoverable_refresh_error", code: "no_refresh_token" };
  }

  const attempts = options.attempts ?? REFRESH_ATTEMPTS;
  const retryBaseMs = options.retryBaseMs ?? REFRESH_RETRY_BASE_MS;
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    let response: Response;
    try {
      response = await fetch(CURSOR_REFRESH_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
        body: "{}",
        signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
      });
    } catch (err) {
      lastError = err;
      if (attempt === attempts - 1) break;
      await new Promise((r) => setTimeout(r, refreshRetryDelayMs(attempt, retryBaseMs)));
      continue;
    }

    if (response.ok) {
      const data = (await response.json()) as { accessToken?: string; refreshToken?: string };
      if (!data.accessToken) {
        log?.error?.("TOKEN_REFRESH", "Cursor refresh response missing access token");
        return null;
      }
      const nextRefresh = data.refreshToken || refreshToken;
      log?.info?.("TOKEN_REFRESH", "Successfully refreshed Cursor token");
      return {
        accessToken: data.accessToken,
        refreshToken: nextRefresh,
        expiresAt: new Date(decodeExpMs(data.accessToken)).toISOString(),
      };
    }

    if (response.status === 401 || response.status === 403) {
      log?.error?.("TOKEN_REFRESH", "Cursor refresh rejected — re-authentication required", {
        status: response.status,
      });
      return { error: "unrecoverable_refresh_error", code: "unauthorized" };
    }

    if (!isRetryableRefreshStatus(response.status) || attempt === attempts - 1) {
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Cursor token", { status: response.status });
      return null;
    }

    lastError = new Error(`Cursor token refresh failed: ${response.status}`);
    await response.body?.cancel().catch(() => {});
    await new Promise((r) => setTimeout(r, refreshRetryDelayMs(attempt, retryBaseMs)));
  }

  log?.error?.(
    "TOKEN_REFRESH",
    lastError instanceof Error ? lastError.message : "Cursor token refresh failed"
  );
  return null;
}
