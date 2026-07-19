import test from "node:test";
import assert from "node:assert/strict";

import {
  pipeWithDisconnect,
  createStreamController,
  createDisconnectAwareStream,
} from "../../open-sse/utils/streamHandler.ts";
import { createPassthroughStreamWithLogger } from "../../open-sse/utils/stream.ts";

import { wantsProgress, createProgressTransform } from "../../open-sse/utils/progressTracker.ts";

test("wantsProgress detects X-OmniRoute-Progress header correctly", () => {
  const headersObj = { "x-omniroute-progress": "true" };
  assert.equal(wantsProgress(new Headers(headersObj)), true);

  const headersMap = new Map([["x-omniroute-progress", "true"]]);
  assert.equal(wantsProgress(headersMap), true);

  const headersPlain = { "x-omniroute-progress": "true" };
  assert.equal(wantsProgress(headersPlain), true);

  assert.equal(wantsProgress({ "x-omniroute-progress": "false" }), false);
  assert.equal(wantsProgress(null), false);
  assert.equal(wantsProgress({}), false);
});

test("createProgressTransform maps SSE text output to valid byte stream with progress", async () => {
  const transform = createProgressTransform({ signal: new AbortController().signal });
  const writer = transform.writable.getWriter();

  writer.write(new TextEncoder().encode('data: {"chunk":"one"}\n\n'));
  writer.write(new TextEncoder().encode('data: {"chunk":"two"}\n\n'));
  writer.write(new TextEncoder().encode("data: [DONE]\n\n"));
  writer.close();

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }

  assert.match(result, /data: \{"chunk":"one"\}/);
  assert.match(result, /data: \{"chunk":"two"\}/);
  assert.match(result, /data: \[DONE\]/);
  assert.match(result, /event: progress/); // progress check
  assert.match(result, /done":true/);
});

test("createPassthroughStreamWithLogger omits [DONE] for Responses clients", async () => {
  const transform = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.5-low",
    null,
    null,
    null,
    null,
    null,
    "openai-responses"
  );

  const writer = transform.writable.getWriter();
  await writer.write(
    new TextEncoder().encode(
      [
        "event: response.completed",
        'data: {"type":"response.completed","response":{"id":"resp_1","model":"gpt-5.5-low","status":"completed","output":[],"usage":{"input_tokens":1,"output_tokens":1,"total_tokens":2}}}',
        "",
      ].join("\n")
    )
  );
  await writer.close();

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }

  assert.match(result, /event: response\.completed/);
  assert.doesNotMatch(result, /data: \[DONE\]/);
});

test("createPassthroughStreamWithLogger synthesizes reasoning summary events from reasoning output items", async () => {
  const transform = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.5-low",
    null,
    null,
    null,
    null,
    null,
    "openai-responses"
  );

  const writer = transform.writable.getWriter();
  await writer.write(
    new TextEncoder().encode(
      [
        "event: response.output_item.done",
        'data: {"type":"response.output_item.done","response_id":"resp_reasoning_1","output_index":0,"item":{"id":"rs_resp_reasoning_1_0","type":"reasoning","summary":[{"type":"summary_text","text":"Reasoning summary text"}]}}',
        "",
      ].join("\n")
    )
  );
  await writer.close();

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }

  assert.match(result, /event: response\.reasoning_summary_text\.delta/);
  assert.match(result, /"delta":"Reasoning summary text"/);
  assert.match(result, /event: response\.reasoning_summary_part\.done/);
  assert.match(result, /event: response\.output_item\.done/);
});

// Reconciles #7095 (xz-dev — chat clients never saw ANY signal that Codex was
// reasoning when the upstream Responses API exposed only encrypted private
// reasoning) with #7176 (JxnLexn — mutating `item.summary` with a fabricated
// placeholder corrupted the response item forwarded downstream, discarding the
// `encrypted_content` shape Codex needs for follow-up requests). Both goals are
// satisfied simultaneously: the client-facing synthetic delta/part events still
// carry the placeholder text, but the forwarded `response.output_item.done`
// payload is untouched — `encrypted_content` survives and no `summary` is
// fabricated onto the wire item.
test("createPassthroughStreamWithLogger shows a placeholder for encrypted reasoning items without mutating the forwarded item", async () => {
  const transform = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.5-low",
    null,
    null,
    null,
    null,
    null,
    "openai-responses"
  );

  const writer = transform.writable.getWriter();
  await writer.write(
    new TextEncoder().encode(
      [
        "event: response.output_item.done",
        'data: {"type":"response.output_item.done","response_id":"resp_reasoning_2","output_index":0,"item":{"id":"rs_resp_reasoning_2_0","type":"reasoning","encrypted_content":"enc_opaque_state"}}',
        "",
      ].join("\n")
    )
  );
  await writer.close();

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }

  // #7095: chat clients still see the placeholder via the synthetic events.
  assert.match(result, /event: response\.reasoning_summary_text\.delta/);
  assert.match(result, /Codex is reasoning/);

  // #7176: the forwarded response.output_item.done payload is untouched —
  // encrypted_content survives intact and no fabricated `summary` is present.
  assert.match(result, /"encrypted_content":"enc_opaque_state"/);
  assert.doesNotMatch(result, /"summary":/);
  assert.match(result, /event: response\.output_item\.done/);
});

// Companion guard for the test above. The output_item.done line is echoed
// verbatim, so a re-introduced `item.summary` mutation would NOT surface there.
// It does surface here: the reasoning item is captured into
// passthroughResponsesOutputItems and re-serialized into the response.completed
// snapshot when upstream sends an empty `output` (store: false). This is the
// path that actually fails if the mutation comes back — it is what makes the
// #7176 half of the reconciliation enforceable rather than incidental.
test("createPassthroughStreamWithLogger backfills completed output with encrypted reasoning unmutated", async () => {
  const transform = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.5-low",
    null,
    null,
    null,
    null,
    null,
    "openai-responses"
  );

  const writer = transform.writable.getWriter();
  await writer.write(
    new TextEncoder().encode(
      [
        "event: response.output_item.done",
        'data: {"type":"response.output_item.done","response_id":"resp_reasoning_3","output_index":0,"item":{"id":"rs_resp_reasoning_3_0","type":"reasoning","encrypted_content":"enc_opaque_state"}}',
        "",
        "event: response.completed",
        'data: {"type":"response.completed","response":{"id":"resp_reasoning_3","model":"gpt-5.5-low","status":"completed","output":[],"usage":{"input_tokens":1,"output_tokens":1,"total_tokens":2}}}',
        "",
      ].join("\n")
    )
  );
  await writer.close();

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }

  // The placeholder still reached the client (#7095).
  assert.match(result, /event: response\.reasoning_summary_text\.delta/);
  assert.match(result, /Codex is reasoning/);

  // The item re-serialized into the completed snapshot carries the original
  // encrypted_content and never a fabricated summary (#7176).
  const completed = result
    .split(/\n\n+/)
    .find((block) => block.includes('"type":"response.completed"'));
  assert.ok(completed, "expected a response.completed event on the wire");
  assert.match(completed, /"encrypted_content":"enc_opaque_state"/);
  assert.doesNotMatch(completed, /"summary":/);
});

test("createPassthroughStreamWithLogger backfills completed output from function_call arguments events", async () => {
  const transform = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.5-low",
    null,
    null,
    null,
    null,
    null,
    "openai-responses"
  );

  const writer = transform.writable.getWriter();
  await writer.write(
    new TextEncoder().encode(
      [
        'data: {"type":"response.created","response":{"id":"resp_fc_1"}}',
        "event: response.output_item.added",
        'data: {"type":"response.output_item.added","response_id":"resp_fc_1","output_index":0,"item":{"id":"fc_call_1","type":"function_call","call_id":"call_1","name":"workspace_read_file","arguments":""}}',
        "event: response.function_call_arguments.done",
        'data: {"type":"response.function_call_arguments.done","response_id":"resp_fc_1","output_index":0,"item_id":"fc_call_1","arguments":"{\\"path\\":\\"README.md\\"}"}',
        "event: response.completed",
        'data: {"type":"response.completed","response":{"id":"resp_fc_1","status":"completed","output":[],"usage":{"input_tokens":1,"output_tokens":1,"total_tokens":2}}}',
        "",
      ].join("\n")
    )
  );
  await writer.close();

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }

  assert.match(result, /event: response\.completed/);
  assert.match(result, /"type":"function_call"/);
  assert.match(result, /"call_id":"call_1"/);
  assert.ok(result.includes('"arguments":"{\\"path\\":\\"README.md\\"}"'));
});

test("createPassthroughStreamWithLogger keeps reasoning deltas out of logged assistant content", async () => {
  let completePayload = null;
  const transform = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.5-low",
    null,
    {
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Say OK." }],
        },
      ],
    },
    (payload) => {
      completePayload = payload;
    },
    null,
    null,
    "openai-responses"
  );

  const writer = transform.writable.getWriter();
  await writer.write(
    new TextEncoder().encode(
      [
        'data: {"type":"response.created","response":{"id":"resp_reasoning_delta_1"}}',
        "event: response.reasoning_summary_text.delta",
        'data: {"type":"response.reasoning_summary_text.delta","response_id":"resp_reasoning_delta_1","delta":"Internal reasoning should not be content."}',
        "event: response.function_call_arguments.delta",
        'data: {"type":"response.function_call_arguments.delta","response_id":"resp_reasoning_delta_1","delta":"{\\"path\\":\\"secret.txt\\"}"}',
        "event: response.output_text.delta",
        'data: {"type":"response.output_text.delta","response_id":"resp_reasoning_delta_1","delta":"OK"}',
        "event: response.completed",
        'data: {"type":"response.completed","response":{"id":"resp_reasoning_delta_1","status":"completed","output":[],"usage":{"input_tokens":1,"output_tokens":1,"total_tokens":2}}}',
        "",
      ].join("\n")
    )
  );
  await writer.close();

  const reader = transform.readable.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }

  assert.ok(completePayload, "expected onComplete payload");
  assert.equal(completePayload.responseBody.choices[0].message.content, "OK");
  assert.equal(
    JSON.stringify(completePayload.responseBody).includes(
      "Internal reasoning should not be content"
    ),
    false
  );
  assert.equal(JSON.stringify(completePayload.responseBody).includes("secret.txt"), false);
});

test("createStreamController returns valid controller", () => {
  let completeLogged = false;
  let disconnectLogged = false;

  const originalLog = console.log;
  console.log = (msg) => {
    if (msg.includes("complete")) completeLogged = true;
    if (msg.includes("disconnect")) disconnectLogged = true;
  };

  const sc = createStreamController({
    provider: "test",
    model: "conn_1",
  });

  assert.equal(typeof sc.signal, "object");

  sc.handleComplete();
  assert.equal(completeLogged, true);
  assert.equal(sc.isConnected(), false);

  sc.handleDisconnect();
  assert.equal(disconnectLogged, false);

  console.log = originalLog;
});
