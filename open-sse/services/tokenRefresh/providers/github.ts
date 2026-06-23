// Auto-extracted from open-sse/services/tokenRefresh.ts in PR-#4609-batch
// Function: refreshGitHubToken | Lines: 1307-1354 (48 LOC)
// Ref: see open-sse/services/tokenRefresh.ts top-of-file comment for split rationale.

import {
  buildFormParams,
  extractOAuthErrorCode
} from "../tokenRefresh";

export async function refreshGitHubToken(refreshToken, log, proxyConfig: unknown = null) {
  const response = await runWithProxyContext(proxyConfig, () =>
    fetch(OAUTH_ENDPOINTS.github.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: buildFormParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: PROVIDERS.github.clientId,
        client_secret: PROVIDERS.github.clientSecret,
      }),
    })
  );

  if (!response.ok) {
    const errorText = await response.text();
    log?.error?.("TOKEN_REFRESH", "Failed to refresh GitHub token", {
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

  log?.info?.("TOKEN_REFRESH", "Successfully refreshed GitHub token", {
    hasNewAccessToken: !!tokens.access_token,
    hasNewRefreshToken: !!tokens.refresh_token,
    expiresIn: tokens.expires_in,
  });

  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token || refreshToken,
    expiresIn: tokens.expires_in,
  };
}

/**
 * Refresh GitHub Copilot token using GitHub access token
 */
