import {
  MUSE_CODE_DEVICE_GRANT,
  isMuseDcaToken,
  museCodeHeaders,
} from "@omniroute/open-sse/config/museCode.ts";
import { mintMuseApiKey, type MuseMintedKey } from "@omniroute/open-sse/services/museCodeAuth.ts";
import { MUSE_CODE_CONFIG } from "../constants/oauth";
import {
  museResponseRecord,
  normalizeMuseDeviceResponse,
  normalizeMusePollResponse,
} from "./museCodeDeviceResponse";

async function postForm(
  url: string,
  params: Record<string, string>
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  try {
    const response = await fetch(url, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(20_000),
      headers: museCodeHeaders({ "Content-Type": "application/x-www-form-urlencoded" }),
      body: new URLSearchParams(params),
    });
    const data = await response.json().catch(() => null);
    return { ok: response.ok, status: response.status, data: museResponseRecord(data) };
  } catch {
    return { ok: false, status: 0, data: { error: "network_error" } };
  }
}

export const museCode = {
  config: MUSE_CODE_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    const { ok, data } = await postForm(config.deviceCodeUrl, { client_id: config.clientId });
    if (!ok) {
      throw new Error("Muse Code device authorization request failed.");
    }
    return normalizeMuseDeviceResponse(data);
  },
  pollToken: async (config, deviceCode: string) => {
    const {
      ok,
      data: raw,
      status,
    } = await postForm(config.tokenUrl, {
      client_id: config.clientId,
      device_code: deviceCode,
      grant_type: MUSE_CODE_DEVICE_GRANT,
    });
    if (status === 0) return { ok: false, data: { error: "network_error" } };
    const data = normalizeMusePollResponse(raw, ok);
    return { ok: ok && data.error !== "invalid_response", data };
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
