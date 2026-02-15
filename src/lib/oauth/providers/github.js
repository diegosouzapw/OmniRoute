import { GITHUB_CONFIG } from "../constants/oauth.js";

export const github = {
  config: GITHUB_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    const response = await fetch(config.deviceCodeUrl, {
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
  pollToken: async (config, deviceCode) => {
    const response = await fetch(config.tokenUrl, {
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
  postExchange: async (tokens) => {
    const copilotRes = await fetch(GITHUB_CONFIG.copilotTokenUrl, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": GITHUB_CONFIG.userAgent,
      },
    });
    const copilotToken = copilotRes.ok ? await copilotRes.json() : {};

    const userRes = await fetch(GITHUB_CONFIG.userInfoUrl, {
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
  mapTokens: (tokens, extra) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    providerSpecificData: {
      copilotToken: extra?.copilotToken?.token,
      copilotTokenExpiresAt: extra?.copilotToken?.expires_at,
      githubUserId: extra?.userInfo?.id,
      githubLogin: extra?.userInfo?.login,
      githubName: extra?.userInfo?.name,
      githubEmail: extra?.userInfo?.email,
    },
  }),
};
