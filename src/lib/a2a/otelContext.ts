/**
 * OpenTelemetry Trace Context Utility
 *
 * Provides W3C trace context (trace_id / span_id) for observability
 * observability instrumentation.
 *
 * Integration tiers (non-breaking):
 *   1. `@pheno-otel/tracing` – preferred; sibling Rust-to-JS bridge.
 *   2. `@opentelemetry/api` – standard OTel JS API.
 *   3. Synthetic W3C-compatible IDs via `node:crypto` – always works without
 *      any OTel dependency.
 *
 * Usage:
 *   import { getActiveSpanContext } from "./otelContext";
 *   const ctx = getActiveSpanContext();
 *   // → { traceId: "0af7651916cd43dd8448eb211c80319c", spanId: "b7ad6b7169203331" }
 *   // → null (only in non-Node.js runtimes where crypto is restricted)
 */

import { randomUUID } from "node:crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OtelSpanContext {
  /** W3C 16-byte trace id, hex-encoded (32 hex chars). */
  traceId: string;
  /** W3C 8-byte  span id, hex-encoded (16 hex chars). */
  spanId: string;
}

// ---------------------------------------------------------------------------
// Lazy OTel binding resolution (runs once at module load)
// ---------------------------------------------------------------------------

type OtelGetter = () => OtelSpanContext | null;

let _getter: OtelGetter | undefined;
let _initDone = false;

async function _resolveOtelBinding(): Promise<void> {
  // Tier 1 — @pheno-otel/tracing (sibling Rust-to-JS bridge)
  try {
    const mod = await import("@pheno-otel/tracing");
    if (typeof mod.getActiveSpanContext === "function") {
      _getter = () => {
        const ctx = mod.getActiveSpanContext();
        return ctx?.traceId && ctx?.spanId
          ? { traceId: ctx.traceId, spanId: ctx.spanId }
          : null;
      };
      return;
    }
  } catch {
    // package not installed — fall through
  }

  // Tier 2 — @opentelemetry/api (standard OTel JS API)
  try {
    const { trace } = await import("@opentelemetry/api");
    _getter = () => {
      const span = trace.getActiveSpan();
      if (!span) return null;
      const ctx = span.spanContext();
      return ctx?.traceId && ctx?.spanId
        ? { traceId: ctx.traceId, spanId: ctx.spanId }
        : null;
    };
    return;
  } catch {
    // package not installed — fall through
  }

  // Neither tier available — _getter stays undefined; synthetic fallback used.
}

// Fire-and-forget: resolve binding eagerly at module load so that by the time
// the first real request arrives, the OTel binding is usually available.
const _init = _resolveOtelBinding()
  .catch(() => {
    /* swallow — synthetic fallback handles it */
  })
  .finally(() => {
    _initDone = true;
  });

// ---------------------------------------------------------------------------
// Synthetic context generator
// ---------------------------------------------------------------------------

function _synthetic(): OtelSpanContext {
  // randomUUID → "550e8400-e29b-41d4-a716-446655440000" (32 hex + 4 dashes)
  const a = randomUUID().replace(/-/g, "");
  const b = randomUUID().replace(/-/g, "");
  return { traceId: a, spanId: b.slice(0, 16) };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Resolve the active W3C trace context.
 *
 * Returns a valid context in all Node.js runtimes:
 *   - real OTel span context when @pheno-otel/tracing or @opentelemetry/api
 *     is installed and an active span exists
 *   - synthetic W3C-compatible IDs otherwise
 *
 * Never throws. Returns `null` only in restricted runtimes where
 * `node:crypto` is unavailable (browser/edge without Web Crypto).
 */
export function getActiveSpanContext(): OtelSpanContext | null {
  // Tier 1/2 — real OTel binding resolved?
  if (_getter) {
    const ctx = _getter();
    if (ctx) return ctx;
    // Active span present → use real context; otherwise fall through to
    // synthetic so callers always get trace IDs even outside a span.
  }

  // Tier 3 — synthetic W3C-compatible IDs
  try {
    return _synthetic();
  } catch {
    return null;
  }
}
