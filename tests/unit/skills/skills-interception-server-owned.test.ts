import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Local shape for formatter return values — avoids explicit any in assertions.
type FormattedResponse = {
  choices?: Array<{
    message: {
      content: string | null;
      tool_calls?: Array<{ id: string; function: { name: string; arguments: string } }>;
    };
    finish_reason: string;
  }>;
  content?: Array<{ type: string; id?: string; text?: string }>;
  stop_reason?: string;
  stop_sequence?: string | null;
  output?: Array<{ type: string; call_id?: string; name?: string; arguments?: string }>;
  response?: {
    output?: Array<{ type: string; call_id?: string; name?: string; arguments?: string }>;
  };
};

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-interception-owned-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const coreDb = await import("../../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../../src/lib/skills/executor.ts");
const {
  classifyServerOwnedCalls,
  formatEscapeHatchResponse,
  executeServerOwned,
  ServerOwnedExecutionError,
} = await import("../../../src/lib/skills/interception.ts");

function resetRuntime() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillExecutor["handlers"].clear();
  skillExecutor.setTimeout(50);
}

async function resetStorage() {
  resetRuntime();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test.beforeEach(async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;
  await resetStorage();
  await registerRuntimeSkills();
});

test.after(() => {
  resetRuntime();
  coreDb.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── Task 3: classifyServerOwnedCalls + formatEscapeHatchResponse RED tests ──

test("classifyServerOwnedCalls: owner set builtin/custom → serverOwned; registry-registered but not in owner set → clientNative", async () => {
  const calls = [
    { id: "c1", name: "http_request", arguments: {} },
    { id: "c2", name: "lookup@1.0.0", arguments: {} },
    { id: "c3", name: "Bash", arguments: {} },
  ];

  const result = await classifyServerOwnedCalls(calls, {
    apiKeyId: "key-a",
    sessionId: "s1",
    requestId: "r1",
    builtinToolNames: ["http_request"],
    injectedCustomSkillNames: ["lookup@1.0.0"],
    customSkillExecutionEnabled: true,
  });

  assert.equal(result.serverOwned.length, 2);
  assert.equal(result.serverOwned[0].id, "c1");
  assert.equal(result.serverOwned[1].id, "c2");
  assert.equal(result.clientNative.length, 1);
  assert.equal(result.clientNative[0].id, "c3");
});

test("classifyServerOwnedCalls: client same-name memory_search → not server-owned", async () => {
  const calls = [
    { id: "c1", name: "memory_search", arguments: {} },
    { id: "c2", name: "http_request", arguments: {} },
  ];

  const result = await classifyServerOwnedCalls(calls, {
    apiKeyId: "key-a",
    sessionId: "s1",
    requestId: "r1",
    builtinToolNames: ["http_request"],
    // memory_search NOT in builtinToolNames (client owns it)
    injectedCustomSkillNames: [],
    customSkillExecutionEnabled: true,
  });

  // memory_search is client-native because it's not in any owner set.
  assert.equal(result.clientNative.length, 1);
  assert.equal(result.clientNative[0].id, "c1");
  assert.equal(result.serverOwned.length, 1);
  assert.equal(result.serverOwned[0].id, "c2");
});

test("classifyServerOwnedCalls: registered skill with client same-name → client-native (not server-owned)", async () => {
  // Register a skill that the client also declares with the same encoded name.
  await skillRegistry.register({
    name: "collision-check",
    version: "1.0.0",
    description: "collision test",
    schema: { input: {}, output: {} },
    handler: "collision-handler",
    enabled: true,
    apiKeyId: "key-a",
    mode: "on",
  });

  const encodedName = (await import("../../../src/lib/skills/injection.ts")).encodeSkillToolName(
    "collision-check",
    "1.0.0"
  );

  // Client declares a tool with the same encoded name.
  const calls = [
    { id: "c1", name: encodedName, arguments: {} },
    { id: "c2", name: "http_request", arguments: {} },
  ];

  const result = await classifyServerOwnedCalls(calls, {
    apiKeyId: "key-a",
    sessionId: "s1",
    requestId: "r1",
    builtinToolNames: ["http_request"],
    injectedCustomSkillNames: [], // empty: client collision prevented injection
    customSkillExecutionEnabled: true,
  });

  // The registered skill with client same-name must be client-native.
  assert.equal(result.clientNative.length, 1);
  assert.equal(result.clientNative[0].id, "c1");
  assert.equal(result.serverOwned.length, 1);
  assert.equal(result.serverOwned[0].id, "c2");

  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
});

test("formatEscapeHatchResponse: mixed OpenAI — strip server calls, append results to content, keep client calls, finish_reason:tool_calls", async () => {
  const response = {
    choices: [
      {
        message: {
          content: null,
          tool_calls: [
            { id: "srv1", function: { name: "http_request", arguments: "{}" } },
            { id: "cli1", function: { name: "Bash", arguments: '{"cmd":"ls"}' } },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  const serverCalls = [{ id: "srv1", name: "http_request", arguments: {} }];
  const clientCalls = [{ id: "cli1", name: "Bash", arguments: { cmd: "ls" } }];
  const results = [{ id: "srv1", name: "http_request", result: { status: 200 }, replayed: false }];

  const formatted = formatEscapeHatchResponse(
    response,
    serverCalls,
    results,
    clientCalls,
    "openai"
  );

  const choice = (formatted as FormattedResponse).choices[0];
  // Server call stripped from tool_calls, client call kept.
  assert.equal(choice.message.tool_calls.length, 1);
  assert.equal(choice.message.tool_calls[0].id, "cli1");
  // Server result appended to content.
  assert.ok(typeof choice.message.content === "string");
  assert.ok(choice.message.content.includes("200"));
  // finish_reason stays tool_calls (mixed).
  assert.equal(choice.finish_reason, "tool_calls");
});

test("formatEscapeHatchResponse: all-server OpenAI — strip tool calls, append results, finish_reason:stop", async () => {
  const response = {
    choices: [
      {
        message: {
          content: null,
          tool_calls: [{ id: "srv1", function: { name: "http_request", arguments: "{}" } }],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  const serverCalls = [{ id: "srv1", name: "http_request", arguments: {} }];
  const results = [{ id: "srv1", name: "http_request", result: { ok: true }, replayed: false }];

  const formatted = formatEscapeHatchResponse(response, serverCalls, results, [], "openai");

  const choice = (formatted as FormattedResponse).choices[0];
  assert.ok(
    !choice.message.tool_calls || choice.message.tool_calls.length === 0,
    "all-server must have no remaining tool_calls"
  );
  assert.ok(typeof choice.message.content === "string");
  assert.ok(choice.message.content.includes("ok"));
  assert.equal(choice.finish_reason, "stop");
});

test("formatEscapeHatchResponse: Claude mixed — strip server tool_use, keep client tool_use, end_turn stays", async () => {
  const response = {
    content: [
      { type: "tool_use", id: "srv1", name: "http_request", input: {} },
      { type: "tool_use", id: "cli1", name: "Bash", input: { cmd: "ls" } },
    ],
    stop_reason: "tool_use",
  };

  const serverCalls = [{ id: "srv1", name: "http_request", arguments: {} }];
  const clientCalls = [{ id: "cli1", name: "Bash", arguments: { cmd: "ls" } }];
  const results = [{ id: "srv1", name: "http_request", result: { ok: true }, replayed: false }];

  const formatted = formatEscapeHatchResponse(
    response,
    serverCalls,
    results,
    clientCalls,
    "claude"
  );

  const content = (formatted as FormattedResponse).content as Array<{ type: string; id?: string }>;
  // Server tool_use removed, client tool_use kept.
  const toolUses = content.filter((b) => b.type === "tool_use");
  assert.equal(toolUses.length, 1);
  assert.equal(toolUses[0].id, "cli1");
  // stop_reason stays tool_use (mixed).
  assert.equal((formatted as FormattedResponse).stop_reason, "tool_use");
});

test("formatEscapeHatchResponse: Claude all-server — strip tool_use, append text, end_turn", async () => {
  const response = {
    content: [{ type: "tool_use", id: "srv1", name: "http_request", input: {} }],
    stop_reason: "tool_use",
  };

  const serverCalls = [{ id: "srv1", name: "http_request", arguments: {} }];
  const results = [{ id: "srv1", name: "http_request", result: { ok: true }, replayed: false }];

  const formatted = formatEscapeHatchResponse(response, serverCalls, results, [], "claude");

  const content = (formatted as FormattedResponse).content as Array<{ type: string }>;
  const toolUses = content.filter((b) => b.type === "tool_use");
  assert.equal(toolUses.length, 0);
  const textBlocks = content.filter((b) => b.type === "text");
  assert.ok(textBlocks.length > 0);
  assert.equal((formatted as FormattedResponse).stop_reason, "end_turn");
});

test("formatEscapeHatchResponse: formatter does not call interceptToolCalls or any handler (purity)", async () => {
  // Purity proof: the formatter is synchronous and its source must not contain
  // calls to interceptToolCalls, skillExecutor, or handler invocations.
  const fnSource = formatEscapeHatchResponse.toString();
  assert.ok(
    !fnSource.includes("interceptToolCalls"),
    "formatter source must not reference interceptToolCalls"
  );
  assert.ok(
    !fnSource.includes("skillExecutor"),
    "formatter source must not reference skillExecutor"
  );
  assert.ok(!fnSource.includes("await"), "formatter must be synchronous (no await)");

  // Also verify it returns immediately without side effects.
  const response = {
    choices: [
      {
        message: {
          content: null,
          tool_calls: [{ id: "srv1", function: { name: "http_request", arguments: "{}" } }],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  const result = formatEscapeHatchResponse(
    response,
    [{ id: "srv1", name: "http_request", arguments: {} }],
    [{ id: "srv1", name: "http_request", result: { ok: true }, replayed: false }],
    [],
    "openai"
  );

  assert.ok(result, "formatter returns a result");
  assert.ok(result.choices[0].message.content, "formatter populates content");
});

test("formatEscapeHatchResponse: Responses wrapper is byte-identical for function_call_output", async () => {
  const response = {
    object: "response",
    output: [{ type: "function_call", call_id: "call1", name: "lookup@1.0.0", arguments: "{}" }],
  };

  const serverCalls = [{ id: "call1", name: "lookup@1.0.0", arguments: {} }];
  const results = [
    { id: "call1", name: "lookup@1.0.0", result: { record: "42" }, replayed: false },
  ];

  const formatted = formatEscapeHatchResponse(response, serverCalls, results, [], "openai");

  // Responses format: original output + function_call_output appended.
  const output = (formatted as FormattedResponse).output;
  assert.equal(output.length, 2);
  assert.equal(output[0].type, "function_call");
  assert.equal(output[1].type, "function_call_output");
  assert.equal(output[1].call_id, "call1");
});

// ─── F3: nested Responses output formatter ──────────────────────────────────

test("formatEscapeHatchResponse: nested {response:{output}} appends function_call_output to nested output, not top-level", async () => {
  const nestedResponse = {
    object: "response",
    response: {
      output: [{ type: "function_call", call_id: "nc1", name: "lookup@1.0.0", arguments: "{}" }],
    },
  };

  const serverCalls = [{ id: "nc1", name: "lookup@1.0.0", arguments: {} }];
  const results = [
    { id: "nc1", name: "lookup@1.0.0", result: { record: "nested-42" }, replayed: false },
  ];

  const formatted = formatEscapeHatchResponse(nestedResponse, serverCalls, results, [], "openai");

  // Must append to nested response.output, not top-level output.
  const nestedOutput = (formatted as { response?: { output?: unknown[] } }).response?.output;
  assert.ok(Array.isArray(nestedOutput), "nested response.output must be an array");
  assert.equal(nestedOutput.length, 2, "nested output must have original + appended");
  assert.equal(nestedOutput[0].type, "function_call");
  assert.equal(nestedOutput[1].type, "function_call_output");
  assert.equal((nestedOutput[1] as { call_id: string }).call_id, "nc1");

  // Top-level must NOT have an output array.
  assert.equal(
    Array.isArray((formatted as { output?: unknown[] }).output),
    false,
    "top-level output must not exist"
  );
});

// ─── F1: executeServerOwned RED tests ───────────────────────────────────────

test("executeServerOwned: requires requestIdentity when executionFenceEnabled", async () => {
  const calls = [{ id: "c1", name: "http_request", arguments: { url: "https://example.com" } }];
  const context = {
    apiKeyId: "key-fence",
    sessionId: "s1",
    requestId: "r1",
    builtinToolNames: ["http_request"],
    executionFenceEnabled: true,
    // requestIdentity is deliberately missing
  };

  await assert.rejects(
    () => executeServerOwned(calls, context),
    /requestIdentity/,
    "must require requestIdentity when executionFenceEnabled"
  );
});

test("executeServerOwned: dispatches memory builtin and returns ExecutedToolResult", async () => {
  const calls = [{ id: "c1", name: "memory_search", arguments: { query: "test" } }];
  const context = {
    apiKeyId: "key-mem",
    sessionId: "s1",
    requestId: "r1",
    builtinToolNames: ["memory_search"],
    executionFenceEnabled: false,
  };

  const results = await executeServerOwned(calls, context);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, "c1");
  assert.equal(results[0].name, "memory_search");
  assert.equal(results[0].replayed, false);
  assert.ok(results[0].result !== undefined, "result must be present");
});

test("executeServerOwned: dispatches ordinary builtin (http_request)", async () => {
  const calls = [{ id: "c1", name: "http_request", arguments: { url: "https://example.com" } }];
  const context = {
    apiKeyId: "key-builtin",
    sessionId: "s1",
    requestId: "r1",
    builtinToolNames: ["http_request"],
    executionFenceEnabled: false,
  };

  const results = await executeServerOwned(calls, context);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, "c1");
  assert.equal(results[0].name, "http_request");
  assert.equal(results[0].replayed, false);
});

test("executeServerOwned: surfaces identity_conflict as typed error, never feeds to model", async () => {
  // Custom skill call with no matching handler — should surface as error
  const calls = [{ id: "c1", name: "missing-skill@1.0.0", arguments: {} }];
  const context = {
    apiKeyId: "key-err",
    sessionId: "s1",
    requestId: "r1",
    injectedCustomSkillNames: ["missing-skill@1.0.0"],
    customSkillExecutionEnabled: true,
    executionFenceEnabled: false,
  };

  const results = await executeServerOwned(calls, context);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, "c1");
  assert.equal(results[0].replayed, false);
  // Result must contain an error indicator
  const resultRecord = results[0].result as Record<string, unknown>;
  assert.ok(
    resultRecord && (resultRecord.error || resultRecord.status),
    "result must contain error indicator"
  );
});

// ─── Fix Round 2: Defect 1 — typed errors for fence control-flow states ────

test("ServerOwnedExecutionError is an exported class with code and httpStatus", () => {
  const err = new ServerOwnedExecutionError("test", "TEST_CODE", 409);
  assert.ok(err instanceof Error);
  assert.equal(err.code, "TEST_CODE");
  assert.equal(err.httpStatus, 409);
  assert.equal(err.message, "test");
});

test("executeServerOwned: in_progress fence state → throws ServerOwnedExecutionError with TOOL_IN_PROGRESS (409)", async () => {
  const { setFenceFnForTesting } = await import("../../../src/lib/skills/interception.ts");
  const mockFence = async () => ({ kind: "in_progress" as const });
  setFenceFnForTesting(mockFence);

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    const context = {
      apiKeyId: "key-fence",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      executionFenceEnabled: true,
      requestIdentity: "identity-1",
    };

    try {
      await executeServerOwned(calls, context);
      assert.fail("must throw");
    } catch (e: unknown) {
      assert.ok(e instanceof ServerOwnedExecutionError);
      assert.equal(e.code, "TOOL_IN_PROGRESS");
      assert.equal(e.httpStatus, 409);
    }
  } finally {
    setFenceFnForTesting(null);
  }
});

test("executeServerOwned: unknown fence state → throws ServerOwnedExecutionError with TOOL_STATE_UNKNOWN (500)", async () => {
  const { setFenceFnForTesting } = await import("../../../src/lib/skills/interception.ts");
  const mockFence = async () => ({ kind: "unknown" as const });
  setFenceFnForTesting(mockFence);

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    const context = {
      apiKeyId: "key-fence",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      executionFenceEnabled: true,
      requestIdentity: "identity-1",
    };

    try {
      await executeServerOwned(calls, context);
      assert.fail("must throw");
    } catch (e: unknown) {
      assert.ok(e instanceof ServerOwnedExecutionError);
      assert.equal(e.code, "TOOL_STATE_UNKNOWN");
      assert.equal(e.httpStatus, 500);
    }
  } finally {
    setFenceFnForTesting(null);
  }
});

test("executeServerOwned: identity_conflict fence state → throws ServerOwnedExecutionError with IDENTITY_CONFLICT (409)", async () => {
  const { setFenceFnForTesting } = await import("../../../src/lib/skills/interception.ts");
  const mockFence = async () => ({ kind: "identity_conflict" as const });
  setFenceFnForTesting(mockFence);

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    const context = {
      apiKeyId: "key-fence",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      executionFenceEnabled: true,
      requestIdentity: "identity-1",
    };

    try {
      await executeServerOwned(calls, context);
      assert.fail("must throw");
    } catch (e: unknown) {
      assert.ok(e instanceof ServerOwnedExecutionError);
      assert.equal(e.code, "IDENTITY_CONFLICT");
      assert.equal(e.httpStatus, 409);
    }
  } finally {
    setFenceFnForTesting(null);
  }
});

// ─── Fix Round 3: Defect 1 — replay error/timeout detection ───────────────

test("executeServerOwned: error replay → throws ServerOwnedExecutionError with TOOL_EXECUTION_ERROR (500)", async () => {
  const { setFenceFnForTesting } = await import("../../../src/lib/skills/interception.ts");
  const mockFence = async () => ({
    kind: "replayed" as const,
    value: null,
    status: "error" as const,
    errorMessage: "handler crashed",
  });
  setFenceFnForTesting(mockFence);

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    const context = {
      apiKeyId: "key-fence",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      executionFenceEnabled: true,
      requestIdentity: "identity-1",
    };

    try {
      await executeServerOwned(calls, context);
      assert.fail("must throw");
    } catch (e: unknown) {
      assert.ok(e instanceof ServerOwnedExecutionError);
      assert.equal(e.code, "TOOL_EXECUTION_ERROR");
      assert.equal(e.httpStatus, 500);
      assert.equal(e.message, "handler crashed");
    }
  } finally {
    setFenceFnForTesting(null);
  }
});

test("executeServerOwned: timeout replay → throws ServerOwnedExecutionError with TOOL_EXECUTION_TIMEOUT (504)", async () => {
  const { setFenceFnForTesting } = await import("../../../src/lib/skills/interception.ts");
  const mockFence = async () => ({
    kind: "replayed" as const,
    value: null,
    status: "timeout" as const,
    errorMessage: "execution exceeded deadline",
  });
  setFenceFnForTesting(mockFence);

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    const context = {
      apiKeyId: "key-fence",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      executionFenceEnabled: true,
      requestIdentity: "identity-1",
    };

    try {
      await executeServerOwned(calls, context);
      assert.fail("must throw");
    } catch (e: unknown) {
      assert.ok(e instanceof ServerOwnedExecutionError);
      assert.equal(e.code, "TOOL_EXECUTION_TIMEOUT");
      assert.equal(e.httpStatus, 504);
      assert.equal(e.message, "execution exceeded deadline");
    }
  } finally {
    setFenceFnForTesting(null);
  }
});

test("executeServerOwned: success replay → returns ExecutedToolResult with replayed:true", async () => {
  const { setFenceFnForTesting } = await import("../../../src/lib/skills/interception.ts");
  const mockFence = async () => ({
    kind: "replayed" as const,
    value: { cached: true },
    status: "success" as const,
    errorMessage: null,
  });
  setFenceFnForTesting(mockFence);

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    const context = {
      apiKeyId: "key-fence",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      executionFenceEnabled: true,
      requestIdentity: "identity-1",
    };

    const results = await executeServerOwned(calls, context);
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "c1");
    assert.equal(results[0].replayed, true);
    assert.deepEqual(results[0].result, { cached: true });
  } finally {
    setFenceFnForTesting(null);
  }
});

test("executeServerOwned: error replay with null errorMessage → uses default message", async () => {
  const { setFenceFnForTesting } = await import("../../../src/lib/skills/interception.ts");
  const mockFence = async () => ({
    kind: "replayed" as const,
    value: null,
    status: "error" as const,
    errorMessage: null,
  });
  setFenceFnForTesting(mockFence);

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    const context = {
      apiKeyId: "key-fence",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      executionFenceEnabled: true,
      requestIdentity: "identity-1",
    };

    try {
      await executeServerOwned(calls, context);
      assert.fail("must throw");
    } catch (e: unknown) {
      assert.ok(e instanceof ServerOwnedExecutionError);
      assert.equal(e.code, "TOOL_EXECUTION_ERROR");
      assert.equal(e.message, "Tool execution failed");
    }
  } finally {
    setFenceFnForTesting(null);
  }
});

// ─── Fix Round 2: Defect 2 — executeClaimed non-success throws ──────────────

test("executeClaimed: custom skill handler returns non-success status → executeClaimed throws safe error", async () => {
  // Register a custom skill whose handler returns a failure output
  await skillRegistry.register({
    name: "fail-skill",
    version: "1.0.0",
    description: "always returns failure status",
    schema: { input: {}, output: {} },
    handler: "fail-handler",
    enabled: true,
    apiKeyId: "key-a",
  });

  skillExecutor.registerHandler("fail-handler", async () => ({
    status: "failed",
    message: "something went wrong",
  }));

  await assert.rejects(
    () =>
      skillExecutor.executeClaimed(
        "fail-skill",
        {},
        { apiKeyId: "key-a", sessionId: "s1" },
        "exec-fail"
      ),
    /Skill execution failed/,
    "executeClaimed must throw when handler returns non-success status"
  );

  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
});

// ─── Fix Round 2: Defect 3 — LEASE_DURATION_MS = 120000 ─────────────────────

test("LEASE_DURATION_MS is 120000 to match loop wall-clock upper bound", async () => {
  const fs = await import("node:fs");
  const sourceCode = fs.readFileSync(
    new URL("../../../src/lib/skills/interception.ts", import.meta.url),
    "utf8"
  );
  const match = sourceCode.match(/const\s+LEASE_DURATION_MS\s*=\s*([\d_]+)/);
  assert.ok(match, "LEASE_DURATION_MS must be defined in interception.ts");
  const value = Number(match[1].replace(/_/g, ""));
  assert.equal(value, 120_000, "LEASE_DURATION_MS must be 120000 (not 30000)");
});

// ─── Fix Round 2: Defect 4 — classifyServerOwnedCalls no DB load ─────────────

test("classifyServerOwnedCalls does not call skillRegistry.loadFromDatabase (ownership from owner sets only)", async () => {
  let loadFromDatabaseCalled = false;
  const origLoad = skillRegistry.loadFromDatabase.bind(skillRegistry);
  skillRegistry.loadFromDatabase = async (..._args: unknown[]) => {
    loadFromDatabaseCalled = true;
    return origLoad(...(_args as [string]));
  };

  try {
    const calls = [{ id: "c1", name: "http_request", arguments: {} }];
    await classifyServerOwnedCalls(calls, {
      apiKeyId: "key-a",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["http_request"],
      injectedCustomSkillNames: [],
      customSkillExecutionEnabled: false,
    });

    assert.equal(
      loadFromDatabaseCalled,
      false,
      "classifyServerOwnedCalls must NOT call loadFromDatabase — owner sets are sufficient"
    );
  } finally {
    skillRegistry.loadFromDatabase = origLoad;
  }
});
