/**
 * Meta Muse Code (muse-code) OAuth provider.
 *
 * Device-code flow against Meta's OIDC endpoints (auth.meta.com). Once the user
 * approves, the OIDC access token is traded for a Muse Code API key
 * (api.meta.ai/muse-code/key) — the API key is what OmniRoute actually sends
 * upstream, and the OIDC access token is kept as the refresh token so a later
 * refresh can re-mint a fresh API key.
 */

import { MUSE_CODE_CONFIG } from "../constants/oauth";

const MUSE_CODE_USER_AGENT = "muse-code";

interface MuseCodeConfig {
  clientId: string;
  deviceCodeUrl: string;
  tokenUrl: string;
  mintUrl: string;
  apiVersion: string;
  baseUrl: string;
}

function getMuseCodeOAuthHeaders() {
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "User-Agent": MUSE_CODE_USER_AGENT,
  };
}

// Read the body once: after a failed response.json() the stream is already
// consumed, so a fallback response.text() would throw "Body is unusable" and
// reject the poll instead of surfacing the upstream error page.
async function readJsonBody(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: "invalid_response", error_description: text };
  }
}

export const museCode = {
  config: MUSE_CODE_CONFIG,
  flowType: "device_code" as const,
  requestDeviceCode: async (config: MuseCodeConfig) => {
    const response = await fetch(config.deviceCodeUrl, {
      method: "POST",
      headers: getMuseCodeOAuthHeaders(),
      body: new URLSearchParams({
        client_id: config.clientId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Device code request failed: ${await response.text()}`);
    }

    const data = await readJsonBody(response);
    if (!data?.device_code) throw new Error("Device authorization response missing device_code");
    if (!data?.user_code) throw new Error("Device authorization response missing user_code");

    return {
      device_code: data.device_code as string,
      user_code: data.user_code as string,
      verification_uri: (data.verification_uri as string) || "",
      verification_uri_complete:
        (data.verification_uri_complete as string) || (data.verification_uri as string) || "",
      expires_in: data.expires_in as number | undefined,
      interval: (data.interval as number) || 5,
    };
  },
  pollToken: async (config: MuseCodeConfig, deviceCode: string) => {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: getMuseCodeOAuthHeaders(),
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        device_code: deviceCode,
        client_id: config.clientId,
      }),
    });

    const data = await readJsonBody(response);

    // authorization_pending / slow_down are expected while the user has not
    // approved yet — return a non-fatal unsuccessful poll so the caller keeps
    // polling instead of aborting the flow.
    if (!data?.access_token) {
      return { ok: false, data };
    }

    // Trade the OIDC access token for the Muse Code API key that authenticates
    // upstream inference calls.
    const mintResponse = await fetch(config.mintUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.access_token as string}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-version": config.apiVersion,
      },
      body: JSON.stringify({ show_subs_upsell: false }),
    });

    const mint = await readJsonBody(mintResponse);
    if (!mintResponse.ok || !mint?.api_key) {
      return {
        ok: false,
        data: {
          error: (mint?.error as string) || "mint_failed",
          error_description:
            (mint?.error_description as string) ||
            (mint?.message as string) ||
            "Muse Code key mint failed",
        },
      };
    }

    return {
      ok: true,
      data: {
        // pollForToken() only treats the poll as successful when access_token
        // is present, so carry the OIDC token alongside the minted key.
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        api_key: mint.api_key,
        user_email: mint.user_email,
        user_id: mint.user_id,
        subs_tier: mint.subs_tier,
      },
    };
  },
  mapTokens: (tokens: Record<string, unknown>) => ({
    accessToken: tokens.api_key,
    // The OIDC access token is the refresh handle: refreshing re-mints the key.
    refreshToken: tokens.access_token,
    expiresIn: tokens.expires_in as number | undefined,
    email: tokens.user_email,
    providerSpecificData: {
      user_email: tokens.user_email,
      user_id: tokens.user_id,
      subs_tier: tokens.subs_tier,
      base_url: MUSE_CODE_CONFIG.baseUrl,
    },
  }),
};
