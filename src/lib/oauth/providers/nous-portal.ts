import { NOUS_PORTAL_CONFIG } from "../constants/oauth";

export const nousPortal = {
  config: NOUS_PORTAL_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (_config, codeChallenge) => {
    const response = await fetch(`${NOUS_PORTAL_CONFIG.authorizeUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: NOUS_PORTAL_CONFIG.clientId,
        scope: NOUS_PORTAL_CONFIG.scope,
        code_challenge: codeChallenge || "",
        code_challenge_method: NOUS_PORTAL_CONFIG.codeChallengeMethod,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Device code request failed: ${error}`);
    }

    return await response.json();
  },
  pollToken: async (_config, deviceCode, codeVerifier) => {
    const response = await fetch(`${NOUS_PORTAL_CONFIG.tokenUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        client_id: NOUS_PORTAL_CONFIG.clientId,
        device_code: deviceCode,
        code_verifier: codeVerifier || "",
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
    if (!tokens?.access_token) return null;

    const response = await fetch(NOUS_PORTAL_CONFIG.agentKeyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens.access_token}`,
      },
      body: JSON.stringify({ min_ttl_seconds: NOUS_PORTAL_CONFIG.minKeyTtlSeconds }),
    });

    if (!response.ok) return null;

    return await response.json();
  },
  mapTokens: (tokens, extra) => {
    const inferenceBaseUrl =
      extra?.inference_base_url || "https://inference-api.nousresearch.com/v1";
    const expiresIn = extra?.expires_in || NOUS_PORTAL_CONFIG.minKeyTtlSeconds;

    const result: any = {
      accessToken: extra?.api_key || tokens.access_token,
      refreshToken: tokens.refresh_token || null,
      expiresIn,
      email: null,
      displayName: "Nous Portal",
      providerSpecificData: {
        keyId: extra?.key_id || null,
        reused: extra?.reused || false,
        portalAccessToken: tokens.access_token,
        portalAccessTokenExpires: tokens.expires_in ? Date.now() + tokens.expires_in * 1000 : null,
        inferenceBaseUrl,
      },
    };

    return result;
  },
};
