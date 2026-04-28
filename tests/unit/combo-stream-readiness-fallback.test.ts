import test from "node:test";
import assert from "node:assert/strict";

import { handleComboChat } from "../../open-sse/services/combo.ts";
import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";

const textEncoder = new TextEncoder();

function createLog() {
  const entries: any[] = [];
  return {
    info: (tag: any, msg: any) => entries.push({ level: "info", tag, msg }),
    warn: (tag: any, msg: any) => entries.push({ level: "warn", tag, msg }),
    error: (tag: any, msg: any) => entries.push({ level: "error", tag, msg }),
    debug: (tag: any, msg: any) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

function okStreamResponse(content: string): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        textEncoder.encode(
          `data: ${JSON.stringify({
            choices: [{ delta: { role: "assistant", content } }],
          })}\n\n`
        )
      );
      controller.enqueue(
        textEncoder.encode(
          `data: ${JSON.stringify({
            choices: [{ delta: {}, finish_reason: "stop" }],
          })}\n\n`
        )
      );
      controller.enqueue(textEncoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function zombieStreamResponse(): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(textEncoder.encode(": keepalive\n\n"));
      controller.enqueue(textEncoder.encode(`data: ${JSON.stringify({ type: "ping" })}\n\n`));
      // Keep the stream open without useful content, matching HTTP 200 zombie streams.
    },
    cancel() {},
  });

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

async function applyStreamReadiness(response: Response): Promise<Response> {
  const result = await ensureStreamReadiness(response, {
    timeoutMs: 10,
    provider: "glm",
    model: "zombie-model",
    log: createLog(),
  });
  return result.response;
}

function errorResponse(status: number, message: string): Response {
  return new Response(
    JSON.stringify({ error: { message, type: "upstream_error" } }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

test("combo falls back when first model returns HTTP 200 zombie SSE stream", async () => {
  const calls: string[] = [];
  const log = createLog();

  const result = await handleComboChat({
    body: {
      stream: true,
      messages: [{ role: "user", content: "hello" }],
    },
    combo: {
      name: "stream-readiness-504-fallback",
      strategy: "priority",
      models: [
        { model: "glm/zombie-model", weight: 0 },
        { model: "openai/gpt-5.4-mini", weight: 0 },
      ],
      config: { maxRetries: 0, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "glm/zombie-model") {
        return applyStreamReadiness(zombieStreamResponse());
      }
      return okStreamResponse("fallback success");
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
    relayOptions: null as any,
  });

  assert.equal(result.ok, true, "combo should succeed via fallback after 504");
  assert.deepEqual(calls, ["glm/zombie-model", "openai/gpt-5.4-mini"]);
  assert.ok(
    log.entries.some(
      (e) =>
        e.level === "warn" &&
        e.tag === "COMBO" &&
        String(e.msg).includes("glm/zombie-model")
    ),
    "combo should log warning for the failed model"
  );
});

test("combo fails when all models return 504", async () => {
  const calls: string[] = [];
  const log = createLog();

  const result = await handleComboChat({
    body: {
      stream: true,
      messages: [{ role: "user", content: "hello" }],
    },
    combo: {
      name: "all-504-test",
      strategy: "priority",
      models: [
        { model: "glm/zombie-a", weight: 0 },
        { model: "glm/zombie-b", weight: 0 },
      ],
      config: { maxRetries: 0, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      return applyStreamReadiness(zombieStreamResponse());
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
    relayOptions: null as any,
  });

  assert.ok(!result.ok, "combo should fail when all models return 504");
  assert.equal(result.status, 504);
  assert.equal(calls.length, 2, "combo should try both models");
});

test("combo retries 504 on same model before falling through (transient retry)", async () => {
  const calls: string[] = [];
  const log = createLog();

  const result = await handleComboChat({
    body: {
      stream: true,
      messages: [{ role: "user", content: "hello" }],
    },
    combo: {
      name: "retry-504-test",
      strategy: "priority",
      models: [
        { model: "glm/zombie", weight: 0 },
        { model: "openai/gpt-5.4-mini", weight: 0 },
      ],
      config: { maxRetries: 1, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "glm/zombie") {
        return errorResponse(504, "Stream produced no useful content within 60000ms");
      }
      return okStreamResponse("fallback after retries");
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
    relayOptions: null as any,
  });

  assert.equal(result.ok, true, "combo should succeed via fallback after retries");
  const zombieCalls = calls.filter((c) => c === "glm/zombie");
  assert.equal(
    zombieCalls.length,
    2,
    "combo should retry zombie once before falling through"
  );
  assert.ok(calls.includes("openai/gpt-5.4-mini"), "combo should reach fallback model");
});

test("combo does not retry stream readiness timeouts on the same model", async () => {
  const calls: string[] = [];
  const log = createLog();

  const result = await handleComboChat({
    body: {
      stream: true,
      messages: [{ role: "user", content: "hello" }],
    },
    combo: {
      name: "no-retry-readiness-timeout-test",
      strategy: "priority",
      models: [
        { model: "glm/zombie", weight: 0 },
        { model: "openai/gpt-5.4-mini", weight: 0 },
      ],
      config: { maxRetries: 1, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "glm/zombie") {
        return applyStreamReadiness(zombieStreamResponse());
      }
      return okStreamResponse("fallback without same-model retry");
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
    relayOptions: null as any,
  });

  assert.equal(result.ok, true, "combo should succeed via fallback");
  assert.deepEqual(calls, ["glm/zombie", "openai/gpt-5.4-mini"]);
});
