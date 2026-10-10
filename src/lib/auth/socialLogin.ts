import { updateSettings } from "@/lib/db/settings";
import { getDashboardJwtSecret } from "@/shared/utils/dashboardSessionToken";
import { createDashboardSessionJwt, timingSafeCompare } from "@/lib/auth/socialOAuth";

/** Minimal cookie-store surface the social login handlers need (`next/headers` or a test seam). */
export interface SocialCookieStore {
  get(name: string): { value: string } | undefined;
  set(name: string, value: string, options?: Record<string, unknown>): unknown;
}

/** Outcome of a provider HTTP step: the parsed value, or a `/login?error=<code>` code. */
export type StepResult<T> = { ok: true; value: T } | { ok: false; error: string };

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/**
 * Checks the returned OAuth `state` against the per-browser cookie set by the login route and
 * clears the cookie once it matches (single use).
 */
export function consumeOAuthState(
  cookieStore: SocialCookieStore,
  cookieName: string,
  returnedState: string
): boolean {
  const storedState = cookieStore.get(cookieName)?.value;
  if (!storedState || !timingSafeCompare(storedState, returnedState)) return false;
  cookieStore.set(cookieName, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return true;
}

/**
 * POSTs to a provider endpoint and parses a JSON body. Every failure mode collapses into a short
 * error code — provider response text is never reflected to the browser.
 */
export async function postForJson(
  url: string,
  init: { headers: Record<string, string>; body: string },
  errors: { request: string; response: string }
): Promise<StepResult<Record<string, unknown>>> {
  let resp: Response;
  try {
    resp = await fetch(url, {
      method: "POST",
      headers: init.headers,
      body: init.body,
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return { ok: false, error: errors.request };
  }
  if (!resp.ok) return { ok: false, error: errors.request };
  try {
    return { ok: true, value: asRecord(await resp.json()) };
  } catch {
    return { ok: false, error: errors.response };
  }
}

/** GETs a provider API endpoint with a bearer token; returns the parsed JSON or `null`. */
export async function getJsonWithBearer(
  url: string,
  accessToken: string,
  extraHeaders: Record<string, string> = {}
): Promise<unknown | null> {
  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}`, ...extraHeaders },
      signal: AbortSignal.timeout(5000),
    });
    return resp.ok ? await resp.json() : null;
  } catch {
    return null;
  }
}

/**
 * Completes a successful social login: marks setup complete, mints the standard 30-day dashboard
 * session JWT and sets the `auth_token` cookie. Returns false when no JWT secret is available.
 */
export async function startDashboardSession(
  cookieStore: SocialCookieStore,
  secure: boolean
): Promise<boolean> {
  try {
    await updateSettings({ setupComplete: true });
  } catch {
    // non-fatal
  }

  const secret = getDashboardJwtSecret();
  if (!secret) return false;

  cookieStore.set("auth_token", await createDashboardSessionJwt(secret), {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}
