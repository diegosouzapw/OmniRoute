import test from "node:test";
import assert from "node:assert/strict";

// ═════════════════════════════════════════════════════
//  FASE-07/08/09: UX, LLM Advanced, E2E Hardening Tests
// ═════════════════════════════════════════════════════

// ─── Policy Engine Tests ──────────────────────────

import { PolicyEngine } from "../../src/domain/policyEngine.ts";

test("PolicyEngine: evaluates empty policy list as allowed", () => {
  const engine = new PolicyEngine();
  const result = engine.evaluate({ model: "gpt-4" });
  assert.equal(result.allowed, true);
  assert.equal(result.appliedPolicies.length, 0);
});

test("PolicyEngine: matches model glob patterns", () => {
  const engine = new PolicyEngine();
  engine.loadPolicies([
    {
      id: "1",
      name: "prefer-openai-for-gpt",
      type: "routing",
      enabled: true,
      priority: 1,
      conditions: { model_pattern: "gpt-*" },
      actions: { prefer_provider: ["openai"] },
    },
  ]);

  const result = engine.evaluate({ model: "gpt-4o" });
  assert.equal(result.allowed, true);
  assert.deepEqual(result.preferredProviders, ["openai"]);
  assert.deepEqual(result.appliedPolicies, ["prefer-openai-for-gpt"]);
});

test("PolicyEngine: does not match non-matching models", () => {
  const engine = new PolicyEngine();
  engine.loadPolicies([
    {
      id: "1",
      name: "gpt-only",
      type: "routing",
      enabled: true,
      priority: 1,
      conditions: { model_pattern: "gpt-*" },
      actions: { prefer_provider: ["openai"] },
    },
  ]);

  const result = engine.evaluate({ model: "claude-3.5-sonnet" });
  assert.equal(result.preferredProviders.length, 0);
});

test("PolicyEngine: blocks models via access policy", () => {
  const engine = new PolicyEngine();
  engine.loadPolicies([
    {
      id: "2",
      name: "block-expensive",
      type: "access",
      enabled: true,
      priority: 1,
      conditions: {},
      actions: { block_model: ["gpt-4*", "claude-3-opus*"] },
    },
  ]);

  const blocked = engine.evaluate({ model: "gpt-4o" });
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.reason.includes("blocked"));

  const allowed = engine.evaluate({ model: "gpt-3.5-turbo" });
  assert.equal(allowed.allowed, true);
});

test("PolicyEngine: applies max_tokens from budget policy", () => {
  const engine = new PolicyEngine();
  engine.loadPolicies([
    {
      id: "3",
      name: "limit-tokens",
      type: "budget",
      enabled: true,
      priority: 1,
      conditions: {},
      actions: { max_tokens: 4096 },
    },
  ]);

  const result = engine.evaluate({ model: "gpt-4" });
  assert.equal(result.maxTokens, 4096);
});

test("PolicyEngine: skips disabled policies", () => {
  const engine = new PolicyEngine();
  engine.loadPolicies([
    {
      id: "4",
      name: "disabled-policy",
      type: "routing",
      enabled: false,
      priority: 1,
      conditions: {},
      actions: { prefer_provider: ["should-not-appear"] },
    },
  ]);

  const result = engine.evaluate({ model: "gpt-4" });
  assert.equal(result.preferredProviders.length, 0);
});

test("PolicyEngine: respects priority order", () => {
  const engine = new PolicyEngine();
  engine.loadPolicies([
    {
      id: "b",
      name: "second",
      type: "routing",
      enabled: true,
      priority: 10,
      conditions: {},
      actions: { prefer_provider: ["provider-b"] },
    },
    {
      id: "a",
      name: "first",
      type: "routing",
      enabled: true,
      priority: 1,
      conditions: {},
      actions: { prefer_provider: ["provider-a"] },
    },
  ]);

  const result = engine.evaluate({ model: "any" });
  assert.deepEqual(result.preferredProviders, ["provider-a", "provider-b"]);
  assert.deepEqual(result.appliedPolicies, ["first", "second"]);
});

test("PolicyEngine: addPolicy and removePolicy work", () => {
  const engine = new PolicyEngine();
  engine.addPolicy({
    id: "x",
    name: "temp",
    type: "routing",
    enabled: true,
    priority: 1,
    conditions: {},
    actions: { prefer_provider: ["x"] },
  });

  assert.equal(engine.getPolicies().length, 1);
  engine.removePolicy("x");
  assert.equal(engine.getPolicies().length, 0);
});

// ─── LRU Cache Tests ──────────────────────────

import { LRUCache } from "../../src/lib/cacheLayer.ts";

test("LRUCache: set and get work", () => {
  const cache = new LRUCache({ maxSize: 5 });
  cache.set("k1", "v1");
  assert.equal(cache.get("k1"), "v1");
});

test("LRUCache: returns undefined for missing keys", () => {
  const cache = new LRUCache({ maxSize: 5 });
  assert.equal(cache.get("missing"), undefined);
});

test("LRUCache: evicts oldest entry when full", () => {
  const cache = new LRUCache({ maxSize: 3 });
  cache.set("a", 1);
  cache.set("b", 2);
  cache.set("c", 3);
  cache.set("d", 4); // Should evict "a"

  assert.equal(cache.get("a"), undefined);
  assert.equal(cache.get("d"), 4);
});

test("LRUCache: TTL expiration works", async () => {
  const cache = new LRUCache({ maxSize: 5, defaultTTL: 50 });
  cache.set("temp", "value");
  assert.equal(cache.get("temp"), "value");

  await new Promise((r) => setTimeout(r, 60));
  assert.equal(cache.get("temp"), undefined);
});

test("LRUCache: stats track hits and misses", () => {
  const cache = new LRUCache({ maxSize: 5 });
  cache.set("k", "v");
  cache.get("k"); // hit
  cache.get("missing"); // miss

  const stats = cache.getStats();
  assert.equal(stats.hits, 1);
  assert.equal(stats.misses, 1);
  assert.equal(stats.hitRate, 50);
});

test("LRUCache: generateKey produces consistent hashes", () => {
  const key1 = LRUCache.generateKey({ model: "gpt-4", prompt: "hello" });
  const key2 = LRUCache.generateKey({ prompt: "hello", model: "gpt-4" }); // different order
  assert.equal(key1, key2);
});

test("LRUCache: delete removes entry", () => {
  const cache = new LRUCache({ maxSize: 5 });
  cache.set("k", "v");
  assert.equal(cache.delete("k"), true);
  assert.equal(cache.has("k"), false);
});

test("LRUCache: clear empties cache", () => {
  const cache = new LRUCache({ maxSize: 5 });
  cache.set("a", 1);
  cache.set("b", 2);
  cache.clear();
  assert.equal(cache.getStats().size, 0);
});

// ─── Stream State Machine Tests ──────────────────

import {
  StreamTracker,
  STREAM_STATES,
  createStreamTracker,
  getActiveStreams,
  archiveStream,
} from "../../src/sse/services/streamState.ts";

test("StreamTracker: starts in INITIALIZED state", () => {
  const tracker = new StreamTracker("req-1");
  assert.equal(tracker.state, STREAM_STATES.INITIALIZED);
});

test("StreamTracker: valid transitions succeed", () => {
  const tracker = new StreamTracker("req-2");
  assert.equal(tracker.transition(STREAM_STATES.CONNECTING), true);
  assert.equal(tracker.transition(STREAM_STATES.STREAMING), true);
  assert.equal(tracker.transition(STREAM_STATES.COMPLETED), true);
  assert.equal(tracker.isTerminal(), true);
});

test("StreamTracker: invalid transitions are rejected", () => {
  const tracker = new StreamTracker("req-3");
  // Can't go directly to STREAMING from INITIALIZED
  assert.equal(tracker.transition(STREAM_STATES.STREAMING), false);
  assert.equal(tracker.state, STREAM_STATES.INITIALIZED);
});

test("StreamTracker: records TTFB on first STREAMING transition", () => {
  const tracker = new StreamTracker("req-4");
  tracker.transition(STREAM_STATES.CONNECTING);
  tracker.transition(STREAM_STATES.STREAMING);
  assert.ok(tracker.firstChunkAt !== null);
});

test("StreamTracker: fail() transitions to FAILED", () => {
  const tracker = new StreamTracker("req-5");
  tracker.transition(STREAM_STATES.CONNECTING);
  tracker.fail(new Error("connection timeout"));
  assert.equal(tracker.state, STREAM_STATES.FAILED);
  assert.equal(tracker.error, "connection timeout");
});

test("StreamTracker: getSummary returns telemetry", () => {
  const tracker = new StreamTracker("req-6", { model: "gpt-4", provider: "openai" });
  tracker.transition(STREAM_STATES.CONNECTING);
  tracker.transition(STREAM_STATES.STREAMING);
  tracker.recordChunk(500);
  tracker.recordChunk(300);
  tracker.transition(STREAM_STATES.COMPLETED);

  const summary = tracker.getSummary();
  assert.equal(summary.requestId, "req-6");
  assert.equal(summary.model, "gpt-4");
  assert.equal(summary.chunkCount, 2);
  assert.equal(summary.totalBytes, 800);
  assert.ok(summary.duration >= 0);
  assert.ok(summary.ttfb !== null);
});

test("StreamTracker: registry tracks active streams", () => {
  const tracker = createStreamTracker("reg-1", { model: "test" });
  const active = getActiveStreams();
  assert.ok(active.some((s) => s.requestId === "reg-1"));

  // Archive it
  tracker.transition(STREAM_STATES.CONNECTING);
  tracker.transition(STREAM_STATES.STREAMING);
  tracker.transition(STREAM_STATES.COMPLETED);
  archiveStream("reg-1");

  const afterArchive = getActiveStreams();
  assert.ok(!afterArchive.some((s) => s.requestId === "reg-1"));
});
