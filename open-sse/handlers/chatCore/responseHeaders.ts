import {
  attachOmniRouteMetaHeaders,
  buildOmniRouteResponseMetaHeaders,
} from "@/domain/omnirouteResponseMeta";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { defaultLogger } from "@omniroute/open-sse/utils/logger";

const STREAMING_RESPONSE_HEADER_DENYLIST = new Set([
  "content-type",
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "cache-control",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "upgrade",
  "authorization",
  "authentication-info",
  "cookie",
  "set-cookie",
  "set-cookie2",
  "www-authenticate",
  "x-api-key",
  "x-amz-security-token",
  "x-auth-token",
  "x-accel-buffering",
]);

/**
 * Keep upstream-derived headers comfortably below common reverse-proxy response-header limits.
 * This budget includes each header name, separator, value, and trailing CRLF. OmniRoute's own
 * response metadata and framework/security headers are added separately.
 */
export const MAX_FORWARDED_UPSTREAM_RESPONSE_HEADER_BYTES = 768;
const MAX_LOGGED_DROPPED_RESPONSE_HEADERS = 20;
const responseHeaderEncoder = new TextEncoder();

type ResponseHeaderLogger = {
  warn?: (tag: string, message: string, data?: Record<string, unknown>) => void;
} | null;

function responseHeaderWireBytes(name: string, value: string): number {
  return responseHeaderEncoder.encode(`${name}: ${value}\r\n`).byteLength;
}

function isOmniRouteInternalHeader(headerName: string): boolean {
  return headerName.toLowerCase().startsWith("x-omniroute-");
}

function getForwardingPriority(headerName: string): number {
  const normalized = headerName.toLowerCase();
  if (
    normalized === "x-request-id" ||
    normalized === "request-id" ||
    normalized === "x-correlation-id" ||
    normalized === "traceparent" ||
    normalized === "traceresponse"
  ) {
    return 0;
  }
  if (normalized === "retry-after") return 1;
  if (normalized.includes("ratelimit") || normalized.includes("rate-limit")) return 2;
  return 3;
}

/**
 * Prefix of Next.js internal middleware control headers.
 *
 * When an upstream provider is itself hosted behind a Next.js middleware
 * (e.g. synthetic.new), a perfectly successful `200 OK` response can still
 * carry Next's own control headers such as `x-middleware-rewrite`,
 * `x-middleware-next`, `x-middleware-override-headers`,
 * `x-middleware-set-cookie`, and the `x-middleware-request-*` family.
 *
 * If OmniRoute re-emits those headers from an App Router route handler, Next
 * 16's `app-route` runtime
 * interprets `x-middleware-rewrite` as a `NextResponse.rewrite()` call and
 * throws `NextResponse.rewrite() was used in a app route handler` — turning a
 * successful upstream call into a 500. This is provider-agnostic proxy
 * hygiene: any upstream behind Next middleware can leak these headers.
 *
 * See issue #5849.
 */
const NEXTJS_MIDDLEWARE_HEADER_PREFIX = "x-middleware-";

/**
 * True when `headerName` is a Next.js internal middleware control header that
 * must never be forwarded from a proxied upstream response.
 */
export function isNextMiddlewareControlHeader(headerName: string): boolean {
  return headerName.toLowerCase().startsWith(NEXTJS_MIDDLEWARE_HEADER_PREFIX);
}

/**
 * Strip the whole `x-middleware-*` family (see {@link isNextMiddlewareControlHeader})
 * from a `Headers` instance. Used on the non-streaming JSON path alongside
 * {@link stripStaleForwardingHeaders}.
 */
export function stripNextMiddlewareControlHeaders(headers: Headers): void {
  const toDelete: string[] = [];
  headers.forEach((_value, key) => {
    if (isNextMiddlewareControlHeader(key)) {
      toDelete.push(key);
    }
  });
  for (const key of toDelete) {
    headers.delete(key);
  }
}

export function buildStreamingResponseHeaders(
  providerHeaders: Headers,
  meta: Parameters<typeof buildOmniRouteResponseMetaHeaders>[0],
  log: ResponseHeaderLogger = defaultLogger
): Record<string, string> {
  const connectionScopedHeaders = new Set(
    (providerHeaders.get("connection") || "")
      .split(",")
      .map((name) => name.trim().toLowerCase())
      .filter(Boolean)
  );
  const candidates: Array<{
    key: string;
    value: string;
    bytes: number;
    priority: number;
    position: number;
  }> = [];
  let position = 0;

  providerHeaders.forEach((value, key) => {
    const normalized = key.toLowerCase();
    if (
      STREAMING_RESPONSE_HEADER_DENYLIST.has(normalized) ||
      connectionScopedHeaders.has(normalized) ||
      isNextMiddlewareControlHeader(normalized) ||
      isOmniRouteInternalHeader(normalized)
    ) {
      return;
    }
    candidates.push({
      key,
      value,
      bytes: responseHeaderWireBytes(key, value),
      priority: getForwardingPriority(key),
      position: position++,
    });
  });

  candidates.sort((a, b) => a.priority - b.priority || a.position - b.position);

  const forwardedHeaders: [string, string][] = [];
  const droppedHeaders: Array<{ name: string; bytes: number }> = [];
  let forwardedBytes = 0;

  for (const candidate of candidates) {
    if (forwardedBytes + candidate.bytes <= MAX_FORWARDED_UPSTREAM_RESPONSE_HEADER_BYTES) {
      forwardedHeaders.push([candidate.key, candidate.value]);
      forwardedBytes += candidate.bytes;
    } else {
      droppedHeaders.push({ name: candidate.key, bytes: candidate.bytes });
    }
  }

  if (droppedHeaders.length > 0) {
    log?.warn?.("HTTP", "Dropped upstream response headers that exceeded forwarding budget", {
      budgetBytes: MAX_FORWARDED_UPSTREAM_RESPONSE_HEADER_BYTES,
      forwardedBytes,
      droppedCount: droppedHeaders.length,
      droppedHeaders: droppedHeaders.slice(0, MAX_LOGGED_DROPPED_RESPONSE_HEADERS),
    });
  }

  const responseHeaders: Record<string, string> = {
    ...Object.fromEntries(forwardedHeaders),
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
    [OMNIROUTE_RESPONSE_HEADERS.cache]: "MISS",
  };
  attachOmniRouteMetaHeaders(responseHeaders, meta);
  return responseHeaders;
}

export function materializeDeduplicatedExecutionResult<T extends Record<string, unknown>>(
  result: T
): T {
  const snapshot =
    result && typeof result === "object"
      ? ((result as Record<string, unknown>)._dedupSnapshot as
          | {
              status: number;
              statusText: string;
              headers: [string, string][];
              payload: string;
            }
          | undefined)
      : undefined;

  if (!snapshot) return result;

  return {
    ...result,
    response: new Response(snapshot.payload, {
      status: snapshot.status,
      statusText: snapshot.statusText,
      headers: snapshot.headers,
    }),
  } as T;
}

/**
 * Strip hop-by-hop headers that describe the upstream wire encoding.
 *
 * `readNonStreamingResponseBody` reads (and, for compressed responses, also
 * decompresses via fetch's auto-decoder) the full upstream body into a JS
 * string before we re-emit it to the client. Once that happens, the original
 * `Content-Encoding`, `Content-Length`, and `Transfer-Encoding` all describe
 * a payload that no longer exists:
 *
 *   - `Content-Length` is the *compressed* byte count, so clients honoring it
 *     read only the first N bytes of the decompressed JSON and surface
 *     "Unterminated string in JSON at position …" parse failures (observed
 *     on gzipped Gemini responses).
 *   - `Content-Encoding` advertises a compression we have already undone.
 *   - `Transfer-Encoding` is hop-by-hop per RFC 7230 §6.1 and must not be
 *     forwarded across a buffering proxy — its presence alongside a
 *     re-emitted body is undefined behavior.
 *
 * Deleting all three lets the response framework set a fresh, correct
 * `Content-Length` (or fall back to `Transfer-Encoding: chunked`) for the
 * payload we are actually sending.
 */
export function stripStaleForwardingHeaders(headers: Headers): void {
  headers.delete("content-encoding");
  headers.delete("content-length");
  headers.delete("transfer-encoding");
}
