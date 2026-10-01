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

// When the client speaks the Responses API, the forced non-streaming leg is
// translated into a Responses object (object: "response", output[]), not a Chat
// completion. It has no `choices`, so the Chat-only synthesis produced nothing
// and the JSON went back raw: Codex CLI on a Cursor combo with web_search
// interception got it as an in-band error frame and never saw response.completed.
function responsesObject() {
  return {
    id: "resp_chatcmpl-cursor-1",
    object: "response",
    created_at: 1790340021,
    model: "cursor/gemini-3.8-flash",
    status: "completed",
    error: null,
    output: [
      {
        id: "rs_1",
        type: "reasoning",
        summary: [{ type: "summary_text", text: "Looking it up." }],
        status: "completed",
      },
      {
        id: "ws_1",
        type: "web_search_call",
        status: "completed",
        action: { type: "search", query: "opencode /v1/models" },
      },
      {
        id: "fc_1",
        type: "function_call",
        call_id: "call_1",
        name: "exec_command",
        arguments: '{"cmd":"cat README.md"}',
        status: "completed",
      },
      {
        id: "msg_1",
        type: "message",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text: "pong", annotations: [] }],
      },
    ],
    usage: { input_tokens: 10, output_tokens: 2, total_tokens: 12 },
  };
}

function parseEvents(sse: string) {
  return sse
    .split("\n\n")
    .map((block) => block.trim())
    .filter((block) => block.startsWith("event: "))
    .map((block) => {
      const [eventLine, dataLine] = block.split("\n");
      return {
        event: eventLine.slice("event: ".length),
        data: JSON.parse(dataLine.slice("data: ".length)),
      };
    });
}

test("wraps a Responses-shaped object as SSE instead of returning raw JSON", async () => {
  const response = maybeWrapForcedNonStreamingResponsesJson({
    clientRequestedResponsesStream: true,
    body: responsesObject(),
    headers: { "Content-Type": "application/json", "X-OmniRoute-Cache": "MISS" },
  });
  assert.equal(response.headers.get("Content-Type"), "text/event-stream");
  assert.equal(response.headers.get("X-OmniRoute-Cache"), "MISS");
  const sse = await response.text();
  const events = parseEvents(sse);

  assert.equal(events[0].event, "response.created");
  assert.equal(events[0].data.response.status, "in_progress");
  assert.deepEqual(events[0].data.response.output, []);
  const completed = events.filter((e) => e.event === "response.completed");
  assert.equal(completed.length, 1, "exactly one response.completed");
  assert.equal(events.at(-1)?.event, "response.completed", "response.completed comes last");
  assert.deepEqual(completed[0].data.response, responsesObject(), "every item survives");
  assert.match(sse, /data: \[DONE\]\s*$/);

  const seq = events.map((e) => e.data.sequence_number);
  assert.deepEqual(
    seq,
    seq.map((_, i) => i),
    "sequence numbers count up from 0"
  );
});

test("a Responses-shaped object streams one added/done pair per output item, in order", async () => {
  const sse = await wrapChatCompletionJsonAsResponsesSse(responsesObject()).text();
  const events = parseEvents(sse);
  const expected = responsesObject().output;

  const added = events.filter((e) => e.event === "response.output_item.added");
  const done = events.filter((e) => e.event === "response.output_item.done");
  assert.deepEqual(
    added.map((e) => [e.data.output_index, e.data.item.type]),
    expected.map((item, i) => [i, item.type])
  );
  assert.deepEqual(
    done.map((e) => e.data.item),
    expected,
    "done carries the final item"
  );

  const text = events.find((e) => e.event === "response.output_text.delta");
  assert.equal(text?.data.delta, "pong");
  assert.equal(text?.data.item_id, "msg_1");
  const textDone = events.find((e) => e.event === "response.output_text.done");
  assert.equal(textDone?.data.text, "pong");
  const args = events.find((e) => e.event === "response.function_call_arguments.done");
  assert.equal(args?.data.arguments, '{"cmd":"cat README.md"}');
  assert.equal(args?.data.item_id, "fc_1");
});

test("a failed or incomplete Responses object ends with its own terminal event", async () => {
  for (const status of ["failed", "incomplete"] as const) {
    const body = { ...responsesObject(), status };
    const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(body).text());
    assert.equal(events.at(-1)?.event, `response.${status}`);
    assert.equal(events.at(-1)?.data.response.status, status);
  }
});

test("the created/in_progress shell carries the envelope only, not final usage", async () => {
  const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(responsesObject()).text());
  for (const event of events.slice(0, 2)) {
    const shell = event.data.response;
    assert.equal(shell.id, "resp_chatcmpl-cursor-1");
    assert.equal(shell.object, "response");
    assert.equal(shell.model, "cursor/gemini-3.8-flash");
    assert.equal(shell.status, "in_progress");
    assert.deepEqual(shell.output, []);
    assert.equal(shell.usage, undefined, `${event.event} must not announce final usage`);
  }
});

test("a finished object without a terminal status ends as completed", async () => {
  for (const status of [undefined, "in_progress", "queued"]) {
    const body: Record<string, unknown> = { ...responsesObject(), status };
    if (status === undefined) delete body.status;
    const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(body).text());
    assert.equal(events.at(-1)?.event, "response.completed", `status ${status}`);
    assert.equal(events.at(-1)?.data.response.status, "completed", `status ${status}`);
  }
});

test("a cancelled object ends with response.failed", async () => {
  for (const status of ["cancelled", "canceled"]) {
    const body = { ...responsesObject(), status };
    const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(body).text());
    assert.equal(events.at(-1)?.event, "response.failed", `status ${status}`);
  }
});

test("output_index and content_index follow the final response, skipping malformed entries", async () => {
  const body = {
    ...responsesObject(),
    output: [
      null,
      {
        id: "msg_1",
        type: "message",
        role: "assistant",
        status: "completed",
        content: [null, { type: "output_text", text: "pong", annotations: [] }],
      },
    ],
  };
  const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(body).text());
  const added = events.filter((e) => e.event === "response.output_item.added");
  assert.deepEqual(
    added.map((e) => e.data.output_index),
    [1]
  );
  const parts = events.filter((e) => e.event.startsWith("response.content_part."));
  assert.ok(parts.length > 0);
  for (const part of parts) {
    assert.equal(part.data.content_index, 1);
    assert.ok(part.data.part, "no null part");
  }
});

test("text events carry logprobs like a live stream", async () => {
  const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(responsesObject()).text());
  for (const name of ["response.output_text.delta", "response.output_text.done"]) {
    const event = events.find((e) => e.event === name);
    assert.deepEqual(event?.data.logprobs, [], name);
  }
});

test("a refusal part streams as refusal events", async () => {
  const body = {
    ...responsesObject(),
    output: [
      {
        id: "msg_r",
        type: "message",
        role: "assistant",
        status: "completed",
        content: [{ type: "refusal", refusal: "I can't help with that." }],
      },
    ],
  };
  const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(body).text());
  const delta = events.find((e) => e.event === "response.refusal.delta");
  const done = events.find((e) => e.event === "response.refusal.done");
  assert.equal(delta?.data.delta, "I can't help with that.");
  assert.equal(done?.data.refusal, "I can't help with that.");
  assert.equal(done?.data.item_id, "msg_r");
  const added = events.find((e) => e.event === "response.content_part.added");
  assert.equal(added?.data.part.refusal, "", "the part opens empty");
  assert.equal(
    events.some((e) => e.event.startsWith("response.output_text.")),
    false
  );
});

test("a reasoning summary streams as reasoning_summary events", async () => {
  const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(responsesObject()).text());
  const names = events
    .filter((e) => e.event.startsWith("response.reasoning_summary_"))
    .map((e) => e.event);
  assert.deepEqual(names, [
    "response.reasoning_summary_part.added",
    "response.reasoning_summary_text.delta",
    "response.reasoning_summary_text.done",
    "response.reasoning_summary_part.done",
  ]);
  const delta = events.find((e) => e.event === "response.reasoning_summary_text.delta");
  assert.equal(delta?.data.item_id, "rs_1");
  assert.equal(delta?.data.summary_index, 0);
  assert.equal(delta?.data.delta, "Looking it up.");
  const opened = events.find(
    (e) => e.event === "response.output_item.added" && e.data.item.type === "reasoning"
  );
  assert.deepEqual(opened?.data.item.summary, [], "reasoning opens with an empty summary");
});

test("an item without an id gets one that its sub-events share", async () => {
  const body = {
    ...responsesObject(),
    output: [
      {
        type: "message",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text: "pong", annotations: [] }],
      },
    ],
  };
  const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(body).text());
  const added = events.find((e) => e.event === "response.output_item.added");
  const done = events.find((e) => e.event === "response.output_item.done");
  const delta = events.find((e) => e.event === "response.output_text.delta");
  assert.equal(typeof added?.data.item.id, "string");
  assert.ok(added?.data.item.id);
  assert.equal(delta?.data.item_id, added?.data.item.id);
  assert.equal(done?.data.item.id, added?.data.item.id);
  const completed = events.at(-1);
  assert.equal(
    completed?.data.response.output[0].id,
    added?.data.item.id,
    "the final snapshot agrees"
  );
});

test("the web_search fallback's round trip reaches the client item by item", async () => {
  const output = [
    {
      id: "fc_ws",
      type: "function_call",
      call_id: "call_ws1",
      name: "omniroute_web_search",
      arguments: '{"query":"node lts"}',
      status: "completed",
    },
    { type: "function_call_output", call_id: "call_ws1", output: '{"success":true}' },
    {
      id: "ws_call_ws1",
      type: "web_search_call",
      status: "completed",
      action: { type: "web_search", query: "node lts", sources: [] },
    },
  ];
  const body = { ...responsesObject(), output };
  const events = parseEvents(await wrapChatCompletionJsonAsResponsesSse(body).text());
  const done = events.filter((e) => e.event === "response.output_item.done");
  assert.deepEqual(
    done.map((e) => [e.data.output_index, e.data.item.type, e.data.item.call_id ?? null]),
    [
      [0, "function_call", "call_ws1"],
      [1, "function_call_output", "call_ws1"],
      [2, "web_search_call", null],
    ]
  );
  assert.equal(done[1].data.item.output, '{"success":true}');
});
