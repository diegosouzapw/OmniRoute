import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

/**
 * Reproduces the Kimi-K2.6 empty-tool_calls bug.
 *
 * Kimi-K2.6 attaches an EMPTY `tool_calls:[]` array to every content delta when
 * tools are defined. An empty array is truthy, so `if (delta.tool_calls)` is
 * true even when no actual tool call is present. The translator then calls
 * closeMessage() right after the first content delta, closing the message item
 * with only the first fragment of text. Subsequent content deltas arrive on a
 * done item and are emitted as orphan `output_text.delta` events (no
 * matching active item) — Codex CLI panics with "OutputTextDelta without
 * active item" and only the first fragment reaches the final output.
 *
 * Expected (after fix): both content fragments accumulate into ONE message
 * item, `output_text.done` carries the full text, and the final
 * `response.completed.response.output` message contains the full text.
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

test("Kimi-K2.6: empty tool_calls:[] on content deltas must NOT close the message item", () => {
  const events = collectEvents([
    // First content delta with an EMPTY tool_calls array attached (Kimi pattern)
    {
      id: "chatcmpl-kimi",
      model: "Kimi-K2.6",
      choices: [
        {
          index: 0,
          delta: { content: " The", tool_calls: [] },
          finish_reason: null,
        },
      ],
    },
    // Second content delta — also carries an empty tool_calls array
    {
      id: "chatcmpl-kimi",
      model: "Kimi-K2.6",
      choices: [
        {
          index: 0,
          delta: { content: " fix works.", tool_calls: [] },
          finish_reason: null,
        },
      ],
    },
    // Final chunk: finish_reason (no content)
    {
      id: "chatcmpl-kimi",
      model: "Kimi-K2.6",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    },
  ]);

  const textDeltas = events
    .filter((e) => e.event === "response.output_text.delta")
    .map((e) => e.data.delta);
  const textDone = events
    .filter((e) => e.event === "response.output_text.done")
    .map((e) => e.data.text);

  // Both content fragments must be emitted as deltas on the SAME item
  assert.deepEqual(textDeltas, [" The", " fix works."]);

  // Exactly one output_text.done carrying the FULL accumulated text
  assert.equal(textDone.length, 1, "must emit exactly one output_text.done");
  assert.equal(textDone[0], " The fix works.", "output_text.done must carry full text");

  // The final completed response output must contain the full text
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "must emit response.completed");
  const msgItems = completed.data.response.output.filter((o) => o.type === "message");
  assert.equal(msgItems.length, 1, "must have exactly one message item");
  assert.equal(
    msgItems[0].content[0].text,
    " The fix works.",
    "final output message must contain the full text"
  );
});

test("Kimi-K2.6: a REAL tool_call (non-empty) still closes the message before the call", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-kimi2",
      model: "Kimi-K2.6",
      choices: [
        {
          index: 0,
          delta: { content: "thinking", tool_calls: [] },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-kimi2",
      model: "Kimi-K2.6",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                function: { name: "get_weather", arguments: '{"city":"NYC"}' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-kimi2",
      model: "Kimi-K2.6",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    },
  ]);

  // The content "thinking" must be in the final output as a message
  const completed = events.find((e) => e.event === "response.completed");
  const msgItems = completed.data.response.output.filter((o) => o.type === "message");
  assert.equal(msgItems.length, 1);
  assert.equal(msgItems[0].content[0].text, "thinking");
  // And a function_call item must exist
  const fnItems = completed.data.response.output.filter(
    (o) => o.type === "function_call" || o.type === "custom_tool_call"
  );
  assert.ok(fnItems.length >= 1, "must have a function/custom tool call item");
});
