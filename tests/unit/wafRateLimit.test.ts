import test from "node:test";
import assert from "node:assert/strict";

import {
  gateOutboundRequest,
  configureWafRateLimit,
  getWafRateLimitConfig,
  resetWafRateLimit,
} from "../../open-sse/services/wafRateLimit.ts";

// #FIX: agentrouter.org's WAF is burst-sensitive. The gate must serialize
// outbound calls per bucket and hold for at least `minGapMs` between calls.

test("first call is immediate (no previous timestamp)", async () => {
  resetWafRateLimit();
  configureWafRateLimit({ minGapMs: 100 });
  const t0 = Date.now();
  await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
  const elapsed = Date.now() - t0;
  assert.ok(elapsed < 50, `first call should be near-instant, was ${elapsed}ms`);
});

test("second call within minGapMs is throttled", async () => {
  resetWafRateLimit();
  configureWafRateLimit({ minGapMs: 300 });
  await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
  const t0 = Date.now();
  await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
  const elapsed = Date.now() - t0;
  assert.ok(elapsed >= 250, `second call should wait at least minGapMs, was ${elapsed}ms`);
  assert.ok(elapsed < 600, `second call should not wait much longer than minGapMs, was ${elapsed}ms`);
});

test("third call after the gate has been satisfied is not throttled", async () => {
  resetWafRateLimit();
  configureWafRateLimit({ minGapMs: 100 });
  await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
  await new Promise((resolve) => setTimeout(resolve, 150));
  const t0 = Date.now();
  await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
  const elapsed = Date.now() - t0;
  assert.ok(elapsed < 50, `third call after cooldown should be near-instant, was ${elapsed}ms`);
});

test("buckets are independent", async () => {
  resetWafRateLimit();
  configureWafRateLimit({ minGapMs: 500 });
  await gateOutboundRequest("agentrouter:https://a.example.com/v1/messages");
  const t0 = Date.now();
  // Different bucket key → independent state → should not be throttled
  await gateOutboundRequest("agentrouter:https://b.example.com/v1/messages");
  const elapsed = Date.now() - t0;
  assert.ok(elapsed < 50, `independent bucket should not be throttled, was ${elapsed}ms`);
});

test("configureWafRateLimit overrides defaults", () => {
  resetWafRateLimit();
  configureWafRateLimit({ minGapMs: 42 });
  const cfg = getWafRateLimitConfig();
  assert.equal(cfg.minGapMs, 42);
});

test("resetWafRateLimit clears all bucket state", async () => {
  configureWafRateLimit({ minGapMs: 500 });
  await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
  resetWafRateLimit();
  // After reset, the next call should be near-instant
  const t0 = Date.now();
  await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
  const elapsed = Date.now() - t0;
  assert.ok(elapsed < 50, `after reset, first call should be immediate, was ${elapsed}ms`);
});
