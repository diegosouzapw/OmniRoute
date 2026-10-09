import { MUSE_CODE_DEFAULT_POLL_INTERVAL_SEC } from "@omniroute/open-sse/config/museCode.ts";

const AUTH_ORIGIN = "https://auth.meta.com";
const MAX_DEVICE_EXPIRY_SECONDS = 86400;
const POLL_ERRORS: Record<string, string> = {
  authorization_pending: "Authorization pending.",
  slow_down: "Authorization pending.",
  access_denied: "Authorization denied.",
  expired_token: "Device code expired.",
  invalid_grant: "Authorization failed.",
};

export function museResponseRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Muse Code device authorization response missing ${field}`);
  }
  return value.trim();
}

function authorizationUrl(value: unknown): string {
  if (value === undefined || value === "") return "";
  try {
    if (typeof value !== "string") throw new Error();
    const url = new URL(value);
    if (url.origin !== AUTH_ORIGIN || url.username || url.password) throw new Error();
    return url.href;
  } catch {
    throw new Error("Muse Code returned an invalid authorization URL.");
  }
}

export function normalizeMuseDeviceResponse(data: Record<string, unknown>) {
  const verificationUri = authorizationUrl(data.verification_uri);
  const complete = authorizationUrl(data.verification_uri_complete);
  if (!verificationUri && !complete) {
    throw new Error("Muse Code returned an invalid authorization URL.");
  }
  const expiresIn = data.expires_in;
  if (
    typeof expiresIn !== "number" ||
    !Number.isFinite(expiresIn) ||
    expiresIn <= 0 ||
    expiresIn > MAX_DEVICE_EXPIRY_SECONDS
  ) {
    throw new Error("Muse Code returned an invalid device code expiry.");
  }
  const interval = Number(data.interval);
  return {
    device_code: requiredText(data.device_code, "device_code"),
    user_code: requiredText(data.user_code, "user_code"),
    verification_uri: verificationUri,
    verification_uri_complete: complete,
    expires_in: expiresIn,
    interval:
      Number.isFinite(interval) && interval > 0 ? interval : MUSE_CODE_DEFAULT_POLL_INTERVAL_SEC,
  };
}

export function normalizeMusePollResponse(
  parsed: Record<string, unknown>,
  ok: boolean
): Record<string, unknown> {
  if (ok && typeof parsed.access_token === "string" && parsed.access_token.trim()) {
    const data: Record<string, unknown> = { access_token: parsed.access_token.trim() };
    if (typeof parsed.expires_in === "number" && Number.isFinite(parsed.expires_in)) {
      data.expires_in = parsed.expires_in;
    }
    if (typeof parsed.token_type === "string") data.token_type = parsed.token_type;
    return data;
  }
  if (typeof parsed.error === "string" && Object.hasOwn(POLL_ERRORS, parsed.error)) {
    return { error: parsed.error, error_description: POLL_ERRORS[parsed.error] };
  }
  return { error: "invalid_response" };
}
