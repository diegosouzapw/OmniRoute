import { test } from "node:test";
import assert from "node:assert/strict";
import { openaiToOpenAIResponsesResponse } from "../../open-sse/translator/response/openai-responses.ts";

test("Issue #12831: fixes double-escaped tabs in Codex JSON tool call arguments", () => {
  const events = [];
  const emit = (_name, payload) => events.push(payload);
  const state = {
    responseId: "res_123",
    funcCallIds: {},
    funcNames: {},
    funcArgsBuf: {},
    funcArgsDone: {},
    funcItemAdded: {},
    funcItemDone: {},
    msgItemAdded: {},
    msgContentAdded: {},
    msgTextBuf: {},
    msgItemDone: {},
  };

  const chunk1 = {
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_123",
              function: {
                name: "_edit",
                // gpt-5.6-luna-xhigh emits literally \ followed by t in the JSON string
                // to represent a tab, instead of a JSON escape for tab or a raw tab.
                // Wait, in JSON, a tab in a string is encoded as "\t" (two characters: \ and t).
                // If it's double-escaped, it emits "\t" (four characters: \, \, t in JSON string? No, two backslashes and a t: "\t")
                // Let's assume the string is: {"input": "some code\twith tabs"}
                arguments: '{\n  "input": "some code\\twith tabs"',
              },
            },
          ],
        },
      },
    ],
  };

  const chunk2 = {
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              function: {
                arguments: "\n}",
              },
            },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  const chunk3 = {
    usage: { prompt_tokens: 10, completion_tokens: 10 },
  };

  function processChunk(chunk) {
    const chunkEvents = openaiToOpenAIResponsesResponse(chunk, state);
    for (const ev of chunkEvents) {
      emit(ev.event, ev.data);
    }
  }

  processChunk(chunk1);
  processChunk(chunk2);
  processChunk(chunk3);

  const doneEvent = events.find((e) => e.type === "response.function_call_arguments.done");

  // Try parsing the arguments
  const parsed = JSON.parse(doneEvent.arguments);
  assert.strictEqual(
    parsed.input,
    "some code\twith tabs",
    "The double-escaped tab should be unescaped to a single tab character"
  );
});
