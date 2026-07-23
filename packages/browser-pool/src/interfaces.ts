/**
 * interfaces.ts — Shared type definitions for @omniroute/browser-pool.
 *
 * These types are used by both the package entry and the core stubs.
 * The core stubs re-export them so existing import paths remain stable.
 */

import type { BrowserContext, Page } from "playwright";

// ── Browser pool ───────────────────────────────────────

export interface BrowserPoolContextOptions {
  cookieDomain: string;
  cookieString?: string | null;
  warmupUrl?: string | null;
  userAgent?: string;
  locale?: string;
  timezone?: string;
  preferCloakbrowser?: boolean;
  /** Time (ms) to wait for the warmup page to be ready. */
  waitFor?: number;
}

export interface PooledContext {
  id: string;
  context: BrowserContext;
  warmupPage: Page | null;
  lastUsed: number;
  isStealth: boolean;
}

export interface BrowserPoolMetrics {
  browserLaunches: number;
  browserLaunchFailures: number;
  contextsCreated: number;
  contextsReused: number;
  contextsEvicted: number;
  contextsReleased: number;
  contextCreateFailures: number;
  shutdowns: number;
  lastShutdownReason: string | null;
}

// ── Browser-backed chat ────────────────────────────────

export interface BrowserBackedChatRequest {
  /** Pool key — typically a provider id like "duckduckgo-web" or
   *  "claude-web", optionally suffixed by user/account id. */
  poolKey: string;
  /** Chat URL the page should submit to (captured via waitForResponse). */
  chatUrl: string;
  /** Chat page URL to navigate to before typing. */
  chatPageUrl: string;
  /** The text the user wants to send. */
  userMessage: string;
  /** Cookie string (raw) to inject into the browser context. */
  cookieString?: string | null;
  /** Cookie domain (used together with cookieString). */
  cookieDomain?: string;
  /** Domain for the page's fetch to identify the chat endpoint. */
  chatUrlMatchDomain: string;
  /** User-Agent string for the browser context. */
  userAgent?: string;
  /** Locale (BCP 47). Defaults to en-US. */
  locale?: string;
  /** IANA timezone. Defaults to America/New_York. */
  timezone?: string;
  /** Selector for the chat input. */
  inputSelector: string;
  /** Selector for the submit button (optional — falls back to Enter). */
  submitButtonSelector?: string;
  /** Wait after submit for SSE/JSON to arrive. Default 15 seconds. */
  postSubmitWaitMs?: number;
  /** Optional AbortSignal. Cancels navigation/submit. */
  signal?: AbortSignal | null;
  /** Reuse the same context across requests. Default true. */
  reuseContext?: boolean;
}

export interface BrowserBackedChatTiming {
  acquireContextMs: number;
  navigateMs: number;
  submitMs: number;
  captureResponseMs: number;
  totalMs: number;
}

export interface BrowserBackedChatResult {
  status: number;
  contentType: string | null;
  body: Buffer;
  isStealth: boolean;
  timing: BrowserBackedChatTiming;
}
