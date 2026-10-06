/**
 * tests/unit/routing-otel.test.ts
 *
 * Optional OpenTelemetry sink (open-sse/services/routing/otel.ts):
 *  - disabled unless an endpoint is configured
 *  - buildOtlpTracesPayload emits GenAI semantic-convention spans
 *  - record() enqueues without performing I/O; stop() flushes via fetch
 *  - dropped events are counted when the buffer overflows
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildOtlpTracesPayload,
  isRoutingOtelEnabled,
  OtlpHttpsEventSink,
} from "../../open-sse/services/routing/otel.ts";
import type { RoutingEvent } from "../../open-sse/services/routing/events.ts";

function event(partial: Partial<RoutingEvent> = {}): RoutingEvent {
  return {
    requestId: "req-1",
    provider: "openai",
    model: "gpt-4o",
    strategy: "auto",
    latencyMs: 120,
    ttftMs: 40,
    inputTokens: 10,
    outputTokens: 20,
    cost: 0.01,
    retries: 1,
    fallbackUsed: true,
    outcome: "success",
    status: 200,
    finishReason: "stop",
    connectionId: "conn-1",
    ts: 1_700_000_000_000,
    ...partial,
  };
}

test("isRoutingOtelEnabled is false without an endpoint", () => {
  assert.equal(isRoutingOtelEnabled({}), false);
  assert.equal(isRoutingOtelEnabled({ OMNIROUTE_OTEL_ENDPOINT: "   " }), false);
});

test("isRoutingOtelEnabled honors OMNIROUTE_OTEL_ENDPOINT and OTLP env", () => {
  assert.equal(isRoutingOtelEnabled({ OMNIROUTE_OTEL_ENDPOINT: "http://collector:4318" }), true);
  assert.equal(
    isRoutingOtelEnabled({ OTEL_EXPORTER_OTLP_ENDPOINT: "https://collector:4318" }),
    true
  );
});

test("buildOtlpTracesPayload emits GenAI semantic-convention spans", () => {
  const payload = buildOtlpTracesPayload([event()], "omniroute-test") as {
    resourceSpans: Array<{
      scopeSpans: Array<{
        spans: Array<{
          attributes: Array<{ key: string; value: { stringValue?: string; intValue?: string } }>;
        }>;
      }>;
    }>;
  };
  const span = payload.resourceSpans[0].scopeSpans[0].spans[0];
  const attrs = Object.fromEntries(
    span.attributes.map((a) => [a.key, a.value.stringValue ?? a.value.intValue])
  );
  assert.equal(attrs["gen_ai.provider.name"], "openai");
  assert.equal(attrs["gen_ai.request.model"], "gpt-4o");
  assert.equal(attrs["gen_ai.system"], "auto");
  assert.equal(attrs["gen_ai.usage.input_tokens"], "10");
  assert.equal(attrs["gen_ai.usage.output_tokens"], "20");
  assert.equal(attrs["gen_ai.completion.finish_reason"], "stop");
  assert.equal(attrs["omniroute.routing.outcome"], "success");
  assert.equal(attrs["omniroute.routing.status"], "200");
  assert.equal(attrs["omniroute.routing.retries"], "1");
  assert.equal(attrs["omniroute.routing.fallback_used"], "1");
  assert.equal(attrs["omniroute.connection_id"], "conn-1");
  assert.ok(BigInt(span.startTimeUnixNano) > 0n);
});

test("OtlpHttpsEventSink record() enqueues without I/O and flush sends via fetch", async () => {
  const calls: Array<{ url: string; body: string }> = [];
  const originalFetch = global.fetch;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global.fetch = (async (url: any, init: any) => {
    calls.push({ url: String(url), body: String(init?.body ?? "") });
    return { ok: true } as Response;
  }) as typeof fetch;

  const sink = new OtlpHttpsEventSink({
    endpoint: "http://collector:4318",
    flushIntervalMs: 1_000_000, // effectively never auto-flush in the test
  });
  try {
    sink.record(event());
    sink.record(event({ requestId: "req-2" }));
    assert.equal(sink.getStats().buffered, 2);
    // Force an explicit flush via stop().
    await new Promise((r) => setTimeout(r, 20));
    sink.stop();
    await new Promise((r) => setTimeout(r, 50));
    assert.equal(calls.length, 1, "one flush should have been sent");
    assert.ok(calls[0].url.endsWith("/v1/traces"), calls[0].url);
    const body = JSON.parse(calls[0].body);
    assert.ok(body.resourceSpans[0].scopeSpans[0].spans.length === 2);
    assert.equal(sink.getStats().buffered, 0);
  } finally {
    global.fetch = originalFetch;
  }
});

test("OtlpHttpsEventSink drops oldest when the buffer is saturated", async () => {
  const originalFetch = global.fetch;
  global.fetch = (async () => ({ ok: true }) as Response) as typeof fetch;
  const sink = new OtlpHttpsEventSink({
    endpoint: "http://collector:4318",
    maxBatchSize: 2,
    flushIntervalMs: 1_000_000,
  });
  try {
    for (let i = 0; i < 20; i++) sink.record(event({ requestId: `r-${i}` }));
    const stats = sink.getStats();
    assert.ok(stats.dropped > 0, "overload must drop events, never block");
    sink.stop();
  } finally {
    global.fetch = originalFetch;
  }
});
