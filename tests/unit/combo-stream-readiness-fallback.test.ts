import test from "node:test";
import assert from "node:assert/strict";

import { handleComboChat, validateResponseQuality } from "../../open-sse/services/combo.ts";
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
  return new Response(JSON.stringify({ error: { message, type: "upstream_error" } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function readWithTimeout(response: Response, timeoutMs = 100): Promise<string> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    return await Promise.race([
      response.text(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`Timed out reading response after ${timeoutMs}ms`)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

test("streaming quality peek releases OpenAI-compatible reasoning-only SSE immediately", async () => {
  let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

  const firstChunk = `data: ${JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    choices: [
      {
        delta: { role: "assistant", content: "", reasoning_content: "thinking" },
        finish_reason: null,
      },
    ],
  })}\n\n`;

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      controller.enqueue(textEncoder.encode(firstChunk));
    },
  });

  const result = await Promise.race([
    validateResponseQuality(
      new Response(body, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }),
      true,
      createLog()
    ),
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 50)),
  ]);

  assert.notEqual(result, "timeout", "quality peek should not wait for the full OpenAI stream");
  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse, "quality peek should replay the already-read prefix");

  streamController?.enqueue(textEncoder.encode("data: [DONE]\n\n"));
  streamController?.close();

  const text = await readWithTimeout(result.clonedResponse);
  assert.match(text, /reasoning_content/);
  assert.match(text, /\[DONE\]/);
});

test("streaming quality peek waits past OpenAI-compatible empty header chunks", async () => {
  let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

  const emptyHeaderChunk = `data: ${JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    choices: [
      {
        delta: { role: "assistant", content: "" },
        finish_reason: null,
      },
    ],
  })}\n\n`;

  const reasoningChunk = `data: ${JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    choices: [
      {
        delta: { content: "", reasoning_content: "thinking" },
        finish_reason: null,
      },
    ],
  })}\n\n`;

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      controller.enqueue(textEncoder.encode(emptyHeaderChunk));
    },
  });

  const qualityPromise = validateResponseQuality(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }),
    true,
    createLog()
  );

  const earlyResult = await Promise.race([
    qualityPromise.then(() => "released"),
    new Promise<"pending">((resolve) => setTimeout(() => resolve("pending"), 50)),
  ]);

  assert.equal(earlyResult, "pending", "empty OpenAI-compatible wrapper should not release");

  streamController?.enqueue(textEncoder.encode(reasoningChunk));

  const result = await Promise.race([
    qualityPromise,
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
  ]);

  assert.notEqual(result, "timeout", "quality peek should release when reasoning starts");
  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse, "quality peek should replay both buffered chunks");

  streamController?.enqueue(textEncoder.encode("data: [DONE]\n\n"));
  streamController?.close();

  const text = await readWithTimeout(result.clonedResponse);
  assert.match(text, /"role":"assistant"/);
  assert.match(text, /reasoning_content/);
  assert.match(text, /\[DONE\]/);
});

test("streaming quality peek waits past OpenAI-compatible finish-only chunks", async () => {
  let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

  const finishOnlyChunk = `data: ${JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    choices: [{ delta: {}, finish_reason: "stop" }],
  })}\n\n`;

  const contentChunk = `data: ${JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    choices: [{ delta: { content: "answer" }, finish_reason: null }],
  })}\n\n`;

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      controller.enqueue(textEncoder.encode(finishOnlyChunk));
    },
  });

  const qualityPromise = validateResponseQuality(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }),
    true,
    createLog()
  );

  const earlyResult = await Promise.race([
    qualityPromise.then(() => "released"),
    new Promise<"pending">((resolve) => setTimeout(() => resolve("pending"), 50)),
  ]);

  assert.equal(earlyResult, "pending", "finish-only OpenAI chunk should not release");

  streamController?.enqueue(textEncoder.encode(contentChunk));

  const result = await Promise.race([
    qualityPromise,
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
  ]);

  assert.notEqual(result, "timeout", "quality peek should release when content starts");
  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse, "quality peek should replay buffered finish and content chunks");

  streamController?.enqueue(textEncoder.encode("data: [DONE]\n\n"));
  streamController?.close();

  const text = await readWithTimeout(result.clonedResponse);
  assert.match(text, /finish_reason/);
  assert.match(text, /"content":"answer"/);
});

test("streaming quality peek waits past Responses lifecycle-only events", async () => {
  let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

  const lifecycleEvent = [
    "event: response.created",
    `data: ${JSON.stringify({ response: { id: "resp_test" } })}`,
    "",
    "",
  ].join("\n");

  const textDeltaEvent = [
    "event: response.output_text.delta",
    `data: ${JSON.stringify({ delta: "visible" })}`,
    "",
    "",
  ].join("\n");

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      controller.enqueue(textEncoder.encode(lifecycleEvent));
    },
  });

  const qualityPromise = validateResponseQuality(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }),
    true,
    createLog()
  );

  const earlyResult = await Promise.race([
    qualityPromise.then(() => "released"),
    new Promise<"pending">((resolve) => setTimeout(() => resolve("pending"), 50)),
  ]);

  assert.equal(earlyResult, "pending", "response.created should not release quality peek");

  streamController?.enqueue(textEncoder.encode(textDeltaEvent));

  const result = await Promise.race([
    qualityPromise,
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
  ]);

  assert.notEqual(result, "timeout", "quality peek should release on Responses text delta");
  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse);

  streamController?.close();
  const text = await readWithTimeout(result.clonedResponse);
  assert.match(text, /response.created/);
  assert.match(text, /response.output_text.delta/);
});

test("streaming quality peek waits past Gemini finish-only candidates", async () => {
  let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

  const finishOnlyChunk = `data: ${JSON.stringify({
    candidates: [{ finishReason: "STOP", content: { parts: [] } }],
  })}\n\n`;

  const textChunk = `data: ${JSON.stringify({
    candidates: [{ content: { parts: [{ text: "gemini text" }] } }],
  })}\n\n`;

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      controller.enqueue(textEncoder.encode(finishOnlyChunk));
    },
  });

  const qualityPromise = validateResponseQuality(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }),
    true,
    createLog()
  );

  const earlyResult = await Promise.race([
    qualityPromise.then(() => "released"),
    new Promise<"pending">((resolve) => setTimeout(() => resolve("pending"), 50)),
  ]);

  assert.equal(earlyResult, "pending", "finish-only Gemini candidate should not release");

  streamController?.enqueue(textEncoder.encode(textChunk));

  const result = await Promise.race([
    qualityPromise,
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
  ]);

  assert.notEqual(result, "timeout", "quality peek should release on Gemini text parts");
  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse);

  streamController?.close();
  const text = await readWithTimeout(result.clonedResponse);
  assert.match(text, /gemini text/);
});

test("streaming quality peek parses legal multi-line SSE data before releasing", async () => {
  const payload = JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    choices: [{ delta: { reasoning_content: "split thinking" }, finish_reason: null }],
  });
  const splitAt = payload.indexOf('"choices"') - 1;
  assert.ok(splitAt > 0);

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        textEncoder.encode(
          `data: ${payload.slice(0, splitAt)}\ndata: ${payload.slice(splitAt)}\n\n`
        )
      );
    },
  });

  const result = await Promise.race([
    validateResponseQuality(
      new Response(body, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }),
      true,
      createLog()
    ),
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
  ]);

  assert.notEqual(result, "timeout", "quality peek should release on multi-line SSE reasoning");
  assert.equal(result.valid, true);
  assert.ok(result.clonedResponse);
});

test("streaming quality peek still rejects complete Claude lifecycle without content blocks", async () => {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        textEncoder.encode(
          [
            `event: message_start`,
            `data: ${JSON.stringify({ type: "message_start", message: { id: "msg_1" } })}`,
            "",
            `event: message_delta`,
            `data: ${JSON.stringify({ type: "message_delta", delta: { stop_reason: "content_filter" } })}`,
            "",
            `event: message_stop`,
            `data: ${JSON.stringify({ type: "message_stop" })}`,
            "",
            "",
          ].join("\n")
        )
      );
      controller.close();
    },
  });

  const result = await validateResponseQuality(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }),
    true,
    createLog()
  );

  assert.equal(result.valid, false);
  assert.equal(result.reason, "streaming empty content block");
});

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
      (e) => e.level === "warn" && e.tag === "COMBO" && String(e.msg).includes("glm/zombie-model")
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
        { model: "openai/gpt-5.4-mini", weight: 0 },
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
  assert.deepEqual(calls, ["glm/zombie-a", "openai/gpt-5.4-mini"]);
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
  assert.equal(zombieCalls.length, 2, "combo should retry zombie once before falling through");
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
