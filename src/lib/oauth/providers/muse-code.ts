import { MUSE_CODE_CONFIG } from "../constants/oauth";

const DEVICE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";
const AUTH_ORIGIN = "https://auth.meta.com";
// The device endpoint never issues codes valid longer than a day; refuse
// anything outside (0, 24h] instead of polling a bogus deadline.
const MAX_DEVICE_EXPIRY_SECONDS = 86400;
// Bounded upstream calls: the device endpoints are interactive-paced, so a
// hung socket must fail instead of stalling the connect flow.
const REQUEST_TIMEOUT_MS = 20000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Muse Code device authorization response missing ${field}`);
  }
  return value;
}

function verifiedAuthorizationUrl(data: Record<string, unknown>): {
  url: string;
  complete: string;
} {
  const complete = requiredText(data.verification_uri_complete, "verification_uri_complete");
  const plain = typeof data.verification_uri === "string" ? data.verification_uri : "";
  for (const candidate of [complete, plain]) {
    if (!candidate) continue;
    let url: URL;
    try {
      url = new URL(candidate);
    } catch {
      throw new Error("Muse Code returned an invalid authorization URL.");
    }
    if (url.origin !== AUTH_ORIGIN || url.username || url.password) {
      throw new Error("Muse Code returned an authorization URL for an unexpected origin.");
    }
  }
  return { url: plain, complete };
}

async function postForm(url: string, params: Record<string, string>): Promise<Response> {
  return fetch(url, {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams(params).toString(),
  });
}

export const museCode = {
  config: MUSE_CODE_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config: typeof MUSE_CODE_CONFIG) => {
    let response: Response;
    try {
      response = await postForm(config.deviceCodeUrl, { client_id: config.clientId });
    } catch {
      throw new Error("Muse Code device authorization request failed.");
    }
    if (!response.ok) {
      throw new Error("Muse Code device authorization request failed.");
    }
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new Error("Muse Code device authorization response was not JSON.");
    }
    if (!isRecord(data)) {
      throw new Error("Muse Code device authorization response was malformed.");
    }
    const deviceCode = requiredText(data.device_code, "device_code");
    const userCode = requiredText(data.user_code, "user_code");
    const { url, complete } = verifiedAuthorizationUrl(data);
    const expiresIn =
      typeof data.expires_in === "number" && Number.isFinite(data.expires_in)
        ? data.expires_in
        : NaN;
    if (!(expiresIn > 0) || expiresIn > MAX_DEVICE_EXPIRY_SECONDS) {
      throw new Error("Muse Code returned an invalid device code expiry.");
    }
    const interval =
      typeof data.interval === "number" && Number.isFinite(data.interval) && data.interval > 0
        ? data.interval
        : 5;
    return {
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: url,
      verification_uri_complete: complete,
      expires_in: expiresIn,
      interval,
    };
  },
  pollToken: async (
    config: typeof MUSE_CODE_CONFIG,
    deviceCode: string
  ): Promise<{ ok: boolean; data: Record<string, unknown> }> => {
    let response: Response;
    try {
      response = await postForm(config.tokenUrl, {
        client_id: config.clientId,
        device_code: deviceCode,
        grant_type: DEVICE_GRANT,
      });
    } catch {
      return { ok: false, data: { error: "network_error" } };
    }
    let parsed: unknown;
    try {
      parsed = await response.json();
    } catch {
      return { ok: response.ok, data: { error: "invalid_response" } };
    }
    if (!isRecord(parsed)) {
      return { ok: response.ok, data: { error: "invalid_response" } };
    }
    // Allowlist the fields the shared poll loop consumes. Anything else the
    // upstream sends stays out of error paths and persisted state.
    if (typeof parsed.access_token === "string" && parsed.access_token.trim()) {
      const data: Record<string, unknown> = { access_token: parsed.access_token };
      if (typeof parsed.expires_in === "number" && Number.isFinite(parsed.expires_in)) {
        data.expires_in = parsed.expires_in;
      }
      return { ok: response.ok, data };
    }
    // Only recognized OAuth error codes pass through, each mapped to a fixed
    // message. Upstream descriptions are always discarded: they are free text
    // and must never reach UI error paths, where they could carry sensitive
    // or credential-like strings.
    const POLL_ERROR_MESSAGES: Record<string, string> = {
      authorization_pending: "Authorization pending.",
      slow_down: "Authorization pending.",
      access_denied: "Authorization denied.",
      expired_token: "Device code expired.",
      invalid_grant: "Authorization failed.",
    };
    const error =
      typeof parsed.error === "string" && Object.hasOwn(POLL_ERROR_MESSAGES, parsed.error)
        ? parsed.error
        : "invalid_response";
    const data: Record<string, unknown> = { error };
    if (error !== "invalid_response") {
      data.error_description = POLL_ERROR_MESSAGES[error];
    }
    return { ok: response.ok, data };
  },
  /**
   * Post-exchange hook: trade the granted device token for a subscription
   * inference key. Only the inference key and the account identity leave this
   * call — the device (account) token authorizes the exchange and is then
   * discarded. There is no refresh grant: reconnect replaces the key.
   *
   * Error bodies are deliberately NOT propagated: a successful body carries
   * the inference key itself, so it must never flow into logs or responses.
   */
  postExchange: async (tokens: Record<string, unknown>) => {
    const accountToken =
      typeof tokens.access_token === "string" && tokens.access_token.trim()
        ? tokens.access_token
        : null;
    if (!accountToken) {
      throw new Error("Muse Code device flow completed without an access token.");
    }
    let response: Response;
    try {
      response = await fetch(MUSE_CODE_CONFIG.keyUrl, {
        method: "POST",
        redirect: "error",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-version": "1.0.0",
          Authorization: `Bearer ${accountToken}`,
        },
        body: JSON.stringify({ onboard: true }),
      });
    } catch {
      throw new Error("Muse Code subscription key request failed.");
    }
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new Error("Muse Code subscription key response was not JSON.");
    }
    if (!response.ok || !isRecord(payload)) {
      throw new Error("Muse Code subscription key request failed.");
    }
    if (payload.is_subs_active === false) {
      throw new Error("Muse Code subscription is inactive.");
    }
    if (
      payload.require_payment === true ||
      typeof payload.action_url === "string" ||
      typeof payload.require_payment_action_url === "string"
    ) {
      throw new Error("Muse Code requires a subscription or billing action.");
    }
    const apiKey =
      typeof payload.api_key === "string" && payload.api_key.trim() ? payload.api_key : null;
    const accountId =
      typeof payload.user_id === "string" && payload.user_id.trim()
        ? payload.user_id
        : typeof payload.user_email === "string" && payload.user_email.trim()
          ? payload.user_email
          : null;
    if (!apiKey || !accountId) {
      throw new Error("Muse Code subscription key response was incomplete.");
    }
    return {
      apiKey,
      accountId,
      email: typeof payload.user_email === "string" ? payload.user_email : null,
      isSubsActive: payload.is_subs_active === true,
    };
  },
  mapTokens: (
    tokens: Record<string, unknown>,
    extra?: {
      apiKey: string;
      accountId: string;
      email: string | null;
      isSubsActive: boolean;
    } | null
  ) => {
    void tokens;
    if (!extra || typeof extra.apiKey !== "string" || !extra.apiKey.trim()) {
      throw new Error("Muse Code subscription key exchange did not complete.");
    }
    if (typeof extra.accountId !== "string" || !extra.accountId.trim()) {
      throw new Error("Muse Code subscription key exchange returned no account identity.");
    }
    return {
      // Inference authenticates with the exchanged subscription key. The
      // default executor prefers accessToken for OAuth connections, so the
      // key goes here — never the device (account) token, which is discarded
      // after the exchange and never persisted.
      accessToken: extra.apiKey,
      email: extra.email,
      providerSpecificData: {
        accountId: extra.accountId,
        isSubsActive: extra.isSubsActive,
      },
    };
  },
};
