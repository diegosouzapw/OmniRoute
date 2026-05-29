import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-interception-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../src/lib/skills/executor.ts");
const { interceptToolCalls, extractToolCalls, handleToolCallExecution } =
  await import("../../src/lib/skills/interception.ts");
const { OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } =
  await import("../../open-sse/services/webSearchFallback.ts");

function resetRuntime() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillExecutor["handlers"].clear();
  skillExecutor.setTimeout(50);
}

async function resetStorage() {
  resetRuntime();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function registerRuntimeSkills() {
  await skillRegistry.register({
    name: "lookup",
    version: "1.0.0",
    description: "lookup records",
    schema: { input: { id: "string" }, output: { record: "string" } },
    handler: "lookup-handler",
    enabled: true,
    apiKeyId: "key-a",
  });
  await skillRegistry.register({
    name: "broken",
    version: "1.0.0",
    description: "always fails",
    schema: { input: {}, output: {} },
    handler: "broken-handler",
    enabled: true,
    apiKeyId: "key-a",
  });

  skillExecutor.registerHandler("lookup-handler", async (input) => ({
    record: `resolved:${input.id}`,
  }));
  skillExecutor.registerHandler("broken-handler", async () => {
    throw new Error("skill failure");
  });
}

const executionContext = {
  apiKeyId: "key-a",
  sessionId: "session-1",
  requestId: "request-1",
};

test.beforeEach(async () => {
  await resetStorage();
  await registerRuntimeSkills();
});

test.after(() => {
  resetRuntime();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("extractToolCalls supports OpenAI, Anthropic and Gemini shapes", () => {
  const openaiRoot = extractToolCalls(
    {
      tool_calls: [
        {
          id: "call-root",
          function: { name: "lookup@1.0.0", arguments: '{"id":"123"}' },
        },
      ],
    },
    "gpt-4.1"
  );
  const openaiChoices = extractToolCalls(
    {
      choices: [
        {
          message: {
            tool_calls: [
              {
                id: "call-choice",
                function: { name: "lookup@1.0.0", arguments: "not-json" },
              },
            ],
          },
        },
      ],
    },
    "openai-compatible-model"
  );
  const anthropic = extractToolCalls(
    {
      content: [
        { type: "text", text: "ignored" },
        { type: "tool_use", id: "claude-1", name: "lookup@1.0.0", input: { id: "abc" } },
      ],
    },
    "claude-sonnet"
  );
  const gemini = extractToolCalls(
    {
      functionCalls: [{ name: "lookup@1.0.0", args: { id: "gemini" } }],
    },
    "gemini-2.5-pro"
  );
  const responses = extractToolCalls(
    {
      object: "response",
      output: [
        {
          type: "function_call",
          call_id: "call-response",
          name: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
          arguments: '{"query":"latest omniroute"}',
        },
      ],
    },
    "openai"
  );

  assert.deepEqual(openaiRoot, [
    {
      id: "call-root",
      name: "lookup@1.0.0",
      arguments: { id: "123" },
    },
  ]);
  assert.deepEqual(openaiChoices, [
    {
      id: "call-choice",
      name: "lookup@1.0.0",
      arguments: {},
    },
  ]);
  assert.deepEqual(anthropic, [
    {
      id: "claude-1",
      name: "lookup@1.0.0",
      arguments: { id: "abc" },
    },
  ]);
  assert.equal(gemini.length, 1);
  assert.equal(gemini[0].name, "lookup@1.0.0");
  assert.deepEqual(gemini[0].arguments, { id: "gemini" });
  assert.deepEqual(responses, [
    {
      id: "call-response",
      name: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
      arguments: { query: "latest omniroute" },
    },
  ]);
  assert.deepEqual(extractToolCalls({}, "custom-model"), []);
});

test("interceptToolCalls returns outputs, execution errors and missing-skill errors", async () => {
  const results = await interceptToolCalls(
    [
      { id: "ok-call", name: "lookup@1.0.0", arguments: { id: "42" } },
      { id: "error-call", name: "broken@1.0.0", arguments: {} },
      { id: "missing-call", name: "missing", arguments: {} },
    ],
    executionContext
  );

  assert.deepEqual(results, [
    { id: "ok-call", result: { record: "resolved:42" } },
    { id: "error-call", result: { error: "skill failure" } },
    { id: "missing-call", result: { error: "Skill not found: missing" } },
  ]);
});

test("handleToolCallExecution appends OpenAI tool results and leaves empty responses untouched", async () => {
  const openaiResponse = await handleToolCallExecution(
    {
      choices: [
        {
          message: {
            tool_calls: [
              {
                id: "call-1",
                function: { name: "lookup@1.0.0", arguments: '{"id":"99"}' },
              },
            ],
          },
        },
      ],
    },
    "gpt-4o-mini",
    executionContext
  );

  assert.deepEqual(openaiResponse.tool_results, [
    {
      tool_call_id: "call-1",
      output: '{"record":"resolved:99"}',
    },
  ]);

  const untouched = { choices: [{ message: { content: "plain text" } }] };
  assert.equal(await handleToolCallExecution(untouched, "gpt-4.1", executionContext), untouched);
});

test("handleToolCallExecution appends Anthropic tool_result blocks", async () => {
  const anthropicResponse = await handleToolCallExecution(
    {
      content: [{ type: "tool_use", id: "tool-1", name: "lookup@1.0.0", input: { id: "77" } }],
    },
    "claude-3-7-sonnet",
    executionContext
  );

  assert.deepEqual(anthropicResponse.content, [
    { type: "tool_use", id: "tool-1", name: "lookup@1.0.0", input: { id: "77" } },
    {
      type: "tool_result",
      tool_use_id: "tool-1",
      content: '{"record":"resolved:77"}',
    },
  ]);
});

test("handleToolCallExecution appends Responses API function_call_output items", async () => {
  const responsesResult = await handleToolCallExecution(
    {
      object: "response",
      output: [
        {
          type: "function_call",
          call_id: "call-response",
          name: "lookup@1.0.0",
          arguments: '{"id":"55"}',
        },
      ],
    },
    "openai",
    executionContext
  );

  assert.deepEqual(responsesResult.output, [
    {
      type: "function_call",
      call_id: "call-response",
      name: "lookup@1.0.0",
      arguments: '{"id":"55"}',
    },
    {
      type: "function_call_output",
      call_id: "call-response",
      output: '{"record":"resolved:55"}',
    },
  ]);
});

test("handleToolCallExecution forwards unregistered client-native tool_use untouched (#2815)", async () => {
  const original = {
    content: [
      { type: "tool_use", id: "tool-native", name: "Bash", input: { command: "ls" } },
      { type: "text", text: "Calling Bash" },
    ],
  };
  const result = await handleToolCallExecution(original, "claude-3-7-sonnet", executionContext);

  assert.equal(result, original);
  assert.equal(
    (result.content as Array<{ type: string }>).some((b) => b.type === "tool_result"),
    false
  );
});

test("handleToolCallExecution intercepts a registered skill alongside an unregistered tool (#2815)", async () => {
  const mixed = await handleToolCallExecution(
    {
      content: [
        { type: "tool_use", id: "tool-native", name: "Bash", input: { command: "ls" } },
        { type: "tool_use", id: "tool-skill", name: "lookup@1.0.0", input: { id: "9" } },
      ],
    },
    "claude-3-7-sonnet",
    executionContext
  );

  assert.deepEqual(mixed.content, [
    { type: "tool_use", id: "tool-native", name: "Bash", input: { command: "ls" } },
    { type: "tool_use", id: "tool-skill", name: "lookup@1.0.0", input: { id: "9" } },
    {
      type: "tool_result",
      tool_use_id: "tool-skill",
      content: '{"record":"resolved:9"}',
    },
  ]);
});

test("handleToolCallExecution loads registry from DB on cold cache (covers loadFromDatabase fix)", async () => {
  // Skills are in the DB (registered in beforeEach) but we evict the in-memory
  // cache to simulate a cold/fresh process. Without the loadFromDatabase() call
  // at the top of handleToolCallExecution, isRegisteredCustomSkill() would
  // return false (false negative) and the skill would be silently skipped.
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillRegistry.invalidateCache();

  const result = await handleToolCallExecution(
    {
      content: [
        { type: "tool_use", id: "tool-skill", name: "lookup@1.0.0", input: { id: "cold" } },
      ],
    },
    "claude-3-7-sonnet",
    executionContext
  );

  assert.deepEqual(result.content, [
    { type: "tool_use", id: "tool-skill", name: "lookup@1.0.0", input: { id: "cold" } },
    {
      type: "tool_result",
      tool_use_id: "tool-skill",
      content: '{"record":"resolved:cold"}',
    },
  ]);
});
