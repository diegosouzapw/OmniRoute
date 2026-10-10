/**
 * Unit tests: Jev decision layer — config gating, fail-open client
 * (cache, retries, circuit breaker, timeout) and typed decision parsing.
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

const {
  askJev,
  getJevClientStats,
  __resetJevClientForTests,
  __resetJevRuntimeCacheForTests,
  parseJevFeatures,
  isJevFeatureEnabled,
  resolveJevRuntime,
  decideRoute,
  decideCompression,
  decideToolSelection,
  sampleText,
  noulProbability,
  choiceLabel,
  alignAnswersToQuestions,
  resolveChatCompletionsUrl,
  isDecisionModelRequest,
  isSelfGatewayBaseUrl,
  readJevEnvConfig,
  DECISION_MODEL_REQUEST_HEADER,
  TOOL_SELECTION_NONE,
  // The routing lane's surface is asserted in the barrel test below via its own
  // import, so it is deliberately not destructured here.
} = await import("../../../open-sse/services/jev/index.ts");

test("barrel exports the whole decision surface (routing lane + every *Input type)", async () => {
  // Guards a real gap: the routing lane was implemented but never re-exported,
  // so its helpers were only reachable via a deep "./routing.ts" import.
  const surface = await import("../../../open-sse/services/jev/index.ts");
  for (const name of [
    "askJev",
    "decideRoute",
    "decideCompression",
    "decideCacheRead",
    "decideToolInput",
    "decideToolOutput",
    "decideToolSelection",
    "decideWorkflowStep",
    "decideRouteForRequest",
    "escalateHintWithJev",
    "filterTargetsByJevSafety",
    "readSafetyExclusions",
    "isDecisionModelRequest",
    "isSelfGatewayBaseUrl",
  ]) {
    assert.equal(typeof surface[name], "function", `${name} must be exported from the barrel`);
  }
  assert.equal(
    typeof surface.JEV_SAFETY_RISK_MIN,
    "number",
    "JEV_SAFETY_RISK_MIN must be exported"
  );
  assert.equal(
    surface.DECISION_MODEL_REQUEST_HEADER,
    "x-omniroute-decision-model",
    "the marker constant must be exported"
  );
  assert.equal(surface.DECISION_ADAPTERS && typeof surface.DECISION_ADAPTERS.openai, "object");
  // Type-only exports cannot be asserted at runtime; a tsc-level import below
  // keeps them honest.
  const typeCheck: import("../../../open-sse/services/jev/index.ts").ToolSelectionDecisionInput = {
    query: "q",
    candidates: [{ name: "n", description: "d" }],
  };
  assert.deepEqual(typeCheck.candidates[0], { name: "n", description: "d" });
});

type FetchCall = { url: string; init: RequestInit | undefined };
let fetchCalls: FetchCall[] = [];
const originalFetch = globalThis.fetch;

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function clearJevEnv(): void {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
}

function useCredential(): void {
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_BASE_URL = "https://jev.test";
  process.env.OMNIROUTE_JEV_TIMEOUT_MS = "2000";
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

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

test("parseJevFeatures: empty/all enable every lane, csv enables a subset, unknown tokens ignored", () => {
  assert.equal(parseJevFeatures(undefined).routing, true);
  assert.equal(parseJevFeatures(undefined).mcp, true);
  assert.deepEqual(parseJevFeatures("routing, compression"), { routing: true, compression: true });
  assert.deepEqual(parseJevFeatures("routing,bogus"), { routing: true });
});

test("isJevFeatureEnabled: master off kills every lane; csv subset gates individual lanes", () => {
  process.env.OMNIROUTE_JEV_ENABLED = "off";
  assert.equal(isJevFeatureEnabled("routing"), false);

  process.env.OMNIROUTE_JEV_ENABLED = "auto";
  process.env.OMNIROUTE_JEV_FEATURES = "routing";
  // #15641: `auto` is not an opt-in — only `on` engages a lane.
  assert.equal(isJevFeatureEnabled("routing"), false);

  process.env.OMNIROUTE_JEV_ENABLED = "on";
  assert.equal(isJevFeatureEnabled("routing"), true);
  assert.equal(isJevFeatureEnabled("mcp"), false);
});

test("resolveJevRuntime: null without a credential", async () => {
  const runtime = await resolveJevRuntime();
  assert.equal(runtime, null);
});

test("resolveJevRuntime: env credential resolves with defaults", async () => {
  useCredential();
  const runtime = await resolveJevRuntime();
  assert.ok(runtime);
  assert.equal(runtime.apiKey, "test-key");
  assert.equal(runtime.baseUrl, "https://jev.test");
  assert.equal(runtime.model, "jev-latest");
  assert.equal(runtime.wire, "typesafe");
  assert.equal(runtime.blockThreshold, 0.9);
});

test("resolveJevRuntime: openai wire without a model stays inert until the model is set", async () => {
  useCredential();
  process.env.OMNIROUTE_JEV_WIRE = "openai";
  assert.equal(await resolveJevRuntime(), null);

  process.env.OMNIROUTE_JEV_MODEL = "my-classifier";
  __resetJevRuntimeCacheForTests();
  const runtime = await resolveJevRuntime();
  assert.ok(runtime);
  assert.equal(runtime.wire, "openai");
  assert.equal(runtime.model, "my-classifier");
});

test("resolveJevRuntime: a non-typesafe provider selects the openai wire and its registry base URL", async () => {
  process.env.OMNIROUTE_JEV_PROVIDER = "groq";
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_MODEL = "llama-3.1-8b-instant";
  const runtime = await resolveJevRuntime();
  assert.ok(runtime);
  assert.equal(runtime.wire, "openai");
  assert.ok(runtime.baseUrl.includes("groq"));
});

test("resolveChatCompletionsUrl tolerates roots, /v1 roots and full paths", () => {
  assert.equal(resolveChatCompletionsUrl("https://x.test"), "https://x.test/v1/chat/completions");
  assert.equal(
    resolveChatCompletionsUrl("https://x.test/v1"),
    "https://x.test/v1/chat/completions"
  );
  assert.equal(
    resolveChatCompletionsUrl("https://x.test/v1/chat/completions"),
    "https://x.test/v1/chat/completions"
  );
});

test("alignAnswersToQuestions: missing confidence defaults to 0, invalid answers are dropped", () => {
  const answers = alignAnswersToQuestions(
    {
      a: { choice: "lite" },
      b: { noul: 2 },
      c: { nonsense: true },
      d: { noul: "0.4" },
    },
    {
      a: { type: "choice", instructions: "", criteria: { lite: "x" } },
      b: { type: "noul", instructions: "" },
      c: { type: "noul", instructions: "" },
      d: { type: "noul", instructions: "" },
    }
  );
  assert.equal(choiceLabel(answers.a)?.confidence, 0);
  assert.equal(noulProbability(answers.b), 1);
  assert.equal(answers.c, undefined);
  assert.equal(noulProbability(answers.d), 0.4);
});

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

test("askJev: returns null and never calls fetch without a credential", async () => {
  globalThis.fetch = (async (...args: unknown[]) => {
    fetchCalls.push({ url: String(args[0]), init: args[1] as RequestInit });
    return jsonResponse({ answers: {} });
  }) as typeof fetch;
  const result = await askJev("state", { q: { type: "noul", instructions: "?" } });
  assert.equal(result, null);
  assert.equal(fetchCalls.length, 0);
});

test("askJev: parses answers, sends the wire contract, and caches identical decisions", async () => {
  useCredential();
  globalThis.fetch = (async (...args: unknown[]) => {
    fetchCalls.push({ url: String(args[0]), init: args[1] as RequestInit });
    return jsonResponse({ model: "jev-test", answers: { q: { type: "noul", noul: 0.9 } } });
  }) as typeof fetch;

  const questions = { q: { type: "noul" as const, instructions: "Is it?" } };
  const first = await askJev("state-a", questions);
  assert.ok(first);
  assert.equal(first.model, "jev-test");
  assert.equal(noulProbability(first.answers.q), 0.9);
  assert.equal(first.cached, false);

  const second = await askJev("state-a", questions);
  assert.ok(second);
  assert.equal(second.cached, true);
  assert.equal(fetchCalls.length, 1);

  const call = fetchCalls[0];
  assert.equal(call.url, "https://jev.test/v1/systemone");
  assert.equal((call.init?.headers as Record<string, string>).Authorization, "Bearer test-key");
  const sentBody = JSON.parse(String(call.init?.body)) as Record<string, unknown>;
  assert.equal(sentBody.state, "state-a");
  assert.equal(sentBody.model, "jev-latest");
  assert.deepEqual(sentBody.questions, questions);
  assert.equal(
    (call.init?.headers as Record<string, string> | undefined)?.[DECISION_MODEL_REQUEST_HEADER],
    "1",
    "typesafe wire must stamp the decision-request marker"
  );
});

test("askJev: openai wire sends chat completions and parses fenced JSON answers", async () => {
  useCredential();
  process.env.OMNIROUTE_JEV_WIRE = "openai";
  process.env.OMNIROUTE_JEV_MODEL = "my-classifier";
  globalThis.fetch = (async (...args: unknown[]) => {
    fetchCalls.push({ url: String(args[0]), init: args[1] as RequestInit });
    return jsonResponse({
      model: "my-classifier",
      usage: { prompt_tokens: 210, completion_tokens: 40 },
      choices: [
        {
          message: {
            content:
              '```json\n{"answers":{"q":{"noul":0.7},"pick":{"choice":"lite","confidence":0.8}}}\n```',
          },
        },
      ],
    });
  }) as typeof fetch;

  const result = await askJev("state-openai", {
    q: { type: "noul", instructions: "Is it?" },
    pick: { type: "choice", instructions: "Which?", criteria: { lite: "a", rtk: "b" } },
  });
  assert.ok(result);
  assert.equal(result.model, "my-classifier");
  assert.equal(noulProbability(result.answers.q), 0.7);
  assert.equal(choiceLabel(result.answers.pick)?.label, "lite");
  assert.equal(fetchCalls[0].url, "https://jev.test/v1/chat/completions");
  const sentBody = JSON.parse(String(fetchCalls[0].init?.body)) as {
    model: string;
    temperature: number;
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(sentBody.model, "my-classifier");
  assert.equal(sentBody.temperature, 0);
  assert.equal(sentBody.messages[0].role, "system");
  assert.ok(sentBody.messages[1].content.includes("state-openai"));
  assert.ok(sentBody.messages[1].content.includes("pick"));
  assert.equal(
    (fetchCalls[0].init?.headers as Record<string, string> | undefined)?.[
      DECISION_MODEL_REQUEST_HEADER
    ],
    "1",
    "openai wire must stamp the decision-request marker"
  );
});

test("askJev: openai wire drops malformed content but stays non-fatal", async () => {
  useCredential();
  process.env.OMNIROUTE_JEV_WIRE = "openai";
  process.env.OMNIROUTE_JEV_MODEL = "my-classifier";
  globalThis.fetch = (async () =>
    jsonResponse({ choices: [{ message: { content: "sorry, no JSON here" } }] })) as typeof fetch;

  const result = await askJev("state-bad-json", { q: { type: "noul", instructions: "?" } });
  assert.ok(result);
  assert.equal(result.answers.q, undefined);
});

test("askJev: retries transient 5xx then succeeds", async () => {
  useCredential();
  let attempt = 0;
  globalThis.fetch = (async () => {
    attempt += 1;
    if (attempt < 3) return jsonResponse({ error: "boom" }, 500);
    return jsonResponse({ answers: { q: { type: "noul", noul: 0.4 } } });
  }) as typeof fetch;

  const result = await askJev("state-retry", { q: { type: "noul", instructions: "?" } });
  assert.ok(result);
  assert.equal(attempt, 3);
  assert.equal(getJevClientStats().retries, 2);
  assert.equal(getJevClientStats().failures, 0);
});

test("askJev: a non-retryable 4xx fails immediately and fails open", async () => {
  useCredential();
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return jsonResponse({ error: "bad request" }, 400);
  }) as typeof fetch;

  const result = await askJev("state-400", { q: { type: "noul", instructions: "?" } });
  assert.equal(result, null);
  assert.equal(calls, 1);
  assert.equal(getJevClientStats().failures, 1);
});

test("askJev: circuit breaker opens after consecutive failures and short-circuits", async () => {
  useCredential();
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return jsonResponse({ error: "bad" }, 400);
  }) as typeof fetch;

  for (let i = 0; i < 5; i += 1) {
    await askJev(`state-breaker-${i}`, { q: { type: "noul", instructions: "?" } });
  }
  assert.equal(calls, 5);
  assert.ok(getJevClientStats().breakerOpenUntil !== null);

  const blocked = await askJev("state-breaker-blocked", {
    q: { type: "noul", instructions: "?" },
  });
  assert.equal(blocked, null);
  assert.equal(calls, 5); // no additional fetch
  assert.equal(getJevClientStats().breakerRejections, 1);
});

test("askJev: a hung upstream times out and fails open", async () => {
  useCredential();
  globalThis.fetch = ((_url: unknown, init?: { signal?: AbortSignal }) => {
    const { promise, reject } = Promise.withResolvers<Response>();
    init?.signal?.addEventListener("abort", () => {
      reject(new DOMException("The operation was aborted.", "AbortError"));
    });
    return promise;
  }) as typeof fetch;

  const result = await askJev(
    "state-timeout",
    { q: { type: "noul", instructions: "?" } },
    { timeoutMs: 60 }
  );
  assert.equal(result, null);
  assert.equal(getJevClientStats().failures, 1);
});

// ---------------------------------------------------------------------------
// Decisions
// ---------------------------------------------------------------------------

test("decideRoute: parses intent/complexity/safety/firstByte from one call", async () => {
  useCredential();
  globalThis.fetch = (async () =>
    jsonResponse({
      model: "jev-test",
      answers: {
        intent: { type: "choice", choice: "code", confidence: 0.8, probabilities: { code: 0.8 } },
        complexity: {
          type: "choice",
          choice: "moderate",
          confidence: 0.7,
          probabilities: { moderate: 0.7 },
        },
        safety: { type: "noul", noul: 0.05 },
        firstByte: { type: "noul", noul: 0.85 },
      },
    })) as typeof fetch;

  const decision = await decideRoute({ prompt: "fix this TypeScript build error" });
  assert.ok(decision);
  assert.equal(decision.intent, "code");
  assert.equal(decision.complexity, "moderate");
  assert.equal(decision.safetyRisk, 0.05);
  assert.equal(decision.longFirstByte, true);
});

test("decideRoute: unparseable label yields null (fail-open)", async () => {
  useCredential();
  globalThis.fetch = (async () =>
    jsonResponse({
      answers: {
        intent: { type: "choice", choice: "banana", confidence: 0.9, probabilities: {} },
        complexity: {
          type: "choice",
          choice: "simple",
          confidence: 0.9,
          probabilities: {},
        },
      },
    })) as typeof fetch;
  const decision = await decideRoute({ prompt: "hello" });
  assert.equal(decision, null);
});

test("decideCompression: parses lowBenefit/preferred/intensity", async () => {
  useCredential();
  globalThis.fetch = (async () =>
    jsonResponse({
      answers: {
        lowBenefit: { type: "noul", noul: 0.2 },
        preferred: {
          type: "choice",
          choice: "rtk",
          confidence: 0.75,
          probabilities: { rtk: 0.75 },
        },
        intensity: {
          type: "choice",
          choice: "standard",
          confidence: 0.6,
          probabilities: { standard: 0.6 },
        },
      },
    })) as typeof fetch;

  const decision = await decideCompression({
    bodyText: "x".repeat(500),
    estimatedTokens: 5_000,
    activeMode: "lite",
  });
  assert.ok(decision);
  assert.equal(decision.lowBenefit, 0.2);
  assert.equal(decision.preferred, "rtk");
  assert.equal(decision.intensity, "standard");
});

test("decideToolSelection: returns the picked tool, null for __none__, and ignores foreign labels", async () => {
  useCredential();
  globalThis.fetch = (async () =>
    jsonResponse({
      answers: {
        tool: {
          type: "choice",
          choice: "omniroute_get_health",
          confidence: 0.9,
          probabilities: {},
        },
      },
    })) as typeof fetch;

  const candidates = [
    { name: "omniroute_get_health", description: "health" },
    { name: "omniroute_list_combos", description: "combos" },
  ];
  const picked = await decideToolSelection({ query: "is the server healthy?", candidates });
  assert.ok(picked);
  assert.equal(picked.tool, "omniroute_get_health");

  __resetJevClientForTests();
  globalThis.fetch = (async () =>
    jsonResponse({
      answers: {
        tool: { type: "choice", choice: TOOL_SELECTION_NONE, confidence: 0.9, probabilities: {} },
      },
    })) as typeof fetch;
  const none = await decideToolSelection({ query: "is the server healthy?", candidates });
  assert.equal(none, null);

  __resetJevClientForTests();
  globalThis.fetch = (async () =>
    jsonResponse({
      answers: {
        tool: { type: "choice", choice: "not-a-candidate", confidence: 0.9, probabilities: {} },
      },
    })) as typeof fetch;
  const foreign = await decideToolSelection({ query: "is the server healthy?", candidates });
  assert.equal(foreign, null);
});

test("sampleText: keeps head and tail with an explicit omission marker", () => {
  const long = "a".repeat(100) + "b".repeat(100);
  const sampled = sampleText(long, 40);
  assert.ok(sampled.startsWith("a"));
  assert.ok(sampled.endsWith("b"));
  assert.ok(sampled.includes("omitted"));
  assert.equal(sampleText("short", 40), "short");
});

test("isDecisionModelRequest: reads both Headers and the plain record clientRawRequest builds", () => {
  // Header instance (the .get() path).
  assert.equal(isDecisionModelRequest(new Headers({ "x-omniroute-decision-model": "1" })), true);
  assert.equal(isDecisionModelRequest(new Headers({ "x-omniroute-decision-model": "0" })), false);
  assert.equal(isDecisionModelRequest(new Headers()), false);

  // Plain record — exactly what buildClientRawRequest returns
  // (Object.fromEntries(request.headers.entries())), lower-cased keys.
  assert.equal(
    isDecisionModelRequest({
      "x-omniroute-decision-model": "1",
      "content-type": "application/json",
    }),
    true
  );
  // Mixed case must still match (record keys are normalized upstream, but a
  // hand-built record may not be).
  assert.equal(isDecisionModelRequest({ "X-OmniRoute-Decision-Model": "1" }), true);
  assert.equal(isDecisionModelRequest({ "x-omniroute-decision-model": "0" }), false);
  assert.equal(isDecisionModelRequest({ "content-type": "application/json" }), false);

  assert.equal(isDecisionModelRequest(null), false);
  assert.equal(isDecisionModelRequest(undefined), false);
  assert.equal(isDecisionModelRequest({}), false);
});

test("isSelfGatewayBaseUrl: only loopback + the server port counts as self", () => {
  const previousPort = process.env.PORT;
  try {
    delete process.env.PORT;
    assert.equal(isSelfGatewayBaseUrl("http://127.0.0.1:20128/v1"), true);
    assert.equal(isSelfGatewayBaseUrl("http://localhost:20128/v1"), true);
    // A different local port is a DIFFERENT service (ollama, vLLM) — not a self-loop.
    assert.equal(isSelfGatewayBaseUrl("http://127.0.0.1:11434/v1"), false);
    assert.equal(isSelfGatewayBaseUrl("http://192.168.1.10:20128/v1"), false);
    assert.equal(isSelfGatewayBaseUrl("https://api.typesafe.ai"), false);
    process.env.PORT = "9999";
    assert.equal(isSelfGatewayBaseUrl("http://127.0.0.1:9999/v1"), true);
    assert.equal(isSelfGatewayBaseUrl("http://127.0.0.1:20128/v1"), false);
  } finally {
    if (previousPort === undefined) delete process.env.PORT;
    else process.env.PORT = previousPort;
  }
});

test("OMNIROUTE_JEV_TIMEOUT_MS: in-range honored, out-of-range CLAMPED (not silently dropped)", () => {
  const previous = process.env.OMNIROUTE_JEV_TIMEOUT_MS;
  try {
    delete process.env.OMNIROUTE_JEV_TIMEOUT_MS;
    assert.equal(readJevEnvConfig().timeoutMs, 4000, "unset -> default");

    process.env.OMNIROUTE_JEV_TIMEOUT_MS = "45000";
    assert.equal(readJevEnvConfig().timeoutMs, 45000, "in-range honored");

    // A slow-by-design classifier (LLM behind the gateway) legitimately wants
    // more than the OLD 60 s ceiling: honored, not silently cut to 4 s.
    process.env.OMNIROUTE_JEV_TIMEOUT_MS = "120000";
    assert.equal(readJevEnvConfig().timeoutMs, 120_000, "above old ceiling -> honored as-is");

    process.env.OMNIROUTE_JEV_TIMEOUT_MS = "999999";
    assert.equal(readJevEnvConfig().timeoutMs, 300_000, "absurd value -> max clamp");

    process.env.OMNIROUTE_JEV_TIMEOUT_MS = "10";
    assert.equal(readJevEnvConfig().timeoutMs, 250, "tiny value -> min clamp");

    process.env.OMNIROUTE_JEV_TIMEOUT_MS = "not-a-number";
    assert.equal(readJevEnvConfig().timeoutMs, 4000, "unparseable -> default");
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_JEV_TIMEOUT_MS;
    else process.env.OMNIROUTE_JEV_TIMEOUT_MS = previous;
    __resetJevRuntimeCacheForTests();
  }
});

test("clamp warning is deduped per distinct value (hot-path gates re-parse every call)", () => {
  const previous = process.env.OMNIROUTE_JEV_TIMEOUT_MS;
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(String(args[0]));
  };
  try {
    __resetJevRuntimeCacheForTests();
    // Must be OUT OF RANGE to warn: 120000 is inside the 250-300000 window now.
    process.env.OMNIROUTE_JEV_TIMEOUT_MS = "999999";
    // readJevEnvConfig is called on EVERY hot-path gate, not just the 60s cache refresh.
    for (let i = 0; i < 5; i += 1) readJevEnvConfig();
    const clampWarnings = warnings.filter((w) => w.includes("is out of range"));
    assert.equal(clampWarnings.length, 1, "same bad value must warn exactly once");

    // A different bad value warns again.
    process.env.OMNIROUTE_JEV_TIMEOUT_MS = "10";
    readJevEnvConfig();
    assert.equal(
      warnings.filter((w) => w.includes("is out of range")).length,
      2,
      "a different bad value warns"
    );
  } finally {
    console.warn = originalWarn;
    if (previous === undefined) delete process.env.OMNIROUTE_JEV_TIMEOUT_MS;
    else process.env.OMNIROUTE_JEV_TIMEOUT_MS = previous;
    __resetJevRuntimeCacheForTests();
  }
});

test("answer extractors reject mismatched shapes", () => {
  assert.equal(noulProbability(undefined), null);
  assert.equal(
    noulProbability({ type: "choice", choice: "x", confidence: 1, probabilities: {} }),
    null
  );
  assert.equal(choiceLabel({ type: "noul", noul: 0.5 }), null);
  assert.equal(choiceLabel({ type: "choice", choice: "", confidence: 1, probabilities: {} }), null);
});
