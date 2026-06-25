/**
 * src/lib/observability/spanTypes.ts
 *
 * Lightweight type definitions for the observability stack. These types are
 * intentionally minimal — they describe the W3C Trace Context shape and the
 * subset of OTel semantics that OmniRoute actually exercises. We don't
 * depend on @opentelemetry/* packages; this module is dependency-free so
 * it can be imported from any context (Edge, Node, browser bundle).
 *
 * Why types here, not in otel.ts?
 *  - Keeps the type-level surface easy to import in isolation (no transitive
 *    runtime cost for callers that only need types).
 *  - Tests can import the types directly without booting the tracer.
 *
 * @see src/lib/observability/otel.ts for the runtime implementations.
 */

export type SpanKind =
  | "internal"
  | "server"
  | "client"
  | "producer"
  | "consumer";

export interface SpanContext {
  traceId: string;
  spanId: string;
  /** W3C `tracestate` header — opaque vendor payload, lowercase-hex plus commas. */
  traceFlags?: number;
  traceState?: string;
  /** True when the context was created from an incoming header (vs. locally). */
  remote?: boolean;
}

export interface SpanEvent {
  name: string;
  /** Unix epoch milliseconds. */
  time: number;
  attributes?: Record<string, string | number | boolean | null>;
}

export interface SpanLink {
  context: SpanContext;
  attributes?: Record<string, string | number | boolean | null>;
}

export interface SpanAttributes {
  [key: string]: string | number | boolean | null | undefined;
}

export interface Span {
  name: string;
  context: SpanContext;
  parentSpanId?: string;
  kind: SpanKind;
  startTime: number;
  endTime?: number;
  attributes: SpanAttributes;
  events: SpanEvent[];
  links: SpanLink[];
  status: SpanStatus;
  /** Set when an exception is recorded — the message is the exception's `.message`. */
  exceptionMessage?: string;
}

export type SpanStatusCode = "unset" | "ok" | "error";

export interface SpanStatus {
  code: SpanStatusCode;
  message?: string;
}

export const SPAN_STATUS_UNSET: SpanStatus = { code: "unset" };
export const SPAN_STATUS_OK: SpanStatus = { code: "ok" };
export const SPAN_STATUS_ERROR: SpanStatus = { code: "error" };

/**
 * Generate a random 16-byte trace/span id encoded as 32 lowercase hex chars.
 * Uses WebCrypto via globalThis.crypto so it works in Node + Edge runtimes.
 *
 * @param byteLength number of random bytes — 16 for traceId/spanId.
 * @returns 32-char (or `2*byteLength`-char) lowercase hex string.
 */
export function randomHexId(byteLength = 16): string {
  const bytes = new Uint8Array(byteLength);
  globalThis.crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

/**
 * Build the W3C `traceparent` header for a given span context. Format:
 *   `00-<traceId 32 hex>-<spanId 16 hex>-<flags 2 hex>`
 * The flags byte follows the spec: bit 0 = sampled. We always sample when
 * telemetry is enabled.
 *
 * @param ctx the span context to encode.
 * @returns the header string, or undefined if the traceId is not 32 hex chars
 *          (defensive — the OTel SDK drops invalid contexts silently too).
 */
export function formatTraceParent(ctx: SpanContext): string | undefined {
  if (!/^[0-9a-f]{32}$/.test(ctx.traceId)) return undefined;
  if (!/^[0-9a-f]{16}$/.test(ctx.spanId)) return undefined;
  const flags = (ctx.traceFlags ?? 1).toString(16).padStart(2, "0");
  return `00-${ctx.traceId}-${ctx.spanId}-${flags}`;
}

/**
 * Parse a W3C `traceparent` header into a SpanContext. Returns undefined for
 * malformed input — callers should fall back to creating a fresh context.
 *
 * @param header the raw header value (may include surrounding whitespace).
 */
export function parseTraceParent(header: string | null | undefined): SpanContext | undefined {
  if (!header) return undefined;
  const parts = header.trim().split("-");
  if (parts.length !== 4) return undefined;
  const [version, traceId, spanId, flagsRaw] = parts;
  if (version !== "00") return undefined; // we only support version 00
  if (!/^[0-9a-f]{32}$/.test(traceId)) return undefined;
  if (!/^[0-9a-f]{16}$/.test(spanId)) return undefined;
  const flags = Number.parseInt(flagsRaw, 16);
  if (!Number.isFinite(flags)) return undefined;
  return { traceId, spanId, traceFlags: flags, remote: true };
}

/** Returns true when ctx.traceId / ctx.spanId satisfy W3C length requirements. */
export function isValidSpanContext(ctx: Partial<SpanContext> | null | undefined): ctx is SpanContext {
  if (!ctx) return false;
  return (
    typeof ctx.traceId === "string" &&
    /^[0-9a-f]{32}$/.test(ctx.traceId) &&
    typeof ctx.spanId === "string" &&
    /^[0-9a-f]{16}$/.test(ctx.spanId)
  );
}