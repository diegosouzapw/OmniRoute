/**
 * Web Fetch Handler
 *
 * Handles POST /v1/web/fetch requests.
 * Dispatches to a web-fetch provider executor (Firecrawl, Jina Reader, or Tavily).
 *
 * Request format:
 * {
 *   "url": "https://example.com",
 *   "provider": "firecrawl" | "jina-reader" | "tavily-search",  // optional
 *   "format": "markdown" | "html" | "links" | "screenshot",
 *   "depth": 0 | 1 | 2,
 *   "wait_for_selector": "main",
 *   "include_metadata": true
 * }
 */

import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import { firecrawlFetch } from "../executors/firecrawl-fetch.ts";
import { jinaReaderFetch } from "../executors/jina-reader-fetch.ts";
import { tavilyFetch } from "../executors/tavily-fetch.ts";

export type WebFetchFormat = "markdown" | "html" | "links" | "screenshot";

export interface WebFetchRequest {
  url: string;
  provider?: "firecrawl" | "jina-reader" | "tavily-search";
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
  metadata: { title: string | null; description: string | null } | null;
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
}

const WEB_FETCH_PROVIDERS = ["firecrawl", "jina-reader", "tavily-search"] as const;
type WebFetchProviderId = (typeof WEB_FETCH_PROVIDERS)[number];

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
