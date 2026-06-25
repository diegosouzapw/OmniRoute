/**
 * auto.ts — Auto-instrumentation bootstrap.
 *
 * Wraps the project-wide initialization: telemetry + metrics + logger + a small
 * set of periodic process metrics (heap, RSS, event-loop lag). Designed to be
 * called once at startup from `instrumentation-node.ts`.
 *
 * Idempotent: re-calling `initObservabilityAuto()` without `force` is a no-op.
 *
 * Default-OFF: nothing is created/exported unless `OTEL_EXPORTER_OTLP_ENDPOINT`
 * is set (or `OMNIROUTE_OBSERVABILITY=1`). This means production hosts that
 * haven't explicitly opted in see zero overhead and zero network egress.
 */

import {
  flushSpans,
  getTracer,
  initTelemetry,
  isTelemetryInitialized,
  shutdownTelemetry,
  withSpan,
} from "./otel";
import {
  flushMetrics,
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  initMetrics,
  shutdownMetrics,
} from "./metrics";
import { createLogger, type Logger } from "./logger";
import { OtlpHttpMetricExporter, OtlpHttpSpanExporter } from "./otlpExporter";
import { createDefaultResource } from "./resource";
import type { Span } from "./spanTypes";

/** Configuration knobs accepted by `initObservabilityAuto`. */
export interface AutoInitOptions {
  /** Force re-initialization (used by tests). */
  force?: boolean;
  /** Override the OTLP endpoint (default: env OTEL_EXPORTER_OTLP_ENDPOINT). */
  endpoint?: string;
  /** Override the sampling rate (0..1). Default: 1. */
  samplingRate?: number;
  /** Override the service name (default: env OMNIROUTE_SERVICE_NAME). */
  serviceName?: string;
  /** Override the deployment environment (default: env OMNIROUTE_DEPLOYMENT_ENV). */
  deploymentEnv?: string;
  /** Headers to forward to the OTLP collector (e.g. for auth). */
  headers?: Record<string, string>;
}

let metricsTimer: NodeJS.Timeout | null = null;
let processMetricsStarted = false;

const SHARED_LOGGER: Logger = createLogger({
  name: "omniroute.observability",
  enabled: false,
});

/**
 * Read the canonical "is observability enabled?" flag. Returns true when:
 *  - OMNIROUTE_OBSERVABILITY=1 (explicit opt-in)
 *  - OTEL_EXPORTER_OTLP_ENDPOINT is set (collector endpoint configured)
 *
 * This is the gate that keeps the stack default-OFF.
 */
export function isObservabilityEnabled(): boolean {
  const optIn = (process.env.OMNIROUTE_OBSERVABILITY || "").trim().toLowerCase();
  if (optIn === "1" || optIn === "true" || optIn === "yes" || optIn === "on") return true;
  if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT && process.env.OTEL_EXPORTER_OTLP_ENDPOINT.length > 0) {
    return true;
  }
  return false;
}

/**
 * Bootstrap telemetry + metrics + periodic process metrics.
 *
 * Safe to call multiple times. Returns true on (re)initialization.
 */
export function initObservabilityAuto(options: AutoInitOptions = {}): boolean {
  if (isTelemetryInitialized() && !options.force) return false;

  const endpoint =
    options.endpoint ??
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ??
    "";
  if (!endpoint) {
    // Even without an exporter we honor initTelemetry() so spans work in-process.
    initTelemetry({
      resource: createDefaultResource({
        "service.name": options.serviceName ?? "omniroute",
        "deployment.environment": options.deploymentEnv ?? process.env.OMNIROUTE_DEPLOYMENT_ENV ?? "development",
      }),
      samplingRate: options.samplingRate ?? 1,
      force: options.force,
    });
    initMetrics({ force: options.force });
    return true;
  }

  const spanExporter = new OtlpHttpSpanExporter({
    endpoint,
    headers: options.headers,
  });
  const metricExporter = new OtlpHttpMetricExporter({
    endpoint,
    headers: options.headers,
  });

  initTelemetry({
    resource: createDefaultResource({
      "service.name": options.serviceName ?? "omniroute",
      "deployment.environment": options.deploymentEnv ?? process.env.OMNIROUTE_DEPLOYMENT_ENV ?? "development",
    }),
    exporters: [spanExporter],
    samplingRate: options.samplingRate ?? 1,
    force: options.force,
  });
  initMetrics({
    exporters: [metricExporter],
    force: options.force,
  });
  return true;
}

/** Tear down everything (test seam). */
export async function shutdownObservabilityAuto(): Promise<void> {
  shutdownTelemetry();
  shutdownMetrics();
  if (metricsTimer) {
    clearInterval(metricsTimer);
    metricsTimer = null;
  }
  processMetricsStarted = false;
}

/**
 * Start periodic process metrics: heap, RSS, event-loop lag, active handles.
 * Idempotent — repeat calls are no-ops.
 */
export function setProcessMetrics(intervalMs = 15_000): void {
  if (processMetricsStarted) return;
  processMetricsStarted = true;

  const heapGauge = getOrCreateGauge("process.memory.heap.bytes", "Heap memory in bytes");
  const rssGauge = getOrCreateGauge("process.memory.rss.bytes", "Resident set size in bytes");
  const externalGauge = getOrCreateGauge("process.memory.external.bytes", "External memory in bytes");
  const loopLagHistogram = getOrCreateHistogram("process.eventloop.lag.ms", "Event loop lag in ms");
  const uptimeGauge = getOrCreateGauge("process.uptime.seconds", "Process uptime in seconds");

  // Track event-loop lag by scheduling a self-rescheduling timer.
  let lastTick = Date.now();
  const lag = (): number => {
    const now = Date.now();
    const diff = now - lastTick - intervalMs;
    lastTick = now;
    return diff < 0 ? 0 : diff;
  };

  const tick = (): void => {
    try {
      const mem = process.memoryUsage();
      heapGauge.set(mem.heapUsed);
      rssGauge.set(mem.rss);
      externalGauge.set(mem.external);
      loopLagHistogram.record(lag());
      uptimeGauge.set(process.uptime());
    } catch (err) {
      SHARED_LOGGER.warn("process metrics tick failed", { error: err instanceof Error ? err.message : String(err) });
    }
  };

  // Run once immediately so dashboards don't sit at zero.
  tick();
  metricsTimer = setInterval(tick, intervalMs);
  metricsTimer.unref?.();
}

/** Counter for proxy requests — surfaced for downstream dashboards. */
export function getRequestCounter() {
  return getOrCreateCounter("http.server.requests", "Total HTTP server requests");
}

/** Histogram for proxy request latency. */
export function getRequestLatencyHistogram() {
  return getOrCreateHistogram("http.server.duration.ms", "HTTP server request duration");
}

/**
 * Convenience helper: run `fn` inside a span context, ending the span on
 * success or with `ERROR` status on thrown errors. Returns the function's
 * return value or re-throws.
 */
export async function traceAsync<T>(
  name: string,
  attributes: Record<string, unknown> | undefined,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  const span = getTracer().startSpan(name, attributes as Record<string, never>);
  return withSpan(span, async () => {
    try {
      const result = await fn(span);
      span.setStatus("OK");
      return result;
    } catch (err) {
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

/** Flush both span and metric queues — wired into shutdown handlers. */
export async function flushObservability(): Promise<void> {
  await Promise.allSettled([flushSpans(), flushMetrics()]);
}

/** Test seam: true when the periodic timer is running. */
export function _isProcessMetricsStartedForTesting(): boolean {
  return processMetricsStarted;
}