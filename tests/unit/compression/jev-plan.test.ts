/**
 * Unit tests: Jev compression-plan refinement — precedence safety (operator
 * layers untouched), lossy policy re-application, skip/intensity decisions and
 * fail-open behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";

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
  "TYPESAFE_API_KEY",
  "TYPESAFE_BASE_URL",
];
const savedEnv = new Map<string, string | undefined>();
for (const key of JEV_ENV_KEYS) savedEnv.set(key, process.env[key]);

const { adjustCompressionPlanWithJev } =
  await import("../../../open-sse/services/compression/jevPlan.ts");
const { DEFAULT_COMPRESSION_CONFIG } =
  await import("../../../open-sse/services/compression/types.ts");
const { __resetJevClientForTests, __resetJevRuntimeCacheForTests } =
  await import("../../../open-sse/services/jev/index.ts");
const { SAFE_DEFAULT_PIPELINE } =
  await import("../../../open-sse/services/compression/lossyRequestPolicy.ts");

type CompressionConfig = Parameters<typeof adjustCompressionPlanWithJev>[0]["config"];
type DerivedPlan = Parameters<typeof adjustCompressionPlanWithJev>[0]["plan"];

let fetchCalls: Array<{ url: string; init: RequestInit | undefined }> = [];
const originalFetch = globalThis.fetch;

function clearJevEnv(): void {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
}

function useCredential(features = "compression"): void {
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_BASE_URL = "https://jev.test";
  process.env.OMNIROUTE_JEV_FEATURES = features;
}

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function stubDecision(answers: {
  lowBenefit: number;
  preferred: string;
  preferredConfidence: number;
  intensity?: string;
  intensityConfidence?: number;
}): void {
  globalThis.fetch = (async (...args: unknown[]) => {
    fetchCalls.push({ url: String(args[0]), init: args[1] as RequestInit });
    return jsonResponse({
      answers: {
        lowBenefit: { type: "noul", noul: answers.lowBenefit },
        preferred: {
          type: "choice",
          choice: answers.preferred,
          confidence: answers.preferredConfidence,
          probabilities: {},
        },
        intensity: {
          type: "choice",
          choice: answers.intensity ?? "standard",
          confidence: answers.intensityConfidence ?? 0.5,
          probabilities: {},
        },
      },
    });
  }) as typeof fetch;
}

function basePlan(overrides: Partial<DerivedPlan> = {}): DerivedPlan {
  return {
    mode: "lite",
    stackedPipeline: [],
    source: "default",
    ...overrides,
  } as DerivedPlan;
}

function baseConfig(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    defaultMode: "lite",
    ...overrides,
  } as CompressionConfig;
}

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    plan: basePlan(),
    config: baseConfig(),
    body: { messages: [{ role: "user", content: "please compress this ".repeat(40) }] },
    estimatedTokens: 2_000,
    header: null,
    adaptiveEngaged: false,
    log: null,
    ...overrides,
  } as Parameters<typeof adjustCompressionPlanWithJev>[0];
}

test.beforeEach(() => {
  clearJevEnv();
  fetchCalls = [];
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

test("feature disabled: plan and config unchanged, zero fetch calls", async () => {
  globalThis.fetch = (async () => {
    throw new Error("must not fetch");
  }) as typeof fetch;
  const input = baseInput();
  const result = await adjustCompressionPlanWithJev(input);
  assert.equal(result.plan, input.plan);
  assert.equal(result.config, input.config);
  assert.equal(result.adjustment, null);
  assert.equal(fetchCalls.length, 0);
});

test("operator layers win: a request-header plan is never consulted or changed", async () => {
  useCredential();
  globalThis.fetch = (async () => {
    throw new Error("must not fetch");
  }) as typeof fetch;
  const input = baseInput({ plan: basePlan({ source: "request-header" }) });
  const result = await adjustCompressionPlanWithJev(input);
  assert.equal(result.plan, input.plan);
  assert.equal(result.adjustment, null);
  assert.equal(fetchCalls.length, 0);
});

test("low-benefit judgment switches the plan off", async () => {
  useCredential();
  stubDecision({ lowBenefit: 0.9, preferred: "lite", preferredConfidence: 0.9 });
  const result = await adjustCompressionPlanWithJev(baseInput());
  assert.equal(result.plan.mode, "off");
  assert.equal(result.plan.stackedPipeline.length, 0);
  assert.equal(result.adjustment?.reason, "jev-low-benefit");
});

test("preferred=none with confidence switches the plan off", async () => {
  useCredential();
  stubDecision({ lowBenefit: 0.1, preferred: "none", preferredConfidence: 0.85 });
  const result = await adjustCompressionPlanWithJev(baseInput());
  assert.equal(result.plan.mode, "off");
  assert.equal(result.adjustment?.reason, "jev-none");
});

test("preferred=lite is applied directly", async () => {
  useCredential();
  stubDecision({
    lowBenefit: 0.1,
    preferred: "lite",
    preferredConfidence: 0.9,
    intensityConfidence: 0.1,
  });
  const result = await adjustCompressionPlanWithJev(baseInput());
  assert.equal(result.plan.mode, "lite");
  assert.equal(result.adjustment?.reason, "jev-preferred");
});

test("a lossy preference without opt-in is downgraded by the lossy policy", async () => {
  useCredential();
  stubDecision({ lowBenefit: 0.1, preferred: "rtk", preferredConfidence: 0.95 });
  const result = await adjustCompressionPlanWithJev(baseInput());
  assert.equal(result.plan.mode, "stacked");
  assert.deepEqual(result.plan.stackedPipeline, [...SAFE_DEFAULT_PIPELINE]);
});

test("a lossy preference WITH allow-lossy opt-in is applied, and RTK intensity lands", async () => {
  useCredential();
  stubDecision({
    lowBenefit: 0.1,
    preferred: "rtk",
    preferredConfidence: 0.95,
    intensity: "aggressive",
    intensityConfidence: 0.8,
  });
  const result = await adjustCompressionPlanWithJev(baseInput({ header: "allow-lossy" }));
  assert.equal(result.plan.mode, "rtk");
  assert.equal(result.config.rtkConfig?.intensity, "aggressive");
  assert.equal(result.adjustment?.intensity, "aggressive");
});

test("an engaged adaptive context-budget plan is never overridden", async () => {
  useCredential();
  globalThis.fetch = (async () => {
    throw new Error("must not fetch");
  }) as typeof fetch;
  const input = baseInput({ adaptiveEngaged: true });
  const result = await adjustCompressionPlanWithJev(input);
  assert.equal(result.plan, input.plan);
  assert.equal(fetchCalls.length, 0);
});

test("a decision-model failure leaves the plan identical (fail-open)", async () => {
  useCredential();
  globalThis.fetch = (async (...args: unknown[]) => {
    fetchCalls.push({ url: String(args[0]), init: args[1] as RequestInit });
    return jsonResponse({ error: "bad" }, 400);
  }) as typeof fetch;
  const input = baseInput();
  const result = await adjustCompressionPlanWithJev(input);
  assert.equal(result.plan, input.plan);
  assert.equal(result.config, input.config);
  assert.equal(result.adjustment, null);
  assert.equal(fetchCalls.length, 1);
});
