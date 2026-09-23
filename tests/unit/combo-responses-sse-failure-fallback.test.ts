import test from "node:test";
import assert from "node:assert/strict";

import { handleComboChat, validateResponseQuality } from "../../open-sse/services/combo.ts";
import {
  clearNativeCodexTurnPinsForTests,
  pinNativeCodexTurn,
} from "../../open-sse/services/combo/nativeCodexTurnPin.ts";
import {
  clearAllModelLockouts,
  getModelLockoutInfo,
} from "../../open-sse/services/accountFallback.ts";

const encoder = new TextEncoder();

test.beforeEach(() => clearAllModelLockouts());
test.after(() => clearAllModelLockouts());

function sseResponse(body: string): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(body));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function silentLog() {
  return { info() {}, warn() {}, error() {}, debug() {} };
}

function failedResponsesSse(): string {
  return [
    "event: response.failed",
    `data: ${JSON.stringify({
      type: "response.failed",
      response: {
        status: "failed",
        error: { code: "no_capacity", type: "server_error", message: "peak capacity" },
      },
    })}`,
    "",
    "",
  ].join("\n");
}

function invalidRequestSse(): string {
  return [
    "event: response.failed",
    `data: ${JSON.stringify({
      type: "response.failed",
      response: {
        status: "failed",
        error: {
          code: "invalid_request_error",
          type: "invalid_request_error",
          message: "request is invalid token=secret-value at /srv/private/config.json",
          status_code: 400,
        },
      },
    })}`,
    "",
    "",
  ].join("\n");
}

test("streaming quality rejects a pre-content response.failed event", async () => {
  const result = await validateResponseQuality(
    sseResponse(failedResponsesSse()),
    true,
    silentLog()
  );

  assert.equal(result.valid, false);
  assert.match(result.reason ?? "", /^streaming upstream error/);
  assert.equal(result.upstreamFailure?.status, 502);
  assert.equal(result.upstreamFailure?.retryable, true);
});

test("streaming quality rejects a pre-content top-level error envelope", async () => {
  const body = [
    "event: error",
    `data: ${JSON.stringify({
      error: { type: "server_error", message: "temporarily unavailable" },
    })}`,
    "",
    "",
  ].join("\n");

  const result = await validateResponseQuality(sseResponse(body), true, silentLog());

  assert.equal(result.valid, false);
  assert.match(result.reason ?? "", /^streaming upstream error/);
  assert.equal(result.upstreamFailure?.status, 502);
  assert.equal(result.upstreamFailure?.retryable, true);
});

test("streaming quality preserves request-scoped upstream failure metadata", async () => {
  const result = await validateResponseQuality(sseResponse(invalidRequestSse()), true, silentLog());

  assert.equal(result.valid, false);
  assert.deepEqual(result.upstreamFailure, {
    status: 400,
    type: "invalid_request_error",
    code: "invalid_request_error",
    message: "request is invalid token=[REDACTED] at <path>",
    requestScoped: true,
    retryable: false,
  });
});

test("context input errors map to HTTP 400 without an explicit status", async () => {
  for (const code of ["context_length_exceeded", "context_window_exceeded"]) {
    const body = [
      "event: response.failed",
      `data: ${JSON.stringify({
        type: "response.failed",
        response: {
          status: "failed",
          error: { code, type: code, message: "request exceeds the model context" },
        },
      })}`,
      "",
      "",
    ].join("\n");

    const result = await validateResponseQuality(sseResponse(body), true, silentLog());
    assert.equal(result.upstreamFailure?.status, 400);
    assert.equal(result.upstreamFailure?.requestScoped, true);
    assert.equal(result.upstreamFailure?.retryable, false);
  }
});

test("invalid_request_error code maps to HTTP 400 without a type field", async () => {
  const body = [
    "event: response.failed",
    `data: ${JSON.stringify({
      type: "response.failed",
      response: {
        status: "failed",
        error: { code: "invalid_request_error", message: "request is invalid" },
      },
    })}`,
    "",
    "",
  ].join("\n");

  const result = await validateResponseQuality(sseResponse(body), true, silentLog());
  assert.equal(result.upstreamFailure?.status, 400);
  assert.equal(result.upstreamFailure?.requestScoped, true);
});

test("request-scoped streaming refusal falls back without retrying or locking the model", async () => {
  const calls: string[] = [];
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "fallback ok" })}`,
    "",
    "",
  ].join("\n");

  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "request-scoped-stream-fallback",
      strategy: "priority",
      models: [
        { model: "codex/gpt-6-astra-high", connectionId: "conn-astra", weight: 0 },
        { model: "codex/gpt-5.6-sol", connectionId: "conn-sol", weight: 0 },
      ],
      config: { maxRetries: 1, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return model.endsWith("/gpt-6-astra-high")
        ? sseResponse(invalidRequestSse())
        : sseResponse(healthy);
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: {
      modelLockout: {
        enabled: true,
        errorCodes: [400, 502],
        baseCooldownMs: 120_000,
        maxCooldownMs: 1_800_000,
        maxBackoffSteps: 10,
        useExponentialBackoff: true,
      },
    },
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["codex/gpt-6-astra-high", "codex/gpt-5.6-sol"]);
  assert.equal(getModelLockoutInfo("codex", "conn-astra", "gpt-6-astra-high"), null);
});

test("single-target request-scoped streaming refusal preserves HTTP 400", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "request-scoped-stream-terminal",
      strategy: "priority",
      models: [{ model: "codex/gpt-6-astra-high", connectionId: "conn-astra", weight: 0 }],
      config: { maxRetries: 1, maxSetRetries: 1, retryDelayMs: 0, setRetryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return sseResponse(invalidRequestSse());
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.status, 400);
  assert.deepEqual(calls, ["codex/gpt-6-astra-high"]);
});

test("request-scoped refusal is not replayed against the same model on another account", async () => {
  const calls: string[] = [];
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "fallback ok" })}`,
    "",
    "",
  ].join("\n");

  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "request-scoped-same-model-skip",
      strategy: "priority",
      models: [
        { model: "codex/gpt-6-astra-high", connectionId: "conn-astra-1", weight: 0 },
        { model: "codex/gpt-6-astra-high", connectionId: "conn-astra-2", weight: 0 },
        { model: "codex/gpt-5.6-sol", connectionId: "conn-sol", weight: 0 },
      ],
      config: { maxRetries: 0, maxSetRetries: 1, retryDelayMs: 0, setRetryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string, target) => {
      const connectionId = (target as { connectionId?: string } | undefined)?.connectionId;
      calls.push(`${model}@${connectionId ?? "none"}`);
      return model.endsWith("/gpt-6-astra-high")
        ? sseResponse(invalidRequestSse())
        : sseResponse(healthy);
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["codex/gpt-6-astra-high@conn-astra-1", "codex/gpt-5.6-sol@conn-sol"]);
});

test("combo advances to the next target after a pre-content Responses SSE failure", async () => {
  const calls: string[] = [];
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "fallback ok" })}`,
    "",
    "",
  ].join("\n");

  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "responses-sse-failure-fallback",
      strategy: "priority",
      models: [
        { model: "openai/primary", weight: 0 },
        { model: "openai/secondary", weight: 0 },
      ],
      config: { maxRetries: 0, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return model.endsWith("/primary") ? sseResponse(failedResponsesSse()) : sseResponse(healthy);
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/primary", "openai/secondary"]);
  assert.match(await result.text(), /fallback ok/);
});

test("round-robin retries a transient streaming failure on the same target", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "round-robin-transient-stream-retry",
      strategy: "round-robin",
      models: [{ model: "codex/gpt-6-astra-high", connectionId: "conn-astra", weight: 0 }],
      config: { maxRetries: 1, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return sseResponse(failedResponsesSse());
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.status, 502);
  assert.deepEqual(calls, ["codex/gpt-6-astra-high", "codex/gpt-6-astra-high"]);
});

test("round-robin does not retry a request-scoped streaming refusal", async () => {
  const calls: string[] = [];
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "fallback ok" })}`,
    "",
    "",
  ].join("\n");
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "round-robin-request-scoped-fallback",
      strategy: "round-robin",
      models: [
        { model: "codex/gpt-6-astra-high", connectionId: "conn-astra", weight: 0 },
        { model: "codex/gpt-5.6-sol", connectionId: "conn-sol", weight: 0 },
      ],
      config: { maxRetries: 1, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return model.endsWith("/gpt-6-astra-high")
        ? sseResponse(invalidRequestSse())
        : sseResponse(healthy);
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["codex/gpt-6-astra-high", "codex/gpt-5.6-sol"]);
});

test("round-robin skips the same model on another account after a request-scoped refusal", async () => {
  const calls: string[] = [];
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "fallback ok" })}`,
    "",
    "",
  ].join("\n");

  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "round-robin-same-model-skip",
      strategy: "round-robin",
      models: [
        { model: "codex/gpt-6-astra-high", connectionId: "conn-astra-1", weight: 0 },
        { model: "codex/gpt-6-astra-high", connectionId: "conn-astra-2", weight: 0 },
        { model: "codex/gpt-5.6-sol", connectionId: "conn-sol", weight: 0 },
      ],
      config: { maxRetries: 0, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string, target) => {
      const connectionId = (target as { connectionId?: string } | undefined)?.connectionId;
      calls.push(`${model}@${connectionId ?? "none"}`);
      return model.endsWith("/gpt-6-astra-high")
        ? sseResponse(invalidRequestSse())
        : sseResponse(healthy);
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.equal(
    calls.filter((call) => call.startsWith("codex/gpt-6-astra-high")).length,
    1,
    `the refused model must be dispatched once, saw: ${calls.join(", ")}`
  );
  assert.ok(
    calls.some((call) => call.endsWith("@conn-sol")),
    `the different model must still be attempted, saw: ${calls.join(", ")}`
  );
});

test("transient streaming failure still records a configured model lockout", async () => {
  const model = "gpt-6-astra-high";
  const connectionId = "conn-transient";
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "transient-stream-lockout",
      strategy: "priority",
      models: [{ model: `codex/${model}`, connectionId, weight: 0 }],
      config: { maxRetries: 0, retryDelayMs: 0 },
    },
    handleSingleModel: async () => sseResponse(failedResponsesSse()),
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: {
      modelLockout: {
        enabled: true,
        errorCodes: [502],
        baseCooldownMs: 120_000,
        maxCooldownMs: 1_800_000,
        maxBackoffSteps: 10,
        useExponentialBackoff: true,
      },
    },
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.status, 502);
  assert.notEqual(getModelLockoutInfo("codex", connectionId, model), null);
});

test("protected pre-content streaming quality rejection retries the same target once without advancing", async () => {
  const calls: string[] = [];
  const failed = failedResponsesSse();
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "retry ok" })}`,
    "",
    "",
  ].join("\n");
  const combo = {
    name: "protected-stream-quality-retry",
    strategy: "priority",
    models: [
      {
        model: "openai/primary",
        weight: 0,
        fallbackOnlyOnQuotaExhaustion: true,
      },
      { model: "anthropic/backup", weight: 0 },
    ],
    config: { maxRetries: 1, retryDelayMs: 0 },
  };

  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo,
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return calls.length === 1 ? sseResponse(failed) : sseResponse(healthy);
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: [combo],
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/primary", "openai/primary"]);
  assert.match(await result.text(), /retry ok/);
});

test("native pinned pre-content stream failure still retries the same target safely", async () => {
  clearNativeCodexTurnPinsForTests();
  const body = {
    stream: true,
    messages: [{ role: "user", content: "hello" }],
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({ thread_id: "t1", turn_id: "turn1" }),
    },
  };
  const combo = {
    name: "native-pinned-stream-quality-retry",
    strategy: "priority",
    models: [
      {
        model: "codex/gpt-5.6-sol",
        connectionId: "conn-1",
        fallbackOnlyOnQuotaExhaustion: true,
        weight: 0,
      },
    ],
    config: { maxRetries: 1, retryDelayMs: 0 },
  };
  pinNativeCodexTurn({
    body,
    comboName: combo.name,
    target: {
      kind: "model",
      stepId: "codex-step",
      executionKey: "codex-step",
      modelStr: "codex/gpt-5.6-sol",
      provider: "codex",
      providerId: null,
      connectionId: "conn-1",
      weight: 0,
      label: null,
    },
    connectionId: "conn-1",
  });

  const calls: string[] = [];
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "retry ok" })}`,
    "",
    "",
  ].join("\n");
  const result = await handleComboChat({
    body,
    combo,
    clientManagedResponsesContext: true,
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return calls.length === 1 ? sseResponse(failedResponsesSse()) : sseResponse(healthy);
    },
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: [combo],
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["codex/gpt-5.6-sol", "codex/gpt-5.6-sol"]);
  assert.match(await result.text(), /retry ok/);
  clearNativeCodexTurnPinsForTests();
});

test("combo cancels a discarded upstream stream after a pre-content Responses SSE failure", async () => {
  let resolvePrimaryCancelled: (() => void) | undefined;
  const primaryCancelled = new Promise<void>((resolve) => {
    resolvePrimaryCancelled = resolve;
  });
  const primary = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(failedResponsesSse()));
      },
      cancel() {
        resolvePrimaryCancelled?.();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
  const healthy = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "fallback ok" })}`,
    "",
    "",
  ].join("\n");

  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "responses-sse-failure-cancellation",
      strategy: "priority",
      models: [
        { model: "openai/primary", weight: 0 },
        { model: "openai/secondary", weight: 0 },
      ],
      config: { maxRetries: 0, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) =>
      model.endsWith("/primary") ? primary : sseResponse(healthy),
    isModelAvailable: async () => true,
    log: silentLog(),
    settings: null,
    allCombos: null,
    relayOptions: null as never,
  });

  assert.equal(result.ok, true);
  assert.match(await result.text(), /fallback ok/);

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      primaryCancelled,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error("discarded primary stream was not cancelled")),
          250
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
});

test("streaming quality still replays normal Responses lifecycle and content", async () => {
  const body = [
    "event: response.created",
    `data: ${JSON.stringify({ type: "response.created", response: { id: "resp_1" } })}`,
    "",
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "hello" })}`,
    "",
    "",
  ].join("\n");

  const result = await validateResponseQuality(sseResponse(body), true, silentLog());

  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse);
  assert.equal(await result.clonedResponse.text(), body);
});
