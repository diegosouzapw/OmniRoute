// Auto-extracted from open-sse/services/tokenRefresh.ts in PR-#4609-batch
// Function: refreshQwenToken | Lines: 860-940 (81 LOC)
// Ref: see open-sse/services/tokenRefresh.ts top-of-file comment for split rationale.

import {
  buildFormParams
} from "../tokenRefresh";

export async function refreshQwenToken(refreshToken, log, proxyConfig: unknown = null) {
  const endpoint = OAUTH_ENDPOINTS.qwen.token;

  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: buildFormParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: PROVIDERS.qwen.clientId,
        }),
      })
    );

    if (response.status === 200) {
      const tokens = await response.json();

      log?.info?.("TOKEN_REFRESH", "Successfully refreshed Qwen token", {
        hasNewAccessToken: !!tokens.access_token,
        hasNewRefreshToken: !!tokens.refresh_token,
        expiresIn: tokens.expires_in,
      });

      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || refreshToken,
        expiresIn: tokens.expires_in,
        providerSpecificData: tokens.resource_url
          ? { resourceUrl: tokens.resource_url }
          : undefined,
      };
    } else {
      const errorText = await response.text().catch(() => "");

      // Detect unrecoverable invalid_request (expired/revoked refresh token or bad client_id)
      let errorCode = null;
      try {
        const parsed = JSON.parse(errorText);
        errorCode = parsed?.error;
      } catch {
        // not JSON, ignore
      }

      if (errorCode === "invalid_request" || errorCode === "invalid_grant") {
        log?.error?.(
          "TOKEN_REFRESH",
          "Qwen refresh token is invalid or expired. Re-authentication required.",
          {
            status: response.status,
            errorCode,
          }
        );
        return { error: "unrecoverable_refresh_error", code: errorCode };
      }

      log?.warn?.("TOKEN_REFRESH", `Error with Qwen endpoint`, {
        status: response.status,
        error: errorText,
      });
    }
  } catch (error) {
    log?.warn?.("TOKEN_REFRESH", `Network error trying Qwen endpoint`, {
      error: error.message,
    });
  }

  log?.error?.("TOKEN_REFRESH", "Failed to refresh Qwen token");
  return null;
}

/**
 * Specialized refresh for Codex (OpenAI) OAuth tokens.
 * OpenAI uses rotating (one-time-use) refresh tokens.
 * Returns { error: 'unrecoverable_refresh_error', code } when the token has already been
 * consumed or is invalid, so callers can stop retrying and request re-authentication.
 */
