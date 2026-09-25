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

function createState(): TranslatorState {
  return { toolCalls: new Map() };
}

test("Responses-style trailing usage chunk reports real Claude token counts", () => {
  const state = createState();

  const events = openaiToClaudeResponse(
    {
      id: "chatcmpl-responses-usage",
      model: "openai/gpt-5",
      choices: [],
      usage: {
        input_tokens: 120,
        output_tokens: 45,
        total_tokens: 165,
      },
    },
    state
  );

  assert.equal(events, null);
  assert.deepEqual(state.usage, {
    input_tokens: 120,
    output_tokens: 45,
  });
});

test("Responses-style cached details map to Claude cache counters", () => {
  const state = createState();

  openaiToClaudeResponse(
    {
      id: "chatcmpl-responses-cached",
      model: "openai/gpt-5",
      choices: [],
      usage: {
        input_tokens: 200,
        output_tokens: 30,
        total_tokens: 230,
        input_tokens_details: {
          cached_tokens: 150,
        },
      },
    },
    state
  );

  assert.deepEqual(state.usage, {
    input_tokens: 50,
    output_tokens: 30,
    cache_read_input_tokens: 150,
  });
});

test("OpenAI naming still wins when both namings are present", () => {
  const state = createState();

  openaiToClaudeResponse(
    {
      id: "chatcmpl-mixed-usage",
      model: "openai/gpt-5",
      choices: [],
      usage: {
        prompt_tokens: 6103,
        completion_tokens: 16,
        total_tokens: 6119,
        input_tokens: 1,
        output_tokens: 2,
        prompt_tokens_details: {
          cached_tokens: 6000,
          cache_creation_tokens: 100,
        },
      },
    },
    state
  );

  assert.deepEqual(state.usage, {
    input_tokens: 3,
    output_tokens: 16,
    cache_read_input_tokens: 6000,
    cache_creation_input_tokens: 100,
  });
});

test("classic OpenAI naming is unchanged (control)", () => {
  const state = createState();

  openaiToClaudeResponse(
    {
      id: "chatcmpl-classic-usage",
      model: "openai/gpt-5",
      choices: [],
      usage: {
        prompt_tokens: 6103,
        completion_tokens: 16,
        total_tokens: 6119,
        prompt_tokens_details: {
          cached_tokens: 6000,
          cache_creation_tokens: 100,
        },
      },
    },
    state
  );

  assert.deepEqual(state.usage, {
    input_tokens: 3,
    output_tokens: 16,
    cache_read_input_tokens: 6000,
    cache_creation_input_tokens: 100,
  });
});
