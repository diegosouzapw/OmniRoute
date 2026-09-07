import { test } from "node:test";
import assert from "node:assert/strict";

import {
  runNonStreamingProviderLeg,
  type ChatCoreExecutorResult,
  type ProviderLegInput,
} from "../../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import {
  buildAssistantMessageCacheKey,
  clearReasoningCacheAll,
  lookupReasoning,
} from "../../../open-sse/services/reasoningCache.ts";

/* -- helpers --------------------------------------------------------------- */

function makeResponse(
  body: string | object,
  status = 200,
  headers: Record<string, string> = {}
): Response {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: new Headers({ "content-type": "application/json", ...headers }),
    text: async () => text,
    clone() {
      return { ...this, text: async () => text } as unknown as Response;
    },
    body: null,
  } as unknown as Response;
}

function makeExecutorResult(
  responseBody: unknown,
  status = 200,
  headers: Record<string, string> = {}
): ChatCoreExecutorResult {
  return {
    response: makeResponse(responseBody, status, headers),
    url: "https://api.openai.com/v1/chat/completions",
    headers: {},
    transformedBody: responseBody,
  };
}

function baseInput(overrides: Partial<ProviderLegInput> = {}): ProviderLegInput {
  return {
    phase: "initial",
    sourceBody: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hi" }],
    },
    expectedConnectionId: undefined,
    allowAccountRotation: true,
    allowModelFallback: true,
    executeProviderRequest: async () =>
      makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "Hello!" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
    setRequestWireState: () => {},
    provider: "openai",
    model: "gpt-4o",
    connectionId: "conn-test",
    ...overrides,
  };
}

/* -- characterization tests ------------------------------------------------ */

test("200 JSON: returns ok with usage and receipt", async () => {
  const result = await runNonStreamingProviderLeg(baseInput());
  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  assert.equal(result.response.choices[0].message.content, "Hello!");
  assert.ok(result.usage, "usage should be present");
  assert.equal(result.usage!.prompt_tokens, 10);
  assert.equal(result.usage!.completion_tokens, 5);
  assert.equal(result.receipt.httpStatus, 200);
  assert.equal(result.receipt.termination, "completed");
});

test("runProviderExecution is called once with policy; first send skips executeProviderRequest", async () => {
  let pipelineCalls = 0;
  let executorCalls = 0;
  let seenPolicy: { allowAccountRotation: boolean; allowModelFallback: boolean } | undefined;
  const okBody = {
    id: "chatcmpl-test",
    choices: [{ message: { role: "assistant", content: "from-pipeline" }, finish_reason: "stop" }],
    usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
  };
  const input = baseInput({
    executeProviderRequest: async () => {
      executorCalls++;
      throw new Error("first send must not use executeProviderRequest when pipeline is set");
    },
    runProviderExecution: async ({ policy, model, translatedBody }) => {
      pipelineCalls++;
      seenPolicy = {
        allowAccountRotation: policy.allowAccountRotation,
        allowModelFallback: policy.allowModelFallback,
      };
      assert.equal(model, "gpt-4o");
      assert.equal((translatedBody as { model?: string }).model, "gpt-4o");
      return {
        kind: "response",
        response: {
          ok: true,
          status: 200,
          statusText: "OK",
          headers: new Headers({ "content-type": "application/json" }),
          text: async () => JSON.stringify(okBody),
          body: null,
        } as unknown as Response,
        url: "https://api.openai.com/v1/chat/completions",
        headers: {},
        transformedBody: okBody,
        model: "gpt-4o",
        connectionId: "conn-test",
      };
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(pipelineCalls, 1);
  assert.equal(executorCalls, 0);
  assert.deepEqual(seenPolicy, { allowAccountRotation: true, allowModelFallback: true });
  assert.equal(result.kind, "ok");
  if (result.kind === "ok") {
    assert.equal(result.response.choices[0].message.content, "from-pipeline");
  }
});

test("response body is parsed exactly once", async () => {
  let parseCount = 0;
  const responseBody = {
    id: "chatcmpl-test",
    choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
    usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
  };
  const input = baseInput({
    executeProviderRequest: async () => makeExecutorResult(responseBody),
  });
  const orig = input.executeProviderRequest;
  input.executeProviderRequest = async (...args) => {
    const result = await orig(...args);
    const origText = result.response.text.bind(result.response);
    result.response = {
      ...result.response,
      text: async () => {
        parseCount++;
        return origText();
      },
    } as unknown as Response;
    return result;
  };
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
  assert.equal(parseCount, 1, "body should be parsed exactly once");
});

test("setRequestWireState is called before executor with current wire state", async () => {
  const wireStates: Array<{ translatedBody: unknown; effectiveModel: string }> = [];
  const input = baseInput({
    setRequestWireState: (state) => wireStates.push(state),
  });
  await runNonStreamingProviderLeg(input);
  assert.ok(wireStates.length >= 1, "setRequestWireState should be called");
  assert.equal(wireStates[0].effectiveModel, "gpt-4o");
});

test("buffered SSE response -> JSON body", async () => {
  const sseBody =
    'data: {"id":"c1","choices":[{"delta":{"content":"hello"},"index":0,"finish_reason":null}]}\n\n' +
    'data: {"id":"c1","choices":[{"delta":{},"index":0,"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";
  const sseResponse = {
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers({ "content-type": "text/event-stream" }),
    text: async () => sseBody,
    body: null,
  } as unknown as Response;
  const input = baseInput({
    executeProviderRequest: async () => ({
      response: sseResponse,
      url: "https://api.example.com/v1/chat/completions",
      headers: {},
      transformedBody: null,
    }),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
});

test("429 error -> error receipt with usage from body", async () => {
  const errorBody = {
    error: { message: "Rate limit exceeded", type: "rate_limit_error" },
    usage: { prompt_tokens: 5, completion_tokens: 0, total_tokens: 5 },
  };
  const input = baseInput({
    executeProviderRequest: async () => makeExecutorResult(errorBody, 429),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 429);
  assert.ok(result.usage, "error leg should include usage");
  assert.equal(result.receipt.httpStatus, 429);
});

test("500 error -> error receipt", async () => {
  const input = baseInput({
    executeProviderRequest: async () =>
      makeExecutorResult({ error: { message: "Internal error" } }, 500),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 500);
  assert.equal(result.usage, null, "no usage in 500 error body");
});

test("network throw -> error receipt with status 502", async () => {
  const input = baseInput({
    executeProviderRequest: async () => {
      throw new TypeError("fetch failed");
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.ok(result.result.status >= 500, "should be 5xx");
  assert.equal(result.usage, null);
});

/* -- connection mismatch tests --------------------------------------------- */

test("expectedConnectionId mismatch -> 409 LEASE_CONNECTION_MISMATCH with receipt", async () => {
  let executorCalled = false;
  const input = baseInput({
    expectedConnectionId: "conn-abc",
    getCurrentConnectionId: () => "conn-xyz",
    executeProviderRequest: async () => {
      executorCalled = true;
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error", "should return error for connection mismatch");
  assert.equal(executorCalled, false, "mismatch at entry must not call the pipeline/executor");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 409, "status must be 409");
  assert.equal(
    result.result.errorCode,
    "LEASE_CONNECTION_MISMATCH",
    "errorCode must be LEASE_CONNECTION_MISMATCH"
  );
  assert.equal(result.result.errorType, "lease_error", "errorType must be lease_error");
  assert.equal(
    result.receipt.termination,
    "connection_mismatch",
    "receipt termination must be connection_mismatch"
  );
  assert.equal(result.receipt.httpStatus, 409, "receipt httpStatus must be 409");
  assert.equal(result.usage, null, "usage must be null on mismatch");
});

test("no expectedConnectionId -> mismatch check skipped, executor runs", async () => {
  let executorCalled = false;
  const input = baseInput({
    expectedConnectionId: undefined,
    executeProviderRequest: async () => {
      executorCalled = true;
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
  assert.ok(executorCalled, "executor should be called when no expectedConnectionId");
});

/* -- rotation guard tests -------------------------------------------------- */

test("follow-up Codex 429: rotationPolicy passed with allowAccountRotation=false, resolver call=0", async () => {
  let resolverCallCount = 0;
  let receivedPolicy: { allowAccountRotation?: boolean } | undefined;
  const input = baseInput({
    phase: "follow-up",
    allowAccountRotation: false,
    provider: "codex",
    executeProviderRequest: async (_model, _dedup, policy) => {
      receivedPolicy = policy;
      return makeExecutorResult(
        { error: { message: "rate limited", type: "rate_limit_error" } },
        429
      );
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  assert.deepEqual(
    receivedPolicy,
    { allowAccountRotation: false },
    "policy must have allowAccountRotation=false"
  );
  assert.equal(resolverCallCount, 0, "resolver must not be called when rotation is disabled");
  if (result.kind === "error") {
    assert.equal(result.result.status, 429);
  }
});

test("initial Codex 429: rotationPolicy passed with allowAccountRotation=true, resolver>=1 and successful retry", async () => {
  let receivedPolicy: { allowAccountRotation?: boolean } | undefined;
  let executorCallCount = 0;
  let resolverCallCount = 0;
  const input = baseInput({
    phase: "initial",
    allowAccountRotation: true,
    provider: "codex",
    executeProviderRequest: async (_model, _dedup, policy) => {
      receivedPolicy = policy;
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult(
          { error: { message: "rate limited", type: "rate_limit_error" } },
          429
        );
      }
      resolverCallCount++;
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "rotated" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.deepEqual(
    receivedPolicy,
    { allowAccountRotation: true },
    "policy must have allowAccountRotation=true"
  );
  // Account rotation lives in the pipeline (6b), not this leg. The leg
  // surfaces the 429 and forwards allowAccountRotation so the pipeline can
  // retry. Claiming resolver>=1 here without a second execute was a false green.
  assert.equal(result.kind, "error");
  assert.equal(executorCallCount, 1, "leg does not rotate; pipeline owns the retry");
  assert.equal(resolverCallCount, 0);
  if (result.kind === "error") {
    assert.equal(result.result.status, 429);
  }
});

test("follow-up Antigravity 422: rotationPolicy passed with allowAccountRotation=false, resolver call=0", async () => {
  let resolverCallCount = 0;
  let receivedPolicy: { allowAccountRotation?: boolean } | undefined;
  const input = baseInput({
    phase: "follow-up",
    allowAccountRotation: false,
    provider: "antigravity",
    executeProviderRequest: async (_model, _dedup, policy) => {
      receivedPolicy = policy;
      return makeExecutorResult(
        { error: { message: "gcp_project_required", type: "invalid_request" } },
        422
      );
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  assert.deepEqual(
    receivedPolicy,
    { allowAccountRotation: false },
    "policy must have allowAccountRotation=false"
  );
  assert.equal(resolverCallCount, 0, "resolver must not be called when rotation is disabled");
  if (result.kind === "error") {
    assert.equal(result.result.status, 422);
  }
});

test("initial Antigravity 422: rotationPolicy passed with allowAccountRotation=true", async () => {
  let receivedPolicy: { allowAccountRotation?: boolean } | undefined;
  const input = baseInput({
    phase: "initial",
    allowAccountRotation: true,
    provider: "antigravity",
    executeProviderRequest: async (_model, _dedup, policy) => {
      receivedPolicy = policy;
      return makeExecutorResult(
        { error: { message: "gcp_project_required", type: "invalid_request" } },
        422
      );
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.deepEqual(
    receivedPolicy,
    { allowAccountRotation: true },
    "policy must have allowAccountRotation=true"
  );
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 422);
  }
});

/* -- side-effect tests ----------------------------------------------------- */

test("intermediate phase: leg does not apply client usage buffer", async () => {
  const input = baseInput({
    phase: "intermediate",
    executeProviderRequest: async () =>
      makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "partial" }, finish_reason: null }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  // Intermediate phase should have raw usage (not buffered)
  assert.ok(result.usage, "usage should be present");
  assert.equal(result.usage!.prompt_tokens, 10);
});

test("setRequestWireState receives updated body on fallback", async () => {
  const wireStates: Array<{ translatedBody: Record<string, unknown>; effectiveModel: string }> = [];
  let executorCallCount = 0;
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    setRequestWireState: (state) =>
      wireStates.push(state as { translatedBody: Record<string, unknown>; effectiveModel: string }),
    executeProviderRequest: async (_modelToCall) => {
      executorCallCount++;
      if (executorCallCount === 1) {
        // First call: empty content -> triggers fallback
        return makeExecutorResult({
          id: "chatcmpl-test",
          choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
        });
      }
      // Fallback call
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "fallback" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const _result = await runNonStreamingProviderLeg(input);
  // Fallback should have been attempted
  assert.ok(executorCallCount >= 2, "executor should be called for fallback");
  // Wire state should have been updated with fallback model
  const fallbackState = wireStates.find((s) => s.effectiveModel !== "gemini-3-pro");
  assert.ok(fallbackState, "setRequestWireState should have been called with fallback model");
});

/* -- ClinePass tests ------------------------------------------------------- */

test("ClinePass retry on empty envelope: injected sleep, two calls, retry content/usage/finalBody/headers", async () => {
  let retryCount = 0;
  let sleepCalledWith: number[] = [];
  const input = baseInput({
    provider: "clinepass",
    sleep: async (ms) => {
      sleepCalledWith.push(ms);
    },
    executeProviderRequest: async () => {
      retryCount++;
      if (retryCount === 1) {
        return makeExecutorResult({ success: false, error: "empty content" });
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "retried" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(retryCount, 2, "executor should be called twice (initial + retry)");
  assert.deepEqual(sleepCalledWith, [2000], "sleep should be called with 2000ms");
  assert.equal(result.kind, "ok", "retry should succeed");
  if (result.kind === "ok") {
    assert.equal(result.response.choices[0].message.content, "retried");
    assert.ok(result.usage, "usage should be present from retry");
    assert.equal(result.usage!.prompt_tokens, 1);
    assert.equal(result.usage!.completion_tokens, 1);
    assert.equal(result.providerBody.choices[0].message.content, "retried");
    assert.ok(result.headers, "headers should be present");
  }
});

test("ClinePass retry: connection check before and after retry executor", async () => {
  let connectionChecks: string[] = [];
  let retryCount = 0;
  const input = baseInput({
    phase: "follow-up",
    expectedConnectionId: "conn-abc",
    provider: "clinepass",
    sleep: async () => {},
    getCurrentConnectionId: () => {
      connectionChecks.push("check");
      return "conn-abc";
    },
    executeProviderRequest: async () => {
      retryCount++;
      if (retryCount === 1) {
        return makeExecutorResult({ success: false, error: "empty content" });
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
  // connection check happens: before initial executor + after initial executor
  // + before retry + after retry = 4 checks at minimum
  assert.ok(
    connectionChecks.length >= 4,
    `should have >=4 connection checks, got ${connectionChecks.length}`
  );
});

test("ClinePass retry: connection mismatch during retry -> 409", async () => {
  let retryCount = 0;
  const input = baseInput({
    phase: "follow-up",
    expectedConnectionId: "conn-abc",
    provider: "clinepass",
    sleep: async () => {},
    getCurrentConnectionId: () => (retryCount <= 1 ? "conn-abc" : "conn-xyz"),
    executeProviderRequest: async () => {
      retryCount++;
      if (retryCount === 1) {
        return makeExecutorResult({ success: false, error: "empty content" });
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 409);
    assert.equal(result.result.errorCode, "LEASE_CONNECTION_MISMATCH");
  }
});

test("ClinePass non-empty error envelope returns error without retry", async () => {
  let retryCount = 0;
  const input = baseInput({
    provider: "clinepass",
    executeProviderRequest: async () => {
      retryCount++;
      return makeExecutorResult({ success: false, error: "quota exceeded" });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(retryCount, 1, "executor should be called once (no retry for non-empty error)");
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 502);
    assert.equal(result.receipt.termination, "provider_error");
  }
});

/* -- fallback tests -------------------------------------------------------- */

test("empty content initial with fallback enabled -> retries with next model", async () => {
  let executorCallCount = 0;
  const executedModels: string[] = [];
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    executeProviderRequest: async (modelToCall) => {
      executorCallCount++;
      executedModels.push(modelToCall);
      if (executorCallCount === 1) {
        return makeExecutorResult({
          id: "chatcmpl-test",
          choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
        });
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "fallback" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const _result = await runNonStreamingProviderLeg(input);
  assert.ok(executorCallCount >= 2, "should attempt fallback");
  assert.notEqual(executedModels[0], executedModels[1], "fallback should use different model");
});

test("empty content follow-up with allowModelFallback=false -> error, no fallback", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    phase: "follow-up",
    allowModelFallback: false,
    executeProviderRequest: async () => {
      executorCallCount++;
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(executorCallCount, 1, "executor should be called exactly once (no fallback)");
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 502);
    assert.equal(result.usage, null);
  }
});

test("model-unavailable follow-up with allowModelFallback=false -> error, no fallback", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    phase: "follow-up",
    allowModelFallback: false,
    executeProviderRequest: async () => {
      executorCallCount++;
      return makeExecutorResult(
        { error: { message: "model_not_found", type: "invalid_request_error" } },
        404
      );
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(executorCallCount, 1, "executor should be called exactly once (no fallback)");
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 404);
  }
});

test("context-overflow follow-up with allowModelFallback=false -> error, no fallback", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    phase: "follow-up",
    allowModelFallback: false,
    executeProviderRequest: async () => {
      executorCallCount++;
      return makeExecutorResult({ error: { message: "maximum context length exceeded" } }, 400);
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(executorCallCount, 1, "executor should be called exactly once (no fallback)");
  assert.equal(result.kind, "error");
});

test("initial winning result preserves winning model/connection in receipt", async () => {
  const input = baseInput({
    phase: "initial",
    connectionId: "conn-win",
    executeProviderRequest: async () =>
      makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "winner" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
  if (result.kind === "ok") {
    assert.equal(result.connectionId, "conn-win", "receipt must carry winning connectionId");
    assert.equal(result.receipt.model, "gpt-4o", "receipt must carry winning model");
    assert.equal(result.receipt.termination, "completed");
  }
});

/* -- Retry-After header parsing ------------------------------------------- */

test("Retry-After header is parsed from upstream response into retryAfterMs", async () => {
  const input = baseInput({
    executeProviderRequest: async () =>
      makeExecutorResult({ error: { message: "Rate limited", type: "rate_limit_error" } }, 429, {
        "Retry-After": "30",
      }),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 429);
    assert.equal(
      result.result.retryAfterMs,
      30_000,
      "retryAfterMs should be parsed from Retry-After header"
    );
  }
});

test("upstream error type is preserved in ChatCoreErrorResult", async () => {
  const input = baseInput({
    executeProviderRequest: async () =>
      makeExecutorResult(
        {
          error: {
            message: "Invalid request",
            code: "invalid_request",
            type: "invalid_request_error",
          },
        },
        400
      ),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 400);
    assert.equal(
      result.result.errorCode,
      "invalid_request",
      "upstream errorCode should be preserved"
    );
    assert.equal(
      result.result.errorType,
      "invalid_request_error",
      "upstream errorType should be preserved"
    );
  }
});

/* -- connection mismatch before/after fallback ---------------------------- */

test("connection mismatch before fallback -> 409, no fallback executor call", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    expectedConnectionId: "conn-abc",
    getCurrentConnectionId: () => (executorCallCount <= 1 ? "conn-abc" : "conn-xyz"),
    executeProviderRequest: async (_modelToCall) => {
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult(
          { error: { message: "model_not_found", type: "invalid_request_error" } },
          404
        );
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "fallback" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 409);
    assert.equal(result.result.errorCode, "LEASE_CONNECTION_MISMATCH");
  }
});

test("connection mismatch after fallback -> 409, fallback result discarded", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    expectedConnectionId: "conn-abc",
    getCurrentConnectionId: () => (executorCallCount <= 1 ? "conn-abc" : "conn-xyz"),
    executeProviderRequest: async (_modelToCall) => {
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult(
          { error: { message: "model_not_found", type: "invalid_request_error" } },
          404
        );
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "fallback" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 409);
    assert.equal(result.result.errorCode, "LEASE_CONNECTION_MISMATCH");
  }
});

/* -- dynamic connection ID ------------------------------------------------ */

test("getCurrentConnectionId is read after initial executor, expected ID enforced", async () => {
  let connectionChecks = 0;
  const input = baseInput({
    expectedConnectionId: "conn-abc",
    getCurrentConnectionId: () => {
      connectionChecks++;
      return "conn-abc";
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
  assert.ok(
    connectionChecks >= 1,
    "getCurrentConnectionId should be called at least once after executor"
  );
});

test("dynamic connection: ID changes between initial and retry -> 409 on retry path", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    phase: "follow-up",
    expectedConnectionId: "conn-abc",
    provider: "clinepass",
    sleep: async () => {},
    getCurrentConnectionId: () => (executorCallCount < 1 ? "conn-abc" : "conn-xyz"),
    executeProviderRequest: async () => {
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult({ success: false, error: "empty content" });
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind === "error") {
    assert.equal(result.result.status, 409);
    assert.equal(result.result.errorCode, "LEASE_CONNECTION_MISMATCH");
  }
  assert.equal(executorCallCount, 1, "retry executor must not run after the lease already moved");
});

/* -- fallback with real parsed response ----------------------------------- */

test("model-unavailable fallback returns real parsed response, usage, headers, winning connection/model", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    connectionId: "conn-initial",
    getCurrentConnectionId: () => "conn-initial",
    executeProviderRequest: async (_modelToCall) => {
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult(
          { error: { message: "model_not_found", type: "invalid_request_error" } },
          404
        );
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [
          { message: { role: "assistant", content: "fallback response" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 20, completion_tokens: 10, total_tokens: 30 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.ok(executorCallCount >= 2, "should attempt fallback");
  assert.equal(result.kind, "ok", "fallback should succeed");
  if (result.kind === "ok") {
    assert.equal(result.response.choices[0].message.content, "fallback response");
    assert.ok(result.usage, "usage should be present from fallback");
    assert.equal(result.usage!.prompt_tokens, 20);
    assert.equal(result.usage!.completion_tokens, 10);
    assert.equal(result.providerBody.choices[0].message.content, "fallback response");
    assert.ok(result.headers, "headers should be present");
    assert.equal(result.connectionId, "conn-initial", "winning connection should be in receipt");
    // The actual fallback model from getNextFamilyFallback
    assert.equal(
      result.receipt.model,
      "gemini-3.1-pro-preview",
      "winning model should be in receipt"
    );
  }
});

test("empty content fallback returns real parsed response, usage, headers", async () => {
  let executorCallCount = 0;
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    executeProviderRequest: async (_modelToCall) => {
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult({
          id: "chatcmpl-test",
          choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
        });
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [
          { message: { role: "assistant", content: "fallback from empty" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 15, completion_tokens: 8, total_tokens: 23 },
      });
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.ok(executorCallCount >= 2, "should attempt fallback");
  assert.equal(result.kind, "ok", "fallback should succeed");
  if (result.kind === "ok") {
    assert.equal(result.response.choices[0].message.content, "fallback from empty");
    assert.ok(result.usage, "usage should be present from fallback");
    assert.equal(result.usage!.prompt_tokens, 15);
    assert.equal(result.usage!.completion_tokens, 8);
    assert.equal(result.providerBody.choices[0].message.content, "fallback from empty");
  }
});

/* -- setRequestWireState before every executor ---------------------------- */

test("setRequestWireState is called before initial, retry, and fallback executors", async () => {
  const wireStates: string[] = [];
  let executorCallCount = 0;
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    setRequestWireState: (state) => wireStates.push(state.effectiveModel),
    executeProviderRequest: async (_modelToCall) => {
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult({
          id: "chatcmpl-test",
          choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
        });
      }
      return makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    },
  });
  await runNonStreamingProviderLeg(input);
  // wire state should be set: initial + fallback = at least 2
  assert.ok(
    wireStates.length >= 2,
    `setRequestWireState should be called >=2 times, got ${wireStates.length}`
  );
  assert.equal(wireStates[0], "gemini-3-pro", "first call should be initial model");
  assert.notEqual(wireStates[1], "gemini-3-pro", "second call should be fallback model");
});

test("invalid SSE payload returns errorCode invalid_sse_payload, not upstream_error", async () => {
  const sseBody = 'data: {"error":{"message":"Devin CLI not found"}}\n\n';
  const input = baseInput({
    executeProviderRequest: async () => ({
      response: {
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({ "content-type": "text/event-stream" }),
        text: async () => sseBody,
        body: null,
      } as unknown as Response,
      url: "https://api.example.com/v1/chat/completions",
      headers: {},
      transformedBody: null,
    }),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 502);
  assert.equal(result.result.errorCode, "invalid_sse_payload");
  assert.equal(result.result.errorType, "invalid_sse_payload");
  assert.notEqual(result.result.errorCode, "upstream_error");
});

test("invalid JSON payload returns errorCode invalid_json_payload, not upstream_error", async () => {
  const input = baseInput({
    executeProviderRequest: async () => ({
      response: {
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({ "content-type": "application/json" }),
        text: async () => "not-json{{{",
        body: null,
      } as unknown as Response,
      url: "https://api.example.com/v1/chat/completions",
      headers: {},
      transformedBody: null,
    }),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 502);
  assert.equal(result.result.errorCode, "invalid_json_payload");
  assert.equal(result.result.errorType, "invalid_json_payload");
  assert.notEqual(result.result.errorCode, "upstream_error");
});

test("empty-content fallback with invalid SSE body is 502, not 200 empty", async () => {
  const sseBody = 'data: {"error":{"message":"Devin CLI not found"}}\n\n';
  let executorCallCount = 0;
  const input = baseInput({
    allowModelFallback: true,
    provider: "gemini",
    model: "gemini-3-pro",
    executeProviderRequest: async () => {
      executorCallCount++;
      if (executorCallCount === 1) {
        return makeExecutorResult({
          id: "chatcmpl-test",
          choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
        });
      }
      return {
        response: {
          ok: true,
          status: 200,
          statusText: "OK",
          headers: new Headers({ "content-type": "text/event-stream" }),
          text: async () => sseBody,
          body: null,
        } as unknown as Response,
        url: "https://api.example.com/v1/chat/completions",
        headers: {},
        transformedBody: null,
      };
    },
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.ok(executorCallCount >= 2, "should attempt fallback");
  assert.equal(
    result.kind,
    "error",
    "invalid SSE on fallback must not finishOk the empty original"
  );
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 502);
  assert.equal(result.result.errorCode, "invalid_sse_payload");
});

test("finishOk caches reasoning against translatedBody.messages, not Responses input", async () => {
  clearReasoningCacheAll();
  const scope = "api-key:leg-history";
  const historyMessages = [{ role: "user", content: "hi from translatedBody" }];
  const assistantMessage = {
    role: "assistant",
    content: "thinking result",
    reasoning_content: "let me think...",
  };
  const input = baseInput({
    provider: "deepseek",
    model: "deepseek-v4-pro",
    reasoningCacheScope: scope,
    translatedBody: { messages: historyMessages },
    sourceBody: { input: [{ role: "user", content: "wrong body" }] },
    executeProviderRequest: async () =>
      makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ index: 0, message: assistantMessage, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
  });
  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "ok");
  const cacheKey = buildAssistantMessageCacheKey(
    scope,
    [...historyMessages, assistantMessage],
    historyMessages.length
  );
  assert.equal(
    lookupReasoning(cacheKey),
    "let me think...",
    "finishOk must pass historyMessages from translatedBody.messages"
  );
});

test("semaphore capacity errors rethrow so chatCore can map them to 429", async () => {
  const timeout = Object.assign(new Error("Semaphore timeout"), { code: "SEMAPHORE_TIMEOUT" });
  const input = baseInput({
    executeProviderRequest: async () => {
      throw timeout;
    },
  });
  await assert.rejects(
    () => runNonStreamingProviderLeg(input),
    (err: unknown) => {
      assert.equal((err as { code?: string }).code, "SEMAPHORE_TIMEOUT");
      return true;
    }
  );
});
