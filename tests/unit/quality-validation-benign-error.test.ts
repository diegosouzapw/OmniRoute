/**
 * TDD regression guard — quality validation false-positive on benign `error`
 * fields in streaming SSE chunks.
 *
 * `isStreamingUpstreamError` treats ANY non-null `error` field as an upstream
 * failure: `parsed.error != null` is true for `{}`, `""`, `false`, and `0`.
 * When a client like opencode issues a tool-call turn, the upstream SSE opens
 * with role-only frames (no recognized content) and a later chunk that carries
 * real tool_calls content PLUS a benign empty `error` field (a field some
 * backends emit on every chunk). The error gate runs BEFORE the content
 * recognizers, so that single frame short-circuits to "error" → 502
 * "streaming upstream error" — while the same combo via kilocode (different
 * wire format) never emits the empty `error` field and works fine.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

function openAiSseStream(events: string[]): ReadableStream<Uint8Array> {
  const body = events.join("\n") + "\n";
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

/**
 * OpenAI-compatible tool-call stream that ALSO carries a benign empty `error`
 * field on the tool_calls chunk. Some backends emit `"error": {}` or
 * `"error": ""` alongside every chunk; that is not a real upstream failure.
 * The frame must be treated as CONTENT (valid), not ERROR.
 */
function makeToolCallStreamWithBenignError(): Response {
  const events = [
    // role-only first chunk — no recognized content, widens the peek window
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 123,
      model: "gpt-4o",
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    })}`,
    "",
    // tool_calls delta + benign empty `error` field (the bug trigger)
    `data: ${JSON.stringify({
      id: "chatcmpl_2",
      object: "chat.completion.chunk",
      created: 123,
      model: "gpt-4o",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              { index: 0, id: "call_1", type: "function", function: { name: "Bash", arguments: "" } },
            ],
          },
          finish_reason: null,
        },
      ],
      error: {},
    })}`,
    "",
    `data: [DONE]`,
    "",
  ];
  return new Response(openAiSseStream(events), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test("OpenAI stream with tool_calls + benign empty error:{} field is VALID (not 502)", async () => {
  const res = makeToolCallStreamWithBenignError();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    true,
    `expected valid for tool_calls chunk with benign error:{}, got valid=false (reason: ${out.reason})`
  );
  assert.ok(out.clonedResponse, "clonedResponse must be present for valid streaming response");
});

test("OpenAI stream with tool_calls + benign empty error:'' field is VALID", async () => {
  const events = [
    `data: ${JSON.stringify({
      id: "chatcmpl_3",
      object: "chat.completion.chunk",
      created: 123,
      model: "gpt-4o",
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    })}`,
    "",
    `data: ${JSON.stringify({
      id: "chatcmpl_4",
      object: "chat.completion.chunk",
      created: 123,
      model: "gpt-4o",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              { index: 0, id: "call_2", type: "function", function: { name: "Read", arguments: "" } },
            ],
          },
          finish_reason: null,
        },
      ],
      error: "",
    })}`,
    "",
    `data: [DONE]`,
    "",
  ];
  const res = new Response(openAiSseStream(events), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    true,
    `expected valid for tool_calls chunk with benign error:"", got valid=false (reason: ${out.reason})`
  );
});

test("Stream with a REAL non-empty error object is still flagged as invalid", async () => {
  const events = [
    `data: ${JSON.stringify({
      id: "chatcmpl_5",
      object: "chat.completion.chunk",
      created: 123,
      model: "gpt-4o",
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    })}`,
    "",
    `data: ${JSON.stringify({
      id: "chatcmpl_6",
      object: "chat.completion.chunk",
      created: 123,
      model: "gpt-4o",
      choices: [{ index: 0, delta: {}, finish_reason: null }],
      error: { message: "upstream quota exceeded", code: "rate_limit_exceeded" },
    })}`,
    "",
    `data: [DONE]`,
    "",
  ];
  const res = new Response(openAiSseStream(events), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    false,
    `expected invalid for real error object, got valid=true (reason: ${out.reason})`
  );
  assert.match(out.reason ?? "", /streaming upstream error/, "reason should mention the upstream error");
});
