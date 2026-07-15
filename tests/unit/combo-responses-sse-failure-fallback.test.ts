import test from "node:test";
import assert from "node:assert/strict";

import { handleComboChat, validateResponseQuality } from "../../open-sse/services/combo.ts";

const encoder = new TextEncoder();

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
        error: { code: "no_capacity", message: "peak capacity" },
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
  assert.equal(result.reason, "streaming upstream error");
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
  assert.equal(result.reason, "streaming upstream error");
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
