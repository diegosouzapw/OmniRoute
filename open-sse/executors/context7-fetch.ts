/**
 * Context7 Docs Fetch Executor
 *
 * Fetches library documentation from the Context7 API.
 * GET https://context7.com/api/v1/{libraryId}?type=llms.txt[&topic=<t>][&tokens=<n>]
 *
 * The input `url` is interpreted as a Context7 library reference, not a generic
 * web URL. Accepted forms:
 *   https://context7.com/reactjs/react.dev[?topic=hooks&tokens=2000]
 *   context7.com/reactjs/react.dev
 *   /reactjs/react.dev
 *   reactjs/react.dev
 *
 * `topic` / `tokens` query parameters are forwarded to the upstream docs call.
 *
 * Key optional: the anonymous tier serves requests without a key (per-minute
 * rate limit); a configured ctx7sk-* key rides as a Bearer token and raises the
 * quota.
 * Docs: https://context7.com/docs
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
// Type-only import (erased at runtime): webFetch.ts imports context7Fetch
// back from here, so a VALUE import would create a runtime cycle. Keep this
// `import type` — adding a runtime import from webFetch.ts here reintroduces
// the cycle.
import type { WebFetchResult, WebFetchCredentials } from "../handlers/webFetch.ts";

const CONTEXT7_API_BASE = "https://context7.com/api/v1";
// Docs fetch timeout matches the search registry entry (timeoutMs: 10_000) so the
// two faces of the provider agree on how long an upstream call may take.
const CONTEXT7_TIMEOUT_MS = 10_000;
// Upstream docs bodies are bounded defensively: a misbehaving/malicious upstream
// (the URL is operator-controlled via credentials.baseUrl) must not OOM the process.
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const DEFAULT_TOKENS = 5000;
const MAX_TOKENS = 20000;

/**
 * Canonical Context7 library-id shape: exactly "/owner/repo", each segment
 * starting with an alphanumeric char, path-safe chars only. Dot-runs (".."
 * traversal) are rejected by the explicit includes check after the shape
 * test. Shared by the fetch executor and the search normalizer so the two
 * faces of the provider never drift apart.
 */
export function isValidContext7LibraryId(id: string): id is string {
  if (typeof id !== "string") return false;
  // Each segment: starts with alphanumeric (GitHub owner/repo convention —
  // no leading '-'), path-safe chars, no trailing dot, no dot-run.
  const seg = /^[A-Za-z0-9][\w-]*(?:\.[\w-]+)*$/; // starts alnum, dots only interior, no dot-run
  const m = /^\/(.+)\/(.+)$/.exec(id);
  return m !== null && seg.test(m[1]) && seg.test(m[2]);
}

interface Context7FetchOptions {
  url: string;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

/**
 * Extract a Context7 library id ("/owner/repo") plus optional topic/tokens from
 * the accepted input forms. Returns null when the input is not a Context7
 * library reference — this provider must never attempt a generic web URL.
 */
export function parseContext7LibraryUrl(
  input: string
): { libraryId: string; topic?: string; tokens?: number } | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  let pathAndQuery = trimmed;
  const hostMatch = trimmed.match(/^(?:https?:\/\/)?(?:www\.)?context7\.com(\/.*)?$/i);
  if (hostMatch) {
    pathAndQuery = hostMatch[1] ?? "";
  } else if (/^https?:\/\//i.test(trimmed)) {
    // A full URL on any other host is not a Context7 library reference.
    return null;
  } else if (!pathAndQuery.startsWith("/")) {
    pathAndQuery = `/${pathAndQuery}`;
  }

  const qIndex = pathAndQuery.indexOf("?");
  const path = qIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, qIndex);
  const query = qIndex === -1 ? "" : pathAndQuery.slice(qIndex + 1);

  // Library ids are exactly "/owner/repo" (one or more path-safe segments per
  // part, two parts). Reject anything else (e.g. "/api/v1/..." or bare hosts).
  // The trailing slash is NOT captured — libraryId must match the exact
  // "/owner/repo" shape the search normalizer also produces.
  const libMatch = path.match(/^\/([\w.-]+)\/([\w.-]+)\/?$/);
  if (!libMatch) return null;
  // Shared shape/traversal guard (see isValidContext7LibraryId). The regex
  // already excludes a trailing slash from the captured segments.
  if (!isValidContext7LibraryId(`/${libMatch[1]}/${libMatch[2]}`)) return null;
  const libraryId = `/${libMatch[1]}/${libMatch[2]}`;

  let topic: string | undefined;
  let tokens: number | undefined;
  if (query) {
    const qp = new URLSearchParams(query);
    const rawTopic = qp.get("topic");
    if (rawTopic) topic = rawTopic.slice(0, 200);
    const rawTokens = qp.get("tokens");
    if (rawTokens && /^\d+$/.test(rawTokens)) {
      tokens = Math.min(Math.max(parseInt(rawTokens, 10), 100), MAX_TOKENS);
    }
  }

  return { libraryId, ...(topic && { topic }), ...(tokens !== undefined && { tokens }) };
}

/**
 * Read a response body with a hard byte cap. Stops consuming the stream once the
 * cap is hit so a multi-hundred-MB response cannot exhaust memory.
 */
async function readBodyCapped(
  response: Response,
  maxBytes: number
): Promise<{ text: string; truncated: boolean }> {
  if (response.body) {
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    let truncated = false;
    for (;;) {
      let step: ReadableStreamReadResult<Uint8Array>;
      try {
        step = await reader.read();
      } catch {
        // Upstream dropped the connection mid-body: keep what was read so far
        // and flag it, rather than discarding valid partial content.
        truncated = true;
        break;
      }
      const { done, value } = step;
      if (done) break;
      if (total + value.byteLength > maxBytes) {
        chunks.push(value.subarray(0, Math.max(0, maxBytes - total)));
        total = maxBytes;
        truncated = true;
        await reader.cancel().catch(() => {});
        break;
      }
      chunks.push(value);
      total += value.byteLength;
    }
    const buf = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      buf.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { text: new TextDecoder().decode(buf), truncated };
  }
  // No streaming body (data: URLs, synthetic Responses): the whole payload is
  // already resident (fetch materialized it when the Response was built), so
  // this path cannot avoid buffering — it caps what is decoded, matching the
  // streaming path's prefix-preserving behaviour.
  const buf = new Uint8Array(await response.arrayBuffer());
  const truncated = buf.byteLength > maxBytes;
  const slice = truncated ? buf.subarray(0, maxBytes) : buf;
  return { text: new TextDecoder().decode(slice), truncated };
}

/**
 * Execute a Context7 docs fetch.
 */
export async function context7Fetch(opts: Context7FetchOptions): Promise<WebFetchResult> {
  const { url, includeMetadata, credentials } = opts;

  const parsed = parseContext7LibraryUrl(url);
  if (!parsed) {
    const body = buildErrorBody(
      400,
      "Context7 fetch expects a library reference such as " +
        '"https://context7.com/reactjs/react.dev" or "/reactjs/react.dev", ' +
        "optionally with ?topic=<t>&tokens=<n>"
    );
    return { success: false, status: 400, error: body.error.message };
  }

  const qp = new URLSearchParams({ type: "llms.txt" });
  if (parsed.topic) qp.set("topic", parsed.topic);
  qp.set("tokens", String(parsed.tokens ?? DEFAULT_TOKENS));

  // credentials.baseUrl overrides the whole API base (including the /api/v1
  // suffix) so an operator can point at a mirror or a self-hosted relay.
  // Only well-formed http(s) origins are accepted — the host must start with
  // an alphanumeric (rejects '.hidden'/-bad hosts), the path must not carry a
  // traversal segment ("../"), no query/fragment — anything else falls back
  // to the public base rather than being interpolated. baseUrl is operator
  // configuration (same trust level as every other provider's baseUrl), not
  // attacker-controlled input; the guards are hygiene, not an SSRF boundary.
  const rawBase = (credentials.baseUrl ?? "").trim().replace(/\/+$/, "");
  // Host: no dot-runs ("foo..bar.com"), port in 1-5 digits, path path-safe.
  const apiBase =
    /^https?:\/\/[\w][\w-]*(\.[\w][\w-]*)*(:\d{1,5})?(\/[\w./-]*)?$/.test(rawBase) &&
    !rawBase.includes("../")
      ? rawBase
      : CONTEXT7_API_BASE;
  // Compose as a checked string: apiBase passed the origin regex and
  // libraryId passed isValidContext7LibraryId, so both fragments are
  // validated shapes. (new URL() cannot be used here — libraryId is an
  // absolute path, which would drop the base's own path prefix.)
  const requestUrl = `${apiBase}${parsed.libraryId}?${qp}`;

  const headers: Record<string, string> = { Accept: "text/plain" };
  if (credentials.apiKey) {
    headers.Authorization = `Bearer ${credentials.apiKey}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONTEXT7_TIMEOUT_MS);

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      // Error bodies are capped too — a hostile mirror could answer a failure
      // with a multi-hundred-MB body aimed at the error path.
      const { text: rawError } = await readBodyCapped(response, MAX_BODY_BYTES).catch(() => ({
        text: `HTTP ${response.status}`,
      }));
      const msg = sanitizeErrorMessage(
        `Context7 error ${response.status}: ${rawError.slice(0, 500)}`
      );
      const body = buildErrorBody(response.status, msg);
      return { success: false, status: response.status, error: body.error.message };
    }

    const { text: content, truncated } = await readBodyCapped(response, MAX_BODY_BYTES);

    return {
      success: true,
      data: {
        provider: "context7",
        // Canonical form: the caller's input may be a bare "/owner/repo" or
        // a full URL; downstream consumers get the normalized context7.com
        // URL (consistent with the search normalizer).
        url: `https://context7.com${parsed.libraryId}`,
        content,
        links: [],
        metadata: includeMetadata
          ? {
              title: `Context7 docs: ${parsed.libraryId}`,
              description: null,
              ...(truncated ? { truncated: true } : {}),
            }
          : null,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      const body = buildErrorBody(504, "Context7 request timed out");
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
