/**
 * browserBackedChat.ts — Provider-agnostic browser-backed chat helper.
 *
 * Opens a page on a shared browser context, navigates to the provider's
 * chat page, types the user's message, clicks Send, and returns the
 * upstream SSE/JSON response body as a Node Response.
 *
 * Used by duckduckgo-web and claude-web executors when
 * OMNIROUTE_BROWSER_POOL=on (or WEB_COOKIE_USE_BROWSER=1) is set and
 * the user wants guaranteed live working from this environment, even at
 * the cost of 5-15s of browser navigation overhead per request.
 *
 * The browser solves the provider's challenge natively (VQD, Cloudflare
 * Turnstile, etc.) by computing real DOM measurement values. The
 * Node-side challenge solver in duckduckgo-web.ts still runs as a
 * first-line best-effort; this module is the fallback.
 */

import { Buffer } from "node:buffer";
import {
  acquireBrowserContext,
  openPage,
  readPageResponseBody,
  shutdownPool,
  type PooledContext,
} from "./browserPool.ts";
import tlsClient from "../utils/tlsClient.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { resolveHttpBackedChatFingerprint } from "./httpBackedChatFingerprint.ts";

// Safety constants
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024; // 10 MB
const COOKIE_CACHE_TTL_MS = 5 * 60 * 1000; // Cache fresh cookies for 5 minutes
const COOKIE_POLL_INTERVAL_MS = 500; // Poll for cookies every 500ms
const COOKIE_POLL_TIMEOUT_MS = 5000; // Max poll time for cookies
const CIRCUIT_BASE_COOLDOWN_MS = 30_000; // 30s base cooldown
const CIRCUIT_MAX_COOLDOWN_MS = 600_000; // 10 min max cooldown

// Cookie cache — avoids repeated browser launches when cookies are still valid
interface CachedCookies {
  cookieString: string;
  expiresAt: number;
  domain: string;
}
const cookieCache = new Map<string, CachedCookies>();

function getCachedCookies(domain: string): string | null {
  const cached = cookieCache.get(domain);
  if (cached && Date.now() < cached.expiresAt) return cached.cookieString;
  cookieCache.delete(domain);
  return null;
}

function setCachedCookies(domain: string, cookieString: string, ttlMs?: number): void {
  cookieCache.set(domain, {
    cookieString,
    expiresAt: Date.now() + (ttlMs ?? COOKIE_CACHE_TTL_MS),
    domain,
  });
}

// Dedup pending cookie refreshes per pool key
const pendingRefreshes = new Map<string, Promise<string | null>>();

// Test-only injection point. Tests call __setBrowserBackedChatOverrideForTesting()
// to replace the real browser-backed chat with a mock; production never touches this.
let testOverride: ((req: BrowserBackedChatRequest) => Promise<BrowserBackedChatResult>) | null =
  null;

let httpOverride: ((req: BrowserBackedChatRequest) => Promise<BrowserBackedChatResult>) | null =
  null;

export function __setBrowserBackedChatOverrideForTesting(fn: typeof testOverride): void {
  testOverride = fn;
}

export function __resetBrowserBackedChatOverrideForTesting(): void {
  testOverride = null;
  cookieCache.clear();
}

export function __setHttpBackedChatOverrideForTesting(fn: typeof httpOverride): void {
  httpOverride = fn;
}

export function __resetHttpBackedChatOverrideForTesting(): void {
  httpOverride = null;
  cookieCache.clear();
}

// Helper to make Playwright waitForTimeout abortable via AbortSignal
function waitWithSignal(ms: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException("Aborted", "AbortError"));
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  }).catch((err) => {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
  });
}

export interface BrowserBackedChatRequest {
  /**
   * Pool key — typically a provider id like "duckduckgo-web" or
   * "claude-web", optionally suffixed by user/account id if cookies
   * differ.
   */
  poolKey: string;
  /**
   * Chat URL the page should submit to. The page's `fetch` will hit
   * this URL when the user clicks Send, and we capture the response.
   */
  chatUrl: string;
  /**
   * Chat page URL to navigate to before typing. The page must already
   * have its chat UI rendered for the input/button selectors to work.
   */
  chatPageUrl: string;
  /**
   * The text the user wants to send. Combined with the model message
   * prefix (e.g. "Reply with exactly: ...") so the user message is the
   * literal text typed into the chat box.
   */
  userMessage: string;
  /**
   * Cookie string (raw) to inject into the browser context. Used by
   * Claude web (cookies from `docs/CLAUDE_COOKIE.md` or similar).
   * For DDG this is empty — the browser is anonymous.
   */
  cookieString?: string | null;
  /**
   * Cookie domain. Used together with cookieString.
   */
  cookieDomain?: string;
  /**
   * Domain for the page's `fetch` to identify which path on the
   * upstream is the chat endpoint. e.g. "duckduckgo.com" for DDG,
   * "claude.ai" for Claude.
   */
  chatUrlMatchDomain: string;
  /**
   * User-Agent string for the browser context.
   */
  userAgent?: string;
  /**
   * Locale (BCP 47). Defaults to en-US.
   */
  locale?: string;
  /**
   * IANA timezone. Defaults to America/New_York.
   */
  timezone?: string;
  /**
   * Selector for the chat input. DDG uses `textarea` with the "Ask
   * anything privately" placeholder; Claude uses a contenteditable
   * div. Override per provider.
   */
  inputSelector: string;
  /**
   * Selector for the submit button. If the page exposes one, click
   * it. Otherwise the helper falls back to pressing Enter in the
   * input.
   */
  submitButtonSelector?: string;
  /**
   * Wait after submit for SSE/JSON to arrive. Default 15 seconds.
   */
  postSubmitWaitMs?: number;
  /**
   * Optional AbortSignal. Cancels navigation/submit.
   */
  signal?: AbortSignal | null;
  /**
   * Reuse the same context across requests when true. When false, a
   * fresh context is opened each time (slower but bypasses
   * per-context rate limits). Default true.
   */
  reuseContext?: boolean;
}

export interface BrowserBackedChatResult {
  status: number;
  contentType: string | null;
  body: Buffer;
  isStealth: boolean;
  timing: {
    acquireContextMs: number;
    navigateMs: number;
    submitMs: number;
    captureResponseMs: number;
    totalMs: number;
  };
}

async function settlePoolKey(
  requestedKey: string,
  reuseContext: boolean
): Promise<{ key: string; acquired: boolean }> {
  if (reuseContext) return { key: requestedKey, acquired: true };
  // Use a unique key per non-reuse call so the pool always creates a
  // fresh context. Slower but isolates state.
  return {
    key: `${requestedKey}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    acquired: false,
  };
}

// Match by stable path prefix and stable trailing suffix, allowing a
// dynamic id segment between them. e.g. for Claude:
// configured:  "/api/organizations/{orgId}/chat_conversations/PLACEHOLDER/completion"
// observed:    "/api/organizations/{orgId}/chat_conversations/{convId}/completion"
// -> prefix "/api/organizations/{orgId}/chat_conversations" must match,
//    suffix "completion" must match, dynamic segment in between is
//    ignored.
export function chatUrlMatcher(u: string, matchDomain: string, chatUrl: string): boolean {
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
  // All segments except the PLACEHOLDER segment must match.
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

export async function browserBackedChat(
  req: BrowserBackedChatRequest
): Promise<BrowserBackedChatResult> {
  if (testOverride) return testOverride(req);
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
      signal: signal ?? undefined,
    });
    await waitWithSignal(2500, signal);
    const navigateMs = Date.now() - tNavStart;

    const inputLocator = page.locator(inputSelector).first();
    await inputLocator.waitFor({ state: "visible", timeout: 10000, signal: signal ?? undefined });
    await inputLocator.fill(userMessage);
    await waitWithSignal(800, signal);

    const tSubmitStart = Date.now();
    const responsePromise = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" && chatUrlMatcher(r.url(), chatUrlMatchDomain, chatUrl),
      { timeout: 30000 }
    );

    // Wire signal to responsePromise via Promise.race
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
      // Wait for the upstream SSE to finish streaming
      await waitWithSignal(Math.min(postSubmitWaitMs, 30000), signal);
    } else {
      await waitWithSignal(postSubmitWaitMs, signal);
    }
    const captureResponseMs = Date.now() - tCaptureStart;
    const submitMs = captureResponseMs;

    let status = 0;
    let contentType: string | null = null;
    let body = Buffer.alloc(0);
    if (response) {
      const captured = await readPageResponseBody(response);
      // OOM guard: reject responses larger than MAX_RESPONSE_BYTES
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
        status = captured.status;
        contentType = captured.headers["content-type"] || null;
        body = captured.body;
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
    // Emit a structured JSON error so the executor can wrap it.
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
      // Non-reused contexts are uniquely keyed. Close the page's context
      // so we don't leak Chromium resources for one-shot calls.
      try {
        await pooled.context.close();
      } catch {
        /* ignore */
      }
    }
  }
}

/**
 * httpBackedChat — Lightweight HTTP-backed alternative to browserBackedChat.
 *
 * Same interface, zero browser overhead. Uses tlsClient (Chrome 124 TLS
 * fingerprint) to make direct HTTP POST requests to the provider's chat
 * endpoint with browser-emulated headers.
 *
 * ~0.5-2s per request vs 10-25s for Playwright. The trade-off: the HTTP
 * path may be blocked by advanced anti-bot challenges (VQD, Turnstile)
 * that only a real browser can solve. When httpBackedChat fails, callers
 * should fall back to browserBackedChat.
 *
 * Supported providers:
 *   - duckduckgo-web:  POST to duckduckgo.com/duckchat/v1/chat
 *   - claude-web:      POST to claude.ai API completion endpoint
 */
export async function httpBackedChat(
  req: BrowserBackedChatRequest
): Promise<BrowserBackedChatResult> {
  if (httpOverride) return httpOverride(req);
  const t0 = Date.now();

  const { chatUrl, userMessage, cookieString, cookieDomain, chatUrlMatchDomain, signal } = req;
  const fingerprint = resolveHttpBackedChatFingerprint(chatUrlMatchDomain); // #7548
  // Build browser-emulated headers
  const headers: Record<string, string> = {
    "User-Agent": fingerprint.userAgent,
    Accept: "text/event-stream, application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/json",
    Origin:
      chatUrlMatchDomain === "duckduckgo.com"
        ? "https://duckduckgo.com"
        : `https://${chatUrlMatchDomain}`,
    Referer:
      chatUrlMatchDomain === "duckduckgo.com"
        ? "https://duckduckgo.com/"
        : `https://${chatUrlMatchDomain}/`,
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Ch-Ua": fingerprint.secChUa,
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": fingerprint.secChUaPlatform,
    Priority: "u=1, i",
  };

  // Inject cookie if provided
  if (cookieString) {
    headers["Cookie"] = cookieString;
  }

  // Build provider-specific request body
  let body: string;
  const parsedUrl = new URL(chatUrl);
  if (parsedUrl.hostname.includes("duckduckgo")) {
    body = JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });
  } else {
    // Default: send as OpenAI-style or as raw text based on endpoint
    body = JSON.stringify({
      messages: [{ role: "user", content: userMessage }],
    });
  }

  try {
    const fetchStart = Date.now();

    if (!tlsClient.available) {
      return {
        status: 501,
        contentType: "application/json",
        body: Buffer.from(
          JSON.stringify({
            error: {
              message: "httpBackedChat unavailable: wreq-js (TLS client) not installed",
              type: "configuration_error",
            },
          })
        ),
        isStealth: false,
        timing: {
          acquireContextMs: 0,
          navigateMs: 0,
          submitMs: Date.now() - t0,
          captureResponseMs: 0,
          totalMs: Date.now() - t0,
        },
      };
    }

    const response = await tlsClient.fetch(chatUrl, {
      method: "POST",
      headers,
      body,
      signal: signal ?? undefined,
    });

    const fetchMs = Date.now() - fetchStart;

    // OOM guard: check content-length before reading body
    const contentLengthHeader = response.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = parseInt(contentLengthHeader, 10);
      if (contentLength > MAX_RESPONSE_BYTES) {
        throw new Error("Response too large");
      }
    }

    const responseBody = Buffer.from(await response.text());
    const responseStatus = response.status;
    const contentType = response.headers.get("content-type") || "text/event-stream";

    return {
      status: responseStatus,
      contentType,
      body: responseBody,
      isStealth: true,
      timing: {
        acquireContextMs: 0,
        navigateMs: 0,
        submitMs: fetchMs,
        captureResponseMs: 0,
        totalMs: Date.now() - t0,
      },
    };
  } catch (err) {
    // Let AbortError propagate — tryBackedChat handles it, returns 504
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    const msg = err instanceof Error ? err.message : String(err);
    const body = Buffer.from(
      JSON.stringify({
        error: {
          message: sanitizeErrorMessage(`httpBackedChat failed: ${msg}`),
          type: "upstream_error",
        },
      })
    );
    return {
      status: 502,
      contentType: "application/json",
      body,
      isStealth: true,
      timing: {
        acquireContextMs: 0,
        navigateMs: 0,
        submitMs: 0,
        captureResponseMs: 0,
        totalMs: Date.now() - t0,
      },
    };
  }
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
 */
async function doCookieRefreshOnContext(
  pooled: import("./browserPool.ts").PooledContext,
  chatPageUrl: string,
  cookieDomain: string,
  signal: AbortSignal | null
): Promise<string | null> {
  const page = await openPage(pooled);
  try {
    await page.goto(chatPageUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
      signal: signal ?? undefined,
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
 * refreshCookiesViaBrowser — Launch a stealth browser to solve the provider's
 * anti-bot challenge and extract fresh session cookies.
 *
 * Features:
 *   - Cookie cache: skip browser launch if we have fresh cached cookies
 *   - Dedup: concurrent calls for the same poolKey share one browser launch
 *   - Polling: returns as soon as cookies appear (avg 1-3s vs fixed 5s)
 */
async function refreshCookiesViaBrowser(
  poolKey: string,
  chatPageUrl: string,
  cookieDomain: string,
  signal: AbortSignal | null
): Promise<string | null> {
  if (httpOverride !== null) return null;

  // Check cookie cache first — avoids browser launch entirely
  const cached = getCachedCookies(cookieDomain);
  if (cached) return cached;

  // Dedup concurrent refreshes for the same pool key
  const pending = pendingRefreshes.get(poolKey);
  if (pending) return pending;

  const promise = doRefresh(poolKey, chatPageUrl, cookieDomain, signal);
  pendingRefreshes.set(poolKey, promise);
  promise.finally(() => pendingRefreshes.delete(poolKey));
  return promise;
}

async function doRefresh(
  poolKey: string,
  chatPageUrl: string,
  cookieDomain: string,
  signal: AbortSignal | null
): Promise<string | null> {
  const { key } = await settlePoolKey(poolKey, true);
  let pooled: import("./browserPool.ts").PooledContext;
  try {
    pooled = await acquireBrowserContext(key, {
      cookieDomain,
      cookieString: null,
      warmupUrl: chatPageUrl,
    });
  } catch {
    return null;
  }

  const result = await doCookieRefreshOnContext(pooled, chatPageUrl, cookieDomain, signal);

  // Cache for subsequent calls
  if (result) setCachedCookies(cookieDomain, result);

  return result;
}

/**
 * startBrowserWarmup — Start acquireBrowserContext in parallel with
 * httpBackedChat. If httpBackedChat succeeds, the context stays in the
 * pool for the next request (saves ~2-3s on the first challenge hit).
 * If a challenge is detected, the browser is already partially ready.
 */
async function startBrowserWarmup(
  req: BrowserBackedChatRequest
): Promise<import("./browserPool.ts").PooledContext | null> {
  if (!req.cookieDomain || httpOverride !== null) return null;
  const flag = process.env.OMNIROUTE_BROWSER_POOL;
  if (flag === "off" || flag === "0" || flag === "false") return null;
  try {
    const { key } = await settlePoolKey(req.poolKey, true);
    return await acquireBrowserContext(key, {
      cookieDomain: req.cookieDomain,
      cookieString: null,
      // No warmupUrl — if httpBackedChat succeeds, the 1.5s warmup wait
      // would be wasted. Navigating fresh in doCookieRefreshOnContext
      // is fast once the browser context already exists.
    });
  } catch {
    return null;
  }
}

/**
 * getFreshCookiesWithWarmup — Try the pre-warmed context first, then
 * fall through to refreshCookiesViaBrowser if unavailable.
 */
async function getFreshCookiesWithWarmup(
  poolKey: string,
  chatPageUrl: string,
  cookieDomain: string,
  signal: AbortSignal | null,
  warmupPromise: Promise<import("./browserPool.ts").PooledContext | null> | null
): Promise<string | null> {
  if (warmupPromise) {
    try {
      const pooled = await warmupPromise;
      if (pooled) {
        const result = await doCookieRefreshOnContext(pooled, chatPageUrl, cookieDomain, signal);
        if (result) {
          setCachedCookies(cookieDomain, result);
          return result;
        }
      }
    } catch {
      // Warmup failed — fall through to fresh refresh
    }
  }
  return refreshCookiesViaBrowser(poolKey, chatPageUrl, cookieDomain, signal);
}

function isChallengeResponse(status: number): boolean {
  return status >= 400 && status !== 501;
}

/**
 * tryBackedChat — Combined fast-then-slow chat executor.
 *
 * Strategy:
 *   1. httpBackedChat (fast TLS, ~0.5-2s) + parallel browser warmup
 *   2. Cookie cache check (0ms) — skip browser if cookies still fresh
 *   3. refreshCookiesViaBrowser (~1-5s) with polling + dedup — Opens a
 *      Playwright page, polls for cookies, caches the result
 *   4. httpBackedChat retry (fast, ~0.5-2s) — Retries with fresh cookies
 *   5. browserBackedChat (slow, ~10-25s) — Full chat through browser
 *
 * Returns the first successful (2xx) response, or the last error.
 * Skips browser steps when OMNIROUTE_BROWSER_POOL=off.
 */
export async function tryBackedChat(
  req: BrowserBackedChatRequest
): Promise<BrowserBackedChatResult> {
  const abortController = req.signal ? null : new AbortController();
  const effectiveSignal = req.signal ?? abortController?.signal ?? null;

  if (abortController) {
    setTimeout(() => abortController.abort(), 45000);
  }

  // Parallel browser warmup: start acquireBrowserContext while
  // httpBackedChat is in flight. If httpBackedChat succeeds, the
  // warmup context stays in the pool for the next request. If it
  // fails with a challenge, the browser is already partially ready,
  // saving ~2-3s on the cookie refresh path.
  const warmupPromise = startBrowserWarmup(req);

  try {
    const fast = await httpBackedChat({ ...req, signal: effectiveSignal ?? undefined });
    if (fast.status >= 200 && fast.status < 300) return fast;

    if (!isChallengeResponse(fast.status)) return fast;

    let freshCookie: string | null = null;
    if (req.cookieDomain) {
      // Cookie cache check — skips browser launch on repeat challenges
      freshCookie = getCachedCookies(req.cookieDomain);
      if (freshCookie) {
        const retry = await httpBackedChat({
          ...req,
          cookieString: freshCookie,
          signal: effectiveSignal ?? undefined,
        });
        if (retry.status >= 200 && retry.status < 300) return retry;
        // Cache is stale — fall through to fresh browser refresh
        freshCookie = null;
      }

      if (!freshCookie) {
        // Use pre-warmed context if available, otherwise fresh refresh
        freshCookie = await getFreshCookiesWithWarmup(
          req.poolKey,
          req.chatPageUrl,
          req.cookieDomain,
          effectiveSignal,
          warmupPromise
        );

        if (freshCookie) {
          const retry = await httpBackedChat({
            ...req,
            cookieString: freshCookie,
            signal: effectiveSignal ?? undefined,
          });
          if (retry.status >= 200 && retry.status < 300) return retry;
        }
      }
    }

    const slowReq = freshCookie
      ? { ...req, cookieString: freshCookie, signal: effectiveSignal ?? undefined }
      : { ...req, signal: effectiveSignal ?? undefined };
    const slow = await browserBackedChat(slowReq);
    if (slow.status >= 200 && slow.status < 300) return slow;
    return slow;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        status: 504,
        contentType: "application/json",
        body: Buffer.from(
          JSON.stringify({
            error: {
              message: "tryBackedChat timed out",
              type: "timeout_error",
            },
          })
        ),
        isStealth: false,
        timing: {
          acquireContextMs: 0,
          navigateMs: 0,
          submitMs: 0,
          captureResponseMs: 0,
          totalMs: 0,
        },
      };
    }
    throw err;
  }
}

export { shutdownPool };
