import { WORKBUDDY_CONFIG } from "../constants/oauth";

/**
 * WorkBuddy (Tencent — www.workbuddy.ai) — custom device-auth flow.
 *
 *   1. POST stateUrl?platform=CLI -> { code: 0, data: { state, authUrl } }
 *   2. Open authUrl in the browser and sign in
 *   3. GET tokenUrl?state=<state> until { code: 0, data.accessToken }
 *      (11217 = "login ing...", keep polling)
 *
 * Deliberately NOT an alias of `codebuddyCn`. WorkBuddy is a separate Tencent
 * product with its own host and account system — it happens to speak the same
 * plugin-auth protocol shape, which is why this module reads similarly, but it
 * carries its own config and its own headers. Reusing the CodeBuddy module would
 * send the state request to copilot.tencent.com and mint a CodeBuddy credential.
 *
 * Header set is the minimum the gateway documents: `X-Product: SaaS` on every
 * route. CodeBuddy's `X-Domain` / `X-No-Authorization` / `X-No-User-Id` family is
 * intentionally absent — those are CodeBuddy-specific and unverified here.
 *
 * The token is one-shot: the first successful poll returns it and a second poll
 * reverts to 11217, so the response must be consumed once and stored.
 */
type WorkBuddyConfig = typeof WORKBUDDY_CONFIG;

interface WorkBuddyDeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

interface WorkBuddyTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in?: number;
}

interface WorkBuddyPollResult {
  ok: boolean;
  data: Record<string, unknown> | WorkBuddyTokens;
}

export const workbuddy = {
  config: WORKBUDDY_CONFIG,
  flowType: "device_code" as const,

  requestDeviceCode: async (config: WorkBuddyConfig): Promise<WorkBuddyDeviceCodeResponse> => {
    // `platform` is read from the QUERY string, not the JSON body — the same
    // convention CodeBuddy uses. Send it both ways so either reader is satisfied.
    const stateUrl = `${config.stateUrl}?platform=${encodeURIComponent(config.platform)}`;
    const response = await fetch(stateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Product": "SaaS",
      },
      body: JSON.stringify({ platform: config.platform }),
    });

    if (!response.ok) {
      await response.text();
      throw new Error(`WorkBuddy state request failed (${response.status})`);
    }

    const json = (await response.json()) as { code?: number; data?: any; msg?: string };
    if (json.code !== 0 || !json.data?.state) {
      throw new Error(`WorkBuddy state error: ${json.msg || "no state in response"}`);
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

  pollToken: async (
    config: WorkBuddyConfig,
    deviceCode: string
  ): Promise<WorkBuddyPollResult> => {
    // GET with `state` as a query param (not POST/body) — matches the gateway's
    // /v2/plugin/auth/token?state=... shape.
    const response = await fetch(`${config.tokenUrl}?state=${encodeURIComponent(deviceCode)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Product": "SaaS",
      },
    });
    if (!response.ok) return { ok: false, data: { error: "request_failed" } };

    const data = (await response.json()) as { code?: number; data?: any; msg?: string };
    // code 11217 = pending, code 0 = success (token is one-shot).
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

  mapTokens: (tokens: WorkBuddyTokens) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    // The gateway issues a long-lived token (~361 days) and does not always
    // report expiresIn. Defaulting to a day, as the sibling CodeBuddy flow does,
    // would push a connection into a refresh loop it does not need; a long
    // default keeps the stored token in use until the gateway actually rotates it.
    expiresIn: tokens.expires_in || 31_104_000,
    providerSpecificData: {},
  }),
};
