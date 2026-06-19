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
// The inner-content captures are HARD-BOUNDED ({0,N}?) and the whole body is truncated
// (MAX_HTML_BYTES) so adversarial/unclosed HTML can't cause catastrophic backtracking
// (ReDoS) — real titles/snippets are short. See CLAUDE.md PII learnings §1.
const ANCHOR_RE =
  /<a\b([^>]*?class=['"][^'"]*result-link[^'"]*['"][^>]*)>([\s\S]{0,512}?)<\/a>/gi;
const HREF_RE = /href=['"]([^'"]+)['"]/i;
const SNIPPET_RE =
  /<td\b[^>]*?class=['"][^'"]*result-snippet[^'"]*['"][^>]*>([\s\S]{0,2048}?)<\/td>/gi;
// Generous cap for the lite endpoint (~50 KB real) — bounds the regex input size.
const MAX_HTML_BYTES = 256 * 1024;

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

/**
 * Resolve a lite result href to a real absolute URL. Returns "" for anything that
 * is not a plain http(s) URL — the decoded `uddg` value is external data, so we must
 * never surface a `javascript:`/`data:`/`file:`/internal-IP URL to the caller (LLM
 * or client); the parser skips empty URLs.
 */
function resolveResultUrl(href: string): string {
  let candidate = href;
  // Older/HTML endpoints wrap the target in a redirect: //duckduckgo.com/l/?uddg=<enc>&…
  const redirect = href.match(/[?&]uddg=([^&]+)/);
  if (redirect) {
    try {
      candidate = decodeURIComponent(redirect[1]);
    } catch {
      candidate = href; // malformed encoding — fall back to the raw href
    }
  } else if (href.startsWith("//")) {
    candidate = `https:${href}`;
  }
  return /^https?:\/\//i.test(candidate) ? candidate : "";
}

/**
 * Parse the DuckDuckGo lite HTML into ordered results. Pure (no network) so it is
 * fully unit-testable. Result link N aligns with snippet N (the lite layout emits
 * them 1:1); a missing snippet yields an empty string rather than a crash.
 */
export function parseDuckDuckGoLite(rawHtml: string): FreeSearchResult[] {
  if (!rawHtml) return [];
  // Bound the regex input size as the first ReDoS guard.
  const html = rawHtml.length > MAX_HTML_BYTES ? rawHtml.slice(0, MAX_HTML_BYTES) : rawHtml;

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
    // Keep redirects manual: the public-only guard only validates the initial URL,
    // so following a 3xx could reach an internal host. DDG lite answers POST with 200.
    allowRedirect: false,
    timeoutMs,
  });

  if (!response.ok) {
    throw new Error(`DuckDuckGo lite search returned HTTP ${response.status}`);
  }

  const html = await response.text();
  return parseDuckDuckGoLite(html).slice(0, Math.max(1, maxResults));
}
