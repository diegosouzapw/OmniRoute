// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { getGitHubCopilotRefreshHeaders } from "../../../config/providerHeaderProfiles.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";

/**
 * Refresh GitHub Copilot token using a GitHub access token.
 *
 * `baseUrl` defaults to github.com's Copilot API but can be overridden to a
 * GitHub Enterprise host's `<gheUrl>/api/v3` so the same helper serves both
 * the `github` and `ghe-copilot` providers (GHE has its own per-enterprise
 * Copilot token endpoint; api.github.com never issues a token scoped to a
 * GHE account).
 */
export async function refreshCopilotToken(
  githubAccessToken,
  log,
  proxyConfig: unknown = null,
  baseUrl: string = "https://api.github.com"
) {
  try {
    const tokenUrl = `${baseUrl.replace(/\/+$/, "")}/copilot_internal/v2/token`;
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(tokenUrl, {
        headers: getGitHubCopilotRefreshHeaders(`token ${githubAccessToken}`),
      })
    );

    if (!response.ok) {
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Copilot token", {
        status: response.status,
      });
      return { status: response.status };
    }

    const data = await response.json();

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Copilot token", {
      hasToken: !!data.token,
      expiresAt: data.expires_at,
    });

    return {
      token: data.token,
      expiresAt: data.expires_at,
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", "Error refreshing Copilot token", {
      errorType: error?.name || "Error",
    });
    return { status: null };
  }
}
