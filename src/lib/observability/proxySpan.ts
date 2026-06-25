/**
 * proxySpan.ts — Glue layer for proxy.ts.
 *
 * Provides `withProxySpan(name, fn)` — a thin wrapper around
 * `withSpan(startSpan(name), fn)` that:
 *  - opens a span before calling `fn`
 *  - sets HTTP method/path/status attributes when a Request/Response is in scope
 *  - ends the span after `fn` returns (or rethrows), capturing errors as
 *    span events with `exception.type` / `exception.message`
 *
 * Default-OFF: this module only calls into the tracer; if `initTelemetry()`
 * has not been called, `startSpan()` returns a valid-but-noop span, so callers
 * incur near-zero overhead.
 */

import type { NextRequest } from "next/server";

import { getTracer, withSpan } from "./otel";
import type { Span } from "./spanTypes";

/** Context extracted from the inbound NextRequest (best-effort). */
export interface ProxyRequestContext {
  method: string;
  path: string;
  userAgent?: string;
  traceparent?: string;
}

/** Read proxy context fields from a NextRequest without throwing. */
export function extractRequestContext(request: NextRequest | Request): ProxyRequestContext {
  const ctx: ProxyRequestContext = {
    method: typeof request?.method === "string" ? request.method.toUpperCase() : "UNKNOWN",
    path: "",
  };

  try {
    const url = new URL(request.url);
    ctx.path = url.pathname || "/";
  } catch {
    ctx.path = "/";
  }

  try {
    const ua = request.headers.get?.("user-agent");
    if (ua) ctx.userAgent = ua;
    const tp = request.headers.get?.("traceparent");
    if (tp) ctx.traceparent = tp;
  } catch {
    // ignore — non-fatal
  }

  return ctx;
}

/**
 * Run `fn` inside an active span context. The span is closed after `fn`
 * returns or throws. Throws re-thrown to the caller; the span is still ended.
 */
export async function withProxySpan<T>(
  name: string,
  request: NextRequest | Request | null | undefined,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  const ctx = request ? extractRequestContext(request) : { method: "INTERNAL", path: name };
  const span = getTracer().startSpan(name, {
    "http.method": ctx.method,
    "http.target": ctx.path,
    ...(ctx.userAgent ? { "http.user_agent": ctx.userAgent } : {}),
  });

  return withSpan(span, async () => {
    try {
      const result = await fn(span);
      span.setAttribute("http.status_code", 200);
      span.setStatus("OK");
      return result;
    } catch (err) {
      span.setAttribute("http.status_code", 500);
      span.setStatus("ERROR", err instanceof Error ? err.message : String(err));
      span.addEvent("exception", {
        "exception.type": err instanceof Error ? err.name : "Error",
        "exception.message": err instanceof Error ? err.message : String(err),
      });
      throw err;
    } finally {
      span.end();
    }
  });
}

/**
 * Synchronous variant for non-async handlers. Used by Next.js route handlers
 * that don't return Promises.
 */
export function withProxySpanSync<T>(
  name: string,
  request: NextRequest | Request | null | undefined,
  fn: (span: Span) => T
): T {
  const ctx = request ? extractRequestContext(request) : { method: "INTERNAL", path: name };
  const span = getTracer().startSpan(name, {
    "http.method": ctx.method,
    "http.target": ctx.path,
    ...(ctx.userAgent ? { "http.user_agent": ctx.userAgent } : {}),
  });

  return withSpan(span, () => {
    try {
      const result = fn(span);
      span.setAttribute("http.status_code", 200);
      span.setStatus("OK");
      return result;
    } catch (err) {
      span.setAttribute("http.status_code", 500);
      span.setStatus("ERROR", err instanceof Error ? err.message : String(err));
      span.addEvent("exception", {
        "exception.type": err instanceof Error ? err.name : "Error",
        "exception.message": err instanceof Error ? err.message : String(err),
      });
      throw err;
    } finally {
      span.end();
    }
  });
}