/**
 * OTel exporter facade tests — B10 of v8.1.
 *
 * The facade's job is to be a no-op when OTel is disabled so that
 * `import { getTracer } from "@/open-sse/observability/otelExporter"`
 * never throws and never blocks the request path. These tests
 * exercise the no-op behavior under default conditions (no env var,
 * no SDK init).
 *
 * Reference: open-sse/observability/otelExporter.ts, PLAN.md § 2.5.2 (B10).
 */

import assert from "node:assert/strict";
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import {
  getTracer,
  isOtelEnabled,
  recordException,
  _resetOtelInitLoggedForTest,
} from "../../open-sse/observability/otelExporter.ts";

function expect<T>(actual: T) {
  return {
    toBe(expected: unknown) {
      assert.equal(actual, expected);
    },
    toBeDefined() {
      assert.notEqual(actual, undefined);
    },
    not: {
      toBe(expected: unknown) {
        assert.notEqual(actual, expected);
      },
      toThrow() {
        assert.doesNotThrow(actual as () => unknown);
      },
    },
  };
}

describe("otelExporter", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    _resetOtelInitLoggedForTest();
    delete process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
    delete process.env.OTEL_SDK_DISABLED;
    delete process.env.OTEL_SERVICE_NAME;
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    _resetOtelInitLoggedForTest();
    mock.restoreAll();
  });

  describe("isOtelEnabled", () => {
    it("returns false when OTEL_EXPORTER_OTLP_ENDPOINT is unset", () => {
      expect(isOtelEnabled()).toBe(false);
    });

    it("returns false when OTEL_EXPORTER_OTLP_ENDPOINT is empty string", () => {
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT = "";
      expect(isOtelEnabled()).toBe(false);
    });

    it("returns false when OTEL_SDK_DISABLED=true even with endpoint set", () => {
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT = "http://collector:4318";
      process.env.OTEL_SDK_DISABLED = "true";
      expect(isOtelEnabled()).toBe(false);
    });

    it("returns true when OTEL_EXPORTER_OTLP_ENDPOINT is a non-empty URL", () => {
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT = "http://collector:4318";
      expect(isOtelEnabled()).toBe(true);
    });

    it("returns true even when OTEL_EXPORTER_OTLP_ENDPOINT is whitespace (treated as non-empty)", () => {
      // We trim in the SDK init path, but isOtelEnabled() is the
      // "do you want telemetry at all?" check, so we accept any
      // non-empty value here. The init path is what trims.
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT = "   ";
      expect(isOtelEnabled()).toBe(true);
    });
  });

  describe("getTracer", () => {
    it("returns a tracer proxy without throwing when SDK is not initialized", () => {
      const tracer = getTracer("test.tracer");
      expect(tracer).toBeDefined();
      expect(typeof tracer.startSpan).toBe("function");
    });

    it("returns a tracer that produces non-recording spans by default", () => {
      const tracer = getTracer("test.noop");
      const span = tracer.startSpan("test-span");
      // The no-op span implements the full Span interface but is not
      // recording — its context is the INVALID trace.
      expect(span).toBeDefined();
      expect(typeof span.end).toBe("function");
      expect(typeof span.spanContext).toBe("function");
      const ctx = span.spanContext();
      // The no-op API returns an invalid context (all-zero trace/span ids).
      expect(ctx.traceId).toBe("00000000000000000000000000000000");
      expect(ctx.spanId).toBe("0000000000000000");
      // Ending a no-op span must not throw.
      expect(() => span.end()).not.toThrow();
    });

    it("returns the same proxy for the same name (cheap to call)", () => {
      const a = getTracer("test.same");
      const b = getTracer("test.same");
      // Both proxies must behave identically (same backing tracer). We verify
      // via behavior rather than identity because @opentelemetry/api's
      // `trace.getTracer` returns a fresh ProxyTracer wrapper each call —
      // the underlying registered tracer IS cached by the API.
      const sa = a.startSpan("x");
      const sb = b.startSpan("x");
      expect(sa.spanContext().traceId).toBe(sb.spanContext().traceId);
      sa.end();
      sb.end();
    });

    it("returns different proxies for different names", () => {
      const a = getTracer("test.alpha");
      const b = getTracer("test.beta");
      expect(a).not.toBe(b);
    });

    it("the no-op span setAttribute / setStatus / recordException are callable", () => {
      const tracer = getTracer("test.noop.api");
      const span = tracer.startSpan("api-test");
      expect(() => span.setAttribute("foo", "bar")).not.toThrow();
      expect(() => span.setAttributes({ a: 1, b: 2 })).not.toThrow();
      expect(() =>
        span.setStatus({ code: 1 /* SpanStatusCode.OK */ })
      ).not.toThrow();
      expect(() => span.recordException(new Error("boom"))).not.toThrow();
      expect(() => span.end()).not.toThrow();
    });
  });

  describe("recordException", () => {
    it("does not throw when given a plain Error", () => {
      const tracer = getTracer("test.rec");
      const span = tracer.startSpan("rec-test");
      expect(() => recordException(span, new Error("boom"))).not.toThrow();
      span.end();
    });

    it("does not throw when given a non-Error value", () => {
      const tracer = getTracer("test.rec");
      const span = tracer.startSpan("rec-test");
      expect(() => recordException(span, "string error")).not.toThrow();
      expect(() => recordException(span, null)).not.toThrow();
      expect(() => recordException(span, undefined)).not.toThrow();
      expect(() => recordException(span, { code: 500 })).not.toThrow();
      span.end();
    });
  });
});
