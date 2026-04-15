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
