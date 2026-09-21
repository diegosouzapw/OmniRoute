import assert from "node:assert/strict";
import test from "node:test";

assert.ok(process.env.DATA_DIR, "the subprocess fixture requires an isolated DATA_DIR");
assert.ok(
  process.env.OMNIROUTE_PLUGINS_DIR,
  "the subprocess fixture requires an isolated OMNIROUTE_PLUGINS_DIR"
);

const core = await import("../../src/lib/db/core.ts");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { closeCallLogArtifactWriter } = await import("../../src/lib/usage/callLogArtifactWriter.ts");
const { PerplexityWebExecutor } = await import("../../open-sse/executors/perplexity-web.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/perplexityTlsClient.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

type StreamFailure = { status: number; message: string; code?: string; type?: string };

function createPerplexityStream(
  events: Array<Record<string, unknown>>
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const payload =
    events.map((event) => `event: message\r\ndata: ${JSON.stringify(event)}\r\n\r\n`).join("") +
    "event: end_of_stream\r\n\r\n";
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(payload));
      controller.close();
    },
  });
}

async function executeWithUpstreamBody(
  body: ReadableStream<Uint8Array>,
  prompt = "hi"
): Promise<Response> {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "text/event-stream" }),
    text: null,
    body,
  }));

  const executor = new PerplexityWebExecutor();
  const result = await executor.execute({
    model: "pplx-auto",
    body: { messages: [{ role: "user", content: prompt }], stream: true },
    stream: true,
    credentials: { apiKey: "test-cookie" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
  return result.response;
}

function executeStreaming(
  events: Array<Record<string, unknown>>,
  prompt = "hi"
): Promise<Response> {
  return executeWithUpstreamBody(createPerplexityStream(events), prompt);
}

async function executeThroughChatCore(
  events: Array<Record<string, unknown>>,
  prompt = "hi",
  onStreamFailure?: (failure: StreamFailure) => void,
  onRequestSuccess?: () => Promise<void>,
  model = "pplx-auto"
) {
  return executeBodyThroughChatCore(
    createPerplexityStream(events),
    prompt,
    onStreamFailure,
    onRequestSuccess,
    model
  );
}

async function executeBodyThroughChatCore(
  upstreamBody: ReadableStream<Uint8Array>,
  prompt = "hi",
  onStreamFailure?: (failure: StreamFailure) => void,
  onRequestSuccess?: () => Promise<void>,
  model = "pplx-auto"
) {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "text/event-stream" }),
    text: null,
    body: upstreamBody,
  }));
  const body = {
    model,
    messages: [{ role: "user", content: prompt }],
    stream: true,
  };
  return handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "perplexity-web", model, extendedContext: false },
    credentials: { apiKey: "test-cookie", providerSpecificData: {} },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    onRequestSuccess,
    onStreamFailure,
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "perplexity-stream-error-boundary-test",
    skipResourcePressureGuard: true,
  });
}

function assertNoSensitiveDetail(value: string): void {
  assert.doesNotMatch(value, /private-runtime\.ts/);
  assert.doesNotMatch(value, /sk-pplx-secret/);
  assert.doesNotMatch(value, /api_key/);
}

function assertChatCompletionWire(value: string): void {
  assert.doesNotMatch(value, /^event:/m, "Chat Completions must not receive Responses framing");
  const payloads = value
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:") && line.slice(5).trim() !== "[DONE]")
    .map((line) => JSON.parse(line.slice(5).trim()) as Record<string, unknown>);
  assert.ok(payloads.length > 0);
  for (const payload of payloads) {
    assert.equal(payload.object, "chat.completion.chunk");
    assert.ok(Array.isArray(payload.choices));
    for (const choice of payload.choices as Array<Record<string, unknown>>) {
      assert.equal(choice.index, 0);
      assert.equal(typeof choice.delta, "object");
      assert.ok(
        choice.finish_reason === null || typeof choice.finish_reason === "string",
        "finish_reason must remain Chat Completions-compatible"
      );
    }
  }
  assert.match(value, /data: \[DONE\]/);
}

async function waitForPersistedStreamFailure(startedAt: Date, model = "pplx-auto") {
  for (let attempt = 0; attempt < 80; attempt++) {
    const rows = await getUsageHistory({
      provider: "perplexity-web",
      model,
      startDate: startedAt,
    });
    const failure = rows.find(
      (row) =>
        row.success === false && row.status === "502" && row.errorCode === "stream_pipeline_error"
    );
    if (failure) return failure;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function waitForCondition(predicate: () => boolean, timeoutMs = 500): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return true;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return predicate();
}

test.afterEach(() => {
  __setTlsFetchOverrideForTesting(null);
});

test.after(async () => {
  __setTlsFetchOverrideForTesting(null);
  assert.equal(
    await waitForCallLogSaves(3_000),
    true,
    "call-log writes must drain before the isolated DATA_DIR is removed"
  );
  await closeCallLogArtifactWriter();
  core.resetDbInstance();
});

test("pre-content Perplexity failures remain unready and return a sanitized 502", async () => {
  const result = await executeThroughChatCore([
    {
      error_code: "PPLX_ERROR",
      error_message:
        "failed at /srv/omniroute/private-runtime.ts:42:7 token=sk-pplx-secret-123456 api_key=hidden",
    },
  ]);

  assert.equal(result.success, false, "the handler must expose a fallback-eligible failure");
  assert.equal(result.status, 502);
  assert.equal(result.response.status, 502);
  assert.equal(result.errorCode, "STREAM_EARLY_EOF");
  const body = await result.response.text();
  assert.match(body, /"error"/);
  assertNoSensitiveDetail(body);
});

test("thrown Perplexity stream failures remain unready and return a sanitized 502", async () => {
  const result = await executeBodyThroughChatCore(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(
          new Error(
            "socket failed at /srv/omniroute/private-runtime.ts:51:9 token=sk-pplx-secret-catch"
          )
        );
      },
    }),
    "throw before content"
  );

  assert.equal(result.success, false, "the handler must expose a fallback-eligible failure");
  assert.equal(result.status, 502);
  assert.equal(result.response.status, 502);
  const responseBody = await result.response.text();
  assert.match(responseBody, /"error"/);
  assertNoSensitiveDetail(responseBody);
});

test("thrown failures after content preserve the prefix and terminate as a safe error", async () => {
  const encoder = new TextEncoder();
  const partialAnswer = "partial before transport failure";
  let upstreamRead = false;
  let finalizedFailure: StreamFailure | null = null;
  const upstreamBody = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (!upstreamRead) {
        upstreamRead = true;
        controller.enqueue(
          encoder.encode(
            `event: message\r\ndata: ${JSON.stringify({
              backend_uuid: "uuid-thrown-must-not-store",
              blocks: [
                {
                  intended_usage: "markdown",
                  markdown_block: { chunks: [partialAnswer], progress: "IN_PROGRESS" },
                },
              ],
              status: "PENDING",
            })}\r\n\r\n`
          )
        );
        return;
      }
      controller.error(
        new Error(
          "transport failed at /srv/omniroute/private-runtime.ts:79 token=sk-pplx-secret-after"
        )
      );
    },
  });

  const result = await executeBodyThroughChatCore(
    upstreamBody,
    "post-content transport failure",
    (failure) => {
      finalizedFailure = failure;
    }
  );

  assert.equal(result.success, true);
  const output = await result.response.text();
  assert.match(output, new RegExp(partialAnswer));
  assert.match(output, /"finish_reason":"error"/);
  assert.doesNotMatch(output, /"finish_reason":"stop"/);
  assert.doesNotMatch(output, /response\.failed/);
  assertNoSensitiveDetail(output);
  assertChatCompletionWire(output);
  assert.ok(finalizedFailure);
  assert.equal(finalizedFailure.status, 502);
  assert.equal(finalizedFailure.message, "Perplexity upstream stream failed");
});

test("partial content is preserved before a terminal error and the failed session is not stored", async () => {
  const firstPrompt = "partial-boundary-first-prompt";
  const partialAnswer = "safe partial answer";
  const requestStartedAt = new Date(Date.now() - 1_000);
  let finalizedFailure: StreamFailure | null = null;
  const firstResult = await executeThroughChatCore(
    [
      {
        backend_uuid: "uuid-must-not-be-stored",
        blocks: [
          {
            intended_usage: "markdown",
            markdown_block: { chunks: [partialAnswer], progress: "IN_PROGRESS" },
          },
        ],
        status: "PENDING",
      },
      {
        error_code: "PPLX_ERROR",
        error_message:
          "later failure at /srv/omniroute/private-runtime.ts:66:2 token=sk-pplx-secret-partial",
      },
    ],
    firstPrompt,
    (failure) => {
      finalizedFailure = failure;
    }
  );

  assert.equal(firstResult.success, true, "legitimate partial output must satisfy readiness");
  const output = await firstResult.response.text();
  assert.match(output, /"role":"assistant"/);
  assert.match(output, new RegExp(partialAnswer));
  assert.match(output, /"error":\{/);
  assert.match(output, /"finish_reason":"error"/);
  assert.doesNotMatch(output, /"finish_reason":"stop"/);
  assert.doesNotMatch(output, /response\.failed/);
  assert.doesNotMatch(output, /event:\s*response\.failed/);
  assert.doesNotMatch(output, /"type":"response\.failed"/);
  assert.doesNotMatch(output, /\[Error:/);
  assertNoSensitiveDetail(output);
  assertChatCompletionWire(output);
  assert.ok(finalizedFailure, "the downstream pipeline must finalize the stream failure");
  assert.equal(finalizedFailure.status, 502);
  assert.equal(finalizedFailure.message, "Perplexity upstream stream failed");
  const persistedFailure = await waitForPersistedStreamFailure(requestStartedAt);
  assert.ok(persistedFailure, "the handler must persist the terminal stream failure");

  let followUpRequestBody: string | undefined;
  __setTlsFetchOverrideForTesting(async (_url, options) => {
    followUpRequestBody = String(options.body ?? "");
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: createPerplexityStream([
        {
          backend_uuid: "next-success-uuid",
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["next answer"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
    };
  });

  const executor = new PerplexityWebExecutor();
  const followUp = await executor.execute({
    model: "pplx-auto",
    body: {
      messages: [
        { role: "user", content: firstPrompt },
        { role: "assistant", content: partialAnswer },
        { role: "user", content: "continue" },
      ],
      stream: false,
    },
    stream: false,
    credentials: { apiKey: "test-cookie" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
  assert.equal(followUp.response.status, 200);
  assert.ok(followUpRequestBody);
  const sent = JSON.parse(followUpRequestBody) as { params?: Record<string, unknown> };
  assert.equal(
    sent.params?.last_backend_uuid,
    undefined,
    "a failed partial response must not create a reusable session"
  );
});

test("same-packet content and error preserve the prefix across repeated readiness handoffs", async () => {
  for (let attempt = 0; attempt < 8; attempt++) {
    const partialAnswer = `same-packet partial ${attempt}`;
    let finalizedFailure: StreamFailure | null = null;
    const result = await executeThroughChatCore(
      [
        {
          backend_uuid: `uuid-same-packet-${attempt}`,
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: [partialAnswer], progress: "IN_PROGRESS" },
            },
          ],
          status: "PENDING",
        },
        {
          error_code: "PPLX_ERROR",
          error_message: `same packet private failure ${attempt} token=sk-pplx-secret-repeat`,
        },
      ],
      `same-packet prompt ${attempt}`,
      (failure) => {
        finalizedFailure = failure;
      }
    );

    assert.equal(result.success, true);
    const output = await result.response.text();
    assert.match(output, new RegExp(partialAnswer));
    assert.match(output, /"finish_reason":"error"/);
    assert.doesNotMatch(output, /"finish_reason":"stop"/);
    assert.doesNotMatch(output, /response\.failed/);
    assertNoSensitiveDetail(output);
    assertChatCompletionWire(output);
    assert.ok(finalizedFailure);
    assert.equal(finalizedFailure.status, 502);
  }
});

test("a delayed success hook cannot erase same-packet content before terminal failure", async () => {
  const partialAnswer = "prefix must survive delayed success bookkeeping";
  const model = "pplx-auto-delayed-success-proof";
  const requestStartedAt = new Date(Date.now() - 1_000);
  let finalizedFailure: StreamFailure | null = null;
  const result = await executeThroughChatCore(
    [
      {
        backend_uuid: "uuid-delayed-success-hook-must-not-store",
        blocks: [
          {
            intended_usage: "markdown",
            markdown_block: { chunks: [partialAnswer], progress: "IN_PROGRESS" },
          },
        ],
        status: "PENDING",
      },
      {
        error_code: "PPLX_ERROR",
        error_message: "private same-packet failure token=sk-pplx-secret-delayed-hook",
      },
    ],
    "delayed success hook prompt",
    (failure) => {
      finalizedFailure = failure;
    },
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 25));
    },
    model
  );

  assert.equal(result.success, true, "the legitimate prefix must satisfy readiness");
  const output = await result.response.text();
  assert.match(output, new RegExp(partialAnswer));
  assert.match(output, /"finish_reason":"error"/);
  assert.doesNotMatch(output, /"finish_reason":"stop"/);
  assert.doesNotMatch(output, /response\.failed/);
  assertNoSensitiveDetail(output);
  assertChatCompletionWire(output);
  assert.ok(finalizedFailure);
  assert.equal(finalizedFailure.status, 502);
  assert.equal(finalizedFailure.message, "Perplexity upstream stream failed");
  assert.ok(
    await waitForPersistedStreamFailure(requestStartedAt, model),
    "the delayed handoff must still persist the terminal stream failure"
  );
});

test("successful streamed completions still store their Perplexity session", async () => {
  const firstPrompt = "successful-session-first-prompt";
  const firstAnswer = "successful session answer";
  const firstResponse = await executeStreaming(
    [
      {
        backend_uuid: "uuid-success-is-stored",
        blocks: [
          {
            intended_usage: "markdown",
            markdown_block: { chunks: [firstAnswer], progress: "DONE" },
          },
        ],
        status: "COMPLETED",
      },
    ],
    firstPrompt
  );
  const firstOutput = await firstResponse.text();
  assert.match(firstOutput, new RegExp(firstAnswer));
  assert.match(firstOutput, /"finish_reason":"stop"/);

  let followUpRequestBody: string | undefined;
  __setTlsFetchOverrideForTesting(async (_url, options) => {
    followUpRequestBody = String(options.body ?? "");
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: createPerplexityStream([
        {
          backend_uuid: "uuid-next-success",
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["continued"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
    };
  });

  const executor = new PerplexityWebExecutor();
  const followUp = await executor.execute({
    model: "pplx-auto",
    body: {
      messages: [
        { role: "user", content: firstPrompt },
        { role: "assistant", content: firstAnswer },
        { role: "user", content: "continue successful session" },
      ],
      stream: false,
    },
    stream: false,
    credentials: { apiKey: "test-cookie" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
  assert.equal(followUp.response.status, 200);
  assert.ok(followUpRequestBody);
  const sent = JSON.parse(followUpRequestBody) as { params?: Record<string, unknown> };
  assert.equal(sent.params?.last_backend_uuid, "uuid-success-is-stored");
});

test("downstream cancellation reaches a stalled Perplexity reader exactly once", async () => {
  const encoder = new TextEncoder();
  const partialAnswer = "cancel after this prefix";
  let firstPull = true;
  let upstreamCancelCount = 0;
  let finalizedFailure: StreamFailure | null = null;
  const upstreamBody = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (firstPull) {
        firstPull = false;
        controller.enqueue(
          encoder.encode(
            `event: message\r\ndata: ${JSON.stringify({
              backend_uuid: "uuid-cancel-must-not-store",
              blocks: [
                {
                  intended_usage: "markdown",
                  markdown_block: { chunks: [partialAnswer], progress: "IN_PROGRESS" },
                },
              ],
              status: "PENDING",
            })}\r\n\r\n`
          )
        );
        return;
      }
      return new Promise<void>(() => {});
    },
    cancel() {
      upstreamCancelCount += 1;
      return new Promise<void>(() => {});
    },
  });

  const result = await executeBodyThroughChatCore(
    upstreamBody,
    "cancel stalled stream",
    (failure) => {
      finalizedFailure = failure;
    }
  );
  assert.equal(result.success, true);
  assert.ok(result.response.body);
  const reader = result.response.body.getReader();
  const decoder = new TextDecoder();
  let prefix = "";
  for (let readCount = 0; readCount < 4 && !prefix.includes(partialAnswer); readCount += 1) {
    const next = await Promise.race([
      reader.read(),
      new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 500)),
    ]);
    if (next === "timeout" || next.done) break;
    prefix += decoder.decode(next.value, { stream: true });
  }

  const cancelResult = await Promise.race([
    reader.cancel("client stopped reading").then(() => "settled"),
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 500)),
  ]);
  assert.match(prefix, new RegExp(partialAnswer));
  assert.doesNotMatch(prefix, /"finish_reason":"stop"/);
  assert.doesNotMatch(prefix, /data: \[DONE\]/);
  assert.equal(cancelResult, "settled", "client cancellation must not await a hostile upstream");
  assert.equal(
    await waitForCondition(() => upstreamCancelCount === 1),
    true,
    "cancellation must reach the real upstream reader"
  );
  assert.equal(upstreamCancelCount, 1);
  await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(finalizedFailure, null, "client cancellation must not finalize as provider failure");

  let followUpRequestBody: string | undefined;
  __setTlsFetchOverrideForTesting(async (_url, options) => {
    followUpRequestBody = String(options.body ?? "");
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: createPerplexityStream([
        {
          backend_uuid: "uuid-after-cancel",
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["answer after cancel"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
    };
  });
  const executor = new PerplexityWebExecutor();
  const followUp = await executor.execute({
    model: "pplx-auto",
    body: {
      messages: [
        { role: "user", content: "cancel stalled stream" },
        { role: "assistant", content: partialAnswer },
        { role: "user", content: "continue after cancellation" },
      ],
      stream: false,
    },
    stream: false,
    credentials: { apiKey: "test-cookie" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
  assert.equal(followUp.response.status, 200);
  assert.ok(followUpRequestBody);
  const sent = JSON.parse(followUpRequestBody) as { params?: Record<string, unknown> };
  assert.equal(
    sent.params?.last_backend_uuid,
    undefined,
    "a cancelled response must not create a reusable session"
  );
});
