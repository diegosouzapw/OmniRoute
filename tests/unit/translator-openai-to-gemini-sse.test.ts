import test from "node:test";
import assert from "node:assert/strict";

import {
  OPENAI_TO_GEMINI_FINISH_REASON,
  openAIChunkToGeminiChunk,
  transformOpenAISSEToGeminiSSE,
  convertOpenAIResponseToGemini,
} from "../../open-sse/translator/response/openai-to-gemini-sse.ts";

/**
 * Build a `Response` whose body is the given list of OpenAI SSE events
 * concatenated as a single SSE stream (each event terminated by a blank line).
 */
function makeOpenAISSEResponse(events: Array<string>): Response {
  const body = events.map((e) => e + "\n\n").join("");
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(body));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

async function readGeminiSSE(response: Response): Promise<Array<Record<string, unknown>>> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const out: Array<Record<string, unknown>> = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
  }
  buffer += decoder.decode();
  for (const line of buffer.split("\n")) {
    const trimmed = line.endsWith("\r") ? line.slice(0, -1) : line;
    if (!trimmed.startsWith("data:")) continue;
    const data = trimmed.slice(5).trim();
    if (!data) continue;
    out.push(JSON.parse(data) as Record<string, unknown>);
  }
  return out;
}

test("OPENAI_TO_GEMINI_FINISH_REASON maps the four canonical finish reasons", () => {
  assert.equal(OPENAI_TO_GEMINI_FINISH_REASON.stop, "STOP");
  assert.equal(OPENAI_TO_GEMINI_FINISH_REASON.length, "MAX_TOKENS");
  assert.equal(OPENAI_TO_GEMINI_FINISH_REASON.tool_calls, "STOP");
  assert.equal(OPENAI_TO_GEMINI_FINISH_REASON.content_filter, "SAFETY");
});

test("openAIChunkToGeminiChunk: skips role-only deltas with no content/finish_reason", () => {
  const out = openAIChunkToGeminiChunk(
    { choices: [{ delta: { role: "assistant" } }] },
    "gemini-pro"
  );
  assert.equal(out, null);
});

test("openAIChunkToGeminiChunk: text delta becomes Gemini content part", () => {
  const out = openAIChunkToGeminiChunk(
    { choices: [{ delta: { content: "Hello" }, finish_reason: null }] },
    "gemini-pro"
  );
  assert.deepEqual(out, {
    candidates: [
      {
        content: { role: "model", parts: [{ text: "Hello" }] },
        index: 0,
      },
    ],
  });
});

test("openAIChunkToGeminiChunk: reasoning_content becomes a `thought: true` part", () => {
  const out = openAIChunkToGeminiChunk(
    {
      choices: [
        {
          delta: { reasoning_content: "think", content: "answer" },
          finish_reason: null,
        },
      ],
    },
    "gemini-pro"
  );
  assert.deepEqual(out!.candidates[0].content.parts, [
    { text: "think", thought: true },
    { text: "answer" },
  ]);
});

test("openAIChunkToGeminiChunk: final chunk attaches usageMetadata + modelVersion + maps finishReason", () => {
  const out = openAIChunkToGeminiChunk(
    {
      choices: [{ delta: {}, finish_reason: "length" }],
      usage: {
        prompt_tokens: 12,
        completion_tokens: 34,
        total_tokens: 46,
        completion_tokens_details: { reasoning_tokens: 7 },
      },
      model: "gemini-2.5-pro",
    },
    "fallback-model"
  );
  assert.equal(out!.candidates[0].finishReason, "MAX_TOKENS");
  // Empty parts -> [{ text: "" }] so the SDK still sees a valid content shape.
  assert.deepEqual(out!.candidates[0].content.parts, [{ text: "" }]);
  assert.deepEqual(out!.usageMetadata, {
    promptTokenCount: 12,
    candidatesTokenCount: 34,
    totalTokenCount: 46,
    thoughtsTokenCount: 7,
  });
  assert.equal(out!.modelVersion, "gemini-2.5-pro");
});

test("transformOpenAISSEToGeminiSSE: full OpenAI SSE → Gemini SSE conversion (no [DONE] sentinel)", async () => {
  // This is the original bug from upstream #225: the Gemini CLI SDK crashed on
  // `[DONE]` because OpenAI SSE ends with that sentinel and Gemini SSE doesn't.
  const upstream = makeOpenAISSEResponse([
    'data: {"choices":[{"delta":{"role":"assistant"},"finish_reason":null}]}',
    'data: {"choices":[{"delta":{"content":"Hi"},"finish_reason":null}]}',
    'data: {"choices":[{"delta":{"content":" there"},"finish_reason":null}]}',
    'data: {"choices":[{"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":5,"completion_tokens":2,"total_tokens":7},"model":"gemini-pro"}',
    "data: [DONE]",
  ]);

  const out = transformOpenAISSEToGeminiSSE(upstream, "fallback");
  assert.equal(out.status, 200);
  assert.equal(out.headers.get("Content-Type"), "text/event-stream");

  const events = await readGeminiSSE(out);
  // role-only delta dropped, two content chunks, one final chunk = 3 events.
  // No `[DONE]` should appear in the output (assert via readGeminiSSE which would push it).
  assert.equal(events.length, 3);
  assert.deepEqual(events[0], {
    candidates: [{ content: { role: "model", parts: [{ text: "Hi" }] }, index: 0 }],
  });
  assert.deepEqual(events[1], {
    candidates: [{ content: { role: "model", parts: [{ text: " there" }] }, index: 0 }],
  });
  const final = events[2] as Record<string, unknown>;
  assert.equal((final.candidates as Array<{ finishReason: string }>)[0].finishReason, "STOP");
  assert.deepEqual(final.usageMetadata, {
    promptTokenCount: 5,
    candidatesTokenCount: 2,
    totalTokenCount: 7,
  });
  assert.equal(final.modelVersion, "gemini-pro");
});

test("transformOpenAISSEToGeminiSSE: handles chunked input that splits an SSE event mid-line", async () => {
  // Real upstreams flush partial chunks. The transformer must buffer across
  // TextEncoder boundaries so it never `JSON.parse`s a half-event.
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const enc = new TextEncoder();
      // Split the JSON payload in the middle of a string literal.
      controller.enqueue(enc.encode('data: {"choices":[{"delta":{"content":"Hel'));
      controller.enqueue(enc.encode('lo"},"finish_reason":null}]}\n\ndata: [DONE]\n\n'));
      controller.close();
    },
  });
  const upstream = new Response(stream, { status: 200 });
  const out = transformOpenAISSEToGeminiSSE(upstream, "gemini-pro");
  const events = await readGeminiSSE(out);
  assert.equal(events.length, 1);
  assert.deepEqual(events[0], {
    candidates: [{ content: { role: "model", parts: [{ text: "Hello" }] }, index: 0 }],
  });
});

test("transformOpenAISSEToGeminiSSE: passes non-OK upstream responses through unchanged", () => {
  const upstream = new Response("upstream 500", { status: 500 });
  const out = transformOpenAISSEToGeminiSSE(upstream, "gemini-pro");
  assert.strictEqual(out, upstream);
});

test("convertOpenAIResponseToGemini: maps a Chat Completions JSON to Gemini GenerateContentResponse", async () => {
  const upstream = Response.json({
    choices: [
      {
        message: { role: "assistant", content: "Final answer" },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 3, completion_tokens: 4, total_tokens: 7 },
    model: "gemini-2.5-pro",
  });
  const out = await convertOpenAIResponseToGemini(upstream, "fallback");
  const body = (await out.json()) as Record<string, unknown>;
  const candidates = body.candidates as Array<{
    content: { parts: Array<{ text: string }> };
    finishReason: string;
  }>;
  assert.equal(candidates[0].finishReason, "STOP");
  assert.equal(candidates[0].content.parts[0].text, "Final answer");
  assert.equal(body.modelVersion, "gemini-2.5-pro");
  assert.deepEqual(body.usageMetadata, {
    promptTokenCount: 3,
    candidatesTokenCount: 4,
    totalTokenCount: 7,
  });
});

test("convertOpenAIResponseToGemini: passes through bodies that are already Gemini-shape", async () => {
  const upstream = Response.json({
    candidates: [{ content: { role: "model", parts: [{ text: "x" }] }, index: 0 }],
  });
  const out = await convertOpenAIResponseToGemini(upstream, "gemini-pro");
  const body = (await out.json()) as Record<string, unknown>;
  assert.ok(Array.isArray(body.candidates));
});

test("convertOpenAIResponseToGemini: surfaces upstream error bodies untouched", async () => {
  const upstream = Response.json(
    { error: { message: "quota exceeded", code: 429 } },
    { status: 429 }
  );
  const out = await convertOpenAIResponseToGemini(upstream, "gemini-pro");
  assert.equal(out.status, 429);
  const body = (await out.json()) as { error: { code: number } };
  assert.equal(body.error.code, 429);
});
