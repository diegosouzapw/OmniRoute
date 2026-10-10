import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { resetDbInstance } from "../../src/lib/db/core.ts";

import { claudeToOpenAIResponse } from "../../open-sse/translator/response/claude-to-openai.ts";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

type Usage = Record<string, number>;
test.after(() => resetDbInstance());

const WRITE_HEAVY: Usage = {
  input_tokens: 910,
  cache_creation_input_tokens: 713119,
  cache_read_input_tokens: 0,
  output_tokens: 135,
};

const READ_ONLY: Usage = {
  input_tokens: 42,
  cache_read_input_tokens: 8941,
  output_tokens: 7,
};

function expectedClaudeUsage(usage: Usage): Usage {
  const out: Usage = { input_tokens: usage.input_tokens, output_tokens: usage.output_tokens };
  if (usage.cache_read_input_tokens > 0)
    out.cache_read_input_tokens = usage.cache_read_input_tokens;
  if (usage.cache_creation_input_tokens > 0) {
    out.cache_creation_input_tokens = usage.cache_creation_input_tokens;
  }
  return out;
}

function streamRoundTrip(usage: Usage): Usage | undefined {
  const toOpenAI: Record<string, unknown> = { toolCalls: new Map(), toolNameMap: new Map() };
  const claudeEvents = [
    {
      type: "message_start",
      message: { id: "msg_rt", model: "claude-sonnet-5", usage: { ...usage, output_tokens: 1 } },
    },
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "ok" } },
    { type: "content_block_stop", index: 0 },
    { type: "message_delta", delta: { stop_reason: "end_turn" }, usage },
    { type: "message_stop" },
  ];
  const openaiChunks = claudeEvents.flatMap((event) => {
    const out = claudeToOpenAIResponse(event, toOpenAI);
    return Array.isArray(out) ? out : out ? [out] : [];
  });

  const toClaude: Record<string, unknown> & { usage?: Usage } = { toolCalls: new Map() };
  for (const chunk of openaiChunks) openaiToClaudeResponse(chunk, toClaude);
  return toClaude.usage;
}

function nonStreamRoundTrip(usage: Usage): unknown {
  const claudeBody = {
    id: "msg_rt",
    type: "message",
    role: "assistant",
    model: "claude-sonnet-5",
    content: [{ type: "text", text: "ok" }],
    stop_reason: "end_turn",
    usage,
  };
  const openaiBody = translateNonStreamingResponse(claudeBody, FORMATS.CLAUDE, FORMATS.OPENAI);
  const back = translateNonStreamingResponse(openaiBody, FORMATS.OPENAI, FORMATS.CLAUDE) as {
    usage?: unknown;
  };
  return back.usage;
}

describe("Claude usage survives a Claude -> OpenAI -> Claude round trip", () => {
  test("streaming: a large cache write is not subtracted from input_tokens", () => {
    assert.deepEqual(streamRoundTrip(WRITE_HEAVY), expectedClaudeUsage(WRITE_HEAVY));
  });

  test("non-streaming: a large cache write is not subtracted from input_tokens", () => {
    assert.deepEqual(nonStreamRoundTrip(WRITE_HEAVY), expectedClaudeUsage(WRITE_HEAVY));
  });

  test("streaming: cached reads only are unchanged", () => {
    assert.deepEqual(streamRoundTrip(READ_ONLY), expectedClaudeUsage(READ_ONLY));
  });

  test("non-streaming: cached reads only are unchanged", () => {
    assert.deepEqual(nonStreamRoundTrip(READ_ONLY), expectedClaudeUsage(READ_ONLY));
  });

  test("the OpenAI leg keeps the #2215 shape (write outside prompt_tokens)", () => {
    const openaiBody = translateNonStreamingResponse(
      {
        id: "msg_rt",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-5",
        content: [{ type: "text", text: "ok" }],
        stop_reason: "end_turn",
        usage: WRITE_HEAVY,
      },
      FORMATS.CLAUDE,
      FORMATS.OPENAI
    ) as { usage: Record<string, unknown> };
    assert.equal(openaiBody.usage.prompt_tokens, 910);
    assert.deepEqual(openaiBody.usage.prompt_tokens_details, {
      cache_creation_tokens: 713119,
      cache_creation_in_prompt: false,
    });
  });
});

describe("OpenAI usage that already includes the cache write", () => {
  const folded = {
    prompt_tokens: 910 + 713119,
    completion_tokens: 135,
    total_tokens: 910 + 713119 + 135,
    prompt_tokens_details: { cached_tokens: 0, cache_creation_tokens: 713119 },
  };

  test("streaming: the write is subtracted when no marker says it is outside", () => {
    const state: Record<string, unknown> & { usage?: Usage } = { toolCalls: new Map() };
    openaiToClaudeResponse({ choices: [], usage: folded }, state);
    assert.deepEqual(state.usage, expectedClaudeUsage(WRITE_HEAVY));
  });

  test("non-streaming: the write is subtracted when no marker says it is outside", () => {
    const back = translateNonStreamingResponse(
      {
        id: "chatcmpl-folded",
        object: "chat.completion",
        model: "gpt-test",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: folded,
      },
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    ) as { usage?: unknown };
    assert.deepEqual(back.usage, expectedClaudeUsage(WRITE_HEAVY));
  });
});

describe("Anthropic-keyed Responses usage reaches a Claude client exactly", () => {
  const responsesUsage = { ...WRITE_HEAVY };

  test("streaming: Responses -> OpenAI -> Claude", () => {
    const openaiChunk = openaiResponsesToOpenAIResponse(
      {
        type: "response.completed",
        response: { id: "resp-rt", model: "claude-test", output: [], usage: responsesUsage },
      },
      {
        started: false,
        finishReasonSent: false,
        completedOutputItems: [],
        funcArgsBuf: {},
        funcNames: {},
        funcCallIds: {},
        funcArgsDone: {},
        funcItemAdded: {},
        funcItemDone: {},
      }
    );
    const state: Record<string, unknown> & { usage?: Usage } = { toolCalls: new Map() };
    openaiToClaudeResponse(openaiChunk, state);
    assert.deepEqual(state.usage, expectedClaudeUsage(WRITE_HEAVY));
  });

  test("non-streaming: Responses -> OpenAI -> Claude", () => {
    const back = translateNonStreamingResponse(
      {
        id: "resp-rt",
        object: "response",
        model: "claude-test",
        status: "completed",
        output: [
          {
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "ok" }],
          },
        ],
        usage: responsesUsage,
      },
      FORMATS.OPENAI_RESPONSES,
      FORMATS.CLAUDE
    ) as { usage?: unknown };
    assert.deepEqual(back.usage, expectedClaudeUsage(WRITE_HEAVY));
  });

  test("non-streaming: a read larger than the uncached input stays exact", () => {
    const usage = { input_tokens: 50, cache_read_input_tokens: 20_000, output_tokens: 3 };
    const back = translateNonStreamingResponse(
      {
        id: "resp-read",
        object: "response",
        model: "claude-test",
        status: "completed",
        output: [
          {
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "ok" }],
          },
        ],
        usage,
      },
      FORMATS.OPENAI_RESPONSES,
      FORMATS.CLAUDE
    ) as { usage?: unknown };
    assert.deepEqual(back.usage, expectedClaudeUsage(usage));
  });
});
