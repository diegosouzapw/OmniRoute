import { GITHUB_CONFIG } from "../constants/oauth";

/**
 * GHE Copilot OAuth provider.
 *
 * Reuses the GitHub device-code flow but targets the GitHub Enterprise host
 * configured per-connection via `gheUrl` (stored in providerSpecificData).
 * The device-code / token / user-info / copilot-token endpoints are derived
 * from gheUrl at request time.
 */

function normalizeGheUrl(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("gheUrl is required for GHE Copilot OAuth");
  }
  return value.trim().replace(/\/+$/, "");
}

export const gheCopilot = {
  config: GITHUB_CONFIG,
  flowType: "device_code" as const,
  requestDeviceCode: async (config: any) => {
    const gheUrl = normalizeGheUrl(config.gheUrl);
    const response = await fetch(`${gheUrl}/login/device/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        scope: config.scopes,
      }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Device code request failed: ${error}`);
    }
    return await response.json();
  },
  pollToken: async (config: any, deviceCode: string) => {
    const gheUrl = normalizeGheUrl(config.gheUrl);
    const response = await fetch(`${gheUrl}/login/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });
    let data;
    try {
      data = await response.json();
    } catch (e) {
      const text = await response.text();
      data = { error: "invalid_response", error_description: text };
    }
    return {
      ok: response.ok,
      data: data,
    };
  },
  postExchange: async (tokens: any, extra?: any) => {
    const gheUrl = normalizeGheUrl(extra?.gheUrl);
    const copilotRes = await fetch(`${gheUrl}/copilot_internal/v2/token`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": GITHUB_CONFIG.userAgent,
      },
    });
    const copilotToken = copilotRes.ok ? await copilotRes.json() : {};
    const userRes = await fetch(`${gheUrl}/api/v3/user`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": GITHUB_CONFIG.userAgent,
      },
    });
    const userInfo = userRes.ok ? await userRes.json() : {};
    return { copilotToken, userInfo };
  },
  mapTokens: (tokens: any, extra?: any) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    providerSpecificData: {
      gheUrl: extra?.gheUrl,
      copilotToken: extra?.copilotToken?.token,
      copilotTokenExpiresAt: extra?.copilotToken?.expires_at,
      githubUserId: extra?.userInfo?.id,
      githubLogin: extra?.userInfo?.login,
      githubName: extra?.userInfo?.name,
      githubEmail: extra?.userInfo?.email,
    },
  }),
};
