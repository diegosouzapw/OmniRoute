/**
 * #11462: the nested runtime-unit loop (open-sse/services/combo/runtimeUnits.ts,
 * used by the pipeline/fusion combo strategies via dispatchPrelude.ts and
 * fusionPanel.ts) had the same bare-`errorResponse()` gap as the round-robin
 * strategy's "Maximum combo retry limit reached" 503 — no diagnostics trace.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { executeRuntimeUnitCombo } from "../../open-sse/services/combo/runtimeUnits.ts";
import type {
  ResolvedComboUnit,
  ComboNestingContext,
} from "../../open-sse/services/combo/types.ts";

function noopLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

function failResponse(): Response {
  return new Response(JSON.stringify({ error: { message: "upstream 500" } }), {
    status: 500,
    headers: { "content-type": "application/json" },
  });
}

function failedSseResponse(
  error: Record<string, unknown> = {
    type: "server_error",
    code: "no_capacity",
    message: "peak capacity",
  }
): Response {
  const body = [
    "event: response.failed",
    `data: ${JSON.stringify({
      type: "response.failed",
      response: {
        status: "failed",
        error,
      },
    })}`,
    "",
    "",
  ].join("\n");
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test(
  "#11462: nested runtime-unit combo's attempt-budget-exceeded 503 must carry " +
    "the combo diagnostics trace (poolSize/attemptOrder/terminalReason)",
  async () => {
    const units: ResolvedComboUnit[] = [
      {
        kind: "model",
        stepId: "step-a",
        executionKey: "a",
        modelStr: "openai/ru-a",
        provider: "openai",
        providerId: null,
        connectionId: null,
        weight: 1,
        label: null,
      },
      {
        kind: "model",
        stepId: "step-b",
        executionKey: "b",
        modelStr: "anthropic/ru-b",
        provider: "anthropic",
        providerId: null,
        connectionId: null,
        weight: 1,
        label: null,
      },
    ];

    const nesting: ComboNestingContext = {
      depth: 0,
      maxDepth: 5,
      visitedComboNames: [],
      rootComboName: "ru-probe-11462",
      // Budget of 1 trips on the very first attempt, deterministically hitting the
      // terminal branch under test without needing every unit to actually fail.
      attemptBudget: { count: 0, limit: 1 },
    };

    const result = await executeRuntimeUnitCombo({
      body: { messages: [{ role: "user", content: "hi" }] },
      combo: { name: "ru-probe-11462", strategy: "pipeline" },
      strategy: "pipeline",
      units,
      handleSingleModel: async () => failResponse(),
      log: noopLog() as never,
      config: { maxRetries: 0 },
      allCombos: [],
      nesting,
      baseOptions: {} as never,
      runCombo: async () => failResponse(),
    });

    assert.equal(result.response.status, 503);
    const body = (await result.response.json()) as {
      error: { message: string };
      diagnostics?: { poolSize: number; attemptOrder: unknown[]; terminalReason: string };
    };
    assert.equal(body.error.message, "Maximum combo retry limit reached");
    assert.ok(body.diagnostics, "runtime-unit 503 should carry a diagnostics field");
    assert.ok(typeof body.diagnostics?.poolSize === "number");
    assert.ok(Array.isArray(body.diagnostics?.attemptOrder));
    assert.equal(body.diagnostics?.terminalReason, "max_attempts_exceeded");
  }
);

test("nested runtime-unit retries a classified transient SSE failure", async () => {
  const model = "codex/gpt-6-astra-high";
  const unit: ResolvedComboUnit = {
    kind: "model",
    stepId: "step-astra",
    executionKey: "astra",
    modelStr: model,
    provider: "codex",
    providerId: null,
    connectionId: "conn-astra",
    weight: 1,
    label: null,
  };
  const calls: string[] = [];
  const result = await executeRuntimeUnitCombo({
    body: { stream: true, messages: [{ role: "user", content: "hi" }] },
    combo: { name: "ru-transient-stream", strategy: "pipeline" },
    strategy: "pipeline",
    units: [unit],
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return failedSseResponse();
    },
    log: noopLog() as never,
    config: { maxRetries: 1, retryDelayMs: 0 },
    allCombos: [],
    nesting: {
      depth: 0,
      maxDepth: 5,
      visitedComboNames: [],
      rootComboName: "ru-transient-stream",
      attemptBudget: { count: 0, limit: 4 },
    },
    baseOptions: {} as never,
    runCombo: async () => failResponse(),
  });

  assert.equal(result.response.status, 502);
  assert.deepEqual(calls, [model, model]);
});

test("nested runtime-unit does not retry a request-scoped SSE failure with an explicit 502", async () => {
  const model = "codex/gpt-6-astra-high";
  const unit: ResolvedComboUnit = {
    kind: "model",
    stepId: "step-astra-invalid",
    executionKey: "astra-invalid",
    modelStr: model,
    provider: "codex",
    providerId: null,
    connectionId: "conn-astra",
    weight: 1,
    label: null,
  };
  const calls: string[] = [];
  const result = await executeRuntimeUnitCombo({
    body: { stream: true, messages: [{ role: "user", content: "hi" }] },
    combo: { name: "ru-request-scoped-stream", strategy: "pipeline" },
    strategy: "pipeline",
    units: [unit],
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return failedSseResponse({
        type: "invalid_request_error",
        code: "invalid_request_error",
        message: "request is invalid",
        status_code: 502,
      });
    },
    log: noopLog() as never,
    config: { maxRetries: 1, retryDelayMs: 0 },
    allCombos: [],
    nesting: {
      depth: 0,
      maxDepth: 5,
      visitedComboNames: [],
      rootComboName: "ru-request-scoped-stream",
      attemptBudget: { count: 0, limit: 4 },
    },
    baseOptions: {} as never,
    runCombo: async () => failResponse(),
  });

  assert.equal(result.response.status, 502);
  assert.deepEqual(calls, [model]);
});

test("nested runtime-unit skips the same model on another account after a request-scoped refusal", async () => {
  const model = "codex/gpt-6-astra-high";
  const unit = (connectionId: string, executionKey: string): ResolvedComboUnit => ({
    kind: "model",
    stepId: `step-${executionKey}`,
    executionKey,
    modelStr: model,
    provider: "codex",
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
  });
  const differentModel: ResolvedComboUnit = {
    kind: "model",
    stepId: "step-sol",
    executionKey: "sol",
    modelStr: "codex/gpt-5.6-sol",
    provider: "codex",
    providerId: null,
    connectionId: "conn-sol",
    weight: 1,
    label: null,
  };
  const calls: string[] = [];
  const result = await executeRuntimeUnitCombo({
    body: { stream: true, messages: [{ role: "user", content: "hi" }] },
    combo: { name: "ru-same-model-skip", strategy: "pipeline" },
    strategy: "pipeline",
    units: [unit("conn-astra-1", "astra-1"), unit("conn-astra-2", "astra-2"), differentModel],
    handleSingleModel: async (_body, modelStr, target) => {
      const connectionId = (target as { connectionId?: string } | undefined)?.connectionId;
      calls.push(`${modelStr}@${connectionId ?? "none"}`);
      return modelStr.endsWith("/gpt-6-astra-high")
        ? failedSseResponse({
            type: "invalid_request_error",
            code: "invalid_request_error",
            message: "request is invalid",
            status_code: 400,
          })
        : new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
    },
    log: noopLog() as never,
    config: { maxRetries: 0, retryDelayMs: 0 },
    allCombos: [],
    nesting: {
      depth: 0,
      maxDepth: 5,
      visitedComboNames: [],
      rootComboName: "ru-same-model-skip",
      attemptBudget: { count: 0, limit: 8 },
    },
    baseOptions: {} as never,
    runCombo: async () => failResponse(),
  });

  assert.equal(result.response.status, 200);
  assert.deepEqual(calls, ["codex/gpt-6-astra-high@conn-astra-1", "codex/gpt-5.6-sol@conn-sol"]);
});

test("nested runtime-unit dispatch stamps fallbackAttempts from the unit index", async () => {
  const units: ResolvedComboUnit[] = [
    {
      kind: "model",
      stepId: "step-a",
      executionKey: "a",
      modelStr: "openai/ru-a",
      provider: "openai",
      providerId: null,
      connectionId: null,
      weight: 1,
      label: null,
    },
    {
      kind: "model",
      stepId: "step-b",
      executionKey: "b",
      modelStr: "anthropic/ru-b",
      provider: "anthropic",
      providerId: null,
      connectionId: null,
      weight: 1,
      label: null,
    },
  ];
  const nesting: ComboNestingContext = {
    depth: 0,
    maxDepth: 5,
    visitedComboNames: [],
    rootComboName: "ru-fallback-12339",
    attemptBudget: { count: 0, limit: 8 },
  };
  const seen: Array<{ model: string; fallbackAttempts?: number }> = [];
  const ok = () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  await executeRuntimeUnitCombo({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { name: "ru-fallback-12339", strategy: "pipeline" },
    strategy: "pipeline",
    units,
    handleSingleModel: async (_body, modelStr, target) => {
      seen.push({
        model: modelStr,
        fallbackAttempts: (target as { fallbackAttempts?: number } | undefined)?.fallbackAttempts,
      });
      if (modelStr === "openai/ru-a") {
        return new Response(JSON.stringify({ error: { message: "upstream 500" } }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
      return ok();
    },
    log: noopLog() as never,
    config: { maxRetries: 0, retryDelayMs: 0 },
    allCombos: [],
    nesting,
    baseOptions: {} as never,
    runCombo: async () => failResponse(),
  });
  assert.equal(seen.length, 2);
  assert.equal(seen[0].fallbackAttempts, 0);
  assert.equal(seen[1].fallbackAttempts, 1);
});
