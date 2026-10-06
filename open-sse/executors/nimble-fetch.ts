/**
 * Nimble Web Fetch Executor
 *
 * Fetches content from a URL using the Nimble Extract API.
 * POST https://sdk.nimbleway.com/v1/extract
 *
 * Extract returns the requested formats side by side under `data`, so one call
 * covers every OmniRoute fetch format: `markdown`, `html`, `links` and
 * `screenshot` (base64 PNG, surfaced as a data URL).
 *
 * Docs: https://docs.nimbleway.com/nimble-sdk/web-tools/extract/quickstart
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import { NIMBLE_CLIENT_SOURCE, NIMBLE_CLIENT_SOURCE_HEADER } from "../config/nimble.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const NIMBLE_EXTRACT_URL = "https://sdk.nimbleway.com/v1/extract";
const NIMBLE_TIMEOUT_MS = 30_000;

/** Max characters kept from an HTML <title> / meta description. */
const META_MAX_CHARS = 500;

// These run over untrusted upstream HTML, so every quantifier is over a character
// class that cannot cross its own terminator — no backtracking (see AGENTS.md →
// "Regex Security"). Length is capped by META_MAX_CHARS after the match, not by the
// quantifier: bounding the capture instead would make an over-long title fail to
// match at all rather than truncate.
const TITLE_RE = /<title[^>]{0,200}>([^<]*)<\/title>/i;
// One pattern per quote style. A shared ["'] class for the closing delimiter would
// cut a double-quoted description at its first apostrophe ("Don't miss…" → "Don").
const META_DESCRIPTION_DOUBLE_RE =
  /<meta[^>]{0,200}name=["']description["'][^>]{0,200}content="([^"]*)"/i;
const META_DESCRIPTION_SINGLE_RE =
  /<meta[^>]{0,200}name=["']description["'][^>]{0,200}content='([^']*)'/i;

/** Map an OmniRoute fetch format onto the Nimble Extract format name. */
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

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return value != null ? String(value) : "";
}

/**
 * Pull a title / description out of raw HTML.
 * Extract has no dedicated metadata format, so metadata is only available when
 * the caller asked for it and we requested `html` alongside their format.
 */
function parseHtmlMetadata(html: string): { title: string | null; description: string | null } {
  if (!html) return { title: null, description: null };

  const title = TITLE_RE.exec(html)?.[1]?.trim().slice(0, META_MAX_CHARS);
  const rawDescription =
    META_DESCRIPTION_DOUBLE_RE.exec(html)?.[1] ?? META_DESCRIPTION_SINGLE_RE.exec(html)?.[1];
  const description = rawDescription?.trim().slice(0, META_MAX_CHARS);

  return {
    title: title ? title : null,
    description: description ? description : null,
  };
}

interface NimbleFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

/**
 * Execute a Nimble Extract request.
 */
export async function nimbleFetch(opts: NimbleFetchOptions): Promise<WebFetchResult> {
  const { url, format, includeMetadata, credentials } = opts;

  if (!credentials.apiKey) {
    const body = buildErrorBody(401, "Nimble API key required");
    return { success: false, status: 401, error: body.error.message };
  }

  const requested = mapFormat(format);

  // `links` always comes back so WebFetchResponse.links is populated; `html` is
  // added only when the caller asked for metadata, since it is the sole source
  // of a page title/description.
  const formats = [...new Set([requested, "links", ...(includeMetadata ? ["html"] : [])])];

  const requestBody: Record<string, unknown> = {
    url,
    formats,
    // Extract types `render` as `boolean | "auto"`; "auto" lets Nimble select the
    // driver per target domain rather than forcing a browser on every static page.
    render: "auto",
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    const err = new Error(`nimble-fetch timeout after ${NIMBLE_TIMEOUT_MS}ms`);
    err.name = "TimeoutError";
    controller.abort(err);
  }, NIMBLE_TIMEOUT_MS);

  try {
    const response = await fetch(NIMBLE_EXTRACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
        [NIMBLE_CLIENT_SOURCE_HEADER]: NIMBLE_CLIENT_SOURCE,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (!response.ok) {
      // Nimble returns a plain-text body on auth failures, so this must be
      // sanitized before it can reach a response.
      const rawError = await response.text().catch(() => `HTTP ${response.status}`);
      const msg = sanitizeErrorMessage(`Nimble error ${response.status}: ${rawError}`);
      const body = buildErrorBody(response.status, msg);
      return { success: false, status: response.status, error: body.error.message };
    }

    const payload = (await response.json()) as Record<string, unknown>;

    // A 200 can still carry a failed extraction — Extract reports the target's own
    // outcome in the envelope. Without this the caller would get an empty document
    // marked successful, and the pool in /v1/web/fetch would never fall through to
    // the next provider.
    const taskStatus = typeof payload.status === "string" ? payload.status : "";
    const taskStatusCode = typeof payload.status_code === "number" ? payload.status_code : null;
    if (
      (taskStatus && taskStatus !== "success") ||
      (taskStatusCode !== null && taskStatusCode >= 400)
    ) {
      const detail = taskStatus || `status ${taskStatusCode}`;
      const msg = sanitizeErrorMessage(`Nimble extraction did not succeed: ${detail}`);
      const body = buildErrorBody(502, msg);
      return { success: false, status: 502, error: body.error.message };
    }

    const data = (payload.data as Record<string, unknown> | null) ?? {};

    const rawLinks = data.links;
    const links: string[] = Array.isArray(rawLinks) ? rawLinks.map((l) => String(l)) : [];

    const screenshot = readString(data, "screenshot");
    const screenshotUrl =
      format === "screenshot" && screenshot
        ? screenshot.startsWith("data:")
          ? screenshot
          : `data:image/png;base64,${screenshot}`
        : null;

    // The requested format must actually be present. An absent key means Extract
    // succeeded but produced nothing for what the caller asked for; returning an
    // empty document as a success would stop /v1/web/fetch from trying the next
    // provider. An empty *value* is legitimate (a genuinely blank page) and passes.
    if (!(requested in data)) {
      const msg = sanitizeErrorMessage(`Nimble returned no ${requested} content for the request`);
      const body = buildErrorBody(502, msg);
      return { success: false, status: 502, error: body.error.message };
    }

    let content: string;
    switch (format) {
      case "html":
        content = readString(data, "html");
        break;
      case "links":
        content = JSON.stringify(links);
        break;
      case "screenshot":
        content = "";
        break;
      case "markdown":
      default:
        content = readString(data, "markdown");
        break;
    }

    const metadata = includeMetadata ? parseHtmlMetadata(readString(data, "html")) : null;

    return {
      success: true,
      data: {
        provider: "nimble-search",
        url,
        content,
        links,
        metadata,
        screenshot_url: screenshotUrl,
      },
    };
  } catch (err: unknown) {
    // The abort reason above is named "TimeoutError"; an external abort surfaces as
    // "AbortError". Both must reach the 504 branch.
    if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
      const body = buildErrorBody(504, "Nimble request timed out");
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
