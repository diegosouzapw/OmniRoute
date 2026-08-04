/**
 * grokClearance.ts — gated browser-backed cf_clearance acquisition for
 * grok-web (#8019).
 *
 * grok.com sits behind Cloudflare Enterprise, which pins `cf_clearance` to
 * the client's IP+TLS+UA fingerprint. Pure cookie-replay from
 * `grokTlsClient.ts` (TLS-impersonating fetch) cannot forge a fresh
 * clearance from a datacenter egress that Cloudflare has already flagged —
 * only a real browser solving the challenge natively can mint one bound to
 * that egress's own fingerprint.
 *
 * This module reuses the EXISTING provider-agnostic browser pool
 * (`browserPool.ts`, already live for claude-web + duckduckgo-web) rather
 * than adding a new Turnstile solver — `claudeTurnstileSolver.ts` is
 * claude.ai-specific and does not apply here.
 *
 * Opt-in only: gated behind `OMNIROUTE_BROWSER_POOL` / `WEB_COOKIE_USE_BROWSER`
 * (the same env gate already used by claude-web.ts / duckduckgo-web.ts).
 * With the gate off, `acquireFreshGrokClearance` is never called — the
 * executor stays on the Step-1 `cloudflare_challenge` classification.
 */

import { acquireBrowserContext, type PooledContext } from "./browserPool.ts";

const GROK_WARMUP_URL = "https://grok.com/";
const GROK_COOKIE_DOMAIN = ".grok.com";
const GROK_POOL_KEY = "grok-web";

/**
 * Reads the same opt-in gate as claude-web/duckduckgo-web
 * (`WEB_COOKIE_USE_BROWSER` or `OMNIROUTE_BROWSER_POOL`). Off by default.
 */
export function shouldUseGrokBrowserBacked(): boolean {
  const flag = process.env.WEB_COOKIE_USE_BROWSER;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  const poolFlag = process.env.OMNIROUTE_BROWSER_POOL;
  return poolFlag === "on" || poolFlag === "1" || poolFlag === "true";
}

type AcquireGrokClearanceFn = (signal?: AbortSignal | null) => Promise<string | null>;

// Test-only injection point — mirrors browserBackedChat.ts's
// __setBrowserBackedChatOverrideForTesting pattern so unit tests can prove
// the gating/wiring without launching a real browser (no chromium in CI).
let acquireOverride: AcquireGrokClearanceFn | null = null;

export function __setGrokClearanceAcquireOverrideForTesting(
  fn: AcquireGrokClearanceFn | null
): void {
  acquireOverride = fn;
}

async function readCfClearanceFromContext(pooled: PooledContext): Promise<string | null> {
  const cookies = await pooled.context.cookies(GROK_WARMUP_URL);
  const match = cookies.find((c) => c.name === "cf_clearance");
  return match?.value || null;
}

async function acquireViaPool(): Promise<string | null> {
  try {
    const pooled = await acquireBrowserContext(GROK_POOL_KEY, {
      cookieDomain: GROK_COOKIE_DOMAIN,
      cookieString: null,
      warmupUrl: GROK_WARMUP_URL,
    });
    return await readCfClearanceFromContext(pooled);
  } catch {
    return null;
  }
}

/**
 * Acquire a fresh `.grok.com` cf_clearance via the shared browser pool.
 * Never throws — resolves to `null` on any failure so callers can fall
 * through to the Cloudflare-challenge error rather than crash the request.
 */
export async function acquireFreshGrokClearance(signal?: AbortSignal | null): Promise<string | null> {
  if (acquireOverride) return acquireOverride(signal);
  try {
    return await acquireViaPool();
  } catch {
    return null;
  }
}
