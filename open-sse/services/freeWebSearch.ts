/**
 * Free, no-API-key web search via DuckDuckGo's HTML "lite" endpoint
 * (free-claude-code port). Used as a LAST-RESORT fallback search provider
 * (`duckduckgo-free`, `fallbackOnly`) when no credentialed search provider is
 * configured — see open-sse/config/searchRegistry.ts.
 *
 * Best-effort HTML scraping: the lite endpoint's markup can drift, so the parser
 * is tolerant (quote styles, attribute order, `<b>` highlights, entities) and the
 * unit test pins the contract against a real captured response. The network call
 * goes through `safeOutboundFetch` with the public-only SSRF guard.
 */
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";

export interface FreeSearchResult {
  title: string;
  url: string;
  snippet: string;
}

const DUCKDUCKGO_LITE_URL = "https://lite.duckduckgo.com/lite/";
// A browser-like UA — the lite endpoint rejects obvious bot agents.
const DDG_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// Real lite shape: `<a ... href="URL" class='result-link'>Title</a>` (href usually
// before class; quotes may be single or double) and `<td class='result-snippet'>…</td>`.
const ANCHOR_RE = /<a\b([^>]*?class=['"][^'"]*result-link[^'"]*['"][^>]*)>([\s\S]*?)<\/a>/gi;
const HREF_RE = /href=['"]([^'"]+)['"]/i;
const SNIPPET_RE =
  /<td\b[^>]*?class=['"][^'"]*result-snippet[^'"]*['"][^>]*>([\s\S]*?)<\/td>/gi;

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'");
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

/** Resolve a lite result href to a real absolute URL. */
function resolveResultUrl(href: string): string {
  // Older/HTML endpoints wrap the target in a redirect: //duckduckgo.com/l/?uddg=<enc>&…
  const redirect = href.match(/[?&]uddg=([^&]+)/);
  if (redirect) {
    try {
      return decodeURIComponent(redirect[1]);
    } catch {
      // malformed encoding — fall through to the raw href
    }
  }
  if (href.startsWith("//")) return `https:${href}`;
  return href;
}

/**
 * Parse the DuckDuckGo lite HTML into ordered results. Pure (no network) so it is
 * fully unit-testable. Result link N aligns with snippet N (the lite layout emits
 * them 1:1); a missing snippet yields an empty string rather than a crash.
 */
export function parseDuckDuckGoLite(html: string): FreeSearchResult[] {
  if (!html) return [];

  const snippets = [...html.matchAll(SNIPPET_RE)].map((m) => stripTags(m[1]));
  const results: FreeSearchResult[] = [];
  let index = 0;

  for (const match of html.matchAll(ANCHOR_RE)) {
    const attrs = match[1];
    const inner = match[2];
    const hrefMatch = attrs.match(HREF_RE);
    const title = stripTags(inner);
    if (hrefMatch && title) {
      const url = resolveResultUrl(hrefMatch[1]);
      if (url) results.push({ url, title, snippet: snippets[index] ?? "" });
    }
    index += 1;
  }

  return results;
}

/**
 * Run a free DuckDuckGo lite search and return up to `maxResults` parsed results.
 * Throws on a non-2xx upstream so the search handler can record the failure and
 * fall through. The URL is fixed, but the call still goes through the public-only
 * SSRF guard for defense in depth.
 */
export async function freeWebSearch(
  query: string,
  maxResults = 5,
  timeoutMs = 10_000
): Promise<FreeSearchResult[]> {
  const response = await safeOutboundFetch(DUCKDUCKGO_LITE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": DDG_USER_AGENT,
      Accept: "text/html",
    },
    body: new URLSearchParams({ q: query }).toString(),
    guard: "public-only",
    allowRedirect: true,
    timeoutMs,
  });

  if (!response.ok) {
    throw new Error(`DuckDuckGo lite search returned HTTP ${response.status}`);
  }

  const html = await response.text();
  return parseDuckDuckGoLite(html).slice(0, Math.max(1, maxResults));
}
