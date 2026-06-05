/**
 * Tavily Web Fetch Executor
 *
 * Fetches content from a URL using the Tavily Extract API.
 * POST https://api.tavily.com/extract
 *
 * Free tier: included in Tavily plan.
 * Docs: https://docs.tavily.com/documentation/api-reference/endpoint/post-extract
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const TAVILY_EXTRACT_URL = "https://api.tavily.com/extract";
const TAVILY_TIMEOUT_MS = 30_000;

interface TavilyFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

/**
 * Execute a Tavily extract request.
 * Tavily Extract returns the raw content of a given URL.
 */
export async function tavilyFetch(opts: TavilyFetchOptions): Promise<WebFetchResult> {
  const { url, includeMetadata, credentials } = opts;

  if (!credentials.apiKey) {
    const body = buildErrorBody(401, "Tavily API key required");
    return { success: false, status: 401, error: body.error.message };
  }

  const requestBody: Record<string, unknown> = {
    api_key: credentials.apiKey,
    urls: [url],
    extract_depth: "basic",
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TAVILY_TIMEOUT_MS);

  try {
    const response = await fetch(TAVILY_EXTRACT_URL, {
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
      const msg = sanitizeErrorMessage(`Tavily error ${response.status}: ${rawError}`);
      const body = buildErrorBody(response.status, msg);
      return { success: false, status: response.status, error: body.error.message };
    }

    const data = (await response.json()) as Record<string, unknown>;

    const results = data.results as Array<Record<string, unknown>> | null;
    const firstResult = results?.[0] ?? {};

    const content = String(firstResult.raw_content ?? firstResult.content ?? "");

    const rawLinks = firstResult.links;
    const links: string[] = Array.isArray(rawLinks) ? rawLinks.map((l) => String(l)) : [];

    const metadata = includeMetadata
      ? {
          title: firstResult.title != null ? String(firstResult.title) : null,
          description: null,
        }
      : null;

    return {
      success: true,
      data: {
        provider: "tavily-search",
        url,
        content,
        links,
        metadata,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      const body = buildErrorBody(504, "Tavily request timed out");
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
