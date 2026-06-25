/**
 * src/lib/observability/proxySpan.ts
 *
 * Helpers for tracing the proxy hop — the place where a request leaves
 * OmniRoute and hits an upstream provider. Proxy spans are special:
 *  - they MUST propagate a W3C `traceparent` to the upstream so the
 *    provider-side trace joins ours;
 *  - they MUST accept an incoming `traceparent` from the client so we
 *    join the client's trace;
 *  - they MUST be marked on the response so internal tooling can detect
 *    that a given request is "proxy-traced".
 *
 * `propagateTraceParent(headers)` returns headers-with-traceparent; the
 * caller spreads it into their fetch init. `isProxySpanResult(...)` is
 * the type-guard the management routes use to validate inbound metadata
 * from upstream proxies.
 */

import {
  formatTraceParent,
  parseTraceParent,
  isValidSpanContext,
  randomHexId,
} from "./spanTypes";
import type { SpanContext } from "./spanTypes";
import { currentSpanContext, injectTraceParent, startSpan } from "./otel";
import type { Span } from "./otel";

/** Marker value used by OmniRoute-internal proxies to opt in to trace propagation. */
export const PROXY_TRACE_HEADER = "x-omniroute-proxy-traced";

/**
 * Build a header bag including the W3C `traceparent` for the active span.
 * If no span is active a fresh root context is generated (so callers can
 * always spread the result without branching).
 */
export function propagateTraceParent(
  headers: Record<string, string> = {}
): Record<string, string> {
  let traceparent = injectTraceParent();
  if (!traceparent) {
    // No active span → create a synthetic one for the outbound hop.
    const ctx: SpanContext = {
      traceId: randomHexId(16),
      spanId: randomHexId(8),
      traceFlags: 1,
    };
    traceparent = formatTraceParent(ctx) ?? "";
  }
  return {
    ...headers,
    traceparent,
    [PROXY_TRACE_HEADER]: "1",
  };
}

/**
 * Begin a proxy span from an inbound request's headers. If the inbound
 * `traceparent` is valid, the new span joins that trace (server span).
 * Returns the new span so the caller can close it explicitly.
 */
export function withProxySpan(
  inboundHeaders: Headers | Record<string, string>,
  options: { name?: string; attributes?: Record<string, string | number | boolean> } = {}
): Span {
  const headerValue = readHeader(inboundHeaders, "traceparent");
  const parsed = parseTraceParent(headerValue);
  const parent = parsed && isValidSpanContext(parsed) ? parsed : undefined;
  const span = startSpan(options.name ?? "proxy.server", {
    kind: "server",
    parent,
    attributes: options.attributes,
  });
  span.attributes["proxy.traced"] = true;
  return span;
}

/** Type guard for objects that look like proxy-span metadata. */
export interface ProxySpanResult {
  traceId: string;
  spanId: string;
  traced: boolean;
}

export function isProxySpanResult(value: unknown): value is ProxySpanResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.traceId === "string" &&
    /^[0-9a-f]{32}$/.test(v.traceId) &&
    typeof v.spanId === "string" &&
    /^[0-9a-f]{16}$/.test(v.spanId) &&
    typeof v.traced === "boolean"
  );
}

/** Get the proxy span result for the active span, or undefined. */
export function currentProxySpanResult(): ProxySpanResult | undefined {
  const ctx = currentSpanContext();
  if (!ctx) return undefined;
  return { traceId: ctx.traceId, spanId: ctx.spanId, traced: true };
}

function readHeader(
  h: Headers | Record<string, string> | undefined,
  name: string
): string | undefined {
  if (!h) return undefined;
  if (typeof (h as Headers).get === "function") return (h as Headers).get(name) ?? undefined;
  const lc = name.toLowerCase();
  for (const k of Object.keys(h as Record<string, string>)) {
    if (k.toLowerCase() === lc) return (h as Record<string, string>)[k];
  }
  return undefined;
}