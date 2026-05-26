// Re-export from open-sse with local logger
import * as log from "../utils/logger";
import { updateProviderConnection, resolveProxyForProvider } from "@/lib/localDb";
import {
  TOKEN_EXPIRY_BUFFER_MS as BUFFER_MS,
  getRefreshLeadMs as _getRefreshLeadMs,
  refreshAccessToken as _refreshAccessToken,
  refreshClaudeOAuthToken as _refreshClaudeOAuthToken,
  refreshGoogleToken as _refreshGoogleToken,
  refreshQwenToken as _refreshQwenToken,
  refreshCodexToken as _refreshCodexToken,
  refreshQoderToken as _refreshQoderToken,
  refreshGitHubToken as _refreshGitHubToken,
  refreshCopilotToken as _refreshCopilotToken,
  getAccessToken as _getAccessToken,
  refreshTokenByProvider as _refreshTokenByProvider,
  formatProviderCredentials as _formatProviderCredentials,
  getAllAccessTokens as _getAllAccessTokens,
} from "@omniroute/open-sse/services/tokenRefresh.ts";

// DEPRECATED: withConnectionRefreshMutex was removed. The per-connection mutex
// is now consolidated in open-sse/services/tokenRefresh.ts and protected by
// passing an `onPersist` callback to `getAccessToken`, which runs the DB write
// INSIDE the mutex closure (atomic [network + persist]). The old src/sse-side
// mutex Map was redundant and created the illusion of two locks when there was
// actually only one. Removing it eliminates the dual-Map confusion. See
// docs/architecture/SSE_BOUNDARY.md and tests/unit/token-refresh-race-comprehensive.test.ts.

export const TOKEN_EXPIRY_BUFFER_MS = BUFFER_MS;

export const refreshAccessToken = async (
  provider: string,
  refreshToken: string,
  credentials: any
) => {
  const proxy = await resolveProxyForProvider(provider);
  return _refreshAccessToken(provider, refreshToken, credentials, log, proxy);
};

export const refreshClaudeOAuthToken = async (refreshToken: string) => {
  const proxy = await resolveProxyForProvider("claude");
  return _refreshClaudeOAuthToken(refreshToken, log, proxy);
};

export const refreshGoogleToken = async (
  refreshToken: string,
  clientId: string,
  clientSecret: string,
  provider: string = "gemini"
) => {
  const proxy = await resolveProxyForProvider(provider);
  return _refreshGoogleToken(refreshToken, clientId, clientSecret, log, proxy);
};

export const refreshQwenToken = async (refreshToken: string) => {
  const proxy = await resolveProxyForProvider("qwen");
  return _refreshQwenToken(refreshToken, log, proxy);
};

export const refreshCodexToken = async (refreshToken: string) => {
  const proxy = await resolveProxyForProvider("codex");
  return _refreshCodexToken(refreshToken, log, proxy);
};

export const refreshQoderToken = async (refreshToken: string) => {
  const proxy = await resolveProxyForProvider("qoder");
  return _refreshQoderToken(refreshToken, log, proxy);
};

export const refreshGitHubToken = async (refreshToken: string) => {
  const proxy = await resolveProxyForProvider("github");
  return _refreshGitHubToken(refreshToken, log, proxy);
};

export const refreshCopilotToken = async (githubAccessToken: string) => {
  const proxy = await resolveProxyForProvider("github");
  return _refreshCopilotToken(githubAccessToken, log, proxy);
};

export const getAccessToken = async (
  provider: string,
  credentials: any,
  onPersist?: (result: any) => Promise<void>
) => {
  const proxy = await resolveProxyForProvider(provider);
  return _getAccessToken(provider, credentials, log, proxy, onPersist);
};

export const refreshTokenByProvider = async (provider: string, credentials: any) => {
  const proxy = await resolveProxyForProvider(provider);
  return _refreshTokenByProvider(provider, credentials, log, proxy);
};

export const formatProviderCredentials = (provider: string, credentials: any) =>
  _formatProviderCredentials(provider, credentials, log);

export const getAllAccessTokens = (userInfo: any) => _getAllAccessTokens(userInfo, log);

// Local-specific: Update credentials in localDb
export async function updateProviderCredentials(connectionId: string, newCredentials: any) {
  try {
    const updates: Record<string, any> = {};

    if (newCredentials.accessToken) {
      updates.accessToken = newCredentials.accessToken;
    }
    if (newCredentials.refreshToken) {
      updates.refreshToken = newCredentials.refreshToken;
    }
    if (newCredentials.expiresIn) {
      const expiresAt = new Date(Date.now() + newCredentials.expiresIn * 1000).toISOString();
      updates.expiresAt = expiresAt;
      updates.tokenExpiresAt = expiresAt;
      updates.expiresIn = newCredentials.expiresIn;
    } else if (newCredentials.expiresAt) {
      updates.expiresAt = newCredentials.expiresAt;
      updates.tokenExpiresAt = newCredentials.expiresAt;
    }
    if (newCredentials.providerSpecificData) {
      updates.providerSpecificData = newCredentials.providerSpecificData;
    }
    // Cookie/session providers (chatgpt-web, ...) refresh by rotating the
    // stored apiKey blob — propagate that here too so DB credentials don't
    // go stale after Set-Cookie rotation.
    if (newCredentials.apiKey) {
      updates.apiKey = newCredentials.apiKey;
    }
    if (newCredentials.testStatus) {
      updates.testStatus = newCredentials.testStatus;
    }
    if (newCredentials.isActive !== undefined) {
      updates.isActive = newCredentials.isActive;
    }

    const result = await updateProviderConnection(connectionId, updates);
    log.info("TOKEN_REFRESH", "Credentials updated in localDb", {
      connectionId,
      success: !!result,
    });
    return !!result;
  } catch (error) {
    log.error("TOKEN_REFRESH", "Error updating credentials in localDb", {
      connectionId,
      error: (error as any).message,
    });
    return false;
  }
}

// Local-specific: Check and refresh token proactively
export async function checkAndRefreshToken(provider: string, credentials: any) {
  let updatedCredentials = { ...credentials };

  // Check regular token expiry. Use the provider-specific lead time so rotating-
  // token providers (Codex/OpenAI) refresh FAR ahead of access_token expiry. This
  // keeps the refresh_token "warm" — refreshed regularly enough that Auth0 doesn't
  // mark it as stale and revoke the token family on first use after long idle.
  if (updatedCredentials.expiresAt) {
    const expiresAt = new Date(updatedCredentials.expiresAt).getTime();
    const now = Date.now();
    const refreshLead = _getRefreshLeadMs(provider);

    if (expiresAt - now < refreshLead) {
      log.info("TOKEN_REFRESH", "Token expiring soon, refreshing proactively", {
        provider,
        expiresIn: Math.round((expiresAt - now) / 1000),
        refreshLeadMs: refreshLead,
      });

      const connectionId: string | undefined = updatedCredentials.connectionId;

      // Pass onPersist so the DB write happens INSIDE the open-sse per-connection
      // mutex, making [network call + DB write] one atomic step. This eliminates the
      // race where a concurrent request reads stale DB credentials before the write
      // and re-uses a rotated refresh token (refresh_token_reused on Codex/OpenAI).
      // The separate withConnectionRefreshMutex wrapper is no longer needed here.
      const persistCallback = connectionId
        ? async (result: any) => {
            await updateProviderCredentials(connectionId, result);
          }
        : undefined;

      const newCredentials = await getAccessToken(provider, updatedCredentials, persistCallback);

      if (newCredentials && newCredentials.accessToken) {
        // For the no-connectionId path (no mutex, no onPersist), persist here as before.
        if (!connectionId) {
          await updateProviderCredentials(updatedCredentials.connectionId, newCredentials);
        }

        updatedCredentials = {
          ...updatedCredentials,
          accessToken: newCredentials.accessToken,
          refreshToken: newCredentials.refreshToken || updatedCredentials.refreshToken,
          expiresAt: newCredentials.expiresAt
            ? newCredentials.expiresAt
            : newCredentials.expiresIn
              ? new Date(Date.now() + newCredentials.expiresIn * 1000).toISOString()
              : updatedCredentials.expiresAt,
        };
      }
    }
  }

  // Check GitHub copilot token expiry
  if (provider === "github" && updatedCredentials.providerSpecificData?.copilotTokenExpiresAt) {
    const copilotExpiresAt = updatedCredentials.providerSpecificData.copilotTokenExpiresAt * 1000;
    const now = Date.now();

    if (copilotExpiresAt - now < TOKEN_EXPIRY_BUFFER_MS) {
      log.info("TOKEN_REFRESH", "Copilot token expiring soon, refreshing proactively", {
        provider,
        expiresIn: Math.round((copilotExpiresAt - now) / 1000),
      });

      const copilotToken = await refreshCopilotToken(updatedCredentials.accessToken);
      if (copilotToken) {
        await updateProviderCredentials(updatedCredentials.connectionId, {
          providerSpecificData: {
            ...updatedCredentials.providerSpecificData,
            copilotToken: copilotToken.token,
            copilotTokenExpiresAt: copilotToken.expiresAt,
          },
        });

        updatedCredentials.providerSpecificData = {
          ...updatedCredentials.providerSpecificData,
          copilotToken: copilotToken.token,
          copilotTokenExpiresAt: copilotToken.expiresAt,
        };
        // Sync to top-level so buildHeaders() picks up the fresh token
        updatedCredentials.copilotToken = copilotToken.token;
      }
    }
  }

  return updatedCredentials;
}

// Local-specific: Refresh GitHub and Copilot tokens together
export async function refreshGitHubAndCopilotTokens(credentials: any) {
  const newGitHubCredentials = await refreshGitHubToken(credentials.refreshToken);
  if (newGitHubCredentials?.accessToken) {
    const copilotToken = await refreshCopilotToken(newGitHubCredentials.accessToken);
    if (copilotToken) {
      return {
        ...newGitHubCredentials,
        providerSpecificData: {
          copilotToken: copilotToken.token,
          copilotTokenExpiresAt: copilotToken.expiresAt,
        },
      };
    }
  }
  return newGitHubCredentials;
}
