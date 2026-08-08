import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";
import { hasStreamReadinessSignal } from "../../open-sse/utils/streamReadiness.ts";

const textEncoder = new TextEncoder();

function crc32(buf) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }

  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concatArrays(...arrays) {
  const total = arrays.reduce((sum, array) => sum + array.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }
  return result;
}

function encodeHeader(name, value) {
  const nameBytes = textEncoder.encode(name);
  const valueBytes = textEncoder.encode(value);
  const header = new Uint8Array(1 + nameBytes.length + 1 + 2 + valueBytes.length);
  let offset = 0;
  header[offset++] = nameBytes.length;
  header.set(nameBytes, offset);
  offset += nameBytes.length;
  header[offset++] = 7;
  header[offset++] = (valueBytes.length >> 8) & 0xff;
  header[offset++] = valueBytes.length & 0xff;
  header.set(valueBytes, offset);
  return header;
}

function buildEventFrame(eventType, payload) {
  const headers = encodeHeader(":event-type", eventType);
  const payloadBytes =
    payload === null
      ? new Uint8Array()
      : typeof payload === "string"
        ? textEncoder.encode(payload)
        : textEncoder.encode(JSON.stringify(payload));
  const totalLength = 12 + headers.length + payloadBytes.length + 4;
  const frame = new Uint8Array(totalLength);
  const view = new DataView(frame.buffer);
  view.setUint32(0, totalLength, false);
  view.setUint32(4, headers.length, false);
  view.setUint32(8, crc32(frame.slice(0, 8)), false);
  frame.set(headers, 12);
  frame.set(payloadBytes, 12 + headers.length);
  view.setUint32(totalLength - 4, crc32(frame.slice(0, totalLength - 4)), false);
  return frame;
}

function buildEventStreamResponse(frames) {
  return buildEventStreamResponseFromChunks(frames);
}

function buildEventStreamResponseFromChunks(chunks) {
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/vnd.amazon.eventstream" },
    }
  );
}

function parseSSEJsonChunks(text) {
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6).trim())
    .filter((payload) => payload && payload !== "[DONE]")
    .map((payload) => JSON.parse(payload));
}

test("KiroExecutor.transformEventStreamToSSE emits an early role-only start chunk that satisfies stream readiness", async () => {
  const executor = new KiroExecutor();
  // A corrupted prelude frame must NOT trigger the start chunk; only the first
  // successfully-parsed frame should. Here the first valid frame is metadata-only
  // (contextUsageEvent emits no SSE of its own), proving the start chunk is driven
  // by frame parsing rather than by the first content token.
  const invalidPreludeFrame = buildEventFrame("assistantResponseEvent", { content: "skip me" });
  invalidPreludeFrame[8] ^= 0xff;

  const response = buildEventStreamResponse([
    invalidPreludeFrame,
    buildEventFrame("contextUsageEvent", { contextUsagePercentage: 5 }),
    buildEventFrame("assistantResponseEvent", { content: "Answer" }),
    buildEventFrame("messageStopEvent", {}),
    buildEventFrame("metricsEvent", { inputTokens: 3, outputTokens: 5 }),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const text = await transformed.text();
  const chunks = parseSSEJsonChunks(text);

  // The very first emitted chunk is a role-only start frame (no content yet).
  assert.equal(chunks[0].object, "chat.completion.chunk");
  assert.equal(chunks[0].choices[0].delta.role, "assistant");
  assert.equal(chunks[0].choices[0].delta.content, undefined);

  // That first frame alone must release the backend stream-readiness gate so the
  // client is not held until the first content token (the slow-Kiro regression).
  const firstFrameText = `data: ${JSON.stringify(chunks[0])}\n\n`;
  assert.equal(hasStreamReadinessSignal(firstFrameText), true);

  // Content is still delivered, and role is not duplicated on the content delta.
  const contentChunk = chunks.find((chunk) => chunk.choices?.[0]?.delta?.content === "Answer");
  assert.ok(contentChunk);
  assert.equal(contentChunk.choices[0].delta.role, undefined);
  assert.match(text, /\[DONE\]/);
});

test("KiroExecutor.buildHeaders includes Kiro-specific auth and metadata", () => {
  const executor = new KiroExecutor();
  const headers = executor.buildHeaders({ accessToken: "kiro-token" }, true);

  assert.equal(headers.Authorization, "Bearer kiro-token");
  assert.equal(headers["anthropic-beta"], "prompt-caching-2024-07-31");
  assert.equal(headers["x-amzn-bedrock-cache-control"], "enable");
  assert.ok(headers["Amz-Sdk-Invocation-Id"]);
});

test("KiroExecutor.buildHeaders marks long-lived Kiro API keys", () => {
  const executor = new KiroExecutor();
  const headers = executor.buildHeaders(
    { apiKey: "kiro-api-key", providerSpecificData: { authMethod: "api_key" } },
    true
  );

  assert.equal(headers.Authorization, "Bearer kiro-api-key");
  assert.equal(headers.tokentype, "API_KEY");
});

test("KiroExecutor.transformRequest removes the top-level model field", () => {
  const executor = new KiroExecutor();
  const body = {
    model: "kiro-model",
    conversationState: {
      currentMessage: {
        userInputMessage: {
          modelId: "kiro-model",
        },
      },
    },
  };

  const result = executor.transformRequest("kiro-model", body, true, {});
  assert.equal("model" in result, false);
  const kiroResult = result as unknown as {
    conversationState: { currentMessage: { userInputMessage: { modelId: string } } };
  };
  assert.equal(kiroResult.conversationState.currentMessage.userInputMessage.modelId, "kiro-model");
});

test("KiroExecutor.transformRequest forwards additionalModelRequestFields (thinking) to AWS", () => {
  const executor = new KiroExecutor();
  const body = {
    model: "kiro-model",
    conversationState: {
      currentMessage: { userInputMessage: { modelId: "kiro-model" } },
    },
    additionalModelRequestFields: {
      output_config: { effort: "high" },
      thinking: { type: "adaptive", display: "summarized" },
      max_tokens: 32000,
    },
  };

  const result = executor.transformRequest("kiro-model", body, true, {}) as unknown as Record<
    string,
    unknown
  >;
  // The thinking control must survive the strict allowlist — otherwise graded
  // reasoning never reaches CodeWhisperer (the field the openai-to-kiro
  // translator builds would be silently dropped).
  assert.deepEqual(result.additionalModelRequestFields, {
    output_config: { effort: "high" },
    thinking: { type: "adaptive", display: "summarized" },
    max_tokens: 32000,
  });
});

test("KiroExecutor.transformEventStreamToSSE converts text, tool calls, usage and DONE", async () => {
  const executor = new KiroExecutor();
  const invalidPreludeFrame = buildEventFrame("assistantResponseEvent", { content: "skip me" });
  invalidPreludeFrame[8] ^= 0xff;

  const response = buildEventStreamResponse([
    invalidPreludeFrame,
    buildEventFrame("assistantResponseEvent", { content: "Hello " }),
    buildEventFrame("codeEvent", { content: "world" }),
    buildEventFrame("toolUseEvent", {
      toolUseId: "tool_1",
      name: "read_file",
      input: { path: "/tmp/a" },
    }),
    buildEventFrame("metricsEvent", { inputTokens: 4, outputTokens: 6 }),
    buildEventFrame("contextUsageEvent", { contextUsagePercentage: 10 }),
    buildEventFrame("meteringEvent", {}),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const text = await transformed.text();

  assert.equal(transformed.status, 200);
  assert.equal(transformed.headers.get("Content-Type"), "text/event-stream");
  assert.match(text, /"content":"Hello "/);
  assert.match(text, /"content":"world"/);
  assert.match(text, /"name":"read_file"/);
  assert.match(text, /"arguments":"\{\\"path\\":\\"\/tmp\/a\\"\}"/);
  assert.match(text, /"prompt_tokens":4/);
  assert.match(text, /"completion_tokens":6/);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.match(text, /\[DONE\]/);
});

test("KiroExecutor normalizes Bedrock cache-token fields from a metricsEvent", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("assistantResponseEvent", { content: "cached" }),
    buildEventFrame("metricsEvent", {
      inputTokens: 7,
      outputTokens: 2,
      cacheReadInputTokens: 1024,
      cacheWriteInputTokens: 256,
    }),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const chunks = parseSSEJsonChunks(await transformed.text());
  const finish = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason);

  assert.deepEqual(finish.usage, {
    prompt_tokens: 7,
    completion_tokens: 2,
    total_tokens: 9,
    cache_read_input_tokens: 1024,
    cache_creation_input_tokens: 256,
  });
});

test("KiroExecutor does not invent cache tokens for the live API-key event shape", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("assistantResponseEvent", {
      content: "live-shaped response",
      modelId: "claude-sonnet-4.5",
    }),
    buildEventFrame("metadataEvent", { stopReason: "END_TURN" }),
    buildEventFrame("contextUsageEvent", { contextUsagePercentage: 4.93 }),
    buildEventFrame("meteringEvent", {
      unit: "credit",
      unitPlural: "credits",
      usage: 0.022,
    }),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const chunks = parseSSEJsonChunks(await transformed.text());
  const finish = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason);

  assert.equal(finish.usage.cache_read_input_tokens, undefined);
  assert.equal(finish.usage.cache_creation_input_tokens, undefined);
});

// The cache-field fix in d205650a7 landed inside the `metricsEvent` branch, but
// live API-key traffic (the test above) sends no `metricsEvent` at all — it sends
// a `metadataEvent`. The corrected code was therefore unreachable in production
// and cache stats stayed empty. Usage extraction now accepts both frames.
test("KiroExecutor reads usage and cache tokens from a metadataEvent frame", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("assistantResponseEvent", { content: "cached reply" }),
    buildEventFrame("metadataEvent", {
      stopReason: "END_TURN",
      usage: {
        inputTokens: 12,
        outputTokens: 3,
        cacheReadInputTokens: 2048,
        cacheWriteInputTokens: 512,
      },
    }),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const chunks = parseSSEJsonChunks(await transformed.text());
  const finish = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason);

  assert.deepEqual(finish.usage, {
    prompt_tokens: 12,
    completion_tokens: 3,
    total_tokens: 15,
    cache_read_input_tokens: 2048,
    cache_creation_input_tokens: 512,
  });
});

// Cache counts can arrive on a frame carrying no input/output totals. Dropping
// the frame (the old behavior, gated on `inputTokens > 0 || outputTokens > 0`)
// lost the cache accounting entirely.
test("KiroExecutor keeps cache tokens that arrive without input/output totals", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("assistantResponseEvent", { content: "hi" }),
    buildEventFrame("contextUsageEvent", { contextUsagePercentage: 10 }),
    buildEventFrame("metadataEvent", {
      usage: { cacheReadInputTokens: 900 },
    }),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const chunks = parseSSEJsonChunks(await transformed.text());
  const finish = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason);

  assert.deepEqual(finish.usage, {
    prompt_tokens: 19999,
    completion_tokens: 1,
    total_tokens: 20000,
    cache_read_input_tokens: 900,
  });
});

// snake_case spellings appear on some Kiro frames; a cache count must not be
// dropped just because it is not the Bedrock camelCase spelling.
test("KiroExecutor accepts snake_case cache token spellings", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("assistantResponseEvent", { content: "ok" }),
    buildEventFrame("metadataEvent", {
      usage: {
        prompt_tokens: 5,
        completion_tokens: 1,
        cache_read_input_tokens: 64,
        cache_creation_input_tokens: 32,
      },
    }),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const chunks = parseSSEJsonChunks(await transformed.text());
  const finish = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason);

  assert.deepEqual(finish.usage, {
    prompt_tokens: 5,
    completion_tokens: 1,
    total_tokens: 6,
    cache_read_input_tokens: 64,
    cache_creation_input_tokens: 32,
  });
});

// Live generateAssistantResponse sends NO token counts — only
// contextUsageEvent.contextUsagePercentage plus a meteringEvent credit figure.
// The synthesized usage is therefore an estimate, and the context budget the
// percentage applies to decides it. A fixed 200000 undercounts claude-sonnet-5
// (1M window) by 5x, and those numbers feed usage_history and the API-key
// token-limit counters.
test("KiroExecutor scales the usage estimate by the model's own context window", async () => {
  const executor = new KiroExecutor();
  const estimateFor = async (model) => {
    const response = buildEventStreamResponse([
      buildEventFrame("assistantResponseEvent", { content: "x".repeat(400) }),
      buildEventFrame("contextUsageEvent", { contextUsagePercentage: 10 }),
    ]);
    const chunks = parseSSEJsonChunks(
      await executor.transformEventStreamToSSE(response, model).text()
    );
    return chunks.find((chunk) => chunk.choices?.[0]?.finish_reason).usage;
  };

  // 10% of 200000, with the 100-token completion carved out of the total.
  assert.deepEqual(await estimateFor("claude-sonnet-4.5"), {
    prompt_tokens: 19900,
    completion_tokens: 100,
    total_tokens: 20000,
  });

  // 10% of 1000000 — a fixed 200000 budget would have reported 20000 here.
  assert.deepEqual(await estimateFor("claude-sonnet-5"), {
    prompt_tokens: 99900,
    completion_tokens: 100,
    total_tokens: 100000,
  });

  // 10% of 272000.
  assert.equal((await estimateFor("gpt-5.6-sol")).total_tokens, 27200);

  // Registry models without their own contextLength inherit defaultContextLength,
  // and an unknown id falls back to the same budget rather than reporting zero.
  assert.equal((await estimateFor("glm-5")).total_tokens, 20000);
  assert.equal((await estimateFor("not-a-kiro-model")).total_tokens, 20000);
});

// The percentage already covers the whole context, so adding a separately
// estimated completion on top would double-count it and inflate total_tokens
// past what Kiro reported.
test("KiroExecutor carves the completion estimate out of the reported total", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("assistantResponseEvent", { content: "y".repeat(800) }),
    buildEventFrame("contextUsageEvent", { contextUsagePercentage: 5 }),
  ]);

  const chunks = parseSSEJsonChunks(
    await executor.transformEventStreamToSSE(response, "claude-sonnet-4.5").text()
  );
  const usage = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason).usage;

  // 5% of 200000 is 10000 and must stay the total, not become 10000 + 200.
  assert.equal(usage.total_tokens, 10000);
  assert.equal(usage.completion_tokens, 200);
  assert.equal(usage.prompt_tokens, 9800);
});

// With no percentage there is no total to split, so the output estimate has to
// stand on its own instead of being silently dropped.
test("KiroExecutor still reports a completion estimate without a context percentage", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("assistantResponseEvent", { content: "z".repeat(400) }),
  ]);

  const chunks = parseSSEJsonChunks(
    await executor.transformEventStreamToSSE(response, "claude-sonnet-4.5").text()
  );
  const usage = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason).usage;

  assert.equal(usage.prompt_tokens, 0);
  assert.equal(usage.completion_tokens, 100);
  assert.equal(usage.total_tokens, 100);
});

test("KiroExecutor.transformEventStreamToSSE surfaces native reasoning frames as reasoning_content", async () => {
  const executor = new KiroExecutor();
  // Verified live wire format: Kiro streams adaptive-thinking reasoning as a
  // dedicated `reasoningContentEvent` frame carrying `{ text, signature }`. Also
  // cover the `reasoningText` object variant and a signature-only frame.
  const response = buildEventStreamResponse([
    buildEventFrame("reasoningContentEvent", { text: "Let me think... " }),
    buildEventFrame("reasoningContentEvent", { text: "step two. " }),
    buildEventFrame("reasoningContentEvent", { signature: "sig-only-frame" }),
    buildEventFrame("assistantResponseEvent", { reasoningText: { text: "variant." } }),
    buildEventFrame("assistantResponseEvent", { content: "The answer is 42." }),
    buildEventFrame("metricsEvent", { inputTokens: 3, outputTokens: 5 }),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const chunks = parseSSEJsonChunks(await transformed.text());
  const reasoning = chunks
    .map((c) => c.choices?.[0]?.delta?.reasoning_content)
    .filter(Boolean)
    .join("");
  const content = chunks
    .map((c) => c.choices?.[0]?.delta?.content)
    .filter(Boolean)
    .join("");

  assert.equal(
    reasoning,
    "Let me think... step two. variant.",
    "reasoningContentEvent frames + reasoningText variant must all surface"
  );
  assert.match(content, /The answer is 42\./, "normal content must still flow");
});

test("KiroExecutor.transformEventStreamToSSE parses fragmented frames and waits for post-stop usage", async () => {
  const executor = new KiroExecutor();
  const bytes = concatArrays(
    buildEventFrame("assistantResponseEvent", { content: "Hello fragmented" }),
    buildEventFrame("messageStopEvent", {}),
    buildEventFrame("metricsEvent", { inputTokens: 11, outputTokens: 13 }),
    buildEventFrame("contextUsageEvent", { contextUsagePercentage: 17 }),
    buildEventFrame("meteringEvent", {})
  );
  const response = buildEventStreamResponseFromChunks([
    bytes.subarray(0, 2),
    bytes.subarray(2, 9),
    bytes.subarray(9, 37),
    bytes.subarray(37, 91),
    bytes.subarray(91),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const text = await transformed.text();
  const chunks = parseSSEJsonChunks(text);
  const finishChunks = chunks.filter((chunk) => chunk.choices?.[0]?.finish_reason);

  assert.match(text, /"content":"Hello fragmented"/);
  assert.equal(finishChunks.length, 1);
  assert.equal(finishChunks[0].choices[0].finish_reason, "stop");
  assert.deepEqual(finishChunks[0].usage, {
    prompt_tokens: 11,
    completion_tokens: 13,
    total_tokens: 24,
  });
  assert.match(text, /\[DONE\]/);
});

test("KiroExecutor.transformEventStreamToSSE deduplicates tool starts and handles malformed payload JSON", async () => {
  const executor = new KiroExecutor();
  const response = buildEventStreamResponse([
    buildEventFrame("toolUseEvent", {
      toolUseId: "tool_1",
      name: "read_file",
      input: { path: "/tmp/a" },
    }),
    buildEventFrame("toolUseEvent", {
      toolUseId: "tool_1",
      name: "read_file",
      input: '{"path":"/tmp/a","followUp":true}',
    }),
    buildEventFrame("assistantResponseEvent", "{not-json"),
    buildEventFrame("messageStopEvent", {}),
  ]);

  const transformed = executor.transformEventStreamToSSE(response, "kiro-model");
  const text = await transformed.text();
  const startMatches = text.match(/"id":"tool_1"/g) || [];

  assert.equal(startMatches.length, 1);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.match(text, /\[DONE\]/);
});

test("KiroExecutor.execute returns upstream errors directly and transforms successful streams", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const rawResponse = new Response("ok", { status: 200 });
  let transformed = null;
  executor.transformEventStreamToSSE = (response, model) => {
    transformed = { response, model };
    return new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  globalThis.fetch = async () => new Response("upstream error", { status: 429 });
  try {
    const errorResult = await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials: { accessToken: "kiro-token" },
    });
    assert.equal(errorResult.response.status, 429);
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async () => rawResponse;
  try {
    const successResult = await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials: { accessToken: "kiro-token" },
    });

    assert.equal(successResult.response.status, 200);
    assert.equal(transformed.response, rawResponse);
    assert.equal(transformed.model, "kiro-model");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.refreshCredentials handles missing and AWS-style refresh tokens", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.match(String(url), /oidc\.us-east-1\.amazonaws\.com\/token$/);
    return new Response(
      JSON.stringify({
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
        expiresIn: 3600,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    assert.equal(await executor.refreshCredentials({}, null), null);
    assert.equal(
      await executor.refreshCredentials(
        { refreshToken: "ignored", providerSpecificData: { authMethod: "api_key" } },
        null
      ),
      null
    );
    const result = await executor.refreshCredentials(
      {
        refreshToken: "refresh",
        providerSpecificData: { clientId: "client", clientSecret: "secret" },
      },
      null
    );
    assert.deepEqual(result, {
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
      expiresIn: 3600,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.refreshCredentials returns null when the token refresh fails", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("refresh failed");
  };

  try {
    const result = await executor.refreshCredentials(
      {
        refreshToken: "refresh",
        providerSpecificData: { clientId: "client", clientSecret: "secret" },
      },
      null
    );
    assert.equal(result, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
