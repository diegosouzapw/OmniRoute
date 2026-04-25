import test from "node:test";
import assert from "node:assert/strict";

const { MuseSparkWebExecutor, normalizeMetaAiCookieHeader } =
  await import("../../open-sse/executors/muse-spark-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

function mockTextStream(text: string) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

function metaAiSseText(events: Array<Record<string, unknown>>) {
  const frames = [":"];
  for (const event of events) {
    frames.push("event: next");
    frames.push(`data: ${JSON.stringify({ data: { sendMessageStream: event } })}`);
    frames.push("");
  }
  frames.push("event: complete");
  frames.push("data:");
  frames.push("");
  return frames.join("\n");
}

function mockFetch(status: number, text: string) {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(mockTextStream(text), {
      status,
      headers: { "Content-Type": "text/event-stream" },
    });
  return () => {
    globalThis.fetch = original;
  };
}

function mockFetchCapture(status = 200, text = metaAiSseText([])) {
  const original = globalThis.fetch;
  let capturedUrl: string | null = null;
  let capturedHeaders: Record<string, string> = {};
  let capturedBody: Record<string, unknown> = {};

  globalThis.fetch = async (url: any, opts: any) => {
    capturedUrl = String(url);
    capturedHeaders = opts?.headers || {};
    capturedBody = JSON.parse(opts?.body || "{}");
    return new Response(mockTextStream(text), {
      status,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  return {
    restore: () => {
      globalThis.fetch = original;
    },
    get url() {
      return capturedUrl;
    },
    get headers() {
      return capturedHeaders;
    },
    get body() {
      return capturedBody;
    },
  };
}

function mockFetchCaptureMany(status = 200, text = metaAiSseText([])) {
  const original = globalThis.fetch;
  const calls: Array<{
    url: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
  }> = [];

  globalThis.fetch = async (url: any, opts: any) => {
    calls.push({
      url: String(url),
      headers: opts?.headers || {},
      body: JSON.parse(opts?.body || "{}"),
    });
    return new Response(mockTextStream(text), {
      status,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  return {
    restore: () => {
      globalThis.fetch = original;
    },
    calls,
  };
}

test("MuseSparkWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("muse-spark-web"));
  assert.ok(hasSpecializedExecutor("ms-web"));
  const executor = getExecutor("muse-spark-web");
  const alias = getExecutor("ms-web");
  assert.ok(executor instanceof MuseSparkWebExecutor);
  assert.ok(alias instanceof MuseSparkWebExecutor);
});

test("MuseSparkWebExecutor sets correct provider name", () => {
  const executor = new MuseSparkWebExecutor();
  assert.equal(executor.getProvider(), "muse-spark-web");
});

test("Non-streaming: Meta SSE becomes OpenAI completion", async () => {
  const restore = mockFetch(
    200,
    metaAiSseText([
      {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content: "Hello ",
        streamingState: "STREAMING",
        contentRenderer: { __typename: "TextContentRenderer", text: "Hello " },
      },
      {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content: "Hello from Muse Spark",
        streamingState: "DONE",
        contentRenderer: { __typename: "TextContentRenderer", text: "Hello from Muse Spark" },
      },
    ])
  );

  try {
    const executor = new MuseSparkWebExecutor();
    const result = await executor.execute({
      model: "muse-spark",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "abra-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as any;
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello from Muse Spark");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.id.startsWith("chatcmpl-meta-"));
  } finally {
    restore();
  }
});

test("Streaming: produces valid SSE chunks", async () => {
  const restore = mockFetch(
    200,
    metaAiSseText([
      {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content: "Hello ",
        streamingState: "STREAMING",
        thinkingText: "First thought",
      },
      {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content: "Hello from Muse Spark",
        streamingState: "DONE",
        thinkingText: "First thought\nSecond thought",
      },
    ])
  );

  try {
    const executor = new MuseSparkWebExecutor();
    const result = await executor.execute({
      model: "muse-spark-thinking",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "abra-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    const text = await result.response.text();
    const lines = text.split("\n").filter((line) => line.startsWith("data: "));
    assert.ok(lines.length >= 4, `Expected at least 4 SSE data lines, got ${lines.length}`);

    const payloads = lines
      .filter((line) => line !== "data: [DONE]")
      .map((line) => JSON.parse(line.slice(6)));

    const first = payloads[0];
    assert.equal(first.choices[0].delta.role, "assistant");

    const reasoningChunks = payloads.filter(
      (payload) => payload.choices[0].delta.reasoning_content
    );
    assert.ok(reasoningChunks.length >= 2);
    assert.equal(reasoningChunks[0].choices[0].delta.reasoning_content, "First thought");
    assert.equal(reasoningChunks[1].choices[0].delta.reasoning_content, "\nSecond thought");

    const contentChunks = payloads.filter((payload) => payload.choices[0].delta.content);
    assert.ok(contentChunks.length >= 2);
    assert.equal(contentChunks[0].choices[0].delta.content, "Hello ");
    assert.equal(contentChunks[1].choices[0].delta.content, "from Muse Spark");

    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");
  } finally {
    restore();
  }
});

test("Non-streaming thinking mode includes reasoning_content", async () => {
  const restore = mockFetch(
    200,
    metaAiSseText([
      {
        __typename: "AssistantMessage",
        id: "meta-msg-2",
        content: "Answer",
        streamingState: "DONE",
        thinkingText: "Reason through the plan",
      },
    ])
  );

  try {
    const executor = new MuseSparkWebExecutor();
    const result = await executor.execute({
      model: "muse-spark-thinking",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "abra-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.content, "Answer");
    assert.equal(json.choices[0].message.reasoning_content, "Reason through the plan");
  } finally {
    restore();
  }
});

test("Error: auth failure from Meta SSE returns cookie error", async () => {
  const restore = mockFetch(
    200,
    metaAiSseText([
      {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content: "Authentication required to send messages",
        streamingState: "ERROR",
        error: { message: "Authentication required to send messages", code: null },
        contentRenderer: {
          __typename: "TextContentRenderer",
          text: "Authentication required to send messages",
        },
      },
    ])
  );

  try {
    const executor = new MuseSparkWebExecutor();
    const result = await executor.execute({
      model: "muse-spark",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "expired-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 401);
    const json = (await result.response.json()) as any;
    assert.match(json.error.message, /meta ai auth failed/i);
    assert.match(json.error.message, /abra_sess/i);
  } finally {
    restore();
  }
});

test("Cookie normalization supports raw tokens, prefixed tokens and full headers", () => {
  assert.equal(normalizeMetaAiCookieHeader("raw-session-token"), "abra_sess=raw-session-token");
  assert.equal(
    normalizeMetaAiCookieHeader("cookie:raw-session-token"),
    "abra_sess=raw-session-token"
  );
  assert.equal(
    normalizeMetaAiCookieHeader("abra_sess=token; other=value"),
    "abra_sess=token; other=value"
  );
});

test("Request: posts to correct Meta endpoint with normalized cookie", async () => {
  const cap = mockFetchCapture(
    200,
    metaAiSseText([
      {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content: "ok",
        streamingState: "DONE",
      },
    ])
  );

  try {
    const executor = new MuseSparkWebExecutor();
    await executor.execute({
      model: "muse-spark",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "raw-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(cap.url, "https://www.meta.ai/api/graphql");
    assert.equal(cap.headers.Cookie, "abra_sess=raw-session-token");
    assert.equal(cap.headers.Accept, "text/event-stream");
    assert.equal(cap.headers["X-FB-Friendly-Name"], "useAbraSendMessageMutation");
    assert.equal(cap.headers["X-ASBD-ID"], "129477");
    assert.equal(cap.headers.Origin, "https://www.meta.ai");
    assert.equal(cap.headers.Referer, "https://www.meta.ai/");
  } finally {
    cap.restore();
  }
});

test("Request: rotates across extra abra_sess cookies with round-robin", async () => {
  const cap = mockFetchCaptureMany(
    200,
    metaAiSseText([
      {
        __typename: "AssistantMessage",
        id: "meta-msg-3",
        content: "ok",
        streamingState: "DONE",
      },
    ])
  );

  try {
    const executor = new MuseSparkWebExecutor();
    for (let i = 0; i < 3; i++) {
      await executor.execute({
        model: "muse-spark",
        body: { messages: [{ role: "user", content: `test ${i}` }], stream: false },
        stream: false,
        credentials: {
          apiKey: "primary-cookie",
          connectionId: "muse-spark-rotation",
          providerSpecificData: {
            extraApiKeys: ["secondary-cookie", "abra_sess=third-cookie"],
          },
        },
        signal: AbortSignal.timeout(10000),
        log: null,
      });
    }

    assert.deepEqual(
      cap.calls.map((call) => call.headers.Cookie),
      ["abra_sess=primary-cookie", "abra_sess=secondary-cookie", "abra_sess=third-cookie"]
    );
  } finally {
    cap.restore();
  }
});

test("Request: payload carries persisted doc id, model mapping and Meta defaults", async () => {
  const cap = mockFetchCapture(
    200,
    metaAiSseText([
      {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content: "ok",
        streamingState: "DONE",
      },
    ])
  );

  try {
    const executor = new MuseSparkWebExecutor();
    await executor.execute({
      model: "muse-spark-contemplating",
      body: {
        messages: [
          { role: "system", content: "Be concise" },
          { role: "assistant", content: "Previous answer" },
          { role: "user", content: "Implement this" },
        ],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "abra_sess=token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(cap.body.doc_id, "078dfdff6fb0d420d8011b49073e6886");
    assert.equal((cap.body.variables as any).mode, "think_hard");
    assert.equal((cap.body.variables as any).currentBranchPath, "0");
    assert.equal((cap.body.variables as any).entryPoint, "KADABRA__CHAT__UNIFIED_INPUT_BAR");
    assert.equal((cap.body.variables as any).promptEditType, null);
    assert.match(String((cap.body.variables as any).content), /system: Be concise/i);
    assert.match(String((cap.body.variables as any).content), /assistant: Previous answer/i);
    assert.match(String((cap.body.variables as any).content), /Implement this/);
    assert.match(String((cap.body.variables as any).conversationId), /^c\./);
    assert.match(String((cap.body.variables as any).userEventId), /^e\./);
    assert.match(String((cap.body.variables as any).userUniqueMessageId), /^\d+$/);
  } finally {
    cap.restore();
  }
});

test("Provider registry: muse-spark-web models are exposed", async () => {
  const { getModelsByProviderId, PROVIDER_ID_TO_ALIAS } =
    await import("../../open-sse/config/providerModels.ts");
  const models = getModelsByProviderId("muse-spark-web");
  assert.ok(models, "muse-spark-web should exist in PROVIDER_MODELS");
  assert.equal(PROVIDER_ID_TO_ALIAS["muse-spark-web"], "ms-web");
  const ids = models.map((model: any) => model.id);
  assert.ok(ids.includes("muse-spark"));
  assert.ok(ids.includes("muse-spark-thinking"));
  assert.ok(ids.includes("muse-spark-contemplating"));
});
