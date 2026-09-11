/**
 * MaxAI email login — browserless, two signed HTTP calls (a codex-style
 * device-pair flow, no browser / camoufox / Google navigation).
 *
 * MaxAI's web app offers email-code sign-in as an alternative to Google OAuth.
 * Both steps are plain signed POSTs carrying the same per-request X-Authorization
 * signature as every other MaxAI call (see ./signing.ts); both paths are in the
 * signer's BLANK_USER_ROUTES (they sign with a blank user_id, correct — there is
 * no user id yet before login). Ported byte-faithfully from the MaxAI web-app
 * bundle (chunk 86042: signInWithEmail line ~5623, verifySecretCode line ~5665).
 *
 * Step 1 — request a code (POST /oauth/signin_with_email):
 *     body { email, app: "maxai_webapp" }  ->  { status: "OK" }  (code emailed)
 *
 * Step 2 — verify the code (POST /oauth/verify_secret_code):
 *     body { email, secret_code, app: "maxai_webapp", env: "prod_co",
 *            client_user_id, ...nullable attribution fields }
 *     ->  { auth_user: { accessToken, refreshToken, userId, email, clientUserId } }
 *
 * The `device_id` folded into the signature is a CLIENT-GENERATED UUID (the web
 * app's getAPIFetchDeviceID = "return stored, else generate + persist"), so the
 * caller mints one with randomUUID() and reuses it across BOTH steps and for all
 * subsequent chat / refresh calls (the minted token is bound to that device id).
 * `client_user_id` is likewise a client UUID.
 */
import { buildMaxaiSignedHeaders } from "./signing.ts";
import { maxaiStaticHeaders, MAXAI_BASE_URL } from "./protocol.ts";
import { ensureMaxaiConstants } from "./constantsStore.ts";
import type { MaxaiSigningConstants } from "./constants.ts";

export const MAXAI_SIGNIN_EMAIL_PATH = "/oauth/signin_with_email";
export const MAXAI_VERIFY_CODE_PATH = "/oauth/verify_secret_code";

/** The web app's env tag for production email verification. */
const MAXAI_VERIFY_ENV = "prod_co";

export interface MaxaiEmailRequestInput {
  email: string;
  /** Client device UUID (mint once, reuse for verify + all later calls). */
  deviceId: string;
  signal?: AbortSignal | null;
  fetchImpl?: typeof fetch;
}

export interface MaxaiEmailVerifyInput {
  email: string;
  /** The 6-digit code the user received by email. */
  code: string;
  /** Same device UUID used in the request step. */
  deviceId: string;
  /** Client-user UUID (mint once alongside deviceId). */
  clientUserId: string;
  signal?: AbortSignal | null;
  fetchImpl?: typeof fetch;
}

export interface MaxaiEmailRequestResult {
  ok: boolean;
  status: number;
  error?: string;
}

/** The full credential set returned by a successful verify. */
export interface MaxaiLoginCredential {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  deviceId: string;
  clientUserId: string;
}

export interface MaxaiEmailVerifyResult {
  ok: boolean;
  status: number;
  credential?: MaxaiLoginCredential;
  error?: string;
}

/** Build signed headers for a blank-user OAuth route (user id is blanked in the proof). */
function signedOauthHeaders(
  path: string,
  deviceId: string,
  constants: MaxaiSigningConstants
): Record<string, string> {
  return {
    ...maxaiStaticHeaders(),
    // userId is blanked inside computeMaxaiProof for BLANK_USER_ROUTES; pass "".
    ...buildMaxaiSignedHeaders({ path, userId: "", deviceId }, constants),
  };
}

/** Pull a nested-or-top-level field from a MaxAI response body ({data:{...}} | {...}). */
function pick<T = unknown>(body: Record<string, unknown>, key: string): T | undefined {
  const data = body?.data as Record<string, unknown> | undefined;
  const nested = data?.[key];
  if (nested !== undefined) return nested as T;
  return body?.[key] as T | undefined;
}

/**
 * Step 1: ask MaxAI to email a sign-in code. Never throws.
 * Returns ok=true when the server acknowledges (status "OK").
 */
export async function requestMaxaiEmailCode(
  input: MaxaiEmailRequestInput
): Promise<MaxaiEmailRequestResult> {
  const doFetch = input.fetchImpl ?? fetch;
  if (!input.email || !input.deviceId) {
    return { ok: false, status: 0, error: "missing email or deviceId" };
  }

  // Initial login is the FIRST signed call — ensure we have live signing constants
  // (extracted from MaxAI's public bundle) before signing. No keys = cannot sign.
  const constants = await ensureMaxaiConstants({ fetchImpl: doFetch, signal: input.signal });
  if (!constants) {
    return { ok: false, status: 0, error: "MaxAI signing constants unavailable (extraction failed)" };
  }

  let res: Response;
  try {
    res = await doFetch(MAXAI_BASE_URL + MAXAI_SIGNIN_EMAIL_PATH, {
      method: "POST",
      headers: signedOauthHeaders(MAXAI_SIGNIN_EMAIL_PATH, input.deviceId, constants),
      body: JSON.stringify({ email: input.email, app: "maxai_webapp" }),
      signal: input.signal ?? undefined,
    });
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }

  const raw = await res.text().catch(() => "");
  if (res.status !== 200) {
    return { ok: false, status: res.status, error: raw.slice(0, 200) };
  }
  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return { ok: false, status: res.status, error: "unparseable signin response" };
  }
  if (pick<string>(body, "status") === "OK") return { ok: true, status: 200 };
  const detail = pick<string>(body, "detail") || pick<string>(body, "msg") || "sign-in request failed";
  return { ok: false, status: res.status, error: String(detail).slice(0, 200) };
}

/**
 * Step 2: verify the emailed code and return the full credential. Never throws.
 * On success the caller persists the credential to the connection's
 * providerSpecificData (accessToken/refreshToken/deviceId/userId).
 */
export async function verifyMaxaiEmailCode(
  input: MaxaiEmailVerifyInput
): Promise<MaxaiEmailVerifyResult> {
  const doFetch = input.fetchImpl ?? fetch;
  if (!input.email || !input.code || !input.deviceId) {
    return { ok: false, status: 0, error: "missing email, code, or deviceId" };
  }

  const constants = await ensureMaxaiConstants({ fetchImpl: doFetch, signal: input.signal });
  if (!constants) {
    return { ok: false, status: 0, error: "MaxAI signing constants unavailable (extraction failed)" };
  }

  const requestBody = {
    email: input.email,
    secret_code: input.code,
    app: "maxai_webapp",
    env: MAXAI_VERIFY_ENV,
    invitation_code: null,
    ref: "",
    client_reference_id: null,
    client_user_id: input.clientUserId,
    client_price_version: null,
    client_onboarding_version: null,
    user_acquisition_channel: "",
    gclid: null,
  };

  let res: Response;
  try {
    res = await doFetch(MAXAI_BASE_URL + MAXAI_VERIFY_CODE_PATH, {
      method: "POST",
      headers: signedOauthHeaders(MAXAI_VERIFY_CODE_PATH, input.deviceId, constants),
      body: JSON.stringify(requestBody),
      signal: input.signal ?? undefined,
    });
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }

  const raw = await res.text().catch(() => "");
  if (res.status !== 200) {
    return { ok: false, status: res.status, error: raw.slice(0, 200) };
  }
  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return { ok: false, status: res.status, error: "unparseable verify response" };
  }

  const authUser = pick<Record<string, unknown>>(body, "auth_user");
  const status = pick<string>(body, "status");
  if (status === "OK" && authUser && typeof authUser === "object") {
    const accessToken = String(authUser.accessToken ?? authUser.access_token ?? "");
    const refreshToken = String(authUser.refreshToken ?? authUser.refresh_token ?? "");
    const userId = String(authUser.userId ?? authUser.user_id ?? "");
    if (!accessToken || !refreshToken) {
      return { ok: false, status: 200, error: "verify OK but token fields missing" };
    }
    return {
      ok: true,
      status: 200,
      credential: {
        accessToken,
        refreshToken,
        userId,
        email: String(authUser.email ?? input.email),
        deviceId: input.deviceId,
        clientUserId: String(authUser.clientUserId ?? authUser.client_user_id ?? input.clientUserId),
      },
    };
  }

  // 10119 is MaxAI's "code expired / too many attempts" signal; surface it.
  const code = pick<number>(body, "code");
  const detail = pick<string>(body, "detail") || pick<string>(body, "msg");
  const error =
    code === 10119
      ? "Code expired or too many attempts — request a new code."
      : String(detail || "Invalid code. Check the code and try again.").slice(0, 200);
  return { ok: false, status: res.status, error };
}
