/**
 * Claude Web — shared browser fingerprint source of truth
 *
 * Cloudflare binds the `cf_clearance` cookie minted by the Turnstile solver
 * to the User-Agent (+ TLS/JA3 fingerprint + IP) that solved the challenge.
 * If the completion request later replays that cookie under a *different*
 * User-Agent, Cloudflare rejects it and the executor surfaces a persistent
 * 429 (see #7548).
 *
 * Every part of the claude-web pipeline that talks to claude.ai — the
 * Turnstile solver, the direct-fetch executor, and the httpBackedChat
 * fast path — MUST derive its User-Agent / Client-Hints headers from this
 * single constant so they can never drift apart again.
 *
 * Platform choice: Linux, matching the `chrome_146` TLS/JA3 profile used by
 * `claudeTlsClient.ts` and the browser-pool default (`browserPool.ts`).
 */
export const CLAUDE_WEB_FINGERPRINT = {
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
  secChUa: '"Chromium";v="149", "Not-A.Brand";v="24", "Google Chrome";v="149"',
  secChUaPlatform: '"Linux"',
} as const;

/**
 * Bump this whenever `CLAUDE_WEB_FINGERPRINT` changes so any previously
 * cached `cf_clearance` token (minted under the old fingerprint) is treated
 * as stale rather than replayed under the new one.
 */
export const CLAUDE_WEB_FINGERPRINT_VERSION = "v2-linux-unified";
