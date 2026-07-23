/**
 * @omniroute/browser-pool — Optional browser pool for Playwright-backed
 * executor support (claude-web, duckduckgo-web, grok).
 *
 * Core stubs dynamically import this package at runtime. When the package
 * is not installed, the stubs degrade gracefully (fallback or error).
 */

// ── Re-exports from browserPool ──────────────────────────────────────────
export {
  acquireBrowserContext,
  releaseBrowserContext,
  getBrowserPoolMetrics,
  readPageResponseBody,
  openPage,
  shutdownPool,
  setProxyResolver,
  __resetBrowserPoolMetricsForTest,
} from "./services/browserPool.ts";

export type { BrowserPoolContextOptions, BrowserPoolMetrics, PooledContext } from "./interfaces.ts";

// ── Re-exports from browserBackedChat ────────────────────────────────────
export {
  browserBackedChat,
  startBrowserWarmup,
  getFreshCookiesWithWarmup,
} from "./services/browserBackedChat.ts";

// ── Re-exports from grokClearance ─────────────────────────────────────────
export {
  getCachedCookies,
  setCachedCookies,
  clearCookieCache,
} from "./services/browserBackedChat.ts";

export { shouldUseGrokBrowserBacked, acquireFreshGrokClearance } from "./services/grokClearance.ts";
