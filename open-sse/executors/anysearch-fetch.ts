/**
 * AnySearch Web Fetch Executor
 *
 * Fetches readable content from a URL using the AnySearch Extract API.
 * POST https://api.anysearch.com/v1/extract
 *
 * Free tier: 1000 requests/day per key, shared with /v1/search. Bearer auth
 * is optional upstream - keyless calls use the lower anonymous tier. Routing
 * stays key-gated; anonymity only applies at call time.
 * Docs: https://anysearch.com/docs
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const ANYSEARCH_EXTRACT_URL = "https://api.anysearch.com/v1/extract";
const ANYSEARCH_TIMEOUT_MS = 30_000;

interface AnysearchFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

/**
 * Execute an AnySearch extract request.
 * The upstream contract is strict JSON: a single { url } object with no
 * unknown fields, capped at 16 KiB - do not add request fields here.
 */
export async function anysearchFetch(opts: AnysearchFetchOptions): Promise<WebFetchResult> {
  // format is accepted but unused: AnySearch extract always returns markdown-ish text
  // (mirroring the context7 pattern of accepting the field without rejecting).
  const { url, includeMetadata, credentials } = opts;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    const err = new Error(`anysearch-fetch timeout after ${ANYSEARCH_TIMEOUT_MS}ms`);
    err.name = "TimeoutError";
    controller.abort(err);
  }, ANYSEARCH_TIMEOUT_MS);

  try {
    const response = await fetch(ANYSEARCH_EXTRACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(credentials.apiKey ? { Authorization: `Bearer ${credentials.apiKey}` } : {}),
      },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const rawError = await response.text().catch(() => `HTTP ${response.status}`);
      const msg = sanitizeErrorMessage(`AnySearch error ${response.status}: ${rawError}`);
      const body = buildErrorBody(response.status, msg);
      return { success: false, status: response.status, error: body.error.message };
    }

    const data = (await response.json()) as Record<string, unknown>;

    // Envelope: { code, message, data: { url, title, content } } - tolerate the
    // enveloped and flat shapes before giving up.
    const envelope =
      data.data && typeof data.data === "object" && !Array.isArray(data.data)
        ? (data.data as Record<string, unknown>)
        : data;
    const code = typeof data.code === "number" ? data.code : 0;
    if (code !== 0) {
      const errorMsg = String(data.error_code ?? data.message ?? code);
      // Quota-shaped envelope errors map to 402 (failover-eligible), mirroring
      // the search-side AnysearchSearchEnvelopeError → 402 pattern in anysearchSearch.ts.
      const isQuota = /quota|exceed|limit|balance|credit|exhaust/i.test(errorMsg);
      const status = isQuota ? 402 : 422;
      const msg = sanitizeErrorMessage(`AnySearch extract failed: ${errorMsg}`);
      const body = buildErrorBody(status, msg);
      return { success: false, status, error: body.error.message };
    }

    const content = String(envelope.content ?? "");
    const title = envelope.title != null ? String(envelope.title) : null;

    const metadata = includeMetadata ? { title, description: null } : null;

    return {
      success: true,
      data: {
        provider: "anysearch-search",
        url,
        content,
        links: [],
        metadata,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      const body = buildErrorBody(504, "AnySearch request timed out");
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
