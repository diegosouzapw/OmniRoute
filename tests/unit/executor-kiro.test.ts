import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";

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
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const frame of frames) {
          controller.enqueue(frame);
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

test("KiroExecutor.buildHeaders includes Kiro-specific auth and metadata", () => {
  const executor = new KiroExecutor();
  const headers = executor.buildHeaders({ accessToken: "kiro-token" }, true);

  assert.equal(headers.Authorization, "Bearer kiro-token");
  assert.equal(headers["anthropic-beta"], "prompt-caching-2024-07-31");
  assert.equal(headers["x-amzn-bedrock-cache-control"], "enable");
  assert.ok(headers["Amz-Sdk-Invocation-Id"]);
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
  assert.equal(
    (result as any).conversationState.currentMessage.userInputMessage.modelId,
    "kiro-model"
  );
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
