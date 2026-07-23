/**
 * Firecrawl Web Fetch Executor
 *
 * Fetches content from a URL using the Firecrawl scrape API.
 * POST https://api.firecrawl.dev/v1/scrape
 *
 * Free tier: 500 fetches/month, no credit card required.
 * Docs: https://docs.firecrawl.dev/api-reference/endpoint/scrape
 *
 * Self-hosted: set FIRECRAWL_BASE_URL to point at a self-hosted Firecrawl
 * instance (e.g. http://127.0.0.1:3002). The API key is only required against
 * the default cloud base URL — self-hosted instances typically run with no
 * auth in front of them, so credentials.apiKey becomes optional in that case.
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const FIRECRAWL_DEFAULT_BASE_URL = "https://api.firecrawl.dev";
const FIRECRAWL_DEFAULT_TIMEOUT_MS = 30_000;

/** Resolve the configured Firecrawl base URL, falling back to the public cloud API. */
function getFirecrawlBaseUrl(): string {
  const envBase = process.env.FIRECRAWL_BASE_URL?.trim();
  return envBase ? envBase.replace(/\/+$/, "") : FIRECRAWL_DEFAULT_BASE_URL;
}

/** Whether the given base URL is the default Firecrawl cloud endpoint. */
function isDefaultFirecrawlBaseUrl(baseUrl: string): boolean {
  return baseUrl === FIRECRAWL_DEFAULT_BASE_URL;
}

/** Resolve the configured request timeout, falling back to a sane default. */
function getFirecrawlTimeoutMs(): number {
  const raw = process.env.FIRECRAWL_TIMEOUT_MS;
  if (!raw) return FIRECRAWL_DEFAULT_TIMEOUT_MS;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : FIRECRAWL_DEFAULT_TIMEOUT_MS;
}

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

  const baseUrl = getFirecrawlBaseUrl();
  const isDefaultBaseUrl = isDefaultFirecrawlBaseUrl(baseUrl);

  // The API key is mandatory for the public Firecrawl cloud API, but optional
  // once a custom (self-hosted) base URL is configured.
  if (isDefaultBaseUrl && !credentials.apiKey) {
    const body = buildErrorBody(401, "Firecrawl API key required");
    return { success: false, status: 401, error: body.error.message };
  }

  const formats = [mapFormat(format)];

  const requestBody: Record<string, unknown> = {
    url,
    formats,
  };

  // NOTE: Firecrawl returns metadata (title, description, og:title, etc.)
  // automatically in response.data.metadata — no special request params needed.
  // Sending the `includeTags` parameter with non-CSS-selector values like
  // "og:title" or "description" causes Firecrawl's parser to crash (HTTP 500).
  // The `includeMetadata` flag only controls whether we surface metadata
  // in our response (see response parsing below).

  if (depth > 0) {
    requestBody.maxDepth = depth;
  }

  if (waitForSelector) {
    requestBody.waitFor = waitForSelector;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), getFirecrawlTimeoutMs());

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (credentials.apiKey) {
      headers.Authorization = `Bearer ${credentials.apiKey}`;
    }

    const response = await fetch(`${baseUrl}/v1/scrape`, {
      method: "POST",
      headers,
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
