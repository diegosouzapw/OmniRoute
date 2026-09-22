import { MUSE_CODE_CONFIG } from "../constants/muse-code";
import {
  META_MUSE_API_KEY_TTL_SECONDS,
  META_MUSE_DEVICE_GRANT_TYPE,
  mintMuseCodeApiKey,
} from "@omniroute/open-sse/services/museCodeAuth.ts";

type MuseCodeOAuthConfig = typeof MUSE_CODE_CONFIG;

interface DeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete?: string;
  expires_in: number;
  interval: number;
}

interface DeviceTokenPayload {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
  message?: string;
}

interface DevicePollResult {
  ok: boolean;
  data: DeviceTokenPayload;
}

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text) return {};
  try {
    const value = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function readDeviceCodeFields(data: Record<string, unknown>): {
  deviceCode: string;
  userCode: string;
  verificationUri: string;
  complete: string;
  expiresIn: number;
  interval: number;
} {
  const deviceCode = typeof data.device_code === "string" ? data.device_code : "";
  const userCode = typeof data.user_code === "string" ? data.user_code : "";
  const verificationUri =
    typeof data.verification_uri === "string" ? data.verification_uri : "";
  const complete =
    typeof data.verification_uri_complete === "string"
      ? data.verification_uri_complete
      : verificationUri;
  const expiresIn = Number(data.expires_in);
  const interval = Number(data.interval);
  return {
    deviceCode,
    userCode,
    verificationUri,
    complete,
    expiresIn: Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn : 600,
    interval: Number.isFinite(interval) && interval > 0 ? interval : 5,
  };
}

function deviceAuthFailure(data: Record<string, unknown>, status: number): string {
  return (
    (typeof data.error_description === "string" && data.error_description) ||
    (typeof data.message === "string" && data.message) ||
    (typeof data.error === "string" && data.error) ||
    `HTTP ${status}`
  );
}

export const museCode = {
  config: MUSE_CODE_CONFIG,
  flowType: "device_code" as const,

  requestDeviceCode: async (
    config: MuseCodeOAuthConfig
  ): Promise<DeviceCodeResponse> => {
    const response = await fetch(config.deviceAuthorizationUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ client_id: config.clientId }),
    });

    const data = await parseJson(response);
    const fields = readDeviceCodeFields(data);
    if (
      !response.ok ||
      !fields.deviceCode ||
      !fields.userCode ||
      !fields.verificationUri
    ) {
      throw new Error(
        `Meta Muse device authorization failed: ${deviceAuthFailure(data, response.status)}`
      );
    }

    return {
      device_code: fields.deviceCode,
      user_code: fields.userCode,
      verification_uri: fields.verificationUri,
      verification_uri_complete: fields.complete,
      expires_in: fields.expiresIn,
      interval: fields.interval,
    };
  },

  pollToken: async (
    config: MuseCodeOAuthConfig,
    deviceCode: string
  ): Promise<DevicePollResult> => {
    const response = await fetch(config.deviceTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: META_MUSE_DEVICE_GRANT_TYPE,
        device_code: deviceCode,
        client_id: config.clientId,
      }),
    });

    const data = (await parseJson(response)) as DeviceTokenPayload;
    if (
      data.error === "authorization_pending" ||
      data.error === "slow_down" ||
      data.error === "access_denied" ||
      data.error === "expired_token"
    ) {
      return { ok: true, data };
    }
    return { ok: response.ok, data };
  },

  postExchange: async (tokens: DeviceTokenPayload) => {
    if (!tokens.access_token)
      throw new Error("Meta Muse OAuth response omitted access_token");
    return { apiKey: await mintMuseCodeApiKey(tokens.access_token) };
  },

  mapTokens: (tokens: DeviceTokenPayload = {}, extra?: { apiKey?: string } | null) => ({
    accessToken: extra?.apiKey,
    // Meta's OIDC identity is the durable credential used to mint a fresh
    // short-lived Model API key. Keep it in the encrypted refresh-token slot.
    refreshToken: tokens.access_token,
    expiresIn: META_MUSE_API_KEY_TTL_SECONDS,
    providerSpecificData: {
      authSource: "meta-oidc-device",
    },
  }),
};
