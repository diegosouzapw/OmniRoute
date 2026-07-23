/**
 * browserBackedChat.ts — Full browser-backed chat interaction for @omniroute/browser-pool.
 *
 * Opens a page on a shared browser context, navigates to the provider's
 * chat page, types the user's message, clicks Send, and returns the
 * upstream SSE/JSON response body as a structured result.
 *
 * Providers using this path: duckduckgo-web, claude-web.
 *
 * The browser solves the provider's challenge natively (VQD, Cloudflare
 * Turnstile, etc.) by computing real DOM measurement values. The
 * Node-side challenge solver still runs as a first-line best-effort;
 * this module is the fallback.
 */

import { Buffer } from "node:buffer";
import {
  acquireBrowserContext,
  openPage,
  readPageResponseBody,
  releaseBrowserContext,
} from "./browserPool.ts";
import type {
  PooledContext,
  BrowserBackedChatRequest,
  BrowserBackedChatResult,
} from "../interfaces.ts";

// Safety constants
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024; // 10 MB

// Cookie cache constants
const COOKIE_CACHE_TTL_MS = 5 * 60 * 1000; // Cache fresh cookies for 5 minutes
const COOKIE_POLL_INTERVAL_MS = 500; // Poll for cookies every 500ms
const COOKIE_POLL_TIMEOUT_MS = 5000; // Max poll time for cookies

// Cookie cache — avoids repeated browser launches when cookies are still valid
interface CachedCookies {
  cookieString: string;
  expiresAt: number;
  domain: string;
}
const cookieCache = new Map<string, CachedCookies>();

export function getCachedCookies(domain: string): string | null {
  const cached = cookieCache.get(domain);
  if (cached && Date.now() < cached.expiresAt) return cached.cookieString;
  cookieCache.delete(domain);
  return null;
}

export function setCachedCookies(domain: string, cookieString: string, ttlMs?: number): void {
  cookieCache.set(domain, {
    cookieString,
    expiresAt: Date.now() + (ttlMs ?? COOKIE_CACHE_TTL_MS),
    domain,
  });
}

export function clearCookieCache(): void {
  cookieCache.clear();
}

// Dedup pending cookie refreshes per pool key
const pendingRefreshes = new Map<string, Promise<string | null>>();

/** Sanitize an error message for safe JSON transport. */
const MAX_ERROR_LEN = 512;
function sanitizeErrorMessage(message: unknown): string {
  let str = typeof message === "string" ? message : String(message ?? "");
  if (str.length > MAX_ERROR_LEN) str = str.slice(0, MAX_ERROR_LEN);
  const nl = str.indexOf("\n");
  if (nl >= 0) str = str.slice(0, nl);
  return str.replace(/[^ -~]/g, "").trim();
}

/** Wait N milliseconds, abortable via signal. */
async function waitWithSignal(ms: number, signal?: AbortSignal | null): Promise<void> {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * waitForCookiesWithPolling — Poll for cookies every 500ms up to 5s.
 * Returns as soon as challenge cookies appear, instead of always
 * waiting the full timeout. Saves 1-4s when anti-bot resolves quickly.
 */
async function waitForCookiesWithPolling(
  context: import("playwright").BrowserContext,
  cookieDomain: string,
  signal: AbortSignal | null
): Promise<string | null> {
  const deadline = Date.now() + COOKIE_POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    const cookies = await context.cookies(cookieDomain);
    const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    if (cookieString) return cookieString;
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;
    await waitWithSignal(Math.min(COOKIE_POLL_INTERVAL_MS, remaining), signal);
  }
  return null;
}

/**
 * doCookieRefreshOnContext — Run cookie extraction on an already-acquired
 * browser context. Opens a temporary page, navigates to the chat URL,
 * polls for cookies, and returns the result.
 * NOTE: Does NOT pass AbortSignal to Playwright methods — signals are
 * handled via waitWithSignal wrapping instead.
 */
async function doCookieRefreshOnContext(
  pooled: PooledContext,
  chatPageUrl: string,
  cookieDomain: string,
  signal: AbortSignal | null
): Promise<string | null> {
  const page = await openPage(pooled);
  try {
    await page.goto(chatPageUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    return await waitForCookiesWithPolling(pooled.context, cookieDomain, signal);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    return null;
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Match a URL against a chat URL template, allowing a single dynamic
 * id segment (PLACEHOLDER) in the template.
 */
function chatUrlMatcher(u: string, matchDomain: string, chatUrl: string): boolean {
  if (u === chatUrl) return true;
  let parsed: URL;
  let chatParsed: URL;
  try {
    parsed = new URL(u);
    chatParsed = new URL(chatUrl);
  } catch {
    return false;
  }
  if (!parsed.host.endsWith(matchDomain)) return false;
  const chatSeg = chatParsed.pathname.split("/").filter(Boolean);
  const reqSeg = parsed.pathname.split("/").filter(Boolean);
  if (chatSeg.length < 2 || reqSeg.length !== chatSeg.length) return false;
  let allowedDynamic = 1;
  for (let i = 0; i < chatSeg.length; i++) {
    if (chatSeg[i] === reqSeg[i]) continue;
    if (chatSeg[i] === "PLACEHOLDER" && allowedDynamic > 0) {
      allowedDynamic--;
      continue;
    }
    return false;
  }
  return true;
}

/** Resolve a unique pool key; when reuseContext is false, create a unique key. */
async function settlePoolKey(
  requestedKey: string,
  reuseContext: boolean
): Promise<{ key: string; acquired: boolean }> {
  if (reuseContext) return { key: requestedKey, acquired: true };
  return {
    key: `${requestedKey}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    acquired: false,
  };
}

// ── Cookie refresh helpers ──────────────────────────

/**
 * doRefresh — Acquire a fresh browser context, navigate to the
 * chat page, and poll for cookies. Returns the cookie string
 * or null on failure.
 * NOTE: Does NOT pass AbortSignal to Playwright methods — signals
 * are handled via waitWithSignal wrapping instead.
 */
async function doRefresh(options: {
  chatPageUrl: string;
  cookieDomain: string;
  poolKey: string;
  signal: AbortSignal | null;
}): Promise<string | null> {
  const pooled = await acquireBrowserContext(options.poolKey + "-refresh", {
    cookieDomain: options.cookieDomain,
    cookieString: null,
    warmupUrl: options.chatPageUrl,
  });
  const page = await openPage(pooled);
  try {
    await page.goto(options.chatPageUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    return await waitForCookiesWithPolling(pooled.context, options.cookieDomain, options.signal);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    return null;
  } finally {
    await page.close().catch(() => {});
    // release context — we got the cookies
    setTimeout(() => {
      releaseBrowserContext(options.poolKey + "-refresh").catch(() => {});
    }, 1000);
  }
}

/**
 * refreshCookiesViaBrowser — Refresh cookies using a browser context.
 * Uses pendingRefreshes dedup so concurrent requests share one browser launch.
 * NOTE: Override check (httpOverride) is handled in the core stub — this
 * package version always attempts browser cookie refresh.
 */
async function refreshCookiesViaBrowser(
  chatUrl: string,
  chatPageUrl: string,
  cookieDomain: string,
  poolKey: string,
  signal: AbortSignal | null
): Promise<string | null> {
  const pending = pendingRefreshes.get(poolKey);
  if (pending) return pending;
  const promise = doRefresh({ chatPageUrl, cookieDomain, poolKey, signal });
  pendingRefreshes.set(poolKey, promise);
  try {
    return await promise;
  } finally {
    pendingRefreshes.delete(poolKey);
  }
}

/**
 * startBrowserWarmup — Pre-warm a browser context for the given pool key.
 * This is a fire-and-forget operation: errors are caught and ignored.
 * The warmup page serves as a readiness indicator — we open a page in the
 * pooled context to force early navigation before the actual request.
 */
export async function startBrowserWarmup(
  poolKey: string,
  chatPageUrl: string,
  cookieDomain: string,
  signal: AbortSignal | null
): Promise<void> {
  if (process.env.OMNIROUTE_BROWSER_POOL === "off") return;
  const pooled = await acquireBrowserContext(poolKey, {
    cookieDomain,
    cookieString: null,
    warmupUrl: chatPageUrl,
    waitFor: 2000,
  });
  // Warmup: open a page in the pooled context — this can happen in parallel
  openPage(pooled).catch(() => {});
}

/**
 * getFreshCookiesWithWarmup — Try cached cookies first; if none, start
 * a browser warmup in parallel with a cookie refresh. Returns cookie string
 * or null. Caches successful results.
 */
export async function getFreshCookiesWithWarmup(
  chatUrl: string,
  chatPageUrl: string,
  cookieDomain: string,
  poolKey: string,
  signal: AbortSignal | null
): Promise<string | null> {
  // Try cached cookies first
  const cached = getCachedCookies(cookieDomain);
  if (cached) return cached;

  // Start warmup in parallel with refresh
  const warmup = startBrowserWarmup(poolKey, chatPageUrl, cookieDomain, signal);
  const fresh = await refreshCookiesViaBrowser(chatUrl, chatPageUrl, cookieDomain, poolKey, signal);
  // Await warmup (errors are non-fatal)
  await warmup.catch(() => {});
  if (fresh) {
    setCachedCookies(cookieDomain, fresh);
    return fresh;
  }
  return null;
}

// ── Main entry point ───────────────────────────────────

export async function browserBackedChat(
  req: BrowserBackedChatRequest
): Promise<BrowserBackedChatResult> {
  const t0 = Date.now();
  const {
    poolKey,
    chatUrl,
    chatPageUrl,
    userMessage,
    cookieString,
    cookieDomain,
    chatUrlMatchDomain,
    userAgent,
    locale,
    timezone,
    inputSelector,
    submitButtonSelector,
    postSubmitWaitMs = 15000,
    signal,
    reuseContext = true,
  } = req;

  const { key, acquired: reuseAcquired } = await settlePoolKey(poolKey, reuseContext);
  const tAcquireStart = Date.now();
  const pooled: PooledContext = await acquireBrowserContext(key, {
    cookieDomain: cookieDomain || chatUrlMatchDomain,
    cookieString: cookieString || null,
    warmupUrl: chatPageUrl,
    userAgent,
    locale,
    timezone,
  });
  const acquireContextMs = Date.now() - tAcquireStart;

  const page = await openPage(pooled);
  try {
    const tNavStart = Date.now();
    await page.goto(chatPageUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    const navigateMs = Date.now() - tNavStart;

    const inputLocator = page.locator(inputSelector).first();
    await inputLocator.waitFor({ state: "visible", timeout: 10000 });
    await waitWithSignal(800, signal);

    const responsePromise = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" && chatUrlMatcher(r.url(), chatUrlMatchDomain, chatUrl),
      { timeout: 30000 }
    );

    let abortListener: (() => void) | undefined;
    const signalPromise = signal
      ? new Promise<never>((_, reject) => {
          if (signal.aborted) return reject(new DOMException("Aborted", "AbortError"));
          abortListener = () => reject(new DOMException("Aborted", "AbortError"));
          signal.addEventListener("abort", abortListener, { once: true });
        })
      : null;

    if (submitButtonSelector) {
      const btn = page.locator(submitButtonSelector).first();
      if ((await btn.count()) > 0) {
        try {
          await btn.click({ timeout: 2000 });
        } catch {
          await page.keyboard.press("Enter");
        }
      } else {
        await page.keyboard.press("Enter");
      }
    } else {
      await page.keyboard.press("Enter");
    }
    const tCaptureStart = Date.now();
    const response = signalPromise
      ? await Promise.race([responsePromise, signalPromise]).catch(() => null)
      : await responsePromise.catch(() => null);
    if (signal && abortListener) {
      signal.removeEventListener("abort", abortListener);
    }
    if (response) {
      await waitWithSignal(Math.min(postSubmitWaitMs, 30000), signal);
    } else {
      await waitWithSignal(postSubmitWaitMs, signal);
    }
    const captureResponseMs = Date.now() - tCaptureStart;
    const submitMs = captureResponseMs;

    let status = 0;
    let contentType: string | null = null;
    let body: Buffer = Buffer.alloc(0);
    if (response) {
      const captured = await readPageResponseBody(response);
      if (captured.body.length > MAX_RESPONSE_BYTES) {
        body = Buffer.from(
          JSON.stringify({
            error: {
              message: "Response too large",
              type: "upstream_error",
            },
          })
        );
        status = 502;
        contentType = "application/json";
      } else {
        body = captured.body as unknown as Buffer;
        contentType = captured.headers["content-type"] || null;
      }
    }

    return {
      status,
      contentType,
      body,
      isStealth: pooled.isStealth,
      timing: {
        acquireContextMs,
        navigateMs,
        submitMs,
        captureResponseMs,
        totalMs: Date.now() - t0,
      },
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const body = Buffer.from(
      JSON.stringify({
        error: {
          message: sanitizeErrorMessage(`browserBackedChat failed: ${msg}`),
          type: "upstream_error",
        },
      })
    );
    return {
      status: 502,
      contentType: "application/json",
      body,
      isStealth: pooled.isStealth,
      timing: {
        acquireContextMs,
        navigateMs: 0,
        submitMs: 0,
        captureResponseMs: 0,
        totalMs: Date.now() - t0,
      },
    };
  } finally {
    await page.close();
    if (!reuseAcquired) {
      try {
        await pooled.context.close();
      } catch {
        /* ignore */
      }
    }
  }
}
