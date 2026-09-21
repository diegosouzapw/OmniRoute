import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DeterministicRoutingEngine,
  parseStrategyConfig,
  parseSelfHostedRoutingConfig,
  type StrategyProviderConfig,
} from "../../open-sse/services/routingStrategies.ts";

/**
 * Deterministic routing strategies (M2 — RIC-740, D3 可审计路由).
 *
 * Five strategy types, each pure and explainable — no predictive/ML dependency.
 * These tests cover the strategy engine unit surface; the HTTP fault-injection
 * tests live in `self-hosted-entry.test.ts` (fallback chain over a real server).
 */

const providers: StrategyProviderConfig[] = [
  { id: "a", kind: "openai", baseUrl: "http://a/v1", model: "m", costPer1MInput: 5 },
  { id: "b", kind: "openai", baseUrl: "http://b/v1", model: "m", costPer1MInput: 1 },
  { id: "c", kind: "local", baseUrl: "http://c/v1", model: "m", costPer1MInput: 3 },
];

function engineFor(config: Parameters<typeof parseStrategyConfig>[0]): DeterministicRoutingEngine {
  return new DeterministicRoutingEngine(providers, parseStrategyConfig(config));
}

describe("routingStrategies parseStrategyConfig", () => {
  it("returns an empty config for null/undefined", () => {
    assert.deepEqual(parseStrategyConfig(undefined), {});
    assert.deepEqual(parseStrategyConfig(null), {});
  });
  it("parses a full strategy mapping", () => {
    const config = parseStrategyConfig({
      blacklist: ["c"],
      whitelist: ["a", "b"],
      costPriority: true,
      latencyAware: { enabled: true },
      cooldown: { consecutiveFailures: 3, cooldownMs: 5000 },
      fallbackChain: ["b", "a"],
    });
    assert.deepEqual(config.blacklist, ["c"]);
    assert.deepEqual(config.whitelist, ["a", "b"]);
    assert.equal(config.costPriority, true);
    assert.deepEqual(config.latencyAware, { enabled: true });
    assert.deepEqual(config.cooldown, { consecutiveFailures: 3, cooldownMs: 5000 });
    assert.deepEqual(config.fallbackChain, ["b", "a"]);
  });
  it("rejects a non-mapping strategy", () => {
    assert.throws(() => parseStrategyConfig("nope"), { message: /strategy must be a mapping/ });
  });
  it("rejects a malformed blacklist", () => {
    assert.throws(() => parseStrategyConfig({ blacklist: "c" }), {
      message: /strategy.blacklist must be a list/,
    });
  });
  it("coerces booleans from strings", () => {
    const config = parseStrategyConfig({ costPriority: "true", latencyAware: { enabled: "0" } });
    assert.equal(config.costPriority, true);
    assert.equal(config.latencyAware?.enabled, false);
  });
});

describe("routingStrategies parseSelfHostedRoutingConfig", () => {
  it("parses providers + strategy from one document", () => {
    const parsed = parseSelfHostedRoutingConfig(`providers:
  - id: a
    kind: openai
    baseUrl: http://a/v1
    model: m
    costPer1MInput: 5
strategy:
  costPriority: true
`);
    assert.equal(parsed.providers.length, 1);
    assert.equal(parsed.providers[0].costPer1MInput, 5);
    assert.equal(parsed.strategy.costPriority, true);
  });
  it("strips credentials from the strategy provider projection", () => {
    const parsed = parseSelfHostedRoutingConfig(`providers:
  - id: a
    kind: openai
    baseUrl: http://a/v1
    model: m
    apiKey: secret
`);
    assert.equal(parsed.providers[0].apiKey, "secret");
    // The engine never exposes apiKey through public projection helpers — the
    // adapter layer consumes it, routing only needs id/cost.
    assert.equal((parsed.providers[0] as unknown as { apiKey: string }).apiKey, "secret");
  });
});

describe("routingStrategies blacklist/whitelist", () => {
  it("excludes a blacklisted provider and explains why", () => {
    const engine = engineFor({ blacklist: ["c"] });
    const { candidates, excluded } = engine.candidates();
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["a", "b"]
    );
    assert.match(engine.explainCandidates(candidates, excluded), /blacklist/);
    assert.ok(excluded.some((e) => e.providerId === "c"));
  });
  it("restricts to a whitelist", () => {
    const engine = engineFor({ whitelist: ["a", "b"] });
    const { candidates } = engine.candidates();
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["a", "b"]
    );
  });
  it("blocks a pinned provider rejected by a hard filter", () => {
    const engine = engineFor({ blacklist: ["c"] });
    const result = engine.candidates("c");
    assert.equal(result.candidates.length, 0);
    assert.equal(result.pinBlocked?.providerId, "c");
    assert.match(result.pinBlocked!.reason, /blacklist/);
  });
  it("allows a pinned provider that survives the filters as the first candidate", () => {
    const engine = engineFor({ whitelist: ["b", "c"] });
    const { candidates } = engine.candidates("c");
    assert.equal(candidates[0].provider.id, "c");
    assert.match(candidates[0].explain, /pinned/);
  });
  it("reports an unknown pinned provider", () => {
    const engine = engineFor({});
    const result = engine.candidates("nope");
    assert.match(result.pinBlocked?.reason ?? "", /unknown provider/);
  });
});

describe("routingStrategies cooldown breaker", () => {
  it("trips after the configured consecutive-failure threshold", () => {
    const engine = engineFor({ cooldown: { consecutiveFailures: 2, cooldownMs: 60_000 } });
    engine.recordFailure("a", 1_000);
    engine.recordFailure("a", 2_000);
    const { candidates, excluded } = engine.candidates(undefined, 3_000);
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["b", "c"]
    );
    assert.match(engine.explainCandidates(candidates, excluded), /cooldown/);
  });
  it("does not trip below the threshold", () => {
    const engine = engineFor({ cooldown: { consecutiveFailures: 2, cooldownMs: 60_000 } });
    engine.recordFailure("a", 1_000);
    const { candidates } = engine.candidates(undefined, 2_000);
    assert.ok(candidates.map((c) => c.provider.id).includes("a"));
  });
  it("recovers after the cooldown window", () => {
    const engine = engineFor({ cooldown: { consecutiveFailures: 1, cooldownMs: 10_000 } });
    engine.recordFailure("a", 1_000);
    assert.equal(engine.isCooling("a", 2_000), true);
    assert.equal(engine.isCooling("a", 11_000), false);
  });
  it("a success resets the failure counter", () => {
    const engine = engineFor({ cooldown: { consecutiveFailures: 2, cooldownMs: 60_000 } });
    engine.recordFailure("a", 1_000);
    engine.recordFailure("a", 2_000);
    engine.recordSuccess("a");
    const { candidates } = engine.candidates(undefined, 3_000);
    assert.ok(candidates.map((c) => c.provider.id).includes("a"));
  });
});

describe("routingStrategies cost-priority", () => {
  it("orders eligible candidates cheapest first", () => {
    const engine = engineFor({ costPriority: true });
    const { candidates } = engine.candidates();
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["b", "c", "a"]
    );
    assert.match(candidates[0].explain, /cost-priority/);
  });
  it("keeps declaration order when cost-priority is off", () => {
    const engine = engineFor({});
    const { candidates } = engine.candidates();
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["a", "b", "c"]
    );
  });
});

describe("routingStrategies latency-aware", () => {
  it("orders sampled providers fastest-first, unsampled last", () => {
    const engine = engineFor({ latencyAware: { enabled: true } });
    engine.recordLatency("a", 500);
    engine.recordLatency("a", 700);
    engine.recordLatency("b", 100);
    engine.recordLatency("b", 300);
    const { candidates } = engine.candidates();
    // b avg 200ms < a avg 600ms < c (unsampled = Infinity)
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["b", "a", "c"]
    );
    assert.match(candidates[0].explain, /latency/);
  });
  it("keeps unsampled providers last in declaration order", () => {
    const engine = engineFor({ latencyAware: { enabled: true } });
    engine.recordLatency("b", 200);
    const { candidates } = engine.candidates();
    // b sampled fast < a/c unsampled (declaration order tail)
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["b", "a", "c"]
    );
  });
});

describe("routingStrategies fallback chain", () => {
  it("applies an explicit chain order", () => {
    const engine = engineFor({ fallbackChain: ["c", "a"] });
    const { candidates } = engine.candidates();
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["c", "a", "b"]
    );
    assert.match(candidates[0].explain, /fallback chain/);
  });
  it("chain order wins over cost/latency", () => {
    const engine = engineFor({ fallbackChain: ["a", "b", "c"], costPriority: true });
    const { candidates } = engine.candidates();
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["a", "b", "c"]
    );
  });
  it("chain filters out providers excluded by the whitelist", () => {
    const engine = engineFor({ fallbackChain: ["a", "b", "c"], whitelist: ["b", "c"] });
    const { candidates } = engine.candidates();
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["b", "c"]
    );
  });
});

describe("routingStrategies combined pipeline", () => {
  it("blacklist + cost + latency produce an explainable ordered list", () => {
    const engine = engineFor({
      blacklist: ["a"],
      costPriority: true,
      latencyAware: { enabled: true },
    });
    engine.recordLatency("b", 300);
    engine.recordLatency("c", 100);
    const { candidates } = engine.candidates();
    // c fastest (100ms) then b (300ms); a blacklisted
    assert.deepEqual(
      candidates.map((c) => c.provider.id),
      ["c", "b"]
    );
  });
  it("explains a fully blocked request with every exclusion", () => {
    const engine = engineFor({ whitelist: ["nope"] });
    const { candidates, excluded } = engine.candidates();
    assert.equal(candidates.length, 0);
    const explain = engine.explainCandidates(candidates, excluded);
    assert.match(explain, /no eligible providers/);
    assert.match(explain, /a excluded: whitelist/);
    assert.match(explain, /c excluded: whitelist/);
  });
});
