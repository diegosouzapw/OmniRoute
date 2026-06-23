// Auto-extracted from open-sse/services/tokenRefresh.ts in PR-#4609-batch
// Function: refreshGoogleToken | Lines: 799-859 (61 LOC)
// Ref: see open-sse/services/tokenRefresh.ts top-of-file comment for split rationale.

import {
  buildFormParams
} from "../tokenRefresh";

export async function refreshGoogleToken(
  refreshToken,
  clientId,
  clientSecret,
  log,
  proxyConfig: unknown = null
) {
  const response = await runWithProxyContext(proxyConfig, () =>
    fetch(OAUTH_ENDPOINTS.google.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: buildFormParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })
  );

  if (!response.ok) {
    const errorText = await response.text();
    log?.error?.("TOKEN_REFRESH", "Failed to refresh Google token", {
      status: response.status,
      error: errorText.slice(0, 200),
    });

    // Detect unrecoverable token (invalid_grant = revoked / expired refresh token)
    try {
      const errorBody = JSON.parse(errorText);
      if (errorBody.error === "invalid_grant") {
        log?.error?.("TOKEN_REFRESH", "Google refresh token invalid. Re-authentication required.", {
          provider: "google",
        });
        return { error: "unrecoverable_refresh_error", code: "invalid_grant" };
      }
    } catch {
      // not JSON — fall through
    }

    return null;
  }

  const tokens = await response.json();

  log?.info?.("TOKEN_REFRESH", "Successfully refreshed Google token", {
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

