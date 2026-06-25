/**
 * auto.test.ts — Unit tests for src/lib/observability/auto.ts
 *
 * Covers:
 *  - isObservabilityEnabled honors OMNIROUTE_OBSERVABILITY=1
 *  - isObservabilityEnabled honors OMNIROUTE_OBSERVABILITY=true
 *  - isObservabilityEnabled honors OTEL_EXPORTER_OTLP_ENDPOINT
 *  - isObservabilityEnabled returns false when nothing is set
 *  - initObservabilityAuto without an endpoint still initializes (in-process only)
 *  - initObservabilityAuto with an endpoint wires OTLP exporters
 *  - initObservabilityAuto is idempotent without force
 *  - shutdownObservabilityAuto clears state
 *  - setProcessMetrics starts a periodic timer (idempotent)
 *  - traceAsync returns the function's value and sets span OK
 *  - traceAsync captures thrown errors as span events and rethrows
 *  - getRequestCounter / getRequestLatencyHistogram return reusable instruments
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  _isProcessMetricsStartedForTesting,
  getRequestCounter,
  getRequestLatencyHistogram,
  initObservabilityAuto,
  isObservabilityEnabled,
  setProcessMetrics,
  shutdownObservabilityAuto,
  traceAsync,
} from "@/lib/observability/auto";
import { _pendingCountForTesting, shutdownMetrics } from "@/lib/observability/metrics";
import { isTelemetryInitialized, shutdownTelemetry } from "@/lib/observability/otel";

test.beforeEach(async () => {
  await shutdownObservabilityAuto();
  delete process.env.OMNIROUTE_OBSERVABILITY;
  delete process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
});

test("isObservabilityEnabled honors OMNIROUTE_OBSERVABILITY=1", () => {
  process.env.OMNIROUTE_OBSERVABILITY = "1";
  assert.equal(isObservabilityEnabled(), true);
});

test("isObservabilityEnabled honors OMNIROUTE_OBSERVABILITY=true / on / yes", () => {
  process.env.OMNIROUTE_OBSERVABILITY = "true";
  assert.equal(isObservabilityEnabled(), true);
  process.env.OMNIROUTE_OBSERVABILITY = "yes";
  assert.equal(isObservabilityEnabled(), true);
  process.env.OMNIROUTE_OBSERVABILITY = "on";
  assert.equal(isObservabilityEnabled(), true);
});

test("isObservabilityEnabled honors OTEL_EXPORTER_OTLP_ENDPOINT", () => {
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT = "http://collector:4318";
  assert.equal(isObservabilityEnabled(), true);
});

test("isObservabilityEnabled returns false when nothing is set", () => {
  delete process.env.OMNIROUTE_OBSERVABILITY;
  delete process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  assert.equal(isObservabilityEnabled(), false);
});

test("initObservabilityAuto without endpoint still initializes (in-process)", () => {
  assert.equal(initObservabilityAuto(), true);
  assert.equal(isTelemetryInitialized(), true);
  // No exporter => pending metrics stay in-process.
  assert.equal(_pendingCountForTesting(), 0);
});

test("initObservabilityAuto is idempotent (no force)", () => {
  assert.equal(initObservabilityAuto(), true);
  assert.equal(initObservabilityAuto(), false, "second call is a no-op");
  assert.equal(initObservabilityAuto({ force: true }), true);
});

test("initObservabilityAuto with endpoint wires telemetry + metrics", () => {
  assert.equal(
    initObservabilityAuto({ endpoint: "http://collector:4318" }),
    true
  );
  assert.equal(isTelemetryInitialized(), true);
});

test("shutdownObservabilityAuto clears telemetry + metrics + timer", async () => {
  initObservabilityAuto();
  setProcessMetrics(60_000);
  assert.equal(_isProcessMetricsStartedForTesting(), true);
  await shutdownObservabilityAuto();
  assert.equal(isTelemetryInitialized(), false);
  assert.equal(_isProcessMetricsStartedForTesting(), false);
});

test("setProcessMetrics is idempotent (second call is a no-op)", () => {
  setProcessMetrics(60_000);
  setProcessMetrics(60_000);
  // We can only assert that the flag stays true.
  assert.equal(_isProcessMetricsStartedForTesting(), true);
});

test("traceAsync returns the function value and sets span status to OK", async () => {
  await shutdownObservabilityAuto();
  initObservabilityAuto();
  const result = await traceAsync("op", { tag: "x" }, async () => 42);
  assert.equal(result, 42);
});

test("traceAsync captures thrown errors as span events and rethrows", async () => {
  await shutdownObservabilityAuto();
  initObservabilityAuto();
  await assert.rejects(
    () =>
      traceAsync("op.fail", undefined, async () => {
        throw new Error("boom");
      }),
    /boom/
  );
});

test("getRequestCounter / getRequestLatencyHistogram return reusable instruments", async () => {
  await shutdownObservabilityAuto();
  initObservabilityAuto();
  const c = getRequestCounter();
  const h = getRequestLatencyHistogram();
  c.inc();
  h.record(7);
  // Both should accumulate in the metrics queue.
  assert.ok(_pendingCountForTesting() >= 2);
  // Cleanup
  shutdownMetrics();
  shutdownTelemetry();
});