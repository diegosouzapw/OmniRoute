/**
 * metrics.test.ts — Unit tests for src/lib/observability/metrics.ts
 *
 * Covers:
 *  - Pre-init: instrument.record() / inc() / set() are no-ops (no pending)
 *  - initMetrics initializes once; second call without force is a no-op
 *  - shutdownMetrics clears state
 *  - getOrCreateCounter returns the same instance for the same name
 *  - getOrCreateHistogram / getOrCreateGauge same
 *  - Counter inc appends a pending point
 *  - Histogram record appends a pending point
 *  - Gauge set appends a pending point
 *  - Non-finite values are dropped (no pending point)
 *  - flushMetrics forwards to every configured exporter
 *  - Exporter errors do not break flushMetrics
 *  - Pending count is reset to 0 after a successful flush
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  _pendingCountForTesting,
  _setExportersForTesting,
  flushMetrics,
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  initMetrics,
  shutdownMetrics,
} from "@/lib/observability/metrics";
import type { MetricExporter, MetricPoint } from "@/lib/observability/spanTypes";

test.beforeEach(() => {
  shutdownMetrics();
});

test("pre-init: counter inc is a no-op (pending stays at 0)", () => {
  const counter = getOrCreateCounter("c1", "test counter");
  counter.inc(5);
  assert.equal(_pendingCountForTesting(), 0);
});

test("initMetrics initializes once; second call without force is a no-op", () => {
  assert.equal(initMetrics(), true);
  assert.equal(initMetrics(), false);
  // force=true re-initializes.
  assert.equal(initMetrics({ force: true }), true);
});

test("shutdownMetrics clears state (pending -> 0, instruments wiped on next init)", () => {
  initMetrics();
  getOrCreateCounter("doomed", "x").inc();
  assert.ok(_pendingCountForTesting() >= 1);
  shutdownMetrics();
  assert.equal(_pendingCountForTesting(), 0);
});

test("getOrCreateCounter returns the same instance for the same name", () => {
  initMetrics();
  const a = getOrCreateCounter("dup", "x");
  const b = getOrCreateCounter("dup", "y");
  assert.equal(a, b);
});

test("getOrCreateHistogram returns the same instance for the same name", () => {
  initMetrics();
  const a = getOrCreateHistogram("dup.h", "x");
  const b = getOrCreateHistogram("dup.h", "y");
  assert.equal(a, b);
});

test("getOrCreateGauge returns the same instance for the same name", () => {
  initMetrics();
  const a = getOrCreateGauge("dup.g", "x");
  const b = getOrCreateGauge("dup.g", "y");
  assert.equal(a, b);
});

test("Counter.inc appends a pending point", () => {
  initMetrics();
  const counter = getOrCreateCounter("hits", "page hits");
  counter.inc(1);
  counter.inc(2, { route: "/x" });
  assert.equal(_pendingCountForTesting(), 2);
});

test("Histogram.record appends a pending point", () => {
  initMetrics();
  const hist = getOrCreateHistogram("latency", "ms");
  hist.record(12.5);
  assert.equal(_pendingCountForTesting(), 1);
});

test("Gauge.set appends a pending point", () => {
  initMetrics();
  const gauge = getOrCreateGauge("temp", "celsius");
  gauge.set(21);
  assert.equal(_pendingCountForTesting(), 1);
});

test("non-finite values are dropped (NaN / Infinity ignored)", () => {
  initMetrics();
  const counter = getOrCreateCounter("n1", "x");
  const hist = getOrCreateHistogram("h1", "x");
  const gauge = getOrCreateGauge("g1", "x");
  counter.inc(NaN);
  counter.inc(Infinity);
  hist.record(NaN);
  gauge.set(Infinity);
  assert.equal(_pendingCountForTesting(), 0);
});

test("flushMetrics forwards pending points to every exporter", async () => {
  initMetrics();
  const received: MetricPoint[] = [];
  const exporter: MetricExporter = {
    async exportPoint(point) {
      received.push(point);
    },
  };
  _setExportersForTesting([exporter]);
  getOrCreateCounter("c", "x").inc(1);
  getOrCreateHistogram("h", "x").record(10);
  getOrCreateGauge("g", "x").set(5);
  await flushMetrics();
  assert.equal(received.length, 3, "all three pending points should be exported");
  assert.equal(_pendingCountForTesting(), 0, "queue should drain after flush");
});

test("exporter errors do not break flushMetrics", async () => {
  initMetrics();
  _setExportersForTesting([
    {
      async exportPoint() {
        throw new Error("boom");
      },
    },
  ]);
  getOrCreateCounter("c", "x").inc(1);
  await assert.doesNotReject(async () => flushMetrics());
});