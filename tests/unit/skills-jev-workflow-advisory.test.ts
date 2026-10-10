/**
 * Unit tests: Jev workflow-step advisory — goal extraction, gating, threshold
 * behavior, and transcript rendering across both wire formats.
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

const { extractGoalText, maybeJevStopToolsAdvisory, JEV_STOP_TOOLS_ADVISORY_TEXT } =
  await import("../../src/lib/skills/jevWorkflowAdvisory.ts");
const { buildFollowUpSourceBody } = await import("../../src/lib/skills/followUpTranscript.ts");
const { __resetJevClientForTests, __resetJevRuntimeCacheForTests } =
  await import("../../open-sse/services/jev/index.ts");

let fetchCalls = 0;
const originalFetch = globalThis.fetch;

function clearJevEnv(): void {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
}

function useCredential(): void {
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_BASE_URL = "https://jev.test";
  process.env.OMNIROUTE_JEV_FEATURES = "tool_loop";
}

function stubProceed(probability: number): void {
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return {
      ok: true,
      status: 200,
      json: async () => ({ answers: { proceed: { type: "noul", noul: probability } } }),
      text: async () => "",
    } as unknown as Response;
  }) as typeof fetch;
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

test("lane off: no advisory and no network work", async () => {
  process.env.OMNIROUTE_JEV_FEATURES = "routing";
  globalThis.fetch = (async () => {
    throw new Error("must not fetch");
  }) as typeof fetch;
  const advisory = await maybeJevStopToolsAdvisory({
    goal: "g",
    steps: ["memory_search"],
    stepsTaken: 2,
  });
  assert.equal(advisory, null);
  assert.equal(fetchCalls, 0);
});

test("low proceed probability yields the stop-tools advisory; high does not", async () => {
  useCredential();
  stubProceed(0.9);
  assert.equal(
    await maybeJevStopToolsAdvisory({ goal: "g", steps: ["memory_search"], stepsTaken: 2 }),
    null
  );
  __resetJevClientForTests();
  stubProceed(0.05);
  assert.equal(
    await maybeJevStopToolsAdvisory({ goal: "g", steps: ["memory_search"], stepsTaken: 2 }),
    JEV_STOP_TOOLS_ADVISORY_TEXT
  );
});

test("a decision-model failure resolves to null (fail-open)", async () => {
  useCredential();
  globalThis.fetch = (async () =>
    ({ ok: false, status: 400, text: async () => "bad" }) as unknown as Response) as typeof fetch;
  const advisory = await maybeJevStopToolsAdvisory({ goal: "g", steps: ["x"], stepsTaken: 1 });
  assert.equal(advisory, null);
});

test("extractGoalText: last user message wins, both content shapes supported", () => {
  assert.equal(
    extractGoalText({
      messages: [
        { role: "user", content: "first" },
        { role: "assistant", content: "ok" },
        { role: "user", content: "second" },
      ],
    }),
    "second"
  );
  assert.equal(
    extractGoalText({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "part one" },
            { type: "image", data: "x" },
          ],
        },
      ],
    }),
    "part one"
  );
  assert.equal(extractGoalText({ messages: [{ role: "assistant", content: "no user" }] }), "");
  assert.equal(extractGoalText(null), "");
});

// ─── Transcript rendering ─────────────────────────────────────────────────

const transcriptFixture = {
  sourceBody: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] },
  previousResponse: {
    choices: [
      {
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "tc1", type: "function", function: { name: "memory_search", arguments: "{}" } },
          ],
        },
      },
    ],
  },
  toolCalls: [{ id: "tc1", name: "memory_search", arguments: {} }],
  results: [{ id: "tc1", name: "memory_search", result: { hits: [] }, replayed: false }],
  maxResultBytes: 32_768,
  maxTotalResultBytes: 65_536,
};

test("openai transcript: advisory rides as a trailing user message; absent → unchanged", () => {
  const withAdvisory = buildFollowUpSourceBody({
    ...transcriptFixture,
    sourceFormat: "openai",
    advisory: "stop calling tools",
  });
  const messages = withAdvisory.messages as Array<Record<string, unknown>>;
  assert.deepEqual(messages[messages.length - 1], {
    role: "user",
    content: "stop calling tools",
  });

  const withoutAdvisory = buildFollowUpSourceBody({ ...transcriptFixture, sourceFormat: "openai" });
  assert.equal(
    JSON.stringify(withoutAdvisory),
    JSON.stringify(
      buildFollowUpSourceBody({ ...transcriptFixture, sourceFormat: "openai", advisory: null })
    )
  );
});

test("claude transcript: advisory rides as an extra text block on the tool_result turn", () => {
  const claudeFixture = {
    ...transcriptFixture,
    previousResponse: {
      content: [{ type: "tool_use", id: "tc1", name: "memory_search", input: {} }],
    },
  };
  const withAdvisory = buildFollowUpSourceBody({
    ...claudeFixture,
    sourceFormat: "claude",
    advisory: "stop calling tools",
  });
  const messages = withAdvisory.messages as Array<Record<string, unknown>>;
  const last = messages[messages.length - 1] as { role: string; content: unknown[] };
  assert.equal(last.role, "user");
  const blocks = last.content as Array<Record<string, unknown>>;
  assert.equal(blocks[0].type, "tool_result");
  assert.deepEqual(blocks[blocks.length - 1], { type: "text", text: "stop calling tools" });
});
