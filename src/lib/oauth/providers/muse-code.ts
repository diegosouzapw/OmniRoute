import {
  MUSE_CODE_DEFAULT_POLL_INTERVAL_SEC,
  MUSE_CODE_DEVICE_GRANT,
  isMuseDcaToken,
  museCodeHeaders,
} from "@omniroute/open-sse/config/museCode.ts";
import {
  mintMuseApiKey,
  type MuseMintedKey,
} from "@omniroute/open-sse/services/museCodeAuth.ts";
import { MUSE_CODE_CONFIG } from "../constants/oauth";

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Muse Code device authorization response missing ${field}`);
  }
  return value.trim();
}

async function postForm(
  url: string,
  params: Record<string, string>
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  const response = await fetch(url, {
    method: "POST",
    headers: museCodeHeaders({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: new URLSearchParams(params),
  });
  const text = await response.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    data = { error: "invalid_response", error_description: text };
  }
  return { ok: response.ok, status: response.status, data };
}

export const museCode = {
  config: MUSE_CODE_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    const { ok, data } = await postForm(config.deviceCodeUrl, { client_id: config.clientId });
    if (!ok) {
      throw new Error("Muse Code device authorization request failed.");
    }
    const expiresIn = Number(data.expires_in);
    if (!Number.isFinite(expiresIn) || expiresIn <= 0) {
      throw new Error("Muse Code returned an invalid device code expiry.");
    }
    const interval = Number(data.interval);
    return {
      device_code: requiredText(data.device_code, "device_code"),
      user_code: requiredText(data.user_code, "user_code"),
      verification_uri: typeof data.verification_uri === "string" ? data.verification_uri : "",
      verification_uri_complete:
        typeof data.verification_uri_complete === "string"
          ? data.verification_uri_complete
          : "",
      expires_in: expiresIn,
      interval:
        Number.isFinite(interval) && interval > 0
          ? interval
          : MUSE_CODE_DEFAULT_POLL_INTERVAL_SEC,
    };
  },
  pollToken: async (config, deviceCode: string) => {
    const { ok, data } = await postForm(config.tokenUrl, {
      client_id: config.clientId,
      device_code: deviceCode,
      grant_type: MUSE_CODE_DEVICE_GRANT,
    });
    return { ok, data };
  },
  /**
   * After the device grant, mint the subscription inference key. CLIProxyAPI
   * keeps the `dca:` token as the durable credential and remints the API key
   * on 401. Mint at login is best-effort: a DCA-only record is still saved and
   * reminted on the first request. We persist the DCA token as refreshToken.
   */
  postExchange: async (tokens: { access_token?: string }) => {
    const dcaToken = typeof tokens.access_token === "string" ? tokens.access_token.trim() : "";
    if (!dcaToken) {
      throw new Error("Muse Code device flow completed without an access token.");
    }
    try {
      const minted = await mintMuseApiKey(dcaToken);
      return { minted, dcaToken };
    } catch {
      return { dcaToken };
    }
  },
  mapTokens: (
    tokens: Record<string, unknown>,
    extra?: { minted?: MuseMintedKey; dcaToken?: string }
  ) => {
    const dcaToken =
      extra?.dcaToken || (typeof tokens.access_token === "string" ? tokens.access_token : "");
    const minted = extra?.minted;
    const inferenceKey = minted?.apiKey || (isMuseDcaToken(dcaToken) ? "" : dcaToken);
    const hasMintedKey = Boolean(minted?.apiKey);
    const dcaExpiresAt =
      typeof tokens.expires_in === "number" && Number.isFinite(tokens.expires_in)
        ? Date.now() + tokens.expires_in * 1000
        : undefined;
    return {
      accessToken: inferenceKey || dcaToken,
      refreshToken: dcaToken,
      // Minted inference keys do not inherit the DCA expiry (CLIProxyAPI leaves
      // `expired` empty once an API key exists). Remint is on-demand / 401.
      expiresIn: hasMintedKey
        ? undefined
        : typeof tokens.expires_in === "number"
          ? tokens.expires_in
          : undefined,
      tokenType: typeof tokens.token_type === "string" ? tokens.token_type : "Bearer",
      email: minted?.email,
      displayName: minted?.name,
      providerSpecificData: {
        dcaToken,
        authKind: "oauth",
        baseUrl: minted?.baseUrl,
        email: minted?.email,
        name: minted?.name,
        subsTierName: minted?.subsTierName,
        subsTierId: minted?.subsTierId,
        isSubsActive: minted?.isSubsActive,
        hasPaymentMethod: minted?.hasPaymentMethod,
        requirePayment: minted?.requirePayment,
        canSubscribe: minted?.canSubscribe,
        dcaExpiresAt: dcaExpiresAt ? new Date(dcaExpiresAt).toISOString() : undefined,
        lastRefresh: new Date().toISOString(),
      },
    };
  },
};
