import test from "node:test";
import assert from "node:assert/strict";

const { wrapChatCompletionJsonAsResponsesSse, maybeWrapForcedNonStreamingResponsesJson } =
  await import("../../open-sse/handlers/chatCore/responsesJsonToSse.ts");

function chatCompletion(content = "hi") {
  return {
    id: "chatcmpl-test",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
  };
}

test("wraps non-streaming chat JSON as Responses SSE ending in response.completed", async () => {
  const response = wrapChatCompletionJsonAsResponsesSse(chatCompletion("hello"), {
    "X-OmniRoute-Cache": "MISS",
  });
  assert.equal(response.headers.get("Content-Type"), "text/event-stream");
  assert.equal(response.headers.get("X-OmniRoute-Cache"), "MISS");
  const sse = await response.text();
  assert.match(sse, /event: response\.created/);
  assert.match(sse, /event: response\.completed/);
  assert.match(sse, /hello/);
  assert.match(sse, /data: \[DONE\]/);
});

test("injection: returning JSON early for a 200 chat completion goes red", async () => {
  const response = wrapChatCompletionJsonAsResponsesSse(chatCompletion());
  assert.notEqual(response.headers.get("Content-Type"), "application/json");
});

test("maybeWrapForcedNonStreamingResponsesJson keeps JSON when the client did not ask for SSE", async () => {
  const response = maybeWrapForcedNonStreamingResponsesJson({
    clientRequestedResponsesStream: false,
    body: chatCompletion("plain"),
    headers: { "Content-Type": "application/json" },
  });
  assert.equal(response.headers.get("Content-Type"), "application/json");
  const payload = JSON.parse(await response.text());
  assert.equal(payload.choices[0].message.content, "plain");
});

test("maybeWrapForcedNonStreamingResponsesJson wraps JSON when the client asked for SSE", async () => {
  const response = maybeWrapForcedNonStreamingResponsesJson({
    clientRequestedResponsesStream: true,
    body: chatCompletion("stream-me"),
    headers: { "Content-Type": "application/json", "X-OmniRoute-Cache": "MISS" },
  });
  assert.equal(response.headers.get("Content-Type"), "text/event-stream");
  const sse = await response.text();
  assert.match(sse, /event: response\.completed/);
  assert.match(sse, /stream-me/);
});

test("chatCore stamps clientRequestedResponsesStream before forcing stream:false", async () => {
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const source = await readFile(
    join(import.meta.dirname, "../../open-sse/handlers/chatCore.ts"),
    "utf-8"
  );
  const stamp = source.indexOf("clientRequestedResponsesStream = true");
  const force = source.indexOf("(body as Record<string, unknown>).stream = false");
  const wrap = source.indexOf("maybeWrapForcedNonStreamingResponsesJson({");
  assert.ok(stamp !== -1, "must stamp the client-requested stream flag");
  assert.ok(force !== -1, "must still force stream:false for the web_search fallback");
  assert.ok(wrap !== -1, "must wrap the non-streaming JSON return");
  assert.ok(stamp < force, "stamp must happen before stream:false");
  assert.ok(wrap > force, "wrap must happen on the non-streaming return after the force");
});
