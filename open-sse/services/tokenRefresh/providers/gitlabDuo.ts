// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { PROVIDERS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { buildGitLabOAuthEndpoints, resolveGitLabOAuthBaseUrl } from "@/lib/oauth/gitlab";
import { buildFormParams, type RefreshLogger } from "../shared.ts";

/**
 * Specialized refresh for GitLab Duo OAuth tokens.
 * Token URL is instance-specific; resolves from providerSpecificData.baseUrl.
 * Uses PKCE authorization_code flow initially but refresh_token grant does NOT
 * require code_verifier — only client_id + refresh_token.
 * On invalid_grant (revoked/expired refresh token) returns the unrecoverable sentinel.
 */
export async function refreshGitLabDuoToken(
  refreshToken: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  if (!refreshToken) {
    log?.warn?.("TOKEN_REFRESH", "No refresh token for GitLab Duo");
    return null;
  }

  const baseUrl = resolveGitLabOAuthBaseUrl(providerSpecificData);
  const endpoints = buildGitLabOAuthEndpoints(baseUrl);
  const tokenUrl = endpoints.tokenUrl;

  // client_id from providerSpecificData (stored at login) or fall back to PROVIDERS config
  const clientId =
    (providerSpecificData?.clientId as string) ||
    PROVIDERS["gitlab-duo"]?.clientId ||
    process.env.GITLAB_DUO_OAUTH_CLIENT_ID ||
    process.env.GITLAB_OAUTH_CLIENT_ID ||
    "";

  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: buildFormParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: clientId,
        }),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();

      // Detect unrecoverable token — GitLab returns standard OAuth2 error codes.
      try {
        const errorBody = JSON.parse(errorText);
        const errorCode = errorBody.error;
        if (errorCode === "invalid_grant" || errorCode === "invalid_request") {
          log?.error?.(
            "TOKEN_REFRESH",
            "GitLab Duo refresh token invalid. Re-authentication required.",
            {
              errorCode,
            }
          );
          return { error: "unrecoverable_refresh_error", code: errorCode };
        }
      } catch {
        // not JSON — fall through
      }

      log?.error?.("TOKEN_REFRESH", "Failed to refresh GitLab Duo token", {
        status: response.status,
        error: errorText.slice(0, 200),
      });
      return null;
    }

    const tokens = await response.json();

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed GitLab Duo token", {
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
    log?.error?.(
      "TOKEN_REFRESH",
      `Network error refreshing GitLab Duo token: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
