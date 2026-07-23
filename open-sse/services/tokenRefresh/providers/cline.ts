// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { PROVIDERS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { extractOAuthErrorCode } from "../shared.ts";

/**
 * Specialized refresh for Cline OAuth tokens.
 * Cline refresh endpoint expects JSON body and returns camelCase fields.
 */
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
