/**
 * Unit tests: the `jev_decide` builtin skill — lane gating, wire conversion,
 * validation, provider tool shapes and server-owned execution.
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
];
const savedEnv = new Map<string, string | undefined>();
for (const key of JEV_ENV_KEYS) savedEnv.set(key, process.env[key]);

const { handleJevDecide, JEV_DECIDE_TOOL_NAME, buildJevToolsForProvider } =
  await import("../../src/lib/skills/jevBuiltins.ts");
const { executeServerOwned } = await import("../../src/lib/skills/interception.ts");
const { __resetJevClientForTests, __resetJevRuntimeCacheForTests } =
  await import("../../open-sse/services/jev/index.ts");

let fetchCalls: Array<{ url: string; init: RequestInit | undefined }> = [];
const originalFetch = globalThis.fetch;

function clearJevEnv(): void {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
}

function useCredential(features = "tool_loop"): void {
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_BASE_URL = "https://jev.test";
  process.env.OMNIROUTE_JEV_FEATURES = features;
}

function stubNoulAnswer(probability: number): void {
  globalThis.fetch = (async (...args: unknown[]) => {
    fetchCalls.push({ url: String(args[0]), init: args[1] as RequestInit });
    return {
      ok: true,
      status: 200,
      json: async () => ({
        model: "jev-test",
        answers: { answer: { type: "noul", noul: probability } },
      }),
      text: async () => "",
    } as unknown as Response;
  }) as typeof fetch;
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

test("lane off: the handler rejects and never reaches the network", async () => {
  process.env.OMNIROUTE_JEV_FEATURES = "routing";
  globalThis.fetch = (async () => {
    throw new Error("must not fetch");
  }) as typeof fetch;
  await assert.rejects(
    () => handleJevDecide({ state: "s", question: "q?", type: "noul" }),
    /disabled/
  );
  assert.equal(fetchCalls.length, 0);
});

test("noul request round-trips a calibrated probability", async () => {
  useCredential();
  stubNoulAnswer(0.83);
  const result = (await handleJevDecide({
    state: "the sky is blue at noon",
    question: "Is the sky blue?",
    type: "noul",
  })) as { success: boolean; answer: { type: string; noul: number }; model: string };
  assert.equal(result.success, true);
  assert.deepEqual(result.answer, { type: "noul", noul: 0.83 });
  assert.equal(result.model, "jev-test");
  const sent = JSON.parse(String(fetchCalls[0].init?.body)) as {
    state: string;
    questions: Record<string, { type: string; instructions: string; criteria?: unknown }>;
  };
  assert.equal(sent.state, "the sky is blue at noon");
  assert.equal(sent.questions.answer.type, "noul");
  assert.equal(sent.questions.answer.instructions, "Is the sky blue?");
});

test("choice forwards criteria and rejects criteria with fewer than two labels", async () => {
  useCredential();
  globalThis.fetch = (async (...args: unknown[]) => {
    fetchCalls.push({ url: String(args[0]), init: args[1] as RequestInit });
    return {
      ok: true,
      status: 200,
      json: async () => ({
        answers: {
          answer: { type: "choice", choice: "slow", confidence: 0.7, probabilities: {} },
        },
      }),
      text: async () => "",
    } as unknown as Response;
  }) as typeof fetch;

  const ok = (await handleJevDecide({
    state: "s",
    question: "Which bucket?",
    type: "choice",
    criteria: { fast: "under 1s", slow: "over 1s" },
  })) as { answer: { choice: string } };
  assert.equal(ok.answer.choice, "slow");
  const sent = JSON.parse(String(fetchCalls[0].init?.body)) as {
    questions: { answer: { criteria: Record<string, string> } };
  };
  assert.deepEqual(sent.questions.answer.criteria, { fast: "under 1s", slow: "over 1s" });

  await assert.rejects(
    () =>
      handleJevDecide({
        state: "s",
        question: "Which bucket?",
        type: "choice",
        criteria: { only: "one" },
      }),
    /at least two labels/
  );
});

test("score requires an ordered label array; malformed input is rejected", async () => {
  useCredential();
  await assert.rejects(
    () => handleJevDecide({ state: "s", question: "How hard?", type: "score" }),
    /ordered array/
  );
  await assert.rejects(
    () => handleJevDecide({ state: "", question: "How hard?", type: "score" }),
    /requires string fields/
  );
});

test("upstream failure surfaces as a loud error so the model can fall back", async () => {
  useCredential();
  globalThis.fetch = (async () =>
    ({ ok: false, status: 400, text: async () => "bad" }) as unknown as Response) as typeof fetch;
  await assert.rejects(
    () => handleJevDecide({ state: "s", question: "q?", type: "noul" }),
    /unavailable/
  );
});

test("tool definitions follow each provider's shape and name", () => {
  const openai = buildJevToolsForProvider("openai") as Array<{
    type: string;
    function: { name: string; parameters: { required: string[] } };
  }>;
  assert.equal(openai[0].type, "function");
  assert.equal(openai[0].function.name, JEV_DECIDE_TOOL_NAME);
  assert.deepEqual(openai[0].function.parameters.required, ["state", "question", "type"]);

  const claude = buildJevToolsForProvider("anthropic") as Array<{
    name: string;
    input_schema: unknown;
  }>;
  assert.equal(claude[0].name, JEV_DECIDE_TOOL_NAME);
  assert.ok(claude[0].input_schema);

  const gemini = buildJevToolsForProvider("google") as Array<{ name: string; parameters: unknown }>;
  assert.equal(gemini[0].name, JEV_DECIDE_TOOL_NAME);
  assert.ok(gemini[0].parameters);
});

test("executeServerOwned dispatches jev_decide when the owner set allows it", async () => {
  useCredential();
  stubNoulAnswer(0.4);
  const results = await executeServerOwned(
    [
      {
        id: "c1",
        name: JEV_DECIDE_TOOL_NAME,
        arguments: { state: "s", question: "q?", type: "noul" },
      },
    ],
    {
      apiKeyId: "key-jev",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: [JEV_DECIDE_TOOL_NAME],
      executionFenceEnabled: false,
    }
  );
  assert.equal(results.length, 1);
  const payload = results[0].result as { success?: boolean; answer?: { noul?: number } };
  assert.equal(payload.success, true);
  assert.equal(payload.answer?.noul, 0.4);
});
