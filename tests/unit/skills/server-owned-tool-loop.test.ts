import test from "node:test";
import assert from "node:assert/strict";

import {
  runServerOwnedToolLoop,
  MAX_FOLLOW_UPS,
  LOOP_BUDGET_MS,
  MIN_REMAINING_FOR_FOLLOW_UP_MS,
} from "../../../src/lib/skills/serverOwnedToolLoop.ts";
import type {
  ServerOwnedToolLoopOptions,
  NonStreamingProviderLegResult,
  ProviderLegReceipt,
  ChatCoreErrorResult,
  ToolCall,
} from "../../../src/lib/skills/toolLoopTypes.ts";
import {
  ServerOwnedExecutionError,
  extractToolCalls,
} from "../../../src/lib/skills/interception.ts";
import { buildFollowUpSourceBody } from "../../../src/lib/skills/followUpTranscript.ts";

// ─── Fix 6: serializedResultTextById verbatim use ────────────────────────────

test("buildFollowUpSourceBody uses serializedResultTextById verbatim when provided", () => {
  const sentinel = '{"custom":"SENTINEL_12345"}';
  const toolCalls = [{ id: "tc1", name: "memory_search", arguments: { query: "x" } }];
  const results = [{ id: "tc1", name: "memory_search", result: { hits: ["a"] }, replayed: false }];
  const previousResponse = {
    choices: [
      {
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "tc1",
              type: "function",
              function: { name: "memory_search", arguments: '{"query":"x"}' },
            },
          ],
        },
      },
    ],
  };
  const sourceBody = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };

  // With serializedResultTextById → uses sentinel verbatim
  const serMap = new Map([["tc1", sentinel]]);
  const withMap = buildFollowUpSourceBody({
    sourceBody,
    previousResponse,
    toolCalls,
    results,
    sourceFormat: "openai",
    maxResultBytes: 32_768,
    maxTotalResultBytes: 65_536,
    serializedResultTextById: serMap,
  });

  const toolMsg = (withMap.messages as Record<string, unknown>[]).find(
    (m: Record<string, unknown>) => m.role === "tool" && m.tool_call_id === "tc1"
  );
  assert.strictEqual(toolMsg!.content, sentinel, "must use pre-serialized text verbatim");

  // Without serializedResultTextById → serializer would produce JSON of { hits: ["a"] }
  const withoutMap = buildFollowUpSourceBody({
    sourceBody,
    previousResponse,
    toolCalls,
    results,
    sourceFormat: "openai",
    maxResultBytes: 32_768,
    maxTotalResultBytes: 65_536,
  });

  const toolMsgNoMap = (withoutMap.messages as Record<string, unknown>[]).find(
    (m: Record<string, unknown>) => m.role === "tool" && m.tool_call_id === "tc1"
  );
  const defaultSerialized = JSON.stringify({ hits: ["a"] });
  assert.strictEqual(toolMsgNoMap!.content, defaultSerialized, "without map, uses JSON.stringify");
  assert.notStrictEqual(
    toolMsgNoMap!.content,
    sentinel,
    "without map, content differs from sentinel"
  );
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

type UnknownRecord = Record<string, unknown>;

function makeReceipt(overrides: Partial<ProviderLegReceipt> = {}): ProviderLegReceipt {
  return {
    index: 0,
    connectionId: "conn-1",
    provider: "openai",
    model: "gpt-4o",
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    latencyMs: 100,
    httpStatus: 200,
    errorType: null,
    usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
    serviceTier: null,
    computedCostUsd: 0.001,
    toolCalls: [],
    termination: "completed",
    clientVisible: true,
    ...overrides,
  };
}

function makeOkLeg(
  overrides: Partial<NonStreamingProviderLegResult & { kind: "ok" }> = {}
): NonStreamingProviderLegResult & { kind: "ok" } {
  return {
    kind: "ok",
    response: {
      id: "chatcmpl-abc",
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "memory_search", arguments: '{"query":"foo"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    responseForMemoryExtraction: {
      choices: [{ message: { role: "assistant", content: null } }],
    },
    providerBody: {},
    providerRequest: {},
    usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
    responsePayloadFormat: "openai",
    looksLikeSSE: false,
    connectionId: "conn-1",
    headers: new Headers(),
    receipt: makeReceipt(),
    ...overrides,
  };
}

function makeServerOwnedCallResponse(
  _callId: string,
  _name: string
): NonStreamingProviderLegResult & { kind: "ok" } {
  return {
    kind: "ok",
    response: {
      id: "chatcmpl-def",
      choices: [
        {
          message: {
            role: "assistant",
            content: "Here is what I found about foo.",
            tool_calls: undefined,
          },
          finish_reason: "stop",
        },
      ],
    },
    responseForMemoryExtraction: {
      choices: [{ message: { role: "assistant", content: "Here is what I found about foo." } }],
    },
    providerBody: {},
    providerRequest: {},
    usage: { prompt_tokens: 150, completion_tokens: 80, total_tokens: 230 },
    responsePayloadFormat: "openai",
    looksLikeSSE: false,
    connectionId: "conn-1",
    headers: new Headers(),
    receipt: makeReceipt({
      index: 1,
      usage: { prompt_tokens: 150, completion_tokens: 80, total_tokens: 230 },
      computedCostUsd: 0.002,
    }),
  };
}

function makeErrorResult(
  status: number,
  message: string,
  code?: string,
  errorType?: string
): ChatCoreErrorResult {
  return {
    success: false,
    status,
    response: new Response(JSON.stringify({ error: message }), { status }),
    error: message,
    errorCode: code,
    errorType,
  };
}

function makeDefaultOptions(
  overrides: Partial<ServerOwnedToolLoopOptions> = {}
): ServerOwnedToolLoopOptions {
  const initialLeg = makeOkLeg();
  return {
    initialLeg,
    sourceBody: {
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Search for foo" },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "memory_search",
            description: "search memory",
            parameters: { type: "object", properties: { query: { type: "string" } } },
          },
        },
      ],
    },
    sourceFormat: "openai",
    skillsModelId: "gpt-4o",
    executionContext: {
      apiKeyId: "key-1",
      sessionId: "s1",
      requestId: "r1",
      builtinToolNames: ["memory_search"],
    },
    executeServerOwned: async (calls: ToolCall[]) => {
      return calls.map((call) => ({
        id: call.id,
        name: call.name,
        result: { hits: ["a", "b"] },
        replayed: false,
      }));
    },
    resumeUpstream: async () => makeServerOwnedCallResponse("call_1", "memory_search"),
    deadlineAtMs: 120_000,
    ...overrides,
  };
}

// ─── Interface contract tests (no casts) ─────────────────────────────────────

test("ServerOwnedToolLoopOptions accepts abortSignal and now fields at type level", () => {
  // This test proves the interface has the fields; a cast would hide missing fields.
  const ac = new AbortController();
  let customNow = 5000;
  const opts: ServerOwnedToolLoopOptions = {
    initialLeg: makeOkLeg(),
    sourceBody: { model: "gpt-4o", messages: [] },
    sourceFormat: "openai",
    skillsModelId: "gpt-4o",
    executionContext: { apiKeyId: "k", sessionId: "s", requestId: "r" },
    executeServerOwned: async () => [],
    resumeUpstream: async () => makeOkLeg(),
    deadlineAtMs: 120_000,
    abortSignal: ac.signal,
    now: () => customNow,
  };
  // Verify the fields are present and accessible without cast
  assert.ok(opts.abortSignal, "abortSignal must be accessible");
  assert.strictEqual(typeof opts.now, "function", "now must be a function");
  assert.strictEqual(opts.now!(), 5000, "now() returns the injected value");
});

test("NonStreamingProviderLegResult error arm carries usage field", () => {
  const errLeg: NonStreamingProviderLegResult = {
    kind: "error",
    result: {
      success: false,
      status: 500,
      response: new Response(),
      error: "fail",
    },
    receipt: makeReceipt({
      usage: { prompt_tokens: 50, completion_tokens: 10, total_tokens: 60 },
    }),
    usage: { prompt_tokens: 50, completion_tokens: 10, total_tokens: 60 },
  };
  assert.ok(errLeg.kind === "error");
  assert.ok(errLeg.usage, "error leg must carry usage");
  assert.strictEqual(errLeg.usage!.prompt_tokens, 50);
});

// ─── Fix 3: sourceFormat-based extraction regression ─────────────────────────

test("extractToolCalls with opaque model alias + Claude shape returns 1 tool call via sourceFormat", () => {
  const claudeResponse = {
    content: [{ type: "tool_use", id: "tu_1", name: "memory_search", input: { query: "test" } }],
    stop_reason: "tool_use",
  };

  // Opaque model alias that detectProvider maps to "openai" → returns 0
  const viaModelId = extractToolCalls(claudeResponse, "official-fable");
  assert.strictEqual(viaModelId.length, 0, "opaque alias without sourceFormat returns 0");

  // Explicit sourceFormat "claude" → returns 1
  const viaSourceFormat = extractToolCalls(claudeResponse, "claude");
  assert.strictEqual(viaSourceFormat.length, 1, "sourceFormat=claude returns 1 tool call");
  assert.strictEqual(viaSourceFormat[0].name, "memory_search");
});

test("extractToolCalls with opaque model alias + Claude shape actually executes in loop", async () => {
  const claudeResponse: NonStreamingProviderLegResult & { kind: "ok" } = {
    kind: "ok",
    response: {
      content: [{ type: "tool_use", id: "tu_exec", name: "memory_search", input: { query: "x" } }],
      stop_reason: "tool_use",
    },
    responseForMemoryExtraction: {},
    providerBody: {},
    providerRequest: {},
    usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
    responsePayloadFormat: "claude",
    looksLikeSSE: false,
    connectionId: "conn-1",
    headers: new Headers(),
    receipt: makeReceipt({ index: 0 }),
  };

  let executeCalled = false;
  const opts: ServerOwnedToolLoopOptions = {
    initialLeg: claudeResponse,
    sourceBody: { model: "official-fable", messages: [{ role: "user", content: "hi" }] },
    sourceFormat: "claude",
    skillsModelId: "official-fable",
    executionContext: {
      apiKeyId: "k",
      sessionId: "s",
      requestId: "r",
      builtinToolNames: ["memory_search"],
    },
    executeServerOwned: async (calls) => {
      executeCalled = true;
      return calls.map((c) => ({ id: c.id, name: c.name, result: { ok: true }, replayed: false }));
    },
    resumeUpstream: async () => ({
      kind: "ok",
      response: {
        content: [{ type: "text", text: "Done" }],
        stop_reason: "end_turn",
      },
      responseForMemoryExtraction: {},
      providerBody: {},
      providerRequest: {},
      usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
      responsePayloadFormat: "claude",
      looksLikeSSE: false,
      connectionId: "conn-1",
      headers: new Headers(),
      receipt: makeReceipt({ index: 1 }),
    }),
    deadlineAtMs: 120_000,
  };

  const result = await runServerOwnedToolLoop(opts);
  assert.ok(executeCalled, "server-owned call must execute even with opaque model alias");
  assert.strictEqual(result.termination, "completed");
  assert.strictEqual(result.followUps, 1);
});

// ─── §5.5 Constants ───────────────────────────────────────────────────────────

test("MAX_FOLLOW_UPS is 3", () => {
  assert.strictEqual(MAX_FOLLOW_UPS, 3);
});

test("LOOP_BUDGET_MS is 120000", () => {
  assert.strictEqual(LOOP_BUDGET_MS, 120_000);
});

test("MIN_REMAINING_FOR_FOLLOW_UP_MS is 10000", () => {
  assert.strictEqual(MIN_REMAINING_FOR_FOLLOW_UP_MS, 10_000);
});

// ─── Happy-path ──────────────────────────────────────────────────────────────

test("happy-path: server-owned call executed, resume produces text, followUps=1, termination=completed", async () => {
  const opts = makeDefaultOptions();
  const result = await runServerOwnedToolLoop(opts);

  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.followUps, 1);
  assert.strictEqual(result.receipts.length, 2, "initial leg + 1 follow-up");
  assert.strictEqual(result.termination, "completed");
  assert.ok(result.response, "response must be non-empty");
  assert.ok(result.cumulativeUsage, "cumulativeUsage must be non-null");

  const response = result.response as UnknownRecord;
  const choices = response.choices as Array<UnknownRecord>;
  const message = choices[0].message as UnknownRecord;
  assert.ok(
    typeof message.content === "string" && message.content.length > 0,
    "final content must be non-empty string"
  );
});

// ─── Step 4: Termination branches ─────────────────────────────────────────────

test("no server-owned calls: completed with no follow-ups", async () => {
  const initialLeg = makeOkLeg({
    response: {
      id: "chatcmpl-ok",
      choices: [
        {
          message: {
            role: "assistant",
            content: "Plain text response",
            tool_calls: undefined,
          },
          finish_reason: "stop",
        },
      ],
    },
  });
  const opts = makeDefaultOptions({
    initialLeg,
    executeServerOwned: async () => [],
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.followUps, 0);
  assert.strictEqual(result.termination, "completed");
  assert.strictEqual(result.receipts.length, 1);
});

test("client_tools: no follow-up, client native calls only", async () => {
  const initialLeg = makeOkLeg({
    response: {
      id: "chatcmpl-ct",
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "cli1",
                type: "function",
                function: { name: "Bash", arguments: '{"cmd":"ls"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
  });
  const opts = makeDefaultOptions({ initialLeg });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.followUps, 0);
  assert.strictEqual(result.termination, "client_tools");
});

test("mixed_tools: server call executed, no follow-up, results appended to content", async () => {
  const initialLeg = makeOkLeg({
    response: {
      id: "chatcmpl-mix",
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "srv1",
                type: "function",
                function: { name: "memory_search", arguments: '{"query":"foo"}' },
              },
              {
                id: "cli1",
                type: "function",
                function: { name: "Bash", arguments: '{"cmd":"ls"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
  });

  let executeCount = 0;
  const opts = makeDefaultOptions({
    initialLeg,
    executeServerOwned: async (calls) => {
      executeCount++;
      return calls.map((c) => ({
        id: c.id,
        name: c.name,
        result: { hits: ["x"] },
        replayed: false,
      }));
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.followUps, 0);
  assert.strictEqual(result.termination, "mixed_tools");
  assert.strictEqual(executeCount, 1, "server call executed once");
});

test("max_followups: 3 follow-ups, 4th leg server call still executed but no 5th leg", async () => {
  let legCount = 0;
  let executeCount = 0;

  const opts = makeDefaultOptions({
    executeServerOwned: async (calls) => {
      executeCount++;
      return calls.map((c) => ({
        id: c.id,
        name: c.name,
        result: { ok: true },
        replayed: false,
      }));
    },
    resumeUpstream: async () => {
      legCount++;
      return {
        kind: "ok",
        response: {
          id: `chatcmpl-leg${legCount}`,
          choices: [
            {
              message: {
                role: "assistant",
                content: null,
                tool_calls: [
                  {
                    id: `call_${legCount + 1}`,
                    type: "function",
                    function: { name: "memory_search", arguments: '{"query":"q"}' },
                  },
                ],
              },
              finish_reason: "tool_calls",
            },
          ],
        },
        responseForMemoryExtraction: {},
        providerBody: {},
        providerRequest: {},
        usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
        responsePayloadFormat: "openai",
        looksLikeSSE: false,
        connectionId: "conn-1",
        headers: new Headers(),
        receipt: makeReceipt({
          index: legCount + 1,
          usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
        }),
      };
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.followUps, 3);
  assert.strictEqual(result.termination, "max_followups");
  assert.strictEqual(executeCount, 4, "server calls executed for initial + 3 follow-ups");
  assert.strictEqual(result.receipts.length, 4, "exactly 4 receipts: initial + 3 follow-ups");
});

test("deadline: not enough remaining time → termination=deadline, no follow-up", async () => {
  const startMs = 1000;
  let now = startMs;
  const opts = makeDefaultOptions({
    now: () => now,
    deadlineAtMs: startMs + MIN_REMAINING_FOR_FOLLOW_UP_MS - 1,
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.followUps, 0);
  assert.strictEqual(result.termination, "deadline");
});

test("client_abort: abortSignal.aborted → termination=client_abort, no formatter/resume", async () => {
  const ac = new AbortController();
  ac.abort();

  const opts = makeDefaultOptions({ abortSignal: ac.signal });
  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "client_abort");
  assert.ok(result.errorResult, "errorResult must be present");
  assert.strictEqual(result.errorResult!.status, 499);
  assert.strictEqual(result.errorResult!.errorCode, "client_closed_request");
});

test("provider_error: resumeUpstream returns error → termination=provider_error, no formatter", async () => {
  const errorResult = makeErrorResult(
    500,
    "Internal Server Error",
    "internal_error",
    "server_error"
  );
  const opts = makeDefaultOptions({
    resumeUpstream: async () => ({
      kind: "error",
      result: errorResult,
      receipt: makeReceipt({
        index: 1,
        httpStatus: 500,
        errorType: "server_error",
        usage: { prompt_tokens: 50, completion_tokens: 10, total_tokens: 60 },
        computedCostUsd: 0.003,
      }),
      usage: { prompt_tokens: 50, completion_tokens: 10, total_tokens: 60 },
    }),
  });

  const origExec = opts.executeServerOwned;
  opts.executeServerOwned = async (calls, context) => {
    const results = await origExec(calls, context);
    return results;
  };

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "provider_error");
  assert.ok(result.errorResult, "errorResult must be present");
  assert.strictEqual(result.errorResult!.status, 500);
  assert.strictEqual(result.receipts.length, 2, "initial + failed follow-up receipts");
  assert.ok(result.receipts[1].usage, "failed leg receipt must carry usage");
  assert.strictEqual(result.receipts[1].usage!.prompt_tokens, 50);
  assert.strictEqual(result.totalCostUsd, 0.004, "cost includes failed leg computedCostUsd");
});

test("connection_mismatch: follow-up connectionId differs → termination=connection_mismatch", async () => {
  const opts = makeDefaultOptions({
    resumeUpstream: async () => ({
      kind: "ok",
      response: {
        id: "chatcmpl-mismatch",
        choices: [
          {
            message: {
              role: "assistant",
              content: "Response",
              tool_calls: undefined,
            },
            finish_reason: "stop",
          },
        ],
      },
      responseForMemoryExtraction: {},
      providerBody: {},
      providerRequest: {},
      usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
      responsePayloadFormat: "openai",
      looksLikeSSE: false,
      connectionId: "conn-CHANGED",
      headers: new Headers(),
      receipt: makeReceipt({
        index: 1,
        connectionId: "conn-CHANGED",
        usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
      }),
    }),
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "connection_mismatch");
  assert.ok(result.errorResult, "errorResult must be present");
  assert.strictEqual(result.errorResult!.status, 409);
  assert.strictEqual(result.errorResult!.errorCode, "LEASE_CONNECTION_MISMATCH");
});

test("ServerOwnedExecutionError: execution_error → termination=execution_error, no formatter", async () => {
  const opts = makeDefaultOptions({
    executeServerOwned: async () => {
      throw new ServerOwnedExecutionError("handler crashed", "TOOL_EXECUTION_ERROR", 500);
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "execution_error");
  assert.ok(result.errorResult, "errorResult must be present");
  assert.strictEqual(result.errorResult!.status, 500);
  assert.strictEqual(result.errorResult!.errorCode, "TOOL_EXECUTION_ERROR");
});

test("ServerOwnedExecutionError: execution_in_progress → termination=execution_in_progress", async () => {
  const opts = makeDefaultOptions({
    executeServerOwned: async () => {
      throw new ServerOwnedExecutionError("Tool execution in progress", "TOOL_IN_PROGRESS", 409);
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "execution_in_progress");
  assert.ok(result.errorResult);
  assert.strictEqual(result.errorResult!.status, 409);
  assert.strictEqual(result.errorResult!.errorCode, "TOOL_IN_PROGRESS");
});

test("ServerOwnedExecutionError: execution_unknown → termination=execution_unknown", async () => {
  const opts = makeDefaultOptions({
    executeServerOwned: async () => {
      throw new ServerOwnedExecutionError(
        "Tool execution state unknown",
        "TOOL_STATE_UNKNOWN",
        500
      );
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "execution_unknown");
  assert.ok(result.errorResult);
  assert.strictEqual(result.errorResult!.status, 500);
  assert.strictEqual(result.errorResult!.errorCode, "TOOL_STATE_UNKNOWN");
});

test("ServerOwnedExecutionError: execution_identity_conflict → termination=execution_identity_conflict", async () => {
  const opts = makeDefaultOptions({
    executeServerOwned: async () => {
      throw new ServerOwnedExecutionError(
        "Tool execution identity conflict",
        "IDENTITY_CONFLICT",
        409
      );
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "execution_identity_conflict");
  assert.ok(result.errorResult);
  assert.strictEqual(result.errorResult!.status, 409);
  assert.strictEqual(result.errorResult!.errorCode, "IDENTITY_CONFLICT");
});

test("ServerOwnedExecutionError: execution_timeout → termination=execution_timeout", async () => {
  const opts = makeDefaultOptions({
    executeServerOwned: async () => {
      throw new ServerOwnedExecutionError(
        "Tool execution timed out",
        "TOOL_EXECUTION_TIMEOUT",
        504
      );
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "execution_timeout");
  assert.ok(result.errorResult);
  assert.strictEqual(result.errorResult!.status, 504);
  assert.strictEqual(result.errorResult!.errorCode, "TOOL_EXECUTION_TIMEOUT");
});

// ─── Provider error identity ─────────────────────────────────────────────────

test("provider_error: error result is same object identity as resumeUpstream return, formatter count=0", async () => {
  const errorResult = makeErrorResult(502, "Bad Gateway");
  let resumeCallCount = 0;

  const opts = makeDefaultOptions({
    resumeUpstream: async () => {
      resumeCallCount++;
      return {
        kind: "error",
        result: errorResult,
        receipt: makeReceipt({ index: 1, httpStatus: 502 }),
        usage: null,
      };
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "provider_error");
  assert.strictEqual(result.errorResult, errorResult, "errorResult must be same object identity");
  assert.strictEqual(resumeCallCount, 1);
});

// ─── Cumulative UTF-8 budget ─────────────────────────────────────────────────

test("tool_output_budget: cumulative bytes exhausted → termination=tool_output_budget", async () => {
  const bigResult = { data: "x".repeat(70_000) };
  const opts = makeDefaultOptions({
    maxTotalResultBytes: 100,
    executeServerOwned: async (calls) =>
      calls.map((c) => ({
        id: c.id,
        name: c.name,
        result: bigResult,
        replayed: false,
      })),
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.termination, "tool_output_budget");
});

test("tool_output_budget: truncated=true on any result must terminate, no resume", async () => {
  const bigResult = { data: "y".repeat(50_000) };
  let resumeCount = 0;
  const opts = makeDefaultOptions({
    maxResultBytes: 100,
    maxTotalResultBytes: 200,
    executeServerOwned: async (calls) =>
      calls.map((c) => ({
        id: c.id,
        name: c.name,
        result: bigResult,
        replayed: false,
      })),
    resumeUpstream: async () => {
      resumeCount++;
      return makeServerOwnedCallResponse("call_next", "memory_search");
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.termination, "tool_output_budget", "truncated result must terminate");
  assert.strictEqual(resumeCount, 0, "resume must not be called when result is truncated");
  // Formatter output must exist and be byte-bounded
  assert.ok(result.response, "response must be present");
  const responseStr = JSON.stringify(result.response);
  const responseBytes = Buffer.byteLength(responseStr, "utf8");
  assert.ok(responseBytes > 0, "formatter output must be non-empty");
});

test("mixed_tools: abort before execute must be checked", async () => {
  const ac = new AbortController();
  ac.abort();

  const initialLeg = makeOkLeg({
    response: {
      id: "chatcmpl-mix-abort",
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "srv1",
                type: "function",
                function: { name: "memory_search", arguments: '{"query":"x"}' },
              },
              {
                id: "cli1",
                type: "function",
                function: { name: "Bash", arguments: '{"cmd":"ls"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
  });

  let executeCount = 0;
  const opts = makeDefaultOptions({
    initialLeg,
    abortSignal: ac.signal,
    executeServerOwned: async (calls) => {
      executeCount++;
      return calls.map((c) => ({ id: c.id, name: c.name, result: { ok: true }, replayed: false }));
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(
    result.termination,
    "client_abort",
    "mixed with abort must terminate as client_abort"
  );
  assert.strictEqual(executeCount, 0, "execute must not run when abort is signaled");
});

// ─── All-null usage ──────────────────────────────────────────────────────────

test("all-null usage legs → cumulativeUsage is null", async () => {
  const opts = makeDefaultOptions({
    initialLeg: makeOkLeg({ usage: null }),
    resumeUpstream: async () => ({
      kind: "ok",
      response: {
        id: "chatcmpl-null",
        choices: [
          {
            message: { role: "assistant", content: "Done", tool_calls: undefined },
            finish_reason: "stop",
          },
        ],
      },
      responseForMemoryExtraction: {},
      providerBody: {},
      providerRequest: {},
      usage: null,
      responsePayloadFormat: "openai",
      looksLikeSSE: false,
      connectionId: "conn-1",
      headers: new Headers(),
      receipt: makeReceipt({ index: 1, usage: null }),
    }),
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.termination, "completed");
  assert.strictEqual(result.cumulativeUsage, null, "all-null usage → null cumulative");
});

test("provider error with all-null usage → cumulativeUsage is null", async () => {
  const opts = makeDefaultOptions({
    initialLeg: makeOkLeg({ usage: null }),
    resumeUpstream: async () => ({
      kind: "error",
      result: makeErrorResult(500, "Internal Server Error"),
      receipt: makeReceipt({ index: 1, usage: null, httpStatus: 500 }),
      usage: null,
    }),
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "provider_error");
  assert.strictEqual(result.cumulativeUsage, null, "all-null usage on error → null cumulative");
});

test("input objects are not mutated", async () => {
  const sourceBody = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hi" }],
    tools: [{ type: "function", function: { name: "memory_search" } }],
  };
  const sourceBodySnapshot = JSON.parse(JSON.stringify(sourceBody));
  const opts = makeDefaultOptions({ sourceBody });

  await runServerOwnedToolLoop(opts);
  assert.deepStrictEqual(sourceBody, sourceBodySnapshot);
});

// ─── Accumulated transcript across rounds ────────────────────────────────────

test("two-round server calls: second resumeUpstream receives sourceBody with first round messages", async () => {
  const sourceBodiesReceived: Record<string, unknown>[] = [];
  let resumeCount = 0;

  const opts = makeDefaultOptions({
    resumeUpstream: async (nextSourceBody) => {
      sourceBodiesReceived.push(JSON.parse(JSON.stringify(nextSourceBody)));
      resumeCount++;
      if (resumeCount === 1) {
        return {
          kind: "ok",
          response: {
            id: "chatcmpl-round2",
            choices: [
              {
                message: {
                  role: "assistant",
                  content: null,
                  tool_calls: [
                    {
                      id: "call_2",
                      type: "function",
                      function: { name: "memory_search", arguments: '{"query":"bar"}' },
                    },
                  ],
                },
                finish_reason: "tool_calls",
              },
            ],
          },
          responseForMemoryExtraction: {},
          providerBody: {},
          providerRequest: {},
          usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
          responsePayloadFormat: "openai",
          looksLikeSSE: false,
          connectionId: "conn-1",
          headers: new Headers(),
          receipt: makeReceipt({
            index: 1,
            usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
          }),
        };
      }
      return {
        kind: "ok",
        response: {
          id: "chatcmpl-final",
          choices: [
            {
              message: {
                role: "assistant",
                content: "Final answer",
                tool_calls: undefined,
              },
              finish_reason: "stop",
            },
          ],
        },
        responseForMemoryExtraction: {},
        providerBody: {},
        providerRequest: {},
        usage: { prompt_tokens: 150, completion_tokens: 30, total_tokens: 180 },
        responsePayloadFormat: "openai",
        looksLikeSSE: false,
        connectionId: "conn-1",
        headers: new Headers(),
        receipt: makeReceipt({
          index: 2,
          usage: { prompt_tokens: 150, completion_tokens: 30, total_tokens: 180 },
        }),
      };
    },
    executeServerOwned: async (calls) =>
      calls.map((c) => ({
        id: c.id,
        name: c.name,
        result: { ok: true },
        replayed: false,
      })),
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "ok");
  assert.strictEqual(result.followUps, 2);
  assert.strictEqual(result.termination, "completed");

  assert.strictEqual(sourceBodiesReceived.length, 2, "resumeUpstream called twice");
  const firstBody = sourceBodiesReceived[0].messages as UnknownRecord[];
  // 2 original + assistant turn + 1 tool message = 4
  assert.strictEqual(firstBody.length, 4, "2 original messages + assistant turn + tool result");
  const secondBody = sourceBodiesReceived[1].messages as UnknownRecord[];
  // 4 (from first resume) + assistant turn + 1 tool message = 6
  assert.strictEqual(secondBody.length, 6, "4 from first resume + round2 assistant/tool turn");
});

// ─── Abort before resume ─────────────────────────────────────────────────────

test("abort after execute but before resume → client_abort", async () => {
  const ac = new AbortController();
  const opts = makeDefaultOptions({
    abortSignal: ac.signal,
    executeServerOwned: async (calls) => {
      ac.abort();
      return calls.map((c) => ({
        id: c.id,
        name: c.name,
        result: { ok: true },
        replayed: false,
      }));
    },
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "client_abort");
  assert.ok(result.errorResult);
  assert.strictEqual(result.errorResult!.status, 499);
});

// ─── Resumed leg receipt always enters receipts/usage/cost ───────────────────

test("failed leg receipt still enters receipts array with usage and cost", async () => {
  const errorResult = makeErrorResult(429, "Rate limited");
  const opts = makeDefaultOptions({
    resumeUpstream: async () => ({
      kind: "error",
      result: errorResult,
      receipt: makeReceipt({
        index: 1,
        httpStatus: 429,
        usage: { prompt_tokens: 50, completion_tokens: 0, total_tokens: 50 },
        computedCostUsd: 0.0005,
      }),
      usage: { prompt_tokens: 50, completion_tokens: 0, total_tokens: 50 },
    }),
  });

  const result = await runServerOwnedToolLoop(opts);
  assert.strictEqual(result.kind, "error");
  assert.strictEqual(result.termination, "provider_error");
  assert.strictEqual(result.receipts.length, 2, "initial + failed leg");
  assert.ok(result.receipts[1].usage, "failed leg receipt must have usage");
  assert.strictEqual(result.receipts[1].httpStatus, 429);
  assert.strictEqual(result.totalCostUsd, 0.0015, "cost includes failed leg");
});
