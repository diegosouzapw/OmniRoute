import { Buffer } from "node:buffer";
import tlsClient from "../utils/tlsClient.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { resolveHttpBackedChatFingerprint } from "./httpBackedChatFingerprint.ts";

// ===================== TYPES =====================

export interface BrowserBackedChatRequest {
  poolKey: string;
  chatUrl: string;
  chatPageUrl?: string;
  userMessage: string;
  chatUrlMatchDomain?: string;
  cookieDomain?: string;
  inputSelector?: string;
  cookieString?: string;
  userAgent?: string;
  locale?: string;
  timezone?: string;
  submitButtonSelector?: string;
  postSubmitWaitMs?: number;
  signal?: AbortSignal;
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
// ===================== MODULE PROXY =====================
export interface BrowserPoolModule {
  tryBackedChat(req: TryBackedChatRequest, signal?: AbortSignal): Promise<TryBackedChatResult>;
  browserBackedChat(req: BrowserBackedChatRequest): Promise<ChatResult>;
  getFreshCookiesWithWarmup(req: CookieRefreshRequest): Promise<CookieRefreshResult>;
  getCachedCookies(domain: string): Promise<CookieStore | null>;
  setCachedCookies(domain: string, cookies: CookieStore): Promise<void>;
  clearCookieCache(domain?: string): Promise<void>;
  shouldUseGrokBrowserBacked(): boolean;
  setProxyResolver(fn: ProxyResolver): void;
}
let modPromise: Promise<BrowserPoolModule | null> | null = null;
function getMod(): Promise<BrowserPoolModule | null> {
  if (!modPromise) {
    modPromise = import("@omniroute/browser-pool").catch(() => null);
  }
  return modPromise;
}
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024;
const COOKIE_CACHE_TTL_MS = 5 * 60 * 1000;
const COOKIE_POLL_INTERVAL_MS = 500;
const COOKIE_POLL_TIMEOUT_MS = 5 * 1000;

// ===================== MODULE PROXY =====================

let modPromise: Promise<any> | null = null;

function getMod(): Promise<any> {
  if (!modPromise) {
    modPromise = import("@omniroute/browser-pool").catch(() => null);
  }
  return modPromise;
}

// ===================== COOKIE CACHE (DELEGATED) =====================

async function getCachedCookies(domain: string | undefined): Promise<string | undefined> {
  const mod = await getMod();
  if (!mod) return undefined;
  return mod.getCachedCookies(domain);
}

async function setCachedCookies(domain: string | undefined, cookies: string): Promise<void> {
  if (!domain) return;
  const mod = await getMod();
  if (mod) await mod.setCachedCookies(domain, cookies);
}

export async function clearCookieCache(): Promise<void> {
  const mod = await getMod();
  if (mod) await mod.clearCookieCache();
}

// ===================== TEST OVERRIDES =====================

let browserBackedChatOverride: ((req: BrowserBackedChatRequest) => Promise<BrowserBackedChatResult>) | null = null;
let httpBackedChatOverride: ((req: BrowserBackedChatRequest) => Promise<BrowserBackedChatResult>) | null = null;

export function __setBrowserBackedChatOverrideForTesting(
  fn: ((req: BrowserBackedChatRequest) => Promise<BrowserBackedChatResult>) | null,
): void {
  browserBackedChatOverride = fn;
}

export function __resetBrowserBackedChatOverrideForTesting(): void {
  browserBackedChatOverride = null;
}

export function __setHttpBackedChatOverrideForTesting(
  fn: ((req: BrowserBackedChatRequest) => Promise<BrowserBackedChatResult>) | null,
): void {
  httpBackedChatOverride = fn;
}

export function __resetHttpBackedChatOverrideForTesting(): void {
  httpBackedChatOverride = null;
}

// ===================== HELPER FUNCTIONS =====================

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

export function isChallengeResponse(status: number): boolean {
  return status >= 400 && status !== 501;
}

// ===================== HTTP-BACKED CHAT (INLINE) =====================

export async function httpBackedChat(req: BrowserBackedChatRequest): Promise<BrowserBackedChatResult> {
  if (httpBackedChatOverride) return httpBackedChatOverride(req);

  const startTime = Date.now();

  const headers: Record<string, string> = {
    "user-agent":
      req.userAgent ??
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "content-type": "application/json",
    accept: "*/*",
  };

  if (req.cookieString) {
    headers["cookie"] = req.cookieString;
  }

  const body = JSON.stringify({ messages: [{ role: "user", content: req.userMessage }] });
  const fingerprint = resolveHttpBackedChatFingerprint(req.poolKey);

  let response: Response;
  try {
    response = await tlsClient.fetch(req.chatUrl, {
      method: "POST",
      headers,
      body,
      fingerprint,
      signal: req.signal,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return {
      status: 0,
      contentType: "text/plain",
      body: Buffer.from(msg),
      isStealth: true,
      timing: { acquireContextMs: 0, navigateMs: 0, submitMs: 0, captureResponseMs: 0, totalMs: Date.now() - startTime },
    };
  }

  // Read body with OOM guard
  const reader = response.body?.getReader();
  const chunks: Buffer[] = [];
  let totalBytes = 0;

  if (reader) {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const buf = Buffer.from(value);
        chunks.push(buf);
        totalBytes += buf.byteLength;
        if (totalBytes > MAX_RESPONSE_BYTES) {
          reader.cancel().catch(() => {});
          return {
            status: 413,
            contentType: "text/plain",
            body: Buffer.from("Response exceeded maximum size"),
            isStealth: true,
            timing: {
              acquireContextMs: 0, navigateMs: 0, submitMs: 0, captureResponseMs: 0,
              totalMs: Date.now() - startTime,
            },
          };
        }
      }
    } catch {
      // stream read error
    }
  }

  const responseBody = Buffer.concat(chunks);
  const contentType = response.headers.get("content-type") ?? null;

  return {
    status: response.status,
    contentType,
    body: responseBody,
    isStealth: true,
    timing: { acquireContextMs: 0, navigateMs: 0, submitMs: 0, captureResponseMs: 0, totalMs: Date.now() - startTime },
  };
}

// ===================== TRY-BACKED CHAT (INLINE) =====================

export async function tryBackedChat(req: BrowserBackedChatRequest): Promise<BrowserBackedChatResult> {
  const startTime = Date.now();

  // Background-load the package module
  const mod = getMod();

  // Start browser warmup in parallel
  mod.then((m) => m?.startBrowserWarmup?.().catch(() => {})).catch(() => {});

  // Try HTTP path first
  try {
    const httpResult = await httpBackedChat(req);

    if (!isChallengeResponse(httpResult.status)) {
      return httpResult;
    }

    // Chase cached cookies
    if (req.cookieDomain) {
      const cached = await getCachedCookies(req.cookieDomain);
      if (cached) {
        const retry = await httpBackedChat({ ...req, cookieString: cached });
        if (!isChallengeResponse(retry.status)) return retry;
      }
    }

    // Need browser-backed path — await the module
    const loaded = await mod;

    // Get fresh cookies via browser
    if (loaded) {
      try {
        const fresh = await loaded.getFreshCookiesWithWarmup(req);
        if (fresh) {
          if (req.cookieDomain) await setCachedCookies(req.cookieDomain, fresh);
          const retry = await httpBackedChat({ ...req, cookieString: fresh });
          if (!isChallengeResponse(retry.status)) return retry;
        }
      } catch {
        // fall through to browser fallback
      }

      // Full browser fallback
      try {
        return await browserBackedChat(req);
      } catch (inner: unknown) {
        if (inner instanceof DOMException && inner.name === "AbortError") {
          return {
            status: 504,
            contentType: "application/json",
            body: Buffer.from(
              JSON.stringify({
                error: {
                  message: "tryBackedChat timed out",
                  type: "timeout_error",
                },
              }),
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
        throw inner;
      }
    }

    return httpResult;
  } catch (err: unknown) {
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
          }),
        ),
        isStealth: false,
        timing: { acquireContextMs: 0, navigateMs: 0, submitMs: 0, captureResponseMs: 0, totalMs: Date.now() - startTime },
      };
    }
    throw err;
  }
}

// ===================== BROWSER-BACKED CHAT (DELEGATED) =====================

export async function browserBackedChat(req: BrowserBackedChatRequest): Promise<BrowserBackedChatResult> {
  if (browserBackedChatOverride) return browserBackedChatOverride(req);
  const mod = await getMod();
  if (!mod) throw new Error("Browser pool package not available");
  return mod.browserBackedChat(req);
}
