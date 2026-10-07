/**
 * UC (uncensored.com) email login — browserless, three signed HTTP calls to
 * Clerk (no browser / camoufox / OAuth widget).
 *
 * UC uses Clerk's email-code first factor. The whole flow is plain form-encoded
 * POSTs to the Clerk Frontend API, all carrying
 * `?__clerk_api_version=2025-11-10&_clerk_js_version=5.x`, `Origin`/`Referer`
 * `https://uncensored.com`, `Content-Type: application/x-www-form-urlencoded`.
 * Capture-confirmed (UC-AUTH-AND-EMAIL-LOGIN.md).
 *
 * Step 1 — create sign-in / request identifier (POST /v1/client/sign_ins):
 *     body: locale=en-CA&identifier=<email>
 *     -> { response: { id: "sia_...", status: "needs_first_factor",
 *          supported_first_factors: [ { strategy: "email_code",
 *            email_address_id: "idn_..." }, ... ] } }
 *   Extract `sia_...` (path for the next calls) + the email_code factor's
 *   `email_address_id` (`idn_...`).
 *
 * Step 2 — request the emailed code (POST /v1/client/sign_ins/{sia}/prepare_first_factor):
 *     body: email_address_id=idn_...&strategy=email_code
 *     -> 200 (the 6-digit code is emailed to the user)
 *
 * Step 3 — verify the code (POST /v1/client/sign_ins/{sia}/attempt_first_factor):
 *     body: strategy=email_code&code=<6 digits>
 *     -> { response: { status: "complete", created_session_id: "sess_..." },
 *          client: { sessions: [ { id: "sess_...", user: { id: "<uid>" } } ] } }
 *     + Set-Cookie: __client=<durable JWT>   <-- HARVEST this; it is the
 *       durable credential the executor mints session tokens from.
 *
 * The caller persists { clientCookie, sid, uid, cookies } to the connection's
 * providerSpecificData (see ./credentials.ts resolveUcCredential).
 */
import {
  UC_CLERK_FAPI,
  UC_CLERK_JS_VERSION,
  UC_CLERK_API_VERSION,
  UC_ORIGIN,
} from "./constants.ts";
import { parseSetCookie } from "./clerkAuth.ts";

export const UC_SIGNIN_PATH = "/v1/client/sign_ins";

/** Common query string on every Clerk sign-in call. */
const CLERK_QS = `__clerk_api_version=${UC_CLERK_API_VERSION}&_clerk_js_version=${UC_CLERK_JS_VERSION}`;

/** Common headers for a form-encoded Clerk sign-in POST. */
function clerkFormHeaders(extraCookie?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Origin: UC_ORIGIN,
    Referer: UC_ORIGIN + "/",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (extraCookie) headers.Cookie = extraCookie;
  return headers;
}

export interface UcEmailRequestInput {
  email: string;
  signal?: AbortSignal | null;
  fetchImpl?: typeof fetch;
}

export interface UcEmailRequestResult {
  ok: boolean;
  status: number;
  /** Clerk sign-in attempt id (`sia_...`) — pass back into the verify step. */
  sia?: string;
  /** The email_code factor's `email_address_id` (`idn_...`). */
  emailAddressId?: string;
  /**
   * Any `__client`/CF cookies Clerk set during sign-in creation. Some Clerk
   * deployments bind the sign-in attempt to a client cookie; carry it into the
   * prepare/attempt calls. Serialized `k=v; k=v`.
   */
  cookieHeader?: string;
  error?: string;
}

export interface UcEmailVerifyInput {
  /** The sign-in attempt id from the request step. */
  sia: string;
  /** The 6-digit code the user received by email. */
  code: string;
  /** The `email_address_id` from the request step (unused by attempt but kept for symmetry). */
  emailAddressId?: string;
  /** Cookie header carried from the request step, if any. */
  cookieHeader?: string;
  signal?: AbortSignal | null;
  fetchImpl?: typeof fetch;
}

/** The durable credential set harvested from a successful verify. */
export interface UcLoginCredential {
  /** Clerk `__client` durable cookie (JWT, no exp). */
  clientCookie: string;
  /** Clerk session id (`sess_...`). */
  sid: string;
  /** Account UID (uuid). */
  uid: string;
  /** Full cookie jar harvested from the verify response Set-Cookie. */
  cookies: Record<string, string>;
}

export interface UcEmailVerifyResult {
  ok: boolean;
  status: number;
  credential?: UcLoginCredential;
  error?: string;
}

/** Pull the `response` envelope from a Clerk body ({response:{...}} | {...}). */
function clerkResponse(body: Record<string, unknown>): Record<string, unknown> {
  const resp = body?.response;
  return resp && typeof resp === "object" ? (resp as Record<string, unknown>) : body;
}

/**
 * Steps 1 + 2: create the sign-in attempt and ask Clerk to email a code. Returns
 * the `sia` needed for the verify step. Never throws.
 */
export async function requestUcEmailCode(
  input: UcEmailRequestInput
): Promise<UcEmailRequestResult> {
  const doFetch = input.fetchImpl ?? fetch;
  if (!input.email) return { ok: false, status: 0, error: "missing email" };

  // --- Step 1: create sign-in attempt ---
  let res: Response;
  try {
    res = await doFetch(`${UC_CLERK_FAPI}${UC_SIGNIN_PATH}?${CLERK_QS}`, {
      method: "POST",
      headers: clerkFormHeaders(),
      body: `locale=en-CA&identifier=${encodeURIComponent(input.email)}`,
      signal: input.signal ?? undefined,
    });
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }

  const cookieJar = parseSetCookie(res.headers.get("set-cookie") ?? "");
  const cookieHdr = Object.entries(cookieJar)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
  const raw = await res.text().catch(() => "");
  if (res.status !== 200) {
    return {
      ok: false,
      status: res.status,
      error: raw.slice(0, 200) || `sign-in HTTP ${res.status}`,
    };
  }

  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return { ok: false, status: res.status, error: "unparseable sign-in response" };
  }

  const resp = clerkResponse(body);
  const sia = typeof resp.id === "string" ? resp.id : "";
  if (!sia) {
    return { ok: false, status: res.status, error: "sign-in response had no attempt id" };
  }

  // Find the email_code first factor + its email_address_id.
  const factors = Array.isArray(resp.supported_first_factors)
    ? (resp.supported_first_factors as Array<Record<string, unknown>>)
    : [];
  const emailFactor = factors.find((f) => f?.strategy === "email_code");
  const emailAddressId =
    emailFactor && typeof emailFactor.email_address_id === "string"
      ? emailFactor.email_address_id
      : undefined;
  if (!emailAddressId) {
    return {
      ok: false,
      status: res.status,
      error: "email_code sign-in factor not available for this account",
    };
  }

  // --- Step 2: prepare_first_factor (emails the code) ---
  let prep: Response;
  try {
    prep = await doFetch(
      `${UC_CLERK_FAPI}${UC_SIGNIN_PATH}/${sia}/prepare_first_factor?${CLERK_QS}`,
      {
        method: "POST",
        headers: clerkFormHeaders(cookieHdr || undefined),
        body: `email_address_id=${encodeURIComponent(emailAddressId)}&strategy=email_code`,
        signal: input.signal ?? undefined,
      }
    );
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
  if (prep.status !== 200) {
    const detail = await prep.text().catch(() => "");
    return {
      ok: false,
      status: prep.status,
      error: detail.slice(0, 200) || `prepare HTTP ${prep.status}`,
    };
  }

  return {
    ok: true,
    status: 200,
    sia,
    emailAddressId,
    cookieHeader: cookieHdr || undefined,
  };
}

/**
 * Step 3: verify the emailed code and harvest the durable credential. On
 * `status: "complete"` Clerk sets the `__client` cookie via Set-Cookie and
 * returns the new `sess_...` id + the account uid. Never throws.
 */
export async function verifyUcEmailCode(input: UcEmailVerifyInput): Promise<UcEmailVerifyResult> {
  const doFetch = input.fetchImpl ?? fetch;
  if (!input.sia || !input.code) {
    return { ok: false, status: 0, error: "missing sign-in attempt id or code" };
  }

  let res: Response;
  try {
    res = await doFetch(
      `${UC_CLERK_FAPI}${UC_SIGNIN_PATH}/${input.sia}/attempt_first_factor?${CLERK_QS}`,
      {
        method: "POST",
        headers: clerkFormHeaders(input.cookieHeader),
        body: `strategy=email_code&code=${encodeURIComponent(input.code)}`,
        signal: input.signal ?? undefined,
      }
    );
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }

  // Harvest cookies from BOTH the prior step and this response.
  const rotated = parseSetCookie(res.headers.get("set-cookie") ?? "");
  const raw = await res.text().catch(() => "");
  if (res.status !== 200) {
    return {
      ok: false,
      status: res.status,
      error: raw.slice(0, 200) || `verify HTTP ${res.status}`,
    };
  }

  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return { ok: false, status: res.status, error: "unparseable verify response" };
  }

  const resp = clerkResponse(body);
  const status = resp.status;
  if (status !== "complete") {
    return {
      ok: false,
      status: res.status,
      error: `sign-in not complete (status=${String(status)}) — check the code and retry`,
    };
  }

  const sid = (typeof resp.created_session_id === "string" && resp.created_session_id) || "";

  // uid + the durable __client cookie live in the `client` envelope / Set-Cookie.
  const client = (body.client && typeof body.client === "object" ? body.client : {}) as Record<
    string,
    unknown
  >;
  const sessions = Array.isArray(client.sessions)
    ? (client.sessions as Array<Record<string, unknown>>)
    : [];
  const session = sessions.find((s) => s?.id === sid) ?? sessions[0];
  const user = (session?.user && typeof session.user === "object" ? session.user : {}) as Record<
    string,
    unknown
  >;
  const uid = typeof user.id === "string" ? user.id : "";

  const clientCookie = rotated.__client ?? "";
  if (!clientCookie) {
    return {
      ok: false,
      status: 200,
      error: "verify OK but no __client cookie in Set-Cookie (cannot persist durable credential)",
    };
  }
  if (!sid || !uid) {
    return { ok: false, status: 200, error: "verify OK but session id or uid missing" };
  }

  return {
    ok: true,
    status: 200,
    credential: { clientCookie, sid, uid, cookies: rotated },
  };
}
