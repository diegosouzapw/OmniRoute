/**
 * Unit tests: Jev routing helpers — intent override gating, complexity
 * escalation (raise-only), safety target filtering and fail-open behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";
import type { RouteDecision } from "../../../open-sse/services/jev/decisions.ts";
import type { RoutingHint } from "../../../open-sse/services/manifestAdapter.ts";

const JEV_ENV_KEYS = [
  "OMNIROUTE_JEV_ENABLED",
  "OMNIROUTE_JEV_API_KEY",
  "OMNIROUTE_JEV_BASE_URL",
  "OMNIROUTE_JEV_WIRE",
  "OMNIROUTE_JEV_PROVIDER",
  "OMNIROUTE_JEV_MODEL",
  "OMNIROUTE_JEV_TIMEOUT_MS",
  "OMNIROUTE_JEV_FEATURES",
  "OMNIROUTE_JEV_BLOCK_THRESHOLD",
  "OMNIROUTE_JEV_SAFETY_EXCLUDE",
  "TYPESAFE_API_KEY",
  "TYPESAFE_BASE_URL",
];
const savedEnv = new Map<string, string | undefined>();
for (const key of JEV_ENV_KEYS) savedEnv.set(key, process.env[key]);

const { decideRouteForRequest, escalateHintWithJev, filterTargetsByJevSafety } =
  await import("../../../open-sse/services/jev/routing.ts");
const { __resetJevClientForTests, __resetJevRuntimeCacheForTests } =
  await import("../../../open-sse/services/jev/index.ts");

let fetchCalls = 0;
const originalFetch = globalThis.fetch;

function clearJevEnv(): void {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
}

function useCredential(features = "routing"): void {
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_BASE_URL = "https://jev.test";
  process.env.OMNIROUTE_JEV_FEATURES = features;
}

function stubRouteDecision(complexity: string, safetyRisk: number): void {
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return {
      ok: true,
      status: 200,
      json: async () => ({
        answers: {
          intent: { type: "choice", choice: "code", confidence: 0.9, probabilities: {} },
          complexity: { type: "choice", choice: complexity, confidence: 0.9, probabilities: {} },
          safety: { type: "noul", noul: safetyRisk },
          firstByte: { type: "noul", noul: 0.1 },
        },
      }),
      text: async () => "",
    } as unknown as Response;
  }) as typeof fetch;
}

function hintAt(tier: string): RoutingHint {
  return { recommendedMinTier: tier } as unknown as RoutingHint;
}

function decisionWith(complexity: string, safetyRisk = 0): RouteDecision {
  return {
    intent: "code",
    intentConfidence: 0.9,
    complexity,
    complexityConfidence: 0.9,
    safetyRisk,
    longFirstByte: false,
    model: "test",
    latencyMs: 1,
  } as RouteDecision;
}

test.beforeEach(() => {
  clearJevEnv();
  fetchCalls = 0;
  __resetJevClientForTests();
  __resetJevRuntimeCacheForTests();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearJevEnv();
  for (const [key, value] of savedEnv) if (value !== undefined) process.env[key] = value;
  __resetJevClientForTests();
  __resetJevRuntimeCacheForTests();
});

test("decideRouteForRequest: lane off resolves null without any fetch", async () => {
  globalThis.fetch = (async () => {
    throw new Error("must not fetch");
  }) as typeof fetch;
  process.env.OMNIROUTE_JEV_FEATURES = "compression";
  assert.equal(await decideRouteForRequest({ prompt: "hello" }), null);
  assert.equal(fetchCalls, 0);
});

test("decideRouteForRequest: lane on returns the parsed decision", async () => {
  useCredential();
  stubRouteDecision("hard", 0.1);
  const decision = await decideRouteForRequest({ prompt: "design a distributed lock" });
  assert.ok(decision);
  assert.equal(decision.intent, "code");
  assert.equal(decision.complexity, "hard");
  assert.equal(fetchCalls, 1);
});

test("escalateHintWithJev: raises the tier floor, never lowers it", () => {
  assert.equal(
    escalateHintWithJev(hintAt("free"), decisionWith("hard"))?.recommendedMinTier,
    "premium"
  );
  assert.equal(
    escalateHintWithJev(hintAt("cheap"), decisionWith("moderate"))?.recommendedMinTier,
    "cheap"
  );
  assert.equal(
    escalateHintWithJev(hintAt("premium"), decisionWith("trivial"))?.recommendedMinTier,
    "premium"
  );
});

test("escalateHintWithJev: null hint or null decision is a no-op", () => {
  assert.equal(escalateHintWithJev(null, decisionWith("hard")), null);
  const hint = hintAt("cheap");
  assert.equal(escalateHintWithJev(hint, null), hint);
});

test("filterTargetsByJevSafety: high risk drops matching targets only", () => {
  process.env.OMNIROUTE_JEV_SAFETY_EXCLUDE = "uncensored,free-proxy";
  const targets = [
    { provider: "acme", modelStr: "uncensored-70b" },
    { provider: "free-proxy", modelStr: "llama" },
    { provider: "acme", modelStr: "gpt-5.5" },
  ];
  const kept = filterTargetsByJevSafety(targets, decisionWith("moderate", 0.9));
  assert.deepEqual(kept, [{ provider: "acme", modelStr: "gpt-5.5" }]);
});

test("filterTargetsByJevSafety: low risk, no patterns, or empty result keeps the pool", () => {
  const targets = [{ provider: "a", modelStr: "b" }];
  assert.equal(filterTargetsByJevSafety(targets, decisionWith("moderate", 0.2)).length, 1);

  process.env.OMNIROUTE_JEV_SAFETY_EXCLUDE = "a/b";
  assert.equal(filterTargetsByJevSafety(targets, decisionWith("moderate", 0.9)).length, 1);

  process.env.OMNIROUTE_JEV_SAFETY_EXCLUDE = "";
  assert.equal(filterTargetsByJevSafety(targets, decisionWith("moderate", 0.9)).length, 1);
});
