/**
 * Muse Code's device-login -> subscription-key protocol.
 *
 * Independently implemented from the wire contract in CLIProxyAPI's Meta
 * authenticator (see docs/providers/MUSE_CODE_SUBSCRIPTION.md). No CLI process,
 * shell, browser cookies, generic META_API_KEY, or pay-as-you-go fallback.
 * This is an unofficial integration; Meta documents this key as Muse Code-only.
 */
export const MUSE_SUBSCRIPTION_PROVIDER = "muse-code-subscription";
export const MUSE_SUBSCRIPTION_BASE_URL = "https://api.meta.ai/v1";
export const MUSE_SUBSCRIPTION_RESPONSES_URL = `${MUSE_SUBSCRIPTION_BASE_URL}/responses`;
export const MUSE_DEVICE_AUTH_URL = "https://auth.meta.com/oidc/device/authorization/";
export const MUSE_DEVICE_TOKEN_URL = "https://auth.meta.com/oidc/device/token/";
export const MUSE_KEY_URL = "https://api.meta.ai/muse-code/key";
export const MUSE_DEVICE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";

// Deliberately identify this client honestly rather than claiming a CLI build.
export const MUSE_SUBSCRIPTION_USER_AGENT = "OmniRoute/MuseCodeSubscription";
const MAX_AUTH_BYTES = 64 * 1024;
const AUTH_TIMEOUT_MS = 30_000;

type JsonObject = Record<string, unknown>;
export type MuseFetch = (input: string, init: RequestInit) => Promise<Response>;

export class MuseSubscriptionError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status = 502, code = "muse_subscription_error") {
    super(message);
    this.name = "MuseSubscriptionError";
    this.status = status;
    this.code = code;
  }
}

function record(value: unknown): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function cleanString(value: unknown, max = 8192): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  if (!text || text.length > max || /[\x00-\x1f\x7f]/.test(text)) return undefined;
  return text;
}

function requiredString(value: unknown, label: string): string {
  const text = cleanString(value);
  if (!text || /\s/.test(text)) {
    throw new MuseSubscriptionError(`Invalid Muse ${label}.`, 400, "invalid_request");
  }
  return text;
}

function positiveInteger(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0
    ? value
    : fallback;
}

function verificationUrl(value: unknown): string {
  const text = cleanString(value, 4096);
  if (text) {
    try {
      const url = new URL(text);
      if (
        url.protocol === "https:" &&
        url.hostname === "auth.meta.com" &&
        !url.username &&
        !url.password &&
        !url.port &&
        !url.hash
      ) {
        return url.href;
      }
    } catch {
      // Never reflect a potentially hostile URL or upstream response to the UI.
    }
  }
  throw new MuseSubscriptionError("Muse returned an untrusted verification URL.");
}

/** Fixed destinations and no redirects prevent login-token forwarding. */
async function authPost(
  url: string,
  body: URLSearchParams | string,
  fetcher: MuseFetch,
  bearer?: string
): Promise<{ response: Response; data: JsonObject }> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": body instanceof URLSearchParams
      ? "application/x-www-form-urlencoded"
      : "application/json",
    "User-Agent": MUSE_SUBSCRIPTION_USER_AGENT,
  };
  if (bearer) headers.Authorization = `Bearer ${bearer}`;

  try {
    const response = await fetcher(url, {
      method: "POST",
      headers,
      body,
      redirect: "error",
      signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
    });
    if (!response.body) throw new MuseSubscriptionError("Muse returned an empty login response.");
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_AUTH_BYTES) {
          await reader.cancel();
          throw new MuseSubscriptionError("Muse returned an oversized login response.");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    let data: unknown;
    try {
      data = JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      throw new MuseSubscriptionError("Muse returned a non-JSON login response.");
    }
    if (!record(data)) throw new MuseSubscriptionError("Muse returned an invalid login response.");
    return { response, data };
  } catch (error) {
    if (error instanceof MuseSubscriptionError) throw error;
    // Fetch errors may contain URLs, response text, or credentials. Never echo them.
    throw new MuseSubscriptionError("Muse login could not reach Meta. Please retry.", 502);
  }
}

export interface MuseDeviceCode {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete?: string;
  expires_in: number;
  interval: number;
}

export async function requestMuseDeviceCode(
  clientId: string,
  fetcher: MuseFetch = fetch
): Promise<MuseDeviceCode> {
  const { response, data } = await authPost(
    MUSE_DEVICE_AUTH_URL,
    new URLSearchParams({ client_id: requiredString(clientId, "client identifier") }),
    fetcher
  );
  if (!response.ok) {
    throw new MuseSubscriptionError("Meta rejected the Muse device-login request.");
  }
  const complete = data.verification_uri_complete === undefined
    ? undefined
    : verificationUrl(data.verification_uri_complete);
  const uri = verificationUrl(data.verification_uri || complete);
  for (const field of ["expires_in", "interval"]) {
    if (data[field] !== undefined && positiveInteger(data[field], 0) === 0) {
      throw new MuseSubscriptionError("Muse returned an invalid device-login lifetime.");
    }
  }
  if (typeof data.interval === "number" && data.interval > 900) {
    throw new MuseSubscriptionError("Muse requested polling beyond this login's lifetime.");
  }
  return {
    device_code: requiredString(data.device_code, "device code"),
    user_code: requiredString(data.user_code, "user code"),
    verification_uri: uri,
    ...(complete ? { verification_uri_complete: complete } : {}),
    // Never extend an advertised lifetime. Bound defaults and pathological values.
    expires_in: Math.min(positiveInteger(data.expires_in, 900), 900),
    interval: Math.max(positiveInteger(data.interval, 5), 5),
  };
}

export interface MuseDeviceToken {
  access_token: string;
  token_type: string;
  expires_in?: number;
}

export interface MusePollResult {
  ok: boolean;
  data: Partial<MuseDeviceToken> & { error?: string; error_description?: string };
}

const OAUTH_MESSAGES: Readonly<Record<string, string>> = {
  authorization_pending: "Approve the Muse login in your browser.",
  slow_down: "Meta requested slower polling. Wait before polling again.",
  access_denied: "Muse login was denied. Start a new login to retry.",
  expired_token: "The Muse device code expired. Start a new login.",
  invalid_grant: "The Muse device code is no longer valid. Start a new login.",
};

export async function pollMuseDeviceToken(
  clientId: string,
  deviceCode: string,
  fetcher: MuseFetch = fetch
): Promise<MusePollResult> {
  const { response, data } = await authPost(
    MUSE_DEVICE_TOKEN_URL,
    new URLSearchParams({
      client_id: requiredString(clientId, "client identifier"),
      device_code: requiredString(deviceCode, "device code"),
      grant_type: MUSE_DEVICE_GRANT,
    }),
    fetcher
  );
  if (typeof data.error === "string") {
    const known = Object.hasOwn(OAUTH_MESSAGES, data.error);
    const error = known ? data.error : "muse_authorization_failed";
    // OmniRoute's generic pollForToken sets `pending` only on its ok branch.
    // RFC 8628 pending/slow_down responses are commonly HTTP 400, not 200.
    const pending = (response.status === 200 || response.status === 400) &&
      (error === "authorization_pending" || error === "slow_down");
    return {
      ok: pending,
      data: {
        error,
        error_description: known ? OAUTH_MESSAGES[error] : "Meta rejected the Muse login.",
      },
    };
  }
  if (!response.ok) {
    return {
      ok: false,
      data: { error: "muse_authorization_failed", error_description: "Meta rejected the Muse login." },
    };
  }
  return {
    ok: true,
    data: {
      access_token: requiredString(data.access_token, "session token"),
      token_type: "Bearer",
      ...(typeof data.expires_in === "number" && data.expires_in > 0
        ? { expires_in: data.expires_in }
        : {}),
    },
  };
}

export interface MuseSubscriptionGrant {
  accessToken: string;
  tokenType: "Bearer";
  email?: string;
  providerSpecificData: {
    credentialSource: "muse-code-device-login";
    isSubscriptionActive: true;
    baseUrl: string;
    subscriptionTier?: string;
    subscriptionTierId?: string;
  };
}

export async function mintMuseSubscriptionKey(
  sessionToken: string,
  fetcher: MuseFetch = fetch
): Promise<MuseSubscriptionGrant> {
  const dcaToken = requiredString(sessionToken, "session token");
  const { response, data } = await authPost(
    MUSE_KEY_URL,
    JSON.stringify({ dca_token: dcaToken }),
    fetcher,
    dcaToken
  );
  if (response.status === 401 || response.status === 403) {
    throw new MuseSubscriptionError("Muse login expired or was rejected. Sign in again.", 401);
  }
  if (!response.ok) throw new MuseSubscriptionError("Meta could not issue the Muse Code key.");
  if (data.is_subs_active !== true || data.require_payment === true) {
    throw new MuseSubscriptionError(
      "An active Muse Code subscription is required. No pay-as-you-go key was saved.",
      403,
      "muse_subscription_required"
    );
  }
  const baseUrl = data.base_url === undefined || data.base_url === ""
    ? MUSE_SUBSCRIPTION_BASE_URL
    : cleanString(data.base_url)?.replace(/\/+$/, "");
  if (baseUrl !== MUSE_SUBSCRIPTION_BASE_URL) {
    throw new MuseSubscriptionError("Muse returned an unsupported inference endpoint.");
  }
  const key = requiredString(data.api_key, "Code key");
  if (key.startsWith("dca:")) {
    throw new MuseSubscriptionError("Muse returned a session token instead of a Code key.");
  }
  const email = cleanString(data.user_email, 320);
  const tier = cleanString(data.subs_tier_name, 128);
  const tierId = cleanString(data.subs_tier_id, 128);
  return {
    accessToken: key,
    tokenType: "Bearer",
    ...(email ? { email } : {}),
    providerSpecificData: {
      credentialSource: "muse-code-device-login",
      isSubscriptionActive: true,
      baseUrl: MUSE_SUBSCRIPTION_BASE_URL,
      ...(tier ? { subscriptionTier: tier } : {}),
      ...(tierId ? { subscriptionTierId: tierId } : {}),
    },
  };
  // Deliberately do not persist the DCA token as refreshToken, or copy its TTL
  // to the minted key. Neither a key TTL nor OAuth refresh grant is established.
}

export interface MuseStoredCredentials {
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}

export function museSubscriptionHeaders(credentials: MuseStoredCredentials): Record<string, string> {
  const data = credentials.providerSpecificData;
  const key = cleanString(credentials.accessToken);
  if (
    !key || /\s/.test(key) || key.startsWith("dca:") || credentials.apiKey ||
    data?.credentialSource !== "muse-code-device-login" ||
    data?.isSubscriptionActive !== true ||
    data?.baseUrl !== MUSE_SUBSCRIPTION_BASE_URL
  ) {
    throw new MuseSubscriptionError(
      "Sign in to Muse Code Subscription again. Generic API keys and session tokens are not accepted.",
      401,
      "muse_subscription_login_required"
    );
  }
  return {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
    Authorization: `Bearer ${key}`,
    "User-Agent": MUSE_SUBSCRIPTION_USER_AGENT,
  };
}

/** Input is already translated to Responses format by OmniRoute's chat pipeline. */
export function normalizeMuseResponsesRequest(model: string, body: unknown): JsonObject {
  if (!record(body) || !(typeof body.input === "string" || Array.isArray(body.input))) {
    throw new MuseSubscriptionError("Muse requires a translated Responses input.", 400);
  }
  const normalized: JsonObject = { ...body, model, stream: true };
  for (const field of [
    "generate", "prompt_cache_retention", "safety_identifier", "stream_options", "client_metadata",
  ]) {
    delete normalized[field];
  }
  if (normalized.instructions === null || normalized.instructions === undefined) {
    normalized.instructions = "";
  }
  return normalized;
}
