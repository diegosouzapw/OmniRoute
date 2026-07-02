import { CODEBUDDY_CN_CONFIG } from "../constants/oauth";

/**
 * CodeBuddy CN (Tencent — copilot.tencent.com) — custom device-auth flow.
 *
 *   1. POST stateUrl → { code: 0, data: { state, authUrl } }
 *   2. Open authUrl in the browser
 *   3. GET tokenUrl?state=<state> until { code: 0, data.accessToken } (11217 = pending)
 *
 * Mirrors the official CodeBuddy CLI's distinguishing detail: poll is GET with
 * the state as a query param, NOT POST/body.
 */
type CodeBuddyConfig = typeof CODEBUDDY_CN_CONFIG;

interface CodeBuddyDeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

interface CodeBuddyTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in?: number;
}

interface CodeBuddyPollResult {
  ok: boolean;
  data: Record<string, unknown> | CodeBuddyTokens;
}

export const codebuddyCn = {
  config: CODEBUDDY_CN_CONFIG,
  flowType: "device_code" as const,

  requestDeviceCode: async (config: CodeBuddyConfig): Promise<CodeBuddyDeviceCodeResponse> => {
    const response = await fetch(config.stateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": config.userAgent,
        "X-Requested-With": "XMLHttpRequest",
        "X-Domain": "copilot.tencent.com",
        "X-No-Authorization": "true",
        "X-No-User-Id": "true",
        "X-Product": "SaaS",
      },
      body: JSON.stringify({ platform: config.platform }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`CodeBuddy state request failed (${response.status})`);
    }

    const json = (await response.json()) as { code?: number; data?: any; msg?: string };
    if (json.code !== 0 || !json.data?.state) {
      throw new Error(`CodeBuddy state error: ${json.msg || "no state in response"}`);
    }

    const state = String(json.data.state);
    const authUrl = String(json.data.authUrl || json.data.url || "");
    return {
      device_code: state,
      user_code: state,
      verification_uri: authUrl,
      verification_uri_complete: authUrl,
      expires_in: 600,
      interval: Math.max(1, Math.floor((config.pollInterval || 5000) / 1000)),
    };
  },

  pollToken: async (config: CodeBuddyConfig, deviceCode: string): Promise<CodeBuddyPollResult> => {
    // GET with state as a query param (not POST/body) — matches the official CLI's
    // /v2/plugin/auth/token?state=... endpoint shape.
    const response = await fetch(
      `${config.tokenUrl}?state=${encodeURIComponent(deviceCode)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": config.userAgent,
          "X-Requested-With": "XMLHttpRequest",
          "X-Domain": "copilot.tencent.com",
          "X-No-Authorization": "true",
          "X-No-User-Id": "true",
          "X-No-Enterprise-Id": "true",
          "X-No-Department-Info": "true",
          "X-Product": "SaaS",
        },
      }
    );
    if (!response.ok) return { ok: false, data: { error: "request_failed" } };
    const data = (await response.json()) as { code?: number; data?: any; msg?: string };
    // code 11217 = pending (RetryFetchToken), code 0 = success
    if (data.code === 0 && data.data?.accessToken) {
      return {
        ok: true,
        data: {
          access_token: data.data.accessToken,
          refresh_token: data.data.refreshToken || "",
          token_type: data.data.tokenType || "Bearer",
          expires_in: data.data.expiresIn,
        },
      };
    }
    return { ok: false, data: { code: data.code, msg: data.msg } };
  },

  mapTokens: (tokens: CodeBuddyTokens) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in || 86400,
    providerSpecificData: {},
  }),
};

export default codebuddyCn;
