import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

/**
 * Some upstreams (observed on deepseek-v4 / Kimi-style OpenAI-compatible
 * providers) interleave plain text deltas AFTER a real tool_call has already
 * closed the message item. The Responses API contract (#13693 invariant) is
 * that no `response.output_text.delta` may arrive after that item's
 * `response.output_item.done` — Codex CLI aborts with "OutputTextDelta without
 * active item", and any post-done text is silently dropped from the final
 * `response.completed` payload.
 *
 * The fix re-homes post-close content onto a FRESH message item at the next
 * free output_index instead of emitting orphan deltas on the closed one, so
 * the text is preserved end-to-end (deltas, output_text.done, and
 * response.completed.output) and no event violates the item lifecycle.
 */
function collectEvents(chunks) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events = [];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }
  return events;
}

test("content after a closed message must not emit orphan deltas on the done item", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-postclose",
      model: "deepseek-v4.1-flash",
      choices: [
        {
          index: 0,
          delta: { role: "assistant", content: "Hello " },
          finish_reason: null,
        },
      ],
    },
    // Real tool_call in the SAME delta: closes the message item (out=0) and
    // opens the function_call item (out=1).
    {
      id: "chatcmpl-postclose",
      model: "deepseek-v4.1-flash",
      choices: [
        {
          index: 0,
          delta: {
            content: "world",
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "get_weather", arguments: '{"city":"SF"}' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    // Pathological upstream behaviour: plain text AFTER the tool call.
    {
      id: "chatcmpl-postclose",
      model: "deepseek-v4.1-flash",
      choices: [
        {
          index: 0,
          delta: { content: " tail text" },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-postclose",
      model: "deepseek-v4.1-flash",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { prompt_tokens: 10, completion_tokens: 8, total_tokens: 18 },
    },
  ]);

  // #13693 invariant 1: no output_text.delta may follow the message item's
  // output_item.done for the SAME output_index.
  const itemDoneIndexes = events
    .filter(
      (e) =>
        e.event === "response.output_item.done" && e.data.item?.type === "message"
    )
    .map((e) => e.data.output_index);
  const orphanDeltas = [];
  let lastDoneForIndex = new Map();
  for (const e of events) {
    if (e.event === "response.output_item.done" && e.data.item?.type === "message") {
      lastDoneForIndex.set(e.data.output_index, true);
    }
    if (e.event === "response.output_text.delta") {
      if (lastDoneForIndex.get(e.data.output_index)) {
        orphanDeltas.push(e.data);
      }
    }
  }
  assert.deepEqual(orphanDeltas, [], "no output_text.delta may arrive on a done message item");
  assert.ok(itemDoneIndexes.length >= 1, "message item must have been closed");

  // #13693 invariant 2: the tail text must be preserved in full somewhere in
  // response.completed.output (not silently dropped).
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "must emit response.completed");
  const allMessageText = completed.data.response.output
    .filter((o) => o.type === "message")
    .map((o) => o.content?.[0]?.text ?? "")
    .join("");
  assert.equal(allMessageText, "Hello world tail text");
});

test("every output_text.done text equals the concatenation of its item's deltas", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-invariant",
      model: "deepseek-v4.1-flash",
      choices: [{ index: 0, delta: { content: "one " }, finish_reason: null }],
    },
    {
      id: "chatcmpl-invariant",
      model: "deepseek-v4.1-flash",
      choices: [
        {
          index: 0,
          delta: {
            content: "two",
            tool_calls: [
              { index: 0, id: "call_1", type: "function", function: { name: "f", arguments: "{}" } },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-invariant",
      model: "deepseek-v4.1-flash",
      choices: [{ index: 0, delta: { content: " three" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-invariant",
      model: "deepseek-v4.1-flash",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
    },
  ]);

  // Group deltas and dones per output_index.
  const deltasByIndex = new Map();
  const donesByIndex = new Map();
  for (const e of events) {
    if (e.event === "response.output_text.delta") {
      const arr = deltasByIndex.get(e.data.output_index) ?? [];
      arr.push(e.data.delta);
      deltasByIndex.set(e.data.output_index, arr);
    }
    if (e.event === "response.output_text.done") {
      donesByIndex.set(e.data.output_index, e.data.text);
    }
  }
  for (const [idx, done] of donesByIndex) {
    assert.equal(
      done,
      (deltasByIndex.get(idx) ?? []).join(""),
      `output_text.done.text for index ${idx} must equal the concatenation of its deltas`
    );
  }
});
