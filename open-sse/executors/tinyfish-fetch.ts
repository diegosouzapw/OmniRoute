/**
 * TinyFish Fetch Executor
 *
 * Fetches content from a URL using the TinyFish Fetch API.
 * POST https://api.fetch.tinyfish.ai
 *
 * "Fetch does not use credits" per TinyFish docs — no explicit pricing tier.
 * Docs: https://docs.tinyfish.ai/fetch-api
 *
 * Unlike Firecrawl, TinyFish has no "links" or "screenshot" output modes —
 * only markdown, html, and json. Requests for those formats fall back to
 * markdown and return an empty links array / null screenshot, mirroring how
 * jina-reader-fetch.ts and tavily-fetch.ts handle formats they don't support.
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const TINYFISH_FETCH_URL = "https://api.fetch.tinyfish.ai";
const TINYFISH_TIMEOUT_MS = 30_000;

function mapFormat(format: WebFetchFormat): "markdown" | "html" {
  return format === "html" ? "html" : "markdown";
}

interface TinyFishFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

interface TinyFishResultEntry {
  url?: string;
  final_url?: string;
  title?: string;
  description?: string;
  text?: string;
}

interface TinyFishErrorEntry {
  url?: string;
  message?: string;
  error?: string;
}

/**
 * Execute a TinyFish Fetch API request.
 */
export async function tinyfishFetch(opts: TinyFishFetchOptions): Promise<WebFetchResult> {
  const { url, format, includeMetadata, credentials } = opts;

  if (!credentials.apiKey) {
    const body = buildErrorBody(401, "TinyFish API key required");
    return { success: false, status: 401, error: body.error.message };
  }

  const requestBody = {
    urls: [url],
    format: mapFormat(format),
    ttl: 0,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TINYFISH_TIMEOUT_MS);

  try {
    const response = await fetch(TINYFISH_FETCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": credentials.apiKey,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (!response.ok) {
      const rawError = await response.text().catch(() => `HTTP ${response.status}`);
      const msg = sanitizeErrorMessage(`TinyFish error ${response.status}: ${rawError}`);
      const body = buildErrorBody(response.status, msg);
      return { success: false, status: response.status, error: body.error.message };
    }

    const data = (await response.json()) as {
      results?: TinyFishResultEntry[];
      errors?: TinyFishErrorEntry[];
    };

    const result = data.results?.[0];

    if (!result) {
      const errorEntry = data.errors?.[0];
      const msg = sanitizeErrorMessage(
        errorEntry?.message ?? errorEntry?.error ?? "TinyFish could not fetch the requested URL"
      );
      const body = buildErrorBody(502, msg);
      return { success: false, status: 502, error: body.error.message };
    }

    const metadata = includeMetadata
      ? {
          title: result.title != null ? String(result.title) : null,
          description: result.description != null ? String(result.description) : null,
        }
      : null;

    return {
      success: true,
      data: {
        provider: "tinyfish",
        url,
        content: String(result.text ?? ""),
        links: [],
        metadata,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      const body = buildErrorBody(504, "TinyFish request timed out");
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
