import { createHash } from "node:crypto";

import { acquireBrowserContext, openPage } from "../../services/browserPool.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const META_AI_GRAPHQL_API = "https://www.meta.ai/api/graphql";
const META_AI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
// doc_id for the Heisenberg check that refreshes ecto_1_sess cookie
const META_AI_HEISENBERG_DOC_ID = "954e9b193487fa4af750af87906e4313";

// ─── Fresh WS access token fetcher ──────────────────────────────────────────
// Meta's gateway rejects stale ecto1 tokens with a 0x0e frame after 4 messages
// (#10727). The browser gets a fresh accessToken embedded in the page HTML on
// every load. Plain fetch to meta.ai returns 403 (JS challenge), so we use
// the shared browserPool to load the page in headless Chromium and extract the
// token from the rendered DOM — exactly what a real browser does.
//
// The browser context is keyed per cookie (hashed) so multiple Meta AI
// connections with different accounts don't collide. The pool handles
// lifecycle, reuse, and idle eviction.

export type AccessTokenResult =
  { ok: true; token: string; updatedCookie?: string } | { ok: false; error: string };

const ACCESS_TOKEN_RE = /accessToken[\\"]+:\s*[\\"]+ecto1:([A-Za-z0-9_-]+)[\\"]+/;

// Simple in-memory cache: one fresh token per cookie hash, TTL 4 minutes.
// Meta tokens last ~5 min; refreshing at 4 avoids using one right at expiry.
const META_TOKEN_CACHE = new Map<string, { token: string; expiresAt: number }>();
const META_TOKEN_TTL_MS = 4 * 60 * 1000;

async function fetchFreshAccessToken(
  cookieHeader: string,
  signal?: AbortSignal | null
): Promise<AccessTokenResult> {
  // Check cache first — avoid launching a browser on every request.
  const cacheKey = createHash("sha256").update(cookieHeader).digest("hex").slice(0, 16);
  const cached = META_TOKEN_CACHE.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return { ok: true, token: cached.token };
  }

  try {
    // Step 0: Heisenberg check refreshes the ecto_1_sess cookie via GraphQL
    // (this endpoint accepts plain fetch — no JS challenge).
    const heisenbergResponse = await fetch(META_AI_GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookieHeader,
        "User-Agent": META_AI_USER_AGENT,
        Origin: "https://meta.ai",
      },
      body: JSON.stringify({ doc_id: META_AI_HEISENBERG_DOC_ID, variables: {} }),
      signal: signal ?? undefined,
    });

    let updatedCookie: string | undefined;
    const setCookie = heisenbergResponse.headers.get("set-cookie") || "";
    const sessMatch = setCookie.match(/ecto_1_sess=([^;]+)/);
    if (sessMatch && sessMatch[1] && sessMatch[1] !== "") {
      updatedCookie = cookieHeader.replace(/ecto_1_sess=[^;]+/, `ecto_1_sess=${sessMatch[1]}`);
    }
    const effectiveCookie = updatedCookie || cookieHeader;

    // Step 1: Load meta.ai in headless Chromium via browserPool.
    // The page embeds a fresh accessToken in an inline <script> (RSC payload).
    // Plain fetch returns 403 (JS challenge), so a real browser is required.
    const poolKey = `meta-ai-token:${cacheKey}`;
    const acquire = _metaTokenBrowserPoolForTesting?.acquire || acquireBrowserContext;
    const pooled = await acquire(poolKey, {
      cookieDomain: ".meta.ai",
      cookieString: effectiveCookie,
      warmupUrl: null,
      userAgent: META_AI_USER_AGENT,
    });

    let page: import("playwright").Page | null = null;
    try {
      const open = _metaTokenBrowserPoolForTesting?.openPage || openPage;
      page = await open(pooled);

      // Race the page load against the caller's abort signal.
      // Use networkidle — meta.ai serves a JS challenge page on the initial
      // response (HTTP 200, tiny HTML with executeChallenge()). The challenge
      // runs inline JS that sets a cookie and reloads. domcontentloaded fires
      // on the challenge page before the real page loads; networkidle waits
      // for the reload + full render to complete.
      const navPromise = page.goto("https://www.meta.ai/", {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      if (signal) {
        const abortPromise = new Promise<never>((_, reject) => {
          signal.addEventListener("abort", () => reject(signal.reason), { once: true });
        });
        await Promise.race([navPromise, abortPromise]);
      } else {
        await navPromise;
      }

      // Extract the token from page content (inline script / RSC payload).
      const html = await page.content();
      const match = html.match(ACCESS_TOKEN_RE);
      if (!match) {
        return { ok: false, error: "accessToken not found in meta.ai page (browser)" };
      }

      const token = `ecto1:${match[1]}`;
      META_TOKEN_CACHE.set(cacheKey, { token, expiresAt: Date.now() + META_TOKEN_TTL_MS });
      return { ok: true, token, updatedCookie };
    } finally {
      await page?.close().catch(() => {});
    }
  } catch (err) {
    return {
      ok: false,
      error: `fetchFreshAccessToken failed: ${sanitizeErrorMessage(
        err instanceof Error ? err.message : String(err)
      )}`,
    };
  }
}

// Test hook: override fetchFreshAccessToken in unit tests to avoid launching
// a real browser. Set to a function to override, undefined to use the real impl.
let _fetchFreshAccessTokenOverride:
  ((cookieHeader: string, signal?: AbortSignal | null) => Promise<AccessTokenResult>) | undefined;

export function __setMuseSparkFreshTokenFetcherForTesting(
  fn:
    ((cookieHeader: string, signal?: AbortSignal | null) => Promise<AccessTokenResult>) | undefined
): void {
  _fetchFreshAccessTokenOverride = fn;
}

// Test hook for the real fetchFreshAccessToken body: swap only the browserPool
// seams (acquire/openPage) so the cache, cookie-refresh and token-extraction
// logic runs under test without launching Chromium. undefined = real pool.
let _metaTokenBrowserPoolForTesting:
  { acquire?: typeof acquireBrowserContext; openPage?: typeof openPage } | undefined;

export function __setMuseSparkBrowserPoolForTesting(
  seams: typeof _metaTokenBrowserPoolForTesting
): void {
  _metaTokenBrowserPoolForTesting = seams;
}

// Test hook: drop all cached WS tokens so each test starts cold.
export function __resetMuseSparkTokenCacheForTesting(): void {
  META_TOKEN_CACHE.clear();
}

// Test hook: exercise the real fetchFreshAccessToken (cache, cookie refresh,
// browserPool token extraction) without a static-token override.
export function __fetchFreshAccessTokenForTesting(
  cookieHeader: string,
  signal?: AbortSignal | null
): Promise<AccessTokenResult> {
  return fetchFreshAccessToken(cookieHeader, signal);
}

// Wrapper that delegates to the override if set.
export const _fetchFreshAccessTokenDispatch = (
  cookieHeader: string,
  signal?: AbortSignal | null
): Promise<AccessTokenResult> =>
  _fetchFreshAccessTokenOverride
    ? _fetchFreshAccessTokenOverride(cookieHeader, signal)
    : fetchFreshAccessToken(cookieHeader, signal);
