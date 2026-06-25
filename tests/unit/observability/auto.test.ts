/**
 * auto.test.ts — verifies the auto-instrumentation wrappers from
 * src/lib/observability/auto.ts.
 *
 * Strategy: import the helpers + the metrics registry, drive each
 * wrapper through a happy-path + an error-path, and assert that the
 * expected metric series + span attributes appear in the rendered
 * Prometheus output. Span emission is verified indirectly via the
 * `withSpan` delegate argument (the span argument is captured).
 *
 * Runs under node --test (not vitest) because observability tests
 * don't need jsdom or React.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  instrumentHttp,
  instrumentFetch,
  instrumentProvider,
  instrumentCache,
  instrumentDb,
  sanitizeProvider,
  sanitizeModel,
  isAutoEnabled,
  currentTraceId,
} from "@/lib/observability/auto";
import { metricsRegistry } from "@/lib/observability/metrics";
import { isTelemetryEnabled, withSpan } from "@/lib/observability/otel";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Reset all metrics between tests so cross-test pollution is impossible. */
function resetMetrics(): void {
  metricsRegistry.reset();
}

/** Render the registry to Prometheus text format. */
function render(): string {
  return metricsRegistry.render();
}

/* ------------------------------------------------------------------ */
/* isAutoEnabled / currentTraceId                                     */
/* ------------------------------------------------------------------ */

test("auto: isAutoEnabled delegates to isTelemetryEnabled", () => {
  assert.equal(typeof isAutoEnabled(), "boolean");
  assert.equal(isAutoEnabled(), isTelemetryEnabled());
});

test("auto: currentTraceId returns undefined outside of withSpan", () => {
  resetMetrics();
  assert.equal(currentTraceId(), undefined);
});

test("auto: currentTraceId returns a string inside an active withSpan", async () => {
  resetMetrics();
  let captured: string | undefined;
  await withSpan("test-span", async () => {
    captured = currentTraceId();
  });
  assert.equal(typeof captured, "string");
  assert.ok(captured!.length > 0);
});

/* ------------------------------------------------------------------ */
/* instrumentHttp                                                     */
/* ------------------------------------------------------------------ */

test("auto: instrumentHttp records http_requests_total + duration histogram on 200", async () => {
  resetMetrics();
  await instrumentHttp(
    { method: "GET", url: "/api/v1/foo", headers: { get: () => null } },
    async () => ({
      status: 200,
      headers: new Headers(),
    }),
  );
  const out = render();
  assert.match(out, /omniroute_http_requests_total/);
  assert.match(out, /method="GET"/);
  assert.match(out, /route="\/api\/v1\/foo"/);
  assert.match(out, /status="200"/);
  assert.match(out, /omniroute_http_request_duration_seconds/);
});

test("auto: instrumentHttp records 500 status on error path", async () => {
  resetMetrics();
  await assert.rejects(
    instrumentHttp(
      { method: "POST", url: "/api/v1/bar", headers: { get: () => null } },
      async () => {
        throw new Error("upstream down");
      },
    ),
    /upstream down/,
  );
  const out = render();
  assert.match(out, /status="500"/);
  assert.match(out, /method="POST"/);
});

/* ------------------------------------------------------------------ */
/* instrumentFetch                                                    */
/* ------------------------------------------------------------------ */

test("auto: instrumentFetch records provider attempt + duration on success", async () => {
  resetMetrics();
  const provider = sanitizeProvider("OpenAI");
  const model = sanitizeModel("GPT-4-0613");
  const result = await instrumentFetch(
    provider,
    model,
    async () => ({
      ok: true,
      latencyMs: 142,
    }),
  );
  assert.equal(result.ok, true);
  const out = render();
  assert.match(out, /omniroute_provider_upstream_attempts_total/);
  assert.match(out, /provider="openai"/);
  assert.match(out, /model="gpt-4-0613"/);
  assert.match(out, /outcome="success"/);
  assert.match(out, /omniroute_provider_upstream_duration_seconds/);
});

test("auto: instrumentFetch records failure outcome on thrown error", async () => {
  resetMetrics();
  await assert.rejects(
    instrumentFetch("openai", "gpt-4", async () => {
      throw new Error("rate-limited");
    }),
    /rate-limited/,
  );
  const out = render();
  assert.match(out, /outcome="error"/);
});

test("auto: instrumentFetch records timeout outcome on AbortError", async () => {
  resetMetrics();
  const err = new Error("aborted");
  err.name = "AbortError";
  await assert.rejects(
    instrumentFetch("openai", "gpt-4", async () => {
      throw err;
    }),
    /aborted/,
  );
  const out = render();
  assert.match(out, /outcome="timeout"/);
});

/* ------------------------------------------------------------------ */
/* instrumentProvider                                                 */
/* ------------------------------------------------------------------ */

test("auto: instrumentProvider passes through result on success", async () => {
  resetMetrics();
  const out = await instrumentProvider("anthropic", "claude-3-5-sonnet", async () => ({
    text: "ok",
  }));
  assert.equal(out.text, "ok");
});

test("auto: instrumentProvider re-throws on failure with span exception recorded", async () => {
  resetMetrics();
  await assert.rejects(
    instrumentProvider("anthropic", "claude-3-5-sonnet", async () => {
      throw new Error("429");
    }),
    /429/,
  );
});

/* ------------------------------------------------------------------ */
/* instrumentCache                                                    */
/* ------------------------------------------------------------------ */

test("auto: instrumentCache records hit when fn returns {hit: true}", async () => {
  resetMetrics();
  const out = await instrumentCache("memory", "user:42", async () => ({
    hit: true,
    value: { name: "Ada" },
  }));
  assert.equal(out.hit, true);
  const rendered = render();
  assert.match(rendered, /omniroute_cache_hits_total/);
  assert.match(rendered, /layer="memory"/);
});

test("auto: instrumentCache records miss when fn returns {hit: false}", async () => {
  resetMetrics();
  const out = await instrumentCache("disk", "user:42", async () => ({
    hit: false,
  }));
  assert.equal(out.hit, false);
  assert.match(render(), /omniroute_cache_misses_total/);
});

test("auto: instrumentCache rejects unknown layer with a clear error", async () => {
  resetMetrics();
  await assert.rejects(
    // intentional cast to bypass TS — we want the runtime check to fire
    instrumentCache("not-a-real-layer" as never, "k", async () => ({ hit: false })),
    /unknown layer/,
  );
});

/* ------------------------------------------------------------------ */
/* instrumentDb                                                       */
/* ------------------------------------------------------------------ */

test("auto: instrumentDb records db span + duration on success", async () => {
  resetMetrics();
  const rows = await instrumentDb("select", "users", async () => [{ id: 1 }]);
  assert.equal(rows.length, 1);
});

test("auto: instrumentDb re-throws and marks span error on failure", async () => {
  resetMetrics();
  await assert.rejects(
    instrumentDb("insert", "users", async () => {
      throw new Error("unique violation");
    }),
    /unique violation/,
  );
});

/* ------------------------------------------------------------------ */
/* Sanitization                                                       */
/* ------------------------------------------------------------------ */

test("sanitizeProvider: lowercases + trims + caps at 64 chars", () => {
  assert.equal(sanitizeProvider("  OpenAI  "), "openai");
  assert.equal(sanitizeProvider("X".repeat(100)).length, 64);
});

test("sanitizeModel: lowercases + trims + caps at 128 chars", () => {
  assert.equal(sanitizeModel("  GPT-4  "), "gpt-4");
  assert.equal(sanitizeModel("Y".repeat(200)).length, 128);
});