/**
 * Web Fetch Handler
 *
 * Handles POST /v1/web/fetch requests.
 * Dispatches to a web-fetch provider executor (Firecrawl, Jina Reader, Tavily, or TinyFish).
 * Also AnySearch extract for free public fetch.
 *
 * Request format:
 * {
 *   "url": "https://example.com",
 *   "provider": "firecrawl" | "jina-reader" | "tavily-search" | "tinyfish",  // optional
 *   "format": "markdown" | "html" | "links" | "screenshot",
 *   "depth": 0 | 1 | 2,
 *   "wait_for_selector": "main",
 *   "include_metadata": true
 * }
 */

import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import { context7Fetch } from "../executors/context7-fetch.ts";
import { firecrawlFetch } from "../executors/firecrawl-fetch.ts";
import { jinaReaderFetch } from "../executors/jina-reader-fetch.ts";
import { tavilyFetch } from "../executors/tavily-fetch.ts";
import { tinyfishFetch } from "../executors/tinyfish-fetch.ts";
import { nimbleFetch } from "../executors/nimble-fetch.ts";
import { anysearchFetch } from "../executors/anysearch-fetch.ts";

export type WebFetchFormat = "markdown" | "html" | "links" | "screenshot";

export interface WebFetchRequest {
  url: string;
  provider?:
    | "firecrawl"
    | "jina-reader"
    | "tavily-search"
    | "tinyfish"
    | "context7"
    | "nimble-search"
    | "anysearch-search";
  format?: WebFetchFormat;
  depth?: 0 | 1 | 2;
  wait_for_selector?: string;
  include_metadata?: boolean;
}

export interface WebFetchResponse {
  provider: string;
  url: string;
  content: string;
  links: string[];
  metadata: { title: string | null; description: string | null; truncated?: boolean } | null;
  screenshot_url: string | null;
}

export interface WebFetchResult {
  success: boolean;
  status?: number;
  error?: string;
  data?: WebFetchResponse;
}

export interface WebFetchCredentials {
  apiKey?: string;
  baseUrl?: string;
  providerSpecificData?: Record<string, unknown>;
}

export const WEB_FETCH_PROVIDERS = Object.freeze([
  "firecrawl",
  "jina-reader",
  "tavily-search",
  "tinyfish",
  "anysearch-search",
  "context7",
  "nimble-search",
] as const);
// Derived from the array — adding a provider to WEB_FETCH_PROVIDERS
// automatically widens the union; they cannot drift apart.
export type WebFetchProviderId = (typeof WEB_FETCH_PROVIDERS)[number];

/**
 * Providers that only run when the caller names them explicitly — they are not
 * candidates for generic URL auto-select or fallback walks.
 *
 * The ReadonlySet type is compile-time protection only: Object.freeze cannot
 * seal a Set's internal slots, so a determined JS caller could still mutate it.
 * All repo consumers go through TypeScript, which is the threat model here.
 */
export const EXPLICIT_ONLY_WEB_FETCH_PROVIDERS: ReadonlySet<WebFetchProviderId> =
  new Set<WebFetchProviderId>(["context7"]);

/**
 * Providers whose upstream serves a usable anonymous tier, so an explicit
 * request succeeds even with no configured connection.
 *
 * Compile-time protection only (see the note above on ReadonlySet).
 */
export const ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS: ReadonlySet<WebFetchProviderId> =
  new Set<WebFetchProviderId>(["context7"]);

/**
 * Execute a web fetch request against the specified (or auto-selected) provider.
 *
 * @param req - Validated web fetch request body
 * @param credentials - Provider API credentials (apiKey)
 * @param resolvedProvider - Provider ID to use; if omitted auto-selects based on available creds
 */
export async function handleWebFetch(
  req: WebFetchRequest,
  credentials: WebFetchCredentials,
  resolvedProvider?: WebFetchProviderId
): Promise<WebFetchResult> {
  const provider = resolvedProvider ?? req.provider ?? "firecrawl";

  const format: WebFetchFormat = req.format ?? "markdown";
  const includeMetadata = req.include_metadata ?? false;

  try {
    switch (provider) {
      case "firecrawl":
        return await firecrawlFetch({
          url: req.url,
          format,
          depth: req.depth ?? 0,
          waitForSelector: req.wait_for_selector,
          includeMetadata,
          credentials,
        });

      case "jina-reader":
        return await jinaReaderFetch({
          url: req.url,
          format,
          includeMetadata,
          credentials,
        });

      case "tavily-search":
        return await tavilyFetch({
          url: req.url,
          format,
          includeMetadata,
          credentials,
        });

      case "tinyfish":
        return await tinyfishFetch({
          url: req.url,
          format,
          includeMetadata,
          credentials,
        });
      case "anysearch-search":
        return await anysearchFetch({
          url: req.url,
          format,
          includeMetadata,
          credentials,
        });

      case "nimble-search":
        return await nimbleFetch({
          url: req.url,
          format,
          includeMetadata,
          credentials,
        });

      case "context7":
        // Context7 returns llms.txt text only: html/links/screenshot formats are
        // unsupported, and the format field is validated/ignored below.
        if (req.format && req.format !== "markdown") {
          const body = buildErrorBody(
            400,
            `Provider 'context7' only supports format 'markdown' (llms.txt), got '${req.format}'`
          );
          return { success: false, status: 400, error: body.error.message };
        }
        return await context7Fetch({
          url: req.url,
          includeMetadata,
          credentials,
        });

      default: {
        const _exhaustive: never = provider;
        return {
          success: false,
          status: 400,
          error: `Unknown web fetch provider: ${_exhaustive}`,
        };
      }
    }
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? sanitizeErrorMessage(err.message) : sanitizeErrorMessage(String(err));
    const body = buildErrorBody(502, msg);
    return {
      success: false,
      status: 502,
      error: body.error.message,
    };
  }
}
