// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { PROVIDERS, OAUTH_ENDPOINTS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { buildFormParams, extractOAuthErrorCode } from "../shared.ts";

/**
 * Specialized refresh for Qoder OAuth tokens
 */
export async function refreshQoderToken(refreshToken, log, proxyConfig: unknown = null) {
  if (!OAUTH_ENDPOINTS.qoder.token || !PROVIDERS.qoder.clientId || !PROVIDERS.qoder.clientSecret) {
    log?.warn?.(
      "TOKEN_REFRESH",
      "Qoder OAuth refresh skipped: browser OAuth is not configured in this environment"
    );
    return null;
  }

  const basicAuth = btoa(`${PROVIDERS.qoder.clientId}:${PROVIDERS.qoder.clientSecret}`);

  const response = await runWithProxyContext(proxyConfig, () =>
    fetch(OAUTH_ENDPOINTS.qoder.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: buildFormParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: PROVIDERS.qoder.clientId,
        client_secret: PROVIDERS.qoder.clientSecret,
      }),
    })
  );

  if (!response.ok) {
    const errorText = await response.text();
    log?.error?.("TOKEN_REFRESH", "Failed to refresh Qoder token", {
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

  log?.info?.("TOKEN_REFRESH", "Successfully refreshed Qoder token", {
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
