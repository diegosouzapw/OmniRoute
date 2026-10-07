import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { OneMinAiExecutor, buildPrompt } from "../../open-sse/executors/oneminai.ts";

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
        for (const event of events) controller.enqueue(encoder.encode(event));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

test("OneMinAiExecutor is registered in the executor index", async () => {
  assert.equal(hasSpecializedExecutor("oneminai"), true);
  assert.ok((await getExecutor("oneminai")) instanceof OneMinAiExecutor);
  assert.equal(hasSpecializedExecutor("1min"), true);
  assert.ok((await getExecutor("1min")) instanceof OneMinAiExecutor);
});

test("buildPrompt passes a single user message through unchanged", () => {
  assert.equal(buildPrompt([{ role: "user", content: "Hello there" }]), "Hello there");
});

test("buildPrompt flattens multi-turn history into a labeled transcript", () => {
  const prompt = buildPrompt([
    { role: "system", content: "You are concise." },
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi there!" },
    { role: "user", content: "How are you?" },
  ]);
  assert.equal(
    prompt,
    "System: You are concise.\n\nUser: Hello\n\nAssistant: Hi there!\n\nUser: How are you?"
  );
});

test("OneMinAiExecutor sends UNIFY_CHAT_WITH_AI with a flattened prompt and API-KEY header, and unwraps the JSON response", async () => {
  const executor = new OneMinAiExecutor();
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; body: Record<string, unknown>; headers: Record<string, string> }> =
    [];

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
      headers: init.headers as Record<string, string>,
    });
    return jsonResponse({
      aiRecord: {
        model: "gpt-4o-mini",
        status: "SUCCESS",
        aiRecordDetail: {
          promptObject: { prompt: "How are you?" },
          resultObject: ["I'm doing well, thanks for asking!"],
        },
      },
    });
  };

  try {
    const result = await executor.execute({
      model: "gpt-4o-mini",
      body: {
        messages: [
          { role: "system", content: "You are concise." },
          { role: "user", content: "Hello" },
          { role: "assistant", content: "Hi there!" },
          { role: "user", content: "How are you?" },
        ],
      },
      stream: false,
      credentials: { apiKey: "1min-key" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.1min.ai/api/chat-with-ai");
    assert.equal(calls[0].headers["API-KEY"], "1min-key");
    assert.equal(calls[0].body.type, "UNIFY_CHAT_WITH_AI");
    assert.equal(calls[0].body.model, "gpt-4o-mini");
    assert.equal(
      (calls[0].body.promptObject as { prompt: string }).prompt,
      "System: You are concise.\n\nUser: Hello\n\nAssistant: Hi there!\n\nUser: How are you?"
    );

    const body = await result.response.json();
    assert.equal(body.object, "chat.completion");
    assert.equal(body.choices[0].message.role, "assistant");
    assert.equal(body.choices[0].message.content, "I'm doing well, thanks for asking!");
    assert.equal(body.model, "gpt-4o-mini");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OneMinAiExecutor requests the isStreaming=true endpoint and translates 1min.ai SSE into OpenAI chunks", async () => {
  const executor = new OneMinAiExecutor();
  const originalFetch = globalThis.fetch;
  let requestedUrl = "";

  globalThis.fetch = async (url) => {
    requestedUrl = String(url);
    return sseResponse([
      'event: content\ndata: {"content": "Artificial intelligence is"}\n\n',
      'event: content\ndata: {"content": " a branch of computer science."}\n\n',
      'event: done\ndata: {"message": "Stream completed"}\n\n',
    ]);
  };

  try {
    const result = await executor.execute({
      model: "gpt-4o-mini",
      body: { messages: [{ role: "user", content: "What is AI?" }] },
      stream: true,
      credentials: { apiKey: "1min-key" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(requestedUrl, "https://api.1min.ai/api/chat-with-ai?isStreaming=true");
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
    const text = await result.response.text();
    assert.match(text, /data: \{"id":"chatcmpl-oneminai-/);
    assert.match(text, /Artificial intelligence is/);
    assert.match(text, /a branch of computer science\./);
    assert.match(text, /"finish_reason":"stop"/);
    assert.match(text, /data: \[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OneMinAiExecutor maps upstream auth failures to OpenAI-style errors", async () => {
  const executor = new OneMinAiExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    jsonResponse(
      { success: false, error: { code: "UNAUTHORIZED", message: "Invalid or missing API key" } },
      401
    );

  try {
    const result = await executor.execute({
      model: "gpt-4o-mini",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "bad-key" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 401);
    const body = await result.response.json();
    assert.match(body.error.message, /Invalid or missing API key/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
