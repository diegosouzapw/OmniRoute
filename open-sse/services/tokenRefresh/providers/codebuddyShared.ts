// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import type { RefreshLogger } from "../shared.ts";

/**
 * Shared CodeBuddy token refresh — POST /v2/plugin/auth/token/refresh with
 * the refresh token carried in the X-Refresh-Token header (not a form body),
 * matching the official CodeBuddy CLI. Response: { code: 0, data: <token> }.
 */
export async function refreshCodebuddyToken(
  oauthConfig: { refreshUrl: string; userAgent: string; domain?: string },
  refreshToken: string,
  log: RefreshLogger,
  proxyConfig: unknown = null,
  realmLabel: string = "CodeBuddy"
) {
  if (!refreshToken) return null;
  const domain = oauthConfig.domain || "copilot.tencent.com";
  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(oauthConfig.refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": oauthConfig.userAgent,
          "X-Requested-With": "XMLHttpRequest",
          "X-Domain": domain,
          "X-Refresh-Token": refreshToken,
          "X-Auth-Refresh-Source": "plugin",
          "X-Product": "SaaS",
        },
        body: "{}",
      })
    );

    if (!response.ok) {
      const errorText = await response.text();
      log?.error?.("TOKEN_REFRESH", `Failed to refresh ${realmLabel} token`, {
        status: response.status,
        error: errorText,
      });
      return null;
    }

    const data = await response.json();
    if (data?.code !== 0 || !data?.data?.accessToken) {
      log?.error?.("TOKEN_REFRESH", `${realmLabel} token refresh returned no token`, {
        code: data?.code,
        msg: data?.msg,
      });
      return null;
    }

    log?.info?.("TOKEN_REFRESH", `Successfully refreshed ${realmLabel} token`, {
      hasNewAccessToken: !!data.data.accessToken,
      hasNewRefreshToken: !!data.data.refreshToken,
      expiresIn: data.data.expiresIn,
    });

    return {
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken || refreshToken,
      expiresIn: data.data.expiresIn,
    };
  } catch (error) {
    log?.error?.(
      "TOKEN_REFRESH",
      `Network error refreshing ${realmLabel} token: ${error?.message}`
    );
    return null;
  }
}
