// Regression: Qwen Web executor folded structured (array) message content with a
// bare String(m.content), producing the literal "[object Object]" prompt instead of
// the real text (reported on the support mesh: "[[object][object]] serialisation error").
// The executor must flatten OpenAI-style content parts into their text before sending.
import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/qwen-web.ts");

type FetchCall = { url: string; init: { method?: string; body?: string } };
const realFetch = globalThis.fetch;

function sseResponse(events: Array<Record<string, unknown>>): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      for (const ev of events) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function chatCreatedResponse(id = "chat-arr"): Response {
  return new Response(JSON.stringify({ success: true, data: { id } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("QwenWebExecutor — structured (array) content serialization", () => {
  it("flattens OpenAI-style content parts to text (no '[object Object]')", async () => {
    const calls: FetchCall[] = [];
    globalThis.fetch = (async (url: string | URL | Request, init: RequestInit = {}) => {
      calls.push({ url: String(url), init: init as { method?: string; body?: string } });
      if (String(url).includes("/api/v2/chats/new")) return chatCreatedResponse();
      return sseResponse([
        { choices: [{ delta: { phase: "answer", content: "ok", status: "finished" } }] },
      ]);
    }) as typeof fetch;

    const executor = new mod.QwenWebExecutor();
    await executor.execute({
      model: "qwen3.7-max",
      body: {
        messages: [
          { role: "system", content: [{ type: "text", text: "You are helpful." }] },
          {
            role: "user",
            content: [
              { type: "text", text: "First part." },
              { type: "text", text: "Second part." },
            ],
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "token=jwt-tok; cna=abc" },
      signal: null,
    } as unknown as Parameters<typeof executor.execute>[0]);

    const compBody = JSON.parse(calls[1].init.body);
    const sent = String(compBody.messages[0].content);

    assert.ok(
      !sent.includes("[object Object]"),
      `prompt must not contain '[object Object]', got: ${sent}`
    );
    assert.ok(sent.includes("First part."), "text of first content part must survive");
    assert.ok(sent.includes("Second part."), "text of second content part must survive");
    assert.ok(sent.includes("You are helpful."), "system content part must survive");
  });
});
