import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { NlpCloudExecutor } from "../../open-sse/executors/nlpcloud.ts";

const encoder = new TextEncoder();

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function sseResponse(events: string[]) {
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const event of events) {
          controller.enqueue(encoder.encode(event));
        }
        controller.close();
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

test("NlpCloudExecutor is registered in the executor index", () => {
  assert.equal(hasSpecializedExecutor("nlpcloud"), true);
  assert.ok(getExecutor("nlpcloud") instanceof NlpCloudExecutor);
});

test("NlpCloudExecutor converts OpenAI messages into chatbot input/context/history and wraps JSON responses", async () => {
  const executor = new NlpCloudExecutor();
  const originalFetch = globalThis.fetch;
  const calls: Array<{
    url: string;
    body: Record<string, unknown>;
    headers: Record<string, string>;
  }> = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
      headers: init.headers as Record<string, string>,
    });

    return jsonResponse({
      response: "Hi back from NLP Cloud.",
      history: [
        { input: "Hello", response: "Hi there!" },
        { input: "How are you?", response: "Hi back from NLP Cloud." },
      ],
    });
  };

  try {
    const result = await executor.execute({
      model: "chatdolphin",
      body: {
        messages: [
          { role: "system", content: "You are concise." },
          { role: "user", content: "Hello" },
          { role: "assistant", content: "Hi there!" },
          { role: "user", content: "How are you?" },
        ],
      },
      stream: false,
      credentials: { apiKey: "nlpc-key" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.nlpcloud.io/v1/gpu/chatdolphin/chatbot");
    assert.equal(calls[0].headers.Authorization, "Token nlpc-key");
    assert.equal(calls[0].body.input, "How are you?");
    assert.equal(calls[0].body.context, "You are concise.");
    assert.deepEqual(calls[0].body.history, [{ input: "Hello", response: "Hi there!" }]);

    const body = (await result.response.json()) as any;
    assert.equal(body.object, "chat.completion");
    assert.equal(body.choices[0].message.role, "assistant");
    assert.equal(body.choices[0].message.content, "Hi back from NLP Cloud.");
    assert.equal(body.model, "chatdolphin");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("NlpCloudExecutor converts raw NLP Cloud SSE text events into OpenAI chat chunks", async () => {
  const executor = new NlpCloudExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    sseResponse(["data: Hello \n\n", "data: world\n\n", "data: [DONE]\n\n"]);

  try {
    const result = await executor.execute({
      model: "chatdolphin",
      body: {
        messages: [{ role: "user", content: "Say hello" }],
      },
      stream: true,
      credentials: { apiKey: "nlpc-key" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
    const text = await result.response.text();
    assert.match(text, /data: \{\"id\":\"chatcmpl-nlpcloud-/);
    assert.match(text, /Hello/);
    assert.match(text, /world/);
    assert.match(text, /data: \[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("NlpCloudExecutor maps upstream auth failures to OpenAI-style errors", async () => {
  const executor = new NlpCloudExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => jsonResponse({ detail: "forbidden" }, 403);

  try {
    const result = await executor.execute({
      model: "chatdolphin",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "nlpc-key" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 403);
    const body = (await result.response.json()) as any;
    assert.match(body.error.message, /status 403/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
