import { NOUS_RESEARCH_CONFIG } from "../constants/oauth";

async function mintAgentKey(config, accessToken) {
  try {
    const response = await fetch(config.agentKeyUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        min_ttl_seconds: Math.max(60, Number(config.minAgentKeyTtlSeconds) || 1800),
      }),
    });

    const payload = await response.json().catch(async () => {
      const text = await response.text().catch(() => "");
      return { error: text || `HTTP ${response.status}` };
    });

    if (!response.ok || !payload?.api_key) {
      return {
        agentKey: null,
        error:
          payload?.error_description ||
          payload?.error ||
          `Agent key exchange failed (${response.status})`,
      };
    }

    return {
      agentKey: payload,
      error: null,
    };
  } catch (error) {
    return {
      agentKey: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export const nousResearch = {
  config: NOUS_RESEARCH_CONFIG,
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
        scope: config.scope,
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
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        client_id: config.clientId,
        device_code: deviceCode,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      data = { error: "invalid_response", error_description: text };
    }

    return {
      ok: response.ok,
      data,
    };
  },
  postExchange: async (tokens) => {
    const { agentKey, error } = await mintAgentKey(NOUS_RESEARCH_CONFIG, tokens.access_token);
    return { agentKey, error };
  },
  mapTokens: (tokens, extra) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    tokenType: tokens.token_type,
    scope: tokens.scope || NOUS_RESEARCH_CONFIG.scope,
    ...(extra?.agentKey?.api_key ? { apiKey: extra.agentKey.api_key } : {}),
    providerSpecificData: {
      portalBaseUrl: NOUS_RESEARCH_CONFIG.portalBaseUrl,
      inferenceBaseUrl: NOUS_RESEARCH_CONFIG.inferenceBaseUrl,
      agentKey: extra?.agentKey?.api_key || null,
      agentKeyId: extra?.agentKey?.key_id || null,
      agentKeyExpiresAt: extra?.agentKey?.expires_at || null,
      agentKeyExpiresIn: extra?.agentKey?.expires_in || null,
      agentKeyReused: typeof extra?.agentKey?.reused === "boolean" ? extra.agentKey.reused : null,
      agentKeyError: extra?.error || null,
    },
  }),
};
