// Auto-extracted from open-sse/services/tokenRefresh.ts in PR-#4609-batch
// Function: refreshCopilotToken | Lines: 1355-1468 (114 LOC)
// Ref: see open-sse/services/tokenRefresh.ts top-of-file comment for split rationale.

import {
  refreshAccessToken
} from "../tokenRefresh";

export async function refreshCopilotToken(githubAccessToken, log, proxyConfig: unknown = null) {
  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch("https://api.github.com/copilot_internal/v2/token", {
        headers: getGitHubCopilotRefreshHeaders(`token ${githubAccessToken}`),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Copilot token", {
        status: response.status,
        error: errorText,
      });
      return null;
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
      error: error.message,
    });
    return null;
  }
}

/**
 * Get access token for a specific provider (internal, does the actual work)
 */
async function _getAccessTokenInternal(provider, credentials, log, proxyConfig: unknown = null) {
  switch (provider) {
    case "gemini":
    case "gemini-cli":
    case "antigravity":
    case "agy":
      return await refreshGoogleToken(
        credentials.refreshToken,
        PROVIDERS[provider].clientId,
        PROVIDERS[provider].clientSecret,
        log,
        proxyConfig
      );

    case "claude":
      return await refreshClaudeOAuthToken(credentials.refreshToken, log, proxyConfig);

    case "codex":
      return await refreshCodexToken(credentials.refreshToken, log, proxyConfig);

    case "qwen":
      return await refreshQwenToken(credentials.refreshToken, log, proxyConfig);

    case "qoder":
      return await refreshQoderToken(credentials.refreshToken, log, proxyConfig);

    case "github":
      return await refreshGitHubToken(credentials.refreshToken, log, proxyConfig);

    case "kiro":
    case "amazon-q":
      return await refreshKiroToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    case "cline":
      return await refreshClineToken(credentials.refreshToken, log, proxyConfig);

    case "kimi-coding":
      return await refreshKimiCodingToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    case "gitlab-duo":
      return await refreshGitLabDuoToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    case "windsurf":
    case "devin-cli":
      return await refreshWindsurfToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log,
        proxyConfig
      );

    default:
      // Fallback to generic OAuth refresh for unknown providers
      return refreshAccessToken(provider, credentials.refreshToken, credentials, log, proxyConfig);
  }
}

/**
 * Whether a provider has a supported refresh path in this service.
 */
