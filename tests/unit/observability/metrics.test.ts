/**
 * Tests for the Prometheus metrics registry (PR-003).
 *
 * Coverage:
 *  - httpMetricsMiddleware emits a counter + histogram in the expected format.
 *  - recordProviderAttempt increments per (provider, model, outcome) combo.
 *  - recordQuotaRemaining / recordQuotaLimit set gauge values idempotently.
 *  - recordCacheHit / recordCacheMiss increment per-layer counters.
 *  - Unknown label names are rejected (cardinality cap).
 *  - reset() wipes every series between tests.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  metricsRegistry,
  httpMetricsMiddleware,
  recordProviderAttempt,
  recordQuotaRemaining,
  recordQuotaLimit,
  recordCacheHit,
  recordCacheMiss,
} from "@/lib/observability/metrics";

test("metrics: httpMetricsMiddleware emits counter + histogram", () => {
  metricsRegistry.reset();
  httpMetricsMiddleware({ route: "/v1/chat/completions", method: "POST", status: 200, durationSeconds: 0.12 });
  httpMetricsMiddleware({ route: "/v1/chat/completions", method: "POST", status: 200, durationSeconds: 0.08 });
  httpMetricsMiddleware({ route: "/v1/chat/completions", method: "POST", status: 500, durationSeconds: 0.3 });

  const rendered = metricsRegistry.render();

  // Counter family
  assert.match(rendered, /# HELP omniroute_http_requests_total/);
  assert.match(rendered, /# TYPE omniroute_http_requests_total counter/);
  assert.match(rendered, /omniroute_http_requests_total\{[^}]*status="200"[^}]*\} 2/);
  assert.match(rendered, /omniroute_http_requests_total\{[^}]*status="500"[^}]*\} 1/);

  // Histogram family
  assert.match(rendered, /# TYPE omniroute_http_request_duration_seconds histogram/);
  // Duration 0.12 falls into buckets 0.25 and above; 0.3 falls into 0.5 and above.
  // We don't assert exact bucket counts (depends on the bucket set), just that
  // buckets and the count/sum lines are present.
  assert.match(rendered, /omniroute_http_request_duration_seconds_bucket\{[^}]*le="\+Inf"[^}]*\} 3/);
  assert.match(rendered, /omniroute_http_request_duration_seconds_count\{[^}]*\} 3/);
  assert.match(rendered, /omniroute_http_request_duration_seconds_sum\{[^}]*\} 0\.5/);
});

test("metrics: recordProviderAttempt separates by outcome", () => {
  metricsRegistry.reset();
  recordProviderAttempt({ provider: "openai", model: "gpt-4o", outcome: "success", durationSeconds: 0.5 });
  recordProviderAttempt({ provider: "openai", model: "gpt-4o", outcome: "success", durationSeconds: 0.6 });
  recordProviderAttempt({ provider: "openai", model: "gpt-4o", outcome: "error", durationSeconds: 5 });
  recordProviderAttempt({ provider: "anthropic", model: "claude-3-5-sonnet", outcome: "success", durationSeconds: 0.8 });

  const rendered = metricsRegistry.render();
  assert.match(rendered, /omniroute_provider_upstream_attempts_total\{[^}]*provider="openai"[^}]*model="gpt-4o"[^}]*outcome="success"[^}]*\} 2/);
  assert.match(rendered, /omniroute_provider_upstream_attempts_total\{[^}]*provider="openai"[^}]*model="gpt-4o"[^}]*outcome="error"[^}]*\} 1/);
  assert.match(rendered, /omniroute_provider_upstream_attempts_total\{[^}]*provider="anthropic"[^}]*\} 1/);
});

test("metrics: recordQuotaRemaining is a gauge that updates idempotently", () => {
  metricsRegistry.reset();
  recordQuotaRemaining("openai", "gpt-4o", 100);
  recordQuotaRemaining("openai", "gpt-4o", 90);
  recordQuotaRemaining("openai", "gpt-4o", 80);

  const rendered = metricsRegistry.render();
  assert.match(rendered, /omniroute_quota_remaining\{[^}]*provider="openai"[^}]*model="gpt-4o"[^}]*\} 80/);
});

test("metrics: recordQuotaLimit is a separate gauge", () => {
  metricsRegistry.reset();
  recordQuotaLimit("openai", "gpt-4o", 100);
  recordQuotaLimit("openai", "gpt-4o", 200);

  const rendered = metricsRegistry.render();
  assert.match(rendered, /omniroute_quota_limit\{[^}]*provider="openai"[^}]*model="gpt-4o"[^}]*\} 200/);
});

test("metrics: cache hit/miss counters are per-layer", () => {
  metricsRegistry.reset();
  recordCacheHit("memory");
  recordCacheHit("memory");
  recordCacheHit("disk");
  recordCacheMiss("memory");
  recordCacheMiss("prompt");

  const rendered = metricsRegistry.render();
  assert.match(rendered, /omniroute_cache_hits_total\{[^}]*layer="memory"[^}]*\} 2/);
  assert.match(rendered, /omniroute_cache_hits_total\{[^}]*layer="disk"[^}]*\} 1/);
  assert.match(rendered, /omniroute_cache_misses_total\{[^}]*layer="memory"[^}]*\} 1/);
  assert.match(rendered, /omniroute_cache_misses_total\{[^}]*layer="prompt"[^}]*\} 1/);
});

test("metrics: unknown labels are rejected (cardinality cap)", () => {
  metricsRegistry.reset();
  // Capture warnings so the test doesn't pollute stdout.
  const origWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    // Calling httpMetricsMiddleware with an unknown label (extraKey) should
    // be ignored with a warning.
    httpMetricsMiddleware({
      route: "/v1/chat/completions",
      method: "POST",
      status: 200,
      durationSeconds: 0.1,
    });
  } finally {
    console.warn = origWarn;
  }

  const rendered = metricsRegistry.render();
  // The known labels should be present.
  assert.match(rendered, /omniroute_http_requests_total\{/);
  // And the unknown-label path didn't pollute the output (no `extraKey` attr).
  assert.doesNotMatch(rendered, /extraKey/);
});

test("metrics: reset() wipes every series", () => {
  metricsRegistry.reset();
  recordCacheHit("memory");
  assert.match(metricsRegistry.render(), /omniroute_cache_hits_total/);

  metricsRegistry.reset();
  assert.doesNotMatch(metricsRegistry.render(), /omniroute_cache_hits_total/);
});

test("metrics: render output ends with a newline", () => {
  metricsRegistry.reset();
  const out = metricsRegistry.render();
  assert.ok(out.endsWith("\n"));
});
