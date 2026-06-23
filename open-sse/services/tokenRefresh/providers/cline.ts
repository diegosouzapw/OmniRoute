// Auto-extracted from open-sse/services/tokenRefresh.ts in PR-#4609-batch
// Function: refreshClineToken | Lines: 466-534 (69 LOC)
// Ref: see open-sse/services/tokenRefresh.ts top-of-file comment for split rationale.

import {
  extractOAuthErrorCode
} from "../tokenRefresh";

export async function refreshClineToken(refreshToken, log, proxyConfig: unknown = null) {
  const endpoint = PROVIDERS.cline?.refreshUrl;
  if (!endpoint) {
    log?.warn?.("TOKEN_REFRESH", "No refresh URL configured for Cline");
    return null;
  }

  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          refreshToken,
          grantType: "refresh_token",
          clientType: "extension",
        }),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Cline token", {
        status: response.status,
        error: errorText,
      });
      const code = extractOAuthErrorCode(errorText);
      if (code === "invalid_grant" || code === "invalid_request") {
        return { error: "unrecoverable_refresh_error", code };
      }
      return null;
    }

    const payload = await response.json();
    const data = payload?.data || payload;
    const expiresAtIso = data?.expiresAt;
    const expiresIn = expiresAtIso
      ? Math.max(1, Math.floor((new Date(expiresAtIso).getTime() - Date.now()) / 1000))
      : undefined;

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Cline token", {
      hasNewAccessToken: !!data?.accessToken,
      hasNewRefreshToken: !!data?.refreshToken,
      expiresIn,
    });

    return {
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken || refreshToken,
      expiresIn,
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", `Network error refreshing Cline token: ${error.message}`);
    return null;
  }
}

/**
 * Specialized refresh for Kimi Coding OAuth tokens.
 * Uses custom X-Msh-* headers required by Kimi OAuth API.
 *
 * Uses a stable device_id from providerSpecificData (stored at login) to avoid
 * anti-bot detection from ephemeral IDs. If absent, derives a deterministic ID
 * from the refresh token hash so it is at least stable across refreshes for the
 * same token.
 */
