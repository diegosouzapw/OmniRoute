export interface CodeBuddyDeviceCodeConfig {
  stateUrl: string;
  tokenUrl: string;
  userAgent: string;
  platform: string;
  domain?: string;
  pollInterval?: number;
}

export interface CodeBuddyDeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

export interface CodeBuddyTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in?: number;
}

interface CodeBuddyEnvelope<T> {
  code?: number;
  data?: T;
  msg?: string;
}

interface CodeBuddyStatePayload {
  state?: string | number;
  authUrl?: string;
  url?: string;
}

interface CodeBuddyTokenPayload {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface CodeBuddyPollResult {
  ok: boolean;
  data: Record<string, unknown> | CodeBuddyTokens;
}

export async function requestDeviceCode(
  config: CodeBuddyDeviceCodeConfig
): Promise<CodeBuddyDeviceCodeResponse> {
  const stateUrl = `${config.stateUrl}?platform=${encodeURIComponent(config.platform)}`;
  const domain = config.domain || "copilot.tencent.com";
  const response = await fetch(stateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": config.userAgent,
      "X-Requested-With": "XMLHttpRequest",
      "X-Domain": domain,
      "X-No-Authorization": "true",
      "X-No-User-Id": "true",
      "X-Product": "SaaS",
    },
    body: JSON.stringify({ platform: config.platform }),
  });

  if (!response.ok) {
    const _err = await response.text();
    throw new Error(`CodeBuddy state request failed (${response.status})`);
  }

  const json = (await response.json()) as CodeBuddyEnvelope<CodeBuddyStatePayload>;
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
}

export async function pollToken(
  config: CodeBuddyDeviceCodeConfig,
  deviceCode: string
): Promise<CodeBuddyPollResult> {
  const domain = config.domain || "copilot.tencent.com";
  const response = await fetch(`${config.tokenUrl}?state=${encodeURIComponent(deviceCode)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": config.userAgent,
      "X-Requested-With": "XMLHttpRequest",
      "X-Domain": domain,
      "X-No-Authorization": "true",
      "X-No-User-Id": "true",
      "X-No-Enterprise-Id": "true",
      "X-No-Department-Info": "true",
      "X-Product": "SaaS",
    },
  });
  if (!response.ok) return { ok: false, data: { error: "request_failed" } };
  const data = (await response.json()) as CodeBuddyEnvelope<CodeBuddyTokenPayload>;
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
}

export function mapTokens(tokens: CodeBuddyTokens) {
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in || 86400,
    providerSpecificData: {},
  };
}
