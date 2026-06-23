// Auto-extracted from open-sse/services/tokenRefresh.ts in PR-#4609-batch
// Function: refreshClaudeOAuthToken | Lines: 740-798 (59 LOC)
// Ref: see open-sse/services/tokenRefresh.ts top-of-file comment for split rationale.

import {
  buildFormParams,
  readRefreshErrorBody
} from "../tokenRefresh";

export async function refreshClaudeOAuthToken(refreshToken, log, proxyConfig: unknown = null) {
  try {
    // Standard OAuth2 token refresh uses form-urlencoded (not JSON)
    const params = buildFormParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: PROVIDERS.claude.clientId,
    });

    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(OAUTH_ENDPOINTS.anthropic.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "anthropic-beta": "oauth-2025-04-20",
        },
        body: params.toString(),
      })
    );

    if (!response.ok) {
      // Read + classify the body ONCE, shape-agnostic. A proxy/MITM can deliver
      // the invalid_grant 400 as a JSON string, a double-encoded string, a
      // nested {error:{code}}, or raw text — all must yield the sentinel so the
      // HealthCheck deactivates instead of looping every 60s.
      const { rawText, code } = await readRefreshErrorBody(response);
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Claude OAuth token", {
        status: response.status,
        error: rawText.slice(0, 300),
      });
      if (code === "invalid_grant" || code === "invalid_request") {
        return { error: "unrecoverable_refresh_error", code };
      }
      return null;
    }

    const tokens = await response.json();

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Claude OAuth token", {
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
    log?.error?.("TOKEN_REFRESH", `Network error refreshing Claude token: ${error.message}`);
    return null;
  }
}

/**
 * Specialized refresh for Google providers (Gemini, Antigravity)
 */
