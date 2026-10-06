/**
 * Shared bounds for the `timeout` knob accepted by `POST /api/providers/[id]/login`.
 *
 * The route reads `timeout` straight off an unvalidated JSON body and, for the
 * generic web-cookie path, hands it to `inAppLoginService.startLogin()`, where
 * `maxPolls = Math.floor(maxTimeout / pollInterval)` turns it into a poll count
 * that keeps a headful Playwright Chromium alive. Without a ceiling a single
 * `{"timeout": 1e12}` body pins that browser (and the service's single
 * `activeLogin` slot) for the process lifetime.
 *
 * The two provider-specific login services already enforce exactly these bounds
 * — `clampAdobeFireflyLoginTimeout` (open-sse/services/adobeFireflyBrowserLogin.ts)
 * and `clampTimeout` (open-sse/services/conolBrowserLogin.ts) — with identical
 * constants and an identical clamp body. This module is the route-layer copy of
 * that same contract so the third (generic) path stops being the odd one out.
 *
 * Hard Rule #7: request input is validated with a Zod schema, not an ad-hoc
 * `typeof x === "number"` check.
 */

import { z } from "zod";

/** Applied when `timeout` is absent or not a usable number. */
export const LOGIN_TIMEOUT_DEFAULT_MS = 300_000;
/** Below this an interactive sign-in cannot realistically complete. */
export const LOGIN_TIMEOUT_MIN_MS = 15_000;
/** Ceiling on how long one login may hold a browser + the active-login slot. */
export const LOGIN_TIMEOUT_MAX_MS = 600_000;

/**
 * Contract for the single `timeout` key of the login request body.
 *
 * Deliberately scoped to that one key rather than the whole body: the body also
 * carries provider-specific keys (`freshSession` today, and other login flows
 * add their own), so a whole-body strict object schema here would reject valid
 * requests from every provider branch that grows a new field.
 */
export const loginTimeoutSchema = z.number().finite().optional();

/**
 * Bound an untrusted `timeout` from a login request body.
 *
 * Mirrors `clampAdobeFireflyLoginTimeout` / `clampTimeout` exactly: a missing or
 * non-finite value falls back to the default, anything else is truncated to an
 * integer and clamped into `[MIN, MAX]`. Never throws, so an out-of-range value
 * degrades to a sane login attempt instead of a 4xx — the same behaviour the two
 * sibling paths have shipped with.
 */
export function clampLoginTimeoutMs(value: unknown): number {
  const parsed = loginTimeoutSchema.safeParse(value ?? undefined);
  if (!parsed.success || parsed.data === undefined) return LOGIN_TIMEOUT_DEFAULT_MS;
  return Math.max(LOGIN_TIMEOUT_MIN_MS, Math.min(LOGIN_TIMEOUT_MAX_MS, Math.trunc(parsed.data)));
}
