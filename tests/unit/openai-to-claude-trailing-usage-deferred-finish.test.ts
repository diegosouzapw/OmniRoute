import assert from "node:assert/strict";
import test from "node:test";

import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";

type ClaudeUsage = {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
};

type TranslatorState = Record<string, unknown> & {
  toolCalls: Map<number, unknown>;
  usage?: ClaudeUsage;
};

const TRAILING_USAGE = {
  prompt_tokens: 6103,
  completion_tokens: 16,
  total_tokens: 6119,
  prompt_tokens_details: {
    cached_tokens: 6000,
    cache_creation_tokens: 100,
  },
};

function createState(): TranslatorState {
  return { toolCalls: new Map() };
}

function collectEvents(
  chunks: Array<Record<string, unknown> | null>,
  state: TranslatorState
): Array<Record<string, unknown>> {
  return chunks.flatMap((chunk) => openaiToClaudeResponse(chunk, state) ?? []);
}

test("usage-only choices-empty chunk updates Claude usage without emitting a content delta", () => {
  const state = createState();

  const events = openaiToClaudeResponse(
    {
      id: "chatcmpl-11817",
      model: "accounts/fireworks/models/kimi-k3",
      choices: [],
      usage: TRAILING_USAGE,
    },
    state
  );

  assert.equal(events, null);
  assert.deepEqual(state.usage, {
    input_tokens: 3,
    output_tokens: 16,
    cache_read_input_tokens: 6000,
    cache_creation_input_tokens: 100,
  });
});

test("trailing choices-empty usage completes the stream with real cache accounting", () => {
  const state = createState();
  const events = collectEvents(
    [
      {
        id: "chatcmpl-11817",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [{ index: 0, delta: { content: "OK" }, finish_reason: null }],
      },
      {
        id: "chatcmpl-11817",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      },
      {
        id: "chatcmpl-11817",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [],
        usage: TRAILING_USAGE,
      },
    ],
    state
  );

  assert.equal(events[0].type, "message_start");
  assert.equal(events[1].type, "content_block_start");
  assert.equal(events[2].type, "content_block_delta");
  assert.equal(events[2].delta?.text, "OK");
  assert.equal(events[3].type, "content_block_stop");
  assert.equal(events[4].type, "message_delta");
  assert.equal(events[4].delta?.stop_reason, "end_turn");
  assert.deepEqual(events[4].usage, {
    input_tokens: 3,
    output_tokens: 16,
    cache_read_input_tokens: 6000,
    cache_creation_input_tokens: 100,
  });
  assert.equal(events[5].type, "message_stop");
  assert.equal(events.length, 6);
});

test("stream-end flush still emits terminal events when upstream omits usage", () => {
  const state = createState();
  const events = collectEvents(
    [
      {
        id: "chatcmpl-11817-no-usage",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [{ index: 0, delta: { content: "OK" }, finish_reason: null }],
      },
      {
        id: "chatcmpl-11817-no-usage",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      },
      null,
    ],
    state
  );

  assert.deepEqual(
    events.filter((event) => event.type === "message_delta" || event.type === "message_stop"),
    [
      {
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { input_tokens: 0, output_tokens: 0 },
      },
      { type: "message_stop" },
    ]
  );
});

test("trailing chunk without choices property updates usage and flushes finish", () => {
  const state = createState();
  const events = collectEvents(
    [
      {
        id: "chatcmpl-11817-no-choices-key",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [{ index: 0, delta: { content: "Done" }, finish_reason: null }],
      },
      {
        id: "chatcmpl-11817-no-choices-key",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      },
      {
        id: "chatcmpl-11817-no-choices-key",
        model: "accounts/fireworks/models/kimi-k3",
        usage: TRAILING_USAGE,
      },
    ],
    state
  );

  const terminalEvents = events.filter(
    (event) => event.type === "message_delta" || event.type === "message_stop"
  );
  assert.deepEqual(terminalEvents, [
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: {
        input_tokens: 3,
        output_tokens: 16,
        cache_read_input_tokens: 6000,
        cache_creation_input_tokens: 100,
      },
    },
    { type: "message_stop" },
  ]);
});

test("trailing choices-empty chunk with tool_calls finish_reason preserves tool_use stop_reason and usage", () => {
  const state = createState();
  const events = collectEvents(
    [
      {
        id: "chatcmpl-11817-tool",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_123",
                  function: { name: "get_weather", arguments: "{\"city\":\"Beijing\"}" },
                },
              ],
            },
            finish_reason: null,
          },
        ],
      },
      {
        id: "chatcmpl-11817-tool",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      },
      {
        id: "chatcmpl-11817-tool",
        model: "accounts/fireworks/models/kimi-k3",
        choices: [],
        usage: TRAILING_USAGE,
      },
    ],
    state
  );

  const terminalEvents = events.filter(
    (event) => event.type === "message_delta" || event.type === "message_stop"
  );
  assert.deepEqual(terminalEvents, [
    {
      type: "message_delta",
      delta: { stop_reason: "tool_use" },
      usage: {
        input_tokens: 3,
        output_tokens: 16,
        cache_read_input_tokens: 6000,
        cache_creation_input_tokens: 100,
      },
    },
    { type: "message_stop" },
  ]);
});
