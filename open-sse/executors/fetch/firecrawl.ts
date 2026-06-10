/**
 * Firecrawl Web Fetch Executor
 *
 * Fetches content from a URL using the Firecrawl scrape API.
 * POST https://api.firecrawl.dev/v1/scrape
 *
 * Free tier: 500 fetches/month, no credit card required.
 * Docs: https://docs.firecrawl.dev/api-reference/endpoint/scrape
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const FIRECRAWL_API_BASE = "https://api.firecrawl.dev/v1";
const FIRECRAWL_TIMEOUT_MS = 30_000;

function mapFormat(format: WebFetchFormat): string {
  switch (format) {
    case "html":
      return "html";
    case "links":
      return "links";
    case "screenshot":
      return "screenshot";
    case "markdown":
    default:
      return "markdown";
  }
}

interface FirecrawlScrapeOptions {
  url: string;
  format: WebFetchFormat;
  depth: number;
  waitForSelector?: string;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

/**
 * Execute a Firecrawl scrape request.
 */
export async function firecrawlFetch(opts: FirecrawlScrapeOptions): Promise<WebFetchResult> {
  const { url, format, depth, waitForSelector, includeMetadata, credentials } = opts;

  if (!credentials.apiKey) {
    const body = buildErrorBody(401, "Firecrawl API key required");
    return { success: false, status: 401, error: body.error.message };
  }

  const formats = [mapFormat(format)];

  const requestBody: Record<string, unknown> = {
    url,
    formats,
  };

  if (includeMetadata) {
    requestBody.includeTags = ["title", "description", "og:title", "og:description"];
  }

  if (depth > 0) {
    requestBody.maxDepth = depth;
  }

  if (waitForSelector) {
    requestBody.waitFor = waitForSelector;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FIRECRAWL_TIMEOUT_MS);

  try {
    const response = await fetch(`${FIRECRAWL_API_BASE}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (!response.ok) {
      const rawError = await response.text().catch(() => `HTTP ${response.status}`);
      const msg = sanitizeErrorMessage(`Firecrawl error ${response.status}: ${rawError}`);
      const body = buildErrorBody(response.status, msg);
      return { success: false, status: response.status, error: body.error.message };
    }

    const data = (await response.json()) as Record<string, unknown>;

    const scraped = (data.data as Record<string, unknown> | null) ?? {};

    const content =
      format === "html"
        ? String(scraped.html ?? "")
        : format === "links"
          ? JSON.stringify(scraped.links ?? [])
          : String(scraped.markdown ?? scraped.content ?? "");

    const rawLinks = scraped.links;
    const links: string[] = Array.isArray(rawLinks) ? rawLinks.map((l) => String(l)) : [];

    const rawMeta = scraped.metadata as Record<string, unknown> | null | undefined;
    const metadata = includeMetadata
      ? {
          title: rawMeta?.title != null ? String(rawMeta.title) : null,
          description: rawMeta?.description != null ? String(rawMeta.description) : null,
        }
      : null;

    const screenshotUrl =
      format === "screenshot"
        ? scraped.screenshot != null
          ? String(scraped.screenshot)
          : null
        : null;

    return {
      success: true,
      data: {
        provider: "firecrawl",
        url,
        content,
        links,
        metadata,
        screenshot_url: screenshotUrl,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      const body = buildErrorBody(504, "Firecrawl request timed out");
      return { success: false, status: 504, error: body.error.message };
    }
    const msg =
      err instanceof Error ? sanitizeErrorMessage(err.message) : sanitizeErrorMessage(String(err));
    const body = buildErrorBody(502, msg);
    return { success: false, status: 502, error: body.error.message };
  } finally {
    clearTimeout(timeoutId);
  }
}
