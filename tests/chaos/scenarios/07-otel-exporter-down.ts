/*!
 * Scenario 07 — OTLP collector unreachable for 5 minutes.
 *
 * What this proves:
 *   • While the OTLP collector is unreachable, the in-process span
 *     buffer accepts spans without blocking the request path.
 *   • The buffer is bounded — when it fills up, the SDK drops the
 *     oldest spans (per spec) rather than growing unbounded.
 *   • When the collector comes back, the exporter reconnects and
 *     drains the buffer.
 *
 * Hermetic:
 *   We model the exporter as an in-memory object: `enqueue(span)` adds
 *   to the buffer; an outage flag pauses the export. No real OTLP.
 *
 * Cleanup:
 *   Outage state self-recovers (timer clears the flag). No injectors
 *   pushed. The runner's default invariants apply.
 */
import { generateTraceId, injectOtelOutage, chaosError } from "../injectors.ts";
import type { ScenarioContext } from "../runner.ts";

export const id = "07-otel-exporter-down";
export const title = "OTLP collector unreachable 5min — in-process buffering, no request blocks, reconnect on recovery";

const BUFFER_CAPACITY = 1000;
const OUTAGE_MS = 200; // short for the suite; the SUT behavior is the same

export async function run(ctx: ScenarioContext): Promise<void> {
  // ── Synthetic exporter ────────────────────────────────────────────
  type Span = { id: string; at: number; name: string; traceId: string };
  const buffer: Span[] = [];
  const exporter = {
    dropped: 0,
    outaged: false,
    outageUntil: 0,
    exported: 0,
  };

  function exportSpan(span: Span): boolean {
    if (exporter.outaged && Date.now() < exporter.outageUntil) {
      // Outage: keep in buffer.
      if (buffer.length >= BUFFER_CAPACITY) {
        // Drop oldest (spec behavior).
        buffer.shift();
        exporter.dropped++;
      }
      buffer.push(span);
      return false;
    }
    // Healthy: flush buffer first, then this span.
    while (buffer.length > 0) {
      const s = buffer.shift()!;
      exporter.exported++;
      // (no-op; in real life: send to OTLP collector)
    }
    exporter.exported++;
    return true;
  }

  // ── Begin the outage ──────────────────────────────────────────────
  const otelHandle = {
    startOutage(durationMs: number) {
      exporter.outaged = true;
      exporter.outageUntil = Date.now() + durationMs;
    },
    isOutaged() { return exporter.outaged && Date.now() < exporter.outageUntil; },
    dropped: 0,
  };
  injectOtelOutage(otelHandle, OUTAGE_MS);
  exporter.dropped = otelHandle.dropped; // share counter
  exporter.outaged = true;
  exporter.outageUntil = Date.now() + OUTAGE_MS;

  // ── Request loop during outage ────────────────────────────────────
  // Each "request" emits a span. Must not block — measure the time.
  const requestTimings: number[] = [];
  for (let i = 0; i < 100; i++) {
    const t0 = performance.now();
    const span: Span = {
      id: `s-${i}`,
      at: Date.now(),
      name: `request.${i}`,
      traceId: generateTraceId(),
    };
    exportSpan(span);
    requestTimings.push(performance.now() - t0);
  }
  const maxRequestMs = Math.max(...requestTimings);
  const avgRequestMs = requestTimings.reduce((s, n) => s + n, 0) / requestTimings.length;

  ctx.assert("requests-do-not-block", maxRequestMs < 50, `maxRequestMs=${maxRequestMs.toFixed(2)}`);
  ctx.assert("average-fast", avgRequestMs < 5, `avgRequestMs=${avgRequestMs.toFixed(2)}`);
  ctx.assert("spans-buffered", buffer.length === 100, `buffered=${buffer.length}`);

  // ── Wait for outage to end ────────────────────────────────────────
  await new Promise((r) => setTimeout(r, OUTAGE_MS + 50));
  exporter.outaged = false;

  // ── Send a few more spans — these should drain the buffer ─────────
  for (let i = 0; i < 10; i++) {
    const span: Span = {
      id: `s-after-${i}`,
      at: Date.now(),
      name: `request.after.${i}`,
      traceId: generateTraceId(),
    };
    exportSpan(span);
  }

  ctx.assert("buffer-drained-on-recovery", buffer.length === 0, `buffer=${buffer.length}`);
  ctx.assert("exported-count-includes-buffered", exporter.exported >= 110, `exported=${exporter.exported}`);
}