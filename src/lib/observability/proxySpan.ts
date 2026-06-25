/**
 * proxySpan.ts — Next.js proxy.ts (Next 16 middleware) wrapper for OTel.
 *
 * Wraps an OmniRoute proxy handler in a SERVER span + records
 * http_requests_total / http_request_duration_seconds. Also propagates
 * the W3C traceparent header so downstream spans can be linked to
 * the incoming request.
 */

import {
  withSpan,
  recordException,
  type AttributeValue,
} from "./otel";
import { httpMetricsMiddleware } from "./metrics";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface ProxySpanRequestLike {
  method: string;
  url: string;
  headers: { get(name: string): string | null };
}

export interface ProxySpanNextResult {
  status?: number;
  headers?: Headers;
}

/* ------------------------------------------------------------------ */
/* wrapProxy                                                          */
/* ------------------------------------------------------------------ */

/**
 * Wrap a Next.js proxy.ts handler. Pass the request + the proxied
 * response callback. Returns the proxied response (or whatever the
 * handler returns).
 */
export async function wrapProxy<T>(
  req: ProxySpanRequestLike,
  fn: () => Promise<T>,
): Promise<T> {
  const method = req.method.toUpperCase();
  const path = safePathname(req.url);
  const traceparent = req.headers.get("traceparent") ?? undefined;
  const started = Date.now();

  return await withSpan(
    `proxy ${method} ${path}`,
    async (span) => {
      try {
        const result = await fn();
        const durationMs = Date.now() - started;
        const status =
          isProxySpanResult(result) && typeof result.status === "number"
            ? result.status
            : 200;
        span.setAttribute("http.method", method as AttributeValue);
        span.setAttribute("http.target", path as AttributeValue);
        span.setAttribute("http.status_code", status as AttributeValue);
        if (traceparent) span.setAttribute("http.traceparent", traceparent as AttributeValue);
        span.status =
          status >= 500
            ? { code: "ERROR", message: `HTTP ${status}` }
            : { code: "OK" };
        httpMetricsMiddleware({
          method,
          route: path,
          status,
          durationSeconds: durationMs / 1000,
          durationMs,
        });
        return result;
      } catch (err) {
        const durationMs = Date.now() - started;
        span.setAttribute("http.method", method as AttributeValue);
        span.setAttribute("http.target", path as AttributeValue);
        span.setAttribute("http.error", true as AttributeValue);
        recordException(span, err as Error);
        httpMetricsMiddleware({
          method,
          route: path,
          status: 500,
          durationSeconds: durationMs / 1000,
          durationMs,
        });
        throw err;
      }
    },
    {
      kind: "SERVER",
      attributes: {
        "http.method": method as AttributeValue,
        "http.target": path as AttributeValue,
      },
    },
  );
}

/* ------------------------------------------------------------------ */
/* propagateTraceParent                                               */
/* ------------------------------------------------------------------ */

/**
 * Build the outgoing Headers for a downstream service. If a traceparent
 * is already active, return it; otherwise, generate a fresh one using
 * the current trace context. The returned object is suitable for spread
 * into a Headers init.
 *
 * Use this when calling fetch() from within a withSpan() block to keep
 * the trace continuous across service boundaries.
 */
export function propagateTraceParent(activeTraceparent?: string): Record<string, string> {
  if (activeTraceparent) return { traceparent: activeTraceparent };
  // TODO: when otel.ts exposes trace-context generation, build a new
  // W3C traceparent header here. For now, return empty.
  return {};
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function safePathname(raw: string): string {
  try {
    const u = new URL(raw, "http://localhost");
    return u.pathname;
  } catch {
    return raw.slice(0, 256);
  }
}

function isProxySpanResult(value: unknown): value is ProxySpanNextResult {
  return typeof value === "object" && value !== null;
}